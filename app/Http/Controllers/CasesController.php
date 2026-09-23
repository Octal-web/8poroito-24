<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\CaseCliente;
use App\Models\Pagina;

class CasesController extends Controller
{
    public function index() {

        $idioma = view()->shared('idioma');

        $casesClientes = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) use ($idioma) {
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
            ->map(function($caseCliente) {
                return [
                    'id' => $caseCliente->id,
                    'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
                    'imagem' => $caseCliente->imagem,
                    'slug' => $caseCliente->slug
                ];
            });

        return Inertia::render('Cases/index', [
            'casesClientes' => $casesClientes,
        ]);
    }

    public function caseCliente($slug) {

        $idioma = view()->shared('idioma');

        $caseCliente = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                'slug' => $slug
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) use ($idioma) {
                    $q->whereHas('idiomas', function ($r) use ($idioma) {
                        $r->where('codigo', $idioma)
                        ->orWhere('padrao', true);
                    })
                    ->orderBy('idioma_id', 'DESC');
                },
                'imagensCases' => function ($q) {
                    $q->where([
                        'visivel' => true,
                        'excluido' => NULL
                    ])
                    ->orderBy('ordem', 'ASC')
                    ->orderBy('id', 'DESC'); 
                }

            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->first();

        if(!$caseCliente) {
            return Inertia::location(route('Cases.index'));
        }

        $outrosCases = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
                ['id', '!=', $caseCliente->id]
            ])
            ->with([
                'casesClientesIdiomas' => function ($q) use ($idioma) {
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
            ->map(function($caseCliente) {
                return [
                    'id' => $caseCliente->id,
                    'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
                    'imagem' => $caseCliente->imagem,
                    'slug' => $caseCliente->slug
                ];
            });

        $pagina = new Pagina;

        $pagina->titulo = $caseCliente->casesClientesIdiomas[0]->titulo_pagina . ' | 8poroito';
        $pagina->descricao = $caseCliente->casesClientesIdiomas[0]->descricao_pagina . ' | 8poroito';
        $pagina->titulo_compartilhamento = $caseCliente->casesClientesIdiomas[0]->titulo_pagina . ' | 8poroito';
        $pagina->descricao_compartilhamento = $caseCliente->casesClientesIdiomas[0]->descricao_pagina . ' | 8poroito';

        list($width, $height, $type, $attr) = getimagesize(public_path('/content/cases/thumbs/' . $caseCliente->imagem));

        $pagina->imagem = [
            'endereco' => '/content/cases/thumbs/' . $caseCliente->imagem,
            'tipo' => image_type_to_mime_type($type),
            'largura' => $width,
            'altura' => $height,
        ];

        $caseCliente = [
            'id' => $caseCliente->id,
            'ano' => $caseCliente->ano,
            'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
            'servico' => $caseCliente->casesClientesIdiomas[0]->servico,
            'campanha' => $caseCliente->casesClientesIdiomas[0]->campanha,
            'contexto' => $caseCliente->casesClientesIdiomas[0]->contexto,
            'imagens' => $caseCliente->imagensCases->map(function ($imagem) {
                return [
                    'id' => $imagem->id,
                    'imagem' => $imagem->imagem,
                    'tamanho' => $imagem->tamanho_grid,
                ];
            })
        ];

        return Inertia::render('Cases/caseCliente', [
            'pagina' => $pagina,
            'caseCliente' => $caseCliente,
            'outrosCases' => $outrosCases
        ]);
    }
};
