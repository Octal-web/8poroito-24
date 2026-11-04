import React from 'react';
import { Link } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Page = () => (
    <DefaultLayout>
        <section className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
            <h2 className="font-secondary text-5xl tracking-tight mb-5">Currículo enviado!</h2>
            <p className="max-w-xl mb-8">Obrigado pelo interesse em fazer parte do time da 8poroito. Recebemos seu currículo e, se o seu perfil combinar com alguma vaga, entraremos em contato.</p>
            <Link href={route('Home.index')} className="border border-primary px-8 py-4 uppercase transition-opacity hover:opacity-70">
                Voltar para o início
            </Link>
        </section>
    </DefaultLayout>
);

export default Page;
