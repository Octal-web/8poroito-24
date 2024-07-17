import React, { useState } from 'react';

import { ProposalForm } from './ProposalForm';

export const ProposalModal = ({ isOpen, onClose }) => {
    // States
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    if (!isOpen) return null;

    // Buttons Shadow Move
    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };

    return (
        <div className="modal-background fixed inset-0 flex z-50 bg-white bg-opacity-30" onMouseOver={handleMouseMoveBtn}>
            <div className="absolute top-0 left-0 w-full h-full" onClick={onClose}></div>
            <div className="modal relative bg-black px-20 py-15 shadow-lg m-auto max-w-lg w-full max-h-screen overflow-auto z-[1]" data-lenis-prevent>
                <h2 className="text-lg mb-4">Solicite sua proposta agora mesmo!</h2>
                    <ProposalForm gradientPosition={gradientPosition} />
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 text-zinc-300 hover:text-zinc-500 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};