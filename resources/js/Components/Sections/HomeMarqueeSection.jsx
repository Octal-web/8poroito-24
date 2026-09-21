import React from 'react';
import { HomeCarousel } from '../HomeCarousel';

export function HomeMarqueeSection() {
    return (
        <section className="relative pt-20 pb-15 overflow-hidden">
            <div className="-mb-12">
                <HomeCarousel reverse={true} text="Transformando marcas em emoção" />
            </div>

            <div>
                <HomeCarousel reverse={false} text="Transformando marcas em emoção" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'}}></div>
        </section>
    );
}
