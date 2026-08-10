
import {
    FiArrowDown,
    FiArrowUp,
} from "react-icons/fi";

function SummaryCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    trendType = "up",
}) {
    const isPositive = trendType === "up";

    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                        {value}
                    </h3>

                    <p className="mt-2 text-xs text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={23} />
                </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
                <span
                    className={`flex items-center gap-1 text-xs font-semibold ${isPositive
                        ? "text-emerald-600"
                        : "text-red-500"
                        }`}
                >
                    {isPositive ? (
                        <FiArrowUp size={13} />
                    ) : (
                        <FiArrowDown size={13} />
                    )}

                    {trend}
                </span>

                <span className="text-xs text-slate-400">
                    vs last month
                </span>
            </div>
        </div>
    );
}

export default SummaryCard;
