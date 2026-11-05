import React, { useEffect } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { FormGroup } from '../../../Components/Manager/Inputs/FormGroup';

const Page = () => {
    // Content
    const { idioma } = usePage().props;

    const { data, setData, post, processing, errors } = useForm();

    const breadcrumbItems = [
        { label: 'Carreiras', link: 'Manager.Carreiras.index' },
    ];

    const tiposVaga = [
        { value: 'presencial', label: 'Presencial' },
        { value: 'remoto', label: 'Remoto' },
    ];

    const inputItems = [
        [
            { titulo: 'Título', name: 'titulo', tamanho: 'col-span-12 sm:col-span-10 md:col-span-5', tipo: 'texto', max: 48 },
            { titulo: 'Tipo', name: 'tipo', tamanho: 'col-span-12 sm:col-span-10 md:col-span-4 lg:col-span-3', tipo: 'selecao', opcoes: tiposVaga }
        ],
        [{ titulo: 'Descrição', name: 'descricao', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto_longo', 'editor': true, 'toolbar': ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList'] }]
    ];

    const initializeData = (inputItems) => {
        let initialData = {};
        inputItems.forEach(group => {
            group.forEach(item => {
                initialData[item.name] = item.tipo === 'check' ? false : '';
            });
        });
        return initialData;
    };

    useEffect(() => {
        const initialData = initializeData(inputItems);
        setData(initialData);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('Manager.Vagas.novo'), {
            preserveScroll: true
        });
    };

    const onChange = (name, value) => {
        setData(name, value);
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faBriefcase} items={breadcrumbItems} current="Adicionar vaga" idioma={idioma.codigo} />

            <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                <div className="mt-10">
                    <form onSubmit={handleSubmit}>
                        {inputItems.map((group, groupIndex) => (
                            <div key={groupIndex} className="grid grid-cols-12 gap-x-6">
                                {group.map((input, index) => (
                                    <div key={index} className={`w-full ${input.tamanho}`}>
                                        <FormGroup
                                            input={input}
                                            idioma={idioma}
                                            value={data[input.name]}
                                            onChange={onChange}
                                        />
                                        {errors[input.name] && <p className="text-sm text-red-500 -mt-3 mb-3">{errors[input.name]}</p>}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="flex items-center justify-end">
                            <Link href={route('Manager.Carreiras.index')} className="flex items-center w-fit rounded-lg border border-red-700 text-red-700 px-3 py-2 mr-3 cursor-pointer transition-all hover:bg-red-100">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Voltar
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="block relative w-fit rounded-lg border border-gray-300 px-3 py-2 cursor-pointer transition-all hover:bg-slate-200"
                            >
                                <FontAwesomeIcon icon={faSave} className="text-slate-700 mr-2" />
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
