import { useMemo, useState } from "react";
import {
    FiCheckCircle,
    FiCreditCard,
    FiEdit2,
    FiEye,
    FiFileText,
    FiMoreVertical,
    FiPlus,
    FiSearch,
    FiTrash2,
    FiX,
} from "react-icons/fi";

const initialInvoices = [
    {
        id: "INV-1001",
        patient: "Rahul Sharma",
        patientId: "PAT-001",
        service: "Cardiology Consultation",
        doctor: "Dr. Ananya Rao",
        date: "2026-08-08",
        amount: 4500,
        paymentMethod: "UPI",
        status: "Paid",
    },
    {
        id: "INV-1002",
        patient: "Priya Reddy",
        patientId: "PAT-002",
        service: "General Consultation",
        doctor: "Dr. Arjun Mehta",
        date: "2026-08-07",
        amount: 2500,
        paymentMethod: "Card",
        status: "Paid",
    },
    {
        id: "INV-1003",
        patient: "Suresh Kumar",
        patientId: "PAT-003",
        service: "Blood Test & Consultation",
        doctor: "Dr. Neha Kapoor",
        date: "2026-08-06",
        amount: 3200,
        paymentMethod: "Cash",
        status: "Pending",
    },
    {
        id: "INV-1004",
        patient: "Lakshmi Devi",
        patientId: "PAT-004",
        service: "Orthopedic Consultation",
        doctor: "Dr. Vikram Singh",
        date: "2026-08-05",
        amount: 3800,
        paymentMethod: "UPI",
        status: "Paid",
    },
    {
        id: "INV-1005",
        patient: "Mohammed Irfan",
        patientId: "PAT-005",
        service: "MRI Scan",
        doctor: "Dr. Ananya Rao",
        date: "2026-08-04",
        amount: 7500,
        paymentMethod: "Card",
        status: "Pending",
    },
    {
        id: "INV-1006",
        patient: "Kavya Nair",
        patientId: "PAT-006",
        service: "Dental Consultation",
        doctor: "Dr. Meera Joshi",
        date: "2026-08-03",
        amount: 1800,
        paymentMethod: "UPI",
        status: "Paid",
    },
    {
        id: "INV-1007",
        patient: "Ramesh Babu",
        patientId: "PAT-007",
        service: "Health Checkup",
        doctor: "Dr. Arjun Mehta",
        date: "2026-08-02",
        amount: 5200,
        paymentMethod: "Cash",
        status: "Pending",
    },
    {
        id: "INV-1008",
        patient: "Sneha Patel",
        patientId: "PAT-008",
        service: "Neurology Consultation",
        doctor: "Dr. Neha Kapoor",
        date: "2026-08-01",
        amount: 4200,
        paymentMethod: "Card",
        status: "Paid",
    },
];

const services = [
    "General Consultation",
    "Cardiology Consultation",
    "Orthopedic Consultation",
    "Neurology Consultation",
    "Dental Consultation",
    "Blood Test & Consultation",
    "MRI Scan",
    "Health Checkup",
];

