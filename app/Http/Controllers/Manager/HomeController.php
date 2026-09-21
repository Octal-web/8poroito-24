<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Inertia\Inertia;

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

        $clientes = Cliente::query()
            ->where([
                'excluido' => NULL
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
            ->map(function($cliente) {
                return [
                    'id' => $cliente->id,
                    'logo' => $cliente->logo,
                    'visivel' => $cliente->visivel,
                    'nome' => $cliente->clientesIdiomas[0]->nome,
                ];
            });

        $portfolios = Portfolio::query()
            ->where([
                'excluido' => NULL
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function($portfolio) {
                return [
                    'id' => $portfolio->id,
                    'imagem' => $portfolio->imagem,
                    'visivel' => $portfolio->visivel,
                    'rotacao' => $portfolio->rotacao,
                    'x' => $portfolio->posicao_x,
                    'y' => $portfolio->posicao_y,
                    'nome' => $portfolio->nome,
                ];
            });

        return Inertia::render('Manager/Home/index', [
            'clientes' => $clientes,
            'portfolios' => $portfolios
        ]);
    }
};