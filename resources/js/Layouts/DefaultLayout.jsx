import React, { useState, useEffect, useRef } from 'react';
import { useMouseGradient } from '../Contexts/MouseGradientContext';
import { Link, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Lenis from '@studio-freight/lenis';
import { SmoothScrollContext } from '../Contexts/SmoothScrollContext';

// import { GreenMarker } from '../Components/GreenMarker';
import { ProposalModal } from '../Components/ProposalModal';
import { CookieModal } from '../Components/CookieModal'; 

const DefaultLayout = ({ children }) => {
    const { controller, pagina, notifyCookie } = usePage().props;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const gradientPosition = useMouseGradient();
    const careersGradientPosition = useMouseGradient({ duration: 2 });
    const whatsappGradientPosition = useMouseGradient({ duration: 5 });
    const [isModalOpen, setModalOpen] = useState(false);
    const [trackingEnabled, setTrackingEnabled] = useState(false);

    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
            smoothTouch: false,
        });
        lenisRef.current = lenis;
        let animationFrame;

        const raf = (time) => {
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
        };
        animationFrame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(animationFrame);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const acceptCookies = () => {
        setTrackingEnabled(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (notifyCookie || trackingEnabled) {
                const script = document.createElement('script');
                script.innerHTML = `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                    f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5347TVB');
                `;
                document.head.appendChild(script);

                const noscript = document.createElement('noscript');
                noscript.innerHTML = `
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5347TVB" height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=114067279044838&ev=PageView&noscript=1" alt="" />
                `;
                document.body.appendChild(noscript);
            }
        }, 100);
    }, [notifyCookie, trackingEnabled]);

    return (
        <SmoothScrollContext.Provider value={lenisRef}>
            <Head>
                <title>{pagina.titulo}</title>
                <meta name="description" content={pagina.descricao} />

                <meta name="twitter:card" content="summary"/>

                <meta property="og:url" content={window.location.pathname} />
                <meta property="og:type" content="website"/>
                <meta property="og:title" content={pagina.tituloCompartilhamento} />
                <meta property="og:description" content={pagina.descricaoCompartilhamento} />
                <meta property="og:image" content={pagina.imagem.endereco} />
                <meta property="og:image:type" content={pagina.imagem.tipo} />
                <meta property="og:image:width" content={pagina.imagem.largura} />
                <meta property="og:image:height" content={pagina.imagem.altura} />

                <meta name="robots" content="index, follow"/>

                <link rel="icon" href={`/favicon.ico`} type="image/x-icon" />
            </Head>
            <header className={`header absolute top-0 left-0 right-0 z-[2] text-white ${['Cases', 'Politica', 'Contato', 'Politicas'].includes(controller) && 'bg-black'}`}>
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full my-8 xl:my-10 2xl:my-15">
                            <h1 className="flex items-center">
                                <Link href={route('Home.index')} className="flex items-center">
                                    <img src={`/site/img/logo.png`} alt="Logo" className="block w-30 md:w-40" />
                                </Link>
                            </h1>

                            <div className={`${isMenuOpen ? 'transform' : 'transform translate-y-full'} fixed items-center fixed top-0 left-0 z-[3] bg-black w-full h-full transition-all duration-500`}></div>
                            <div className={`${isMenuOpen ? 'transform delay-300' : 'transform translate-y-full'} fixed items-center fixed top-0 left-0 z-[4] bg-black w-full h-full transition-all duration-500`}>
                                <div className="container flex flex-col justify-evenly items-center min-h-full">
                                    <button className="w-fit mx-auto text-xs" onClick={toggleMenu}>
                                        <div className="relative inline-block w-4 h-4 -mb-1">
                                            <span className="block absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45"></span>
                                            <span className="block absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45"></span>
                                        </div>
                                        <span className="underline uppercase tracking-widest ml-2">Fechar</span>
                                    </button>                               
                                    <nav className="">
                                        <ul className="flex flex-col items-center justify-center">
                                            <li className="relative">
                                                <Link href={route('Home.index')} className="relative text-5xl text-white font-light transition-all hover:font-bold">Home</Link>
                                            </li>
                                            <li className="relative mt-5 2xl:mt-8">
                                                <Link href={route('Institucional.index')} className="relative text-5xl text-white font-light transition-all hover:font-bold">Sobre</Link>
                                            </li>
                                            <li className="relative mt-5 2xl:mt-8">
                                                <Link href={route('Cases.index')} className="relative text-5xl text-white font-light transition-all hover:font-bold">Cases</Link>
                                            </li>
                                            <li className="relative mt-5 2xl:mt-8">
                                                <Link href={route('Carreiras.index')} className="relative text-5xl text-white font-light transition-all hover:font-bold">Carreiras</Link>
                                            </li>
                                            <li className="relative mt-5 2xl:mt-8">
                                                <Link href={route('Contato.index')} className="relative text-5xl text-white font-light transition-all hover:font-bold">Contato</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                    <div className="flex justify-between items-center text-white w-full">
                                        <div>
                                            <button
                                                className="button relative overflow-hidden block w-64 border border-white text-center h-16 leading-[4rem] font-light uppercase"
                                                style={{
                                                    background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                                                }}
                                                onClick={handleOpenModal}
                                            >
                                                Solicitar Proposta
                                            </button>
                                            <ProposalModal isOpen={isModalOpen} onClose={handleCloseModal} />
                                        </div>
                                        <div>
                                            <h5 className="text-xs text-center opacity-35 mb-3">Nossas redes:</h5>
                                            <ul className="flex gap-5">
                                                <li><a href="https://www.instagram.com/8poroito/" target="_blank"><img src={`/site/img/instagram.png`} alt="instagram" /></a></li>
                                                <li><a href="https://www.facebook.com/8poroito/" target="_blank"><img src={`/site/img/facebook.png`} alt="facebook" /></a></li>
                                                <li><a href="https://www.behance.net/agencia8poroito" target="_blank"><img src={`/site/img/behance.png`} alt="behance" /></a></li>
                                                <li><a href="https://www.linkedin.com/company/8poroito/" target="_blank"><img src={`/site/img/linkedin.png`} alt="linkedin" /></a></li>
                                            </ul>
                                        </div>
                                        <div>
                                            <a
                                                href="https://api.whatsapp.com/send?text=Ol%C3%A1%21%20Passei%20pelo%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21&phone=555497055536"
                                                className="button relative overflow-hidden block w-64 border border-white text-center h-16 font-light uppercase flex gap-3 justify-center items-center"
                                                target="_blank"
                                                style={{
                                                    background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                                                }}
                                            ><img src={`/site/img/whatsapp.png`} /> WhatsApp</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="menu-link" onClick={toggleMenu}>
                                <div className="flex items-center">
                                    <span className="tracking-widest uppercase text-sm md:text-base">Menu</span>
                                    <div className="w-12">
                                        <div className="menu-bar bg-white h-1 w-8 transition-all ease-in-out duration-300 ml-auto"></div>
                                        <div className="menu-bar bg-white h-1 w-6 transition-all ease-in-out duration-300 ml-auto mt-1"></div>
                                        <div className="menu-bar bg-white h-1 w-8 transition-all ease-in-out duration-300 ml-auto mt-1"></div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className={`overflow-hidden ${['Cases', 'Politica', 'Contato', 'Politicas'].includes(controller) && 'pt-[119px] xl:pt-[135px] 2xl:pt-[175px]'}`}>
                {children}
            </main>

            <footer className="bg-black py-16 text-white md:py-20">
                <div className="container">
                    <h2 className="text-center text-2xl font-semibold uppercase tracking-[0.18em] sm:text-3xl md:text-4xl lg:text-5xl">O poder da marca</h2>

                    <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 divide-y divide-white/15 md:mt-28 md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-40">
                        <nav aria-label="Navegação do rodapé" className="pb-8 text-sm md:pb-0 md:pr-8 lg:pr-12">
                            <ul className="space-y-2 font-medium">
                                <li><Link href={route('Home.index')} className="uppercase transition-opacity hover:opacity-70">Home</Link></li>
                                <li><Link href={route('Institucional.index')} className="transition-opacity hover:opacity-70">A 8poroito</Link></li>
                                <li><Link href={route('Cases.index')} className="uppercase transition-opacity hover:opacity-70">Cases</Link></li>
                                <li><Link href={route('Contato.index')} className="uppercase transition-opacity hover:opacity-70">Contato</Link></li>
                            </ul>
                            <Link href={route('Politicas.privacidade')} className="mt-6 inline-block text-white/50 transition-colors hover:text-white">Política de Privacidade</Link>
                        </nav>

                        <div className="py-8 md:px-8 md:py-0 lg:px-12">
                            <p className="mb-5 text-sm">Quer fazer parte do nosso time?</p>
                            <Link
                                href={route('Carreiras.index')}
                                className="button relative flex min-h-[3.5rem] w-full max-w-[16rem] items-center justify-center overflow-hidden border border-white/60 px-4 py-3 text-center text-sm font-light uppercase hover:border-white"
                                style={{ background: `radial-gradient(circle at ${careersGradientPosition.x}% ${careersGradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)` }}
                            >Trabalhe Conosco</Link>
                        </div>

                        <div className="pt-8 md:pl-8 md:pt-0 lg:pl-12">
                            <address className="mb-6 space-y-2 text-sm not-italic leading-relaxed">
                                <a href="https://www.google.com/maps/place/R.+Jo%C3%A3o+Goulart,+696+-+sala+04,+95720-000+Garibaldi+-+RS" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">
                                    R. João Goulart, 696 - sala 04<br/>
                                    São José, Garibaldi - RS, 95720-000
                                </a>
                                <a href="https://api.whatsapp.com/send?text=Ol%C3%A1%21%20Passei%20pelo%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21&phone=555497055536" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70">(54) 99705-5536</a>
                                <a href="mailto:falecom@8poroito.com.br" className="block break-words transition-opacity hover:opacity-70">falecom@8poroito.com.br</a>
                            </address>
                            <a
                                href="https://api.whatsapp.com/send?text=Ol%C3%A1%21%20Passei%20pelo%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21&phone=555497055536"
                                className="button relative flex min-h-[3.5rem] w-full max-w-[16rem] items-center justify-center gap-3 overflow-hidden border border-white/60 px-4 py-3 text-sm font-light uppercase hover:border-white"
                                target="_blank" rel="noopener noreferrer"
                                style={{ background: `radial-gradient(circle at ${whatsappGradientPosition.x}% ${whatsappGradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)` }}
                            ><img src="/site/img/whatsapp.png" alt="" className="h-7 w-7 object-contain" /> WhatsApp</a>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-center gap-7 md:mt-28 md:flex-row md:gap-12 lg:mt-36">
                        <div className="flex flex-col items-center gap-4 text-white/40 sm:flex-row">
                            <Link href={route('Home.index')} aria-label="8poroito — Home" className="opacity-40 transition-opacity hover:opacity-100">
                                <img src="/site/img/logo.png" alt="8poroito" className="block w-28" />
                            </Link>
                            <p className="text-center text-xs">© {new Date().getFullYear()} 8poroito. Todos os direitos reservados.</p>
                        </div>
                        <ul aria-label="Redes sociais" className="flex items-center gap-5">
                            <li><a href="https://www.instagram.com/8poroito/" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70"><img className="h-6 w-6 object-contain" src="/site/img/instagram.png" alt="Instagram" /></a></li>
                            <li><a href="https://www.facebook.com/8poroito/" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70"><img className="h-6 w-6 object-contain" src="/site/img/facebook.png" alt="Facebook" /></a></li>
                            <li><a href="https://www.behance.net/agencia8poroito" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70"><img className="h-6 w-6 object-contain" src="/site/img/behance.png" alt="Behance" /></a></li>
                            <li><a href="https://www.linkedin.com/company/8poroito/" target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-70"><img className="h-6 w-6 object-contain" src="/site/img/linkedin.png" alt="LinkedIn" /></a></li>
                        </ul>
                    </div>
                </div>
            </footer>

            {!notifyCookie && (
                <CookieModal acceptCookies={acceptCookies} visible={!notifyCookie} />
            )}
        </SmoothScrollContext.Provider>
    );
};

export default DefaultLayout;
