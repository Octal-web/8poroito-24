import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react'

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { AboutCarousel } from '../../Components/AboutCarousel';
import { VideoPlayer } from '../../Components/VideoPlayer';
import { HomeBrand } from '../../Components/HomeBrand';
import { GreenMarker } from '../../Components/GreenMarker';
import { EightEffect } from '../../Components/EightEffect';
import { AboutOitoCarousel } from '../../Components/AboutOitoCarousel';

const Page = () => {
    // Contents
    const { clientes, imagensGaleria } = usePage().props;

    // States
    const [playing, setPlaying] = useState(false);
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Lens
    const lenisRef = useRef(null);

    const oitoRef = useRef(null);
    const videoRef = useRef(null);

    // Lens smoothScroll 
    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        gsap.from(oitoRef.current,
        {
            opacity: 0,
            y: 50,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: oitoRef.current,
                start: 'top 90%',
                end: 'top 50%',
            },
        });

        gsap.fromTo(videoRef.current, 
        {   
            y: '-150px',
            scale: 0
        },
        {
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: videoRef.current,
                start: 'top bottom',
                end: 'top center',
                scrub: true,
            }
        });

        // Scroll projects
        gsap.from('.home-brand',
        {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.brands-container',
                start: 'top 70%',
                end: 'top 50%',
                toggleActions: 'play none resume reverse'
            },
        });
    }, []);

    // Buttons Shadow Move
    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <DefaultLayout>
            <section className="relative bg-black pt-30 sm:pt-40 overflow-hidden">
                <div className="-mb-20">
                    <AboutCarousel reverse={true} text="Transformando marcas em emoção" />
                </div>

                <div>
                    <AboutCarousel reverse={false} text="Transformando marcas em emoção" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'}}></div>
                <div className="relative container max-w-medium z-[1] xl:-mt-10 mb-10">
                    <img ref={oitoRef} src="/site/img/8poroito.svg" className="w-full" />
                </div>
            </section>

            <section className="bg-black py-10">
                <div className="container max-w-small mb-20">
                    <div className="text-white font-light text-center space-y-5">
                        <p>Programação, gestão de leads e a construção de marca on/off feita por experientes profissionais de branding: nosso time de talentos multidisciplinar é forte e cresce mais a cada dia.</p>
                        <p>São profissionais que trabalham remotamente de vários lugares do Brasil e acordam todo dia pensando em como transformar nossas marcas em emoção.</p>
                        <p>O entrosamento é o nosso trunfo, e o resultado é um só: <span className="font-bold">conexões e projetos duradouros.</span></p>
                    </div>
                </div>

                <div className="container max-w-large">
                    <div ref={videoRef} className={`relative z-[2] ${playing ? 'videoPlay' : 'videoPause'}`}>
                        <VideoPlayer
                            src="/site/video/videoAbout.mp4"
                            isPlaying={playing}
                            classList={['w-full', 'relative', 'z-[1]', 'max-h-[90vh]']}
                            autoplay={false}
                        />

                        <button className="playBtn absolute inset-0 m-auto xl:w-40 h-30 w-30 xl:h-40 2xl:w-fit 2xl:h-fit transition-all z-[1]" onClick={() => setPlaying(!playing)}><img src={`/site/img/${playing ? 'pauseBtn' : 'playBtn'}.png`} className="block" /></button>
                    </div>
                </div>
            </section>

            <section className="relative bg-black pt-10 overflow-x-clip z-[1]" onMouseMove={handleMouseMoveBtn}>
                <div className="absolute top-[-400px] left-[-500px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                    <EightEffect />
                </div>

                <div className="absolute bottom-[-300px] right-[-300px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                    <EightEffect />
                </div>

                <div className="container max-w-large">
                    <h4 className="relative text-2xl sm:text-3xl text-center text-white mb-15 max-w-60 md:max-w-80 lg:max-w-full mx-auto">
                        Clientes que contam 
                        <span className="relative mark-container font-bold z-[1] ml-2">
                            <GreenMarker classList="scale-x-[0.3] md:scale-x-[0.4] scale-y-[0.2] left-0 md:left-[-5px] bottom-[-7px]" />
                            nossa história
                        </span>
                    </h4>
                    <div className="brands-container mb-15">
                        <div className="grid-cols-2 md:grid-cols-5 grid items-center lg:gap-x-4 gap-y-3 md:gap-y-10">
                            {clientes.map((cliente, index) => (
                                <div key={index} className="home-brand mb-6">
                                    <HomeBrand src={cliente.logo} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <h5 className="home-brand text-center text-white mb-6"><span className="font-bold">Vamos transformar sua marca </span>em emoção?</h5>

                    <a
                        href="https://wa.me/your-number"
                        className="home-brand button relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                        target="_blank"
                        style={{
                            background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                        }}
                    >Quero fazer parte</a>
                </div>
            </section>

            <section className="relative py-10 xl:pb-20 2xl:py-20 bg-black">
                <div className="absolute bottom-0 w-full h-[50%] bg-white"></div>
                <div className="relative xl:mt-20 mb-15 sm:mb-10">
                    <AboutOitoCarousel data={imagensGaleria} />
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;
