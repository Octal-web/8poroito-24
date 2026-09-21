import React, { useState } from 'react';
import { HomeProject } from '../HomeProject';

export function HomeProjectsSection({ destaques }) {
    const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

    const handleMouseMoveBtn = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setGradientPosition({ x, y });
    };
    return (
        <section className="relative bg-black z-[1]">
            <div className="flex flex-col gap-3" onMouseMove={handleMouseMoveBtn}>
                {destaques.map((destaque, index) => (
                    <HomeProject key={index} img={`/content/cases/banner/${destaque.banner}`} url={destaque.slug} gradientX={gradientPosition.x} gradientY={gradientPosition.y} />
                ))}
            </div>
        </section>
    );
}
