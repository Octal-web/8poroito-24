import React, { useState, useEffect, useRef } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import { ReactSortable } from "react-sortablejs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faSave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../../Components/Manager/Breadcrumb';
import { MediaUploader } from '../../../../Components/Manager/MediaUploader';
import { IndividualImage } from '../../../../Components/Manager/IndividualImage';
import { CaseImageSize } from '../../../../Components/Manager/CaseImageSize';

const Page = () => {
    // Content
    const { idioma, caseCliente } = usePage().props;

    const [state, setState] = useState(caseCliente.imagens_cases);
    const previousStateRef = useRef(state);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isReadyToUpload, setIsReadyToUpload] = useState(false);

    const { data, setData, post, errors } = useForm({
        images: []
    });

    const handleImageUpload = (processedImages) => {
        const imagesData = processedImages.map(({ original, poster }) => (
            poster ? { img: original, poster } : { img: original }
        ));

        setData('images', imagesData);
        setIsReadyToUpload(true);
    };

    useEffect(() => {
        if (isReadyToUpload && data.images.length > 0) {
            post(route('Manager.Cases.Imagens.novo', { id: caseCliente.id }), {
                preserveScroll: true,
                preserveState: false,
            });
            setIsReadyToUpload(false);
        }
    }, [isReadyToUpload, data.images]);

    useEffect(() => {
        const previousState = previousStateRef.current;
        if (JSON.stringify(state) !== JSON.stringify(previousState)) {
            const orderedData = state.map((item, index) => ({
                id: item.id,
                ordem: index
            }));

            
            setData(prevData => ({ odr: orderedData }));
            setIsUpdated(true);
        }
        previousStateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (isUpdated) {
            post(route('Manager.Cases.Imagens.ordenar', {id: caseCliente.id}), {
                preserveScroll: true,
            });
            setIsUpdated(false);
        }
    }, [isUpdated]);

    const breadcrumbItems = [
        { label: 'Cases', link: 'Manager.Cases.index' },
        { label: caseCliente.cases_clientes_idiomas[0].titulo, link: 'Manager.Cases.editar', params: { id: caseCliente.id } }
    ];

    return (
        <AdminLayout>
            <Breadcrumb icon={faImages} items={breadcrumbItems} current="Galeria" idioma={idioma.codigo} />

            <div className="rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-4">
                        <ReactSortable
                            animation={150}
                            list={state}
                            forceFallback={true}
                            setList={setState}
                            filter=".sort-ignore"
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                        >
                            {state.map((image, index) => (
                                <div key={index} className="relative h-full pb-12">
                                    <IndividualImage key={index} imagensPath="/content/cases/images/" individualContent={image} controller="Cases.Imagens" />
                                    <div className="absolute w-full z-[10] bottom-1.5">
                                        <CaseImageSize imageId={image.id} currentSize={image.tamanho} />
                                    </div>
                                </div>

                            ))}
                        </ReactSortable>
                    </div>

                    <div className="lg:col-span-1 min-h-[calc(100vh-13rem)]">
                        <MediaUploader onUpload={handleImageUpload} />
                        {Object.keys(errors).length > 0 && (
                            <ul className="mt-3 text-sm text-red-500">
                                {[...new Set(Object.values(errors))].map((error) => <li key={error}>{error}</li>)}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;