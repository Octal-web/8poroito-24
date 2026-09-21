import React, { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const GreenMarker = ({ classList = 'string' }) => {
    const { controller } = usePage().props;

    const markRef = useRef(null);
    const svgRef  = useRef(null);

    useEffect(() => {
        gsap.fromTo(markRef.current,
        {
            width: '0',
        }, 
        {
            width: '568px',
            duration: 0.5,
            scrollTrigger: {
                trigger: markRef.current,
                start: controller === 'Home' ? 'top -15%' : 'top 60%',
                toggleActions: 'play none resume reverse'
            },
        });
    }, []);

    return (
        <div ref={markRef} className={`absolute -z-[1] transform ${classList} origin-bottom-left overflow-hidden`}>
            <svg ref={svgRef} version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="568.2px" height="102.8px" viewBox="0 0 568.2 102.8" style={{enableBackground: 'new 0 0 568.2 102.8'}} xmlSpace="preserve">
                <mask id="markGroup">
                    <path className="st0" d="M0,64.4c0,0,142.8-29.7,274.8-24.7S410.5,57,568.2,77.3" stroke="#fff" strokeWidth="85"></path>
                </mask>
                <image width="569" height="103" xlinkHref={`/site/img/mark-image.png`} mask="url(#markGroup)"></image>
            </svg>
        </div>
    );
};
