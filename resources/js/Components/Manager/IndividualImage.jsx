import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ConfirmModal } from './ConfirmModal';

export const IndividualImage = ({ individualContent, imagensPath, imagensClass, controller }) => {
    const [isChecked, setIsChecked] = useState(individualContent.visivel || false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        visivel: isChecked
    });

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        post(route('Manager.' + controller + '.visibilidade', {id: individualContent.id}), {
            preserveScroll: true,
            onSuccess: (response) => {
                if (response.props.message && response.props.message.type === 'success') {
                    setIsChecked(!isChecked);
                } else {
                    setIsChecked(isChecked);
                }
            },
            onError: () => {
                setIsChecked(isChecked);
            }
        });
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="group relative flex justify-center overflow-hidden border select-none h-full">
                <div className="absolute inset-0.5 bg-black bg-opacity-0 transition-all group-hover:bg-opacity-20 duration-300"></div>
                {individualContent.tipo === 'video' ? (
                    <>
                        {individualContent.poster ? (
                            <img src={`${imagensPath}${individualContent.poster}`} className="w-full p-0.5 object-cover" />
                        ) : (
                            <video src={`/content/cases/videos/${individualContent.imagem}`} className="w-full p-0.5 object-cover" muted playsInline preload="metadata" />
                        )}
                        <span className="pointer-events-none absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white">
                            <FontAwesomeIcon icon={faPlay} className="text-xs" />
                        </span>
                    </>
                ) : (
                    <img src={`${imagensPath}${individualContent.imagem}`} className="w-full p-0.5 object-cover" />
                )}

                <ul className="absolute bg-white top-0.5 right-0.5 grid grid-cols-2 items-center transition-all translate-x-full group-hover:translate-x-0 sort-ignore">
                    <li className="py-1.5 px-1 h-full flex items-center hover:bg-gray-100">
                        <label className="cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isChecked} 
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="relative w-6 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-[8px] rtl:peer-checked:after:-translate-x-[5px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </li>
                    
                    <li className="py-1.5 px-1 flex justify-center items-center hover:bg-gray-100">
                        <button className="h-5 w-5 relative z-[1]" onClick={() => openModal(individualContent.id)}>
                            <FontAwesomeIcon icon={faTrash} className="block mx-auto text-red-700" />
                        </button>
                    </li>
                </ul>
            </div>

            {isModalOpen && <ConfirmModal icon={faTrash} closeModal={closeModal} type="delete" confirm={route('Manager.' + controller + '.excluir', {id: individualContent.id})} />}
        </>
    );
};
