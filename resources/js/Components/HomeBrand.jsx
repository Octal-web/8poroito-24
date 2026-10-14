import React from 'react';

export const HomeBrand = ({ src = '', ...props }) => {
    return (
        <div className="relative block w-full transform scale-75 lg:scale-100">
            <img
                src={`/content/clients/thumbs/${src}`}
                alt="Logo da marca"
                className="mx-auto my-auto h-full max-h-24 object-contain transition duration-300 transform hover:scale-105"                
            />
        </div>
    );
};
