import { useState } from "react";
import {
    FiBriefcase,
    FiCalendar,
    FiCheckCircle,
    FiEdit2,
    FiMail,
    FiMapPin,
    FiPhone,
    FiUser,
    FiX,
} from "react-icons/fi";

const initialProfile = {
    name: "Dr. Ananya Rao",
    designation: "Senior Cardiologist",
    department: "Cardiology",
    employeeId: "EMP-1024",
    email: "ananya.rao@medicare.com",
    phone: "+91 98765 87659",
    experience: "12 Years",
    joiningDate: "15 June 2014",
    qualification: "MBBS, MD - Cardiology",
    gender: "Female",
    address:
        "Madhapur, Hyderabad, Telangana, India",
    bio:
        "Experienced cardiologist specializing in preventive cardiology, cardiac care and patient wellness.",
    image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80",
};

function Profile() {
    const [profile, setProfile] =
        useState(initialProfile);

    const [showEdit, setShowEdit] =
        useState(false);

    const [formData, setFormData] =
        useState(initialProfile);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setProfile(formData);
        setShowEdit(false);
    };

    const openEdit = () => {
        setFormData(profile);
        setShowEdit(true);
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Account Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your personal and professional
                        information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openEdit}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    <FiEdit2 size={17} />
                    Edit Profile
                </button>

            </div>

            {/* Profile Hero */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                <div className="relative h-36 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 sm:h-44">

                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[40px] border-white" />
                        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full border-[45px] border-white" />
                    </div>

                </div>

                <div className="relative px-5 pb-6 sm:px-8">

                    <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end">

                        {/* Profile Image */}

                        <div className="relative shrink-0">

                            <img
                                src={profile.image}
                                alt={profile.name}
                                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg sm:h-32 sm:w-32"
                            />

                            <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />

                        </div>

                        {/* Name */}

                        <div className="min-w-0 flex-1 sm:pb-1">

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

                                <h2 className="text-2xl font-bold text-slate-800">
                                    {profile.name}
                                </h2>

                                <span className="flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                    <FiCheckCircle
                                        size={12}
                                    />
                                    Active
                                </span>

                            </div>

                            <p className="mt-1 text-sm font-medium text-blue-600">
                                {profile.designation}
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                {profile.department} Department
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Main Content */}

            <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">

                {/* Personal Information */}

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">

                    <div className="border-b border-slate-100 pb-5">

                        <h2 className="text-lg font-bold text-slate-800">
                            Personal Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Your basic personal and contact
                            information.
                        </p>

                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2">

                        <InfoItem
                            icon={<FiUser size={18} />}
                            label="Full Name"
                            value={profile.name}
                        />

                        <InfoItem
                            icon={<FiBriefcase size={18} />}
                            label="Designation"
                            value={profile.designation}
                        />

                        <InfoItem
                            icon={<FiMail size={18} />}
                            label="Email Address"
                            value={profile.email}
                        />

                        <InfoItem
                            icon={<FiPhone size={18} />}
                            label="Phone Number"
                            value={profile.phone}
                        />

                        <InfoItem
                            icon={<FiUser size={18} />}
                            label="Gender"
                            value={profile.gender}
                        />

                        <InfoItem
                            icon={<FiMapPin size={18} />}
                            label="Address"
                            value={profile.address}
                        />

                    </div>

                </div>

                {/* Professional Information */}

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">

                    <div className="border-b border-slate-100 pb-5">

                        <h2 className="text-lg font-bold text-slate-800">
                            Professional Information
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Your hospital employment details.
                        </p>

                    </div>

                    <div className="mt-6 space-y-5">

                        <ProfessionalItem
                            label="Employee ID"
                            value={profile.employeeId}
                        />

                        <ProfessionalItem
                            label="Department"
                            value={profile.department}
                        />

                        <ProfessionalItem
                            label="Qualification"
                            value={profile.qualification}
                        />

                        <ProfessionalItem
                            label="Experience"
                            value={profile.experience}
                        />

                        <ProfessionalItem
                            label="Joining Date"
                            value={profile.joiningDate}
                        />

                    </div>

                </div>

            </div>

            {/* Contact & About */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* About */}

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-6">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiUser size={20} />
                        </div>

                        <div>

                            <h2 className="text-lg font-bold text-slate-800">
                                About
                            </h2>

                            <p className="mt-2 text-sm leading-7 text-slate-500">
                                {profile.bio}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Contact */}

                <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-sm">

                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                            <FiPhone size={20} />
                        </div>

                        <div>

                            <h2 className="text-lg font-bold">
                                Contact Information
                            </h2>

                            <p className="mt-1 text-sm text-blue-100">
                                Reach the hospital staff member
                                directly.
                            </p>

                        </div>

                    </div>

                    <div className="mt-6 space-y-4">

                        <div className="flex items-center gap-3">

                            <FiMail
                                size={17}
                                className="text-blue-100"
                            />

                            <span className="text-sm">
                                {profile.email}
                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiPhone
                                size={17}
                                className="text-blue-100"
                            />

                            <span className="text-sm">
                                {profile.phone}
                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <FiMapPin
                                size={17}
                                className="text-blue-100"
                            />

                            <span className="text-sm">
                                {profile.address}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Edit Modal */}

            {showEdit && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setShowEdit(false)
                    }
                >

                    <div
                        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        {/* Modal Header */}

                        <div className="flex items-center justify-between border-b border-slate-100 p-6">

                            <div>

                                <h2 className="text-xl font-bold text-slate-800">
                                    Edit Profile
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Update your profile information.
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowEdit(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
                            >
                                <FiX size={19} />
                            </button>

                        </div>

                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6"
                        >

                            <div className="grid gap-5 sm:grid-cols-2">

                                <FormField
                                    label="Full Name"
                                    name="name"
                                    value={
                                        formData.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Designation"
                                    name="designation"
                                    value={
                                        formData.designation
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Department"
                                    name="department"
                                    value={
                                        formData.department
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Employee ID"
                                    name="employeeId"
                                    value={
                                        formData.employeeId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={
                                        formData.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Phone Number"
                                    name="phone"
                                    value={
                                        formData.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Experience"
                                    name="experience"
                                    value={
                                        formData.experience
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Joining Date"
                                    name="joiningDate"
                                    value={
                                        formData.joiningDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <FormField
                                    label="Qualification"
                                    name="qualification"
                                    value={
                                        formData.qualification
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <div>

                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Gender
                                    </label>

                                    <select
                                        name="gender"
                                        value={
                                            formData.gender
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>

                                    </select>

                                </div>

                                <FormField
                                    label="Address"
                                    name="address"
                                    value={
                                        formData.address
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="mt-5">

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    About
                                </label>

                                <textarea
                                    name="bio"
                                    rows="4"
                                    value={
                                        formData.bio
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                            </div>

                            {/* Buttons */}

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowEdit(
                                            false
                                        )
                                    }
                                    className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

function InfoItem({
    icon,
    label,
    value,
}) {
    return (
        <div className="flex gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                {icon}
            </div>

            <div className="min-w-0">

                <p className="text-xs font-medium text-slate-400">
                    {label}
                </p>

                <p className="mt-1 break-words text-sm font-semibold text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    );
}

function ProfessionalItem({
    label,
    value,
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">

            <span className="text-sm text-slate-400">
                {label}
            </span>

            <span className="text-right text-sm font-semibold text-slate-700">
                {value}
            </span>

        </div>
    );
}

function FormField({
    label,
    name,
    type = "text",
    value,
    onChange,
}) {
    return (
        <div>

            <label className="mb-2 block text-sm font-semibold text-slate-700">
                {label}
            </label>

            <input
                required
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

        </div>
    );
}

export default Profile;