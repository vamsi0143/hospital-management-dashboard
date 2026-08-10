import { FaHospital } from "react-icons/fa";

function Logo({
    title = "MediCare",
    subtitle = "Hospital Management",
}) {
    return (
        <div className="mb-8 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <FaHospital size={28} />
            </div>

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    {title}
                </h1>

                <p className="text-sm text-slate-500">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

export default Logo;