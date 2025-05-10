import React from "react";
import { hasCookie, setCookie } from "cookies-next";

const CookieConsent = () => {
    const [showConsent, setShowConsent] = React.useState(true);

    React.useEffect(() => {
        
        const user = typeof sessionStorage !== 'undefined' && JSON.parse(sessionStorage.getItem('user')!)
        if (!user) {
            setCookie('next-auth.callback-url', '', {})
            setCookie('next-auth.csrf-token', '', {})
            setCookie('next-auth.session-token', '', {})
        }
        setShowConsent(hasCookie("localConsent"));
    }, []);

    const acceptCookie = () => {
        setShowConsent(true);
        setCookie("localConsent", "true", {});
    };

    if (showConsent) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-slate-700 bg-opacity-70">
            <div className="fixed bottom-0 left-0 right-0 md:flex col items-center justify-between px-4 py-8 bg-gray-100">
                <p className="text-dark text-justify md:mr-16">
                    Ce site Web utilise des cookies pour améliorer l'expérience utilisateur. En utilisant notre site Web, vous consentez à tous les cookies conformément à notre politique en matière de cookies.
                </p>
                <button className="bg-[#C30F66] mt-5 md:mt-0 py-2 px-8 rounded text-white" onClick={() => acceptCookie()}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;