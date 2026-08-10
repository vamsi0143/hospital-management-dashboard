import { useMemo, useState } from "react";
import {
    FiAlertCircle,
    FiBell,
    FiCheck,
    FiCheckCircle,
    FiClock,
    FiInfo,
    FiMoreVertical,
    FiTrash2,
} from "react-icons/fi";

const initialNotifications = [
    {
        id: 1,
        title: "New appointment booked",
        message:
            "Rahul Sharma has booked an appointment with Dr. Ananya Rao.",
        type: "appointment",
        time: "10 minutes ago",
        read: false,
    },
    {
        id: 2,
        title: "Payment received",
        message:
            "Invoice INV-1001 has been successfully paid.",
        type: "payment",
        time: "25 minutes ago",
        read: false,
    },
    {
        id: 3,
        title: "Low pharmacy stock",
        message:
            "Paracetamol 500mg stock is running low. Only 18 units are remaining.",
        type: "warning",
        time: "1 hour ago",
        read: false,
    },
    {
        id: 4,
        title: "Doctor schedule updated",
        message:
            "Dr. Vikram Singh updated his availability for tomorrow.",
        type: "info",
        time: "2 hours ago",
        read: true,
    },
    {
        id: 5,
        title: "New patient registered",
        message:
            "Priya Reddy has been successfully registered as a new patient.",
        type: "patient",
        time: "3 hours ago",
        read: true,
    },
    {
        id: 6,
        title: "Appointment reminder",
        message:
            "You have 8 appointments scheduled for today.",
        type: "reminder",
        time: "4 hours ago",
        read: true,
    },
    {
        id: 7,
        title: "Bed availability updated",
        message:
            "Room 204 is now available for patient admission.",
        type: "info",
        time: "5 hours ago",
        read: true,
    },
    {
        id: 8,
        title: "System maintenance",
        message:
            "Scheduled system maintenance will begin tonight at 11:30 PM.",
        type: "warning",
        time: "Yesterday",
        read: true,
    },
];

