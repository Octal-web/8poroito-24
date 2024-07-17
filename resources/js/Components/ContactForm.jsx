import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { InputMask } from '@react-input/mask';

export const ContactForm = ({ gradientPosition, ...props }) => {
    const [aware, setAware] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        cargo: '',
        mensagem: '',
        politica: false,
        newsletter: false
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

        console.log(data);
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
            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="nome" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" value={data.nome} onChange={handleChange} placeholder="Digite seu nome" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.nome && <p className="text-red-500 mt-2">{errors.nome}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="email" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">E-mail:</label>
                    <input type="text" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Digite seu e-mail" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="telefone" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">Telefone:</label>
                    <InputMask id="telefone" name="telefone" mask="(__) _____-____" replacement={{ _: /\d/ }} value={data.telefone} onChange={handleChange} placeholder="(DDD) + número" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.telefone && <p className="text-red-500 mt-2">{errors.telefone}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="empresa" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">Empresa:</label>
                    <input type="text" id="empresa" name="empresa" value={data.empresa} onChange={handleChange} placeholder="Sua empresa" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.empresa && <p className="text-red-500 mt-2">{errors.empresa}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="cargo" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">Cargo:</label>
                    <input type="text" id="cargo" name="cargo" value={data.cargo} onChange={handleChange} placeholder="Seu cargo" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.cargo && <p className="text-red-500 mt-2">{errors.cargo}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="mensagem" className="block 2xl:text-lg font-semibold uppercase xl:mb-1 2xl:mb-2">Mensagem:</label>
                    <textarea id="mensagem" name="mensagem" value={data.mensagem} onChange={handleChange} placeholder="Escrever..." className="w-full h-40 px-8 py-4 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300"></textarea>
                    {errors.mensagem && <p className="text-red-500 mt-2">{errors.mensagem}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-12 flex-col lg:flex-row">
                <div className="w-full">
                    <div className="flex items-center mb-5 xl:mb-3 2xl:mb-4">
                        <input type="checkbox" id="politica" name="politica" className="h-5 w-5 text-primary focus:ring-0" checked={data.politica} onChange={handleAware} />
                        <label htmlFor="politica" className="ml-2 block text-sm sm:text-base text-primary">Estou de acordo com a <Link className="underline">Política de Privacidade</Link>.</label>
                    </div>
                    {errors.politica && <p className="text-red-500 -mt-3 mb-3">{errors.politica}</p>}

                    <div className="flex items-center">
                        <input type="checkbox" id="newsletter" name="newsletter" className="h-5 w-5 text-primary focus:ring-0"/>
                        <label htmlFor="newsletter" className="ml-2 block text-sm sm:text-base text-primary">Quero ficar por dentro de tudo que acontece na 8poroito.</label>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex gap-6 flex-col lg:flex-row">
                <button
                    type="submit"
                    className={`relative overflow-hidden block w-64 border border-white text-center text-white h-16 leading-[4rem] font-light uppercase transition-all mx-auto md:mx-0 ${!aware && 'opacity-50 cursor-not-allowed'}`}
                    disabled={!aware && true}
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(50, 50, 50, 0.3), #000)`,
                    }}>
                    Enviar mensagem
                </button>
            </div>
        </form>
    );
};
