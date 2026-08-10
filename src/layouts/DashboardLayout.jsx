import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");

            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");

            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);
    return (
        <div className="flex min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() =>
                    setSidebarOpen(false)
                }
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <Header
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />

                <main className="flex-1 p-4 transition-colors duration-300 sm:p-6 lg:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;