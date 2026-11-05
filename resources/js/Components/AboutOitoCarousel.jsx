import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = ({ onClick }) => (
    <div
        className="custom-arrow absolute left-[20%] -bottom-[32px] 2xl:-bottom-[49px] cursor-pointer z-[1] transform scale-75 md:scale-100"
        onClick={onClick}
    >  
        <img src={`/site/img/carousel-arrow.svg`} alt="Previous" className="transform rotate-180" />
    </div>
);

const CustomNextArrow = ({ onClick }) => (
    <div
        className="custom-arrow absolute right-[20%] -bottom-[32px] 2xl:-bottom-[49px] cursor-pointer z-[1] transform scale-75 md:scale-100"
        onClick={onClick}
    >  
        <img src={`/site/img/carousel-arrow.svg`} alt="Next" />
    </div>
);

export const AboutOitoCarousel = ({ data }) => {
    const settings = {
        dots: true,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        infinite: true,
        centerMode: true,
        slidesToShow: 2.333,
        speed: 500,
        responsive: [
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <Slider {...settings} className="place-carousel w-full pb-10 md:mb-30 xl:mb-30">
            {data.map((imagem, index) => (
                <div key={index}>
                    <div className="relative block mx-8 sm:mx-20 md:mx-15 xl:mx-24 2xl:mx-30 mt-30 xs:mb-30">
                        <img src={imagem.imagem} alt="Espaço da 8poroito" loading="lazy" decoding="async" className="carousel-image w-full mb-10 transition-all" />
                        <div className="carousel-shadow absolute top-0 left-0 w-full h-full bg-black opacity-50 transition-all"></div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};
