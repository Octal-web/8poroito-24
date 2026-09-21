import React from 'react';
import { usePage } from '@inertiajs/react'

import DefaultLayout from '../../Layouts/DefaultLayout';

const Page = () => {
    // Contents
    const { conteudos } = usePage().props;

    return (
        <DefaultLayout>
            <section className="mt-20 sm:mt-30 mb-20">
                <div className="container max-w-small">
                    <h4 className="text-5xl text-center font-bold mb-5">{conteudos[0].titulo}</h4>
                </div>
            </section>

            <section class="mb-30">
                <div className="container max-w-large">
                    <div className="text-justify" dangerouslySetInnerHTML={{ __html: conteudos[0].texto }}>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
};

export default Page;