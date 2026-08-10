import { useState } from "react";

import {
    FiActivity,
    FiArrowRight,
    FiHeart,
    FiSmile,
    FiUsers,
    FiZap,
    FiX,
    FiCalendar,
    FiClock,
    FiMapPin,
} from "react-icons/fi";
const departments = [
    {
        id: 1,
        name: "Cardiology",
        subtitle: "Heart & Cardiovascular Care",
        description:
            "Our cardiology department provides advanced diagnosis and treatment for heart-related conditions. Our experienced cardiologists use modern technology to provide comprehensive care for every patient.",
        doctors: 12,
        patients: 86,
        image:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85",
        icon: FiHeart,
        background: "bg-blue-50",
        iconBackground: "bg-blue-600",
        textColor: "text-blue-600",

        services: [
            "ECG & Cardiac Testing",
            "Heart Disease Treatment",
            "Cardiac Consultation",
            "Preventive Cardiology",
        ],
    },

    {
        id: 2,
        name: "Neurology",
        subtitle: "Brain & Nervous System Care",
        description:
            "Our neurology department specializes in the diagnosis and treatment of conditions affecting the brain, spine and nervous system with personalized care and advanced medical facilities.",
        doctors: 8,
        patients: 54,
        image:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1000&q=85",
        icon: FiZap,
        background: "bg-purple-50",
        iconBackground: "bg-purple-600",
        textColor: "text-purple-600",
        services: [
            "Neurological Consultation",
            "Brain & Spine Treatment",
            "Stroke Management",
            "Nerve Disorder Treatment",
        ],
    },


    {
        id: 3,
        name: "Orthopedics",
        subtitle: "Bone & Joint Care",
        description:
            "Our orthopedic specialists provide comprehensive treatment for bones, joints, muscles and sports-related injuries using modern techniques and rehabilitation programs.",
        doctors: 10,
        patients: 72,
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85",
        icon: FiActivity,
        background: "bg-emerald-50",
        iconBackground: "bg-emerald-600",
        textColor: "text-emerald-600",
        services: [
            "Bone & Joint Treatment",
            "Sports Injury Treatment",
            "Fracture Management",
            "Physiotherapy & Rehabilitation",
        ],
    },


    {
        id: 4,
        name: "Pediatrics",
        subtitle: "Children's Healthcare",
        description:
            "Our pediatrics department provides compassionate healthcare for infants and children, including regular checkups, preventive care and specialized medical treatment.",
        doctors: 9,
        patients: 64,
        image:
            "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1000&q=85",
        icon: FiSmile,
        background: "bg-orange-50",
        iconBackground: "bg-orange-500",
        textColor: "text-orange-600",
        services: [
            "Child Health Checkups",
            "Vaccination",
            "Pediatric Consultation",
            "Childhood Disease Treatment",
        ],
    },

    {
        id: 5,
        name: "Emergency Care",
        subtitle: "24/7 Emergency Services",
        description:
            "Our emergency department operates 24/7 with experienced medical teams ready to provide immediate medical attention for urgent and critical conditions.",
        doctors: 14,
        patients: 48,
        image:
            "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1000&q=85",
        icon: FiActivity,
        background: "bg-red-50",
        iconBackground: "bg-red-600",
        textColor: "text-red-600",
        services: [
            "24/7 Emergency Care",
            "Critical Care",
            "Trauma Treatment",
            "Emergency Diagnostics",
        ],
    },

    {
        id: 6,
        name: "General Medicine",
        subtitle: "Complete Medical Care",
        description:
            "Our general medicine department provides comprehensive healthcare including preventive care, diagnosis, treatment and long-term health management for adults.",
        doctors: 16,
        patients: 124,
        image:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=85",
        icon: FiUsers,
        background: "bg-cyan-50",
        iconBackground: "bg-cyan-600",
        textColor: "text-cyan-600",
        services: [
            "General Consultation",
            "Health Checkups",
            "Preventive Healthcare",
            "Chronic Disease Management",
        ],
    },
];

