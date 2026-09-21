<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Curriculo;
use App\Models\Idioma;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Str;

class CarreirasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $curriculos = Curriculo::query()
            ->where([
                'excluido' => NULL
            ])
            ->with([
                'cargo' => function ($q)  {
                    $q->where([
                        'excluido' => NULL,
                        'visivel' => true
                    ]);
                },
                'redes_sociais' => function ($q)  {
                    $q->where([
                        'excluido' => NULL
                    ]);
                }
            ])
            ->orderBy('criado', 'ASC')
            ->orderBy('id', 'DESC')
            ->get()
            ->map(function($curriculo) {
                return [
                    'id' => $curriculo->id,
                    'nome' => $curriculo->nome,
                    'data' => $curriculo->criado->format('d/m/Y'),
                ];
            });

        return Inertia::render('Manager/Carreiras/index', [
            'curriculos' => $curriculos
        ]);
    }

    public function visualizar($id) {
        if (!$id) {
            return Inertia::location(route('Manager.Carreiras.index'));
        }
        
        $curriculo = Curriculo::query()
            ->where([
                'excluido' => NULL,
                'id' => $id
            ])
            ->with([
                'cargo' => function ($q)  {
                    $q->where([
                        'excluido' => NULL,
                        'visivel' => true
                    ]);
                },
                'redes_sociais' => function ($q)  {
                    $q->where([
                        'excluido' => NULL
                    ]);
                }
            ])
            ->first();

        if(!$curriculo) {
            return Inertia::location(route('Manager.Carreiras.index'));
        }

        $curriculo = [
            'id' => $curriculo->id,
            'nome' => $curriculo->nome,
            'email' => $curriculo->email,
            'whatsapp' => $curriculo->whatsapp,
            'pretensao' => $curriculo->pretensao,
            'cargo' => $curriculo->cargo->nome,
            'apresentacao' => $curriculo->apresentacao,
            'projetos' => $curriculo->projetos,
            'data' => $curriculo->criado->format('d/m/Y H:i'),
            'redes_sociais' => $curriculo->redes_sociais->map(function ($rede) {
                return [
                    'tipo' => $rede->tipo,
                    'link' => $rede->link,
                ];
            }),
        ];

        return Inertia::render('Manager/Carreiras/visualizar', [
            'curriculo' => $curriculo
        ]);
    }

    /**
     * Set the specified resource as deleted.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function excluir(Request $request, $id) {
        if ($request->ajax()){
            if (!$id) {
                return $request->header('referer');
            }

            $exclusao = Curriculo::query()
                ->where([
                    'excluido' => NULL,
                    'id' => $id
                ])
                ->update([
                    'excluido' => Carbon::now()
                ]);

            if ($exclusao == true) {
                return redirect(route('Manager.Carreiras.index'))->with('message', ['type' => 'alert', 'msg' => 'Registro excluído com sucesso.']);
            } else {
                return redirect(route('Manager.Carreiras.index'))->with('message', ['type' => 'error', 'msg' => 'Não foi possível excluir o registro.']);
            }
        }
    }

    /**
     * Download the specified file.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function baixarCurriculo($id) {
        $curriculo = Curriculo::query()
            ->where([
                'excluido' => NULL,
                'id' => $id
            ])
            ->first();

        if (!$curriculo) {
            return Inertia::location(route('Manager.Carreiras.index'));
        }

        $caminho = public_path('content/resumes/' . $curriculo->arquivo);
        
        if (!file_exists($caminho)) {
            return redirect()->back()->with('message', ['type' => 'alert', 'msg' => 'Arquivo não encontrado.']);
        }

        $extensao = pathinfo($caminho)['extension'];
        $nome = Str::slug($curriculo->nome);

        return response()->download($caminho, $nome . '.' . $extensao);
    }
}