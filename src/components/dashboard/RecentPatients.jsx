
import { FiArrowRight } from "react-icons/fi";

const patients = [
    {
        id: "PT-10248",
        name: "Olivia Wilson",
        age: 29,
        gender: "Female",
        doctor: "Dr. Michael Brown",
        date: "09 Aug 2026",
        image:
            "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        id: "PT-10247",
        name: "James Anderson",
        age: 42,
        gender: "Male",
        doctor: "Dr. Sarah Miller",
        date: "09 Aug 2026",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: "PT-10246",
        name: "Sophia Martinez",
        age: 35,
        gender: "Female",
        doctor: "Dr. David Clark",
        date: "08 Aug 2026",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        id: "PT-10245",
        name: "William Taylor",
        age: 51,
        gender: "Male",
        doctor: "Dr. Emily Davis",
        date: "08 Aug 2026",
        image:
            "https://randomuser.me/api/portraits/men/41.jpg",
    },
];

function RecentPatients() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        Recent Patients
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Recently registered patients
                    </p>
                </div>

                <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    View All
                    <FiArrowRight size={15} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Patient
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Age / Gender
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Doctor
                            </th>

                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((patient) => (
                            <tr
                                key={patient.id}
                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={patient.image}
                                            alt={patient.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {patient.name}
                                            </p>

                                            <p className="mt-0.5 text-xs text-slate-400">
                                                {patient.id}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {patient.age} / {patient.gender}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {patient.doctor}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-500">
                                    {patient.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentPatients;
