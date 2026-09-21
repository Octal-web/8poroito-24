import React from 'react';
import Select from 'react-select';

export const InputSelect = ({ title, name, value, idioma, onChange, options }) => {
    const handleChange = (selectedOption) => {
        onChange(name, selectedOption ? selectedOption.value : null);
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            borderRadius: '0.5rem',
            borderColor: '#d1d5db',
            backgroundColor: 'transparent',
            padding: '0.5rem',
            boxShadow: 'none',
            fontSize: '0.875rem',
            transition: 'border-color 0.2s ease',
            '&:hover': {
                borderColor: '#6366f1',
            },
            '&:focus': {
                borderColor: '#6366f1',
            },
        }),
    };

    const selectedOption = options.find((option) => option.value === value);

    return (
        <div className="mb-6">
            <div className="flex items-center mb-2">
                <img src={`/admin/img/flags/${idioma}.png`} className="w-5 mr-1" alt={`${idioma} flag`} />
                <label className="block font-bold text-gray-500">{title}</label>
            </div>
            <Select
                styles={customStyles}
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder="Selecione uma opção..."
                isClearable
            />
        </div>
    );
};