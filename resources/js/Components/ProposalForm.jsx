import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { InputMask } from '@react-input/mask';

export const ProposalForm = ({ gradientPosition, ...props }) => {
    const [aware, setAware] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        cargo: '',
        mensagem: '',
        politica: false,
        newsletter: false,
        proposta: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('Contato.enviar'), {
            preserveScroll: true,
        });
    };

    const handleAware = (e) => {
        setAware(!aware);

        handleChange(e);
    };

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="nome" className="block text-sm text-white font-semibold uppercase mb-1">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" value={data.nome} onChange={handleChange} placeholder="Digite seu nome" className="w-full h-10 px-4 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.nome && <p className="text-sm text-red-300 mt-1">{errors.nome}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm text-white font-semibold uppercase mb-1">E-mail:</label>
                    <input type="text" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Digite seu e-mail" className="w-full h-10 px-4 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.email && <p className="text-sm text-red-300 mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="telefone" className="block text-sm text-white font-semibold uppercase mb-1">Telefone:</label>
                    <InputMask id="telefone" name="telefone" mask="(__) _____-____" replacement={{ _: /\d/ }} value={data.telefone} onChange={handleChange} placeholder="(DDD) + número" className="w-full h-10 px-4 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.telefone && <p className="text-sm text-red-300 mt-1">{errors.telefone}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="empresa" className="block text-sm text-white font-semibold uppercase mb-1">Empresa:</label>
                    <input type="text" id="empresa" name="empresa" value={data.empresa} onChange={handleChange} placeholder="Sua empresa" className="w-full h-10 px-4 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.empresa && <p className="text-sm text-red-300 mt-1">{errors.empresa}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="cargo" className="block text-sm text-white font-semibold uppercase mb-1">Cargo:</label>
                    <input type="text" id="cargo" name="cargo" value={data.cargo} onChange={handleChange} placeholder="Seu cargo" className="w-full h-10 px-4 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.cargo && <p className="text-sm text-red-300 mt-1">{errors.cargo}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="mensagem" className="block text-sm text-white font-semibold uppercase mb-1">Mensagem:</label>
                    <textarea id="mensagem" name="mensagem" value={data.mensagem} onChange={handleChange} placeholder="Escrever..." className="w-full h-30 px-4 py-4 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300"></textarea>
                    {errors.mensagem && <p className="text-sm text-red-300 mt-1">{errors.mensagem}</p>}
                </div>
            </div>

            <div className="mb-4 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <div className="flex items-center mb-5 xl:mb-3 2xl:mb-4">
                        <input type="checkbox" id="politica" name="politica" className="h-5 w-5 invert text-primary focus:ring-0" checked={data.politica} onChange={handleAware} />
                        <label htmlFor="politica" className="ml-2 block text-sm text-white-700">Estou de acordo com a <Link className="underline">Política de Privacidade</Link>.</label>
                    </div>
                    {errors.politica && <p className="text-red-400 -mt-3 mb-3">{errors.politica}</p>}
                </div>
            </div>
            <div className="mt-6 flex gap-6 flex-col lg:flex-row">
                <button
                    type="submit"
                    className={`relative overflow-hidden block w-64 border border-white text-center text-white h-16 leading-[4rem] font-light uppercase transition-all mx-auto md:mx-0 ${!aware && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!aware && true}
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                    }}
                    >
                    Enviar mensagem
                </button>
            </div>
        </form>
    );
};
