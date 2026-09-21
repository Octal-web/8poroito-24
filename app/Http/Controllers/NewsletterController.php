<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostNewsletterRequest;
use Inertia\Inertia;

use App\Models\Newsletter;

use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function enviar(PostNewsletterRequest $request) {
        if($request->post()){
            $newsletter = new Newsletter;

            $newsletter->nome = $request->nome;
            $newsletter->email = $request->email;

            $response = $newsletter->save();

            if ($response) {
                $data['nome'] = $request->nome;
                $data['email'] = $request->email;

                // Mail::send('emails.newsletter', $data, function($message)use($data) {
                //     $message->from('site@8poroito.com.br')
                //             // ->to('trabalheconosco@8poroito.com.br')
                //             ->to('rafael@8poroito.com.br')
                //             ->subject('Um novo currículo foi enviado através da página de recrutamento!');
                // });

                return redirect()->back()->withSuccess([
                    'type' => 'success',
                ]);
            }
        }

        return Inertia::location(route('Newsletters.index'));
    }
};