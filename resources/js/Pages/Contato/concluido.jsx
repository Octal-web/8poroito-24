import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';

const Page = () => {
    const { proposta } = usePage().props;

    return (
        <DefaultLayout>
            <section className="container flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
                <h2 className="font-secondary text-5xl tracking-tight mb-5">
                    {proposta ? 'Solicitação enviada!' : 'Mensagem enviada!'}
                </h2>
                <p className="max-w-xl mb-8">
                    {proposta
                        ? 'Recebemos sua solicitação de proposta. Em breve entraremos em contato.'
                        : 'Recebemos sua mensagem. Em breve entraremos em contato.'}
                </p>
                <Link href={route('Home.index')} className="border border-primary px-8 py-4 uppercase transition-opacity hover:opacity-70">
                    Voltar para o início
                </Link>
            </section>
        </DefaultLayout>
    );
};

export default Page;
