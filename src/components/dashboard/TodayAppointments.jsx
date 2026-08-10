
import { FiClock, FiMoreVertical } from "react-icons/fi";

const appointments = [
    {
        id: 1,
        name: "Olivia Wilson",
        doctor: "Dr. Michael Brown",
        time: "09:30 AM",
        type: "General Checkup",
        image:
            "https://randomuser.me/api/portraits/women/44.jpg",
        status: "Confirmed",
    },
    {
        id: 2,
        name: "James Anderson",
        doctor: "Dr. Sarah Miller",
        time: "10:15 AM",
        type: "Cardiology",
        image:
            "https://randomuser.me/api/portraits/men/32.jpg",
        status: "Waiting",
    },
    {
        id: 3,
        name: "Sophia Martinez",
        doctor: "Dr. David Clark",
        time: "11:00 AM",
        type: "Dental",
        image:
            "https://randomuser.me/api/portraits/women/65.jpg",
        status: "Confirmed",
    },
    {
        id: 4,
        name: "William Taylor",
        doctor: "Dr. Emily Davis",
        time: "12:30 PM",
        type: "Orthopedic",
        image:
            "https://randomuser.me/api/portraits/men/41.jpg",
        status: "Waiting",
    },
];

function TodayAppointments() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        Today's Appointments
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Upcoming appointments for today
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    View All
                </button>
            </div>

            <div className="divide-y divide-slate-100">
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="flex items-center gap-4 p-5 transition hover:bg-slate-50"
                    >
                        <img
                            src={appointment.image}
                            alt={appointment.name}
                            className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <h4 className="truncate text-sm font-semibold text-slate-800">
                                {appointment.name}
                            </h4>

                            <p className="mt-1 truncate text-xs text-slate-500">
                                {appointment.doctor}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                {appointment.type}
                            </p>
                        </div>

                        <div className="hidden items-center gap-1 text-xs text-slate-500 sm:flex">
                            <FiClock size={14} />
                            {appointment.time}
                        </div>

                        <span
                            className={`hidden rounded - full px - 3 py - 1 text - xs font - semibold sm: inline - flex ${appointment.status === "Confirmed"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-amber-50 text-amber-600"
                                } `}
                        >
                            {appointment.status}
                        </span>

                        <button
                            type="button"
                            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                            <FiMoreVertical size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodayAppointments;
