<?php

namespace App\Services\Manager;

use App\Http\Requests\Manager\PostVagaRequest;
use App\Models\Vaga;
use App\Models\VagaIdioma;
use App\Models\Idioma;
use Carbon\Carbon;

class VagaService
{
    public function create(PostVagaRequest $request, $idiomaId) {
        $vaga = new Vaga;
        $vagaIdioma = new VagaIdioma;

        $response = $vaga->save();

        if (!$response) {
            return false;
        }

        $vagaIdioma->titulo = $request->titulo;
        $vagaIdioma->tipo = $request->tipo;
        $vagaIdioma->descricao = $request->descricao;
        $vagaIdioma->vaga_id = $vaga->id;
        $vagaIdioma->idioma_id = $idiomaId;

        return $vagaIdioma->save();
    }

    public function update(PostVagaRequest $request, $id) {
        $vaga = Vaga::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->first();

        if (!$vaga) {
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

        $vagaIdioma = VagaIdioma::firstOrNew([
            'vaga_id' => $vaga->id,
            'idioma_id' => $idioma->id,
        ]);

        foreach (['titulo', 'tipo', 'descricao'] as $campo) {
            $vagaIdioma->$campo = $request->input($campo);
        }

        $response = $vaga->save();

        if (!$response) {
            return false;
        }

        return $vagaIdioma->save();
    }

    public function delete($id) {
        return Vaga::query()
            ->where([
                'excluido' => null,
                'id' => $id
            ])
            ->update([
                'excluido' => Carbon::now()
            ]);
    }

    public function toggleVisibility($id) {
        $vaga = Vaga::query()
            ->where([
                'id' => $id,
                'excluido' => null
            ])
            ->first();

        if (!$vaga) {
            return null;
        }

        $vaga->visivel = 1 - $vaga->visivel;
        return $vaga->save();
    }

    public function order(array $ordem) {
        $erros = [];

        foreach ($ordem as $key => $item) {
            $id = is_array($item) ? ($item['id'] ?? null) : $item;

            $registro = Vaga::query()
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
