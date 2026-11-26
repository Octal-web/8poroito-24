<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\CaseCliente;
use App\Models\Pagina;

class CasesController extends Controller
{
    public function index()
    {

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
            ->map(function ($caseCliente) {
                return [
                    'id' => $caseCliente->id,
                    'titulo' => $caseCliente->casesClientesIdiomas[0]->titulo,
                    'imagem' => asset('content/cases/grid/' . $caseCliente->imagem_grid),
                    'slug' => $caseCliente->slug
                ];
            });

        return Inertia::render('Cases/index', [
            'casesClientes' => $casesClientes,
        ]);
    }

    public function caseCliente($slug)
    {

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

        if (!$caseCliente) {
            return redirect()->route('Cases.index', [], 301);
        }

        // Case anterior/próximo na mesma ordem da listagem, voltando ao início/fim nas pontas.
        $slugs = CaseCliente::query()
            ->where([
                'excluido' => NULL,
                'visivel' => true,
            ])
            ->orderBy('ordem', 'ASC')
            ->orderBy('id', 'DESC')
            ->pluck('slug')
            ->values();

        $posicao = $slugs->search($caseCliente->slug);
        $total = $slugs->count();

        $caseClienteAnterior = $total > 1 ? $slugs[($posicao - 1 + $total) % $total] : null;
        $caseClientePosterior = $total > 1 ? $slugs[($posicao + 1) % $total] : null;

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
            ->map(function ($caseCliente) {
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
                    'tipo' => $imagem->tipo,
                    'poster' => $imagem->poster,
                    'tamanho' => $imagem->tamanho,
                ];
            })
        ];

        return Inertia::render('Cases/caseCliente', [
            'pagina' => $pagina,
            'caseCliente' => $caseCliente,
            'caseClienteAnterior' => $caseClienteAnterior,
            'caseClientePosterior' => $caseClientePosterior,
            'outrosCases' => $outrosCases
        ]);
    }
};
