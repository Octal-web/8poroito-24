import React from 'react';
import { AboutOitoCarousel } from '../AboutOitoCarousel';

export function AboutGallerySection({ imagensGaleria }) {
    return (
        <section className="relative py-10 xl:pb-20 2xl:py-20 bg-black">
            <div className="absolute bottom-0 w-full h-[50%] bg-white"></div>
            <div className="relative xl:mt-20 mb-15 sm:mb-10">
                <AboutOitoCarousel data={imagensGaleria} />
            </div>
        </section>
    );
}
