import { useCallback } from "react";
import { usePage } from "@inertiajs/react";

const translations = {
    pt: {
        marca: "8poroito",
        503: "Desculpe, estamos em manutenção. Volte em breve.",
        500: "Ops, algo deu errado em nossos servidores.",
        404: (url) =>
            `Desculpe, a página que você está procurando "<strong>${url}</strong>" não foi encontrada.`,
        403: (url) =>
            `Você não tem permissão para acessar esta página: <strong>${url}</strong>.`,
        back: "Voltar",
    },
    en: {
        marca: "8poroito",
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Oops, something went wrong on our servers.",
        404: (url) =>
            `Sorry, the page you are looking for "<strong>${url}</strong>" could not be found.`,
        403: (url) =>
            `Sorry, you are forbidden from accessing this page: <strong>${url}</strong>.`,
        back: "Back",
    },
    es: {
        marca: "8poroito",
        503: "Lo sentimos, estamos realizando tareas de mantenimiento. Por favor, vuelve a visitarnos pronto.",
        500: "Oops, algo ha fallado en nuestros servidores.",
        404: (url) =>
            `Lo sentimos, la página que buscas "<strong>${url}</strong>" no se pudo encontrar.`,
        403: (url) =>
            `Lo sentimos, tienes prohibido acceder a esta página: <strong>${url}</strong>.`,
        back: "De vuelta",
    },
};

export function useLang() {
    const { language, idioma } = usePage().props;
    const selected = language ?? idioma;
    const code = typeof selected === "string" ? selected : selected?.codigo;
    const locale = code?.toLowerCase().split(/[-_]/)[0] || "pt";
    const dictionary = translations[locale] || translations.pt;

    return useCallback(
        (key, ...args) => {
            const translation =
                dictionary[String(key)] ?? translations.pt[String(key)] ?? key;
            return typeof translation === "function"
                ? translation(...args)
                : translation;
        },
        [dictionary],
    );
}
