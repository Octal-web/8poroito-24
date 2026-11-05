import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// import { EightEffect } from '../EightEffect';
import { CareerServices } from '../CareerServices';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CareerHeroSection({ conteudos }) {
    const callRef = useRef(null);
    const downRef = useRef(null);
    const titleRef = useRef(null);

    const titleParts = conteudos[0].titulo.split('|');

    const cardsData = [
        {
            title: conteudos[2].titulo,
            description: conteudos[2].texto
        },
        {
            title: conteudos[3].titulo,
            description: conteudos[3].texto
        },
        {
            title: conteudos[4].titulo,
            description: conteudos[4].texto
        }
    ];

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from(titleRef.current,
            {
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                delay: 0.5,
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
                delay: 0.1,
                scrollTrigger: {
                    trigger: downRef.current,
                    start: 'top 90%',
                    end: 'top 50%',
                },
            });
        });
        return () => context.revert();
    }, []);

    useEffect(() => {
        const handleMouseMove = (event) => {
            gsap.to(callRef.current, {
                x: (event.clientX / window.innerWidth - 0.5) * 30,
                y: (event.clientY / window.innerHeight - 0.5) * 30,
                delay: 0.1,
                ease: 'power2.out',
                overwrite: 'auto',
            });
        };
        const target = callRef.current;
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            gsap.killTweensOf(target);
        };
    }, []);

    return (
        <section className="relative bg-black overflow-hidden">
            <div className="absolute top-0 right-[-20%] md:right-0 w-[150%] h-[150%] transform scale-x-75 animate-spin" style={{backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 1) 70%)', animationDirection: 'alternate'}}></div>

            <div className="relative container max-w-medium z-[1]">
                <div className="min-h-[70dvh] flex flex-col justify-center xl:mt-8">
                    <div ref={callRef}>
                        <div className="overflow-hidden">
                            <h4 ref={downRef} className="text-2xl md:text-5xl text-white text-center font-light leading-tight tracking-tight mb-1">{titleParts[0]}</h4>
                        </div>

                        <h2 ref={titleRef} className="text-4xl md:text-[5.4rem] text-white text-center font-bold leading-none tracking-tight mb-1">{titleParts[1]}</h2>
                    </div>

                    <div className="max-w-xl text-white text-center font-light mx-auto px-4 mt-20" dangerouslySetInnerHTML={{ __html: conteudos[0].texto }}>
                    </div>
                </div>
            </div>

            {/* <div className="relative container z-[1]">
                <div className="pb-20 md:py-20">
                    <div className="text-white text-center">
                        <h4 className="text-5xl font-bold mb-6">{conteudos[1].titulo}</h4>
                        <div className="text-lg font-light mb-15" dangerouslySetInnerHTML={{ __html: conteudos[1].texto }}>
                        </div>
                    </div>

                    <div className="relative grid md:grid-cols-3 gap-10 mx-10 z-[1]">
                        {cardsData.map((card, index) => (
                            <CareerServices key={index} title={card.title} description={card.description} index={index} />
                        ))}
                    </div>
                </div>
            </div>


            <div className="relative container z-[1]">
                <div className="pb-20 md:py-20">
                    <div className="text-white text-center">
                        <h4 className="text-5xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: conteudos[6].titulo }} />
                        <div className="text-lg font-light mb-15 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: conteudos[6].texto }}>
                        </div>
                    </div>
                </div>
            </div>
             <div className="absolute top-[-130px] left-[-300px] md:left-[-600px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div>
            <div className="absolute bottom-[-500px] right-[-200px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div> */}
        </section>
    );
}
