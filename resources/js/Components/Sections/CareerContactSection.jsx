import React from 'react';
import { CareerForm } from '../CareerForm';

export function CareerContactSection({ content, images, children }) {
    return (
        <>
            <div className="gap-4 grid grid-cols-2 md:grid-cols-4 my-4 mx-4 max-sm:[&_img:nth-child(n+3)]:hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.imagem}
                        alt=""
                        className="w-full aspect-square object-cover"
                    />
                ))}
            </div>

            <section className="relative my-20 xl:my-30 2xl:my-40">
                <div className="relative container max-w-large z-[1]">

                    <div className="text-center mb-20 xl:mb-30">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-balance font-bold mb-8">{content.titulo}</h2>
                        <div className="max-w-2xl xl:text-xl font-light mx-auto" dangerouslySetInnerHTML={{ __html: content.texto }} />
                    </div>

                    {children}

                    <div id="banco-de-talentos" className="scroll-mt-10">
                        <CareerForm />
                    </div>
                </div>
            </section>
        </>
    );
}
