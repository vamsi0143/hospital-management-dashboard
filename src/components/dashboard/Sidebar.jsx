import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    FiActivity,
    FiBell,
    FiCalendar,
    FiCreditCard,
    FiGrid,
    FiLogOut,
    FiPackage,
    FiSettings,
    FiUser,
    FiUserCheck,
    FiUsers,
    FiX,
} from "react-icons/fi";

import { logout } from "../../redux/slices/authSlice";

const menuItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: FiGrid,
    },
    {
        label: "Patients",
        path: "/patients",
        icon: FiUsers,
    },
    {
        label: "Doctors",
        path: "/doctors",
        icon: FiUserCheck,
    },
    {
        label: "Appointments",
        path: "/appointments",
        icon: FiCalendar,
    },
    {
        label: "Beds",
        path: "/beds",
        icon: FiActivity,
    },
    {
        label: "Pharmacy",
        path: "/pharmacy",
        icon: FiPackage,
    },
    {
        label: "Billing",
        path: "/billing",
        icon: FiCreditCard,
    },
    {
        label: "Notifications",
        path: "/notifications",
        icon: FiBell,
    },
    {
        label: "Profile",
        path: "/profile",
        icon: FiUser,
    },
];

function Sidebar({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            {/* Mobile Overlay */}

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
        fixed
        left-0
        top-0
        z-50
        flex
        h-screen
        w-72
        flex-col
        overflow-y-auto
        overflow-x-hidden
        border-r
        border-slate-200
        bg-white
        transition-transform
        duration-300
        lg:static
        lg:z-auto
        lg:translate-x-0
        dark:border-slate-800
        dark:bg-slate-900
        ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
    `}
            >

                {/* Logo */}

                <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <FiActivity size={24} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-slate-800">
                                MediCare
                            </h1>

                            <p className="text-xs text-slate-500">
                                Hospital Management
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-500 lg:hidden"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Navigation */}

                <nav className="px-4 py-6">
                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Main Menu
                    </p>

                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${isActive
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                        }
                    `
                                    }
                                >
                                    <Icon size={19} />

                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Settings */}

                    <div className="mt-8">
                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            System
                        </p>

                        <NavLink
                            to="/settings"
                            onClick={onClose}
                            className={({ isActive }) =>
                                `
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                text-sm
                font-medium
                transition
                ${isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                                }
                `
                            }
                        >
                            <FiSettings size={19} />

                            <span>Settings</span>
                        </NavLink>
                    </div>
                </nav>

                {/* Logout */}

                <div className="border-t border-slate-100 p-4">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                        <FiLogOut size={19} />

                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;