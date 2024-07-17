<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstitucionalController;
use App\Http\Controllers\CasesController;
use App\Http\Controllers\CarreirasController;
use App\Http\Controllers\ContatoController;

Route::get('/', [HomeController::class, 'index'])->name('Home.index');

Route::get('/sobre-nos', [InstitucionalController::class, 'index'])->name('Institucional.index');

Route::get('/cases', [CasesController::class, 'index'])->name('Cases.index');
Route::get('/cases/{slug}', [CasesController::class, 'caseCliente'])->name('Cases.caseCliente');

Route::get('/carreiras', [CarreirasController::class, 'index'])->name('Carreiras.index');
Route::post('/carreiras/enviar', [CarreirasController::class, 'enviar'])->name('Carreiras.enviar');
Route::get('/carreiras/concluido/{token}', [CarreirasController::class, 'concluido'])->name('Carreiras.concluido');

Route::get('/contato', [ContatoController::class, 'index'])->name('Contato.index');
Route::post('/contato/enviar', [ContatoController::class, 'enviar'])->name('Contato.enviar');
Route::get('/contato/concluido/{token}', [ContatoController::class, 'concluido'])->name('Contato.concluido');

require __DIR__.'/auth.php';