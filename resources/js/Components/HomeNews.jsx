import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export const HomeNews = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        nome: '',
        email: ''
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
        clearErrors();

        post(route('Newsletter.enviar'), {
            preserveScroll: true,
            onSuccess: (response) => {
                console.log(response);
                if (response.props.success && response.props.success.type === 'success') {
                    setSuccessMessage('Seu contato foi enviado com sucesso!');
                }
            },
        });
    };

    return (
        <div className="relative">
            {successMessage && (
                <div className="absolute inset-0 bg-white text-center px-4 pb-2 pt-10" role="alert">
                    <div className="text-5xl mb-2">Feito!</div>
                    <div className="font-light">{successMessage}</div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6 flex gap-6 flex-col lg:flex-row">
                    <div className="w-full">
                        <input type="text" id="nome" name="nome" value={data.nome} onChange={handleChange} placeholder="Digite seu nome" className="w-full h-16 px-3 py-2 border border-primary focus:ring-primary focus:border-primary text-center placeholder-gray-300" />
                        {errors.nome && <p className="text-red-500 mt-2">{errors.nome}</p>}
                    </div>
                </div>

                <div className="mb-6">
                    <div className="w-full">
                        <input type="text" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Digite seu e-mail" className="w-full h-16 px-3 py-2 border border-primary focus:ring-primary focus:border-primary text-center placeholder-gray-300" />
                        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                    </div>
                </div>

                <div className="mt-10 flex gap-6 flex-col lg:flex-row">
                    <button type="submit" className="button block w-64 border border-primary border-2 text-center h-16 h-16 leading-[4rem] font-light uppercase mx-auto">Cadastrar Agora</button>
                </div>
            </form>
        </div>
    );
};