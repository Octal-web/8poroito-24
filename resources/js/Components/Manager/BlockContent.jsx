import React, { useState, useEffect, useRef } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { ReactSortable } from "react-sortablejs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { IndividualContent } from './IndividualContent';
import { IndividualItem } from './IndividualItem';

export const BlockContent = ({ content }) => {
    const [state, setState] = useState(content.conteudos);
    const previousStateRef = useRef(state);
    const [isUpdated, setIsUpdated] = useState(false);

    const { data, setData, post } = useForm({});

    useEffect(() => {
        const previousState = previousStateRef.current;
        if (JSON.stringify(state) !== JSON.stringify(previousState)) {
            const orderedData = state.map((item, index) => ({
                id: item.id,
                ordem: index
            }));

            console.log(orderedData);
            
            setData(prevData => ({ odr: orderedData }));
            setIsUpdated(true);
        }
        previousStateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (isUpdated) {
            post(route('Manager.' + content.controller + '.ordenar'), {
                preserveScroll: true,
            });
            setIsUpdated(false);
        }
    }, [isUpdated]);

    return content.imagens ? (
        <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">{content.nome[0]}</h3>
                <Link href={route('Manager.' + content.controller + '.adicionar')} className="flex items-center border border-stroke bg-white px-3 py-2 rounded-md transition-all hover:bg-slate-100 ml-2">
                    <FontAwesomeIcon icon={faPlus} className="text-slate-700 mr-2" />
                    {`Adicionar ${content.nome[1]}`}
                </Link>
            </div>

            <div className="mt-10">
                {content.editavel ? (
                    <ReactSortable
                        animation={150}
                        list={state}
                        forceFallback={true}
                        setList={setState}
                        filter=".sort-ignore"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8"
                    >
                        {state.map((conteudo, index) => (
                            <div key={index} className="relative rounded-md border border-stroke p-4 shadow-sm select-none before:content-[''] before:absolute before:top-0 before:left-0 before:bg-primary before:w-full before:h-1 before:rounded-t-md">
                                <IndividualContent 
                                    individualContent={conteudo}
                                    imagensPath={content.imagensPath}
                                    imagensClass={content.imgClass}
                                    controller={content.controller}
                                    index={index}
                                />
                            </div>
                        ))}
                    </ReactSortable>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                        {content.conteudos.map((conteudo, index) => (
                            <div key={index} className="relative rounded-md border border-stroke p-4 shadow-sm before:content-[''] before:absolute before:top-0 before:left-0 before:bg-primary before:w-full before:h-1 before:rounded-t-md">
                                <IndividualContent 
                                    key={index}
                                    individualContent={conteudo}
                                    imagensPath={content.imagensPath}
                                    imagensClass={content.imgClass}
                                    controller={content.controller}
                                    index={index}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">{content.nome[0]}</h3>
                {content.editavel && <Link href={route('Manager.' + content.controller + '.adicionar')} className="flex items-center border border-stroke bg-white px-3 py-2 rounded-md transition-all hover:bg-slate-100 ml-2">
                    <FontAwesomeIcon icon={faPlus} className="text-slate-700 mr-2" />
                    {`Adicionar ${content.nome[1]}`}
                </Link> }
            </div>

            <div className="mt-10">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-4 w-1/6 text-left">#</th>
                            <th className="border px-4 py-4 text-left">Valor</th>
                            <th className="border px-4 py-4 w-1/6 text-left">{content.editavel ? 'Visível' : 'Data' }</th>
                            <th className="border px-4 py-4 w-1/6 text-left">Ações</th>
                        </tr>
                    </thead>
                    {content.editavel ? (
                        <ReactSortable
                            tag="tbody"
                            animation={150}
                            list={state}
                            setList={setState}
                            forceFallback={true}
                        >
                            {state.map((conteudo, index) => (
                                <IndividualItem
                                    key={conteudo.id}
                                    individualContent={conteudo}
                                    imagensPath={content.imagensPath}
                                    imagensClass={content.imgClass}
                                    controller={content.controller}
                                    index={index}
                                    edit={content.editavel}
                                />
                            ))}
                        </ReactSortable>
                    ) : (
                        <tbody>
                            {state.map((conteudo, index) => (
                                <IndividualItem 
                                    key={index}
                                    individualContent={conteudo}
                                    imagensPath={content.imagensPath}
                                    imagensClass={content.imgClass}
                                    controller={content.controller}
                                    index={index}
                                    edit={content.editavel}
                                />
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};