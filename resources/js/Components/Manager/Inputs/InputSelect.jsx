import React from 'react';
import Select from 'react-select';

export const InputSelect = ({ title, name, value, idioma, onChange, options, isMulti = false }) => {
    const flattenOptions = (groupedOptions) =>
        groupedOptions.reduce((acc, group) => {
            if (group.options) {
                return acc.concat(group.options);
            }
            return acc.concat(group);
        }, []);

    const allOptions = flattenOptions(options);

    const handleChange = (selectedOption) => {
        if (isMulti) {
            const values = selectedOption ? selectedOption.map(opt => opt.value) : [];
            onChange(name, values);
        } else {
            onChange(name, selectedOption ? selectedOption.value : null);
        }
    };

    const selectedOption = isMulti
        ? allOptions.filter((option) => value?.includes(option.value))
        : allOptions.find((option) => option.value === value);

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

    return (
        <div className="mb-6">
            <div className="flex items-center mb-2">
                <img src={`/admin/img/flags/${idioma}.png`} className="w-5 mr-1" alt={`${idioma} flag`} />
                <label className="block font-bold text-gray-500">{title}</label>
            </div>
            <Select
                classNamePrefix="admin-select"
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder="Selecione uma opção..."
                isClearable
            />
        </div>
    );
};