function Notifications() {
    const [notifications, setNotifications] =
        useState(initialNotifications);

    const [filter, setFilter] =
        useState("All");

    const [openMenu, setOpenMenu] =
        useState(null);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const filteredNotifications = useMemo(() => {
        if (filter === "Unread") {
            return notifications.filter(
                (notification) =>
                    !notification.read
            );
        }

        if (filter === "Read") {
            return notifications.filter(
                (notification) =>
                    notification.read
            );
        }

        return notifications;
    }, [notifications, filter]);

    const markAsRead = (id) => {
        setNotifications((current) =>
            current.map((notification) =>
                notification.id === id
                    ? {
                        ...notification,
                        read: true,
                    }
                    : notification
            )
        );

        setOpenMenu(null);
    };

    const markAllAsRead = () => {
        setNotifications((current) =>
            current.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    const deleteNotification = (id) => {
        setNotifications((current) =>
            current.filter(
                (notification) =>
                    notification.id !== id
            )
        );

        setOpenMenu(null);
    };

    const clearAll = () => {
        const confirmed = window.confirm(
            "Are you sure you want to clear all notifications?"
        );

        if (!confirmed) {
            return;
        }

        setNotifications([]);
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case "appointment":
                return (
                    <FiClock size={20} />
                );

            case "payment":
                return (
                    <FiCheckCircle
                        size={20}
                    />
                );

            case "warning":
                return (
                    <FiAlertCircle
                        size={20}
                    />
                );

            case "patient":
                return (
                    <FiBell size={20} />
                );

            case "reminder":
                return (
                    <FiClock size={20} />
                );

            default:
                return (
                    <FiInfo size={20} />
                );
        }
    };

    const getIconClasses = (type) => {
        switch (type) {
            case "appointment":
                return "bg-blue-50 text-blue-600";

            case "payment":
                return "bg-emerald-50 text-emerald-600";

            case "warning":
                return "bg-amber-50 text-amber-600";

            case "patient":
                return "bg-violet-50 text-violet-600";

            case "reminder":
                return "bg-cyan-50 text-cyan-600";

            default:
                return "bg-slate-100 text-slate-600";
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="flex items-center gap-3">

                        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
                            Notifications
                        </h1>

                        {unreadCount > 0 && (
                            <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                                {unreadCount} New
                            </span>
                        )}

                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        Stay updated with hospital
                        activities and important alerts.
                    </p>

                </div>

                <div className="flex flex-wrap gap-2">

                    <button
                        type="button"
                        onClick={markAllAsRead}
                        disabled={
                            unreadCount === 0
                        }
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiCheck size={17} />
                        Mark all as read
                    </button>

                    <button
                        type="button"
                        onClick={clearAll}
                        disabled={
                            notifications.length === 0
                        }
                        className="flex items-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiTrash2 size={16} />
                        Clear all
                    </button>

                </div>

            </div>

            {/* Summary */}

            <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FiBell size={21} />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Total Notifications
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-800">
                                {notifications.length}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <FiAlertCircle
                                size={21}
                            />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Unread
                            </p>

                            <p className="mt-1 text-2xl font-bold text-amber-500">
                                {unreadCount}
                            </p>
                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <FiCheckCircle
                                size={21}
                            />
                        </div>

                        <div>
                            <p className="text-sm text-slate-500">
                                Read
                            </p>

                            <p className="mt-1 text-2xl font-bold text-emerald-600">
                                {
                                    notifications.filter(
                                        (
                                            notification
                                        ) =>
                                            notification.read
                                    ).length
                                }
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* Main Notification Panel */}

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">

                {/* Tabs */}

                <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                    <div className="flex gap-1 rounded-xl bg-slate-100 p-1">

                        {[
                            "All",
                            "Unread",
                            "Read",
                        ].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() =>
                                    setFilter(
                                        item
                                    )
                                }
                                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${filter ===
                                        item
                                        ? "bg-white text-blue-600 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {item}

                                {item ===
                                    "Unread" &&
                                    unreadCount >
                                    0 && (
                                        <span className="ml-2 rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-600">
                                            {
                                                unreadCount
                                            }
                                        </span>
                                    )}
                            </button>
                        ))}

                    </div>

                    <p className="text-sm text-slate-400">
                        {filteredNotifications.length}{" "}
                        notifications
                    </p>

                </div>

                {/* Notification List */}

                {filteredNotifications.length >
                    0 ? (
                    <div className="divide-y divide-slate-100">

                        {filteredNotifications.map(
                            (notification) => (
                                <div
                                    key={
                                        notification.id
                                    }
                                    className={`group relative flex gap-4 px-5 py-5 transition hover:bg-slate-50 sm:px-6 ${!notification.read
                                            ? "bg-blue-50/30"
                                            : ""
                                        }`}
                                >

                                    {/* Icon */}

                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getIconClasses(
                                            notification.type
                                        )}`}
                                    >
                                        {getNotificationIcon(
                                            notification.type
                                        )}
                                    </div>

                                    {/* Content */}

                                    <div className="min-w-0 flex-1 pr-8">

                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

                                            <div className="flex items-center gap-2">

                                                <h3
                                                    className={`text-sm ${notification.read
                                                            ? "font-semibold text-slate-700"
                                                            : "font-bold text-slate-800"
                                                        }`}
                                                >
                                                    {
                                                        notification.title
                                                    }
                                                </h3>

                                                {!notification.read && (
                                                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                                                )}

                                            </div>

                                            <span className="text-xs text-slate-400">
                                                {
                                                    notification.time
                                                }
                                            </span>

                                        </div>

                                        <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                                            {
                                                notification.message
                                            }
                                        </p>

                                        <div className="mt-3 flex items-center gap-3">

                                            {!notification.read && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        markAsRead(
                                                            notification.id
                                                        )
                                                    }
                                                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                                                >
                                                    Mark as read
                                                </button>
                                            )}

                                            {notification.read && (
                                                <span className="flex items-center gap-1 text-xs text-emerald-500">
                                                    <FiCheck
                                                        size={
                                                            13
                                                        }
                                                    />
                                                    Read
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                    {/* Menu */}

                                    <div className="absolute right-4 top-5">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu ===
                                                        notification.id
                                                        ? null
                                                        : notification.id
                                                )
                                            }
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 opacity-100 transition hover:bg-slate-100 hover:text-slate-700 sm:opacity-0 sm:group-hover:opacity-100"
                                        >
                                            <FiMoreVertical
                                                size={
                                                    17
                                                }
                                            />
                                        </button>

                                        {openMenu ===
                                            notification.id && (
                                                <div className="absolute right-0 top-9 z-20 w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-xl">

                                                    {!notification.read && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                markAsRead(
                                                                    notification.id
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                                                        >
                                                            <FiCheck
                                                                size={
                                                                    15
                                                                }
                                                            />
                                                            Mark as read
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteNotification(
                                                                notification.id
                                                            )
                                                        }
                                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
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
                            )
                        )}

                    </div>
                ) : (
                    <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <FiBell size={28} />
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-slate-700">
                            No notifications
                        </h3>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-slate-400">
                            You're all caught up. New
                            hospital activities and alerts
                            will appear here.
                        </p>

                    </div>
                )}

            </div>

            {/* Bottom Information */}

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

                <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <FiInfo size={19} />
                    </div>

                    <div>

                        <h3 className="text-sm font-bold text-blue-800">
                            Stay informed
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-blue-600">
                            Notifications help hospital staff
                            keep track of appointments,
                            payments, patient registrations,
                            pharmacy alerts and other important
                            activities.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Notifications;