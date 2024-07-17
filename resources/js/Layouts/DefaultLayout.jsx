import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

import { GreenMarker } from '../Components/GreenMarker';
import { ProposalModal } from '../Components/ProposalModal';

const DefaultLayout = ({ children }) => {
    const { controller, pagina } = usePage().props;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <>
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
            </Head>
            <header className={`header absolute top-0 left-0 right-0 z-[2] text-white ${['Cases', 'Politica', 'Contato'].includes(controller) && 'bg-black'}`}>
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full my-8 xl:my-10 2xl:my-15">
                            <h1 className="flex items-center">
                                <Link href={route('Home.index')} className="flex items-center">
                                    <img src={`/site/img/logo.png`} alt="Logo" className="block w-30 md:w-auto" />
                                </Link>
                            </h1>

                            <div className={`${isMenuOpen ? 'transform' : 'transform translate-y-full'} fixed items-center fixed top-0 left-0 z-[3] bg-black w-full h-full transition-all duration-500`}></div>
                            <div className={`${isMenuOpen ? 'transform delay-300' : 'transform translate-y-full'} fixed items-center fixed top-0 left-0 z-[4] bg-black w-full h-full transition-all duration-500`} onMouseMove={handleMouseMoveBtn}>
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

            <main className={`overflow-hidden ${['Cases', 'Politica', 'Contato'].includes(controller) && 'pt-[119px] xl:pt-[135px] 2xl:pt-[175px]'}`}>
                {children}
            </main>

            <footer className="bg-black bg-cover bg-no-repeat bg-right py-20" style={{backgroundImage: 'url(/site/img/footerBg.jpg)'}} onMouseMove={handleMouseMoveBtn}>
                <div className="container">
                    <div className="md:max-w-[60%]">
                        <div className="text-white">
                            <h3 className="font-secondary text-5xl md:text-7xl 2xl:text-8xl 2xl:-mb-1">Transformando</h3>
                            <h3 className="font-secondary text-5xl md:text-7xl 2xl:text-8xl md:-mb-1 2xl:-mb-5">Marcas em</h3>
                            <h1 className="relative font-secondary text-8xl md:text-[9.5rem] 2xl:text-[12.5rem] -ml-3 mb-5 z-[1]">
                                <span className="relative mark-container font-bold z-[-1] ml-2">
                                    <GreenMarker classList="scale-x-50 scale-y-50 md:scale-x-75 md:scale-y-75 2xl:scale-x-100 2xl:scale-y-100 bottom-0 md:left-[-6px] md:bottom-[25px] 2xl:bottom-[35px]" />
                                </span>
                                Emoção.
                            </h1>
                        </div>

                        <div className="font-light md:text-lg text-white mt-10 md:mt-0">
                            <p><span className="font-bold">Bora entrar em uma relação “papo reto”<br/>e conquistar consumidores leais</span> com uma<br className="hidden md:inline"/> gestão de marca feita por quem ama o que faz?</p>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end text-white">
                            <div className="mt-20 md:pr-3 w-fit max-w-sm pb-15 md:pb-0 border-b md:border-b-0 md:border-r border-custom-gray">
                                <h4 className="font-secondary text-5xl mb-3">Somos onipresentes</h4>
                                <div className="md:text-lg mr-5 mb-3">Mas você pode nos encontrar fisicamente em:</div>
                                <div className="text-sm mb-5">

                                    <p>
                                        <a href="https://www.google.com/maps/place/R.+Jo%C3%A3o+Goulart,+696+-+sala+04,+95720-000+Garibaldi+-+RS" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-80">
                                            R. João Goulart, 696 - sala 04<br/>
                                            São José, Garibaldi - RS, 95720-000
                                        </a>
                                    </p>
                                    <p>
                                        <a href="https://api.whatsapp.com/send?text=Ol%C3%A1%21%20Passei%20pelo%20seu%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%21&phone=555497055536" target="_blank" rel="noopener noreferrer" className="transition-all hover:opacity-80">
                                            (54) 99705-5536
                                        </a>
                                    </p>
                                    <p>
                                        <a href="mailto:falecom@8poroito.com.br" className="transition-all hover:opacity-80">
                                            falecom@8poroito.com.br
                                        </a>
                                    </p>
                                </div>
                                <div className="mb-5">Quer fazer parte dos nosso time?</div>
                                <Link
                                    href={route('Carreiras.index')} 
                                    className="button relative overflow-hidden block w-64 border border-white text-center h-16 leading-[4rem] font-light uppercase"
                                    style={{
                                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                                    }}
                                >Trabalhe Conosco</Link>
                            </div>

                            <div className="mt-15 md:mt-0 md:pl-20 flex flex-wrap md:block">
                                <div className="text-sm font-medium mb-7">
                                    <ul>
                                        <li className="mb-2">
                                            <Link href={route('Home.index')} className="uppercase transition-all hover:opacity-80">Home</Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href={route('Institucional.index')} className="transition-all hover:opacity-80">A 8poroito</Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href={route('Cases.index')} className="uppercase transition-all hover:opacity-80">Cases</Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link href={route('Contato.index')} className="uppercase transition-all hover:opacity-80">Contato</Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="text-sm mb-15 opacity-50 ml-20 md:ml-0">
                                    <ul>
                                        <li className="mb-2">
                                            <a href="/" className="transition-all hover:opacity-80">Política de Privacidade</a>
                                        </li>
                                        <li className="mb-2">
                                            <a href="/" className="transition-all hover:opacity-80">Política de Cookies</a>
                                        </li>
                                        <li className="mb-2">
                                            <a href="/" className="transition-all hover:opacity-80">Termos e Condições</a>
                                        </li>
                                    </ul>
                                </div>

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

                    <div className="flex flex-col sm:flex-row gap-10 sm:gap-20 pt-20 sm:pb-10 items-center">
                        <div className="flex flex-col sm:flex-row gap-5 items-center opacity-35">
                            <img src={`/site/img/logo.png`} alt="Logo" className="block w-28" />
                            <div className="text-xs text-white">
                                © 2024 8poroito. Todos os direitos reservados.
                            </div>                     
                        </div>

                        <ul className="flex gap-5">
                            <li><a href="https://www.instagram.com/8poroito/" target="_blank"><img className="w-6" src={`/site/img/instagram.png`} alt="instagram" /></a></li>
                            <li><a href="https://www.facebook.com/8poroito/" target="_blank"><img className="w-6" src={`/site/img/facebook.png`} alt="facebook" /></a></li>
                            <li><a href="https://www.behance.net/agencia8poroito" target="_blank"><img className="w-6" src={`/site/img/behance.png`} alt="behance" /></a></li>
                            <li><a href="https://www.linkedin.com/company/8poroito/" target="_blank"><img className="w-6" src={`/site/img/linkedin.png`} alt="linkedin" /></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;