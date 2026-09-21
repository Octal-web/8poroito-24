import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VideoPlayer } from '../VideoPlayer';

gsap.registerPlugin(ScrollTrigger);

export function HomeVideoSection() {
    const [playing, setPlaying] = useState(false);
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const video = section.querySelector('video');
        let refreshFrame;
        const refresh = () => {
            cancelAnimationFrame(refreshFrame);
            refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        };

        const context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                pin: true,
                // Projects keep their natural position and scroll over the pinned video.
                pinSpacing: false,
                start: 'top top',
                end: () => `+=${section.offsetHeight}`,
                invalidateOnRefresh: true,
            });
        }, section);

        // The video's intrinsic height becomes available after the initial render.
        const resizeObserver = new ResizeObserver(refresh);
        resizeObserver.observe(video);
        video.addEventListener('loadedmetadata', refresh);
        refresh();

        return () => {
            resizeObserver.disconnect();
            video.removeEventListener('loadedmetadata', refresh);
            cancelAnimationFrame(refreshFrame);
            context.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-20 md:pt-0 pb-50">
            <div className="absolute bottom-0 left-0 w-full h-[50%] md:h-[40%] 2xl:h-[30%] bg-black"></div>

            <div className={`relative container ${playing ? 'videoPlay' : 'videoPause'}`}>
                <VideoPlayer
                    src="/site/video/videoAbout.mp4"
                    isPlaying={playing}
                    classList={['w-full', 'relative', 'z-[1]', 'max-h-[90vh]']}
                    autoplay={false}
                />

                <button className="playBtn absolute inset-0 m-auto xl:w-40 h-30 w-30 xl:h-40 2xl:w-fit 2xl:h-fit transition-all z-[1]" onClick={() => setPlaying(!playing)}><img src={`/site/img/${playing ? 'pauseBtn' : 'playBtn'}.png`} className="block" /></button>
            </div>
        </section>
    );
}
