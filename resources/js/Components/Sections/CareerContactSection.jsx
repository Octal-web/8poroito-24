import React from 'react';
import { CareerForm } from '../CareerForm';

export function CareerContactSection({ content }) {
    return (
        <section className="relative my-20 xl:my-40 2xl:my-50">
            <div className="relative container max-w-large z-[1]">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl xl:text-7xl text-balance font-bold mb-8">{content.titulo}</h2>
                    <div className="max-w-2xl xl:text-xl font-light mx-auto" dangerouslySetInnerHTML={{ __html: content.texto }} />
                </div>
                <CareerForm />
            </div>
        </section>
    );
}
