import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const HomeCarousel = ({ reverse = false, text = 'string', ...props }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 80000,
        slidesToShow: 0.405,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        draggable: false,
        rtl: reverse,
        responsive: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 0.338,
                    speed: 7000,
                }
            },
            {
                breakpoint: 1536,
                settings: {
                    slidesToShow: 0.331,
                    speed: 70000,
                }
            },
            {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 0.346,
                    speed: 60000,
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 0.8,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 0.8,
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
                }
            },
        ]
    };

    return (
        <Slider {...settings} className="w-full">
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] lg:text-[300px] xl:text-[350px] 2xl:text-[400px] text-primary uppercase whitespace-nowrap lg:leading-[22rem] xl:leading-[25rem] 2xl:leading-[29rem]">
                    {text}
                </h1>
            </div>
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] lg:text-[300px] xl:text-[350px] 2xl:text-[400px] text-primary uppercase whitespace-nowrap lg:leading-[22rem] xl:leading-[25rem] 2xl:leading-[29rem]">
                    {text}
                </h1>
            </div>
            <div>
                <h1 className="opacity-15 font-secondary text-[100px] lg:text-[300px] xl:text-[350px] 2xl:text-[400px] text-primary uppercase whitespace-nowrap lg:leading-[22rem] xl:leading-[25rem] 2xl:leading-[29rem]">
                    {text}
                </h1>
            </div>
        </Slider>
    );
};
