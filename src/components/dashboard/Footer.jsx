import {
    FiFacebook,
    FiInstagram,
    FiLinkedin,
    FiTwitter,
} from "react-icons/fi";

function Footer() {
    return (
        <footer className="mt-8 border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

                {/* Logo / Hospital Name */}

                <div>
                    <h3 className="text-base font-bold text-slate-800">
                        MediCare Hospital
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        Modern healthcare management made simple.
                    </p>
                </div>

                {/* Quick Links */}

                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                    <button
                        type="button"
                        className="transition hover:text-blue-600"
                    >
                        Privacy Policy
                    </button>

                    <button
                        type="button"
                        className="transition hover:text-blue-600"
                    >
                        Terms & Conditions
                    </button>

                    <button
                        type="button"
                        className="transition hover:text-blue-600"
                    >
                        Help & Support
                    </button>
                </div>

                {/* Social Icons */}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Facebook"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FiFacebook size={16} />
                    </button>

                    <button
                        type="button"
                        aria-label="Twitter"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FiTwitter size={16} />
                    </button>

                    <button
                        type="button"
                        aria-label="Instagram"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FiInstagram size={16} />
                    </button>

                    <button
                        type="button"
                        aria-label="LinkedIn"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                        <FiLinkedin size={16} />
                    </button>
                </div>
            </div>

            {/* Copyright */}

            <div className="border-t border-slate-100">
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 text-center text-xs text-slate-400 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
                    <p>
                        © 2026 MediCare Hospital. All rights reserved.
                    </p>

                    <p>
                        Hospital Management Dashboard
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;