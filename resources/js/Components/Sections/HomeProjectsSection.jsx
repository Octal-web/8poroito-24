import React from 'react';
import { useMouseGradient } from '../../Contexts/MouseGradientContext';
import { HomeProject } from '../HomeProject';

export function HomeProjectsSection({ destaques }) {
    const gradientPosition = useMouseGradient();

    return (
        <section className="relative bg-black z-[1]">
            <div className="flex flex-col gap-3">
                {destaques.map((destaque, index) => (
                    <HomeProject key={index} img={`/content/cases/banner/${destaque.banner}`} url={destaque.slug} gradientX={gradientPosition.x} gradientY={gradientPosition.y} />
                ))}
            </div>
        </section>
    );
}
