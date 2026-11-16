import React, { useState } from 'react';
import { useMouseGradient } from '../../Contexts/MouseGradientContext';
import { ProposalModal } from '../ProposalModal';

export function CasesProposalSection() {
    const gradientPosition = useMouseGradient();

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="relative my-30">
            <div className="container max-w-small">
                <h3 className="text-xl text-center mb-3">O próximo case de sucesso por aqui pode ser o seu.</h3>
                <button
                    className="relative overflow-hidden block w-64 border border-white text-center h-16 h-16 leading-[4rem] font-light text-white uppercase mx-auto"
                    style={{
                        background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(50, 50, 50, 0.3), #000)`,
                    }}
                    onClick={handleOpenModal}
                >
                    Entrar em contato
                </button>
                <ProposalModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </section>
    );
}
