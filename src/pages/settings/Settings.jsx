import { useState } from "react";
import {
    FiBell,
    FiCheck,
    FiGlobe,
    FiLock,
    FiMail,
    FiSave,
    FiShield,
    FiSliders,
    FiSun,
} from "react-icons/fi";

function Settings() {
    const [activeSection, setActiveSection] =
        useState("General");

    const [settings, setSettings] = useState({
        hospitalName: "MediCare Hospital",
        email: "admin@medicare.com",
        timezone: "Asia/Kolkata",
        language: "English",
        emailNotifications: true,
        appointmentNotifications: true,
        pharmacyAlerts: true,
        twoFactor: false,
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } =
            event.target;

        setSettings((current) => ({
            ...current,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    const sections = [
        {
            label: "General",
            icon: FiSliders,
        },
        {
            label: "Notifications",
            icon: FiBell,
        },
        {
            label: "Security",
            icon: FiShield,
        },
        {
            label: "Appearance",
            icon: FiSun,
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>
                <p className="text-sm font-semibold text-blue-600">
                    System Configuration
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
                    Settings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage hospital preferences,
                    notifications and security.
                </p>
            </div>

            {/* Settings Layout */}

            <div className="grid gap-6 lg:grid-cols-[240px_1fr]">

                {/* Settings Menu */}

                <div className="h-fit rounded-3xl bg-white p-3 shadow-sm ring-1 ring-slate-100">

                    <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Settings
                    </p>

                    <div className="space-y-1">

                        {sections.map((section) => {
                            const Icon =
                                section.icon;

                            return (
                                <button
                                    key={
                                        section.label
                                    }
                                    type="button"
                                    onClick={() =>
                                        setActiveSection(
                                            section.label
                                        )
                                    }
                                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeSection ===
                                        section.label
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                        }`}
                                >
                                    <Icon
                                        size={18}
                                    />

                                    <span>
                                        {
                                            section.label
                                        }
                                    </span>
                                </button>
                            );
                        })}

                    </div>

                </div>

                {/* Settings Content */}

                <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                    {/* General */}

                    {activeSection ===
                        "General" && (
                            <GeneralSettings
                                settings={
                                    settings
                                }
                                handleChange={
                                    handleChange
                                }
                            />
                        )}

                    {/* Notifications */}

                    {activeSection ===
                        "Notifications" && (
                            <NotificationSettings
                                settings={
                                    settings
                                }
                                handleChange={
                                    handleChange
                                }
                            />
                        )}

                    {/* Security */}

                    {activeSection ===
                        "Security" && (
                            <SecuritySettings
                                settings={
                                    settings
                                }
                                handleChange={
                                    handleChange
                                }
                            />
                        )}

                    {/* Appearance */}

                    {activeSection ===
                        "Appearance" && (
                            <AppearanceSettings
                                settings={
                                    settings
                                }
                                handleChange={
                                    handleChange
                                }
                            />
                        )}

                    {/* Save */}

                    <div className="flex flex-col gap-3 border-t border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-end sm:p-6">

                        {saved && (
                            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                                <FiCheck
                                    size={17}
                                />
                                Settings saved
                                successfully
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            <FiSave
                                size={17}
                            />
                            Save Changes
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

/* ---------------- General ---------------- */

function GeneralSettings({
    settings,
    handleChange,
}) {
    return (
        <div className="p-5 sm:p-6">

            <SectionHeader
                title="General Settings"
                description="Configure basic hospital information and regional preferences."
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <FormField
                    label="Hospital Name"
                    name="hospitalName"
                    value={
                        settings.hospitalName
                    }
                    onChange={handleChange}
                />

                <FormField
                    label="Admin Email"
                    name="email"
                    type="email"
                    value={settings.email}
                    onChange={handleChange}
                />

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Timezone
                    </label>

                    <select
                        name="timezone"
                        value={
                            settings.timezone
                        }
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="Asia/Kolkata">
                            India Standard Time
                        </option>

                        <option value="Asia/Dubai">
                            Gulf Standard Time
                        </option>

                        <option value="Europe/London">
                            London
                        </option>

                        <option value="America/New_York">
                            Eastern Time
                        </option>
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Language
                    </label>

                    <select
                        name="language"
                        value={
                            settings.language
                        }
                        onChange={handleChange}
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option>
                            English
                        </option>

                        <option>
                            Telugu
                        </option>

                        <option>
                            Hindi
                        </option>
                    </select>
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-5">

                <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                        <FiGlobe size={19} />
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-blue-800">
                            Regional settings
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-blue-600">
                            These settings control the
                            language, timezone and regional
                            preferences displayed throughout
                            the dashboard.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

/* ---------------- Notifications ---------------- */

function NotificationSettings({
    settings,
    handleChange,
}) {
    return (
        <div className="p-5 sm:p-6">

            <SectionHeader
                title="Notification Settings"
                description="Choose which hospital activities should send notifications."
            />

            <div className="mt-6 divide-y divide-slate-100">

                <ToggleItem
                    title="Email Notifications"
                    description="Receive important hospital updates through email."
                    name="emailNotifications"
                    checked={
                        settings.emailNotifications
                    }
                    onChange={handleChange}
                />

                <ToggleItem
                    title="Appointment Notifications"
                    description="Get notified when appointments are booked, changed or cancelled."
                    name="appointmentNotifications"
                    checked={
                        settings.appointmentNotifications
                    }
                    onChange={handleChange}
                />

                <ToggleItem
                    title="Pharmacy Alerts"
                    description="Receive alerts when medicines reach low stock levels."
                    name="pharmacyAlerts"
                    checked={
                        settings.pharmacyAlerts
                    }
                    onChange={handleChange}
                />

                <ToggleItem
                    title="System Alerts"
                    description="Receive important system and maintenance notifications."
                    name="systemAlerts"
                    checked={
                        settings.systemAlerts
                    }
                    onChange={handleChange}
                />

            </div>

        </div>
    );
}

/* ---------------- Security ---------------- */

function SecuritySettings({
    settings,
    handleChange,
}) {
    return (
        <div className="p-5 sm:p-6">

            <SectionHeader
                title="Security"
                description="Protect your hospital management account."
            />

            <div className="mt-6 space-y-4">

                <ToggleItem
                    title="Two-Factor Authentication"
                    description="Add an additional security layer when signing into the dashboard."
                    name="twoFactor"
                    checked={
                        settings.twoFactor
                    }
                    onChange={handleChange}
                />

                <div className="rounded-2xl border border-slate-100 p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiLock size={18} />
                        </div>

                        <div className="flex-1">

                            <h3 className="text-sm font-bold text-slate-700">
                                Change Password
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-400">
                                Update your dashboard password
                                regularly to keep your account
                                secure.
                            </p>

                            <button
                                type="button"
                                className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Change Password
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

/* ---------------- Appearance ---------------- */

function AppearanceSettings({
    settings,
    handleChange,
}) {
    return (
        <div className="p-5 sm:p-6">

            <SectionHeader
                title="Appearance"
                description="Customize how the hospital dashboard looks."
            />

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border-2 border-blue-500 bg-white p-5">

                    <div className="h-24 rounded-xl bg-slate-50 p-3">

                        <div className="h-3 w-20 rounded bg-blue-600" />

                        <div className="mt-3 h-3 w-full rounded bg-slate-200" />

                        <div className="mt-2 h-3 w-3/4 rounded bg-slate-200" />

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                        <span className="text-sm font-semibold text-slate-700">
                            Light
                        </span>

                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <FiCheck
                                size={12}
                            />
                        </span>

                    </div>

                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5">

                    <div className="h-24 rounded-xl bg-slate-800 p-3">

                        <div className="h-3 w-20 rounded bg-blue-500" />

                        <div className="mt-3 h-3 w-full rounded bg-slate-700" />

                        <div className="mt-2 h-3 w-3/4 rounded bg-slate-700" />

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                        <span className="text-sm font-semibold text-white">
                            Dark
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

/* ---------------- Reusable UI ---------------- */

function SectionHeader({
    title,
    description,
}) {
    return (
        <div className="border-b border-slate-100 pb-5">

            <h2 className="text-lg font-bold text-slate-800">
                {title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
                {description}
            </p>

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
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

        </div>
    );
}

function ToggleItem({
    title,
    description,
    name,
    checked,
    onChange,
    icon,
}) {
    return (
        <div className="flex items-center justify-between gap-5 py-5">

            <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    {icon || (
                        <FiBell size={18} />
                    )}
                </div>

                <div>

                    <h3 className="text-sm font-bold text-slate-700">
                        {title}
                    </h3>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                        {description}
                    </p>

                </div>

            </div>

            <label className="relative inline-flex shrink-0 cursor-pointer items-center">

                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-200" />

                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />

            </label>

        </div>
    );
}

export default Settings;