<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostCareerRequest extends FormRequest
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
            'whatsapp' => 'required|celular_com_ddd',
            'arq' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'portfolio' => 'nullable|url',
            'portfolio_arq' => 'required_without_all:portfolio,arq',
            'redesSociais.0.link' => 'required',
            'redesSociais.*.link' => 'nullable|url',
            'pretensao' => [
                'required',
                'regex:/^(?:R\$ )?(?:\d{1,3}(?:\.\d{3})*(?:,\d{2})?|\d+)$/',
            ],
            'apresentacao'  => 'required',
            'projetos'  => 'required',
            'cargo' => 'required',
            'politica' => 'required|accepted',
            'veracidade' => 'required|accepted',
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
            'whatsapp.required' => 'Por favor, insira seu whatsapp.',
            'whatsapp.celular_com_ddd' => 'Por favor, informe um whatsapp válido.',
            'arq.file' => 'O currículo deve estar no formato PDF ou DOC/DOCX.',
            'arq.mimes' => 'O currículo deve estar no formato PDF ou DOC/DOCX.',
            'arq.max' => 'O currículo não pode ter mais de 10MB.',
            'portfolio.url' => 'Por favor, insira um link de portfólio válido.',
            'portfolio_arq.required_without_all' => 'Por favor, preencha pelo menos um dos campos',
            'redesSociais.0.link.required' => 'Por favor, insira ao menos uma rede social.',
            'redesSociais.*.link.url' => 'Por favor, insira um link de rede social válido.',
            'pretensao.required' => 'Por favor, informe sua pretensão salarial.',
            'pretensao.regex' => 'Por favor, informe um valor monetário válido.',
            'cargo.required' => 'Por favor, escolha uma vaga para se candidatar.',
            'apresentacao.required'  => 'Por favor, informe sua apresentação.',
            'projetos.required'  => 'Por favor, informe algum projeto.',
            'politica.required' => 'Para continuar, você deve concordar com a LGPD.',
            'politica.accepted' => 'Para continuar, você deve concordar com a LGPD.',
            'veracidade.required' => 'Para continuar, você deve confirmar a veracidade das informações.',
            'veracidade.accepted' => 'Para continuar, você deve confirmar a veracidade das informações.',
        ];
    }
}