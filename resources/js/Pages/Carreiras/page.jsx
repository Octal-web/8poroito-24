import React, { useState, useEffect, useRef } from 'react';

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { EightEffect } from '../../Components/EightEffect';
import { CareerServices } from '../../Components/CareerServices';
import { CareerForm } from '../../Components/CareerForm';

const Page = () => {
    // States
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Lenis
    const lenisRef = useRef(null);
    const callRef = useRef(null);
    const downRef = useRef(null);
    const titleRef = useRef(null);
    const upRef = useRef(null);
    
    const cardsData = [
        {
            title: "Equipe colaborativa",
            description: "<p>As melhores coisas da vida a gente faz junto. Na 8poroito não é diferente. Aqui todo mundo se ajuda e faz acontecer.</p>"
        },
        {
            title: "Um lugar <br/>para crescer",
            description: "<p>A 8poroito é o seu lugar. Estamos sempre envolvidos em novas formas de aprender pra fazer mais e melhor.</p>"
        },
        {
            title: "Marcas de expressão",
            description: "<p>Nossos clientes você vê quando vai ao supermercado. Nossas ideias você também vê por lá.</p>"
        }
    ];

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
            duration: 0.5,
            stagger: 0.1,
            delay: 0.1,
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });

        gsap.from(downRef.current,
        {
            y: 60,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
                trigger: downRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });

        gsap.from(upRef.current,
        {
            y: -60,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
                trigger: upRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });

        let mouseX, mouseY;

        document.addEventListener("mousemove", e => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(callRef.current, {
                x: (mouseX / window.innerWidth - 0.5) * 30,
                y: (mouseY / window.innerHeight - 0.5) * 30,
                delay: 0.1,
                ease: "power2.out",
                overwrite: "auto"
            });
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
            <section className="relative bg-black overflow-hidden" onMouseMove={handleMouseMoveBtn}>
                <div className="absolute top-0 right-[-20%] md:right-0 w-[150%] h-[150%] transform scale-x-75 animate-spin" style={{backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 1) 70%)', animationDirection: 'alternate'}}></div>
                
                <div className="relative container max-w-medium z-[1]">
                    <div className="h-screen flex flex-col justify-center xl:mt-8">
                        <div ref={callRef}>
                            <div className="overflow-hidden">
                                <h4 ref={downRef} className="text-2xl md:text-5xl text-white text-center font-light leading-tight tracking-tight mb-1">você nasceu para</h4>
                            </div>

                            <h2 ref={titleRef} className="text-4xl md:text-[5.4rem] text-white text-center font-bold leading-none tracking-tight mb-1">transformar marcas</h2>

                            <div className="overflow-hidden">
                                <h4 ref={upRef} className="text-2xl md:text-5xl text-white text-center font-light leading-tight tracking-tight">em emoção e nem sabia!</h4>
                            </div>
                        </div>

                        <div className="max-w-xl text-white text-center font-light mx-auto px-4 mt-20">
                            <p>Somos um time obstinado pela evolução, seja ela pessoal ou profissional. Por isso, estamos sempre caminhando juntos na direção de um futuro maior para nós e nossas marcas.</p>
                        </div>
                    </div>
                </div>

                <div className="relative container z-[1]">
                    <div className="pb-20 md:py-20">
                        <div className="text-white text-center">
                            <h4 className="text-5xl font-bold mb-6">O que oferecemos</h4>
                            <div className="text-lg font-light mb-15">
                                <p>Nossa galera ama o que faz e está sempre pronta para jogar lado a lado com você.</p>
                            </div>
                        </div>

                        <div className="relative grid md:grid-cols-3 gap-10 mx-10 z-[1]">
                            {cardsData.map((card, index) => (
                                <CareerServices key={index} title={card.title} description={card.description} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-[-130px] left-[-300px] md:left-[-600px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                    <EightEffect />
                </div>
                <div className="absolute bottom-[-500px] right-[-200px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                    <EightEffect />
                </div>
            </section>

            <section className="relative my-20 xl:my-40 2xl:my-50">
                <div className="relative container max-w-large z-[1]">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-8">Bora trocar uma ideia?</h2>
                        <div className="max-w-2xl xl:text-2xl 2xl:text-3xl font-light mx-auto">
                            <p>Clique abaixo para dar o primeiro passo na sua nova jornada na 8poroito.</p>
                        </div>
                    </div>
                    <CareerForm />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;