import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { CaseGallery } from '../../Components/CaseGallery';
import { CaseOthersCarousel } from '../../Components/CaseOthersCarousel';

const Page = () => {
    // Contents
    const { caseCliente, caseClientePosterior, outrosCases } = usePage().props;

    // States
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Lens
    const lenisRef = useRef(null);
    const titleRef = useRef(null);

    // Lens smoothScroll 
    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        gsap.from(titleRef.current,
        {
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });
    }, []);

    // Buttons Shadow Move
    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <DefaultLayout>
            <section ref={titleRef} className="mt-20 sm:mt-30 mb-7">
                <div className="container max-w-small">
                    <h3 className="text-xl text-center tracking-wider uppercase mb-3">Case</h3>
                    <div className="mb-15">
                        <h4 className="text-5xl text-center font-light mb-3">{caseCliente.titulo}</h4>
                        <div className="bg-black mx-auto h-1 w-20"></div>
                    </div>
                    <div className="text-center max-w-lg mx-auto mb-5">
                        <h2 className="text-2xl uppercase mb-5" dangerouslySetInnerHTML={{ __html: caseCliente.chamada }}></h2>
                        <div dangerouslySetInnerHTML={{ __html: caseCliente.descricao }}></div>
                    </div>
                </div>
                <div className="container">
                    <div className="w-full flex justify-between items-center opacity-35">
                        <Link href={route('Cases.index')} className="flex items-center gap-x-3 transition-all hover:opacity-75">
                            <img src={`/site/img/cases-icon.png`} />
                            <span className="text-xs underline underline-offset-2">Todos os Cases</span>                 
                        </Link>

                        <Link href={route('Cases.caseCliente', {slug: caseClientePosterior})} className="flex items-center gap-x-1 transition-all hover:opacity-75">
                            <span className="text-xs underline underline-offset-2">Próximo Case</span>                 
                            <img src={`/site/img/carousel-arrow.svg`} className="w-9" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative pb-10 mb-24 sm:pb-30 sm:mb-40">
                <div className="container relative">
                    <div className="grid grid-cols-6 gap-4">
                        {caseCliente.imagens.map((image, index) => (
                            <CaseGallery key={index} src={image.imagem} size={image.tamanho} index={index} />
                        ))}
                    </div>

                    <span className="absolute -bottom-20 sm:-bottom-40 left-[5%] w-[90%] h-0.5 bg-black opacity-55"></span>
                </div>
            </section>


            <section className="relative pb-30">
                <div className="container relative">
                    <h4 className="text-3xl text-center mb-15">Veja também:</h4>

                    <CaseOthersCarousel data={ outrosCases } />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;