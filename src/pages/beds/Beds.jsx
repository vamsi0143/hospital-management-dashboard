import { useMemo, useState } from "react";
import {
    FiActivity,
    FiEdit2,
    FiEye,
    FiGrid,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiUser,
    FiX,
} from "react-icons/fi";

const initialBeds = [
    {
        id: "BED-101",
        number: "A-101",
        ward: "General Ward",
        floor: "1st Floor",
        type: "Standard",
        status: "Available",
        patient: "",
        admissionDate: "",
    },
    {
        id: "BED-102",
        number: "A-102",
        ward: "General Ward",
        floor: "1st Floor",
        type: "Standard",
        status: "Occupied",
        patient: "Rajesh Kumar",
        admissionDate: "2026-08-08",
    },
    {
        id: "BED-103",
        number: "A-103",
        ward: "General Ward",
        floor: "1st Floor",
        type: "Standard",
        status: "Available",
        patient: "",
        admissionDate: "",
    },
    {
        id: "BED-104",
        number: "A-104",
        ward: "General Ward",
        floor: "1st Floor",
        type: "Standard",
        status: "Reserved",
        patient: "Sowmya Rao",
        admissionDate: "2026-08-11",
    },
    {
        id: "BED-201",
        number: "B-201",
        ward: "ICU",
        floor: "2nd Floor",
        type: "ICU",
        status: "Occupied",
        patient: "Kiran Reddy",
        admissionDate: "2026-08-07",
    },
    {
        id: "BED-202",
        number: "B-202",
        ward: "ICU",
        floor: "2nd Floor",
        type: "ICU",
        status: "Available",
        patient: "",
        admissionDate: "",
    },
    {
        id: "BED-203",
        number: "B-203",
        ward: "ICU",
        floor: "2nd Floor",
        type: "ICU",
        status: "Maintenance",
        patient: "",
        admissionDate: "",
    },
    {
        id: "BED-204",
        number: "B-204",
        ward: "ICU",
        floor: "2nd Floor",
        type: "ICU",
        status: "Occupied",
        patient: "Vijay Kumar",
        admissionDate: "2026-08-06",
    },
    {
        id: "BED-301",
        number: "C-301",
        ward: "Private Ward",
        floor: "3rd Floor",
        type: "Private",
        status: "Available",
        patient: "",
        admissionDate: "",
    },
    {
        id: "BED-302",
        number: "C-302",
        ward: "Private Ward",
        floor: "3rd Floor",
        type: "Private",
        status: "Occupied",
        patient: "Anjali Sharma",
        admissionDate: "2026-08-09",
    },
    {
        id: "BED-303",
        number: "C-303",
        ward: "Private Ward",
        floor: "3rd Floor",
        type: "Private",
        status: "Reserved",
        patient: "Meena Patel",
        admissionDate: "2026-08-12",
    },
    {
        id: "BED-304",
        number: "C-304",
        ward: "Private Ward",
        floor: "3rd Floor",
        type: "Private",
        status: "Available",
        patient: "",
        admissionDate: "",
    },
];

const wardOptions = [
    "General Ward",
    "ICU",
    "Private Ward",
    "Emergency",
    "Maternity",
];

const bedTypes = [
    "Standard",
    "ICU",
    "Private",
    "Emergency",
];

