import {
    FiAlertCircle,
    FiArrowRight,
    FiCheckCircle,
    FiClock,
    FiDroplet,
    FiHeart,
    FiInfo,
    FiPhone,
    FiTool,
} from "react-icons/fi";

const updates = [
    {
        id: 1,
        icon: FiAlertCircle,
        title: "Emergency Department",
        description:
            "High patient volume is currently being handled by the emergency team.",
        time: "10 minutes ago",
        type: "urgent",
    },
    {
        id: 2,
        icon: FiDroplet,
        title: "Pharmacy Stock Alert",
        description:
            "12 medicines are running low and should be restocked soon.",
        time: "35 minutes ago",
        type: "warning",
    },
    {
        id: 3,
        icon: FiCheckCircle,
        title: "Bed Availability Updated",
        description:
            "18 beds are currently available across general and private wards.",
        time: "1 hour ago",
        type: "success",
    },
    {
        id: 4,
        icon: FiTool,
        title: "ICU Equipment Maintenance",
        description:
            "Scheduled maintenance for ICU equipment is planned for tomorrow.",
        time: "2 hours ago",
        type: "info",
    },
];

const updateStyles = {
    urgent: {
        icon: "bg-red-50 text-red-500",
        dot: "bg-red-500",
    },
    warning: {
        icon: "bg-orange-50 text-orange-500",
        dot: "bg-orange-500",
    },
    success: {
        icon: "bg-emerald-50 text-emerald-500",
        dot: "bg-emerald-500",
    },
    info: {
        icon: "bg-blue-50 text-blue-500",
        dot: "bg-blue-500",
    },
};

function HospitalUpdates() {
    return (
        <section className="grid gap-6 xl:grid-cols-3">
            {/* Hospital Updates */}

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6 xl:col-span-2">
                {/* Header */}

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                <FiInfo size={19} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    Hospital Updates
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Latest hospital activities and alerts
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="hidden items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
                    >
                        View All
                        <FiArrowRight size={15} />
                    </button>
                </div>

                {/* Updates */}

                <div className="mt-6 divide-y divide-slate-100">
                    {updates.map((update) => {
                        const Icon = update.icon;
                        const styles = updateStyles[update.type];

                        return (
                            <div
                                key={update.id}
                                className="flex gap-4 py-4 first:pt-0 last:pb-0"
                            >
                                {/* Icon */}

                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                                >
                                    <Icon size={19} />
                                </div>

                                {/* Content */}

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-800">
                                                {update.title}
                                            </h3>

                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${styles.dot}`}
                                            />
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                            <FiClock size={12} />
                                            {update.time}
                                        </div>
                                    </div>

                                    <p className="mt-1 text-sm leading-5 text-slate-500">
                                        {update.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile View All */}

                <button
                    type="button"
                    className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600 sm:hidden"
                >
                    View All
                    <FiArrowRight size={15} />
                </button>
            </div>

            {/* Emergency Contact */}

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-6 text-white shadow-sm">
                {/* Decorative circles */}

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />

                <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/10" />

                <div className="relative">
                    {/* Heading */}

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                            <FiHeart size={21} />
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-red-100">
                                Emergency Support
                            </p>

                            <h2 className="text-xl font-bold">
                                Emergency Contact
                            </h2>
                        </div>
                    </div>

                    {/* Emergency Number */}

                    <div className="mt-7 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-xs font-medium text-red-100">
                            Emergency Helpline
                        </p>

                        <div className="mt-2 flex items-center gap-3">
                            <FiPhone size={20} />

                            <span className="text-2xl font-bold">
                                108
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-red-100">
                            Available 24 hours a day
                        </p>
                    </div>

                    {/* Ambulance */}

                    <div className="mt-4 rounded-2xl bg-white p-4 text-slate-800">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Ambulance Service
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold">
                                    Available
                                </p>

                                <p className="text-xs text-slate-500">
                                    4 ambulances ready
                                </p>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                                <FiCheckCircle size={19} />
                            </div>
                        </div>
                    </div>

                    {/* Emergency Button */}

                    <button
                        type="button"
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-red-600 shadow-sm transition hover:bg-red-50"
                    >
                        <FiPhone size={17} />
                        Contact Emergency Team
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HospitalUpdates;