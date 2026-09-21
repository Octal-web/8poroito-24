import React, { useState } from 'react';
import { ProposalModal } from '../ProposalModal';

export function CasesProposalSection() {
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };
    return (
        <section className="relative my-30" onMouseMove={handleMouseMoveBtn}>
            <div className="container max-w-small">
                <h3 className="text-xl text-center mb-3">Vamos transformar sua marca em emoção?</h3>
                <button
                    className="relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(50, 50, 50, 0.3), #000)`,
                    }}
                    onClick={handleOpenModal}
                >
                    Solicitar Proposta
                </button>
                <ProposalModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </section>
    );
}
