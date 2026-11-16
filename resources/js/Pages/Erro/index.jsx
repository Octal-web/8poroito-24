import {
    MouseGradientProvider,
    useMouseGradient,
} from "@/Contexts/MouseGradientContext";
import { useLang } from "@/Hooks/useLang";
import { Head, Link } from "@inertiajs/react";

const Page = ({ status }) => {
    const lang = useLang();
    const careersGradientPosition = useMouseGradient({ duration: 2 });

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
            <MouseGradientProvider>
                <main className="min-h-screen flex items-center justify-center container max-w-large">
                    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#808080e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-30 blur-[100px]"></div>
                    </div>
                    <div className="text-center">
                        <img
                            src={`/site/img/logo.png`}
                            alt="Logo"
                            className="mx-auto block max-xl:max-w-20 max-w-[20%] mb-10 invert"
                        />
                        <h1 className="text-9xl md:text-[300px] font-bold">
                            {status}
                        </h1>

                        <p
                            className="text-base md:text-xl mb-20 text-custom-gray"
                            dangerouslySetInnerHTML={{
                                __html: lang(status, pathname),
                            }}
                        />

                        <Link
                            href={route(handleRedirect())}
                            className="button relative flex min-h-[3.5rem] w-full max-w-[16rem] items-center justify-center overflow-hidden border border-white/60 px-4 py-3 text-center text-sm font-light uppercase hover:border-white !bg-black text-white mx-auto"
                            style={{
                                background: `radial-gradient(circle at ${careersGradientPosition.x}% ${careersGradientPosition.y}%, rgba(255, 255, 255, 0.3), transparent)`,
                            }}
                        >
                            {lang("back")}
                        </Link>
                    </div>
                </main>
            </MouseGradientProvider>
        </>
    );
};

export default Page;
