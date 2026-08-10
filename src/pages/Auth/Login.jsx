import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import Button from "../../components/auth/Button";
import Input from "../../components/auth/Input";
import PasswordInput from "../../components/auth/PasswordInput";
import Logo from "../../components/auth/Logo";

import { login } from "../../redux/slices/authSlice";
import { IMAGES } from "../../utils/constants";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            email: "",
            password: "",
        };

        // Email validation
        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        setErrors({
            email: "",
            password: "",
        });

        setLoading(true);

        setTimeout(() => {
            dispatch(
                login({
                    name: "Administrator",
                    email: form.email,
                })
            );

            toast.success("Login Successful");

            navigate("/dashboard");

            setLoading(false);
        }, 1000);
    };
    return (
        <div className="flex min-h-screen">
            {/* Left */}

            <div className="flex items-center justify-center bg-slate-50 p-6 lg:w-[45%]">
                <AuthCard>
                    <Logo />

                    <h1 className="text-3xl font-bold text-slate-800">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Login to continue to your dashboard
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >
                        <Input
                            label="Email Address"
                            name="email"
                            placeholder="admin@hospital.com"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                        />

                        <PasswordInput
                            label="Password"
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={form.remember}
                                    onChange={handleChange}
                                />

                                Remember Me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm text-slate-600">
                            Don't have an account?

                            <Link
                                to="/signup"
                                className="ml-2 font-semibold text-blue-600"
                            >
                                Create Account
                            </Link>
                        </p>
                    </form>
                </AuthCard>
            </div>

            {/* Right */}

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

export default Login;