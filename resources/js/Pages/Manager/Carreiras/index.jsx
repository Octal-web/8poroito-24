import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { ConfirmModal } from '../../../Components/Manager/ConfirmModal';
import { PageSettings } from '../../../Components/Manager/PageSettings';
import { FormContent } from '../../../Components/Manager/FormContent';
import { BlockContent } from '../../../Components/Manager/BlockContent';

const Page = () => {
    // Content
    const { pagina, conteudos, idioma, idiomas, curriculos } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentCurriculos = {
        nome: ['Currículos', 'currículo'],
        controller: 'Carreiras',
        imagens: false,
        editavel: false,
        conteudos: curriculos
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faUser} items={breadcrumbItems} current="Carreiras" idioma={idioma.codigo} idiomas={idiomas} />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormContent content={conteudos[0]} full={false} idioma={idioma.codigo} />
                <FormContent content={conteudos[1]} full={false} idioma={idioma.codigo} />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <FormContent content={conteudos[2]} full={false} idioma={idioma.codigo} />
                <FormContent content={conteudos[3]} full={false} idioma={idioma.codigo} />
                <FormContent content={conteudos[4]} full={false} idioma={idioma.codigo} />
            </div>

            <FormContent content={conteudos[5]} full={true} idioma={idioma.codigo} />

            <BlockContent content={contentCurriculos} />
        </AdminLayout>
    );
};

export default Page;
