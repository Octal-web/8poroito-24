<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;

class PostPortfolioRequest extends FormRequest
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
            'nome'  => 'required',
            'img' => inertia()->getShared('action') == 'novo' ? 'required|image|mimes:png,jpg|max:2048' : 'nullable|image|mimes:png,jpg|max:2048',
            'rotacao' => 'required|numeric|min:-360|max:360',
            'posicao_x' => 'required|numeric|min:-1000|max:1000',
            'posicao_y' => 'required|numeric|min:-1000|max:1000',
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
            'nome.required'  => 'Por favor, informe o nome.',
            'img.required' => 'Por favor, selecione uma imagem.',
            'img.image' => 'Por favor, selecione uma imagem válida.',
            'img.mimes' => 'Os formatos de imagem válidos são: JPG e PNG.',
            'img.max' => 'Por favor, envie um arquivo menor que 2MB.',
            'rotacao.required' => 'Por favor, informe a rotação da imagem.',
            'rotacao.numeric' => 'A rotação da imagem deve ser um número.',
            'rotacao.min' => 'A rotação da imagem deve ser no mínimo -360.',
            'rotacao.max' => 'A rotação da imagem deve ser no máximo 360.',
            'posicao_x.required' => 'Por favor, informe a posição X da imagem.',
            'posicao_x.numeric' => 'A posição X da imagem deve ser um número.',
            'posicao_x.min' => 'A posição X da imagem deve ser no mínimo -1000.',
            'posicao_x.max' => 'A posição X da imagem deve ser no máximo 1000.',
            'posicao_y.required' => 'Por favor, informe a posição Y da imagem.',
            'posicao_y.numeric' => 'A posição Y da imagem deve ser um número.',
            'posicao_y.min' => 'A posição Y da imagem deve ser no mínimo -1000.',
            'posicao_y.max' => 'A posição Y da imagem deve ser no máximo 1000.',
        ];
    }
}