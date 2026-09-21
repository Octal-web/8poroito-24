import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { HomeBrand } from '../HomeBrand';
import { EightEffect } from '../EightEffect';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutClientsSection({ clientes }) {
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const context = gsap.context(() => {
            // Scroll projects
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

    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };
    return (
        <section className="relative bg-black pt-10 overflow-x-clip z-[1]" onMouseMove={handleMouseMoveBtn}>
            <div className="absolute top-[-400px] left-[-500px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div>

            <div className="absolute bottom-[-300px] right-[-300px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                <EightEffect />
            </div>

            <div className="container max-w-large">
                <h4 className="relative text-2xl sm:text-3xl text-center text-white mb-15 max-w-60 md:max-w-80 lg:max-w-full mx-auto">
                    Clientes que contam nossa história
                </h4>
                <div className="brands-container mb-15">
                    <div className="grid-cols-2 md:grid-cols-5 grid items-center lg:gap-x-4 gap-y-3 md:gap-y-10">
                        {clientes.map((cliente, index) => (
                            <div key={index} className="home-brand mb-6">
                                <HomeBrand src={cliente.logo} />
                            </div>
                        ))}
                    </div>
                </div>

                <h5 className="home-brand text-center text-white mb-6"><span className="font-bold">Vamos transformar sua marca </span>em emoção?</h5>

                <a
                    href="https://wa.me/your-number"
                    className="home-brand button relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                    target="_blank"
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                    }}
                >Quero fazer parte</a>
            </div>
        </section>
    );
}