function Billing() {
    const [invoices, setInvoices] =
        useState(initialInvoices);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [openMenu, setOpenMenu] =
        useState(null);

    const [selectedInvoice, setSelectedInvoice] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [editingInvoice, setEditingInvoice] =
        useState(null);

    const [formData, setFormData] = useState({
        patient: "",
        patientId: "",
        service: "",
        doctor: "",
        date: "",
        amount: "",
        paymentMethod: "UPI",
        status: "Paid",
    });

    const filteredInvoices = useMemo(() => {
        return invoices.filter((invoice) => {
            const searchValue =
                search.toLowerCase();

            const matchesSearch =
                invoice.id
                    .toLowerCase()
                    .includes(searchValue) ||
                invoice.patient
                    .toLowerCase()
                    .includes(searchValue) ||
                invoice.patientId
                    .toLowerCase()
                    .includes(searchValue) ||
                invoice.service
                    .toLowerCase()
                    .includes(searchValue);

            const matchesStatus =
                statusFilter === "All" ||
                invoice.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        invoices,
        search,
        statusFilter,
    ]);

    const totalRevenue = invoices
        .filter(
            (invoice) =>
                invoice.status === "Paid"
        )
        .reduce(
            (total, invoice) =>
                total + Number(invoice.amount),
            0
        );

    const totalInvoices = invoices.length;

    const paidInvoices = invoices.filter(
        (invoice) =>
            invoice.status === "Paid"
    ).length;

    const pendingInvoices = invoices.filter(
        (invoice) =>
            invoice.status === "Pending"
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
            patient: "",
            patientId: "",
            service: "",
            doctor: "",
            date: "",
            amount: "",
            paymentMethod: "UPI",
            status: "Paid",
        });

        setEditingInvoice(null);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (editingInvoice) {
            setInvoices((current) =>
                current.map((invoice) =>
                    invoice.id ===
                        editingInvoice.id
                        ? {
                            ...invoice,
                            ...formData,
                            amount: Number(
                                formData.amount
                            ),
                        }
                        : invoice
                )
            );
        } else {
            const newInvoice = {
                id: `INV-${1001 + invoices.length}`,
                ...formData,
                amount: Number(
                    formData.amount
                ),
            };

            setInvoices((current) => [
                ...current,
                newInvoice,
            ]);
        }

        resetForm();
    };

    const openEdit = (invoice) => {
        setEditingInvoice(invoice);

        setFormData({
            patient: invoice.patient,
            patientId: invoice.patientId,
            service: invoice.service,
            doctor: invoice.doctor,
            date: invoice.date,
            amount: String(invoice.amount),
            paymentMethod:
                invoice.paymentMethod,
            status: invoice.status,
        });

        setOpenMenu(null);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this invoice?"
        );

        if (!confirmed) {
            return;
        }

        setInvoices((current) =>
            current.filter(
                (invoice) =>
                    invoice.id !== id
            )
        );

        setOpenMenu(null);
    };

    const getStatusClasses = (status) => {
        if (status === "Paid") {
            return "bg-emerald-50 text-emerald-600";
        }

        return "bg-amber-50 text-amber-600";
    };

    const formatCurrency = (amount) => {
        return `₹${Number(amount).toLocaleString(
            "en-IN"
        )}`;
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Finance & Payments
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        Billing
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage hospital invoices,
                        payments and billing records.
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
                    Create Invoice
                </button>

            </div>

            {/* Summary */}

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Invoices
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-slate-800">
                                {totalInvoices}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiFileText size={20} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Paid Invoices
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                                {paidInvoices}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <FiCheckCircle size={20} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Pending
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-amber-500">
                                {pendingInvoices}
                            </h3>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                            <FiCreditCard size={20} />
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <p className="text-sm text-slate-500">
                        Paid Revenue
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-blue-600">
                        {formatCurrency(
                            totalRevenue
                        )}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        From completed payments
                    </p>

                </div>

            </div>

            {/* Filters */}

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                <div className="grid gap-3 lg:grid-cols-[1fr_220px]">

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
                            placeholder="Search invoice, patient or service..."
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
                            All Payment Status
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Pending">
                            Pending
                        </option>
                    </select>

                </div>

            </div>

            {/* Invoice Table */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <div className="flex items-center justify-between">

                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Recent Invoices
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                {filteredInvoices.length}{" "}
                                invoices displayed
                            </p>
                        </div>

                        <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 sm:flex">
                            <FiCreditCard size={14} />
                            Billing Records
                        </div>

                    </div>

                </div>

                {/* Desktop */}

                <div className="hidden overflow-x-auto md:block">

                    <table className="w-full min-w-[1050px]">

                        <thead>

                            <tr className="border-b border-slate-100 bg-slate-50/70">

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Invoice
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Patient
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Service
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Date
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Amount
                                </th>

                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                                    Payment
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

                            {filteredInvoices.map(
                                (invoice) => (
                                    <tr
                                        key={
                                            invoice.id
                                        }
                                        className="border-b border-slate-100 transition hover:bg-slate-50/70"
                                    >

                                        <td className="px-6 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                    <FiFileText
                                                        size={
                                                            18
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">
                                                        {
                                                            invoice.id
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        Invoice
                                                    </p>
                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="text-sm font-semibold text-slate-700">
                                                {
                                                    invoice.patient
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    invoice.patientId
                                                }
                                            </p>

                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="max-w-[220px] text-sm font-medium text-slate-600">
                                                {
                                                    invoice.service
                                                }
                                            </p>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    invoice.doctor
                                                }
                                            </p>

                                        </td>

                                        <td className="px-4 py-4 text-sm text-slate-600">
                                            {
                                                invoice.date
                                            }
                                        </td>

                                        <td className="px-4 py-4">

                                            <p className="text-sm font-bold text-slate-700">
                                                {formatCurrency(
                                                    invoice.amount
                                                )}
                                            </p>

                                        </td>

                                        <td className="px-4 py-4">

                                            <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                                                {
                                                    invoice.paymentMethod
                                                }
                                            </span>

                                        </td>

                                        <td className="px-4 py-4">

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                    invoice.status
                                                )}`}
                                            >
                                                {
                                                    invoice.status
                                                }
                                            </span>

                                        </td>

                                        <td className="relative px-6 py-4 text-right">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu ===
                                                            invoice.id
                                                            ? null
                                                            : invoice.id
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
                                                invoice.id && (
                                                    <div className="absolute right-6 top-14 z-30 w-40 rounded-xl border border-slate-100 bg-white p-1 text-left shadow-xl">

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedInvoice(
                                                                    invoice
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
                                                                    invoice
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
                                                                    invoice.id
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

                {/* Mobile */}

                <div className="divide-y divide-slate-100 md:hidden">

                    {filteredInvoices.map(
                        (invoice) => (
                            <div
                                key={invoice.id}
                                className="p-5"
                            >

                                <div className="flex items-start justify-between">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <FiFileText
                                                size={
                                                    18
                                                }
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800">
                                                {
                                                    invoice.id
                                                }
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-400">
                                                {
                                                    invoice.patient
                                                }
                                            </p>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedInvoice(
                                                invoice
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
                                            Service
                                        </p>

                                        <p className="mt-1 text-sm font-medium text-slate-600">
                                            {
                                                invoice.service
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Amount
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-700">
                                            {formatCurrency(
                                                invoice.amount
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Date
                                        </p>

                                        <p className="mt-1 text-sm text-slate-600">
                                            {
                                                invoice.date
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                invoice.status
                                            )}`}
                                        >
                                            {
                                                invoice.status
                                            }
                                        </span>
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

                {filteredInvoices.length ===
                    0 && (
                        <div className="p-12 text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <FiFileText
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-700">
                                No invoices found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search
                                or payment filter.
                            </p>

                        </div>
                    )}

            </div>

            {/* Invoice Details Modal */}

            {selectedInvoice && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedInvoice(null)
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
                                    INVOICE DETAILS
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-800">
                                    {
                                        selectedInvoice.id
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedInvoice(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>

                        </div>

                        <div className="space-y-5 p-6">

                            <div className="rounded-2xl bg-slate-50 p-5">

                                <p className="text-xs text-slate-400">
                                    Patient
                                </p>

                                <p className="mt-1 text-lg font-bold text-slate-800">
                                    {
                                        selectedInvoice.patient
                                    }
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {
                                        selectedInvoice.patientId
                                    }
                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Service
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedInvoice.service
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Doctor
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedInvoice.doctor
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Billing Date
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedInvoice.date
                                        }
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Payment Method
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-700">
                                        {
                                            selectedInvoice.paymentMethod
                                        }
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-blue-50 p-5">

                                <div>
                                    <p className="text-xs text-blue-400">
                                        Total Amount
                                    </p>

                                    <p className="mt-1 text-2xl font-bold text-blue-700">
                                        {formatCurrency(
                                            selectedInvoice.amount
                                        )}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                        selectedInvoice.status
                                    )}`}
                                >
                                    {
                                        selectedInvoice.status
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                </div>
            )}

            {/* Add / Edit Invoice Modal */}

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
                                    {editingInvoice
                                        ? "Edit Invoice"
                                        : "Create Invoice"}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add billing information
                                    for a patient.
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
                                        Patient Name
                                    </label>

                                    <input
                                        required
                                        name="patient"
                                        value={
                                            formData.patient
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter patient name"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Patient ID */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Patient ID
                                    </label>

                                    <input
                                        required
                                        name="patientId"
                                        value={
                                            formData.patientId
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Example: PAT-010"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Service */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Service
                                    </label>

                                    <select
                                        required
                                        name="service"
                                        value={
                                            formData.service
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="">
                                            Select service
                                        </option>

                                        {services.map(
                                            (service) => (
                                                <option
                                                    key={
                                                        service
                                                    }
                                                    value={
                                                        service
                                                    }
                                                >
                                                    {
                                                        service
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

                                    <input
                                        required
                                        name="doctor"
                                        value={
                                            formData.doctor
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Doctor name"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Date */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Billing Date
                                    </label>

                                    <input
                                        required
                                        type="date"
                                        name="date"
                                        value={
                                            formData.date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Amount */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Amount
                                    </label>

                                    <input
                                        required
                                        min="0"
                                        step="0.01"
                                        type="number"
                                        name="amount"
                                        value={
                                            formData.amount
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="₹ 0.00"
                                        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                {/* Payment Method */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Payment Method
                                    </label>

                                    <select
                                        name="paymentMethod"
                                        value={
                                            formData.paymentMethod
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
                                    >
                                        <option value="UPI">
                                            UPI
                                        </option>

                                        <option value="Card">
                                            Card
                                        </option>

                                        <option value="Cash">
                                            Cash
                                        </option>

                                        <option value="Net Banking">
                                            Net Banking
                                        </option>

                                    </select>
                                </div>

                                {/* Status */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Payment Status
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
                                        <option value="Paid">
                                            Paid
                                        </option>

                                        <option value="Pending">
                                            Pending
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
                                    {editingInvoice
                                        ? "Save Changes"
                                        : "Create Invoice"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default Billing;