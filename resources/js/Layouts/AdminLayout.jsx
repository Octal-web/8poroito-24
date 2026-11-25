import React, { useState, useEffect } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBars, faTimes, faInfoCircle, faImages, faUser, faFileText, faChartLine, faPowerOff, faSignOut } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../Components/Manager/MenuItem';
import { ConfirmModal } from '../Components/Manager/ConfirmModal';
import { NotificationMessage } from '../Components/Manager/NotificationMessage';

const menus = [
    { id: 1, label: 'Home', icon: faHome, href: route('Manager.Home.index'), controllers: ['Home']},
    { id: 2, label: 'Sobre Nós', icon: faInfoCircle, href: route('Manager.Institucional.index'), controllers: ['Institucional']},
    { id: 3, label: 'Cases', icon: faImages, href: route('Manager.Cases.index'), controllers: ['Cases', 'ImagensCases']},
    { id: 4, label: 'Contato', icon: faUser, controllers: ['Contato', 'Carreiras'], subMenu: [
        { label: 'Fale Conosco', href: route('Manager.Contato.index') },
        { label: 'Trabalhe Conosco', href: route('Manager.Carreiras.index') },
        { label: 'Solicitar Proposta', href: route('Manager.Contato.index') + '#propostas' }
    ]},
    { id: 5, label: 'Política de Privacidade', icon: faFileText, href: route('Manager.Politicas.privacidade'), controllers: ['Politicas']},
    { id: 6, label: 'Dashboard', icon: faChartLine, href: route('Manager.Dashboard.index'), controllers: ['Dashboard']},
];

const AdminLayout = ({ children }) => {
    // Content
    const { controller, action, message } = usePage().props;

    const [openMenuId, setOpenMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((isOpen) => !isOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const activeMenu = menus.find(menu => menu.controllers.includes(controller));
        if (activeMenu) {
            setOpenMenuId(activeMenu.id);
        }
    }, [controller]);

    useEffect(() => {
        if (message) {
            const newNotification = { id: Date.now(), ...message };
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

            const timer = setTimeout(() => {
                setNotifications((prevNotifications) =>
                    prevNotifications.filter((notification) => notification.id !== newNotification.id)
                );
            }, 5300);

            return () => clearTimeout(timer);
        }
    }, [message]);


    return (
        <>
            <Head title="8poroito | Manager" />
            <header></header>
            <div className="flex bg-slate-50">
                <div className="fixed top-0 left-0 w-full bg-primary z-50 px-4 py-3 flex justify-between items-center md:hidden">
                    <Link href={route('Manager.Home.index')} aria-label="Home">
                        <div className="w-44 h-10 bg-no-repeat bg-center bg-contain" style={{ backgroundImage: 'url(/admin/img/logo.png)' }}></div>
                    </Link>
                    <button onClick={toggleMobileMenu} aria-controls="sidebar" aria-expanded={isMobileMenuOpen} aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'} className="text-white p-2">
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-xl" />
                    </button>
                </div>

                <aside id="sidebar" className={`group menu-aside fixed left-0 top-0 z-40 flex h-full md:h-[calc(100vh-7rem)] w-full md:w-16 md:hover:w-64 rounded-xl flex-col overflow-hidden bg-primary duration-200 ease-linear md:translate-x-0 pt-16 md:pt-0 md:mx-10 md:my-14 shadow-lg ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full invisible md:visible'}`}>
                    <div className="w-64 flex flex-col h-full">
                        <div className="flex items-center justify-between gap-2 px-4">
                            <Link href={route('Manager.Home.index')} className="mt-6">
                                <div className="company-logo w-8 h-10 bg-no-repeat bg-center bg-contain transition-all">
                                </div>
                            </Link>

                            <button onClick={toggleMobileMenu} aria-controls="sidebar" aria-expanded={isMobileMenuOpen} aria-label="Fechar menu" className="block md:hidden text-white">
                                <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill=""></path>
                                </svg>
                            </button>
                        </div>

                        <div className="no-scrollbar flex flex-col overflow-y-auto min-h-0 pb-16 duration-300 ease-linear">
                            <nav className="md:mt-6" onClick={(event) => {
                                if (event.target.closest('a')) setIsMobileMenuOpen(false);
                            }}>
                                <div>
                                    <ul className="mb-6">
                                        {menus.map((menu) => (
                                            <MenuItem
                                                key={menu.id}
                                                id={menu.id}
                                                label={menu.label}
                                                icon={menu.icon}
                                                href={menu.href}
                                                subMenu={menu.subMenu}
                                                isOpen={openMenuId === menu.id}
                                                onToggle={toggleMenu}
                                                controller={controller}
                                                controllers={menu.controllers}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </nav>

                            <div className="absolute bottom-0 left-0">
                                <button className="text-sm ml-3 mb-3 p-3" onClick={openModal}>
                                    <FontAwesomeIcon icon={faPowerOff} className="text-lg text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="md:ml-30 py-3 w-full min-h-screen">
                    <div className="mx-auto max-w-screen-2xl p-4 max-md:mt-16 -mb-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </div>
            </div>
            
            {isModalOpen && <ConfirmModal icon={faSignOut} closeModal={closeModal} type="logOut" confirm={route('Manager.Usuarios.logout')} />}


            {notifications.map((notification) => (
                <NotificationMessage
                    key={notification.id}
                    type={notification.type}
                    message={notification.msg}
                    show={true}
                    onClose={() =>
                        setNotifications((prevNotifications) =>
                            prevNotifications.filter((n) => n.id !== notification.id)
                        )
                    }
                />
            ))}
        </>
    );
};

export default AdminLayout;
