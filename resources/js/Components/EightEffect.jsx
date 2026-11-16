import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const EightEffect = () => {
    const eightRef = useRef(null);

    useEffect(() => {
        const element = eightRef.current;

        let tl = gsap.timeline({ repeat: -1, yoyo: true });

        const animate = () => {
            const newDuration = Math.random() * 10 + 5;

            tl.to(element, {
                x: () => `${Math.random() * 10}vw`,
                duration: newDuration,
                ease: 'power1.inOut',
                onComplete: () => {
                    gsap.set(element, { x: `-${element.getBoundingClientRect().width}px` });
                    tl.duration(newDuration);
                },
            });
        };

        animate();

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="eight__effect">
                <img ref={eightRef} src={`/site/img/eight-effect.png`} alt="" className="w-full" />
        </div>
    );
};
