import React, { useState } from 'react';

export const HomeNews = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para processar o envio do formulário
        console.log('Nome:', nome);
        console.log('Email:', email);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-6 flex gap-6 flex-col lg:flex-row">
                    <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required className="w-full h-16 px-3 py-2 border border-primary focus:ring-primary focus:border-primary text-center placeholder-gray-300" />
                </div>

                <div className="mb-6">
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required className="w-full h-16 px-3 py-2 border border-primary focus:ring-primary focus:border-primary text-center placeholder-gray-300" />
                </div>
                <div className="mt-10 flex gap-6 flex-col lg:flex-row">
                    <button type="submit" className="button block w-64 border border-primary border-2 text-center h-16 h-16 leading-[4rem] font-light uppercase mx-auto">Cadastrar Agora</button>
                </div>
            </form>
        </div>
    );
};