<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostCareerRequest;
use Inertia\Inertia;

use App\Models\Curriculo;
use App\Models\RedeSocial;
use App\Models\Vaga;
use App\Models\Imagem;

use Illuminate\Support\Str;

use Illuminate\Support\Facades\Mail;

class CarreirasController extends Controller
{
    public function index() {

        $idioma = view()->shared('idioma');

        $vagas = Vaga::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->whereHas('vagasIdiomas')
            ->with([
                'vagasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                        ->orWhere('padrao', true);
                    })
                    ->orderBy('idioma_id', 'DESC');
                },
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->filter(fn ($vaga) => $vaga->vagasIdiomas->isNotEmpty())
            ->map(function($vaga) {
                return [
                    'id' => $vaga->id,
                    'titulo' => $vaga->vagasIdiomas[0]->titulo,
                    'tipo' => $vaga->vagasIdiomas[0]->tipo,
                    'slug' => Str::slug($vaga->vagasIdiomas[0]->titulo),
                ];
            })
            ->values();

        $imagensGaleria = Imagem::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'controladora' => 'Carreiras',
                'acao' => 'index'
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->limit(4)
            ->get()
            ->map(function($imagem) {
                return [
                    'id' => $imagem->id,
                    'imagem' => asset('/content/images/' . $imagem->imagem),
                ];
        });

        return Inertia::render('Carreiras/index', [
            'vagas' => $vagas,
            'imagensGaleria' => $imagensGaleria
        ]);
    }

    public function vaga($id, $slug = null) {

        $idioma = view()->shared('idioma');

        $vaga = Vaga::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'id' => $id
            ])
            ->with([
                'vagasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                        ->orWhere('padrao', true);
                    })
                    ->orderBy('idioma_id', 'DESC');
                },
            ])
            ->first();

        if (!$vaga || $vaga->vagasIdiomas->isEmpty()) {
            return Inertia::location(route('Carreiras.index'));
        }

        $vagaIdioma = $vaga->vagasIdiomas[0];

        $pagina = inertia()->getShared('pagina');
        $descricao = Str::limit(trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags($vagaIdioma->descricao)))), 155);

        $pagina['titulo'] = $vagaIdioma->titulo . ' | Carreiras | 8poroito';
        $pagina['descricao'] = $descricao;
        $pagina['tituloCompartilhamento'] = $vagaIdioma->titulo . ' | Carreiras | 8poroito';
        $pagina['descricaoCompartilhamento'] = $descricao;

        return Inertia::render('Carreiras/vaga', [
            'pagina' => $pagina,
            'vaga' => [
                'id' => $vaga->id,
                'titulo' => $vagaIdioma->titulo,
                'tipo' => $vagaIdioma->tipo,
                'descricao' => $vagaIdioma->descricao,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function enviar(PostCareerRequest $request) {
        if($request->post()){
            $curriculo = new Curriculo;

            $token = md5(uniqid(rand(), true));

            $curriculo->nome = $request->nome;
            $curriculo->email = $request->email;
            $curriculo->whatsapp = $request->whatsapp;

            if ($request->file('arq')) {
                $curriculo->arquivo = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('arq')->extension());
            }

            $curriculo->cargo_id = $request->cargo ?: null;
            $curriculo->vaga_id = $request->vaga ?: null;
            $curriculo->pretensao = $request->pretensao;
            $curriculo->apresentacao = $request->apresentacao;
            $curriculo->projetos = $request->projetos;
            $curriculo->token = $token;

            $response = $curriculo->save();

            if ($request->input('redesSociais.*.tipo')) {
                $redes_sociais = [
                    'facebook' => 'Facebook',
                    'instagram' => 'Instagram',
                    'behance' => 'Behance',
                    'pinterest' => 'Pinterest',
                    'linkedin' => 'Linkedin',
                ];

                foreach ($request->input('redesSociais') as $value) {
                    $rede_social = new RedeSocial;
                    $rede_social->tipo = $redes_sociais[$value['tipo']['value']] ?? $value['tipo']['value'];
                    $rede_social->link = $value['link'];
                    $rede_social->curriculo_id = $curriculo->id;
                    $rede_social->save();
                }
            }

            if ($response) {
                if ($request->file('arq')) {
                    $request->file('arq')->move(public_path('content/resumes/'), $curriculo->arquivo);
                }

                $data['nome'] = $request->nome;
                $data['whatsapp'] = $request->whatsapp;
                $data['email'] = $request->email;
                $data['apresentacao'] = $request->apresentacao;
                $data['curriculo'] = $curriculo->arquivo ? $curriculo->arquivo : null;

                // O currículo já foi salvo: uma falha no e-mail não deve impedir a página de obrigado.
                try {
                    Mail::send('emails.curriculum', $data, function($message) use ($data) {
                        $message->from('site@8poroito.com.br')
                                ->to('trabalheconosco@8poroito.com.br')
                                ->bcc('rafael@8poroito.com.br')
                                ->subject('Um novo currículo foi enviado através da página de recrutamento!');

                        if ($data['curriculo']) {
                            $message->attach(public_path('content/resumes/' . $data['curriculo']));
                        }
                    });
                } catch (\Throwable $e) {
                    report($e);
                }

                return Inertia::location(route('Carreiras.concluido', [
                    'token' => $token
                ]));
            }
        }

        return Inertia::location(route('Carreiras.index'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function concluido($token) {

        $curriculo = Curriculo::query()
            ->where([
                'token' => $token,
                'excluido' => null,
            ])
            ->first();

        // Token inválido ou já usado (ex.: usuário atualizou a página): a página de obrigado não é de acesso livre.
        if (!$curriculo) {
            return redirect()->route('Home.index');
        }

        $curriculo->token = null;

        $response = $curriculo->save();

        return Inertia::render('Carreiras/concluido');
    }
};