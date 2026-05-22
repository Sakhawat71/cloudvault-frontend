"use client";

import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { registerUser } from "@/services/auth";



export default function RegisterPage() {
    const router = useRouter();

    const [showPw, setShowPw] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>();

    const password = watch("password", "");

    // Password strength
    const strength = (() => {
        if (!password) return 0;

        let s = 0;

        if (password.length >= 8) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;

        return s;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];

    const strengthColor = [
        "",
        "bg-red-500",
        "bg-amber-500",
        "bg-indigo-500",
        "bg-emerald-500",
    ][strength];

    // Submit handler
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const registerData = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        const toastId = toast.loading("Signing up...");

        try {
            const res = await registerUser(registerData);

            if (!res?.success) {
                throw new Error(res?.message || "Signup failed");
            }

            toast.success(`${res.message}! Logging you in...`, {
                id: toastId,
            });

            // const result = await signIn("credentials", {
            //     email: data.email,
            //     password: data.password,
            //     redirect: false,
            // });

            // if (result?.error) {
            //     throw new Error("Invalid credentials");
            // }

            toast.success("Login successful 🎉");

            router.push("/");
        } catch (error) {
            console.error(error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!",
                {
                    id: toastId,
                }
            );
        }
    };

    return (
        <div className="relative flex items-center justify-center bg-[#0a0a0f] font-sans">
            <div className="relative z-10 w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-12 backdrop-blur-md max-sm:px-6 max-sm:py-8">

                {/* Top */}
                <div className="mb-9 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                            </svg>
                        </div>

                        <span className="text-lg font-extrabold tracking-tight text-white">
                            cloud
                            <span className="text-indigo-400">
                                Vault
                            </span>
                        </span>
                    </Link>

                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/40">
                        Step 1 of 1
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-8">
                    <div className="mb-3 inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[2px] text-emerald-400">
                        New account
                    </div>

                    <h2 className="mb-1 text-3xl font-extrabold tracking-tight text-white">
                        Create account
                    </h2>

                    <p className="text-sm text-white/40">
                        Join thousands of users storing files on the cloud
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Name + Email */}
                    <div className="mb-5 grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">

                        {/* Name */}
                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                                Full name
                            </label>

                            <input
                                type="text"
                                placeholder="Alex Johnson"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
                            />

                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">
                                    {String(errors.name.message)}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                                Email address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
                            />

                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400">
                                    {String(errors.email.message)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPw ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-indigo-500/50"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                            >
                                👁
                            </button>
                        </div>

                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400">
                                {String(errors.password.message)}
                            </p>
                        )}

                        {/* Strength */}
                        {password && (
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex flex-1 gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-[3px] flex-1 rounded-full ${
                                                i <= strength
                                                    ? strengthColor
                                                    : "bg-white/10"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <span className="min-w-[40px] text-right text-[11px] text-white/50">
                                    {strengthLabel}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-5">
                        <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                            Confirm password
                        </label>

                        <input
                            type={showPw ? "text" : "password"}
                            placeholder="Repeat password"
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords do not match",
                            })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50"
                        />

                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-400">
                                {String(
                                    errors.confirmPassword.message
                                )}
                            </p>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="mb-6 flex items-start gap-2 text-sm text-white/40">
                        <input
                            type="checkbox"
                            {...register("terms", {
                                required:
                                    "You must accept the terms",
                            })}
                            className="mt-1 accent-indigo-500"
                        />

                        <p>
                            I agree to the{" "}
                            <a
                                href="#"
                                className="text-indigo-400 hover:text-indigo-300"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-indigo-400 hover:text-indigo-300"
                            >
                                Privacy Policy
                            </a>
                        </p>
                    </div>

                    {errors.terms && (
                        <p className="-mt-4 mb-4 text-xs text-red-400">
                            {String(errors.terms.message)}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting && (
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        )}

                        {isSubmitting
                            ? "Creating account..."
                            : "Create account"}
                    </button>
                </form>

                {/* Bottom */}
                <div className="my-6 flex items-center gap-3 text-xs text-white/20">
                    <div className="h-px flex-1 bg-white/10" />
                    already have an account?
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="text-center text-sm text-white/40">
                    <Link
                        href="/login"
                        className="text-emerald-400 hover:text-emerald-300"
                    >
                        Sign in instead →
                    </Link>
                </div>
            </div>
        </div>
    );
}