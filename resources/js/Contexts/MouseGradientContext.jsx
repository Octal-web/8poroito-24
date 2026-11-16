import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

const DURATIONS = [2, 3, 4, 5];

const MouseGradientContext = createContext(null);

export const MouseGradientProvider = ({ children, durations = DURATIONS, ease = 'power2.out' }) => {
    const targetRef = useRef({ x: 50, y: 50 });
    const listenersRef = useRef(new Set());

    useEffect(() => {
        const handleMouseMove = (e) => {
            targetRef.current = {
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            };
            listenersRef.current.forEach((listener) => listener(targetRef.current));
        };

        document.body.addEventListener('mousemove', handleMouseMove);

        return () => document.body.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const value = useMemo(() => ({
        subscribe: (listener) => {
            listenersRef.current.add(listener);
            return () => listenersRef.current.delete(listener);
        },
        targetRef,
        durations,
        ease,
    }), [durations, ease]);

    return (
        <MouseGradientContext.Provider value={value}>
            {children}
        </MouseGradientContext.Provider>
    );
};

export const useMouseGradient = ({ duration: durationOverride } = {}) => {
    const context = useContext(MouseGradientContext);
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });
    const positionRef = useRef({ x: 50, y: 50 });

    const [randomDuration] = useState(() => {
        const durations = context?.durations ?? DURATIONS;
        return durations[Math.floor(Math.random() * durations.length)];
    });
    const duration = durationOverride ?? randomDuration;

    useEffect(() => {
        if (!context) return;

        const position = positionRef.current;
        const pendingTimers = new Set();
        const delayMs = duration * 100;

        const unsubscribe = context.subscribe((target) => {
            // Delay each target without restarting the wait on every mouse move.
            const timer = setTimeout(() => {
                pendingTimers.delete(timer);
                gsap.to(position, {
                    x: target.x,
                    y: target.y,
                    duration: duration,
                    ease: context.ease,
                    overwrite: true,
                    onUpdate: () => setGradientPosition({ x: position.x, y: position.y }),
                });
            }, delayMs);
            pendingTimers.add(timer);
        });

        return () => {
            unsubscribe();
            pendingTimers.forEach(clearTimeout);
            gsap.killTweensOf(position);
        };
    }, [context, duration]);

    return gradientPosition;
};
