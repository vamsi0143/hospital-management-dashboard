
import {
    FiCalendar,
    FiCreditCard,
    FiUserCheck,
    FiUsers,
} from "react-icons/fi";

import SummaryCard from "../../components/dashboard/SummaryCard";
import TodayAppointments from "../../components/dashboard/TodayAppointments";
import BedAvailability from "../../components/dashboard/BedAvailability";
import RecentPatients from "../../components/dashboard/RecentPatients";
import Departments from "../../components/dashboard/Departments";
import QuickActions from "../../components/dashboard/QuickActions";
import HospitalUpdates from "../../components/dashboard/HospitalUpdates";
import Footer from "../../components/dashboard/Footer";

function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Welcome back! Here's what's happening in
                    your hospital today.
                </p>
            </div>

            {/* Summary Cards */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <SummaryCard
                    title="Total Patients"
                    value="1,248"
                    description="Registered patients"
                    icon={FiUsers}
                    trend="+12.5%"
                />

                <SummaryCard
                    title="Total Doctors"
                    value="86"
                    description="Active medical staff"
                    icon={FiUserCheck}
                    trend="+8.2%"
                />

                <SummaryCard
                    title="Appointments"
                    value="324"
                    description="This month's appointments"
                    icon={FiCalendar}
                    trend="+15.4%"
                />

                <SummaryCard
                    title="Total Revenue"
                    value="$48,650"
                    description="This month's revenue"
                    icon={FiCreditCard}
                    trend="+10.8%"
                />
            </div>
            <QuickActions />

            {/* Main Dashboard Sections */}

            <div className="grid gap-6 xl:grid-cols-5">
                {/* Today's Appointments */}

                <div className="xl:col-span-3">
                    <TodayAppointments />
                </div>

                {/* Bed Availability */}

                <div className="xl:col-span-2">
                    <BedAvailability />
                </div>
            </div>

            {/* Recent Patients */}

            <RecentPatients />
            <Departments />
            <HospitalUpdates />
            <Footer />

            {/* Quick Actions */}

            {/* <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">
                        Quick Actions
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                        Quickly access common hospital operations
                    </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                    >
                        <p className="text-sm font-semibold text-slate-800">
                            Add Patient
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Register a new patient
                        </p>
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                    >
                        <p className="text-sm font-semibold text-slate-800">
                            Add Doctor
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Register medical staff
                        </p>
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                    >
                        <p className="text-sm font-semibold text-slate-800">
                            New Appointment
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Schedule an appointment
                        </p>
                    </button>

                    <button
                        type="button"
                        className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                    >
                        <p className="text-sm font-semibold text-slate-800">
                            Create Invoice
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Generate a new bill
                        </p>
                    </button>
                </div>
            </div> */}
        </div>
    );
}

export default Dashboard;

