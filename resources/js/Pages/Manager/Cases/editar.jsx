import React from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faImage, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { FormGroup } from '../../../Components/Manager/Inputs/FormGroup';

const Page = () => {
    const { idioma, idiomas, caseCliente } = usePage().props;

    const { data, setData, post, processing, errors } = useForm(caseCliente);

    const breadcrumbItems = [
        { label: 'Cases', link: 'Manager.Cases.index' },
    ];
    
    const inputItems = [
        [
            { titulo: 'Título', name: 'titulo', tamanho: 'col-span-12 sm:col-span-10 md:col-span-6', tipo: 'texto', max: 120 },
            { titulo: 'Ano', name: 'ano', tamanho: 'col-span-12 sm:col-span-10 md:col-span-4 lg:col-span-2', tipo: 'numero', min: 1000, max: 9999 },
            { titulo: 'Destaque?', name: 'destaque', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-2', tipo: 'check'}
        ],
        [
            { titulo: 'Campanha', name: 'campanha', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto', max: 255 },
        ],
        [
            { titulo: 'Imagem', name: 'img', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-5', tipo: 'imagem', crop: true, largura: 590, altura: 500, caminho: '/content/cases/thumbs/', imagem: caseCliente.imagem },
            { titulo: 'Imagem Grid', name: 'img_grid', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-5', tipo: 'imagem', crop: true, largura: 1000, altura: 570, caminho: '/content/cases/grid/', imagem: caseCliente.imagem_grid }
        ],
        [{ titulo: 'Banner', name: 'img_banner', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-12', tipo: 'imagem', crop: true, largura: 2000, altura: 521, caminho: '/content/cases/banner/', imagem: caseCliente.banner }],
        [{ titulo: 'Serviço', name: 'servico', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto_longo', editor: false, max: 150 }],
        [{ titulo: 'Contexto', name: 'contexto', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto_longo', 'editor': true, 'toolbar': ['Bold', 'Italic'], max: 220 }],
        [{ titulo: 'Título página', name: 'titulo_pagina', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto', max: 150 }],
        [{ titulo: 'Descrição página', name: 'descricao_pagina', tamanho: 'col-span-12 sm:col-span-10 md:col-span-8', tipo: 'texto_longo', 'editor': false, max: 220 }]
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const idioma_url = new URLSearchParams(window.location.search).get('lang');

        post(route('Manager.Cases.atualizar', {id: caseCliente.id, lang: idioma_url}), {
            preserveScroll: true,
        });
        console.log(data);

        console.log(errors);
    };

    const onChange = (name, value) => {
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageCrop = (croppedImage, fileExtenstion, name) => {
        setData(prevData => ({
            ...prevData,
            [name]: croppedImage
        }));
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faImages} items={breadcrumbItems} current="Editar" idioma={idioma.codigo} idiomas={idiomas} id={caseCliente.id} />

            <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">

                <Link
                    href={route('Manager.Cases.Imagens.index', {id: caseCliente.id})}
                    className="flex items-center border border-stroke bg-white px-3 py-2 float-right rounded-md transition-all hover:bg-slate-100 ml-2"
                >   
                    <FontAwesomeIcon icon={faImage} className="text-slate-700 mr-2" />
                    Imagens
                </Link>

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
                                            handleImageCrop={handleImageCrop}
                                        />
                                        {errors[input.name] && <p className="text-sm text-red-500 -mt-3 mb-3">{errors[input.name]}</p>}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className="flex items-center justify-end">
                            <Link href={route('Manager.Home.index')} className="flex items-center w-fit rounded-lg border border-red-700 text-red-700 px-3 py-2 mr-3 cursor-pointer transition-all hover:bg-red-100">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                                Voltar
                            </Link>

                            <button
                                type="submit"
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
