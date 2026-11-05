import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { gsap } from 'gsap';
import { VideoPlayer } from '../VideoPlayer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutTeamSection({ text }) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const context = gsap.context(() => {
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

        });
        return () => context.revert();
    }, []);

    return (
        <section className="bg-black py-10">
            <div className="container max-w-small mb-20">
                <div className="text-white font-light text-center space-y-5" dangerouslySetInnerHTML={{ __html: text }} />

                <h4 className="text-white font-bold text-center text-xl">Você também quer conquistar notoriedade no seu mercado?</h4>

                <Link href="/contato" className="block w-48 border border-white text-white text-center h-12 leading-[3rem] font-light uppercase mx-auto mt-8 md:mt-16 transition-colors hover:bg-white hover:text-black">Quero</Link>
            </div>

            <div className="container max-w-large">
                <div ref={videoRef} className={`relative z-[2] ${playing ? 'videoPlay' : 'videoPause'}`}>
                    <VideoPlayer
                        src="/site/video/videoAbout.mp4"
                        poster="/site/img/videoAboutPoster.webp"
                        isPlaying={playing}
                        classList={['w-full', 'relative', 'z-[1]', 'max-h-[90vh]']}
                        autoplay={false}
                    />

                    <button className="playBtn absolute inset-0 m-auto xl:w-40 h-30 w-30 xl:h-40 2xl:w-fit 2xl:h-fit transition-all z-[1]" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}><img src={`/site/img/${playing ? 'pauseBtn' : 'playBtn'}.png`} alt="" className="block" /></button>
                </div>
            </div>
        </section>
    );
}
