import React from 'react';

export const HomeBrand = ({ src = '', name = '', ...props }) => {
    return (
        <div className="relative block w-full transform scale-75 lg:scale-90">
            <img
                src={`/content/clients/thumbs/${src}`}
                alt={name ? `Logo ${name}` : 'Logo da marca'}
                loading="lazy"
                decoding="async"
                className="mx-auto my-auto h-full max-h-24 object-contain transition duration-300 transform hover:scale-105"                
            />
        </div>
    );
};
