import React from 'react';
import { HomeCarousel } from '../HomeCarousel';

export function HomeMarqueeSection() {
    return (
        <section className="relative pt-24 pb-20 overflow-hidden">
            <div>
                <HomeCarousel reverse={true} text="O poder da marca" />
            </div>

            <div>
                <HomeCarousel reverse={false} text="O poder da marca" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'}}></div>
        </section>
    );
}
