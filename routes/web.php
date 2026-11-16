<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\InstitucionalController;
use App\Http\Controllers\CasesController;
use App\Http\Controllers\CarreirasController;
use App\Http\Controllers\ContatoController;
use App\Http\Controllers\PoliticasController;

use App\Http\Controllers\Manager\UsuariosController;
use App\Http\Controllers\Manager\PaginasController as ManagerPaginasController;
use App\Http\Controllers\Manager\ConteudosController as ManagerConteudosController;
use App\Http\Controllers\Manager\ImagensController as ManagerImagensController;
use App\Http\Controllers\Manager\HomeController as ManagerHomeController;
use App\Http\Controllers\Manager\ClientesController as ManagerClientesController;
use App\Http\Controllers\Manager\PortfoliosController as ManagerPortfoliosController;
use App\Http\Controllers\Manager\InstitucionalController as ManagerInstitucionalController;
use App\Http\Controllers\Manager\CasesController as ManagerCasesController;
use App\Http\Controllers\Manager\ImagensCasesController as ManagerImagensCasesController;
use App\Http\Controllers\Manager\CarreirasController as ManagerCarreirasController;
use App\Http\Controllers\Manager\VagasController as ManagerVagasController;
use App\Http\Controllers\Manager\ContatoController as ManagerContatoController;
use App\Http\Controllers\Manager\PoliticasController as ManagerPoliticasController;
use App\Http\Controllers\Manager\DashboardController as ManagerDashboardController;
use App\Http\Controllers\Manager\FinderController as ManagerFinderController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => LaravelLocalization::setLocale(), 'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']], function () {
    Route::get('/', [HomeController::class, 'index'])->name('Home.index');

    Route::post('/newsletter/enviar', [NewsletterController::class, 'enviar'])->name('Newsletter.enviar');

    Route::get('/sobre-nos', [InstitucionalController::class, 'index'])->name('Institucional.index');

    Route::get('/cases', [CasesController::class, 'index'])->name('Cases.index');
    Route::get('/cases/{slug}', [CasesController::class, 'caseCliente'])->name('Cases.caseCliente');

    Route::get('/carreiras', [CarreirasController::class, 'index'])->name('Carreiras.index');
    Route::post('/carreiras/enviar', [CarreirasController::class, 'enviar'])->name('Carreiras.enviar');
    Route::get('/carreiras/concluido/{token}', [CarreirasController::class, 'concluido'])->name('Carreiras.concluido');
    Route::get('/carreiras/vagas/{id}/{slug?}', [CarreirasController::class, 'vaga'])->whereNumber('id')->name('Carreiras.vaga');

    Route::get('/contato', [ContatoController::class, 'index'])->name('Contato.index');
    Route::post('/contato/enviar', [ContatoController::class, 'enviar'])->name('Contato.enviar');
    Route::get('/contato/concluido/{token}', [ContatoController::class, 'concluido'])->name('Contato.concluido');

    Route::get('/politica-de-privacidade', [PoliticasController::class, 'privacidade'])->name('Politicas.privacidade');
});

