import { useState } from "react";
import {
    FiCalendar,
    FiCheckCircle,
    FiClock,
    FiFileText,
    FiPlus,
    FiUserPlus,
    FiUsers,
    FiX,
} from "react-icons/fi";

const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Emergency Care",
    "General Medicine",
];

const doctors = [
    "Dr. Anil Sharma",
    "Dr. Priya Reddy",
    "Dr. Rahul Kumar",
    "Dr. Sneha Rao",
    "Dr. Arjun Mehta",
];

function QuickActions() {
    const [showAppointment, setShowAppointment] = useState(false);

    const [formData, setFormData] = useState({
        patientName: "",
        phone: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.patientName.trim()) {
            newErrors.patientName = "Patient name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Enter a valid 10-digit number";
        }

        if (!formData.department) {
            newErrors.department = "Select a department";
        }

        if (!formData.doctor) {
            newErrors.doctor = "Select a doctor";
        }

        if (!formData.date) {
            newErrors.date = "Select appointment date";
        }

        if (!formData.time) {
            newErrors.time = "Select appointment time";
        }

        if (!formData.reason.trim()) {
            newErrors.reason = "Please enter the reason for visit";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setShowAppointment(false);
        setShowSuccess(true);

        setFormData({
            patientName: "",
            phone: "",
            department: "",
            doctor: "",
            date: "",
            time: "",
            reason: "",
        });

        setErrors({});

        setTimeout(() => {
            setShowSuccess(false);
        }, 4000);
    };

    const openAppointment = () => {
        setShowAppointment(true);
        setShowSuccess(false);
    };

    const closeAppointment = () => {
        setShowAppointment(false);
        setErrors({});
    };

    return (
        <>
            {/* Quick Actions */}

            <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-5 shadow-lg sm:p-6">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                            Quick Actions
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                            What would you like to do?
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Quickly access common hospital operations.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    {/* Book Appointment */}

                    <button
                        type="button"
                        onClick={openAppointment}
                        className="group rounded-2xl bg-blue-600 p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white">
                                <FiCalendar size={23} />
                            </div>

                            <FiPlus
                                size={20}
                                className="text-blue-200 transition group-hover:rotate-90"
                            />
                        </div>

                        <h3 className="mt-5 text-base font-bold text-white">
                            Book Appointment
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-blue-100">
                            Schedule a new patient appointment.
                        </p>
                    </button>

                    {/* Add Patient */}

                    <button
                        type="button"
                        className="group rounded-2xl bg-white/10 p-5 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                                <FiUserPlus size={23} />
                            </div>

                            <FiPlus
                                size={20}
                                className="text-slate-400 transition group-hover:rotate-90"
                            />
                        </div>

                        <h3 className="mt-5 text-base font-bold text-white">
                            Add Patient
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            Register a new patient in the hospital.
                        </p>
                    </button>

                    {/* Add Doctor */}

                    <button
                        type="button"
                        className="group rounded-2xl bg-white/10 p-5 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                                <FiUsers size={23} />
                            </div>

                            <FiPlus
                                size={20}
                                className="text-slate-400 transition group-hover:rotate-90"
                            />
                        </div>

                        <h3 className="mt-5 text-base font-bold text-white">
                            Add Doctor
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            Add a doctor to the hospital staff.
                        </p>
                    </button>

                    {/* Add Prescription */}

                    <button
                        type="button"
                        className="group rounded-2xl bg-white/10 p-5 text-left ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 text-orange-300">
                                <FiFileText size={23} />
                            </div>

                            <FiPlus
                                size={20}
                                className="text-slate-400 transition group-hover:rotate-90"
                            />
                        </div>

                        <h3 className="mt-5 text-base font-bold text-white">
                            Add Prescription
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            Create a new patient prescription.
                        </p>
                    </button>
                </div>
            </section>

            {/* Appointment Modal */}

            {showAppointment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={closeAppointment}
                >
                    <div
                        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Modal Header */}

                        <div className="flex items-start justify-between border-b border-slate-100 p-6 sm:p-7">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FiCalendar size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800 sm:text-2xl">
                                            Book an Appointment
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Schedule a visit with our medical specialists.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={closeAppointment}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                            >
                                <FiX size={21} />
                            </button>
                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 sm:p-7"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Patient Name */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Patient Name
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="patientName"
                                        value={formData.patientName}
                                        onChange={handleChange}
                                        placeholder="Enter patient name"
                                        className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${errors.patientName
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />

                                    {errors.patientName && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.patientName}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Mobile Number
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter 10-digit number"
                                        maxLength={10}
                                        className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${errors.phone
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Department */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Department
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition ${errors.department
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    >
                                        <option value="">
                                            Select department
                                        </option>

                                        {departments.map((department) => (
                                            <option
                                                key={department}
                                                value={department}
                                            >
                                                {department}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.department && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.department}
                                        </p>
                                    )}
                                </div>

                                {/* Doctor */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Doctor
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <select
                                        name="doctor"
                                        value={formData.doctor}
                                        onChange={handleChange}
                                        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition ${errors.doctor
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    >
                                        <option value="">
                                            Select doctor
                                        </option>

                                        {doctors.map((doctor) => (
                                            <option key={doctor} value={doctor}>
                                                {doctor}
                                            </option>
                                        ))}
                                    </select>

                                    {errors.doctor && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.doctor}
                                        </p>
                                    )}
                                </div>

                                {/* Date */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Appointment Date
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        min={new Date()
                                            .toISOString()
                                            .split("T")[0]}
                                        className={`h-12 w-full rounded-xl border px-4 text-sm outline-none transition ${errors.date
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />

                                    {errors.date && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.date}
                                        </p>
                                    )}
                                </div>

                                {/* Time */}

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Appointment Time
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <select
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition ${errors.time
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    >
                                        <option value="">
                                            Select time
                                        </option>

                                        <option value="09:00 AM">
                                            09:00 AM
                                        </option>

                                        <option value="09:30 AM">
                                            09:30 AM
                                        </option>

                                        <option value="10:00 AM">
                                            10:00 AM
                                        </option>

                                        <option value="10:30 AM">
                                            10:30 AM
                                        </option>

                                        <option value="11:00 AM">
                                            11:00 AM
                                        </option>

                                        <option value="11:30 AM">
                                            11:30 AM
                                        </option>

                                        <option value="02:00 PM">
                                            02:00 PM
                                        </option>

                                        <option value="02:30 PM">
                                            02:30 PM
                                        </option>

                                        <option value="03:00 PM">
                                            03:00 PM
                                        </option>

                                        <option value="04:00 PM">
                                            04:00 PM
                                        </option>

                                        <option value="05:00 PM">
                                            05:00 PM
                                        </option>
                                    </select>

                                    {errors.time && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.time}
                                        </p>
                                    )}
                                </div>

                                {/* Reason */}

                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Reason for Visit
                                        <span className="ml-1 text-red-500">*</span>
                                    </label>

                                    <textarea
                                        name="reason"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Describe the reason for the appointment..."
                                        className={`w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition ${errors.reason
                                                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />

                                    {errors.reason && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.reason}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Actions */}

                            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeAppointment}
                                    className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <FiCalendar size={17} />
                                    Book Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Toast */}

            {showSuccess && (
                <div className="fixed bottom-6 right-6 z-[60] w-[calc(100%-2rem)] max-w-sm rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-100">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <FiCheckCircle size={21} />
                        </div>

                        <div>
                            <h4 className="text-sm font-bold text-slate-800">
                                Appointment booked successfully!
                            </h4>

                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                The appointment has been scheduled successfully.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default QuickActions;
