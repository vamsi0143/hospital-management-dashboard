import { useMemo, useState } from "react";
import {
    FiChevronLeft,
    FiChevronRight,
    FiEdit2,
    FiEye,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiUsers,
    FiX,
} from "react-icons/fi";

const initialPatients = [
    {
        id: "PT-001",
        name: "Rahul Kumar",
        age: 34,
        gender: "Male",
        phone: "9876543210",
        email: "rahul.kumar@email.com",
        bloodGroup: "O+",
        department: "Cardiology",
        status: "Active",
        lastVisit: "08 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=11",
    },
    {
        id: "PT-002",
        name: "Priya Reddy",
        age: 29,
        gender: "Female",
        phone: "9876501234",
        email: "priya.reddy@email.com",
        bloodGroup: "B+",
        department: "Neurology",
        status: "Active",
        lastVisit: "07 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=47",
    },
    {
        id: "PT-003",
        name: "Arjun Mehta",
        age: 45,
        gender: "Male",
        phone: "9123456780",
        email: "arjun.mehta@email.com",
        bloodGroup: "A+",
        department: "Orthopedics",
        status: "Inactive",
        lastVisit: "02 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=12",
    },
    {
        id: "PT-004",
        name: "Sneha Rao",
        age: 31,
        gender: "Female",
        phone: "9988776655",
        email: "sneha.rao@email.com",
        bloodGroup: "AB+",
        department: "Pediatrics",
        status: "Active",
        lastVisit: "06 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=44",
    },
    {
        id: "PT-005",
        name: "Vikram Singh",
        age: 52,
        gender: "Male",
        phone: "9001122334",
        email: "vikram.singh@email.com",
        bloodGroup: "O-",
        department: "General Medicine",
        status: "Active",
        lastVisit: "05 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=13",
    },
    {
        id: "PT-006",
        name: "Ananya Sharma",
        age: 26,
        gender: "Female",
        phone: "9012345678",
        email: "ananya.sharma@email.com",
        bloodGroup: "A-",
        department: "Cardiology",
        status: "Active",
        lastVisit: "04 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=45",
    },
    {
        id: "PT-007",
        name: "Karthik Rao",
        age: 39,
        gender: "Male",
        phone: "9345678901",
        email: "karthik.rao@email.com",
        bloodGroup: "B-",
        department: "Neurology",
        status: "Inactive",
        lastVisit: "01 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=14",
    },
    {
        id: "PT-008",
        name: "Divya Patel",
        age: 33,
        gender: "Female",
        phone: "9456789012",
        email: "divya.patel@email.com",
        bloodGroup: "O+",
        department: "Orthopedics",
        status: "Active",
        lastVisit: "03 Aug 2026",
        image:
            "https://i.pravatar.cc/150?img=48",
    },
];