Route::prefix('/manager')->group(function () {
    Route::get('/', [UsuariosController::class, 'login'])->name('Manager.Usuarios.login');
    Route::post('/', ['as' => 'login', 'uses' => 'App\Http\Controllers\Manager\UsuariosController@authenticate']);

    Route::post('/usuarios/logout', [UsuariosController::class, 'logout'])->name('Manager.Usuarios.logout');

    Route::group(['middleware' => ['auth']], function () {
        Route::post('/paginas/editar/{id}', [ManagerPaginasController::class, 'editarAction'])->name('Manager.Paginas.editar');

        Route::post('/conteudos/editar/{id}', [ManagerConteudosController::class, 'editarAction'])->name('Manager.Conteudos.editar');
        Route::post('/conteudos/baixar-arquivo/{id}', [ManagerConteudosController::class, 'baixarArquivo'])->name('Manager.Conteudos.baixarArquivo');

        Route::get('/imagens/{id}', [ManagerImagensController::class, 'conteudo'])->name('Manager.Imagens.conteudo');
        Route::post('/imagens/conteudo/adicionar/{id}', [ManagerImagensController::class, 'novo'])->name('Manager.Imagens.novo');

        Route::post('/imagens/conteudo/ordenar/{id}', [ManagerImagensController::class, 'ordenar'])->name('Manager.Imagens.ordenar');
        Route::post('/imagens/conteudo/visibilidade/{id}', [ManagerImagensController::class, 'visibilidade'])->name('Manager.Imagens.visibilidade');
        Route::post('/imagens/conteudo/excluir/{id}', [ManagerImagensController::class, 'excluir'])->name('Manager.Imagens.excluir');

        Route::get('/home', [ManagerHomeController::class, 'index'])->name('Manager.Home.index');

        Route::post('/clientes/ordenar', [ManagerClientesController::class, 'ordenar'])->name('Manager.Clientes.ordenar');
        Route::post('/clientes/visibilidade/{id}', [ManagerClientesController::class, 'visibilidade'])->name('Manager.Clientes.visibilidade');
        Route::post('/clientes/excluir/{id}', [ManagerClientesController::class, 'excluir'])->name('Manager.Clientes.excluir');

        Route::get('/clientes/adicionar', [ManagerClientesController::class, 'adicionar'])->name('Manager.Clientes.adicionar');
        Route::post('/clientes/adicionar', [ManagerClientesController::class, 'novo'])->name('Manager.Clientes.novo');
        Route::get('/clientes/editar/{id}', [ManagerClientesController::class, 'editar'])->name('Manager.Clientes.editar');
        Route::post('/clientes/editar/{id}', [ManagerClientesController::class, 'atualizar'])->name('Manager.Clientes.atualizar');


        Route::post('/portfolios/ordenar', [ManagerPortfoliosController::class, 'ordenar'])->name('Manager.Portfolios.ordenar');
        Route::post('/portfolios/visibilidade/{id}', [ManagerPortfoliosController::class, 'visibilidade'])->name('Manager.Portfolios.visibilidade');
        Route::post('/portfolios/excluir/{id}', [ManagerPortfoliosController::class, 'excluir'])->name('Manager.Portfolios.excluir');

        Route::get('/portfolios/adicionar', [ManagerPortfoliosController::class, 'adicionar'])->name('Manager.Portfolios.adicionar');
        Route::post('/portfolios/adicionar', [ManagerPortfoliosController::class, 'novo'])->name('Manager.Portfolios.novo');
        Route::get('/portfolios/editar/{id}', [ManagerPortfoliosController::class, 'editar'])->name('Manager.Portfolios.editar');
        Route::post('/portfolios/editar/{id}', [ManagerPortfoliosController::class, 'atualizar'])->name('Manager.Portfolios.atualizar');


        Route::get('/sobre-nos', [ManagerInstitucionalController::class, 'index'])->name('Manager.Institucional.index');

        Route::get('/cases', [ManagerCasesController::class, 'index'])->name('Manager.Cases.index');

        Route::post('/cases/ordenar', [ManagerCasesController::class, 'ordenar'])->name('Manager.Cases.ordenar');
        Route::post('/cases/visibilidade/{id}', [ManagerCasesController::class, 'visibilidade'])->name('Manager.Cases.visibilidade');
        Route::post('/cases/excluir/{id}', [ManagerCasesController::class, 'excluir'])->name('Manager.Cases.excluir');

        Route::get('/cases/adicionar', [ManagerCasesController::class, 'adicionar'])->name('Manager.Cases.adicionar');
        Route::post('/cases/adicionar', [ManagerCasesController::class, 'novo'])->name('Manager.Cases.novo');
        Route::get('/cases/editar/{id}', [ManagerCasesController::class, 'editar'])->name('Manager.Cases.editar');
        Route::post('/cases/editar/{id}', [ManagerCasesController::class, 'atualizar'])->name('Manager.Cases.atualizar');

        Route::get('/cases/imagens/{id}', [ManagerImagensCasesController::class, 'index'])->name('Manager.Cases.Imagens.index');
        Route::post('/cases/imagens/conteudo/adicionar/{id}', [ManagerImagensCasesController::class, 'novo'])->name('Manager.Cases.Imagens.novo');
        Route::put('/cases/imagens/conteudo/tamanho/{id}', [ManagerImagensCasesController::class, 'tamanho'])->name('Manager.Cases.Imagens.tamanho');

        Route::post('/cases/imagens/conteudo/ordenar/{id}', [ManagerImagensCasesController::class, 'ordenar'])->name('Manager.Cases.Imagens.ordenar');
        Route::post('/cases/imagens/conteudo/visibilidade/{id}', [ManagerImagensCasesController::class, 'visibilidade'])->name('Manager.Cases.Imagens.visibilidade');
        Route::post('/cases/imagens/conteudo/excluir/{id}', [ManagerImagensCasesController::class, 'excluir'])->name('Manager.Cases.Imagens.excluir');


        Route::get('/contato', [ManagerContatoController::class, 'index'])->name('Manager.Contato.index');
        Route::get('/contato/visualizar/{id}', [ManagerContatoController::class, 'visualizar'])->name('Manager.Contato.visualizar');
        Route::post('/contato/excluir/{id}', [ManagerContatoController::class, 'excluir'])->name('Manager.Contato.excluir');
        Route::get('/contato/baixar-curriculo/{id}', [ManagerContatoController::class, 'baixarCurriculo'])->name('Manager.Contato.baixarCurriculo');

        Route::get('/carreiras', [ManagerCarreirasController::class, 'index'])->name('Manager.Carreiras.index');
        Route::get('/carreiras/visualizar/{id}', [ManagerCarreirasController::class, 'visualizar'])->name('Manager.Carreiras.visualizar');
        Route::post('/carreiras/excluir/{id}', [ManagerCarreirasController::class, 'excluir'])->name('Manager.Carreiras.excluir');
        Route::get('/carreiras/baixar-curriculo/{id}', [ManagerCarreirasController::class, 'baixarCurriculo'])->name('Manager.Carreiras.baixarCurriculo');

        Route::post('/vagas/ordenar', [ManagerVagasController::class, 'ordenar'])->name('Manager.Vagas.ordenar');
        Route::post('/vagas/visibilidade/{id}', [ManagerVagasController::class, 'visibilidade'])->name('Manager.Vagas.visibilidade');
        Route::post('/vagas/excluir/{id}', [ManagerVagasController::class, 'excluir'])->name('Manager.Vagas.excluir');

        Route::get('/vagas/adicionar', [ManagerVagasController::class, 'adicionar'])->name('Manager.Vagas.adicionar');
        Route::post('/vagas/adicionar', [ManagerVagasController::class, 'novo'])->name('Manager.Vagas.novo');
        Route::get('/vagas/editar/{id}', [ManagerVagasController::class, 'editar'])->name('Manager.Vagas.editar');
        Route::post('/vagas/editar/{id}', [ManagerVagasController::class, 'atualizar'])->name('Manager.Vagas.atualizar');


        Route::get('/politicas/privacidade', [ManagerPoliticasController::class, 'privacidade'])->name('Manager.Politicas.privacidade');


        Route::get('/dashboard', [ManagerDashboardController::class, 'index'])->name('Manager.Dashboard.index');
        Route::get('/dashboard/obterData', [ManagerDashboardController::class, 'obterData'])->name('Manager.Dashboard.obterData');

        Route::get('/finder/list', [ManagerFinderController::class, 'list'])->name('Manager.Finder.list');
        Route::post('/finder/upload', [ManagerFinderController::class, 'upload'])->name('Manager.Finder.upload');
        Route::delete('/finder/delete', [ManagerFinderController::class, 'delete'])->name('Manager.Finder.delete');
        Route::post('/finder/rename', [ManagerFinderController::class, 'rename'])->name('Manager.Finder.rename');
        Route::post('/finder/folder', [ManagerFinderController::class, 'createFolder'])->name('Manager.Finder.createFolder');
        Route::post('/finder/move', [ManagerFinderController::class, 'move'])->name('Manager.Finder.move');
    });
});

Auth::routes(['login' => false]);
