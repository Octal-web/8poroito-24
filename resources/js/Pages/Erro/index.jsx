import { useLang } from "@/Hooks/useLang";
import { Head, Link } from "@inertiajs/react";

const Page = ({ status }) => {
    const lang = useLang();
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";


    const handleRedirect = () => {
        const isManager = pathname.startsWith("/manager");

        if (isManager) return "Manager.Home.index";

        return "Home.index";
    };

    return (
        <>
            <Head title={`${status} | ${lang("marca")}`}>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-12 md:py-16 z-[1]">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-40 blur-[100px]"></div>
                </div>
                <div className="w-full max-w-2xl text-center relative">
                    <img
                        src={`/site/img/logo.png`}
                        alt={lang("marca")}
                        className="mx-auto mb-8 block w-40 max-w-full md:mb-10 md:w-52 invert"
                    />

                    <h1 className="font-primary text-[120px] font-normal leading-none text-primary sm:text-[180px] md:text-[240px]">
                        {status}
                    </h1>

                    <p
                        className="mx-auto mb-8 mt-6 max-w-xl break-words font-admin text-sm font-light leading-relaxed text-primary/60 md:mb-10 md:text-base"
                        dangerouslySetInnerHTML={{
                            __html: lang(status, pathname),
                        }}
                    />

                        <Link
                        href={route(handleRedirect())}
                            className="button block w-fit px-6 md:px-12 border border-primary text-center h-16 leading-[4rem] font-light uppercase mx-auto"
                        >
                            {lang("back")}
                        </Link>
                </div>
            </main>
        </>
    );
};

export default Page;
