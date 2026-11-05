import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { CareerForm } from '../../Components/CareerForm';
import { tiposVaga } from '../../Components/Sections/CareerJobsSection';

const Page = () => {
    const { vaga } = usePage().props;

    return (
        <DefaultLayout>
            <section className="relative bg-black overflow-hidden">
                <div className="absolute top-0 right-[-20%] md:right-0 w-[150%] h-[150%] transform scale-x-75" style={{ backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 1) 70%)' }}></div>

                <div className="relative container max-w-medium z-[1] pt-12 xl:pt-16 2xl:pt-24">
                    <div className="flex min-h-[40dvh] flex-col items-center justify-center py-16 text-center text-white">
                        <Link href={route('Carreiras.index')} className="mb-8 text-sm font-light uppercase tracking-widest text-white/60 transition-colors hover:text-white">
                            &larr; Carreiras
                        </Link>
                        <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold leading-none tracking-tight text-balance mb-8">{vaga.titulo}</h1>
                        <span className="border border-white/60 px-5 py-2 text-xs uppercase tracking-widest">{tiposVaga[vaga.tipo] ?? vaga.tipo}</span>
                    </div>
                </div>
            </section>

            <section className="relative my-20 xl:my-30">
                <div
                    className="container max-w-large font-light xl:text-lg leading-relaxed [&_a]:underline [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mt-8 [&_h4]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_p]:mb-6 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2"
                    dangerouslySetInnerHTML={{ __html: vaga.descricao }}
                />
            </section>

            <section className="relative mb-20 xl:mb-40 2xl:mb-50">
                <div className="relative container max-w-large z-[1]">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl xl:text-7xl text-balance font-bold">Candidate-se</h2>
                    </div>
                    <CareerForm vagaId={vaga.id} />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;
