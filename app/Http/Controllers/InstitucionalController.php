<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Cliente;
use App\Models\Imagem;

class InstitucionalController extends Controller
{
    public function index() {
        $idioma = view()->shared('idioma');

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

        $imagensGaleria = Imagem::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'controladora' => 'Institucional',
                'acao' => 'index'
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function($imagem) {
                return [
                    'id' => $imagem->id,
                    'imagem' => $imagem->imagem,
                ];
        });

        return Inertia::render('Institucional/page', [
            'clientes' => $clientes,
            'imagensGaleria' => $imagensGaleria
        ]);
    }
};