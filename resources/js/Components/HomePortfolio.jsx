import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePortfolio = ({ src = 'string', rotation = 0, x = 0, y = 0 }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        const mm = gsap.matchMedia();
        const imgElement = imgRef.current;

        const animate = (scale, start, end) => {
            gsap.fromTo(
                imgElement,
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                },
                {
                    x: x * scale,
                    y: y * scale,
                    rotation: rotation,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#portfolio',
                        start,
                        end,
                        scrub: true,
                    },
                }
            );
        };

        mm.add("(min-width: 950px)", () => animate(1, 'top 100%', 'bottom 20%'));

        mm.add("(max-width: 949px)", () => animate(0.8, 'top 80%', 'bottom -40%'));

        return () => {
            mm.revert();
        };
    }, [imgRef.current, rotation, x, y]);

    return (
        <div id="portfolio" ref={imgRef} className="w-full">
            <img src={`/content/portfolio/${src}`} alt="Trabalho do portfólio da 8poroito" loading="lazy" decoding="async" className="w-full h-40 md:h-auto object-cover" />
        </div>
    );
};
