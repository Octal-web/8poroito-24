import React from 'react';
import { CareerForm } from '../CareerForm';

export function CareerContactSection() {
    return (
        <section className="relative my-20 xl:my-40 2xl:my-50">
            <div className="relative container max-w-large z-[1]">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-8">Bora trocar uma ideia?</h2>
                    <div className="max-w-2xl xl:text-2xl 2xl:text-3xl font-light mx-auto">
                        <p>Clique abaixo para dar o primeiro passo na sua nova jornada na 8poroito.</p>
                    </div>
                </div>
                <CareerForm />
            </div>
        </section>
    );
}
