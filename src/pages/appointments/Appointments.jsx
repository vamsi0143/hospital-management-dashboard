import { useMemo, useState } from "react";
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiEdit2,
    FiEye,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";

const initialAppointments = [
    {
        id: "APT-001",
        patient: "Rajesh Kumar",
        doctor: "Dr. Arjun Reddy",
        department: "Cardiology",
        date: "2026-08-10",
        time: "09:30 AM",
        type: "Consultation",
        status: "Confirmed",
        phone: "9876543210",
        reason: "Chest discomfort and regular cardiac checkup",
    },
    {
        id: "APT-002",
        patient: "Sowmya Rao",
        doctor: "Dr. Priya Sharma",
        department: "Neurology",
        date: "2026-08-10",
        time: "10:30 AM",
        type: "Follow-up",
        status: "Pending",
        phone: "9876501234",
        reason: "Follow-up consultation",
    },
    {
        id: "APT-003",
        patient: "Kiran Reddy",
        doctor: "Dr. Rahul Mehta",
        department: "Orthopedics",
        date: "2026-08-10",
        time: "11:30 AM",
        type: "Consultation",
        status: "Confirmed",
        phone: "9123456780",
        reason: "Knee pain",
    },
    {
        id: "APT-004",
        patient: "Anjali Sharma",
        doctor: "Dr. Sneha Rao",
        department: "Pediatrics",
        date: "2026-08-11",
        time: "09:00 AM",
        type: "Consultation",
        status: "Confirmed",
        phone: "9988776655",
        reason: "Child health checkup",
    },
    {
        id: "APT-005",
        patient: "Vijay Kumar",
        doctor: "Dr. Vikram Singh",
        department: "General Medicine",
        date: "2026-08-11",
        time: "02:00 PM",
        type: "Follow-up",
        status: "Cancelled",
        phone: "9001122334",
        reason: "Blood pressure follow-up",
    },
    {
        id: "APT-006",
        patient: "Meena Patel",
        doctor: "Dr. Ananya Patel",
        department: "Dermatology",
        date: "2026-08-12",
        time: "11:00 AM",
        type: "Consultation",
        status: "Pending",
        phone: "9012345678",
        reason: "Skin allergy",
    },
    {
        id: "APT-007",
        patient: "Suresh Rao",
        doctor: "Dr. Karthik Rao",
        department: "ENT",
        date: "2026-08-12",
        time: "10:00 AM",
        type: "Consultation",
        status: "Confirmed",
        phone: "9345678901",
        reason: "Ear pain",
    },
    {
        id: "APT-008",
        patient: "Lakshmi Devi",
        doctor: "Dr. Divya Kapoor",
        department: "Gynecology",
        date: "2026-08-13",
        time: "04:00 PM",
        type: "Consultation",
        status: "Pending",
        phone: "9456789012",
        reason: "Routine consultation",
    },
];

const doctorOptions = [
    {
        name: "Dr. Arjun Reddy",
        department: "Cardiology",
    },
    {
        name: "Dr. Priya Sharma",
        department: "Neurology",
    },
    {
        name: "Dr. Rahul Mehta",
        department: "Orthopedics",
    },
    {
        name: "Dr. Sneha Rao",
        department: "Pediatrics",
    },
    {
        name: "Dr. Vikram Singh",
        department: "General Medicine",
    },
    {
        name: "Dr. Ananya Patel",
        department: "Dermatology",
    },
    {
        name: "Dr. Karthik Rao",
        department: "ENT",
    },
    {
        name: "Dr. Divya Kapoor",
        department: "Gynecology",
    },
];

const patientOptions = [
    "Rajesh Kumar",
    "Sowmya Rao",
    "Kiran Reddy",
    "Anjali Sharma",
    "Vijay Kumar",
    "Meena Patel",
    "Suresh Rao",
    "Lakshmi Devi",
];

