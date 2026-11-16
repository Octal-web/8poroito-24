import React from 'react';

export const HomeCarousel = ({ reverse = false, text = 'O poder da marca', duration = 60, repeat = 3 }) => {
    const items = Array.from({ length: repeat });

    const renderGroup = (groupIndex) => (
        <div className="flex shrink-0" aria-hidden={groupIndex > 0}>
            {items.map((_, index) => (
                <span
                    key={index}
                    className="shrink-0 pr-[0.6em] opacity-15 font-semibold text-center text-[60px] md:text-[100px] lg:text-[140px] xl:text-[160px] 2xl:text-[180px] text-primary uppercase whitespace-nowrap leading-[1.1] tracking-[17%]"
                >
                    {text}
                </span>
            ))}
        </div>
    );

    return (
        <div className="w-full overflow-hidden">
            <div
                className="flex gap-10 w-max animate-marquee"
                style={{ animationDuration: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                {renderGroup(0)}
                {renderGroup(1)}
            </div>
        </div>
    );
};
