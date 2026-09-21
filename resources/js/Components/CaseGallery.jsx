import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { useSmoothScroll } from '../Contexts/SmoothScrollContext';

gsap.registerPlugin(ScrollTrigger);

const sizes = {
    grande: 'col-span-1 sm:col-span-6 aspect-[4/3] sm:aspect-[16/9] xl:aspect-auto xl:h-[46rem] 2xl:h-[60rem]',
    medio: 'col-span-1 sm:col-span-3 aspect-[4/3] xl:aspect-auto xl:h-[34rem] 2xl:h-[46rem]',
    pequeno: 'col-span-1 sm:col-span-3 lg:col-span-2 aspect-square xl:aspect-auto xl:h-[24rem] 2xl:h-[35rem]',
};

export const CaseGallery = ({ images = [], title = '' }) => {
    const galleryRef = useRef(null);
    const lenisRef = useSmoothScroll();
    const [index, setIndex] = useState(-1);
    const open = index >= 0;
    const slides = useMemo(() => images.map((image, imageIndex) => ({
        src: `/content/cases/images/${image.imagem}`,
        alt: `${title || 'Case'} — imagem ${imageIndex + 1}`,
    })), [images, title]);

    useEffect(() => {
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.utils.toArray('.custom-item', galleryRef.current).forEach((item) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 30,
                    duration: 0.5,
                    scrollTrigger: { trigger: item, start: 'top 95%', once: true },
                });
            });
        });
        return () => media.revert();
    }, [images]);

    useEffect(() => {
        const lenis = lenisRef?.current;
        if (!open || !lenis || lenis.isStopped) return;
        lenis.stop();
        return () => lenis.start();
    }, [open, lenisRef]);

    return (
        <>
            <div ref={galleryRef} className="grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4">
                {images.map((image, imageIndex) => (
                    <button
                        key={image.id ?? `${image.imagem}-${imageIndex}`}
                        type="button"
                        className={`custom-item group relative block w-full min-w-0 cursor-zoom-in overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black ${sizes[image.tamanho] ?? sizes.grande}`}
                        onClick={() => setIndex(imageIndex)}
                        aria-label={`Abrir imagem ${imageIndex + 1} de ${images.length} da galeria`}
                        aria-haspopup="dialog"
                    >
                        <img
                            src={slides[imageIndex].src}
                            alt={slides[imageIndex].alt}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                        />
                    </button>
                ))}
            </div>
            <Lightbox
                open={open}
                close={() => setIndex(-1)}
                index={Math.max(index, 0)}
                slides={slides}
                plugins={[Zoom]}
                controller={{ closeOnBackdropClick: true }}
                labels={{
                    Close: 'Fechar',
                    Next: 'Próxima imagem',
                    Previous: 'Imagem anterior',
                    'Zoom in': 'Ampliar',
                    'Zoom out': 'Reduzir',
                }}
            />
        </>
    );
};
