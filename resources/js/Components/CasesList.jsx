import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const CasesList = ({ url = '', src = '', index, ...props }) => {
    const galleryRef = useRef(null);

    useEffect(() => {
        gsap.from(galleryRef.current,
        {
            opacity: 0,
            y: 50,
            duration: 0.5,
            delay: index * 0.1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });
    }, []);

    return (
        <>
            <Link ref={galleryRef} href={route('Cases.caseCliente', {slug: url})} className="custom-item w-full h-40 sm:h-70 lg:h-80 overflow-hidden">
                <img
                    src={src}
                    className="w-full h-full object-cover grayscale transition-all transform hover:grayscale-0 hover:scale-110"
                />
            </Link>
        </>
    );
};
