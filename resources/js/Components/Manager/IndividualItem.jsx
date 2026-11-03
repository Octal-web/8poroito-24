import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

import { ConfirmModal } from './ConfirmModal';

export const IndividualItem = ({ individualContent, imagensPath, imagensClass, controller, index, edit }) => {
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

    useEffect(() => {
        setIsChecked(individualContent.visivel);
    }, [individualContent?.visivel]);
    
    return (
        <tr className="bg-slate-50">
            <td className="border px-4 w-1/6 py-4">{index + 1}</td>
            <td className="border px-4 py-4">{individualContent.titulo || individualContent.nome}</td>
            <td className="border px-4 py-4 w-1/6">
                {edit ?
                    <label className="cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isChecked} 
                            onChange={handleCheckboxChange}
                            className="sr-only peer"
                        />
                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                :
                    individualContent.data
                }
            </td>
            <td className="border px-4 py-2 w-1/6">
                {edit ?
                    <Link href={route('Manager.' + controller + '.editar', { id: individualContent.id })} className="h-5 w-5 relative mr-4 z-[1] before:content-[''] before:absolute before:-top-[8px] before:-left-[10px] before:w-9 before:h-9 before:bg-slate-200 before:rounded-full before:-mt-[-2px] before:-z-[1] before:transition-all before:transform before:scale-0 hover:before:scale-100">
                        <FontAwesomeIcon icon={faEdit} className="text-slate-700" />
                    </Link>
                :
                    <Link href={route('Manager.' + controller + '.visualizar', { id: individualContent.id })} className="h-5 w-5 relative mr-4 z-[1] before:content-[''] before:absolute before:-top-[8px] before:-left-[10px] before:w-9 before:h-9 before:bg-slate-200 before:rounded-full before:-mt-[-2px] before:-z-[1] before:transition-all before:transform before:scale-0 hover:before:scale-100">
                        <FontAwesomeIcon icon={faEye} className="text-slate-700" />
                    </Link>
                }
                <button className="h-5 w-5 relative z-[1] before:content-[''] before:absolute before:-top-[7px] before:-left-[8px] before:w-9 before:h-9 before:bg-slate-200 before:rounded-full before:-mt-[-2px] before:-z-[1] before:transition-all before:transform before:scale-0 hover:before:scale-100" onClick={() => openModal(individualContent.id)}>
                    <FontAwesomeIcon icon={faTrash} className="text-red-700" />
                </button>
            </td>

            {isModalOpen && <ConfirmModal icon={faTrash} closeModal={closeModal} type="delete" confirm={route('Manager.' + controller + '.excluir', {id: individualContent.id})} />}
        </tr>
    );
};
