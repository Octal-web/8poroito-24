<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\PostContactRequest;

use App\Models\Contato;

use Illuminate\Support\Facades\Mail;

class ContatoController extends Controller
{
    public function index() {
        return Inertia::render('Contato/page');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function enviar(PostContactRequest $request) {
        if($request->post()){
            $contato = new Contato;

            $token = md5(uniqid(rand(), true));

            $contato->nome = $request->nome;
            $contato->email = $request->email;
            $contato->telefone = $request->telefone;
            $contato->empresa = $request->empresa;
            $contato->cargo = $request->cargo;
            $contato->mensagem = $request->mensagem;
            $contato->proposta = $request->proposta ? true : false;
            $contato->token = $token;

            $response = $contato->save();


            if ($response) {
                $data['nome'] = $request->nome;
                $data['email'] = $request->email;
                $data['telefone'] = $request->telefone;
                $data['empresa'] = $request->empresa . ' - ' . $request->cargo;

                // Mail::send('emails.curriculum', $data, function($message)use($data) {
                //     $message->from('site@8poroito.com.br')
                //             // ->to('trabalheconosco@8poroito.com.br')
                //             ->to('rafael@8poroito.com.br')
                //             ->subject('Obrigado por entrar em contato!');
                // });

                return Inertia::location(route('Contato.concluido', [
                    'token' => $token
                ]));
            }
        }

        return Inertia::location(route('Contato.index'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function concluido($token) {

        $contato = Contato::query()
            ->where([
                'token' => $token,
                'excluido' => null,
            ])
            ->first();

        if (!$contato) {
            return Inertia::location(route('Contato.index'));
        }

        $contato->token = null;

        $response = $contato->save();

        return Inertia::render('Contato/concluido');
    }
};