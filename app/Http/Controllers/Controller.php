<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\App;

use Inertia\Inertia;

use App\Models\Idioma;
use App\Models\Pagina;

abstract class Controller
{
    public function __construct() {
        $routeArray = app('request')->route()->getAction();
        $controllerAction = class_basename($routeArray['controller']);
        list($controller, $action) = explode('Controller@', $controllerAction);

        if (app('request')->route()->getPrefix() == '/manager') {

            Inertia::share([
                'controller' => $controller
            ]);
        } else {
            $idiomas = Idioma::query()
                ->orderBy('padrao', 'DESC')
                ->orderBy('id', 'DESC')
                ->get();
    
            $idioma = App::getLocale();

            // $conteudos = Conteudo::query()
            //     ->where([
            //         'excluido' => NULL,
            //         'controladora' => $controller,
            //         'acao' => $action
            //     ])
            //     ->with([
            //         'conteudosIdiomas' => function ($q) use ($idioma) {
            //             $q->whereHas('idiomas', function ($r) use ($idioma) {
            //                 $r->where('codigo', $idioma)
            //                 ->orWhere('padrao', true);
            //             })
            //             ->orderBy('idioma_id', 'DESC');
            //         },
            //     ])
            //     ->get();

            $pagina = Pagina::query()
                ->where([
                    'controladora' => $controller,
                    'acao' => $action
                ])
                ->with([
                    'paginasIdiomas' => function ($q) use ($idioma) {
                        $q->whereHas('idiomas', function ($r) use ($idioma) {
                            $r->where('codigo', $idioma)
                            ->orWhere('padrao', true);
                        })
                        ->orderBy('idioma_id', 'DESC');
                    },
                ])
                ->first();

            // $dados_gerais = DadosGerais::first();

            $notifyCookie = app('request')->cookie('notify-cookies');

            if ($pagina) {
                list($width, $height, $type, $attr) = getimagesize(public_path('content/pages/' . $pagina->imagem));
            }

            Inertia::share([
                'pagina' => [
                    'titulo' => $pagina->paginasIdiomas[0]->titulo,
                    'descricao' => $pagina->paginasIdiomas[0]->descricao,
                    'tituloCompartilhamento' => $pagina->paginasIdiomas[0]->titulo_compartilhamento,
                    'descricaoCompartilhamento' => $pagina->paginasIdiomas[0]->descricao_compartilhamento,
                    'imagem' => [
                        'endereco' => '/content/pages/' . $pagina->imagem,
                        'tipo' => image_type_to_mime_type($type),
                        'largura' => $width,
                        'altura' => $height,
                    ],
                ],
                // 'dados_gerais' => $dados_gerais,
                'notifyCookie' => $notifyCookie,
                'controller' => $controller,
                // 'conteudos' => $conteudos,
                'idiomas' => $idiomas,
                'idioma' => $idioma,
            ]);
        }
    }
}