<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Contato;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContatoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $contatos = Contato::query()
            ->where([
                'excluido' => NULL,
                'proposta' => false
            ])
            ->orderBy('criado', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($contato) {
                return [
                    'id' => $contato->id,
                    'nome' => $contato->nome,
                    'data' => $contato->criado->format('d/m/Y'),
                ];
            });

        $propostas = Contato::query()
            ->where([
                'excluido' => NULL,
                'proposta' => true
            ])
            ->orderBy('criado', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function ($proposta) {
                return [
                    'id' => $proposta->id,
                    'nome' => $proposta->nome,
                    'data' => $proposta->criado->format('d/m/Y'),
                ];
            });

        return Inertia::render('Manager/Contato/index', [
            'contatos' => $contatos,
            'propostas' => $propostas
        ]);
    }

    public function visualizar($id)
    {
        if (!$id) {
            return redirect()->route('Manager.Contato.index', [], 301);
        }

        $contato = Contato::query()
            ->where([
                'excluido' => NULL,
            ])
            ->first();

        if (!$contato) {
            return redirect()->route('Manager.Home.index', [], 301);
        }

        $contato = [
            'id' => $contato->id,
            'nome' => $contato->nome,
            'email' => $contato->email,
            'telefone' => $contato->telefone,
            'empresa' => $contato->empresa,
            'cargo' => $contato->cargo,
            'mensagem' => $contato->mensagem,
            'data' => $contato->criado->format('d/m/Y H:i'),
            'proposta' => $contato->proposta ? true : false,
        ];

        return Inertia::render('Manager/Contato/visualizar', [
            'contato' => $contato
        ]);
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

            $exclusao = Contato::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect(route('Manager.Contatos.index'))->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect(route('Manager.Contatos.index'))->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }
}
