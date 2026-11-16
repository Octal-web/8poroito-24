import React from 'react';
import { Link } from '@inertiajs/react';

export const tiposVaga = {
    presencial: 'Presencial',
    remoto: 'Remoto',
};

export function CareerJobsSection({ vagas }) {
    return (
        <div className="mb-20 xl:mb-30">
            <h2 className="text-3xl md:text-4xl xl:text-5xl text-balance text-center font-bold mb-12 xl:mb-20">Vagas abertas</h2>

            <ul className="border-t border-primary">
                {vagas.map((vaga) => (
                    <li key={vaga.id} className="border-b border-primary">
                        <Link
                            href={route('Carreiras.vaga', { id: vaga.id, slug: vaga.slug })}
                            className="group flex flex-col gap-3 px-4 py-6 transition-colors sm:flex-row sm:items-center sm:gap-8 sm:px-8 xl:py-8 hover:bg-primary hover:text-white"
                        >
                            <h3 className="flex-1 text-2xl xl:text-3xl font-bold">{vaga.titulo}</h3>
                            <span className="w-fit border border-current px-4 py-1 text-xs uppercase tracking-widest">{tiposVaga[vaga.tipo] ?? vaga.tipo}</span>
                            <span className="flex items-center gap-3 text-sm font-light uppercase">
                                Ver vaga
                                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-20 xl:mt-30 text-center">
                <p className="text-3xl md:text-4xl xl:text-5xl font-bold text-balance mb-4">Não encontrou o que procura?</p>
                <p className="xl:text-xl font-light">Inscreva-se no nosso banco de talentos.</p>
            </div>
        </div>
    );
}
