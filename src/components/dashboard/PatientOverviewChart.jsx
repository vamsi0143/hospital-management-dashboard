import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const patientData = [
    { day: "Mon", patients: 42 },
    { day: "Tue", patients: 55 },
    { day: "Wed", patients: 48 },
    { day: "Thu", patients: 67 },
    { day: "Fri", patients: 72 },
    { day: "Sat", patients: 61 },
    { day: "Sun", patients: 78 },
];

function PatientOverviewChart() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">

            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        Patient Overview
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Patient visits recorded during this week
                    </p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    <span className="text-slate-500 dark:text-slate-400">
                        Patients
                    </span>
                </div>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={patientData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#e2e8f0"
                        />

                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                            allowDecimals={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                                boxShadow:
                                    "0 10px 25px rgba(15, 23, 42, 0.08)",
                            }}
                            formatter={(value) => [
                                `${value} patients`,
                                "Patients",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="patients"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#2563eb",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}

export default PatientOverviewChart;