import React, { useEffect, useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faArrowDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { ConfirmModal } from './ConfirmModal';

const iconButtonClass = "h-5 w-5 relative z-[1] before:content-[''] before:absolute before:-top-[8px] before:-left-[10px] before:w-9 before:h-9 before:bg-slate-200 before:rounded-full before:-mt-[-2px] before:-z-[1] before:transition-all before:transform before:scale-0 hover:before:scale-100";
const fieldClass = 'h-10 rounded-md border border-stroke bg-white px-3 text-sm focus:border-primary focus:ring-primary';

const vazio = { busca: '', vaga: '', cargo: '' };

export const CurriculosList = ({ curriculos, filtros, vagas, cargos }) => {
    const [form, setForm] = useState({ ...vazio, ...filtros });
    const [excluirId, setExcluirId] = useState(null);
    const primeiraRenderizacao = useRef(true);

    const temFiltro = Object.values(form).some(valor => valor !== '');

    // Debounce para a busca não disparar uma requisição a cada tecla
    useEffect(() => {
        if (primeiraRenderizacao.current) {
            primeiraRenderizacao.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            const params = Object.fromEntries(Object.entries(form).filter(([, valor]) => valor !== ''));

            router.get(route('Manager.Carreiras.index'), params, {
                only: ['curriculos', 'filtros'],
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 350);

        return () => clearTimeout(timeout);
    }, [form]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const { data, links, from, to, total } = curriculos;

    return (
        <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-bold text-black">Currículos</h3>
                <span className="text-sm text-slate-500">{total} {total === 1 ? 'currículo' : 'currículos'}</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[14rem]">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                        type="search"
                        name="busca"
                        value={form.busca}
                        onChange={handleChange}
                        placeholder="Buscar por nome ou e-mail"
                        className={`${fieldClass} w-full pl-9`}
                    />
                </div>

                <select name="vaga" value={form.vaga} onChange={handleChange} className={`${fieldClass} pr-8`} aria-label="Filtrar por vaga">
                    <option value="">Todas as vagas</option>
                    <option value="banco">Banco de talentos</option>
                    {vagas.map(vaga => (
                        <option key={vaga.id} value={String(vaga.id)}>{vaga.titulo}</option>
                    ))}
                </select>

                <select name="cargo" value={form.cargo} onChange={handleChange} className={`${fieldClass} pr-8`} aria-label="Filtrar por cargo">
                    <option value="">Todos os cargos</option>
                    {cargos.map(cargo => (
                        <option key={cargo.id} value={String(cargo.id)}>{cargo.nome}</option>
                    ))}
                </select>

                {temFiltro && (
                    <button type="button" onClick={() => setForm(vazio)} className="flex items-center h-10 px-3 rounded-md border border-stroke text-sm transition-all hover:bg-slate-100">
                        <FontAwesomeIcon icon={faXmark} className="mr-2" />
                        Limpar
                    </button>
                )}
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-4 text-left">Nome</th>
                            <th className="border px-4 py-4 text-left">Vaga</th>
                            <th className="border px-4 py-4 text-left">Cargo</th>
                            <th className="border px-4 py-4 text-left whitespace-nowrap">Data</th>
                            <th className="border px-4 py-4 text-left">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="border px-4 py-8 text-center text-slate-500">
                                    {temFiltro ? 'Nenhum currículo encontrado com esses filtros.' : 'Nenhum currículo recebido ainda.'}
                                </td>
                            </tr>
                        ) : data.map(curriculo => (
                            <tr key={curriculo.id} className="bg-slate-50">
                                <td className="border px-4 py-4">
                                    <p className="font-medium text-black">{curriculo.nome}</p>
                                    <p className="text-sm text-slate-500">{curriculo.email}</p>
                                </td>
                                <td className="border px-4 py-4">
                                    {curriculo.vaga
                                        ? curriculo.vaga
                                        : <span className="inline-block rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-700">Banco de talentos</span>}
                                </td>
                                <td className="border px-4 py-4">{curriculo.cargo || <span className="text-slate-400">—</span>}</td>
                                <td className="border px-4 py-4 whitespace-nowrap">{curriculo.data}</td>
                                <td className="border px-4 py-2 whitespace-nowrap">
                                    <Link href={route('Manager.Carreiras.visualizar', { id: curriculo.id })} className={`${iconButtonClass} mr-4`} title="Visualizar">
                                        <FontAwesomeIcon icon={faEye} className="text-slate-700" />
                                    </Link>
                                    <a href={route('Manager.Carreiras.baixarCurriculo', { id: curriculo.id })} className={`${iconButtonClass} mr-4`} title="Baixar currículo">
                                        <FontAwesomeIcon icon={faArrowDown} className="text-green-700" />
                                    </a>
                                    <button type="button" className={iconButtonClass} onClick={() => setExcluirId(curriculo.id)} title="Excluir">
                                        <FontAwesomeIcon icon={faTrash} className="text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {total > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">Mostrando {from}–{to} de {total}</span>

                    {links.length > 3 && (
                        <nav className="flex flex-wrap gap-1" aria-label="Paginação">
                            {links.map((link, index) => {
                                const label = index === 0 ? '‹' : index === links.length - 1 ? '›' : link.label;
                                const base = 'min-w-[2.5rem] h-10 px-3 flex items-center justify-center rounded-md border text-sm';

                                if (!link.url) {
                                    return <span key={index} className={`${base} border-stroke text-slate-300`}>{label}</span>;
                                }

                                return (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        only={['curriculos', 'filtros']}
                                        preserveState
                                        preserveScroll
                                        className={`${base} transition-all ${link.active ? 'border-primary bg-primary text-white' : 'border-stroke hover:bg-slate-100'}`}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}
                </div>
            )}

            {excluirId && (
                <ConfirmModal
                    icon={faTrash}
                    closeModal={() => setExcluirId(null)}
                    type="delete"
                    confirm={route('Manager.Carreiras.excluir', { id: excluirId })}
                />
            )}
        </div>
    );
};
