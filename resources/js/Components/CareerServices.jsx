import React, { useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const CareerServices = ({ title = '', description = '', index, ...props }) => {
    const galleryRef = useRef(null);

    useEffect(() => {
        gsap.from(galleryRef.current,
        {
            opacity: 0,
            x: -50,
            duration: 0.5,
            delay: index * 0.3,
            stagger: 0.1,
            scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top 90%',
                end: 'top 50%',
                toggleActions: 'play none resume reverse'
            },
        });
    }, []);

    return (
        <div ref={galleryRef} className="bg-primary border border-custom-gray text-white flex flex-row items-center w-full p-4 xl:py-8 xl:px-6 2xl:p-10 md:m-4 min-h-[200px]">
            <div className="flex-shrink-0 xl:w-24 2xl:w-32 text-8xl md:text-[7rem] xl:text-[8rem] 2xl:text-[12rem] text-center font-thin leading-none">{index + 1}</div>
            <div className="ml-8">
                <h2 className="text-2xl font-bold mb-5" dangerouslySetInnerHTML={{ __html: title }}></h2>
                <div className="text-sm font-light" dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
        </div>
    );
};
