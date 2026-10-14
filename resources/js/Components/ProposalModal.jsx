import React, { useState } from 'react';
import { useMouseGradient } from '../Contexts/MouseGradientContext';

import { ProposalForm } from './ProposalForm';

export const ProposalModal = ({ isOpen, onClose }) => {
    // States
    const gradientPosition = useMouseGradient();
    const [isClosing, setIsClosing] = useState(isOpen);

    if (!isOpen) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 300);
    };

    return (
       <div className={`modal-background fixed inset-0 flex z-50 bg-white bg-opacity-30 transition-all ${isClosing ? 'opacity-0' : ''}`}>
            <div className="absolute top-0 left-0 w-full h-full" onClick={handleClose}></div>
            <div className="modal relative bg-black px-20 py-15 shadow-lg m-auto max-w-lg w-full max-h-screen overflow-auto z-[1]" data-lenis-prevent>
                <h2 className="text-lg mb-4">Solicite sua proposta agora mesmo!</h2>
                    <ProposalForm gradientPosition={gradientPosition} />
                <button 
                    onClick={handleClose} 
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