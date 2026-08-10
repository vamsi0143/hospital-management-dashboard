import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import Button from "../../components/auth/Button";
import PasswordInput from "../../components/auth/PasswordInput";
import Logo from "../../components/auth/Logo";

import { IMAGES } from "../../utils/constants";

function ResetPassword() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password =
                "Password must contain at least 6 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword =
                "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword =
                "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please correct the highlighted fields");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            toast.success("Password updated successfully");

            setLoading(false);

            navigate("/");
        }, 1200);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side */}

            <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-10">
                <AuthCard>
                    <Logo />

                    <h1 className="text-3xl font-bold text-slate-800">
                        Reset Password
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Create a new secure password for your
                        Hospital Management account.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        <PasswordInput
                            label="New Password"
                            name="password"
                            placeholder="Enter new password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />

                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Reset Password
                        </Button>

                        <div className="text-center">
                            <Link
                                to="/"
                                className="text-sm font-semibold text-blue-600 hover:underline"
                            >
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                </AuthCard>
            </div>

            {/* Right Side */}

            <div className="relative hidden lg:flex lg:w-[55%] items-center justify-center p-6">
                <div className="relative h-[92vh] w-full overflow-hidden rounded-[60px]">
                    <img
                        src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=1400&auto=format&fit=crop&q=80"
                        alt="Hospital"
                        className="h-full w-full object-cover"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-slate-900/35" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center px-12">
                        <div className="max-w-2xl text-center text-white">
                            <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
                                Hospital Management System
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-100 xl:text-xl">
                                Manage patients, doctors, appointments,
                                pharmacy, billing, beds and notifications
                                from one modern dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;

