"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const update = (k: string, v: string) =>
        setForm((p) => ({ ...p, [k]: v }));

    const strength = (() => {
        const p = form.password;

        if (!p) return 0;

        let s = 0;

        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");

        if (form.password !== form.confirm) {
            return setError("Passwords do not match.");
        }

        if (form.password.length < 8) {
            return setError("Password must be at least 8 characters.");
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            window.location.href = "/dashboard";
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative bg-[#0a0a0f] font-sans flex items-center justify-center">

            <div className="relative z-10 w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-10 py-12 max-sm:px-6 max-sm:py-8">

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
                                <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                            </svg>
                        </div>

                        <span className="text-lg font-extrabold tracking-tight text-white">
                            cloud
                            <span className="text-indigo-400">Vault</span>
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

                {/* Error */}
                {error && (
                    <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>

                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name + Email */}
                    <div className="mb-5 grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">

                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                                Full name
                            </label>

                            <input
                                type="text"
                                required
                                placeholder="Alex Johnson"
                                value={form.name}
                                onChange={(e) =>
                                    update("name", e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:bg-indigo-500/5"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-[10px] uppercase tracking-[1.5px] text-white/40">
                                Email address
                            </label>

                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) =>
                                    update("email", e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:bg-indigo-500/5"
                            />
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
                                required
                                placeholder="Min. 8 characters"
                                value={form.password}
                                onChange={(e) =>
                                    update("password", e.target.value)
                                }
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-indigo-500/50 focus:bg-indigo-500/5"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white/70"
                            >
                                {showPw ? (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M2 4.27 3.28 3 21 20.72 19.73 22l-2.91-2.91A11.94 11.94 0 0 1 12 20c-5 0-9.27-3.11-11-7.5a11.8 11.8 0 0 1 4.02-5.01L2 4.27zM12 17a5 5 0 0 0 2.2-.53l-1.55-1.55A3 3 0 0 1 9.08 11.8L7.53 10.25A5 5 0 0 0 12 17zm0-10c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-3.43 4.75l-2.92-2.92c.23-.57.35-1.18.35-1.83a5 5 0 0 0-6.83-4.66L8.02 7.7A11.4 11.4 0 0 1 12 7z" />
                                    </svg>
                                ) : (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 10a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Strength */}
                        {form.password && (
                            <div className="mt-3 flex items-center gap-3">
                                <div className="flex flex-1 gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-[3px] flex-1 rounded-full ${i <= strength
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
                            required
                            placeholder="Repeat password"
                            value={form.confirm}
                            onChange={(e) =>
                                update("confirm", e.target.value)
                            }
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/50 focus:bg-emerald-500/5"
                        />
                    </div>

                    {/* Terms */}
                    <div className="mb-6 flex items-start gap-2 text-sm text-white/40">
                        <input
                            type="checkbox"
                            required
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        )}

                        {loading
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