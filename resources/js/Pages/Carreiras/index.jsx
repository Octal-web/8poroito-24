import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { CareerHeroSection } from '../../Components/Sections/CareerHeroSection';
import { CareerContactSection } from '../../Components/Sections/CareerContactSection';

const Page = () => {
    const { conteudos } = usePage().props;

    return (
        <DefaultLayout>
            <CareerHeroSection conteudos={conteudos} />
            <CareerContactSection />
        </DefaultLayout>
    );
};

export default Page;
