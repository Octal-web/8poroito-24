import React from 'react';
import { CasesList } from '../CasesList';

export function CasesGridSection({ casesClientes }) {
    return (
        <section className="relative">
            <div className="container">
                <div className="custom-grid grid grid-cols-16 gap-2 sm:gap-3">
                    {casesClientes.map((caseCliente, index) => (
                        <CasesList key={index} src={caseCliente.imagem} url={caseCliente.slug} title={caseCliente.titulo} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
