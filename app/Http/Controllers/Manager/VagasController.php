<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\PostVagaRequest;
use App\Models\Vaga;
use App\Models\Idioma;
use App\Services\Manager\VagaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VagasController extends Controller
{
    protected $vagaService;

    public function __construct(VagaService $vagaService) {

        parent::__construct();
        $this->vagaService = $vagaService;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar() {
        return Inertia::render('Manager/Vagas/adicionar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostVagaRequest $request) {
        if (!$request->ajax()) {
            return to_route('Manager.Carreiras.index');
        }

        $idioma = inertia()->getShared('idioma');
        $response = $this->vagaService->create($request, $idioma->id);

        if ($response) {
            return to_route('Manager.Carreiras.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
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
            return Inertia::location(route('Manager.Carreiras.index'));
        }

        $idiomas = Idioma::query()
            ->orderBy('padrao', 'DESC')
            ->orderBy('id', 'DESC')
            ->get();

        $idioma = request('lang');

        $vaga = Vaga::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->with([
                'vagasIdiomas' => function ($q) use ($idioma) {
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

        if (!$vaga) {
            return Inertia::location(route('Manager.Carreiras.index'));
        }

        $idioma = inertia()->getShared('idioma');

        $vaga = [
            'id' => $vaga->id,
            'titulo' => count($vaga->vagasIdiomas) ? $vaga->vagasIdiomas[0]->titulo : null,
            'tipo' => count($vaga->vagasIdiomas) ? $vaga->vagasIdiomas[0]->tipo : null,
            'descricao' => count($vaga->vagasIdiomas) ? $vaga->vagasIdiomas[0]->descricao : null,
        ];

        return Inertia::render('Manager/Vagas/editar', [
            'idiomas' => $idiomas,
            'idioma' => $idioma,
            'vaga' => $vaga
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostVagaRequest $request, $id) {
        if (!$request->ajax()) {
            return to_route('Manager.Carreiras.index');
        }

        $response = $this->vagaService->update($request, $id);

        if ($response === null) {
            return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registro não encontrado!']);
        }

        if ($response) {
            return to_route('Manager.Carreiras.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
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

        $response = $this->vagaService->delete($id);

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

        $response = $this->vagaService->toggleVisibility($id);

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

        $response = $this->vagaService->order($request->odr);

        if ($response) {
            return redirect()->back()->with('message', ['type' => 'success', 'msg' => 'Registros reordenados com sucesso!']);
        }

        return redirect()->back()->with('message', ['type' => 'error', 'msg' => 'Registros não reordenados, tente novamente mais tarde!']);
    }
}
