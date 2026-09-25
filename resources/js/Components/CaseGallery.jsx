import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Video from 'yet-another-react-lightbox/plugins/video';
import 'yet-another-react-lightbox/styles.css';
import { useSmoothScroll } from '../Contexts/SmoothScrollContext';

gsap.registerPlugin(ScrollTrigger);

const sizes = {
    grande: 'col-span-1 sm:col-span-6 aspect-[4/3] sm:aspect-[16/9] xl:aspect-auto xl:h-[46rem] 2xl:h-[60rem]',
    medio: 'col-span-1 sm:col-span-3 aspect-[4/3] xl:aspect-auto xl:h-[34rem] 2xl:h-[46rem]',
    pequeno: 'col-span-1 sm:col-span-3 lg:col-span-2 aspect-square xl:aspect-auto xl:h-[24rem] 2xl:h-[35rem]',
};

const imagesPath = '/content/cases/images/';
const videosPath = '/content/cases/videos/';

// .mov costuma ser H.264 e navegadores não reconhecem "video/quicktime" no <source>
const videoMimeTypes = { mp4: 'video/mp4', m4v: 'video/mp4', mov: 'video/mp4', webm: 'video/webm' };
const getVideoMimeType = (file) => videoMimeTypes[file.split('.').pop()?.toLowerCase()] ?? 'video/mp4';

const isVideo = (item) => item.tipo === 'video';

export const CaseGallery = ({ images = [], title = '' }) => {
    console.log(images)
    const galleryRef = useRef(null);
    const lenisRef = useSmoothScroll();
    const [index, setIndex] = useState(-1);
    const open = index >= 0;
    const videoRefs = useRef({});
    const slides = useMemo(() => images.map((image, imageIndex) => (isVideo(image) ? {
        type: 'video',
        sources: [{ src: `${videosPath}${image.imagem}`, type: getVideoMimeType(image.imagem) }],
        poster: image.poster ? `${imagesPath}${image.poster}` : undefined,
        alt: `${title || 'Case'} — vídeo ${imageIndex + 1}`,
    } : {
        src: `${imagesPath}${image.imagem}`,
        alt: `${title || 'Case'} — imagem ${imageIndex + 1}`,
    })), [images, title]);

    // No hover o vídeo toca mudo em loop; ao sair pausa onde parou
    const playPreview = (imageIndex) => {
        const video = videoRefs.current[imageIndex];
        video?.play().catch(() => {});
    };

    const pausePreview = (imageIndex) => {
        videoRefs.current[imageIndex]?.pause();
    };

    const openSlide = (imageIndex) => {
        pausePreview(imageIndex);
        setIndex(imageIndex);
    };

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
                        onClick={() => openSlide(imageIndex)}
                        {...(isVideo(image) && {
                            onMouseEnter: () => playPreview(imageIndex),
                            onMouseLeave: () => pausePreview(imageIndex),
                            onFocus: () => playPreview(imageIndex),
                            onBlur: () => pausePreview(imageIndex),
                        })}
                        aria-label={`Abrir ${isVideo(image) ? 'vídeo' : 'imagem'} ${imageIndex + 1} de ${images.length} da galeria`}
                        aria-haspopup="dialog"
                    >
                        {isVideo(image) ? (
                            <>
                                <video
                                    ref={(element) => { videoRefs.current[imageIndex] = element; }}
                                    src={slides[imageIndex].sources[0].src}
                                    poster={slides[imageIndex].poster}
                                    preload={slides[imageIndex].poster ? 'none' : 'metadata'}
                                    muted
                                    loop
                                    playsInline
                                    disablePictureInPicture
                                    aria-hidden="true"
                                    tabIndex={-1}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                                />
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white transition-opacity duration-300 group-hover:opacity-0"
                                >
                                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current"><path d="M8 5v14l11-7z" /></svg>
                                </span>
                            </>
                        ) : (
                            <img
                                src={slides[imageIndex].src}
                                alt={slides[imageIndex].alt}
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
                            />
                        )}
                    </button>
                ))}
            </div>
            <Lightbox
                open={open}
                close={() => setIndex(-1)}
                index={Math.max(index, 0)}
                slides={slides}
                plugins={[Zoom, Video]}
                video={{ autoPlay: true, controls: true, playsInline: true, preload: 'auto' }}
                controller={{ closeOnBackdropClick: true }}
                labels={{
                    Close: 'Fechar',
                    Next: 'Próximo',
                    Previous: 'Anterior',
                    'Zoom in': 'Ampliar',
                    'Zoom out': 'Reduzir',
                }}
            />
        </>
    );
};