function Beds() {
    const [beds, setBeds] = useState(initialBeds);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [wardFilter, setWardFilter] =
        useState("All");

    const [openMenu, setOpenMenu] = useState(null);

    const [selectedBed, setSelectedBed] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [editingBed, setEditingBed] =
        useState(null);

    const [formData, setFormData] = useState({
        number: "",
        ward: "",
        floor: "",
        type: "Standard",
        status: "Available",
        patient: "",
        admissionDate: "",
    });

    const filteredBeds = useMemo(() => {
        return beds.filter((bed) => {
            const searchValue =
                search.toLowerCase();

            const matchesSearch =
                bed.number
                    .toLowerCase()
                    .includes(searchValue) ||
                bed.id
                    .toLowerCase()
                    .includes(searchValue) ||
                bed.patient
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                bed.status === statusFilter;

            const matchesWard =
                wardFilter === "All" ||
                bed.ward === wardFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesWard
            );
        });
    }, [
        beds,
        search,
        statusFilter,
        wardFilter,
    ]);

    const totalBeds = beds.length;

    const availableBeds = beds.filter(
        (bed) => bed.status === "Available"
    ).length;

    const occupiedBeds = beds.filter(
        (bed) => bed.status === "Occupied"
    ).length;

    const reservedBeds = beds.filter(
        (bed) => bed.status === "Reserved"
    ).length;

    const maintenanceBeds = beds.filter(
        (bed) => bed.status === "Maintenance"
    ).length;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData({
            number: "",
            ward: "",
            floor: "",
            type: "Standard",
            status: "Available",
            patient: "",
            admissionDate: "",
        });

        setEditingBed(null);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingBed) {
            setBeds((current) =>
                current.map((bed) =>
                    bed.id === editingBed.id
                        ? {
                            ...bed,
                            ...formData,
                        }
                        : bed
                )
            );
        } else {
            const newBed = {
                id: `BED-${String(
                    beds.length + 101
                )}`,
                ...formData,
            };

            setBeds((current) => [
                ...current,
                newBed,
            ]);
        }

        resetForm();
    };

    const openEdit = (bed) => {
        setEditingBed(bed);

        setFormData({
            number: bed.number,
            ward: bed.ward,
            floor: bed.floor,
            type: bed.type,
            status: bed.status,
            patient: bed.patient,
            admissionDate:
                bed.admissionDate,
        });

        setOpenMenu(null);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this bed?"
        );

        if (!confirmed) {
            return;
        }

        setBeds((current) =>
            current.filter(
                (bed) => bed.id !== id
            )
        );

        setOpenMenu(null);
    };

    const changeStatus = (
        id,
        status
    ) => {
        setBeds((current) =>
            current.map((bed) =>
                bed.id === id
                    ? {
                        ...bed,
                        status,
                    }
                    : bed
            )
        );

        setOpenMenu(null);
    };

    const getStatusClasses = (status) => {
        if (status === "Available") {
            return {
                badge:
                    "bg-emerald-50 text-emerald-600",
                card:
                    "border-emerald-100 hover:border-emerald-300",
                icon:
                    "bg-emerald-50 text-emerald-600",
            };
        }

        if (status === "Occupied") {
            return {
                badge:
                    "bg-blue-50 text-blue-600",
                card:
                    "border-blue-100 hover:border-blue-300",
                icon:
                    "bg-blue-50 text-blue-600",
            };
        }

        if (status === "Reserved") {
            return {
                badge:
                    "bg-amber-50 text-amber-600",
                card:
                    "border-amber-100 hover:border-amber-300",
                icon:
                    "bg-amber-50 text-amber-600",
            };
        }

        return {
            badge:
                "bg-red-50 text-red-500",
            card:
                "border-red-100 hover:border-red-300",
            icon:
                "bg-red-50 text-red-500",
        };
    };

    return (
        <div className="space-y-6">

            {/* Page Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Hospital Capacity
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Bed Management
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Monitor and manage hospital
                        beds and room availability.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setEditingBed(null);
                        setShowForm(true);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiPlus size={18} />
                    Add Bed
                </button>

            </div>

            {/* Summary Cards */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Beds
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {totalBeds}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiGrid size={20} />
                        </div>

                    </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Available
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                        {availableBeds}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Ready for patients
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Occupied
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-blue-600">
                        {occupiedBeds}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Currently in use
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Reserved
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-amber-500">
                        {reservedBeds}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Reserved beds
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Maintenance
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-red-500">
                        {maintenanceBeds}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Temporarily unavailable
                    </p>

                </div>

            </div>

            {/* Filters */}

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                <div className="grid gap-3 md:grid-cols-[1fr_220px_220px]">

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
                            placeholder="Search bed number or patient..."
                            className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <select
                        value={wardFilter}
                        onChange={(event) =>
                            setWardFilter(
                                event.target.value
                            )
                        }
                        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                    >
                        <option value="All">
                            All Wards
                        </option>

                        {wardOptions.map(
                            (ward) => (
                                <option
                                    key={ward}
                                    value={ward}
                                >
                                    {ward}
                                </option>
                            )
                        )}

                    </select>

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

                        <option value="Available">
                            Available
                        </option>

                        <option value="Occupied">
                            Occupied
                        </option>

                        <option value="Reserved">
                            Reserved
                        </option>

                        <option value="Maintenance">
                            Maintenance
                        </option>

                    </select>

                </div>

            </div>

            {/* Bed Grid */}

            <div>

                <div className="mb-4 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            Hospital Beds
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            {filteredBeds.length} beds
                            displayed
                        </p>
                    </div>

                    <div className="hidden items-center gap-4 text-xs text-slate-500 sm:flex">

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            Available
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                            Occupied
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                            Reserved
                        </div>

                    </div>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                    {filteredBeds.map(
                        (bed) => {
                            const styles =
                                getStatusClasses(
                                    bed.status
                                );

                            return (
                                <div
                                    key={bed.id}
                                    className={`relative rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
                                >

                                    {/* Card Header */}

                                    <div className="flex items-start justify-between">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}
                                            >
                                                <FiActivity
                                                    size={
                                                        20
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-medium text-slate-400">
                                                    Bed
                                                </p>

                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {
                                                        bed.number
                                                    }
                                                </h3>
                                            </div>

                                        </div>

                                        <div className="relative">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            bed.id
                                                            ? null
                                                            : bed.id
                                                    )
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                                            >
                                                <FiMoreVertical
                                                    size={
                                                        17
                                                    }
                                                />
                                            </button>

                                            {openMenu ===
                                                bed.id && (
                                                    <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-slate-100 bg-white p-1 shadow-xl">

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedBed(
                                                                    bed
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
                                                            View Details
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEdit(
                                                                    bed
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                                                        >
                                                            <FiEdit2
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                            Edit Bed
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                changeStatus(
                                                                    bed.id,
                                                                    "Available"
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                                                        >
                                                            Available
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                changeStatus(
                                                                    bed.id,
                                                                    "Maintenance"
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-amber-600 hover:bg-amber-50"
                                                        >
                                                            Maintenance
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    bed.id
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

                                        </div>

                                    </div>

                                    {/* Status */}

                                    <div className="mt-4">

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
                                        >
                                            {
                                                bed.status
                                            }
                                        </span>

                                    </div>

                                    {/* Information */}

                                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-4">

                                        <div className="flex items-center justify-between">

                                            <span className="text-xs text-slate-400">
                                                Ward
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {
                                                    bed.ward
                                                }
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span className="text-xs text-slate-400">
                                                Floor
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {
                                                    bed.floor
                                                }
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span className="text-xs text-slate-400">
                                                Type
                                            </span>

                                            <span className="text-sm font-medium text-slate-700">
                                                {
                                                    bed.type
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    {/* Patient */}

                                    {bed.patient ? (
                                        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                                                <FiUser
                                                    size={
                                                        16
                                                    }
                                                />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="text-xs text-slate-400">
                                                    Patient
                                                </p>

                                                <p className="truncate text-sm font-semibold text-slate-700">
                                                    {
                                                        bed.patient
                                                    }
                                                </p>

                                            </div>

                                        </div>
                                    ) : (
                                        <div className="mt-4 rounded-xl bg-emerald-50 p-3">

                                            <p className="text-xs font-medium text-emerald-600">
                                                Ready for
                                                admission
                                            </p>

                                            <p className="mt-1 text-xs text-emerald-500">
                                                No patient
                                                assigned
                                            </p>

                                        </div>
                                    )}

                                </div>
                            );
                        }
                    )}

                </div>

                {/* Empty State */}

                {filteredBeds.length ===
                    0 && (
                        <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <FiGrid
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-700">
                                No beds found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your
                                search or filters.
                            </p>

                        </div>
                    )}

            </div>

            {/* View Bed Modal */}

            {selectedBed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedBed(null)
                    }
                >

                    <div
                        className="w-full max-w-md rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="flex items-center justify-between border-b border-slate-100 p-6">

                            <div>
                                <p className="text-xs font-semibold text-blue-600">
                                    BED DETAILS
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                    {
                                        selectedBed.number
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedBed(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>

                        </div>

                        <div className="space-y-5 p-6">

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-slate-400">
                                    Status
                                </span>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                        selectedBed.status
                                    ).badge
                                        }`}
                                >
                                    {
                                        selectedBed.status
                                    }
                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Ward
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedBed.ward
                                        }
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <p className="text-xs text-slate-400">
                                        Floor
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedBed.floor
                                        }
                                    </p>
                                </div>

                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">

                                <p className="text-xs text-slate-400">
                                    Bed Type
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-700">
                                    {
                                        selectedBed.type
                                    }
                                </p>

                            </div>

                            {selectedBed.patient && (
                                <div className="rounded-xl bg-blue-50 p-4">

                                    <p className="text-xs text-blue-500">
                                        Current Patient
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-blue-700">
                                        {
                                            selectedBed.patient
                                        }
                                    </p>

                                    <p className="mt-1 text-xs text-blue-400">
                                        Admission:{" "}
                                        {
                                            selectedBed.admissionDate
                                        }
                                    </p>

                                </div>
                            )}

                        </div>

                    </div>

                </div>
            )}

            {/* Add / Edit Bed Modal */}

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
                                    {editingBed
                                        ? "Edit Bed"
                                        : "Add New Bed"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Enter the bed
                                    information below.
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

                                {/* Bed Number */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Bed Number
                                    </label>

                                    <input
                                        required
                                        type="text"
                                        name="number"
                                        value={
                                            formData.number
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Example: A-105"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Ward */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Ward
                                    </label>

                                    <select
                                        required
                                        name="ward"
                                        value={
                                            formData.ward
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select ward
                                        </option>

                                        {wardOptions.map(
                                            (ward) => (
                                                <option
                                                    key={
                                                        ward
                                                    }
                                                    value={
                                                        ward
                                                    }
                                                >
                                                    {ward}
                                                </option>
                                            )
                                        )}

                                    </select>
                                </div>

                                {/* Floor */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Floor
                                    </label>

                                    <input
                                        required
                                        type="text"
                                        name="floor"
                                        value={
                                            formData.floor
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Example: 1st Floor"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Type */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Bed Type
                                    </label>

                                    <select
                                        name="type"
                                        value={
                                            formData.type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        {bedTypes.map(
                                            (type) => (
                                                <option
                                                    key={
                                                        type
                                                    }
                                                    value={
                                                        type
                                                    }
                                                >
                                                    {type}
                                                </option>
                                            )
                                        )}

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
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="Available">
                                            Available
                                        </option>

                                        <option value="Occupied">
                                            Occupied
                                        </option>

                                        <option value="Reserved">
                                            Reserved
                                        </option>

                                        <option value="Maintenance">
                                            Maintenance
                                        </option>

                                    </select>
                                </div>

                                {/* Patient */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Patient Name
                                    </label>

                                    <input
                                        type="text"
                                        name="patient"
                                        value={
                                            formData.patient
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Leave empty if available"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Admission Date */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Admission Date
                                    </label>

                                    <input
                                        type="date"
                                        name="admissionDate"
                                        value={
                                            formData.admissionDate
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                            </div>

                            {/* Buttons */}

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
                                    {editingBed
                                        ? "Save Changes"
                                        : "Add Bed"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Beds;