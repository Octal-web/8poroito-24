<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Manager\PostPortfolioRequest;

use Carbon\Carbon;
use Illuminate\Support\Facades\File;

use DeepCopy\DeepCopy;

class PortfoliosController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function adicionar()
    {
        return Inertia::render('Manager/Portfolios/adicionar');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function novo(PostPortfolioRequest $request)
    {
        if ($request->ajax()) {
            $idioma = inertia()->getShared('idioma');

            $portfolio = new Portfolio;

            $portfolio->nome = $request->nome;
            $portfolio->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());

            $response = $portfolio->save();


            if ($response) {
                $image = $request->file('img')->move(public_path('content/portfolio/'), $portfolio->imagem);

                return to_route('Manager.Home.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editar($id)
    {
        if (!$id) {
            return redirect()->route('Manager.Home.index', [], 301);
        }

        $portfolio = Portfolio::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->first();

        if (!$portfolio) {
            return redirect()->route('Manager.Home.index', [], 301);
        }

        $idioma = inertia()->getShared('idioma');

        $portfolio = [
            'id' => $portfolio->id,
            'nome' => $portfolio->nome,
            'imagem' => $portfolio->imagem,
            'rotacao' => $portfolio->rotacao,
            'posicao_x' => $portfolio->posicao_x,
            'posicao_y' => $portfolio->posicao_y,
        ];

        return Inertia::render('Manager/Portfolios/editar', [
            'idioma' => $idioma,
            'portfolio' => $portfolio,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function atualizar(PostPortfolioRequest $request, $id)
    {
        if ($request->ajax()) {
            $portfolio = Portfolio::query()
                ->where([
                    'excluido' => null,
                    'id' => $id
                ])
                ->first();

            if (!$portfolio) {
                return to_route('Manager.Home.index')->with('message', ['type' => 'error', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
            }

            $copier = new DeepCopy();
            $portfolioOriginal = $copier->copy($portfolio);

            $portfolio->nome = $request->nome;

            if ($request->file('img') && $request->file('img')->getError() == 0) {
                $portfolio->imagem = md5(uniqid((string) rand(), true)) . '.' . strtolower($request->file('img')->extension());
            }

            $response = $portfolio->save();

            if ($response) {
                if ($request->file('img') && $request->file('img')->getError() == 0) {
                    if ($portfolioOriginal->imagem && File::exists(public_path('content/portfolio/' . $portfolioOriginal->imagem))) {
                        File::delete(public_path('content/portfolio/' . $portfolioOriginal->imagem));
                    }

                    $image = $request->file('img')->move(public_path('content/portfolio/'), $portfolio->imagem);
                }

                return to_route('Manager.Home.index')->with('message', ['type' => 'success', 'msg' => 'Registro salvo com sucesso!']);
            }
        }

        return to_route('Manager.Home.index')->with('error', ['type' => 'success', 'msg' => 'Não foi possível salvar as informações. Tente novamente mais tarde.']);
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

            $exclusao = Portfolio::query()
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
    public function visibilidade(Request $request, $id)
    {
        if ($request->ajax()) {
            if (!$id) {
                return redirect()->back()->with(['type' => 'error', 'message' => 'Registro não encontrado!']);
            }

            $response = Portfolio::query()
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
            } else {
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
    public function ordenar(Request $request)
    {
        if ($request->ajax()) {
            $erros = [];

            if ($request->odr && is_array($request->odr)) {
                foreach ($request->odr as $key => $value) {
                    $registro = Portfolio::query()
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
