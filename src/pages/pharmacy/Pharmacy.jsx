import { useMemo, useState } from "react";
import {
    FiAlertTriangle,
    FiCalendar,
    FiEdit2,
    FiEye,
    FiMoreVertical,
    FiPackage,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiX,
} from "react-icons/fi";

const initialMedicines = [
    {
        id: "MED-001",
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        manufacturer: "Cipla",
        batch: "PCM500A21",
        quantity: 240,
        reorderLevel: 50,
        price: 2.5,
        expiry: "2027-05-20",
        status: "In Stock",
    },
    {
        id: "MED-002",
        name: "Amoxicillin 500mg",
        category: "Antibiotic",
        manufacturer: "Sun Pharma",
        batch: "AMX500B14",
        quantity: 35,
        reorderLevel: 50,
        price: 8.75,
        expiry: "2027-02-15",
        status: "Low Stock",
    },
    {
        id: "MED-003",
        name: "Azithromycin 250mg",
        category: "Antibiotic",
        manufacturer: "Zydus",
        batch: "AZI250C11",
        quantity: 120,
        reorderLevel: 30,
        price: 12.5,
        expiry: "2027-08-10",
        status: "In Stock",
    },
    {
        id: "MED-004",
        name: "Metformin 500mg",
        category: "Diabetes",
        manufacturer: "USV",
        batch: "MET500D18",
        quantity: 18,
        reorderLevel: 40,
        price: 4.2,
        expiry: "2026-11-18",
        status: "Low Stock",
    },
    {
        id: "MED-005",
        name: "Amlodipine 5mg",
        category: "Cardiac",
        manufacturer: "Dr. Reddy's",
        batch: "AML5E10",
        quantity: 95,
        reorderLevel: 25,
        price: 3.6,
        expiry: "2027-04-12",
        status: "In Stock",
    },
    {
        id: "MED-006",
        name: "Pantoprazole 40mg",
        category: "Gastric",
        manufacturer: "Lupin",
        batch: "PAN40F16",
        quantity: 65,
        reorderLevel: 30,
        price: 5.25,
        expiry: "2026-12-05",
        status: "Expiring Soon",
    },
    {
        id: "MED-007",
        name: "Insulin Glargine",
        category: "Diabetes",
        manufacturer: "Sanofi",
        batch: "INS10G22",
        quantity: 12,
        reorderLevel: 20,
        price: 425,
        expiry: "2026-10-25",
        status: "Low Stock",
    },
    {
        id: "MED-008",
        name: "Cetirizine 10mg",
        category: "Allergy",
        manufacturer: "Cipla",
        batch: "CET10H19",
        quantity: 180,
        reorderLevel: 40,
        price: 1.8,
        expiry: "2027-09-30",
        status: "In Stock",
    },
    {
        id: "MED-009",
        name: "Atorvastatin 20mg",
        category: "Cardiac",
        manufacturer: "Zydus",
        batch: "ATO20I15",
        quantity: 48,
        reorderLevel: 30,
        price: 6.4,
        expiry: "2026-09-20",
        status: "Expiring Soon",
    },
    {
        id: "MED-010",
        name: "ORS Sachet",
        category: "General",
        manufacturer: "Electral",
        batch: "ORS10J20",
        quantity: 300,
        reorderLevel: 60,
        price: 20,
        expiry: "2027-12-15",
        status: "In Stock",
    },
];

const categories = [
    "Pain Relief",
    "Antibiotic",
    "Diabetes",
    "Cardiac",
    "Gastric",
    "Allergy",
    "General",
];