function Appointments() {
    const [appointments, setAppointments] = useState(
        initialAppointments
    );

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [departmentFilter, setDepartmentFilter] =
        useState("All");

    const [dateFilter, setDateFilter] =
        useState("");

    const [openMenu, setOpenMenu] = useState(null);

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [showForm, setShowForm] = useState(false);

    const [editingAppointment, setEditingAppointment] =
        useState(null);

    const [formData, setFormData] = useState({
        patient: "",
        doctor: "",
        department: "",
        date: "",
        time: "",
        type: "Consultation",
        status: "Pending",
        phone: "",
        reason: "",
    });

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                appointment.patient
                    .toLowerCase()
                    .includes(searchValue) ||
                appointment.doctor
                    .toLowerCase()
                    .includes(searchValue) ||
                appointment.id
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                appointment.status === statusFilter;

            const matchesDepartment =
                departmentFilter === "All" ||
                appointment.department ===
                departmentFilter;

            const matchesDate =
                !dateFilter ||
                appointment.date === dateFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesDepartment &&
                matchesDate
            );
        });
    }, [
        appointments,
        search,
        statusFilter,
        departmentFilter,
        dateFilter,
    ]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        if (name === "doctor") {
            const selectedDoctor =
                doctorOptions.find(
                    (doctor) => doctor.name === value
                );

            if (selectedDoctor) {
                setFormData((current) => ({
                    ...current,
                    doctor: value,
                    department:
                        selectedDoctor.department,
                }));
            }
        }
    };

    const resetForm = () => {
        setFormData({
            patient: "",
            doctor: "",
            department: "",
            date: "",
            time: "",
            type: "Consultation",
            status: "Pending",
            phone: "",
            reason: "",
        });

        setEditingAppointment(null);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingAppointment) {
            setAppointments((current) =>
                current.map((appointment) =>
                    appointment.id ===
                        editingAppointment.id
                        ? {
                            ...appointment,
                            ...formData,
                        }
                        : appointment
                )
            );
        } else {
            const newAppointment = {
                id: `APT-${String(
                    appointments.length + 1
                ).padStart(3, "0")}`,
                ...formData,
            };

            setAppointments((current) => [
                newAppointment,
                ...current,
            ]);
        }

        resetForm();
    };

    const openEditAppointment = (appointment) => {
        setEditingAppointment(appointment);

        setFormData({
            patient: appointment.patient,
            doctor: appointment.doctor,
            department: appointment.department,
            date: appointment.date,
            time: appointment.time,
            type: appointment.type,
            status: appointment.status,
            phone: appointment.phone,
            reason: appointment.reason,
        });

        setOpenMenu(null);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this appointment?"
        );

        if (!confirmed) {
            return;
        }

        setAppointments((current) =>
            current.filter(
                (appointment) =>
                    appointment.id !== id
            )
        );

        setOpenMenu(null);
    };

    const updateAppointmentStatus = (
        id,
        status
    ) => {
        setAppointments((current) =>
            current.map((appointment) =>
                appointment.id === id
                    ? {
                        ...appointment,
                        status,
                    }
                    : appointment
            )
        );

        setOpenMenu(null);
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Patient Visits
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Appointments
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Schedule and manage patient
                        appointments.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingAppointment(null);
                        setShowForm(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiPlus size={18} />
                    Book Appointment
                </button>
            </div>

            {/* Summary */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500">
                                Total
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {
                                    appointments.length
                                }
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiCalendar
                                size={20}
                            />
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Confirmed
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                        {
                            appointments.filter(
                                (item) =>
                                    item.status ===
                                    "Confirmed"
                            ).length
                        }
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Pending
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-amber-500">
                        {
                            appointments.filter(
                                (item) =>
                                    item.status ===
                                    "Pending"
                            ).length
                        }
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Cancelled
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-red-500">
                        {
                            appointments.filter(
                                (item) =>
                                    item.status ===
                                    "Cancelled"
                            ).length
                        }
                    </h3>
                </div>
            </div>

            {/* Appointment Section */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                {/* Filters */}

                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <div className="grid gap-3 xl:grid-cols-[1fr_190px_190px_170px]">

                        <div className="relative">
                            <FiSearch
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(
                                        event.target.value
                                    )
                                }
                                placeholder="Search patient, doctor or ID..."
                                className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="All">
                                All Status
                            </option>

                            <option value="Confirmed">
                                Confirmed
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>
                        </select>

                        <select
                            value={departmentFilter}
                            onChange={(event) =>
                                setDepartmentFilter(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="All">
                                All Departments
                            </option>

                            <option value="Cardiology">
                                Cardiology
                            </option>

                            <option value="Neurology">
                                Neurology
                            </option>

                            <option value="Orthopedics">
                                Orthopedics
                            </option>

                            <option value="Pediatrics">
                                Pediatrics
                            </option>

                            <option value="General Medicine">
                                General Medicine
                            </option>

                            <option value="Dermatology">
                                Dermatology
                            </option>

                            <option value="ENT">
                                ENT
                            </option>

                            <option value="Gynecology">
                                Gynecology
                            </option>
                        </select>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(event) =>
                                setDateFilter(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Desktop Table */}

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full min-w-[1050px]">

                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Appointment
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Patient
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Doctor
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Date & Time
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Type
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredAppointments.map(
                                (appointment) => (
                                    <tr
                                        key={
                                            appointment.id
                                        }
                                        className="border-b border-slate-100 transition hover:bg-slate-50/70"
                                    >

                                        <td className="px-6 py-4">
                                            <p className="text-sm font-semibold text-slate-800">
                                                {
                                                    appointment.id
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    appointment.department
                                                }
                                            </p>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                    <FiUser
                                                        size={
                                                            17
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {
                                                            appointment.patient
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {
                                                            appointment.phone
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <p className="text-sm font-medium text-slate-700">
                                                {
                                                    appointment.doctor
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    appointment.department
                                                }
                                            </p>
                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="text-sm font-medium text-slate-700">
                                                {
                                                    appointment.date
                                                }
                                            </p>

                                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                                <FiClock
                                                    size={
                                                        13
                                                    }
                                                />

                                                {
                                                    appointment.time
                                                }
                                            </div>

                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-500">
                                            {
                                                appointment.type
                                            }
                                        </td>

                                        <td className="px-4 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status ===
                                                        "Confirmed"
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : appointment.status ===
                                                            "Pending"
                                                            ? "bg-amber-50 text-amber-600"
                                                            : "bg-red-50 text-red-500"
                                                    }`}
                                            >
                                                {
                                                    appointment.status
                                                }
                                            </span>

                                        </td>

                                        <td className="relative px-6 py-4 text-right">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            appointment.id
                                                            ? null
                                                            : appointment.id
                                                    )
                                                }
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <FiMoreVertical
                                                    size={
                                                        18
                                                    }
                                                />
                                            </button>

                                            {openMenu ===
                                                appointment.id && (
                                                    <div className="absolute right-6 top-14 z-30 w-40 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl">

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedAppointment(
                                                                    appointment
                                                                );
                                                                setOpenMenu(
                                                                    null
                                                                );
                                                            }}
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                        >
                                                            <FiEye
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                            View
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditAppointment(
                                                                    appointment
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                        >
                                                            <FiEdit2
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                            Edit
                                                        </button>

                                                        {appointment.status ===
                                                            "Pending" && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        updateAppointmentStatus(
                                                                            appointment.id,
                                                                            "Confirmed"
                                                                        )
                                                                    }
                                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                                                                >
                                                                    <FiCheckCircle
                                                                        size={
                                                                            15
                                                                        }
                                                                    />
                                                                    Confirm
                                                                </button>
                                                            )}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    appointment.id
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                                        >
                                                            <FiTrash2
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                            Delete
                                                        </button>

                                                    </div>
                                                )}

                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>
                </div>

                {/* Mobile Cards */}

                <div className="divide-y divide-slate-100 md:hidden">

                    {filteredAppointments.map(
                        (appointment) => (
                            <div
                                key={appointment.id}
                                className="p-5"
                            >

                                <div className="flex items-start justify-between">

                                    <div>
                                        <p className="text-xs font-semibold text-blue-600">
                                            {
                                                appointment.id
                                            }
                                        </p>

                                        <h3 className="mt-1 font-semibold text-slate-800">
                                            {
                                                appointment.patient
                                            }
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-400">
                                            {
                                                appointment.doctor
                                            }
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedAppointment(
                                                appointment
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                                    >
                                        <FiEye
                                            size={17}
                                        />
                                    </button>

                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-4">

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Date
                                        </p>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {
                                                appointment.date
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Time
                                        </p>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {
                                                appointment.time
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Department
                                        </p>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {
                                                appointment.department
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${appointment.status ===
                                                    "Confirmed"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : appointment.status ===
                                                        "Pending"
                                                        ? "bg-amber-50 text-amber-600"
                                                        : "bg-red-50 text-red-500"
                                                }`}
                                        >
                                            {
                                                appointment.status
                                            }
                                        </span>
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

                {/* Empty State */}

                {filteredAppointments.length ===
                    0 && (
                        <div className="p-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <FiCalendar
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-700">
                                No appointments found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your filters.
                            </p>

                        </div>
                    )}

            </div>

            {/* View Appointment Modal */}

            {selectedAppointment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedAppointment(null)
                    }
                >

                    <div
                        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white">

                            <div>
                                <p className="text-xs font-medium text-blue-100">
                                    Appointment
                                </p>

                                <h2 className="mt-1 text-xl font-bold">
                                    {
                                        selectedAppointment.id
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedAppointment(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
                            >
                                <FiX size={18} />
                            </button>

                        </div>

                        <div className="space-y-5 p-6">

                            <div>
                                <p className="text-xs text-slate-400">
                                    Patient
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    {
                                        selectedAppointment.patient
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Doctor
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                    {
                                        selectedAppointment.doctor
                                    }
                                </p>

                                <p className="mt-1 text-sm text-blue-600">
                                    {
                                        selectedAppointment.department
                                    }
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Date
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {
                                            selectedAppointment.date
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Time
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {
                                            selectedAppointment.time
                                        }
                                    </p>
                                </div>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs text-slate-400">
                                    Reason
                                </p>

                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {
                                        selectedAppointment.reason
                                    }
                                </p>

                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedAppointment.status ===
                                            "Confirmed"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : selectedAppointment.status ===
                                                "Pending"
                                                ? "bg-amber-50 text-amber-600"
                                                : "bg-red-50 text-red-500"
                                        }`}
                                >
                                    {
                                        selectedAppointment.status
                                    }
                                </span>

                                <p className="text-sm text-slate-500">
                                    {
                                        selectedAppointment.phone
                                    }
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* Add / Edit Appointment Modal */}

            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={resetForm}
                >

                    <div
                        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="flex items-center justify-between border-b border-slate-100 p-6">

                            <div>
                                <h2 className="text-xl font-bold text-slate-800">
                                    {editingAppointment
                                        ? "Edit Appointment"
                                        : "Book Appointment"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {editingAppointment
                                        ? "Update appointment information."
                                        : "Schedule a new patient appointment."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Patient */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Patient
                                    </label>

                                    <select
                                        required
                                        name="patient"
                                        value={
                                            formData.patient
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select patient
                                        </option>

                                        {patientOptions.map(
                                            (patient) => (
                                                <option
                                                    key={
                                                        patient
                                                    }
                                                    value={
                                                        patient
                                                    }
                                                >
                                                    {
                                                        patient
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Doctor */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Doctor
                                    </label>

                                    <select
                                        required
                                        name="doctor"
                                        value={
                                            formData.doctor
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select doctor
                                        </option>

                                        {doctorOptions.map(
                                            (doctor) => (
                                                <option
                                                    key={
                                                        doctor.name
                                                    }
                                                    value={
                                                        doctor.name
                                                    }
                                                >
                                                    {
                                                        doctor.name
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                {/* Department */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Department
                                    </label>

                                    <input
                                        required
                                        readOnly
                                        name="department"
                                        value={
                                            formData.department
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none"
                                        placeholder="Select doctor first"
                                    />
                                </div>

                                {/* Date */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Appointment Date
                                    </label>

                                    <input
                                        required
                                        type="date"
                                        name="date"
                                        value={
                                            formData.date
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        min="2026-08-10"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Time */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Appointment Time
                                    </label>

                                    <input
                                        required
                                        type="text"
                                        name="time"
                                        value={
                                            formData.time
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="10:30 AM"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Type */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Appointment Type
                                    </label>

                                    <select
                                        name="type"
                                        value={
                                            formData.type
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Consultation">
                                            Consultation
                                        </option>

                                        <option value="Follow-up">
                                            Follow-up
                                        </option>

                                        <option value="Emergency">
                                            Emergency
                                        </option>

                                        <option value="Routine Checkup">
                                            Routine Checkup
                                        </option>
                                    </select>
                                </div>

                                {/* Status */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={
                                            formData.status
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Confirmed">
                                            Confirmed
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                                {/* Phone */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Contact Number
                                    </label>

                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        placeholder="10 digit phone number"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Reason */}

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Reason for Visit
                                    </label>

                                    <textarea
                                        required
                                        name="reason"
                                        value={
                                            formData.reason
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        rows="4"
                                        placeholder="Enter reason for appointment..."
                                        className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    {editingAppointment
                                        ? "Save Changes"
                                        : "Book Appointment"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Appointments;