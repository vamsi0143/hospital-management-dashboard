import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import Button from "../../components/auth/Button";
import Input from "../../components/auth/Input";
import PasswordInput from "../../components/auth/PasswordInput";
import Logo from "../../components/auth/Logo";

import { IMAGES } from "../../utils/constants";

function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirmPassword: "",
        terms: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(form.phone)) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }

        if (!form.role) {
            newErrors.role = "Please select a role";
        }

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

        if (!form.terms) {
            newErrors.terms =
                "You must accept the terms and conditions";
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
            toast.success("Account created successfully");

            setLoading(false);

            navigate("/");
        }, 1200);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side */}

            <div className="flex items-center justify-center p-5 sm:p-8 lg:p-10">
                <AuthCard>
                    <Logo />

                    <h1 className="text-3xl font-bold text-slate-800">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Create your Hospital Management account
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >
                        {/* Full Name */}

                        <Input
                            label="Full Name"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={handleChange}
                            error={errors.fullName}
                            required
                        />

                        {/* Email */}

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="admin@hospital.com"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        {/* Phone */}

                        <Input
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            placeholder="Enter 10-digit phone number"
                            value={form.phone}
                            onChange={handleChange}
                            error={errors.phone}
                            required
                        />

                        {/* Role */}

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-700">
                                Role
                                <span className="ml-1 text-red-500">*</span>
                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className={`
                  h-12
                  w-full
                  rounded-xl
                  border
                  bg-white
                  px-4
                  text-slate-700
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-200
                  ${errors.role
                                        ? "border-red-500"
                                        : "border-slate-300"
                                    }
                `}
                            >
                                <option value="">
                                    Select your role
                                </option>

                                <option value="admin">
                                    Hospital Administrator
                                </option>

                                <option value="doctor">
                                    Doctor
                                </option>

                                <option value="receptionist">
                                    Receptionist
                                </option>

                                <option value="pharmacist">
                                    Pharmacist
                                </option>

                                <option value="accountant">
                                    Accountant
                                </option>
                            </select>

                            {errors.role && (
                                <p className="text-sm text-red-500">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        {/* Password */}

                        <PasswordInput
                            label="Password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />

                        {/* Confirm Password */}

                        <PasswordInput
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            required
                        />

                        {/* Terms */}

                        <div>
                            <label className="flex items-start gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={form.terms}
                                    onChange={handleChange}
                                    className="mt-1 h-4 w-4 accent-blue-600"
                                />

                                <span>
                                    I agree to the{" "}
                                    <button
                                        type="button"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Terms of Use
                                    </button>{" "}
                                    and{" "}
                                    <button
                                        type="button"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Privacy Policy
                                    </button>
                                </span>
                            </label>

                            {errors.terms && (
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.terms}
                                </p>
                            )}
                        </div>

                        {/* Submit */}

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Create Account
                        </Button>

                        {/* Login Link */}

                        <p className="text-center text-sm text-slate-600">
                            Already have an account?

                            <Link
                                to="/"
                                className="ml-2 font-semibold text-blue-600 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </AuthCard>
            </div>

            {/* Right Side */}

            <div className="relative hidden min-h-screen lg:flex lg:w-[55%] items-center justify-center p-4">
                <div className="relative h-[calc(100vh-2rem)] w-full overflow-hidden rounded-[50px]">
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

export default Signup;