<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostCareerRequest;
use Inertia\Inertia;

use App\Models\Curriculo;
use App\Models\RedeSocial;

use Illuminate\Support\Facades\Mail;

class CarreirasController extends Controller
{
    public function index() {
        return Inertia::render('Carreiras/page');
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

            $curriculo->cargo_id = $request->cargo;
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

                foreach ($request->input('redesSociais') as $key => $value) {
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

                // Mail::send('emails.curriculum', $data, function($message)use($data) {
                //     $message->from('site@8poroito.com.br')
                //             // ->to('trabalheconosco@8poroito.com.br')
                //             ->to('rafael@8poroito.com.br')
                //             ->subject('Um novo currículo foi enviado através da página de recrutamento!');

                //     if ($request->file('arq')) {
                //         $message->attach(public_path('content/resumes/' . $data['curriculo']));
                //     }
                // });

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

        if (!$curriculo) {
            return Inertia::location(route('Carreiras.index'));
        }

        $curriculo->token = null;

        $response = $curriculo->save();

        return Inertia::render('Carreiras/concluido');
    }
};