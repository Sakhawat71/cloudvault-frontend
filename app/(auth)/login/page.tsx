"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Login failed");
            window.location.href = "/dashboard";
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
                .font-syne { font-family: 'Syne', sans-serif; }
                .font-mono-dm { font-family: 'DM Mono', monospace; }
                .blob-1 {
                    position: fixed; top: -20%; left: -10%;
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
                    border-radius: 50%; pointer-events: none;
                    animation: drift1 12s ease-in-out infinite alternate;
                }
                .blob-2 {
                    position: fixed; bottom: -20%; right: -10%;
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%);
                    border-radius: 50%; pointer-events: none;
                    animation: drift2 15s ease-in-out infinite alternate;
                }
                @keyframes drift1 {
                    from { transform: translate(0,0) scale(1); }
                    to   { transform: translate(40px,60px) scale(1.1); }
                }
                @keyframes drift2 {
                    from { transform: translate(0,0) scale(1); }
                    to   { transform: translate(-30px,-50px) scale(1.15); }
                }
                .brand-gradient {
                    background: linear-gradient(90deg, #6366f1, #10b981);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .spinner {
                    display: inline-block;
                    width: 16px; height: 16px;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-top-color: #fff;
                    border-radius: 50%;
                    animation: spin 0.7s linear infinite;
                    vertical-align: middle;
                    margin-right: 8px;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                .form-panel { animation: fadeUp 0.5s ease both; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .form-input {
                    width: 100%;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 10px;
                    padding: 14px 16px;
                    font-size: 15px;
                    color: #fff;
                    font-family: 'Syne', sans-serif;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
                }
                .form-input.has-toggle { padding-right: 48px; }
                .form-input::placeholder { color: rgba(255,255,255,0.2); }
                .form-input:focus {
                    border-color: rgba(99,102,241,0.6);
                    background: rgba(99,102,241,0.05);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
                }
                .btn-submit {
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
                    position: relative; overflow: hidden;
                }
                .btn-submit::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
                    opacity: 0; transition: opacity 0.2s;
                }
                .btn-submit:hover:not(:disabled)::after { opacity: 1; }
                .btn-submit:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 30px rgba(99,102,241,0.4);
                }
                .btn-submit:active:not(:disabled) { transform: translateY(0); }
                .divider-line {
                    display: flex; align-items: center; gap: 14px;
                    color: rgba(255,255,255,0.15);
                }
                .divider-line::before, .divider-line::after {
                    content: ''; flex: 1; height: 1px;
                    background: rgba(255,255,255,0.08);
                }
            `}</style>

            <div className="blob-1" />
            <div className="blob-2" />

            <div className="font-syne min-h-screen bg-[#0a0a0f] flex relative overflow-hidden">

                {/* Left branding panel */}
                <div className="hidden lg:flex flex-1 flex-col justify-between p-[60px] border-r border-white/[0.04] relative z-10">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}>
                            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-white">
                                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                                <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                            </svg>
                        </div>
                        <span className="text-[22px] font-extrabold text-white tracking-[-0.5px]">
                            cloud<span className="text-indigo-400">Vault</span>
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="flex-1 flex flex-col justify-center py-10">
                        <h1 className="text-5xl xl:text-[56px] font-extrabold text-white leading-[1.05] tracking-[-2px] mb-5">
                            Secure cloud<br />storage for<br />
                            <em className="not-italic brand-gradient">everyone.</em>
                        </h1>
                        <p className="font-mono-dm text-sm text-white/40 leading-[1.7] max-w-[380px]">
                            Upload, manage, and share your files from anywhere in the world — powered by AWS S3.
                        </p>
                    </div>

                    {/* Feature list */}
                    <div className="flex flex-col gap-[14px]">
                        {[
                            { label: "End-to-end encrypted storage", green: false },
                            { label: "AWS S3 powered file hosting", green: true },
                            { label: "Instant access anywhere", green: false },
                            { label: "JWT-secured authentication", green: true },
                        ].map((f) => (
                            <div key={f.label} className="flex items-center gap-3 font-mono-dm text-[13px] text-white/50">
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.green ? "bg-emerald-500" : "bg-indigo-400"}`} />
                                {f.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right form panel */}
                <div className="form-panel relative z-10 w-full lg:w-auto lg:flex-none lg:basis-[500px] flex flex-col justify-center px-8 py-10 lg:px-[60px] lg:py-[60px]">

                    {/* Mobile brand */}
                    <div className="flex lg:hidden items-center gap-2.5 mb-9">
                        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}>
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                                <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                            </svg>
                        </div>
                        <span className="text-xl font-extrabold text-white tracking-[-0.5px]">
                            Cloud<span className="text-indigo-400">Vault</span>
                        </span>
                    </div>

                    {/* Form header */}
                    <div className="mb-10">
                        <div className="font-mono-dm inline-block text-[11px] font-medium tracking-[2px] uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-3 py-1 rounded-full mb-4">
                            Welcome back
                        </div>
                        <h2 className="text-[32px] font-extrabold text-white tracking-[-1px] mb-2">Sign in</h2>
                        <p className="font-mono-dm text-sm text-white/40">Enter your credentials to continue</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="font-mono-dm flex items-center gap-2.5 bg-red-500/[0.08] border border-red-500/25 rounded-[10px] px-4 py-3 text-[13px] text-red-400 mb-5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Email */}
                        <div className="mb-5">
                            <label htmlFor="email" className="font-mono-dm block text-[11px] font-semibold tracking-[1.5px] uppercase text-white/50 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="form-input"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-5">
                            <label htmlFor="password" className="font-mono-dm block text-[11px] font-semibold tracking-[1.5px] uppercase text-white/50 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    className="form-input has-toggle"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label="Toggle password"
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-white/30 flex items-center p-1 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <Link href="/forgot-password" className="font-mono-dm block text-right text-xs text-indigo-400 no-underline mt-1.5 hover:text-indigo-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-submit w-full py-[15px] rounded-[10px] text-[15px] font-bold text-white border-0 cursor-pointer tracking-[0.5px] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading && <span className="spinner" />}
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    <div className="divider-line font-mono-dm text-xs my-6">or</div>

                    <div className="font-mono-dm text-center text-sm text-white/35">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-emerald-400 no-underline font-medium hover:text-emerald-300 transition-colors">
                            Create one free
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}