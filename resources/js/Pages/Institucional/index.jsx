import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { AboutHeroSection } from '../../Components/Sections/AboutHeroSection';
import { AboutTeamSection } from '../../Components/Sections/AboutTeamSection';
import { AboutClientsSection } from '../../Components/Sections/AboutClientsSection';
import { AboutGallerySection } from '../../Components/Sections/AboutGallerySection';

const Page = () => {
    const { conteudos, clientes, imagensGaleria } = usePage().props;

    return (
        <DefaultLayout>
            <AboutHeroSection title={conteudos[0]?.titulo} />
            <AboutTeamSection text={conteudos[0]?.texto} />
            <AboutClientsSection clientes={clientes} />
            <AboutGallerySection imagensGaleria={imagensGaleria} />
        </DefaultLayout>
    );
};

export default Page;
