import React from 'react';

export const HomeBrand = ({ src = '', ...props }) => {
    return (
        <div className="relative block overflow-hidden w-full transform scale-75 lg:scale-100">
            <img
                src={`/content/clients/thumbs/${src}`}
                alt="Logo da marca"
                className="mx-auto my-auto max-h-full transition duration-300 transform hover:scale-105"                
            />
        </div>
    );
};
