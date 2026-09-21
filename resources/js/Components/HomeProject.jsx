import React, { useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export const HomeProject = ({ img = '', url = '', gradientX = '', gradientY = '', ...props }) => {
    const projectRef = useRef(null);

    useEffect(() => {
        
    }, []);

    return (
        <div ref={projectRef} className="project-item relative overflow-hidden w-full h-72 md:h-72 2xl:h-[28rem]">
            <div className="project-image absolute top-0 left-0 w-full h-full bg-cover bg-center md:grayscale" style={{ backgroundImage: `url(${img})` }}></div>
            <div className="absolute top-[50%] md:top-0 inset-0 m-auto w-full h-16">
                <div className="container">
                    <Link
                        href={route('Cases.caseCliente', {slug: url})}
                        className="button inset mx-auto md:mr-0 relative overflow-hidden block w-64 border border-white text-center text-white h-16 leading-[4rem] font-light uppercase md:opacity-0 z-[1]"
                        style={{
                            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 255, 255, 0.3), transparent)`,
                        }}
                    >
                        Ver projeto completo
                    </Link>
                </div>
            </div>
        </div>
    );
};
