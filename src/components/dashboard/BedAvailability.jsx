
import {
    FiActivity,
    FiArrowRight,
} from "react-icons/fi";

const bedTypes = [
    {
        name: "General Ward",
        total: 80,
        available: 24,
        occupied: 56,
    },
    {
        name: "Private Rooms",
        total: 40,
        available: 12,
        occupied: 28,
    },
    {
        name: "ICU",
        total: 20,
        available: 5,
        occupied: 15,
    },
    {
        name: "Emergency",
        total: 15,
        available: 7,
        occupied: 8,
    },
];

function BedAvailability() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        Bed Availability
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Current hospital bed status
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FiActivity size={20} />
                </div>
            </div>

            <div className="mt-6 space-y-5">
                {bedTypes.map((bed) => {
                    const occupiedPercentage =
                        (bed.occupied / bed.total) * 100;

                    return (
                        <div key={bed.name}>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    {bed.name}
                                </span>

                                <span className="text-xs text-slate-500">
                                    {bed.available} available / {bed.total}
                                </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                                <div
                                    className="h-full rounded-full bg-blue-600 transition-all"
                                    style={{
                                        width: `${occupiedPercentage}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-1 flex justify-between">
                                <span className="text-xs text-slate-400">
                                    {bed.occupied} occupied
                                </span>

                                <span className="text-xs font-medium text-emerald-600">
                                    {bed.available} free
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                type="button"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
                Manage Beds
                <FiArrowRight size={16} />
            </button>
        </div>
    );
}

export default BedAvailability;
