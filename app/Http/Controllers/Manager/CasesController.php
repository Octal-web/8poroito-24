<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\CaseCliente;
use App\Models\CaseClienteIdioma;
use App\Models\Idioma;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Manager\PostCaseRequest;

use Carbon\Carbon;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

use DeepCopy\DeepCopy;

class CasesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $idioma = inertia()->getShared('idioma');

        $casesClientes = CaseCliente::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                        ->orWhere('padrao', true);
                    })
                    ->orderBy('idioma_id', 'DESC');
                }
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function($caseCliente) {
                return [
                    'id' => $caseCliente->id,
                    'visivel' => $caseCliente->visivel,
                    'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
                    'imagem' => $caseCliente->imagem,
                ];
            });

        return Inertia::render('Manager/Cases/index', [
            'casesClientes' => $casesClientes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar() {
        return Inertia::render('Manager/Cases/adicionar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostCaseRequest $request) {
        if($request->ajax()){
            $idioma = inertia()->getShared('idioma');

            $caseCliente = new CaseCliente;
            $caseCliente_idioma = new CaseClienteIdioma;

            $caseCliente->destaque = $request->destaque;
            $caseCliente->ano = $request->ano;

            $caseCliente->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            $caseCliente->banner = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_banner')->extension());
            $caseCliente->imagem_grid = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img_grid')->extension());

            $response = $caseCliente->save();

            $caseCliente_idioma->titulo = $request->titulo;
            $caseCliente_idioma->campanha = $request->campanha;
            $caseCliente_idioma->servico = $request->servico;
            $caseCliente_idioma->contexto = $request->contexto;
            $caseCliente_idioma->titulo_pagina = $request->titulo_pagina;
            $caseCliente_idioma->descricao_pagina = $request->descricao_pagina;

            $caseCliente_idioma->case_cliente_id = $caseCliente->id;
            $caseCliente_idioma->idioma_id = $idioma->id;

            $response = $caseCliente_idioma->save();

            if ($response) {
                $image = $request->file('img')->move(public_path('content/cases/thumbs/'), $caseCliente->imagem);
                $image = $request->file('img_banner')->move(public_path('content/cases/banner/'), $caseCliente->banner);
                $image = $request->file('img_grid')->move(public_path('content/cases/grid/'), $caseCliente->imagem_grid);

                return to_route('Manager.Cases.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editar($id) {
        if (!$id) {
            return Inertia::location(route('Manager.Cases.index'));
        }
        
        $idiomas = Idioma::query()
            ->orderBy('padrao', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        $idioma = request('lang');

        $caseCliente = CaseCliente::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) use ($idioma) {
                    $q->when($idioma, function ($r) use($idioma) {
                        $r->whereHas('idiomas', function($query) use($idioma) {
                            $query->where('codigo', $idioma);
                        });
                    })
                    ->when(!$idioma, function ($r) {
                        $r->whereHas('idiomas', function($query) {
                            $query->where('padrao', true);
                        });
                    });
                },
            ])
            ->first();

        if(!$caseCliente) {
            return Inertia::location(route('Manager.Cases.index'));
        }

        $idioma = inertia()->getShared('idioma');

        $caseCliente = [
            'id' => $caseCliente->id,
            'ano' => $caseCliente->ano,
            'destaque' => $caseCliente->destaque ? true : false,
            'imagem' => $caseCliente->imagem,
            'banner' => $caseCliente->banner,
            'imagem_grid' => $caseCliente->imagem_grid,
            'titulo' => count($caseCliente->casesClientesIdiomas) ? $caseCliente->casesClientesIdiomas[0]->titulo : null,
            'campanha' => count($caseCliente->casesClientesIdiomas) ? ($caseCliente->casesClientesIdiomas[0]->campanha ?? '') : '',
            'servico' => count($caseCliente->casesClientesIdiomas) ? $caseCliente->casesClientesIdiomas[0]->servico : null,
            'contexto' => count($caseCliente->casesClientesIdiomas) ? $caseCliente->casesClientesIdiomas[0]->contexto : null,
            'titulo_pagina' => count($caseCliente->casesClientesIdiomas) ? $caseCliente->casesClientesIdiomas[0]->titulo_pagina : null,
            'descricao_pagina' => count($caseCliente->casesClientesIdiomas) ? $caseCliente->casesClientesIdiomas[0]->descricao_pagina : null
        ];

        return Inertia::render('Manager/Cases/editar', [
            'idiomas' => $idiomas,
            'idioma' => $idioma,
            'caseCliente' => $caseCliente
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostCaseRequest $request, $id) {
        if ($request->ajax()) {
            $caseCliente = CaseCliente::whereNull('excluido')->findOrFail($id);
            $idioma = Idioma::query()
                ->when($request->query('lang'), function ($query) use ($request) {
                    $query->where('codigo', $request->query('lang'));
                }, function ($query) {
                    $query->where('padrao', true);
                })
                ->firstOrFail();

            $caseCliente_idioma = CaseClienteIdioma::firstOrNew([
                'case_cliente_id' => $caseCliente->id,
                'idioma_id' => $idioma->id,
            ]);

            $caseCliente->destaque = $request->boolean('destaque');
            $caseCliente->ano = $request->ano;

            foreach (['img' => ['imagem', 'thumbs'], 'img_banner' => ['banner', 'banner'], 'img_grid' => ['imagem_grid', 'grid']] as $input => [$campo, $pasta]) {
                if ($request->hasFile($input)) {
                    $anterior = $caseCliente->$campo;
                    $nome = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file($input)->extension());
                    $request->file($input)->move(public_path('content/cases/' . $pasta), $nome);
                    $caseCliente->$campo = $nome;
                    if ($anterior) {
                        File::delete(public_path('content/cases/' . $pasta . '/' . $anterior));
                    }
                }
            }

            foreach (['titulo', 'campanha', 'servico', 'contexto', 'titulo_pagina', 'descricao_pagina'] as $campo) {
                $caseCliente_idioma->$campo = $request->input($campo);
            }

            $caseCliente->save();
            $caseCliente_idioma->save();

            return to_route('Manager.Cases.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
        }

        return to_route('Manager.Cases.index');
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id) {
        if ($request->ajax()){
            if (!$id) {
                return $request->header('referer');
            }

            $exclusao = Cliente::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }

    /**
     * Set the specified resource to visible/invisible.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function visibilidade(Request $request, $id) {
        if ($request->ajax()){
            if (!$id) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Registro não encontrado!']);
            }

            $response = Cliente::query()
                ->where([
                    'id' => $id,
                    'excluido' => NULL
                ])
                ->first();

            if (!$response) {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
            }
    
            $response->visivel = 1 - $response->visivel;
            $response->save();
    
            if ($response) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Visibilidade alterada com sucesso!']);
            }
            else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Visibilidade não alterada!']);
            }
        }

        return $request->header('referer');
    }

    /**
     * Update the order of the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function ordenar(Request $request) {
        if ($request->ajax()){
            $erros = [];

            if ($request->odr && is_array($request->odr)) {
                foreach ($request->odr as $key => $value) {
                    $registro = Cliente::query()
                        ->where([
                            'excluido' => NULL,
                            'id' => $value
                        ])
                        ->update([
                            'ordem' => $key,
                        ]);

                    $errors[] = $registro;
                }
            }

            if (!count($erros)) {
                return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registros reordenados com sucesso!']);
            } else {
                return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
            }
        }

        return redirect()->back();
    }
}
