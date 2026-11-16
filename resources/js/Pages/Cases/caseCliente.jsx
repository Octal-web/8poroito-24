import React, { useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { CaseGallery } from '../../Components/CaseGallery';
import { CaseOthersCarousel } from '../../Components/CaseOthersCarousel';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
    // Contents
    const { caseCliente, caseClienteAnterior, caseClientePosterior, outrosCases } = usePage().props;

    const titleRef = useRef(null);

    useEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from(titleRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 90%',
                    once: true,
                },
            });
        });
        return () => media.revert();
    }, []);

    return (
        <DefaultLayout>
            <section ref={titleRef} className="mt-12 mb-8 sm:mt-20 sm:mb-12 lg:mt-30">
                <div className="container max-w-large">
                    <nav aria-label="Navegação entre cases" className="grid grid-cols-3 items-center opacity-70">
                        <div>
                            {caseClienteAnterior && (
                                <Link href={route('Cases.caseCliente', { slug: caseClienteAnterior })} className="flex w-fit items-center gap-x-1 transition-all hover:opacity-75">
                                    <img src="/site/img/carousel-arrow.svg" alt="" className="w-9 rotate-180" />
                                    <span className="text-xs underline underline-offset-2">Case anterior</span>
                                </Link>
                            )}
                        </div>

                        <Link href={route('Cases.index')} className="mx-auto flex items-center gap-x-3 transition-all hover:opacity-75">
                            <img src="/site/img/cases-icon.png" alt="" />
                            <span className="hidden text-xs underline underline-offset-2 sm:inline">Todos os Cases</span>
                        </Link>

                        <div className="flex justify-end">
                            {caseClientePosterior && (
                                <Link href={route('Cases.caseCliente', { slug: caseClientePosterior })} className="flex w-fit items-center gap-x-1 transition-all hover:opacity-75">
                                    <span className="text-xs underline underline-offset-2">Próximo case</span>
                                    <img src="/site/img/carousel-arrow.svg" alt="" className="w-9" />
                                </Link>
                            )}
                        </div>
                    </nav>

                    <div aria-hidden="true" className="my-8 h-0.5 w-full bg-black/[0.55] sm:mt-10" />

                    <h1 className="mb-8 break-words text-3xl font-bold uppercase leading-tight sm:mb-10 sm:text-4xl lg:mb-12 lg:text-6xl">{caseCliente.campanha}</h1>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
                        <div className="grid min-w-0 grid-cols-1 gap-5 break-words sm:grid-cols-3 lg:grid-cols-1 lg:content-start">
                            <div>
                                <h4 className="text-xl font-bold uppercase">Cliente:</h4>
                                <div className="text-lg text-black/60 leading-tight">{caseCliente.titulo}</div>
                            </div>
                            
                            <div>
                                <h4 className="text-xl font-bold uppercase">Serviço:</h4>
                                <div className="text-lg text-black/60 leading-tight whitespace-pre-line">{caseCliente.servico}</div>
                            </div>
                            
                            {/* <div className="">
                                <h4 className="text-xl font-bold uppercase">Ano:</h4>
                                <div className="text-lg text-black/60 leading-tight">{caseCliente.ano}</div>
                            </div> */}
                        </div>

                        <div className="min-w-0 break-words lg:col-span-3">
                            <h4 className="text-xl font-bold uppercase">Contexto:</h4>
                            <div className="text-base text-black/60 leading-relaxed sm:text-lg [&_img]:max-w-full [&_a]:break-all" dangerouslySetInnerHTML={{ __html: caseCliente.contexto }}></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative mb-12 sm:mb-20 lg:mb-30">
                <div className="container relative">
                    <CaseGallery images={caseCliente.imagens ?? []} title={caseCliente.campanha || caseCliente.titulo} />
                </div>
            </section>


            <section className="relative pb-12 sm:pb-20 lg:pb-30">
                <div className="container relative">
                    <h4 className="mb-8 text-center text-2xl sm:mb-15 sm:text-3xl">Veja também:</h4>

                    <CaseOthersCarousel data={ outrosCases } />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;
