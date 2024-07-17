import React, { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react'

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import DefaultLayout from '../../Layouts/DefaultLayout';
import { VideoPlayer } from '../../Components/VideoPlayer';
import { HomeProject } from '../../Components/HomeProject';
import { HomeBrand } from '../../Components/HomeBrand';
import { GreenMarker } from '../../Components/GreenMarker';
import { EightEffect } from '../../Components/EightEffect';
import { HomeCarousel } from '../../Components/HomeCarousel';
import { HomePortfolio } from '../../Components/HomePortfolio';
import { HomeNews } from '../../Components/HomeNews';

const Page = () => {
    // Contents
    const { destaques, clientes, portfolios } = usePage().props;

    // States
    const [hoveredLetter, setHoveredLetter] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    // Lens
    const lenisRef = useRef(null);

    const commaRef = useRef(null);
    const quoteRef = useRef(null);
    const writerRef = useRef(null);

    const svgRef = useRef(null);

    const portfolioText = 'Quer ficar <br /> por dentro <br /> do nosso<br /> trabalho?'.split('<br />');

    const portfolioRef = useRef([]);
    portfolioRef.current = portfolioText.map((_, i) => portfolioRef.current[i] ?? React.createRef());

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

    // Lens gotoClick 
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

    useEffect(() => {
        let mm = gsap.matchMedia();

        gsap.registerPlugin(ScrollTrigger);

        // Scroll quote
        gsap.fromTo(commaRef.current, 
        {
            opacity: 0,
            x: -200,
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#mais',
                start: 'top 75%',
                end: 'top 25%',
                scrub: true,
            }
        });

        gsap.fromTo(quoteRef.current, 
        {
            opacity: 0,
            x: 200,
        },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#mais',
                start: 'top 75%',
                end: 'top 25%',
                scrub: true,
            }
        });

        gsap.fromTo(writerRef.current, 
        {
            y: 200,
        },
        {
            y: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '#mais',
                start: 'top 75%',
                end: 'top 25%',
                scrub: true,
            }
        });

        // Scroll projects
        ScrollTrigger.create({
            trigger: '.overlaid-section',
            pin: true,
            start: 'top top',
            end: 'bottom',
        });

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

        // Scroll portfolio
        portfolioRef.current.forEach(ref => {
            mm.add("(min-width: 768px)", () => {
                gsap.fromTo(ref.current, 
                {
                    y: 200,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#portfolio',
                        start: 'top 75%',
                        end: 'top 25%',
                        scrub: true,
                    }
                });
            });

            mm.add("(max-width: 767px)", () => {
                gsap.fromTo(ref.current, 
                {
                    y: 200,
                },
                {
                    y: 0,
                    duration: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#portfolio',
                        start: 'top 95%',
                        end: 'top 55%',
                        scrub: true,
                    }
                });
            });
        });
    }, []);

    // Hero font effect
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

    // Buttons Shadow Move
    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <DefaultLayout>
            <section className="relative">
                <div className="absolute m-auto left-0 right-0 w-full h-full">
                    <VideoPlayer
                        src="/site/video/videoBanner.mp4"
                        isPlaying={true}
                        classList={['w-full', 'h-full', 'object-cover']}
                        autoplay={true}
                    />
                </div>

                <div className="relative max-h-[100vh] pt-[7%] 2xl:pt-[12%] pb-10 h-screen">
                    <div className="container">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-center text-white mt-40 mb-20 md:my-0">
                            <h4 className="text-2xl mt-0 md:mt-5 lg:text-3xl xl:text-4xl font-light">Você conhece o</h4>
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
                            <h4 className="text-2xl mt-5 md:mt-5 lg:text-3xl xl:text-4xl font-light">da sua marca?</h4>
                        </div>

                        <div className="max-w-md mx-auto xl:mt-2 2xl:mt-[5%]">
                            <h3 className="text-center text-white">Todos os dias novas marcas nascem, com propostas inovadoras e gente jovem cheia de energia</h3>
                            <button className="absolute w-fit left-1/2 transform -translate-x-1/2 bottom-10 md:bottom-12 2xl:bottom-20" onClick={handleScroll}>
                                <img src="/site/img/arrowDown.png" className="opacity-25 transition-opacity hover:opacity-75" alt="Ver mais" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="mais" className="relative pt-15 md:pt-20 md:pb-40">
                <div className="container max-w-medium">
                    <h3 ref={commaRef} className="font-secondary text-9xl text-center -mb-6 md:mb-0 lg:mb-4">“</h3>
                    <div ref={quoteRef} className="text-center text-2xl lg:text-3xl leading-[1.4em]">
                        <p><b>Transformando ideias em realidade</b>, pixel por pixel,<br />nossa agência é a ponte entre a imaginação e o impacto visual, <b>onde cada design conta uma história única e poderosa.</b></p>
                    </div>
                    <div className="overflow-hidden">
                        <h5 ref={writerRef} className="text-center mt-15">- Corbellini Felipe</h5>
                    </div>
                </div>
            </section>

            <section className="relative pt-20 md:pt-0 pb-50 overlaid-section">
                <div className="absolute bottom-0 left-0 w-full h-[50%] md:h-[40%] 2xl:h-[30%] bg-black"></div>

                <div className={`relative container ${playing ? 'videoPlay' : 'videoPause'}`}>
                    <VideoPlayer
                        src="/site/video/videoBanner.mp4"
                        isPlaying={playing}
                        classList={['w-full', 'relative', 'z-[1]', 'max-h-[90vh]']}
                        autoplay={false}
                    />

                    <button className="playBtn absolute inset-0 m-auto xl:w-40 h-30 w-30 xl:h-40 2xl:w-fit 2xl:h-fit transition-all z-[1]" onClick={() => setPlaying(!playing)}><img src={`/site/img/${playing ? 'pauseBtn' : 'playBtn'}.png`} className="block" /></button>
                </div>
            </section>

            <section className="relative bg-black overlay-section z-[1]">
                <div className="flex flex-col gap-3" onMouseMove={handleMouseMoveBtn}>
                    {destaques.map((destaque, index) => (
                        <HomeProject key={index} img={`/content/cases/banner/${destaque.banner}`} url={destaque.slug} gradientX={gradientPosition.x} gradientY={gradientPosition.y} />
                    ))}
                </div>
            </section>

            <section className="relative bg-black pt-10 pb-30 overflow-hidden" onMouseMove={handleMouseMoveBtn}>
                <a className="block w-fit mx-auto text-custom-gray underline uppercase mx-auto mb-40 transition-all hover:scale-110">Ver todos os projetos</a>

                <div className="absolute top-[-400px] left-[-500px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
                    <EightEffect />
                </div>

                <div className="absolute bottom-[-300px] right-[-200px] rotate-[30deg] scale-50 md:scale-75 xl:scale-100 w-[700px] opacity-50">
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

                    <h5 className="home-brand text-1xl text-center text-white mb-6"><span className="font-bold">Vamos transformar sua marca </span>em emoção?</h5>

                    <a
                        href="https://wa.me/your-number"
                        className="home-brand relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                        target="_blank"
                        style={{
                            background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                        }}
                    >Quero fazer parte</a>
                </div>
            </section>

            <section className="relative pt-20 pb-15 overflow-hidden">
                <div className="-mb-12">
                    <HomeCarousel reverse={true} text="Transformando marcas em emoção" />
                </div>

                <div>
                    <HomeCarousel reverse={false} text="Transformando marcas em emoção" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full z-[1]" style={{background: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)'}}></div>
            </section>

            <section className="relative my-10 overflow-hidden" id="portfolio">
                <div className="relative container max-w-[90%]">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="grid-cols-2 grid gap-x-4 gap-y-20 lg:gap-y-4">
                            {portfolios.map((portfolio, index) => (
                                <HomePortfolio src={portfolio.imagem} rotation={portfolio.rotacao} x={portfolio.x} y={portfolio.y} />
                            ))}
                        </div>
                    </div>

                    <div className="relative container">
                        <div className="pt-10 md:pt-[20%] max-w-md mx-auto">
                            {portfolioText.map((parte, index) => (
                                <div key={index} className="overflow-hidden">
                                    <h2 ref={portfolioRef.current[index]} className="font-secondary text-center text-6xl md:text-8xl">{parte.trim()}</h2>
                                </div>
                            ))}
                        </div>

                        <div className="max-w-md mx-auto my-20 md:my-50">
                            <img src="/site/img/behanceLogo.png" className="mx-auto mb-10" />
                            <div className="md:text-xl text-center font-light mb-20">
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, diam nonummy nibh euismod tincidunt ut laoreet.</p>
                            </div>
                            <a href="https://www.behance.net/agencia8poroito" className="block w-48 border border-primary border-2 text-center h-16 h-16 leading-[4rem] font-light uppercase mx-auto" target="_blank">Siga nos</a>
                        </div>

                        <div className="max-w-3xl mx-auto mb-20">
                            <img src="/site/img/mail.png" className="mx-auto mb-2" />
                            <h3 className="font-secondary text-center text-4xl mb-5">Quero ficar por dentro</h3>
                            <div className="max-w-md mx-auto text-center font-light mb-9">
                                <p>Cadastre-se para receber noticias e atualização mais recentes de tudo que pode impactar os seu negócio.</p>
                            </div>

                            <HomeNews />
                        </div>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;