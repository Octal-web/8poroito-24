<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostVagaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'titulo' => 'required|max:48',
            'tipo' => 'required|in:presencial,remoto',
            'descricao' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'titulo.required' => 'Por favor, informe o título.',
            'titulo.max' => 'O título não pode exceder 48 caracteres.',

            'tipo.required' => 'Por favor, selecione o tipo da vaga.',
            'tipo.in' => 'O tipo da vaga deve ser presencial ou remoto.',

            'descricao.required' => 'Por favor, informe a descrição.',
        ];
    }
}
