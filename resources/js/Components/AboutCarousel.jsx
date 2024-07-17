import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AboutCarousel = ({ reverse = false, text = 'string', ...props }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 80000,
        slidesToShow: 0.537,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        draggable: false,
        rtl: reverse,
        responsive: [
            {
                breakpoint: 1750,
                settings: {
                    slidesToShow: 0.47,
                }
            },
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 0.43,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 0.388,
                }
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 0.363,
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 0.432,
                    speed: 70000,
                }
            },
            {
                breakpoint: 920,
                settings: {
                    slidesToShow: 0.515,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 0.65,
                }
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 0.512,
                }
            },
            {
                breakpoint: 460,
                settings: {
                    slidesToShow: 0.345,
                    speed: 60000,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 0.331,
                    speed: 60000,
                }
            },
        ]
    };

    return (
        <Slider {...settings} className="w-full">
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] 2xl:text-[300px] text-white uppercase whitespace-nowrap leading-[11rem] lg:leading-[17rem] xl:leading-[19rem] 2xl:leading-[22rem]">
                    {text}
                </h1>
            </div>
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] 2xl:text-[300px] text-white uppercase whitespace-nowrap leading-[11rem] lg:leading-[17rem] xl:leading-[19rem] 2xl:leading-[22rem]">
                    {text}
                </h1>
            </div>
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] md:text-[150px] lg:text-[200px] xl:text-[250px] 2xl:text-[300px] text-white uppercase whitespace-nowrap leading-[11rem] lg:leading-[17rem] xl:leading-[19rem] 2xl:leading-[22rem]">
                    {text}
                </h1>
            </div>
        </Slider>
    );
};
