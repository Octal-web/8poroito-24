<?php

namespace App\Http\Requests\Manager;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PostCaseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (is_string($this->input('slug'))) {
            $this->merge(['slug' => Str::slug($this->input('slug'))]);
        }
    }

    public function rules()
    {  
        return [
            'titulo' => 'required|max:120',
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('cases_clientes', 'slug')->ignore((int) $this->route('id')),
            ],
            'campanha' => 'required|string|max:255',
            'destaque' => 'boolean',
            'ano' => 'nullable|integer|between:1000,9999',

            'img' => inertia()->getShared('action') == 'novo'
                ? 'required|image|mimes:png,jpg,jpeg|max:5120'
                : 'nullable|image|mimes:png,jpg,jpeg|max:5120',

            'img_banner' => inertia()->getShared('action') == 'novo'
                ? 'required|image|mimes:png,jpg,jpeg|max:5120'
                : 'nullable|image|mimes:png,jpg,jpeg|max:5120',

            'img_grid' => inertia()->getShared('action') == 'novo'
                ? 'required|image|mimes:png,jpg,jpeg|max:5120'
                : 'nullable|image|mimes:png,jpg,jpeg|max:5120',

            'servico' => 'required|max:150',
            'contexto' => 'required|max:1000',
            'titulo_pagina' => 'required|max:150',
            'descricao_pagina' => 'required|max:220',
        ];
    }

    public function messages()
    {
        return [
            'slug.required' => 'Por favor, informe o slug.',
            'slug.string' => 'O slug deve ser um texto.',
            'slug.max' => 'O slug não pode exceder 255 caracteres.',
            'slug.regex' => 'O slug deve conter apenas letras minúsculas, números e hífens.',
            'slug.unique' => 'Este slug já está sendo usado por outro case.',

            'titulo.required' => 'Por favor, informe o título.',
            'titulo.max' => 'O título não pode exceder 120 caracteres.',

            'campanha.required' => 'Por favor, informe o tipo da campanha.',
            'campanha.string' => 'A campanha deve ser um texto.',
            'campanha.max' => 'A campanha não pode exceder 255 caracteres.',

            'ano.integer' => 'O ano deve ser um número inteiro.',
            'ano.between' => 'O ano deve ter quatro dígitos.',

            'destaque.boolean' => 'O campo destaque deve ser verdadeiro ou falso.',

            'img.required' => 'Por favor, selecione uma imagem.',
            'img.image' => 'Por favor, selecione uma imagem válida.',
            'img.mimes' => 'Os formatos de imagem válidos são: JPG e PNG.',
            'img.max' => 'Por favor, envie um arquivo menor que 5MB.',

            'img_banner.required' => 'Por favor, selecione uma imagem para o banner.',
            'img_banner.image' => 'Por favor, selecione uma imagem válida para o banner.',
            'img_banner.mimes' => 'Os formatos de imagem válidos para o banner são: JPG e PNG.',
            'img_banner.max' => 'Por favor, envie um arquivo de banner menor que 5MB.',

            'img_grid.required' => 'Por favor, selecione uma imagem para o grid.',
            'img_grid.image' => 'Por favor, selecione uma imagem válida para o grid.',
            'img_grid.mimes' => 'Os formatos de imagem válidos para o grid são: JPG e PNG.',
            'img_grid.max' => 'Por favor, envie um arquivo de imagem do grid menor que 5MB.',

            'servico.required' => 'Por favor, informe o serviço.',
            'servico.max' => 'O serviço não pode exceder 150 caracteres.',

            'contexto.required' => 'Por favor, informe o contexto.',
            'contexto.max' => 'O contexto não pode exceder 1000 caracteres.',

            'titulo_pagina.required' => 'Por favor, informe o título da página.',
            'titulo_pagina.max' => 'O título da página não pode exceder 150 caracteres.',

            'descricao_pagina.required' => 'Por favor, informe a descrição da página.',
            'descricao_pagina.max' => 'A descrição da página não pode exceder 220 caracteres.',
        ];
    }
}
