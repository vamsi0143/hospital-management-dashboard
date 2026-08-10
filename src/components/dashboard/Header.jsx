import {
    FiBell,
    FiChevronDown,
    FiMenu,
    FiMoon,
    FiSearch,
    FiSun,
} from "react-icons/fi";

function Header({
    onMenuClick,
    darkMode,
    setDarkMode,
}) {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/95">

            <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">

                {/* Mobile Menu */}

                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
                >
                    <FiMenu size={22} />
                </button>

                {/* Search */}

                <div className="relative hidden max-w-md flex-1 md:block">

                    <FiSearch
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search patients, doctors..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
                    />

                </div>

                {/* Right Actions */}

                <div className="ml-auto flex items-center gap-2">
                    {/* Theme Toggle */}

                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                        title={
                            darkMode
                                ? "Light Mode"
                                : "Dark Mode"
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-all hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-yellow-400"
                    >
                        {darkMode ? (
                            <FiSun size={19} />
                        ) : (
                            <FiMoon size={19} />
                        )}
                    </button>

                    {/* Notification */}

                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <FiBell size={19} />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                    </button>

                    {/* Mobile Search */}

                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
                    >
                        <FiSearch size={19} />
                    </button>


                    {/* Divider */}

                    <div className="mx-1 hidden h-8 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

                    {/* User */}

                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-slate-50 dark:hover:bg-slate-800"
                    >

                        <img
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"
                            alt="Dr. Ananya Rao"
                            className="h-9 w-9 rounded-xl object-cover"
                        />

                        <div className="hidden text-left lg:block">

                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                Dr. Ananya Rao
                            </p>

                            <p className="text-xs text-slate-400">
                                Cardiologist
                            </p>

                        </div>

                        <FiChevronDown
                            size={16}
                            className="hidden text-slate-400 lg:block"
                        />

                    </button>

                </div>

            </div>

        </header>
    );
}

export default Header;