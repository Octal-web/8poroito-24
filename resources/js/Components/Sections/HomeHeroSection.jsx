import React, { useState } from 'react';
import { VideoPlayer } from '../VideoPlayer';
import { useSmoothScroll } from '../../Contexts/SmoothScrollContext';

export function HomeHeroSection() {
    const [hoveredLetter, setHoveredLetter] = useState(null);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const lenisRef = useSmoothScroll();

    const handleScroll = () => {
        const section = document.getElementById('mais');
        if (section && lenisRef.current) {
            const offsetTop = section.offsetTop - 100;
            lenisRef.current.scrollTo(offsetTop, {
                duration: 2,
                immediate: false,
            });
        }
    };

    const highlight = 'poder';
    const letters = highlight.split('');

    const handleMouseEnterHero = (index) => {
        setHoveredLetter(index);
    };

    const handleMouseLeaveHero = () => {
        setHoveredLetter(null);
    };

    const getFontWeight = (index) => {
        if (hoveredLetter === null) {
            return '500';
        }

        const distance = Math.abs(index - hoveredLetter);
        if (distance === 0) {
            return 700;
        } else if (distance === 1) {
            return 600;
        } else if (distance === 2) {
            return 500;
        } else if (distance === 3) {
            return 400;
        } else {
            return 300;
        }
    };

    return (
        <section className="relative bg-black">
            <div className="absolute m-auto left-0 right-0 w-full h-full">
                <VideoPlayer
                    src="/site/video/videoBanner.mp4"
                    isPlaying={true}
                    classList={['w-full', 'h-full', 'object-cover']}
                    autoplay={true}
                    onPlaying={() => setIsVideoLoading(false)}
                    onBlocked={() => setIsVideoLoading(false)}
                />
            </div>

            <div className={`absolute inset-0 z-10 flex items-center justify-center bg-black transition-opacity duration-700 ${isVideoLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" role="status" aria-label="Carregando"></div>
            </div>

            <div className="relative max-h-[100vh] pt-[7%] 2xl:pt-[12%] pb-10 h-screen">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-white mt-40 mb-20 md:my-0">
                        <p className="text-2xl mt-0 md:mt-5 lg:text-3xl xl:text-4xl font-light">Você conhece o</p>
                        <h1 className="text-[120px] leading-[0.7] md:leading-[inherit] md:text-[140px] lg:text-[170px] xl:text-[220px] 2xl:text-[250px] 2xl:mb-8 tracking-tighter">
                            {letters.map((letter, index) => (
                                <span
                                    key={index}
                                    className="transition-all"
                                    onMouseEnter={() => handleMouseEnterHero(index)}
                                    onMouseLeave={handleMouseLeaveHero}
                                    style={{ fontWeight: getFontWeight(index) }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </h1>
                        <p className="text-2xl mt-5 md:mt-5 lg:text-3xl xl:text-4xl font-light">da sua marca?</p>
                    </div>

                    <div className="max-w-md mx-auto xl:mt-2 2xl:mt-[5%]">
                        <p className="text-center text-white">Descubra como o nosso jeito de fazer branding vem gerando valor e impacto.</p>
                        <button className="absolute w-fit left-1/2 transform -translate-x-1/2 bottom-10 md:bottom-12 2xl:bottom-20" onClick={handleScroll}>
                            <img src="/site/img/arrowDown.png" className="opacity-25 transition-opacity hover:opacity-75" alt="Ver mais" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
