<?php

namespace App\Services\Manager;

use App\Http\Requests\Manager\PostCaseRequest;
use App\Models\CaseCliente;
use App\Models\CaseClienteIdioma;
use App\Models\Idioma;
use App\Services\ImageCompressor;
use Carbon\Carbon;
use Illuminate\Support\Facades\File;

class CaseClienteService
{
    protected $compressor;

    public function __construct(ImageCompressor $compressor) {
        $this->compressor = $compressor;
    }

    public function create(PostCaseRequest $request, $idiomaId) {
        $caseCliente = new CaseCliente;
        $caseClienteIdioma = new CaseClienteIdioma;

        $caseCliente->destaque = $request->destaque;
        $caseCliente->ano = $request->ano;
        $caseCliente->slug = $request->slug;
        $caseCliente->imagem = md5(uniqid((string) rand(), true)) . '.webp';
        $caseCliente->banner = md5(uniqid((string) rand(), true)) . '.webp';
        $caseCliente->imagem_grid = md5(uniqid((string) rand(), true)) . '.webp';
        $response = $caseCliente->save();

        if (!$response) {
            return false;
        }

        $caseClienteIdioma->titulo = $request->titulo;
        $caseClienteIdioma->campanha = $request->campanha;
        $caseClienteIdioma->servico = $request->servico;
        $caseClienteIdioma->contexto = $request->contexto;
        $caseClienteIdioma->titulo_pagina = $request->titulo_pagina;
        $caseClienteIdioma->descricao_pagina = $request->descricao_pagina;
        $caseClienteIdioma->case_cliente_id = $caseCliente->id;
        $caseClienteIdioma->idioma_id = $idiomaId;
        $response = $caseClienteIdioma->save();

        if (!$response) {
            return false;
        }

        $this->compressor->compressOrFallback($request->file('img')->getRealPath(), public_path('content/cases/thumbs/' . $caseCliente->imagem));
        $this->compressor->compressOrFallback($request->file('img_banner')->getRealPath(), public_path('content/cases/banner/' . $caseCliente->banner));
        $this->compressor->compressOrFallback($request->file('img_grid')->getRealPath(), public_path('content/cases/grid/' . $caseCliente->imagem_grid));

        return true;
    }

    public function update(PostCaseRequest $request, $id) {
        $caseCliente = CaseCliente::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->first();

        if (!$caseCliente) {
            return null;
        }

        $idioma = Idioma::query()
            ->when($request->query('lang'), function ($query) use ($request) {
                $query->where('codigo', $request->query('lang'));
            }, function ($query) {
                $query->where('padrao', true);
            })
            ->first();

        if (!$idioma) {
            return null;
        }

        $caseClienteIdioma = CaseClienteIdioma::firstOrNew([
            'case_cliente_id' => $caseCliente->id,
            'idioma_id' => $idioma->id,
        ]);

        $caseClienteOriginal = clone $caseCliente;

        foreach (['img' => 'imagem', 'img_banner' => 'banner', 'img_grid' => 'imagem_grid'] as $input => $campo) {
            if ($request->file($input) && $request->file($input)->isValid()) {
                $caseCliente->$campo = md5(uniqid((string) rand(), true)) . '.webp';
            }
        }

        $caseCliente->destaque = $request->boolean('destaque');
        $caseCliente->ano = $request->ano;
        $caseCliente->slug = $request->slug;

        foreach (['titulo', 'campanha', 'servico', 'contexto', 'titulo_pagina', 'descricao_pagina'] as $campo) {
            $caseClienteIdioma->$campo = $request->input($campo);
        }

        $response = $caseCliente->save();

        if (!$response) {
            return false;
        }

        $response = $caseClienteIdioma->save();

        if (!$response) {
            return false;
        }

        foreach (['img' => ['imagem', 'thumbs'], 'img_banner' => ['banner', 'banner'], 'img_grid' => ['imagem_grid', 'grid']] as $input => [$campo, $pasta]) {
            if (!$request->hasFile($input)) {
                continue;
            }

            if ($caseClienteOriginal->$campo && File::exists(public_path('content/cases/' . $pasta . '/' . $caseClienteOriginal->$campo))) {
                File::delete(public_path('content/cases/' . $pasta . '/' . $caseClienteOriginal->$campo));
            }

            $this->compressor->compressOrFallback($request->file($input)->getRealPath(), public_path('content/cases/' . $pasta . '/' . $caseCliente->$campo));
        }

        return true;
    }

    public function delete($id) {
        return CaseCliente::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->update([
                'excluido' => Carbon::now()
            ]);
    }

    public function toggleVisibility($id) {
        $caseCliente = CaseCliente::query()
            ->where([
                'id' => $id,
                'excluido' => null
            ])
            ->first();

        if (!$caseCliente) {
            return null;
        }

        $caseCliente->visivel = 1 - $caseCliente->visivel;
        return $caseCliente->save();
    }

    public function order(array $ordem) {
        $erros = [];

        foreach ($ordem as $key => $id) {
            $registro = CaseCliente::query()
                ->where([
                    'excluido' => null,
                    'id' => $id
                ])
                ->update([
                    'ordem' => $key
                ]);

            if (!$registro) {
                $erros[] = $id;
            }
        }

        return !count($erros);
    }
}
