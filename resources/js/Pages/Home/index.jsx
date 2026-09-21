import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { HomeHeroSection } from '../../Components/Sections/HomeHeroSection';
import { HomeQuoteSection } from '../../Components/Sections/HomeQuoteSection';
import { HomeVideoSection } from '../../Components/Sections/HomeVideoSection';
import { HomeProjectsSection } from '../../Components/Sections/HomeProjectsSection';
import { HomeClientsSection } from '../../Components/Sections/HomeClientsSection';
import { HomeMarqueeSection } from '../../Components/Sections/HomeMarqueeSection';
import { HomePortfolioSection } from '../../Components/Sections/HomePortfolioSection';

const Page = () => {
    const { conteudos, destaques, clientes, portfolios } = usePage().props;

    return (
        <DefaultLayout>
            <HomeHeroSection />
            <HomeQuoteSection conteudos={conteudos} />
            <HomeVideoSection />
            <HomeProjectsSection destaques={destaques} />
            <HomeClientsSection clientes={clientes} />
            <HomeMarqueeSection />
            <HomePortfolioSection conteudos={conteudos} portfolios={portfolios} />
        </DefaultLayout>
    );
};

export default Page;
