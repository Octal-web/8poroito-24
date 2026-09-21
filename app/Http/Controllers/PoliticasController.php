<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PoliticasController extends Controller
{
    public function privacidade() {

        return Inertia::render('Politicas/privacidade');
    }
};