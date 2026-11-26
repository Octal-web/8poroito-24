<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Cargo;
use App\Models\Curriculo;
use App\Models\Vaga;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Str;

class CarreirasController extends Controller
{
    const CURRICULOS_POR_PAGINA = 20;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $idioma = inertia()->getShared('idioma');

        $vagas = Vaga::query()
            ->where([
                'excluido' => null
            ])
            ->with([
                'vagasIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma->codigo)
                            ->orWhere('padrao', true);
                    })
                        ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($vaga) {
                return [
                    'id' => $vaga->id,
                    'visivel' => $vaga->visivel ? true : false,
                    'titulo' => $vaga->vagasIdiomas->isNotEmpty() ? $vaga->vagasIdiomas[0]->titulo : null,
                ];
            });

        $cargos = Cargo::query()
            ->whereNull('excluido')
            ->orderBy('ordem', 'ASC')
            ->orderBy('nome', 'ASC')
            ->get(['id', 'nome']);

        $filtros = [
            'busca' => trim((string) $request->query('busca', '')),
            'vaga' => (string) $request->query('vaga', ''),
            'cargo' => (string) $request->query('cargo', ''),
        ];

        $curriculos = Curriculo::query()
            ->whereNull('excluido')
            ->when($filtros['busca'] !== '', function ($q) use ($filtros) {
                $termo = '%' . $filtros['busca'] . '%';
                $q->where(function ($r) use ($termo) {
                    $r->where('nome', 'like', $termo)
                        ->orWhere('email', 'like', $termo);
                });
            })
            ->when($filtros['vaga'] === 'banco', fn($q) => $q->whereNull('vaga_id'))
            ->when(ctype_digit($filtros['vaga']), fn($q) => $q->where('vaga_id', $filtros['vaga']))
            ->when(ctype_digit($filtros['cargo']), fn($q) => $q->where('cargo_id', $filtros['cargo']))
            ->with([
                'cargo:id,nome',
                'vaga.vagasIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->where('padrao', true);
                    });
                }
            ])
            ->orderBy('criado', 'DESC')
            ->orderBy('id', 'DESC')
            ->paginate(self::CURRICULOS_POR_PAGINA)
            ->withQueryString()
            ->through(function ($curriculo) {
                return [
                    'id' => $curriculo->id,
                    'nome' => $curriculo->nome,
                    'email' => $curriculo->email,
                    'cargo' => $curriculo->cargo ? $curriculo->cargo->nome : null,
                    'vaga' => $curriculo->vaga && $curriculo->vaga->vagasIdiomas->isNotEmpty() ? $curriculo->vaga->vagasIdiomas[0]->titulo : null,
                    'data' => $curriculo->criado->format('d/m/Y H:i'),
                ];
            });

        return Inertia::render('Manager/Carreiras/index', [
            'vagas' => $vagas,
            'cargos' => $cargos,
            'curriculos' => $curriculos,
            'filtros' => $filtros,
        ]);
    }

    public function visualizar($id)
    {
        if (!$id) {
            return redirect()->route('Manager.Carreiras.index', [], 301);
        }

        $curriculo = Curriculo::query()
            ->where([
                'excluido' => NULL,
                'id' => $id
            ])
            ->with([
                'cargo' => function ($q) {
                    $q->where([
                        'excluido' => NULL,
                        'visivel' => true
                    ]);
                },
                'redes_sociais' => function ($q) {
                    $q->where([
                        'excluido' => NULL
                    ]);
                },
                'vaga.vagasIdiomas' => function ($q) {
                    $q->whereHas('idiomas', function ($r) {
                        $r->where('padrao', true);
                    });
                }
            ])
            ->first();

        if (!$curriculo) {
            return Inertia::location(route('Manager.Carreiras.index'));
        }

        $curriculo = [
            'id' => $curriculo->id,
            'nome' => $curriculo->nome,
            'email' => $curriculo->email,
            'whatsapp' => $curriculo->whatsapp,
            'pretensao' => $curriculo->pretensao,
            'cargo' => $curriculo->cargo ? $curriculo->cargo->nome : null,
            'vaga' => $curriculo->vaga && $curriculo->vaga->vagasIdiomas->isNotEmpty() ? $curriculo->vaga->vagasIdiomas[0]->titulo : null,
            'apresentacao' => $curriculo->apresentacao,
            'projetos' => $curriculo->projetos,
            'data' => $curriculo->criado->format('d/m/Y H:i'),
            'redes_sociais' => $curriculo->redes_sociais->map(function ($rede) {
                return [
                    'tipo' => $rede->tipo,
                    'link' => $rede->link,
                ];
            }),
        ];

        return Inertia::render('Manager/Carreiras/visualizar', [
            'curriculo' => $curriculo
        ]);
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return $request->header('referer');
            }

            $exclusao = Curriculo::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect(route('Manager.Carreiras.index'))->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect(route('Manager.Carreiras.index'))->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }

    /**
     * Download the specified file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function baixarCurriculo($id)
    {
        $curriculo = Curriculo::query()
            ->where([
                'excluido' => NULL,
                'id' => $id
            ])
            ->first();

        if (!$curriculo) {
            return redirect()->route('Manager.Carreiras.index', [], 301);
        }

        $caminho = public_path('content/resumes/' . $curriculo->arquivo);

        if (!file_exists($caminho)) {
            return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Arquivo não encontrado.']);
        }

        $extensao = pathinfo($caminho)['extension'];
        $nome = Str::slug($curriculo->nome);

        return response()->download($caminho, $nome . '.' . $extensao);
    }
}
