import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { CasesList } from '../../Components/CasesList';

const Page = () => {
    // Contents
    const { casesClientes } = usePage().props;

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
            <section ref={titleRef} className="mt-20 sm:mt-30 mb-20">
                <div className="container max-w-small">
                    <h4 className="text-5xl text-center font-light mb-5">Cases</h4>
                    <div className="text-center">
                        <p>Conheça como transformamos <br/><strong>marcas em emoção</strong>.</p>
                    </div>
                </div>
            </section>

            <section className="relative" onMouseMove={handleMouseMoveBtn}>
                <div className="container">
                    <div className="custom-grid grid grid-cols-16 gap-2 sm:gap-3">
                        {casesClientes.map((caseCliente, index) => (
                            <CasesList key={index} src={caseCliente.imagem_grid} url={caseCliente.slug} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative my-30" onMouseMove={handleMouseMoveBtn}>
                <div className="container max-w-small">
                    <h3 className="text-xl text-center mb-3">Vamos transformar sua marca em emoção?</h3>
                    <a
                        href="https://wa.me/your-number"
                        className="relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                        target="_blank"
                        style={{
                            background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(50, 50, 50, 0.3), #000)`,
                        }}
                    >Solicitar proposta
                    </a>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;