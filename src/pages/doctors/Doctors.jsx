import { useMemo, useState } from "react";
import {
    FiCalendar,
    FiChevronLeft,
    FiChevronRight,
    FiClock,
    FiEdit2,
    FiEye,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiUserCheck,
    FiX,
} from "react-icons/fi";

const initialDoctors = [
    {
        id: "DR-001",
        name: "Dr. Arjun Reddy",
        specialty: "Cardiologist",
        department: "Cardiology",
        experience: 12,
        phone: "9876543210",
        email: "arjun.reddy@medicare.com",
        fee: 1200,
        availability: "Available",
        schedule: "09:00 AM - 02:00 PM",
        image: "https://i.pravatar.cc/150?img=68",
    },
    {
        id: "DR-002",
        name: "Dr. Priya Sharma",
        specialty: "Neurologist",
        department: "Neurology",
        experience: 9,
        phone: "9876501234",
        email: "priya.sharma@medicare.com",
        fee: 1000,
        availability: "Available",
        schedule: "10:00 AM - 04:00 PM",
        image: "https://i.pravatar.cc/150?img=49",
    },
    {
        id: "DR-003",
        name: "Dr. Rahul Mehta",
        specialty: "Orthopedic Surgeon",
        department: "Orthopedics",
        experience: 15,
        phone: "9123456780",
        email: "rahul.mehta@medicare.com",
        fee: 1500,
        availability: "Busy",
        schedule: "11:00 AM - 05:00 PM",
        image: "https://i.pravatar.cc/150?img=60",
    },
    {
        id: "DR-004",
        name: "Dr. Sneha Rao",
        specialty: "Pediatrician",
        department: "Pediatrics",
        experience: 8,
        phone: "9988776655",
        email: "sneha.rao@medicare.com",
        fee: 900,
        availability: "Available",
        schedule: "09:30 AM - 03:30 PM",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: "DR-005",
        name: "Dr. Vikram Singh",
        specialty: "General Physician",
        department: "General Medicine",
        experience: 11,
        phone: "9001122334",
        email: "vikram.singh@medicare.com",
        fee: 800,
        availability: "Unavailable",
        schedule: "02:00 PM - 07:00 PM",
        image: "https://i.pravatar.cc/150?img=52",
    },
    {
        id: "DR-006",
        name: "Dr. Ananya Patel",
        specialty: "Dermatologist",
        department: "Dermatology",
        experience: 7,
        phone: "9012345678",
        email: "ananya.patel@medicare.com",
        fee: 1100,
        availability: "Available",
        schedule: "10:00 AM - 03:00 PM",
        image: "https://i.pravatar.cc/150?img=25",
    },
    {
        id: "DR-007",
        name: "Dr. Karthik Rao",
        specialty: "ENT Specialist",
        department: "ENT",
        experience: 10,
        phone: "9345678901",
        email: "karthik.rao@medicare.com",
        fee: 950,
        availability: "Busy",
        schedule: "09:00 AM - 01:00 PM",
        image: "https://i.pravatar.cc/150?img=57",
    },
    {
        id: "DR-008",
        name: "Dr. Divya Kapoor",
        specialty: "Gynecologist",
        department: "Gynecology",
        experience: 13,
        phone: "9456789012",
        email: "divya.kapoor@medicare.com",
        fee: 1300,
        availability: "Available",
        schedule: "11:00 AM - 05:00 PM",
        image: "https://i.pravatar.cc/150?img=43",
    },
];

