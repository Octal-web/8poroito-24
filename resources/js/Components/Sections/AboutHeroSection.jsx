import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AboutCarousel } from '../AboutCarousel';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutHeroSection() {
    const titleRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
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

        });
        return () => context.revert();
    }, []);

    return (
        <section className="relative bg-black pt-30 sm:pt-40 overflow-hidden">
            <div className="-mb-20">
                <AboutCarousel reverse={true} text="O poder da marca" />
            </div>

            <div>
                <AboutCarousel reverse={false} text="O poder da marca" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'}}></div>
            <div className="relative container max-w-medium z-[1] xl:-mt-22 mb-10">
                <h2 ref={titleRef} className="text-4xl md:text-5xl xl:text-6xl text-white text-center font-bold !leading-tight">Um grupo de empresas<br />formadas por especialistas</h2>
            </div>
        </section>
    );
}
