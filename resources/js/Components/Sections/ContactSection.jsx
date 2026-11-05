import React, { useEffect, useRef } from 'react';
import { useMouseGradient } from '../../Contexts/MouseGradientContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map } from '../Map';
import { ContactForm } from '../ContactForm';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection({ googleMapsApiKey }) {
    const gradientPosition = useMouseGradient();

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
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
        });
        return () => context.revert();
    }, []);

    return (
        <section className="relative my-20 overflow-hidden">
            <div className="relative container">
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="w-full mb-20 md:mb-0" ref={leftRef}>
                        <h3 className="tracking-tight text-4xl md:text-5xl 2xl:text-6xl font-medium uppercase !leading-tight mb-10">Vamos conversar<br />sobre o poder<br />da sua marca?</h3>
                        <h5 className="max-w-sm text-balance mb-10">Envie uma mensagem e vamos conversar sobre o potencial da sua marca e como o time de especialistas da 8poroito pode ajudar você a gerar valor e impacto.</h5>
                        <div className="xl:w-5/6 2xl:w-4/6 border border-gray-300">
                            <Map apiKey={googleMapsApiKey} />
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
    );
}