function Patients() {
    const [patients, setPatients] = useState(initialPatients);

    const [search, setSearch] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const [openMenu, setOpenMenu] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        bloodGroup: "",
        department: "",
    });

    const filteredPatients = useMemo(() => {
        return patients.filter((patient) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                patient.name.toLowerCase().includes(searchValue) ||
                patient.id.toLowerCase().includes(searchValue) ||
                patient.phone.includes(searchValue);

            const matchesGender =
                genderFilter === "All" ||
                patient.gender === genderFilter;

            const matchesStatus =
                statusFilter === "All" ||
                patient.status === statusFilter;

            return (
                matchesSearch &&
                matchesGender &&
                matchesStatus
            );
        });
    }, [
        patients,
        search,
        genderFilter,
        statusFilter,
    ]);

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmed) {
            return;
        }

        setPatients((current) =>
            current.filter((patient) => patient.id !== id)
        );

        setOpenMenu(null);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleAddPatient = (event) => {
        event.preventDefault();

        const newPatient = {
            id: `PT-${String(patients.length + 1).padStart(
                3,
                "0"
            )}`,
            name: formData.name,
            age: Number(formData.age),
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            bloodGroup: formData.bloodGroup,
            department: formData.department,
            status: "Active",
            lastVisit: "09 Aug 2026",
            image:
                "https://i.pravatar.cc/150?img=33",
        };

        setPatients((current) => [
            newPatient,
            ...current,
        ]);

        setFormData({
            name: "",
            age: "",
            gender: "",
            phone: "",
            email: "",
            bloodGroup: "",
            department: "",
        });

        setShowAddForm(false);
    };
    const handleEditPatient = (event) => {
        event.preventDefault();

        setPatients((current) =>
            current.map((patient) =>
                patient.id === editingPatient.id
                    ? {
                        ...patient,
                        name: formData.name,
                        age: Number(formData.age),
                        gender: formData.gender,
                        phone: formData.phone,
                        email: formData.email,
                        bloodGroup: formData.bloodGroup,
                        department: formData.department,
                    }
                    : patient
            )
        );

        setEditingPatient(null);

        setFormData({
            name: "",
            age: "",
            gender: "",
            phone: "",
            email: "",
            bloodGroup: "",
            department: "",
        });
    };
    const openEditPatient = (patient) => {
        setEditingPatient(patient);

        setFormData({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            phone: patient.phone,
            email: patient.email,
            bloodGroup: patient.bloodGroup,
            department: patient.department,
        });

        setOpenMenu(null);
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Patient Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Patients
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage patient records, information and activity.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiPlus size={18} />
                    Add New Patient
                </button>
            </div>

            {/* Summary */}

            <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                            Total Patients
                        </p>

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiUsers size={19} />
                        </div>
                    </div>

                    <h3 className="mt-3 text-2xl font-bold text-slate-800">
                        {patients.length}
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Active Patients
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-emerald-600">
                        {
                            patients.filter(
                                (patient) => patient.status === "Active"
                            ).length
                        }
                    </h3>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <p className="text-sm text-slate-500">
                        Inactive Patients
                    </p>

                    <h3 className="mt-3 text-2xl font-bold text-slate-700">
                        {
                            patients.filter(
                                (patient) => patient.status === "Inactive"
                            ).length
                        }
                    </h3>
                </div>
            </div>

            {/* Patient Table */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                {/* Filters */}

                <div className="border-b border-slate-100 p-5 sm:p-6">
                    <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px]">

                        {/* Search */}

                        <div className="relative">
                            <FiSearch
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search by name, ID or phone..."
                                className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Gender */}

                        <select
                            value={genderFilter}
                            onChange={(event) =>
                                setGenderFilter(event.target.value)
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="All">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        {/* Status */}

                        <select
                            value={statusFilter}
                            onChange={(event) =>
                                setStatusFilter(event.target.value)
                            }
                            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Desktop Table */}

                <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Patient
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Patient ID
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Phone
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Gender
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Department
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
                            {filteredPatients.map((patient) => (
                                <tr
                                    key={patient.id}
                                    className="border-b border-slate-100 transition hover:bg-slate-50/70"
                                >
                                    {/* Patient */}

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={patient.image}
                                                alt={patient.name}
                                                className="h-11 w-11 rounded-full object-cover"
                                            />

                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">
                                                    {patient.name}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {patient.age} years
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* ID */}

                                    <td className="px-4 py-4 text-sm font-medium text-slate-600">
                                        {patient.id}
                                    </td>

                                    {/* Phone */}

                                    <td className="px-4 py-4 text-sm text-slate-500">
                                        {patient.phone}
                                    </td>

                                    {/* Gender */}

                                    <td className="px-4 py-4 text-sm text-slate-500">
                                        {patient.gender}
                                    </td>

                                    {/* Department */}

                                    <td className="px-4 py-4 text-sm text-slate-500">
                                        {patient.department}
                                    </td>

                                    {/* Status */}

                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${patient.status === "Active"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {patient.status}
                                        </span>
                                    </td>

                                    {/* Action */}

                                    <td className="relative px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === patient.id
                                                        ? null
                                                        : patient.id
                                                )
                                            }
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            <FiMoreVertical size={18} />
                                        </button>

                                        {openMenu === patient.id && (
                                            <div className="absolute right-6 top-14 z-20 w-36 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedPatient(patient);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                >
                                                    <FiEye size={15} />
                                                    View
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditPatient(patient)}
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                >
                                                    <FiEdit2 size={15} />
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(patient.id)
                                                    }
                                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                                                >
                                                    <FiTrash2 size={15} />
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}

                <div className="divide-y divide-slate-100 md:hidden">
                    {filteredPatients.map((patient) => (
                        <div
                            key={patient.id}
                            className="p-5"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={patient.image}
                                        alt={patient.name}
                                        className="h-12 w-12 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold text-slate-800">
                                            {patient.name}
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            {patient.id} • {patient.age} years
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setSelectedPatient(patient)
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                                >
                                    <FiEye size={17} />
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-xs text-slate-400">
                                        Phone
                                    </p>

                                    <p className="mt-1 text-slate-600">
                                        {patient.phone}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Department
                                    </p>

                                    <p className="mt-1 text-slate-600">
                                        {patient.department}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Gender
                                    </p>

                                    <p className="mt-1 text-slate-600">
                                        {patient.gender}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Status
                                    </p>

                                    <span
                                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${patient.status === "Active"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {patient.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}

                {filteredPatients.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <FiUsers size={24} />
                        </div>

                        <h3 className="mt-4 text-base font-bold text-slate-700">
                            No patients found
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                            Try changing your search or filter.
                        </p>
                    </div>
                )}

                {/* Pagination */}

                {filteredPatients.length > 0 && (
                    <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <p className="text-xs text-slate-400">
                            Showing{" "}
                            <span className="font-semibold text-slate-600">
                                {filteredPatients.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-slate-600">
                                {patients.length}
                            </span>{" "}
                            patients
                        </p>

                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
                            >
                                <FiChevronLeft size={15} />
                            </button>

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-semibold text-white"
                            >
                                1
                            </button>

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50"
                            >
                                2
                            </button>

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-xs text-slate-500 hover:bg-slate-50"
                            >
                                3
                            </button>

                            <button
                                type="button"
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400"
                            >
                                <FiChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Patient Details Modal */}

            {selectedPatient && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedPatient(null)}
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
                                onClick={() => setSelectedPatient(null)}
                                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="px-6 pb-6">
                            <div className="-mt-12">
                                <img
                                    src={selectedPatient.image}
                                    alt={selectedPatient.name}
                                    className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-md"
                                />
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-slate-800">
                                    {selectedPatient.name}
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    {selectedPatient.id}
                                </p>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Age
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {selectedPatient.age} years
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Gender
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {selectedPatient.gender}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Blood Group
                                    </p>

                                    <p className="mt-1 font-semibold text-red-500">
                                        {selectedPatient.bloodGroup}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Department
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-700">
                                        {selectedPatient.department}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3 rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {selectedPatient.phone}
                                </p>

                                <p className="break-all text-sm text-slate-600">
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {selectedPatient.email}
                                </p>

                                <p className="text-sm text-slate-600">
                                    <span className="font-semibold">
                                        Last Visit:
                                    </span>{" "}
                                    {selectedPatient.lastVisit}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Patient Modal */}

            {(showAddForm || editingPatient) && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() => setShowAddForm(false)}
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
                                    {editingPatient
                                        ? "Edit Patient"
                                        : "Add New Patient"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {editingPatient
                                        ? "Update the patient's information."
                                        : "Enter the patient's information."}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>
                        </div>

                        <form
                            onSubmit={
                                editingPatient
                                    ? handleEditPatient
                                    : handleAddPatient
                            }
                            className="p-6"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Full Name
                                    </label>

                                    <input
                                        required
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        placeholder="Enter full name"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Age
                                    </label>

                                    <input
                                        required
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleFormChange}
                                        placeholder="Enter age"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Gender
                                    </label>

                                    <select
                                        required
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleFormChange}
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Phone Number
                                    </label>

                                    <input
                                        required
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        pattern="[0-9]{10}"
                                        placeholder="Enter phone number"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Email
                                    </label>

                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        placeholder="Enter email"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Blood Group
                                    </label>

                                    <select
                                        required
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleFormChange}
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select blood group
                                        </option>

                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Department
                                    </label>

                                    <select
                                        required
                                        name="department"
                                        value={formData.department}
                                        onChange={handleFormChange}
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

                                        <option value="Emergency Care">
                                            Emergency Care
                                        </option>

                                        <option value="General Medicine">
                                            General Medicine
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setEditingPatient(null);

                                        setFormData({
                                            name: "",
                                            age: "",
                                            gender: "",
                                            phone: "",
                                            email: "",
                                            bloodGroup: "",
                                            department: "",
                                        });
                                    }}
                                    className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    {editingPatient
                                        ? "Save Changes"
                                        : "Add Patient"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Patients;