function Doctors() {
    const [doctors, setDoctors] = useState(initialDoctors);

    const [search, setSearch] = useState("");
    const [departmentFilter, setDepartmentFilter] =
        useState("All");
    const [availabilityFilter, setAvailabilityFilter] =
        useState("All");

    const [openMenu, setOpenMenu] = useState(null);
    const [selectedDoctor, setSelectedDoctor] =
        useState(null);

    const [showForm, setShowForm] = useState(false);
    const [editingDoctor, setEditingDoctor] =
        useState(null);

    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        department: "",
        experience: "",
        phone: "",
        email: "",
        fee: "",
        availability: "Available",
        schedule: "",
    });

    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                doctor.name
                    .toLowerCase()
                    .includes(searchValue) ||
                doctor.id
                    .toLowerCase()
                    .includes(searchValue) ||
                doctor.specialty
                    .toLowerCase()
                    .includes(searchValue);

            const matchesDepartment =
                departmentFilter === "All" ||
                doctor.department === departmentFilter;

            const matchesAvailability =
                availabilityFilter === "All" ||
                doctor.availability ===
                availabilityFilter;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesAvailability
            );
        });
    }, [
        doctors,
        search,
        departmentFilter,
        availabilityFilter,
    ]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            specialty: "",
            department: "",
            experience: "",
            phone: "",
            email: "",
            fee: "",
            availability: "Available",
            schedule: "",
        });

        setEditingDoctor(null);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingDoctor) {
            setDoctors((current) =>
                current.map((doctor) =>
                    doctor.id === editingDoctor.id
                        ? {
                            ...doctor,
                            name: formData.name,
                            specialty:
                                formData.specialty,
                            department:
                                formData.department,
                            experience: Number(
                                formData.experience
                            ),
                            phone: formData.phone,
                            email: formData.email,
                            fee: Number(formData.fee),
                            availability:
                                formData.availability,
                            schedule:
                                formData.schedule,
                        }
                        : doctor
                )
            );
        } else {
            const newDoctor = {
                id: `DR-${String(
                    doctors.length + 1
                ).padStart(3, "0")}`,
                name: formData.name,
                specialty: formData.specialty,
                department: formData.department,
                experience: Number(
                    formData.experience
                ),
                phone: formData.phone,
                email: formData.email,
                fee: Number(formData.fee),
                availability:
                    formData.availability,
                schedule: formData.schedule,
                image:
                    "https://i.pravatar.cc/150?img=35",
            };

            setDoctors((current) => [
                newDoctor,
                ...current,
            ]);
        }

        resetForm();
    };

    const openEditDoctor = (doctor) => {
        setEditingDoctor(doctor);

        setFormData({
            name: doctor.name,
            specialty: doctor.specialty,
            department: doctor.department,
            experience: doctor.experience,
            phone: doctor.phone,
            email: doctor.email,
            fee: doctor.fee,
            availability: doctor.availability,
            schedule: doctor.schedule,
        });

        setOpenMenu(null);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this doctor?"
        );

        if (!confirmed) {
            return;
        }

        setDoctors((current) =>
            current.filter(
                (doctor) => doctor.id !== id
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
                        Medical Staff
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Doctors
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage doctors, specialties,
                        schedules and availability.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingDoctor(null);
                        setShowForm(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiPlus size={18} />
                    Add New Doctor
                </button>
            </div>

            {/* Summary Cards */}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Total Doctors
                        </p>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiUserCheck size={19} />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-slate-800">
                        {doctors.length}
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Available Now
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-emerald-600">
                        {
                            doctors.filter(
                                (doctor) =>
                                    doctor.availability ===
                                    "Available"
                            ).length
                        }
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Busy
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-amber-500">
                        {
                            doctors.filter(
                                (doctor) =>
                                    doctor.availability ===
                                    "Busy"
                            ).length
                        }
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Departments
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-800">
                        {
                            new Set(
                                doctors.map(
                                    (doctor) =>
                                        doctor.department
                                )
                            ).size
                        }
                    </h3>
                </div>
            </div>

            {/* Main Table */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                {/* Filters */}

                <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-3 lg:grid-cols-[1fr_210px_180px]">

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
                                placeholder="Search doctor or specialty..."
                                className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

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

                        <select
                            value={availabilityFilter}
                            onChange={(event) =>
                                setAvailabilityFilter(
                                    event.target.value
                                )
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="All">
                                All Availability
                            </option>
                            <option value="Available">
                                Available
                            </option>
                            <option value="Busy">
                                Busy
                            </option>
                            <option value="Unavailable">
                                Unavailable
                            </option>
                        </select>
                    </div>
                </div>

                {/* Desktop Table */}

                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[1000px]">

                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Doctor
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Department
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Experience
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Schedule
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Fee
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
                            {filteredDoctors.map(
                                (doctor) => (
                                    <tr
                                        key={doctor.id}
                                        className="border-b border-slate-100 transition hover:bg-slate-50/70"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        doctor.image
                                                    }
                                                    alt={
                                                        doctor.name
                                                    }
                                                    className="h-11 w-11 rounded-full object-cover"
                                                />

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-800">
                                                        {
                                                            doctor.name
                                                        }
                                                    </p>

                                                    <p className="text-xs text-slate-400">
                                                        {
                                                            doctor.specialty
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-500">
                                            {
                                                doctor.department
                                            }
                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-500">
                                            {
                                                doctor.experience
                                            }{" "}
                                            years
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <FiClock
                                                    size={15}
                                                    className="text-blue-500"
                                                />

                                                {
                                                    doctor.schedule
                                                }
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                                            ₹
                                            {doctor.fee.toLocaleString(
                                                "en-IN"
                                            )}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${doctor.availability ===
                                                        "Available"
                                                        ? "bg-emerald-50 text-emerald-600"
                                                        : doctor.availability ===
                                                            "Busy"
                                                            ? "bg-amber-50 text-amber-600"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                            >
                                                {
                                                    doctor.availability
                                                }
                                            </span>
                                        </td>

                                        <td className="relative px-6 py-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            doctor.id
                                                            ? null
                                                            : doctor.id
                                                    )
                                                }
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <FiMoreVertical
                                                    size={18}
                                                />
                                            </button>

                                            {openMenu ===
                                                doctor.id && (
                                                    <div className="absolute right-6 top-14 z-20 w-36 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedDoctor(
                                                                    doctor
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
                                                                openEditDoctor(
                                                                    doctor
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

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    doctor.id
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
                    {filteredDoctors.map(
                        (doctor) => (
                            <div
                                key={doctor.id}
                                className="p-5"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                doctor.image
                                            }
                                            alt={
                                                doctor.name
                                            }
                                            className="h-12 w-12 rounded-full object-cover"
                                        />

                                        <div>
                                            <p className="font-semibold text-slate-800">
                                                {
                                                    doctor.name
                                                }
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                {
                                                    doctor.specialty
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedDoctor(
                                                doctor
                                            )
                                        }
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                                    >
                                        <FiEye
                                            size={17}
                                        />
                                    </button>
                                </div>

                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Department
                                        </p>

                                        <p className="mt-1 text-slate-600">
                                            {
                                                doctor.department
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Experience
                                        </p>

                                        <p className="mt-1 text-slate-600">
                                            {
                                                doctor.experience
                                            }{" "}
                                            years
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Consultation
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-700">
                                            ₹
                                            {doctor.fee.toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${doctor.availability ===
                                                    "Available"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : doctor.availability ===
                                                        "Busy"
                                                        ? "bg-amber-50 text-amber-600"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {
                                                doctor.availability
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>

                {/* Empty State */}

                {filteredDoctors.length ===
                    0 && (
                        <div className="p-12 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <FiUserCheck
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 text-base font-bold text-slate-700">
                                No doctors found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your
                                search or filters.
                            </p>
                        </div>
                    )}

                {/* Pagination */}

                {filteredDoctors.length >
                    0 && (
                        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <p className="text-xs text-slate-400">
                                Showing{" "}
                                <span className="font-semibold text-slate-600">
                                    {
                                        filteredDoctors.length
                                    }
                                </span>{" "}
                                of{" "}
                                <span className="font-semibold text-slate-600">
                                    {
                                        doctors.length
                                    }
                                </span>{" "}
                                doctors
                            </p>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
                                >
                                    <FiChevronLeft
                                        size={15}
                                    />
                                </button>

                                <button
                                    type="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white"
                                >
                                    1
                                </button>

                                <button
                                    type="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500"
                                >
                                    2
                                </button>

                                <button
                                    type="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500"
                                >
                                    3
                                </button>

                                <button
                                    type="button"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
                                >
                                    <FiChevronRight
                                        size={15}
                                    />
                                </button>
                            </div>
                        </div>
                    )}
            </div>

            {/* Doctor Details Modal */}

            {selectedDoctor && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedDoctor(null)
                    }
                >
                    <div
                        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 px-6 pb-16 pt-6">
                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedDoctor(
                                        null
                                    )
                                }
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <div className="-mt-12">
                                <img
                                    src={
                                        selectedDoctor.image
                                    }
                                    alt={
                                        selectedDoctor.name
                                    }
                                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                                />
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-slate-800">
                                    {
                                        selectedDoctor.name
                                    }
                                </h2>

                                <p className="mt-1 text-sm text-blue-600">
                                    {
                                        selectedDoctor.specialty
                                    }
                                </p>

                                <p className="mt-1 text-sm text-slate-400">
                                    {
                                        selectedDoctor.id
                                    }
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Department
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {
                                            selectedDoctor.department
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Experience
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {
                                            selectedDoctor.experience
                                        }{" "}
                                        years
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Consultation Fee
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        ₹
                                        {selectedDoctor.fee.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Availability
                                    </p>

                                    <p className="mt-1 font-semibold text-emerald-600">
                                        {
                                            selectedDoctor.availability
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
                                <p className="flex items-center gap-2 text-sm text-slate-600">
                                    <FiCalendar
                                        size={16}
                                        className="text-blue-500"
                                    />

                                    {
                                        selectedDoctor.schedule
                                    }
                                </p>

                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {
                                        selectedDoctor.phone
                                    }
                                </p>

                                <p className="break-all text-sm text-slate-600">
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {
                                        selectedDoctor.email
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add / Edit Doctor Modal */}

            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={resetForm}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <div className="flex items-center justify-between border-b border-slate-100 p-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">
                                    {editingDoctor
                                        ? "Edit Doctor"
                                        : "Add New Doctor"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {editingDoctor
                                        ? "Update doctor information."
                                        : "Enter doctor information."}
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

                                {/* Name */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>

                                    <input
                                        required
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Dr. John Smith"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Specialty */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Specialty
                                    </label>

                                    <input
                                        required
                                        name="specialty"
                                        value={
                                            formData.specialty
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Cardiologist"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Department */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Department
                                    </label>

                                    <select
                                        required
                                        name="department"
                                        value={
                                            formData.department
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select department
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
                                </div>

                                {/* Experience */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Experience
                                    </label>

                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        max="60"
                                        name="experience"
                                        value={
                                            formData.experience
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="Years"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Phone */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Phone Number
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
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Email */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Email
                                    </label>

                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="doctor@medicare.com"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Fee */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Consultation Fee
                                    </label>

                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        name="fee"
                                        value={
                                            formData.fee
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="₹ Consultation fee"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Availability */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Availability
                                    </label>

                                    <select
                                        name="availability"
                                        value={
                                            formData.availability
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Available">
                                            Available
                                        </option>

                                        <option value="Busy">
                                            Busy
                                        </option>

                                        <option value="Unavailable">
                                            Unavailable
                                        </option>
                                    </select>
                                </div>

                                {/* Schedule */}

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Working Schedule
                                    </label>

                                    <input
                                        required
                                        name="schedule"
                                        value={
                                            formData.schedule
                                        }
                                        onChange={
                                            handleFormChange
                                        }
                                        placeholder="09:00 AM - 03:00 PM"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                    {editingDoctor
                                        ? "Save Changes"
                                        : "Add Doctor"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Doctors;