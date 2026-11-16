import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';

import DatePicker, { DateObject } from "react-multi-date-picker";
import gregorian_pt_br from "react-date-object/locales/gregorian_pt_br";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

import AdminLayout from '../../../Layouts/AdminLayout';
import { Breadcrumb } from '../../../Components/Manager/Breadcrumb';
import { AgeChart } from '../../../Components/Manager/Charts/AgeChart';
import { CitiesChart } from '../../../Components/Manager/Charts/CitiesChart';
import { GenderChart } from '../../../Components/Manager/Charts/GenderChart';

const Page = () => {
    const { pagina, conteudos, idioma } = usePage().props;

    const [dates, setDates] = useState([
        new DateObject().subtract(1, "months"),
        new DateObject()
    ]);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleApply = () => {
        setLoading(true);
        const startDate = dates[0].format('YYYY-MM-DD');
        const endDate = dates[1].format('YYYY-MM-DD');

        axios.get(route('Manager.Dashboard.obterData'), {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        })
        .then(response => {
            setData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            setError(error);
            console.error('Erro na requisição:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleDateChange = (newDates) => {
        setDates(newDates);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleApply();
        }, 100);
    }, []);

    const breadcrumbItems = [
        { label: 'Home', link: 'Home.index' },
    ];

    return (
        <AdminLayout>
            <Breadcrumb icon={faChartLine} items={breadcrumbItems} current="Dashboard" idioma={idioma.codigo} />

            <div className="flex flex-row gap-6 justify-end items-center mb-10">
                <label className="text-gray-700 font-semibold">Período:</label>
                <div className="flex items-center gap-4">
                    <DatePicker
                        locale={gregorian_pt_br}
                        value={dates}
                        onChange={handleDateChange}
                        numberOfMonths={2}
                        range
                        inputClass="border border-gray-300 p-2 rounded-lg w-full"
                    />
                    <button
                        onClick={handleApply}
                        className="bg-primary text-white px-4 py-2 rounded-md"
                    >
                        Aplicar
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black">Impressões e Cliques por idade</h3>
                    </div>

                    <div className="mt-10">
                        {data && !loading ?
                            <AgeChart data={data.age} />
                        :
                            <div className="mx-auto my-20 w-fit" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>
                </div>

                <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black">Impressões e Cliques por cidade</h3>
                    </div>

                    <div className="mt-10">
                        {data && !loading ?
                            <CitiesChart data={data.cities} />
                        :
                            <div className="mx-auto my-20 w-fit" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="mb-6 rounded-sm border border-stroke bg-white px-5 py-5 shadow-md">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-black">Acessos por gênero</h3>
                    </div>

                    <div className="mt-10">
                        {data && !loading ?
                            <GenderChart data={data.gender} />
                        :
                            <div className="mx-auto my-20 w-fit" role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>
                </div>

               
            </div>
        </AdminLayout>
    );
};

export default Page;
