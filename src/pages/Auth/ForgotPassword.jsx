import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthCard from "../../components/auth/AuthCard";
import Button from "../../components/auth/Button";
import Input from "../../components/auth/Input";
import Logo from "../../components/auth/Logo";

import { IMAGES } from "../../utils/constants";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Email address is required");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email address");
            return;
        }

        setError("");
        setLoading(true);

        setTimeout(() => {
            toast.success("Password reset link sent successfully");

            setLoading(false);
        }, 1200);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side */}

            <div className="flex items-center justify-center bg-slate-50 p-6 sm:p-10">
                <AuthCard>
                    <Logo />

                    <h1 className="text-3xl font-bold text-slate-800">
                        Forgot Password?
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Enter your registered email address and we'll
                        send you a link to reset your password.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            placeholder="admin@hospital.com"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError("");
                            }}
                            error={error}
                            required
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Send Reset Link
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

export default ForgotPassword;

