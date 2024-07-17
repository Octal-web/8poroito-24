<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\CaseCliente;
use App\Models\Cliente;
use App\Models\Portfolio;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $idioma = view()->shared('idioma');

        $destaques = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'destaque' => true
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
            ->map(function($destaque) {
                return [
                    'id' => $destaque->id,
                    'slug' => $destaque->slug,
                    'banner' => $destaque->banner,
                    'titulo' => $destaque->casesClientesIdiomas[0]->titulo,
                ];
            });

        $clientes = Cliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'clientesIdiomas' => function ($q) use ($idioma) {
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
            ->map(function($destaque) {
                return [
                    'id' => $destaque->id,
                    'logo' => $destaque->logo,
                    'nome' => $destaque->clientesIdiomas[0]->nome,
                ];
            });

        $portfolios = Portfolio::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'imagem' => $portfolio->imagem,
                    'rotacao' => $portfolio->rotacao,
                    'x' => $portfolio->posicao_x,
                    'y' => $portfolio->posicao_y,
                ];
            });

        return Inertia::render('Home/page', [
            'destaques' => $destaques,
            'clientes' => $clientes,
            'portfolios' => $portfolios
        ]);
    }
};