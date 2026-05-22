"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/services/auth";


export default function LoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Signing in...");

        try {
            const res = await loginUser(data);

            if (!res?.success) {
                throw new Error(res?.message || "Login failed");
            }

            toast.success("Login successful 🎉", {
                id: toastId,
            });

            router.push("/dashboard");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(
                error?.message || "Something went wrong",
                {
                    id: toastId,
                }
            );
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0a0a0f] text-white">
            {/* Background blur */}
            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative z-10 flex min-h-screen">
                {/* Left Side */}
                <div className="hidden flex-1 flex-col justify-between border-r border-white/10 p-16 lg:flex">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-white"
                            >
                                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                                <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight">
                            cloud
                            <span className="text-indigo-400">
                                Vault
                            </span>
                        </h1>
                    </Link>

                    {/* Hero */}
                    <div className="max-w-md">
                        <h2 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight">
                            Secure cloud
                            <br />
                            storage for
                            <br />
                            everyone.
                        </h2>

                        <p className="text-sm leading-7 text-white/50">
                            Upload, manage, and access your
                            files securely from anywhere using
                            AWS S3 powered cloud storage.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 text-sm text-white/50">
                        {[
                            "AWS S3 powered storage",
                            "JWT secured authentication",
                            "Fast file uploads",
                            "Access files anywhere",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3"
                            >
                                <div className="h-2 w-2 rounded-full bg-indigo-400" />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex w-full items-center justify-center px-6 py-10 lg:w-[520px] lg:px-14">
                    <div className="w-full">
                        {/* Mobile Logo */}
                        <div className="mb-10 flex items-center gap-3 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500">
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 fill-white"
                                >
                                    <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                                    <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                                </svg>
                            </div>

                            <h1 className="text-xl font-bold">
                                cloud
                                <span className="text-indigo-400">
                                    Vault
                                </span>
                            </h1>
                        </div>

                        {/* Header */}
                        <div className="mb-8">
                            <div className="mb-4 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs uppercase tracking-[2px] text-indigo-400">
                                Welcome back
                            </div>

                            <h2 className="mb-2 text-4xl font-extrabold tracking-tight">
                                Sign in
                            </h2>

                            <p className="text-sm text-white/40">
                                Enter your credentials to continue
                            </p>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[1.5px] text-white/50">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...register("email", {
                                        required:
                                            "Email is required",
                                    })}
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-indigo-500/50 focus:bg-indigo-500/5"
                                />

                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {
                                            errors.email
                                                .message as string
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-[1.5px] text-white/50">
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        {...register("password", {
                                            required:
                                                "Password is required",
                                        })}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm outline-none transition focus:border-indigo-500/50 focus:bg-indigo-500/5"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                                    >
                                        {showPassword ? (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M2 4.27 3.28 3 21 20.72 19.73 22l-2.91-2.91A11.94 11.94 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.8 11.8 0 0 1 4.02-5.01L2 4.27z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {
                                            errors.password
                                                .message as string
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Forgot */}
                            <div className="flex justify-end">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-indigo-400 transition hover:text-indigo-300"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting && (
                                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                )}

                                {isSubmitting
                                    ? "Signing in..."
                                    : "Sign in"}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="my-6 flex items-center gap-4 text-xs text-white/20">
                            <div className="h-px flex-1 bg-white/10" />
                            or
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <p className="text-center text-sm text-white/40">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-emerald-400 transition hover:text-emerald-300"
                            >
                                Create one free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

