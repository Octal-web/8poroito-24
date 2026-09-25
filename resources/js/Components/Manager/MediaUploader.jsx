import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

export const VIDEO_MAX_BYTES = 20 * 1024 * 1024;
const POSTER_MAX_SIZE = 1920;

const accept = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'video/mp4': ['.mp4'],
    'video/webm': ['.webm'],
    'video/quicktime': ['.mov'],
};

const isVideo = (file) => file.type.startsWith('video/');

// Pega um frame aleatório (entre 10% e 90% da duração) para usar de poster
const captureRandomFrame = (file) => new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');

    const finish = (result) => {
        video.removeAttribute('src');
        video.load();
        URL.revokeObjectURL(url);
        resolve(result);
    };

    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    video.onloadedmetadata = () => {
        const duration = video.duration;
        video.currentTime = Number.isFinite(duration) && duration > 0
            ? duration * (0.1 + Math.random() * 0.8)
            : 0;
    };

    video.onseeked = () => {
        const scale = Math.min(1, POSTER_MAX_SIZE / Math.max(video.videoWidth, video.videoHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
        canvas.height = Math.max(1, Math.round(video.videoHeight * scale));

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            finish(null);
            return;
        }

        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            finish(blob ? new File([blob], 'poster.webp', { type: blob.type || 'image/webp', lastModified: Date.now() }) : null);
        }, 'image/webp', 0.85);
    };

    video.onerror = () => finish(null);

    video.src = url;
});

export const MediaUploader = ({ onUpload }) => {
    const [errors, setErrors] = useState([]);
    const [processing, setProcessing] = useState(false);

    const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
        const newErrors = rejectedFiles.map(({ file }) => `${file.name}: formato não suportado.`);

        const validFiles = acceptedFiles.filter((file) => {
            if (isVideo(file) && file.size > VIDEO_MAX_BYTES) {
                newErrors.push(`${file.name}: o vídeo não pode passar de 20MB.`);
                return false;
            }
            return true;
        });

        setErrors(newErrors);

        if (!validFiles.length) {
            return;
        }

        setProcessing(true);

        const processedMedia = await Promise.all(
            validFiles.map(async (file) => {
                if (!isVideo(file)) {
                    return { original: file };
                }

                const poster = await captureRandomFrame(file);
                return poster ? { original: file, poster } : { original: file };
            })
        );

        setProcessing(false);
        onUpload(processedMedia);
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        disabled: processing,
    });

    return (
        <div {...getRootProps()} className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 p-6 rounded-md cursor-pointer">
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-gray-500 font-bold text-center mb-3">Solte os arquivos aqui ...</p>
            ) : (
                <p className="text-gray-500 font-bold text-center mb-3">Arraste e solte imagens ou vídeos aqui para enviar</p>
            )}
            <FontAwesomeIcon icon={processing ? faSpinner : faCloudUploadAlt} spin={processing} size="3x" className="text-gray-400 my-2" />
            <p className="text-xs text-gray-500 text-center mt-2">JPG, PNG, WEBP, MP4, WEBM ou MOV. Vídeos até 20MB.</p>
            {errors.length > 0 && (
                <ul className="mt-3 text-sm text-red-500">
                    {errors.map((error) => <li key={error}>{error}</li>)}
                </ul>
            )}
        </div>
    );
};
