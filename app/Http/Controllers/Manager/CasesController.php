<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\PostCaseRequest;
use App\Models\CaseCliente;
use App\Models\Idioma;
use App\Services\Manager\CaseClienteService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CasesController extends Controller
{
    protected $caseClienteService;

    public function __construct(CaseClienteService $caseClienteService) {
        $this->caseClienteService = $caseClienteService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $idioma = inertia()->getShared('idioma');

        $casesClientes = CaseCliente::query()
            ->where([
                'excluido' => null
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
            ->map(function ($caseCliente) {
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
        if (!$request->ajax()) {
            return to_route('Manager.Cases.index');
        }

        $idioma = inertia()->getShared('idioma');
        $response = $this->caseClienteService->create($request, $idioma->id);

        if ($response) {
            return to_route('Manager.Cases.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar o registro.']);
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
                    $q->when($idioma, function ($r) use ($idioma) {
                        $r->whereHas('idiomas', function ($query) use ($idioma) {
                            $query->where('codigo', $idioma);
                        });
                    })
                    ->when(!$idioma, function ($r) {
                        $r->whereHas('idiomas', function ($query) {
                            $query->where('padrao', true);
                        });
                    });
                },
            ])
            ->first();

        if (!$caseCliente) {
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
        if (!$request->ajax()) {
            return to_route('Manager.Cases.index');
        }

        $response = $this->caseClienteService->update($request, $id);

        if ($response === null) {
            return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
        }

        if ($response) {
            return to_route('Manager.Cases.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar o registro.']);
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id) {
        if (!$request->ajax()) {
            return $request->header('referer');
        }

        if (!$id) {
            return $request->header('referer');
        }

        $response = $this->caseClienteService->delete($id);

        if ($response) {
            return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
    }

    /**
     * Set the specified resource to visible/invisible.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function visibilidade(Request $request, $id) {
        if (!$request->ajax()) {
            return $request->header('referer');
        }

        if (!$id) {
            return redirect()->back()->with(['type' => 'error', 'message' => 'Registro não encontrado!']);
        }

        $response = $this->caseClienteService->toggleVisibility($id);

        if ($response === null) {
            return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
        }

        if ($response) {
            return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Visibilidade alterada com sucesso!']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Visibilidade não alterada!']);
    }

    /**
     * Update the order of the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function ordenar(Request $request) {
        if (!$request->ajax()) {
            return redirect()->back();
        }

        if (!$request->odr || !is_array($request->odr)) {
            return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
        }

        $response = $this->caseClienteService->order($request->odr);

        if ($response) {
            return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registros reordenados com sucesso!']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
    }
}
