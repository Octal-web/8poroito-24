<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'nome' => 'required',
            'email' => 'required|email',
            'telefone' => 'required|celular_com_ddd',
            'empresa'  => 'required',
            'cargo'  => 'required',
            'mensagem' => 'required',
            'politica' => 'required|accepted',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'nome.required' => 'Por favor, insira seu nome.',
            'email.required' => 'Por favor, insira seu e-mail.',
            'email.email' => 'Por favor, insira um e-mail válido.',
            'telefone.required' => 'Por favor, insira seu telefone.',
            'telefone.celular_com_ddd' => 'Por favor, informe um telefone válido.',
            'empresa.required' => 'Por favor, informe sua empresa.',
            'cargo.required' => 'Por favor, informe seu cargo na empresa.',
            'mensagem.required'  => 'Por favor, informe a sua mensagem.',
            'politica.required' => 'Para continuar, você deve concordar com a LGPD.',
            'politica.accepted' => 'Para continuar, você deve concordar com a LGPD.',
        ];
    }
}