import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { CasesHeroSection } from '../../Components/Sections/CasesHeroSection';
import { CasesGridSection } from '../../Components/Sections/CasesGridSection';
import { CasesProposalSection } from '../../Components/Sections/CasesProposalSection';

const Page = () => {
    const { casesClientes } = usePage().props;

    return (
        <DefaultLayout>
            <CasesHeroSection />
            <CasesGridSection casesClientes={casesClientes} />
            <CasesProposalSection />
        </DefaultLayout>
    );
};

export default Page;
