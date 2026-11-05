import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { ConfirmModal } from '../../../Components/Manager/ConfirmModal';

const Page = () => {
    // Content
    const { idioma, curriculo } = usePage().props;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const breadcrumbItems = [
        { label: 'Currículos', link: 'Manager.Carreiras.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faUser} items={breadcrumbItems} current="Visualizar" idioma={idioma.codigo} />
            
            <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black">Visualizar Currículo</h3>
                </div>

                <div className="mt-10">
                    <div className="flex flex-col gap-y-2">
                        <p><b>Nome</b>: {curriculo.nome}</p>
                        <p><b>E-mail</b>: {curriculo.email}</p>
                        <p><b>Whatsapp</b>: {curriculo.whatsapp}</p>
                        <p><b>Pretensão Salarial</b>: {curriculo.pretensao}</p>
                        <p><b>Vaga</b>: {curriculo.vaga || 'Banco de talentos'}</p>
                        {curriculo.cargo && <p><b>Cargo Pretendido</b>: {curriculo.cargo}</p>}

                        {curriculo.redes_sociais && curriculo.redes_sociais.length > 0 && (
                            <div className="my-1">
                                <b>Redes Sociais</b>:
                                <ul className="inline-flex space-x-4 ml-2">
                                    {curriculo.redes_sociais.map((rede, index) => (
                                        <li key={index}>
                                            <a href={rede.link} target="_blank" rel="noopener noreferrer" className="block bg-primary text-white px-2 py-1 rounded-md hover:bg-opacity-90">
                                                {rede.tipo}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p><b>Apresentação pessoal</b>: {curriculo.apresentacao }</p>
                        <p><b>Participação em projetos</b>: {curriculo.projetos }</p>
                        <p><b>Data</b>: {curriculo.data }</p>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <Link href={route('Manager.Carreiras.index')} className="block relative w-fit rounded-lg border mr-3 border-gray-300 px-3 py-2 cursor-pointer transition-all hover:bg-slate-200">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Voltar
                    </Link>

                    <Link href={route('Manager.Carreiras.baixarCurriculo', {id: curriculo.id})} className="block relative w-fit rounded-lg border mr-3 border-green-700 text-green-700 px-3 py-2 cursor-pointer transition-all hover:bg-green-100">
                        <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
                        Baixar currículo
                    </Link>

                    <button
                        onClick={() => openModal(curriculo.id)}
                        className="flex items-center w-fit rounded-lg border border-red-700 text-red-700 px-3 py-2 cursor-pointer transition-all hover:bg-red-100"
                    >   
                        <FontAwesomeIcon icon={faTrash} className=" mr-2" />
                        Excluir
                    </button>
                </div>

                {isModalOpen && <ConfirmModal icon={faTrash} closeModal={closeModal} type="delete" confirm={route('Manager.Carreiras.excluir', {id: curriculo.id})} />}
            </div>
        </AdminLayout>
    );
};

export default Page;
