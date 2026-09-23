import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { ConfirmModal } from '../../../Components/Manager/ConfirmModal';
import { PageSettings } from '../../../Components/Manager/PageSettings';
import { FormContent } from '../../../Components/Manager/FormContent';
import { BlockContent } from '../../../Components/Manager/BlockContent';

const Page = () => {
    // Content
    const { pagina, conteudos, idioma, idiomas, casesClientes } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    console.log(idiomas)

    const contentCases = {
        nome: ['Cases', 'case'],
        controller: 'Cases',
        imagens: true,
        imagensPath: '/content/cases/thumbs/',
        editavel: true,
        conteudos: casesClientes
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faImages} items={breadcrumbItems} current="Cases" idioma={idioma.codigo} idiomas={idiomas} />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <FormContent content={conteudos[0]} full={true} idioma={idioma.codigo} />

            <BlockContent content={contentCases} />
        </AdminLayout>
    );
};

export default Page;
