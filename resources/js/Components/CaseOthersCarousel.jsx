import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
    <div
        className="custom-arrow absolute left-0 bottom-[-32px] cursor-pointer z-[1]"
        onClick={onClick}
    >  
        <img src={`/site/img/carousel-arrow.svg`} alt="Previous" className="transform rotate-180" />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div
        className="custom-arrow absolute right-0 bottom-[-32px] cursor-pointer z-[1]"
        onClick={onClick}
    >  
        <img src={`/site/img/carousel-arrow.svg`} alt="Next" />
    </div>
);

export const CaseOthersCarousel = ({ data }) => {
    const settings = {
        dots: true,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        infinite: false,
        slidesToShow: 3.2,
        slidesToScroll: 3.2,
        speed: 500,
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings} className="cases-carousel w-full pb-10">
            {data.map((imagem, index) => (
            <div>
                <Link href={route('Cases.caseCliente', {slug: imagem.slug})} className="relative block mx-2">
                    <img src={`/content/cases/thumbs/${imagem.imagem}`} className="carousel-image w-full transition-all" />
                </Link>
            </div>
            ))}
        </Slider>
    );
};
