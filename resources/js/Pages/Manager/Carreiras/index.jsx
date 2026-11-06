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
import { CurriculosList } from '../../../Components/Manager/CurriculosList';

const Page = () => {
    // Content
    const { pagina, conteudos, idioma, idiomas, vagas, cargos, curriculos, filtros } = usePage().props;

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

    return (
        <AdminLayout>
            <Breadcrumb icon={faUser} items={breadcrumbItems} current="Carreiras" idioma={idioma.codigo} idiomas={idiomas} />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <FormContent content={conteudos[0]} full={true} idioma={idioma.codigo} />

            <FormContent content={conteudos[5]} full={true} idioma={idioma.codigo} />

            <BlockContent content={contentVagas} />

            <CurriculosList curriculos={curriculos} filtros={filtros} vagas={vagas} cargos={cargos} />
        </AdminLayout>
    );
};

export default Page;
