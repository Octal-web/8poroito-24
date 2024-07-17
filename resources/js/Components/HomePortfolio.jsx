import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HomePortfolio = ({ src = 'string', rotation = 0, x = 0, y = 0 }) => {
    const imgRef = useRef(null);

    useEffect(() => {
        let mm = gsap.matchMedia();
        const imgElement = imgRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top 100%',
                end: 'bottom 20%',
                scrub: true,
            },
        });

        mm.add("(min-width: 950px)", () => {
            tl.fromTo(
                imgElement,
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                },
                {
                    x: x,
                    y: y,
                    rotation: rotation,
                    duration: 1,
                    ease: 'none',
                }
            );
        });

        mm.add("(max-width: 949px)", () => {
            tl.fromTo(
                imgElement,
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                },
                {
                    x: x * 0.8,
                    y: y * 0.8,
                    rotation: rotation,
                    duration: 1,
                    ease: 'none',
                }
            );
        });

        return () => {
            tl.kill();
        };
    }, [imgRef.current, rotation, x, y]);

    return (
        <div id="portfolio" ref={imgRef} className="w-full">
            <img src={`/content/portfolio/${src}`} className="w-full h-40 md:h-auto object-cover" />
        </div>
    );
};
