import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { HomePortfolio } from '../HomePortfolio';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function HomePortfolioSection({ conteudos, portfolios }) {
    const portfolioText = conteudos[1].titulo.split('<br />');

    const portfolioRef = useRef([]);
    portfolioRef.current = portfolioText.map((_, i) => portfolioRef.current[i] ?? React.createRef());

    useEffect(() => {
        const context = gsap.context(() => {
            const mm = gsap.matchMedia();
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
        });
        return () => context.revert();
    }, []);

    return (
        <section className="relative mt-10 overflow-hidden" id="portfolio">
            <div className="relative container max-w-[90%]">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="grid-cols-2 grid gap-x-4 gap-y-20 lg:gap-y-4">
                        {portfolios.map((portfolio, index) => (
                            <HomePortfolio key={index} src={portfolio.imagem} rotation={portfolio.rotacao} x={portfolio.x} y={portfolio.y} />
                        ))}
                    </div>
                </div>

                <div className="relative container">
                    <div className="pt-10 md:pt-[20%] max-w-md mx-auto">
                        {portfolioText.map((parte, index) => (
                            <div key={index} className="overflow-hidden">
                                <h2 ref={portfolioRef.current[index]} className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold !leading-tight uppercase">{parte.trim()}</h2>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-md mx-auto my-20 md:mt-40 md:mb-30 2xl:mt-50 2xl:mb-40">
                        <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto mb-10" role="img" aria-label="Instagram">
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                        <div className="md:text-xl text-center font-light text-balance mb-20">
                            <p>{conteudos[1].texto}</p>
                        </div>
                        <a href="https://www.instagram.com/8poroito/" className="block w-48 border border-primary border-2 text-center h-16 h-16 leading-[4rem] font-light uppercase mx-auto" target="_blank" rel="noopener noreferrer">Siga nos</a>
                    </div>

                    {/* <div className="max-w-3xl mx-auto mb-20">
                        <img src="/site/img/mail.png" alt="" className="mx-auto mb-2" />
                        <h3 className="text-center text-4xl mb-5">Quero ficar por dentro</h3>
                        <div className="max-w-md mx-auto text-center font-light mb-9">
                            <p>Cadastre-se para receber noticias e atualização mais recentes de tudo que pode impactar os seu negócio.</p>
                        </div>

                        <HomeNews />
                    </div> */}
                </div>
            </div>
        </section>
    );
}
