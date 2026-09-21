import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export const CaseImageSize = ({ imageId, currentSize }) => {
    const [isUpdated, setIsUpdated] = useState(false);

    const { data, setData, put, processing, errors } = useForm({ tamanho: currentSize });

    const handleSizeChange = (e) => {
        const newSize = e.target.value;

        setData('tamanho', newSize);
        setIsUpdated(true);
    };

    useEffect(() => {
        if (isUpdated) {
            put(route('Manager.Cases.Imagens.tamanho', { id: imageId }), {
                preserveScroll: true,
            });
            setIsUpdated(false);
        }
    }, [isUpdated]);

    return (
        <select
            value={data.tamanho}
            onChange={handleSizeChange}
            className="mt-2 block w-full px-2 border-gray-200 ring-0 focus:ring-0 focus:border-gray-500"
            disabled={processing}
        >
            <option value="grande">Grande</option>
            <option value="medio">Médio</option>
            <option value="pequeno">Pequeno</option>
        </select>
    );
};