import React, { useEffect } from 'react';
import { useMouseGradient } from '../../Contexts/MouseGradientContext';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { HomeBrand } from '../HomeBrand';
// import { EightEffect } from '../EightEffect';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutClientsSection({ clientes }) {
    const gradientPosition = useMouseGradient();

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from('.home-brand',
            {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: '.brands-container',
                    start: 'top 70%',
                    end: 'top 50%',
                    toggleActions: 'play none resume reverse'
                },
            });

        });
        return () => context.revert();
    }, []);

    return (
        <section className="relative bg-black pt-10 md:pb-30 overflow-hidden">
            {/* <div className="absolute top-[-400px] left-[-500px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div>

            <div className="absolute bottom-[-300px] right-[-200px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div> */}

            <div className="container max-w-large">
                <h4 className="relative text-2xl sm:text-3xl text-center text-white uppercase mb-15 max-w-60 md:max-w-80 lg:max-w-full mx-auto pt-10 md:pt-24">
                    Marcas que contam a nossa história
                </h4>
                <div className="brands-container mb-15">
                    <div className="grid-cols-2 md:grid-cols-5 grid items-center lg:gap-x-4 gap-y-3 md:gap-y-10">
                        {clientes.map((cliente, index) => (
                            <div key={index} className="home-brand mb-6">
                                <HomeBrand src={cliente.logo} name={cliente.nome} />
                            </div>
                        ))}
                    </div>
                </div>

                <h5 className="home-brand text-1xl text-center text-white mb-6"><span className="font-bold">Vamos transformar sua marca </span>em emoção?</h5>

                <a
                    href="https://api.whatsapp.com/send?text=Ol%C3%A1%21%20Passei%20pelo%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21&phone=5554999365663"
                    rel="noopener noreferrer"
                    className="home-brand relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                    target="_blank"
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                    }}
                >Quero fazer parte</a>
            </div>
        </section>
    );
}