function DepartmentContent({
    department,
    onExplore,
}) {
    const Icon = department.icon;

    return (
        <div
            className={`flex min-h-[360px] flex-col justify-center p-7 sm:p-10 lg:p-12 ${department.background}`}
        >
            {/* Icon */}

            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${department.iconBackground}`}
            >
                <Icon size={23} />
            </div>

            {/* Subtitle */}

            <p
                className={`mt-5 text-sm font-semibold ${department.textColor}`}
            >
                {department.subtitle}
            </p>

            {/* Title */}

            <h3 className="mt-2 text-3xl font-bold text-slate-800">
                {department.name}
            </h3>

            {/* Description */}

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
                {department.description}
            </p>

            {/* Stats */}

            <div className="mt-6 flex gap-3">
                <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
                    <p className="text-xs text-slate-400">
                        Specialists
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-800">
                        {department.doctors}
                    </p>
                </div>

                <div className="rounded-xl bg-white px-5 py-3 shadow-sm">
                    <p className="text-xs text-slate-400">
                        Patients
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-800">
                        {department.patients}
                    </p>
                </div>
            </div>

            {/* Button */}

            <button
                type="button"
                onClick={() => onExplore(department)}
                className={`mt-6 flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:shadow-md ${department.textColor}`}
            >
                Explore Department
                <FiArrowRight size={16} />
            </button>
        </div>
    );
}

function DepartmentImage({ department }) {
    return (
        <div className="min-h-[360px] overflow-hidden">
            <img
                src={department.image}
                alt={department.name}
                className="h-full min-h-[360px] w-full object-cover transition duration-500 hover:scale-105"
            />
        </div>
    );
}

function Departments() {
    const [selectedDepartment, setSelectedDepartment] =
        useState(null);
    const SelectedIcon = selectedDepartment?.icon;

    return (
        <section className="rounded-3xl bg-slate-100 p-4 sm:p-6 lg:p-8">

            {/* Section Heading */}

            <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                    Our Departments
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                    Specialized Healthcare Under One Roof
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    Our hospital provides specialized medical services
                    supported by experienced doctors, modern facilities
                    and patient-focused care.
                </p>
            </div>

            {/* Department Sections */}

            <div className="space-y-6">
                {departments.map((department, index) => {
                    const imageFirst = index % 2 === 0;

                    return (
                        <div
                            key={department.id}
                            className="overflow-hidden rounded-3xl bg-white shadow-md"
                        >
                            <div className="grid md:grid-cols-2">

                                {imageFirst ? (
                                    <>
                                        {/* IMAGE LEFT */}

                                        <DepartmentImage
                                            department={department}
                                        />

                                        {/* CONTENT RIGHT */}

                                        <DepartmentContent
                                            department={department}
                                            onExplore={setSelectedDepartment}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* CONTENT LEFT */}

                                        <DepartmentContent
                                            department={department}
                                            onExplore={setSelectedDepartment}
                                        />

                                        {/* IMAGE RIGHT */}

                                        <DepartmentImage
                                            department={department}
                                        />
                                    </>
                                )}

                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedDepartment && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedDepartment(null)}
                >
                    <div
                        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Close Button */}

                        <button
                            type="button"
                            onClick={() => setSelectedDepartment(null)}
                            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition hover:bg-slate-100"
                        >
                            <FiX size={20} />
                        </button>

                        {/* Top Image */}

                        <div className="h-56 overflow-hidden sm:h-72">
                            <img
                                src={selectedDepartment.image}
                                alt={selectedDepartment.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Content */}

                        <div className="p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p
                                        className={`text-sm font-semibold ${selectedDepartment.textColor}`}
                                    >
                                        {selectedDepartment.subtitle}
                                    </p>

                                    <h2 className="mt-1 text-3xl font-bold text-slate-800">
                                        {selectedDepartment.name}
                                    </h2>
                                </div>

                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${selectedDepartment.iconBackground}`}
                                >
                                    {(() => {
                                        const SelectedIcon = selectedDepartment.icon;

                                        return <SelectedIcon size={24} />;
                                    })()}
                                </div>
                            </div>

                            {/* Description */}

                            <p className="mt-5 text-sm leading-7 text-slate-600">
                                {selectedDepartment.description}
                            </p>

                            {/* Information */}

                            <div className="mt-7 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <FiUsers size={18} />

                                        <span className="text-sm">
                                            Specialists
                                        </span>
                                    </div>

                                    <p className="mt-2 text-2xl font-bold text-slate-800">
                                        {selectedDepartment.doctors}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <FiUsers size={18} />

                                        <span className="text-sm">
                                            Patients
                                        </span>
                                    </div>

                                    <p className="mt-2 text-2xl font-bold text-slate-800">
                                        {selectedDepartment.patients}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <FiClock size={18} />

                                        <span className="text-sm">
                                            Availability
                                        </span>
                                    </div>

                                    <p className="mt-2 text-lg font-bold text-emerald-600">
                                        24/7 Available
                                    </p>
                                </div>
                            </div>

                            {/* Services */}

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-slate-800">
                                    Available Services
                                </h3>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {selectedDepartment.services.map(
                                        (service, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"
                                            >
                                                <div
                                                    className={`h-2.5 w-2.5 rounded-full ${selectedDepartment.iconBackground}`}
                                                />

                                                <span className="text-sm font-medium text-slate-700">
                                                    {service}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Bottom Information */}

                            <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-slate-900 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3 text-white">
                                    <FiMapPin size={20} />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Hospital Main Campus
                                        </p>

                                        <p className="text-xs text-slate-400">
                                            Hyderabad • Main Medical Center
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <FiCalendar size={17} />
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Departments;