import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CasesHeroSection() {
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
        <section ref={titleRef} className="mt-20 sm:mt-30 mb-20">
            <div className="container max-w-small">
                <h4 className="text-5xl text-center font-light mb-5">Cases</h4>
                <div className="text-center">
                    <p>Conheça como transformamos <br/><strong>marcas em emoção</strong>.</p>
                </div>
            </div>
        </section>
    );
}
