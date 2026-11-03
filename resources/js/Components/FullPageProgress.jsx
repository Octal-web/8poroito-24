import React, { useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { gsap } from 'gsap';

const shouldAnimate = (visit) => {
    if (!visit) return false;
    if (visit.method !== 'get') return false;
    if (visit.only?.length) return false;
    if (visit.url?.pathname?.startsWith('/manager')) return false;

    return true;
};

export const FullPageProgress = () => {
    const overlayRef = useRef(null);
    const logoRef = useRef(null);
    const barRef = useRef(null);

    useEffect(() => {
        const overlay = overlayRef.current;
        const logo = logoRef.current;
        const bar = barRef.current;

        let active = false;
        let enterTween = null;
        let barTween = null;

        gsap.set(overlay, { yPercent: 100, autoAlpha: 0 });

        const start = (event) => {
            if (!shouldAnimate(event.detail.visit)) return;

            active = true;
            gsap.killTweensOf([overlay, logo, bar]);

            gsap.set(overlay, { autoAlpha: 1 });
            gsap.set(bar, { scaleX: 0 });
            gsap.set(logo, { autoAlpha: 0, y: 20 });

            enterTween = gsap.timeline()
                .fromTo(overlay, { yPercent: 100 }, { yPercent: 0, duration: 0.3, ease: 'power3.inOut' })
                .to(logo, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

            barTween = gsap.to(bar, { scaleX: 0.9, duration: 4, ease: 'power2.out' });
        };

        const finish = () => {
            if (!active) return;
            active = false;

            const reveal = () => {
                barTween && barTween.kill();

                gsap.timeline()
                    .to(bar, { scaleX: 1, duration: 0.25, ease: 'power1.out' })
                    .to(logo, { autoAlpha: 0, y: -20, duration: 0.3, ease: 'power2.in' })
                    .to(overlay, { yPercent: -100, duration: 0.4, ease: 'power3.inOut' }, '-=0.1')
                    .set(overlay, { autoAlpha: 0, yPercent: 100 });
            };

            if (enterTween && enterTween.isActive()) {
                enterTween.eventCallback('onComplete', reveal);
            } else {
                reveal();
            }
        };

        const removeStart = router.on('start', start);
        const removeFinish = router.on('finish', finish);

        return () => {
            removeStart();
            removeFinish();
            gsap.killTweensOf([overlay, logo, bar]);
        };
    }, []);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black invisible"
            aria-hidden="true"
        >
            <div ref={logoRef} className="flex flex-col items-center gap-6">
                <img src="/site/img/logo.png" alt="" className="block w-32 md:w-44" />
                <div className="w-32 md:w-44 h-[2px] bg-white/15 overflow-hidden">
                    <div ref={barRef} className="h-full w-full bg-white origin-left" />
                </div>
            </div>
        </div>
    );
};
