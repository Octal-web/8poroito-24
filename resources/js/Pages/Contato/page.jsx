import React, { useState, useEffect, useRef } from 'react';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { Map } from '../../Components/Map';
import { ContactForm } from '../../Components/ContactForm';

const Page = () => {
    // States
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Lenis
    const lenisRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Lenis smoothScroll 
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
        gsap.registerPlugin(ScrollTrigger);

        gsap.from(leftRef.current,
        {
            opacity: 0,
            x: 100,
            duration: 0.5,
            stagger: 0.1,
        });

        gsap.from(rightRef.current,
        {
            opacity: 0,
            x: -100,
            duration: 0.5,
            stagger: 0.1,
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
            <section className="relative my-20 overflow-hidden" onMouseOver={handleMouseMoveBtn}>
                <div className="relative container">
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full mb-20 md:mb-0" ref={leftRef}>
                            <h3 className="font-secondary text-7xl tracking-tight 2xl:text-9xl 2xl:leading-[0.85] mb-10">Somos <br/>Onipresentes</h3>
                            <h5 className="font-bold max-w-80 leading-none mb-4">Mas você pode nos encontrar fisicamente em:</h5>
                            <div className="text-sm mb-8">
                                <p>
                                    <a href="https://www.google.com/maps/place/R.+Jo%C3%A3o+Goulart,+696+-+sala+04,+95720-000+Garibaldi+-+RS" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-80">
                                        R. João Goulart, 696 - sala 04<br/>
                                        São José, Garibaldi - RS, 95720-000
                                    </a>
                                </p>
                                <p>
                                    <a href="https://wa.me/5554997055536" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-80">
                                        (54) 99705-5536
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:falecom@8poroito.com.br" className="transition-all hover:opacity-80">
                                        falecom@8poroito.com.br
                                    </a>
                                </p>
                            </div>
                            <div className="xl:w-5/6 2xl:w-4/6 border border-gray-300">
                                <Map />
                            </div>
                        </div>
                        <div className="w-full md:pl-5" ref={rightRef}>
                            <div className="md:w-5/6">
                                <h4 className="text-lg mb-10">Preencha o formulário e entre em contato</h4>
                                <ContactForm gradientPosition={gradientPosition} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;