function Pharmacy() {
    const [medicines, setMedicines] =
        useState(initialMedicines);

    const [search, setSearch] = useState("");

    const [categoryFilter, setCategoryFilter] =
        useState("All");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [openMenu, setOpenMenu] =
        useState(null);

    const [selectedMedicine, setSelectedMedicine] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [editingMedicine, setEditingMedicine] =
        useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        manufacturer: "",
        batch: "",
        quantity: "",
        reorderLevel: "",
        price: "",
        expiry: "",
        status: "In Stock",
    });

    const filteredMedicines = useMemo(() => {
        return medicines.filter((medicine) => {
            const searchValue =
                search.toLowerCase();

            const matchesSearch =
                medicine.name
                    .toLowerCase()
                    .includes(searchValue) ||
                medicine.manufacturer
                    .toLowerCase()
                    .includes(searchValue) ||
                medicine.batch
                    .toLowerCase()
                    .includes(searchValue) ||
                medicine.id
                    .toLowerCase()
                    .includes(searchValue);

            const matchesCategory =
                categoryFilter === "All" ||
                medicine.category ===
                categoryFilter;

            const matchesStatus =
                statusFilter === "All" ||
                medicine.status === statusFilter;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [
        medicines,
        search,
        categoryFilter,
        statusFilter,
    ]);

    const totalMedicines = medicines.length;

    const totalStock = medicines.reduce(
        (total, medicine) =>
            total + Number(medicine.quantity),
        0
    );

    const lowStock = medicines.filter(
        (medicine) =>
            medicine.quantity <=
            medicine.reorderLevel
    ).length;

    const expiringSoon = medicines.filter(
        (medicine) =>
            medicine.status ===
            "Expiring Soon"
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
            name: "",
            category: "",
            manufacturer: "",
            batch: "",
            quantity: "",
            reorderLevel: "",
            price: "",
            expiry: "",
            status: "In Stock",
        });

        setEditingMedicine(null);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingMedicine) {
            setMedicines((current) =>
                current.map((medicine) =>
                    medicine.id ===
                        editingMedicine.id
                        ? {
                            ...medicine,
                            ...formData,
                            quantity:
                                Number(
                                    formData.quantity
                                ),
                            reorderLevel:
                                Number(
                                    formData.reorderLevel
                                ),
                            price:
                                Number(
                                    formData.price
                                ),
                        }
                        : medicine
                )
            );
        } else {
            const newMedicine = {
                id: `MED-${String(
                    medicines.length + 1
                ).padStart(3, "0")}`,
                ...formData,
                quantity:
                    Number(formData.quantity),
                reorderLevel:
                    Number(
                        formData.reorderLevel
                    ),
                price: Number(formData.price),
            };

            setMedicines((current) => [
                ...current,
                newMedicine,
            ]);
        }

        resetForm();
    };

    const openEdit = (medicine) => {
        setEditingMedicine(medicine);

        setFormData({
            name: medicine.name,
            category: medicine.category,
            manufacturer:
                medicine.manufacturer,
            batch: medicine.batch,
            quantity: String(
                medicine.quantity
            ),
            reorderLevel: String(
                medicine.reorderLevel
            ),
            price: String(medicine.price),
            expiry: medicine.expiry,
            status: medicine.status,
        });

        setOpenMenu(null);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this medicine?"
        );

        if (!confirmed) {
            return;
        }

        setMedicines((current) =>
            current.filter(
                (medicine) =>
                    medicine.id !== id
            )
        );

        setOpenMenu(null);
    };

    const getStockStatus = (medicine) => {
        if (
            medicine.status ===
            "Expiring Soon"
        ) {
            return "Expiring Soon";
        }

        if (
            medicine.quantity <=
            medicine.reorderLevel
        ) {
            return "Low Stock";
        }

        return "In Stock";
    };

    const getStatusClasses = (status) => {
        if (status === "In Stock") {
            return "bg-emerald-50 text-emerald-600";
        }

        if (status === "Low Stock") {
            return "bg-amber-50 text-amber-600";
        }

        return "bg-red-50 text-red-500";
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Pharmacy & Inventory
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Pharmacy
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage medicines, stock levels,
                        batches and expiry dates.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setShowForm(true)
                    }
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiPlus size={18} />
                    Add Medicine
                </button>

            </div>

            {/* Summary Cards */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Medicine Types
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {totalMedicines}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiPackage size={20} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Total Stock
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                        {totalStock}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Units available
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Low Stock
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-amber-500">
                        {lowStock}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Need reordering
                    </p>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Expiring Soon
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-red-500">
                        {expiringSoon}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Check expiry dates
                    </p>

                </div>

            </div>

            {/* Filters */}

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                <div className="grid gap-3 lg:grid-cols-[1fr_220px_190px]">

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
                            placeholder="Search medicine, manufacturer or batch..."
                            className="h-11 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    <select
                        value={categoryFilter}
                        onChange={(event) =>
                            setCategoryFilter(
                                event.target.value
                            )
                        }
                        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                    >
                        <option value="All">
                            All Categories
                        </option>

                        {categories.map(
                            (category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
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
                            All Stock
                        </option>

                        <option value="In Stock">
                            In Stock
                        </option>

                        <option value="Low Stock">
                            Low Stock
                        </option>

                        <option value="Expiring Soon">
                            Expiring Soon
                        </option>

                    </select>

                </div>

            </div>

            {/* Medicine Table */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Medicine Inventory
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                {filteredMedicines.length}{" "}
                                medicines displayed
                            </p>
                        </div>

                        <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 sm:flex">
                            <FiPackage size={14} />
                            Pharmacy Stock
                        </div>

                    </div>

                </div>

                {/* Desktop Table */}

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full min-w-[1050px]">

                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Medicine
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Category
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Batch
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Stock
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Price
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Expiry
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

                            {filteredMedicines.map(
                                (medicine) => {
                                    const status =
                                        getStockStatus(
                                            medicine
                                        );

                                    return (
                                        <tr
                                            key={
                                                medicine.id
                                            }
                                            className="border-b border-slate-100 transition hover:bg-slate-50/70"
                                        >

                                            <td className="px-6 py-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                        <FiPackage
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-700">
                                                            {
                                                                medicine.name
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {
                                                                medicine.manufacturer
                                                            }
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>

                                            <td className="px-4 py-4">

                                                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                    {
                                                        medicine.category
                                                    }
                                                </span>

                                            </td>

                                            <td className="px-4 py-4">

                                                <p className="text-sm font-medium text-slate-600">
                                                    {
                                                        medicine.batch
                                                    }
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {
                                                        medicine.id
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-4 py-4">

                                                <p className="text-sm font-semibold text-slate-700">
                                                    {
                                                        medicine.quantity
                                                    }{" "}
                                                    units
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Reorder at{" "}
                                                    {
                                                        medicine.reorderLevel
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-4 py-4">

                                                <p className="text-sm font-semibold text-slate-700">
                                                    ₹
                                                    {
                                                        medicine.price
                                                    }
                                                </p>

                                            </td>

                                            <td className="px-4 py-4">

                                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                    <FiCalendar
                                                        size={
                                                            14
                                                        }
                                                        className="text-slate-400"
                                                    />

                                                    {
                                                        medicine.expiry
                                                    }
                                                </div>

                                            </td>

                                            <td className="px-4 py-4">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                        status
                                                    )}`}
                                                >
                                                    {
                                                        status
                                                    }
                                                </span>

                                            </td>

                                            <td className="relative px-6 py-4 text-right">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu ===
                                                                medicine.id
                                                                ? null
                                                                : medicine.id
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
                                                    medicine.id && (
                                                        <div className="absolute right-6 top-14 z-30 w-40 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl">

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedMedicine(
                                                                        medicine
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
                                                                    openEdit(
                                                                        medicine
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
                                                                        medicine.id
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
                                    );
                                }
                            )}

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}

                <div className="divide-y divide-slate-100 md:hidden">

                    {filteredMedicines.map(
                        (medicine) => {
                            const status =
                                getStockStatus(
                                    medicine
                                );

                            return (
                                <div
                                    key={
                                        medicine.id
                                    }
                                    className="p-5"
                                >

                                    <div className="flex items-start justify-between">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <FiPackage
                                                    size={
                                                        18
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-slate-800">
                                                    {
                                                        medicine.name
                                                    }
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    {
                                                        medicine.manufacturer
                                                    }
                                                </p>
                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedMedicine(
                                                    medicine
                                                )
                                            }
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                                        >
                                            <FiEye
                                                size={
                                                    17
                                                }
                                            />
                                        </button>

                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Category
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-slate-600">
                                                {
                                                    medicine.category
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Stock
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-slate-700">
                                                {
                                                    medicine.quantity
                                                }{" "}
                                                units
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Expiry
                                            </p>

                                            <p className="mt-1 text-sm text-slate-600">
                                                {
                                                    medicine.expiry
                                                }
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-400">
                                                Status
                                            </p>

                                            <span
                                                className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                    status
                                                )}`}
                                            >
                                                {
                                                    status
                                                }
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

                {filteredMedicines.length ===
                    0 && (
                        <div className="p-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <FiPackage
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-700">
                                No medicines found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search
                                or filters.
                            </p>

                        </div>
                    )}

            </div>

            {/* View Medicine Modal */}

            {selectedMedicine && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedMedicine(null)
                    }
                >

                    <div
                        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="flex items-center justify-between border-b border-slate-100 p-6">

                            <div>
                                <p className="text-xs font-semibold text-blue-600">
                                    MEDICINE DETAILS
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-800">
                                    {
                                        selectedMedicine.name
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedMedicine(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>

                        </div>

                        <div className="space-y-4 p-6">

                            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Current Stock
                                    </p>

                                    <p className="mt-1 text-xl font-bold text-slate-800">
                                        {
                                            selectedMedicine.quantity
                                        }{" "}
                                        units
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                        getStockStatus(
                                            selectedMedicine
                                        )
                                    )}`}
                                >
                                    {
                                        getStockStatus(
                                            selectedMedicine
                                        )
                                    }
                                </span>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div className="rounded-xl border border-slate-100 p-4">

                                    <p className="text-xs text-slate-400">
                                        Category
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedMedicine.category
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-100 p-4">

                                    <p className="text-xs text-slate-400">
                                        Manufacturer
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedMedicine.manufacturer
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-100 p-4">

                                    <p className="text-xs text-slate-400">
                                        Batch
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedMedicine.batch
                                        }
                                    </p>

                                </div>

                                <div className="rounded-xl border border-slate-100 p-4">

                                    <p className="text-xs text-slate-400">
                                        Reorder Level
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedMedicine.reorderLevel
                                        }
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">

                                <div>
                                    <p className="text-xs text-blue-400">
                                        Price
                                    </p>

                                    <p className="mt-1 font-bold text-blue-700">
                                        ₹
                                        {
                                            selectedMedicine.price
                                        }
                                    </p>
                                </div>

                                <div className="text-right">

                                    <p className="text-xs text-blue-400">
                                        Expiry Date
                                    </p>

                                    <p className="mt-1 font-semibold text-blue-700">
                                        {
                                            selectedMedicine.expiry
                                        }
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* Add / Edit Medicine Modal */}

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
                                    {editingMedicine
                                        ? "Edit Medicine"
                                        : "Add Medicine"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage medicine
                                    inventory information.
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

                                {/* Medicine Name */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Medicine Name
                                    </label>

                                    <input
                                        required
                                        name="name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter medicine name"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Category */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Category
                                    </label>

                                    <select
                                        required
                                        name="category"
                                        value={
                                            formData.category
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map(
                                            (category) => (
                                                <option
                                                    key={
                                                        category
                                                    }
                                                    value={
                                                        category
                                                    }
                                                >
                                                    {
                                                        category
                                                    }
                                                </option>
                                            )
                                        )}

                                    </select>
                                </div>

                                {/* Manufacturer */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Manufacturer
                                    </label>

                                    <input
                                        required
                                        name="manufacturer"
                                        value={
                                            formData.manufacturer
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Company name"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Batch */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Batch Number
                                    </label>

                                    <input
                                        required
                                        name="batch"
                                        value={
                                            formData.batch
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Example: PCM500A21"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Quantity */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Quantity
                                    </label>

                                    <input
                                        required
                                        min="0"
                                        type="number"
                                        name="quantity"
                                        value={
                                            formData.quantity
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter quantity"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Reorder Level */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Reorder Level
                                    </label>

                                    <input
                                        required
                                        min="0"
                                        type="number"
                                        name="reorderLevel"
                                        value={
                                            formData.reorderLevel
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Example: 50"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Price */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Price
                                    </label>

                                    <input
                                        required
                                        min="0"
                                        step="0.01"
                                        type="number"
                                        name="price"
                                        value={
                                            formData.price
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="₹ 0.00"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Expiry */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Expiry Date
                                    </label>

                                    <input
                                        required
                                        type="date"
                                        name="expiry"
                                        value={
                                            formData.expiry
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Status */}

                                <div className="sm:col-span-2">

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Stock Status
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
                                        <option value="In Stock">
                                            In Stock
                                        </option>

                                        <option value="Low Stock">
                                            Low Stock
                                        </option>

                                        <option value="Expiring Soon">
                                            Expiring Soon
                                        </option>

                                    </select>

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
                                    {editingMedicine
                                        ? "Save Changes"
                                        : "Add Medicine"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Pharmacy;