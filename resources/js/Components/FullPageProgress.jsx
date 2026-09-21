import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export const FullPageProgress = () => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [isGet, setIsGet] = useState(true);

    useEffect(() => {
        const start = (event) => {
            setLoading(true);
            setVisible(true);

            if (event?.detail?.visit?.method === 'post' || event?.detail?.visit?.url?.pathname.startsWith('/manager')) {
                setIsGet(false);
            } else {
                setIsGet(true);
            }
        };

        const end = () => {
            setLoading(false);
            setTimeout(() => setVisible(false), 500);
        };

        Inertia.on('start', start);
        Inertia.on('finish', end);

        return () => {
            Inertia.off('start', start);
            Inertia.off('finish', end);
        };
    }, []);

    if (!visible || !isGet) return null;

    return (
        <>
            <div className={`fixed inset-0 bg-black z-[5000] flex items-center justify-center transition-all duration-500 animate-slide-in-bottom ${!loading && '-translate-y-full'}`}>
                <img src={`/site/img/eight-effect.png`} className="w-9/12 max-w-80 mx-auto" />
            </div>
        </>
    );
};
