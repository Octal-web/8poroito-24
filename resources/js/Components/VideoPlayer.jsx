import React, { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({ src, classList = [], isPlaying, autoplay }) => {
    const videoRef = useRef(null);
    const className = classList.join(' ');
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            videoElement.oncanplay = () => setVideoError(false);
            videoElement.onerror = () => setVideoError(true);

            if (isPlaying) {
                videoElement.play().catch(error => {
                    console.error("Failed to play video:", error);
                    setVideoError(true);
                });
            } else {
                videoElement.pause();
            }
        }
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
            >
                <source src={src} type="video/mp4" />
            </video>
            {videoError && <p>Failed to load video. Please try again later.</p>}
        </>
    );
};
