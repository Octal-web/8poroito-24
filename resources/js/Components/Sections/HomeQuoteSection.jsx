import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomeQuoteSection({ conteudos }) {
    const commaRef = useRef(null);
    const quoteRef = useRef(null);
    const writerRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
            // Scroll quote
            gsap.fromTo(commaRef.current,
            {
                opacity: 0,
                x: -200,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#mais',
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: true,
                }
            });

            gsap.fromTo(quoteRef.current,
            {
                opacity: 0,
                x: 200,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#mais',
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: true,
                }
            });

            gsap.fromTo(writerRef.current,
            {
                y: 200,
            },
            {
                y: 0,
                duration: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#mais',
                    start: 'top 75%',
                    end: 'top 25%',
                    scrub: true,
                }
            });

        });
        return () => context.revert();
    }, []);

    return (
        <section id="mais" className="relative pt-15 md:pt-20 md:pb-40">
            <div className="container max-w-medium">
                <div ref={commaRef} aria-hidden="true" className="text-9xl text-center -mb-10 sm:-mb-6 md:mb-0">“</div>
                <div ref={quoteRef} className="text-center text-2xl lg:text-3xl leading-[1.4em]" dangerouslySetInnerHTML={{ __html: conteudos[0].texto }}>
                </div>
                <div className="overflow-hidden">
                    <p ref={writerRef} className="text-center mt-4 md:mt-8">- {conteudos[0].titulo}</p>
                </div>
            </div>
        </section>
    );
}
