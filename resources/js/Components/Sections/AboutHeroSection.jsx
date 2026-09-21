import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AboutCarousel } from '../AboutCarousel';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutHeroSection() {
    const oitoRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            gsap.from(oitoRef.current,
            {
                opacity: 0,
                y: 50,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: oitoRef.current,
                    start: 'top 90%',
                    end: 'top 50%',
                },
            });

        });
        return () => context.revert();
    }, []);

    return (
        <section className="relative bg-black pt-30 sm:pt-40 overflow-hidden">
            <div className="-mb-20">
                <AboutCarousel reverse={true} text="Transformando marcas em emoção" />
            </div>

            <div>
                <AboutCarousel reverse={false} text="Transformando marcas em emoção" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'}}></div>
            <div className="relative container max-w-medium z-[1] xl:-mt-10 mb-10">
                <img ref={oitoRef} src="/site/img/8poroito.svg" className="w-full" />
            </div>
        </section>
    );
}
