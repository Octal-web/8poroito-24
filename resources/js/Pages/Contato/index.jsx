import React from 'react';
import { usePage } from '@inertiajs/react';
import DefaultLayout from '../../Layouts/DefaultLayout';
import { ContactSection } from '../../Components/Sections/ContactSection';

const Page = () => {
    const { googleMapsApiKey } = usePage().props;

    return (
        <DefaultLayout>
            <ContactSection googleMapsApiKey={googleMapsApiKey} />
        </DefaultLayout>
    );
};

export default Page;
