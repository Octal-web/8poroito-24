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
    const { pagina, conteudos, idioma, idiomas, vagas, curriculos } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentVagas = {
        nome: ['Vagas', 'vaga'],
        controller: 'Vagas',
        imagens: false,
        editavel: true,
        conteudos: vagas
    };

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

            <FormContent content={conteudos[0]} full={true} idioma={idioma.codigo} />

            <FormContent content={conteudos[5]} full={true} idioma={idioma.codigo} />

            <BlockContent content={contentVagas} />

            <BlockContent content={contentCurriculos} />
        </AdminLayout>
    );
};

export default Page;
