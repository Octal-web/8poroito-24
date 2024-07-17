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

        return Inertia::render('Cases/page', [
            'casesClientes' => $casesClientes,
        ]);
    }

    public function caseCliente($slug) {

        $idioma = view()->shared('idioma');

        $tamanhos = [
            'grande' => 'col-span-6 sm:h-auto xl:h-[46rem] 2xl:h-[60rem]',
            'medio' => 'col-span-3 h-[12rem] sm:h-auto sm:h-auto xl:h-[34rem] 2xl:h-[46rem]',
            'pequeno' => 'col-span-2 h-[10rem] sm:h-auto xl:h-[24rem] 2xl:h-[35rem]'
        ];

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

        $caseClientePosterior = CaseCliente::query()
            ->where([
                'visivel' => true,
                'excluido' => NULL,
                'id' => $caseCliente->id + 1,
            ])
            ->first();

        if (!$caseClientePosterior) {
            $caseClientePosterior = CaseCliente::query()
                ->where([
                    'visivel' => true,
                    'excluido' => NULL,
                ])
                ->first();
        }

        $caseClientePosterior = $caseClientePosterior->slug;

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
            'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
            'chamada' => $caseCliente->casesClientesIdiomas[0]->chamada,
            'descricao' => $caseCliente->casesClientesIdiomas[0]->descricao,
            'imagens' => $caseCliente->imagensCases->map(function ($imagem) use ($tamanhos) {
                return [
                    'id' => $imagem->id,
                    'imagem' => $imagem->imagem,
                    'tamanho' => $tamanhos[$imagem->tamanho_grid],
                ];
            })
        ];

        return Inertia::render('Cases/caseCliente', [
            'pagina' => $pagina,
            'caseCliente' => $caseCliente,
            'caseClientePosterior' => $caseClientePosterior,
            'outrosCases' => $outrosCases
        ]);
    }
};