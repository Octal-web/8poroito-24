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
    const { pagina, conteudos, idioma, idiomas, contatos, propostas } = usePage().props;

    const breadcrumbItems = [
        // { label: 'Home', link: 'Home.index' },
        // { label: 'Projects', link: 'Home.index' },
    ];

    const contentContatos = {
        nome: ['Contatos', 'contato'],
        controller: 'Contato',
        imagens: false,
        editavel: false,
        conteudos: contatos
    };

    const contentPropostas = {
        nome: ['Propostas', 'proposta'],
        controller: 'Contato',
        imagens: false,
        editavel: false,
        conteudos: propostas
    };

    return (
        <AdminLayout>
            <Breadcrumb icon={faUser} items={breadcrumbItems} current="Contato" idioma={idioma.codigo} idiomas={idiomas} />
            <PageSettings page={pagina} idioma={idioma.codigo} />

            <BlockContent content={contentContatos} />
            <BlockContent content={contentPropostas} />
        </AdminLayout>
    );
};

export default Page;
