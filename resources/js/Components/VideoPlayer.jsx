import React, { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({ src, classList = [], isPlaying, autoplay, onPlaying, onBlocked }) => {
    const videoRef = useRef(null);
    const className = classList.join(' ');
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) {
            return;
        }

        // O React não garante o atributo "muted" no DOM, e o Safari exige ele para autoplay
        if (autoplay) {
            videoElement.muted = true;
            videoElement.defaultMuted = true;
            videoElement.setAttribute('muted', '');
        }

        videoElement.oncanplay = () => setVideoError(false);
        videoElement.onerror = () => setVideoError(true);

        if (!isPlaying) {
            videoElement.pause();
            return;
        }

        // Autoplay bloqueado (ex.: iPhone em modo de economia de bateria): tenta de novo no primeiro toque/clique
        const retryOnInteraction = () => {
            videoElement.play().catch(() => {});
            removeRetryListeners();
        };

        const removeRetryListeners = () => {
            document.removeEventListener('touchend', retryOnInteraction);
            document.removeEventListener('click', retryOnInteraction);
        };

        videoElement.play().catch(error => {
            if (error.name === 'NotAllowedError') {
                onBlocked && onBlocked();
                document.addEventListener('touchend', retryOnInteraction, { once: true });
                document.addEventListener('click', retryOnInteraction, { once: true });
                return;
            }

            console.error("Failed to play video:", error);
            setVideoError(true);
        });

        return removeRetryListeners;
    }, [isPlaying]);

    const handleUserInteraction = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
    };

    useEffect(() => {
        if (autoplay) {
            document.addEventListener('click', handleUserInteraction);
            document.addEventListener('touchstart', handleUserInteraction);
        }

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, [autoplay]);

    return (
        <>
            <video
                ref={videoRef}
                className={className}
                loop
                playsInline
                autoPlay={autoplay}
                muted={autoplay}
                // Sem autoplay, só baixa o vídeo quando o usuário der play (videoAbout tem ~45 MB).
                preload={autoplay ? 'auto' : 'metadata'}
                onPlaying={onPlaying}
            >
                <source src={src} type="video/mp4" />
            </video>
            {videoError && <p>Failed to load video. Please try again later.</p>}
        </>
    );
};
