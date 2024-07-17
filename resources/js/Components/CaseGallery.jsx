import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const CaseGallery = ({ size = '', src = '', index, ...props }) => {
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
        <div ref={galleryRef} className={`custom-item w-full overflow-hidden ${size}`}>
            <img
                src={`/content/cases/images/${src}`}
                className="w-full h-full object-cover"
            />
        </div>
    );
};
