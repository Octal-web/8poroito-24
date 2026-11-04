import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import { InputMask } from '@react-input/mask';

const socialOptions = [
    { id: '1', value: 'linkedin', label: 'Linkedin', image: 'socialLinkedin.png' },
    { id: '2', value: 'facebook', label: 'Facebook', image: 'socialFacebook.png' },
    { id: '3', value: 'instagram', label: 'Instagram', image: 'socialInstagram.png' },
    { id: '4', value: 'youtube', label: 'Youtube', image: 'socialYoutube.png' },
    { id: '5', value: 'pinterest', label: 'Pinterest', image: 'socialPinterest.png' }
]

const jobOptions = [
    { id: '1', value: '1', label: 'Atendimento'},
    { id: '2', value: '2', label: 'Planejamento'},
    { id: '3', value: '3', label: 'Gestor de Tráfego'},
    { id: '4', value: '4', label: 'Redator'},
    { id: '5', value: '5', label: 'Diretor de Arte'}
]

export const CareerForm = () => {
    const [fileName, setFileName] = useState('');
    
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        nome: '',
        email: '',
        whatsapp: '',
        arq: null,
        portfolio: '',
        redesSociais: [{ tipo: socialOptions[0], link: '' }],
        pretensao: '',
        apresentacao: '',
        projetos: '',
        cargo: '',
        politica: false,
        veracidade: false
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const name = file.name.length > 10 ? `${file.name.slice(0, 10)}...` : file.name;
            setFileName(name);
            setData(prevData => ({ ...prevData, arq: file }));
        } else {
            setFileName('');
            setData(prevData => ({ ...prevData, arq: null }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSocialChange = (index, selectedOption) => {
        const newRedesSociais = [...data.redesSociais];
        newRedesSociais[index].tipo = selectedOption.value;
        setData({ ...data, redesSociais: newRedesSociais });
    };

    const handleLinkChange = (index, link) => {
        const newRedesSociais = [...data.redesSociais];
        newRedesSociais[index].link = link;
        setData({ ...data, redesSociais: newRedesSociais });
    };

    const handleJobChange = (selectedOption) => {
        setData(prevData => ({
        ...prevData,
        cargo: selectedOption.value
    }));
        console.log(data.cargo)
    };

    const addSocialField = () => {
        setData(prevData => ({
            ...prevData,
            redesSociais: [...prevData.redesSociais, { tipo: '', link: '' }]
        }));
    };

    const removeSocialField = (index) => {
        const updatedRedesSociais = [...data.redesSociais];
        updatedRedesSociais.splice(index, 1);
        setData({ ...data, redesSociais: updatedRedesSociais });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrors();

        post(route('Carreiras.enviar'), {
            preserveScroll: true,
        });
    };

    return (
        <form method="POST" className="w-full" onSubmit={handleSubmit}>
            <div className="mb-5 2xl:mb-10 flex gap-5 lg:gap-15 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="nome" className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" value={data.nome} onChange={handleChange} placeholder="Digite seu nome" className="w-full h-12 xl:h-14 2xl:h-15 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.nome && <p className="text-red-500 mt-2">{errors.nome}</p>}
                </div>

                <div className="w-full">
                    <label htmlFor="email" className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">E-mail:</label>
                    <input type="text" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Digite seu e-mail" className="w-full h-12 xl:h-14 2xl:h-15 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
                </div>
            </div>

            <div className="mb-5 2xl:mb-10 flex gap-5 lg:gap-15 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="whatsapp" className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">Whatsapp:</label>
                    <InputMask type="text" id="whatsapp" name="whatsapp" mask="(__) _____-____" replacement={{ _: /\d/ }} value={data.whatsapp} onChange={handleChange} placeholder="Digite seu número" className="w-full h-14 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.whatsapp && <p className="text-red-500 mt-2">{errors.whatsapp}</p>}
                </div>

                <div className="w-full">
                    <label htmlFor="portfolio" className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">Currículo/Portfolio:</label>
                    <div className="flex justify-center flex-wrap md:flex-nowrap gap-4 items-center">
                        <label htmlFor="arq" className="relative flex gap-4 items-center justify-center w-full max-w-44 h-12 xl:h-14 2xl:h-15 px-2 py-2 bg-zinc-500 text-white transition-all hover:bg-zinc-700">
                            <img src={`/site/img/resume.png`} alt="" />
                            <span>{fileName || 'Anexar'}</span>
                            <input
                                type="file"
                                name="arq"
                                className="opacity-0 absolute top-0 left-0 w-full h-full"
                                onChange={handleFileChange}
                            />
                        </label>
                        <span>ou</span>
                        <input type="text" id="portfolio" name="portfolio" value={data.portfolio} onChange={handleChange} placeholder="Link" className="w-full h-12 xl:h-14 2xl:h-15 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    </div>
                    {errors.arq && <p className="text-red-500 mt-2">{errors.arq}</p>}
                    {errors.portfolio && <p className={`text-red-500 ${!errors.arq && 'mt-2'}`}>{errors.portfolio}</p>}
                    {errors.portfolio_arq && <p className="text-red-500 mt-2">{errors.portfolio_arq}</p>}
                </div>
            </div>

            <div className="mb-5 flex gap-5 lg:gap-15 flex-col lg:flex-row">
                <div className="w-full relative -mb-5 md:mb-0">
                    <label className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">Redes Sociais:</label>
                    {data.redesSociais.map((field, index) => (
                        <div key={index} className="relative mb-5">
                            <Select
                                value={socialOptions.find(option => option.value === field.tipo)}
                                name={`redeSocial[${index}][tipo]`}
                                options={socialOptions}
                                defaultValue={socialOptions[0]}
                                onChange={selectedOption => handleSocialChange(index, selectedOption)}
                                isSearchable={false}
                                classNamePrefix="react-select__hidden"
                                placeholder="Rede Social"
                                formatOptionLabel={item => (
                                    <div className="flex items-center gap-4">
                                        <img src={`/site/img/${item.image}`} alt={item.label} />
                                        <span>{item.label}</span>
                                    </div>
                                )}
                            />
                          
                            <input
                                type="text"
                                name={`redeSocial[${index}][link]`}
                                placeholder="Link"
                                value={field.link}
                                onChange={e => handleLinkChange(index, e.target.value)}
                                className="absolute top-0 right-0 w-10/12 h-12 xl:h-14 2xl:h-15 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300"
                            />
                          
                            {data.redesSociais.length > 1 ? (
                                <button
                                    type="button"
                                    onClick={() => removeSocialField(index)}
                                    aria-label="Remover rede social"
                                    className="block w-5 h-5 ml-auto border border-primary leading-none pb-1 transition-all hover:bg-primary hover:text-white top-5 right-2 mt-2"
                                >
                                -
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    aria-label="Remover rede social"
                                    className="block w-5 h-5 ml-auto border border-primary leading-none pb-1 transition-all opacity-30 top-5 right-2 mt-2"
                                    disabled
                                >
                                -
                                </button>
                            )}

                            {errors[`redesSociais.${index}.link`] && <p className="absolute text-red-500 -bottom-1">{errors[`redesSociais.${index}.link`]}</p>}
                        </div>

                        
                    ))}

                    <button
                        type="button"
                        onClick={addSocialField}
                        className="block w-5 h-5 ml-auto border border-primary leading-none pb-1 absolute bottom-5 right-7 transition-all hover:bg-primary hover:text-white"
                    >
                    +
                    </button>
                </div>

                <div className="w-full">
                    <label htmlFor="pretensao" className="block 2xl:text-lg font-semibold uppercase mb-2 2xl:mb-3">Qual sua pretensão salarial?</label>
                    <InputMask mask="R$ 0.000,00" replacement={{ 0: /\d/ }} id="pretensao" name="pretensao" value={data.pretensao} onChange={handleChange} placeholder="R$:" className="w-full h-12 xl:h-14 2xl:h-15 px-8 py-2 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300" />
                    {errors.pretensao && <p className="text-red-500 mt-2">{errors.pretensao}</p>}
                </div>
            </div>

            <div className="mb-10 flex gap-5 lg:gap-15 flex-col lg:flex-row">
                <div className="w-full">
                    <label htmlFor="apresentacao" className="block 2xl:text-lg font-semibold uppercase mb-2">Conte um pouco sobre você!</label>
                    <small className="block max-w-96 text-gray-500 mb-3">Suas experiências, habilidades, interesses, hobbies... Queremos conhecer quem está por trás do currículo <br />ou portfólio!</small>
                    <textarea id="apresentacao" name="apresentacao" value={data.apresentacao} onChange={handleChange} placeholder="Escreva aqui..." className="w-full h-40 px-8 py-4 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300"></textarea>
                    {errors.apresentacao && <p className="text-red-500">{errors.apresentacao}</p>}
                </div>

                <div className="w-full">
                    <label htmlFor="projetos" className="block 2xl:text-lg font-semibold uppercase mb-2">Tem algum projeto que merece ser compartilhado?</label>
                    <small className="block max-w-96 text-gray-500 mb-3">Conta pra gente qual foi, como você participou e o que essa experiência trouxe de aprendizado. Somos curiosos e adoramos conhecer boas histórias!</small>
                    <textarea id="projetos" name="projetos" value={data.projetos} onChange={handleChange} placeholder="Escreva aqui..." className="w-full h-40 px-8 py-4 border border-primary focus:ring-primary focus:border-primary placeholder-gray-300"></textarea>
                    {errors.projetos && <p className="text-red-500">{errors.projetos}</p>}
                </div>
            </div>

            <div className="mb-5 2xl:mb-10 flex gap-5 lg:gap-15 flex-col lg:flex-row">
                <div className="w-full">
                    <Select
                        name="cargo"
                        options={jobOptions}
                        isSearchable={false}
                        classNamePrefix="react-select"
                        placeholder="Escolha sua vaga"
                        onChange={handleJobChange}
                        value={jobOptions.find(option => option.value === data.cargo)}
                    />
                    {errors.cargo && <p className="text-red-500 mt-2">{errors.cargo}</p>}
                </div>

                <div className="w-full">
                    <div className="flex items-center mt-2 mb-5 md:mt-0 xl:mb-3 2xl:mb-4">
                        <input type="checkbox" id="politica" name="politica" className="h-5 w-5 text-primary focus:ring-0" checked={data.politica} onChange={handleChange} />
                        <label htmlFor="politica" className="ml-2 block text-sm sm:text-base text-primary">Estou de acordo com a <Link className="underline">Política de Privacidade</Link></label>
                    </div>
                    {errors.politica && <p className="text-red-500 -mt-4 mb-2">{errors.politica}</p>}

                    <div className="flex items-center">
                        <input type="checkbox" id="veracidade" name="veracidade" className="h-5 w-5 text-primary focus:ring-0" checked={data.veracidade} onChange={handleChange} />
                        <label htmlFor="veracidade" className="ml-2 block text-sm sm:text-base text-primary">Sou responsável pela veracidade das informações aqui prestadas</label>
                    </div>
                    {errors.veracidade && <p className="text-red-500 mb-2">{errors.veracidade}</p>}
                </div>
            </div>

            <div className="mt-20 flex gap-6 flex-col lg:flex-row">
                <button
                    type="submit"
                    className={`block w-64 border border-primary border-2 text-center h-16 leading-[4rem] font-light uppercase mx-auto transition-all ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={processing}
                    >
                    Enviar
                </button>
            </div>
        </form>
    );
};
