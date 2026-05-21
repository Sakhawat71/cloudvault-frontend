"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

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
  const strengthColor = ["", "#ef4444", "#f59e0b", "#6366f1", "#10b981"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
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
        .blob-tr {
          position: fixed; top: -15%; right: -10%;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%);
          border-radius: 50%; pointer-events: none;
          animation: glow 14s ease-in-out infinite alternate;
        }
        .blob-bl {
          position: fixed; bottom: -15%; left: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 65%);
          border-radius: 50%; pointer-events: none;
          animation: glow2 18s ease-in-out infinite alternate;
        }
        @keyframes glow  { from { transform: scale(1); } to { transform: scale(1.2) translate(-30px, 40px); } }
        @keyframes glow2 { from { transform: scale(1); } to { transform: scale(1.15) translate(30px, -30px); } }
        .card-rise { animation: rise 0.5s ease both; }
        @keyframes rise {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-corner::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 120px; height: 120px;
          background: radial-gradient(circle at top right, rgba(99,102,241,0.15), transparent 70%);
          border-radius: 0 20px 0 0;
          pointer-events: none;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 15px;
          font-size: 14px;
          color: #fff;
          font-family: 'Syne', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .form-input.with-toggle { padding-right: 46px; }
        .form-input::placeholder { color: rgba(255,255,255,0.18); }
        .form-input:focus {
          border-color: rgba(99,102,241,0.55);
          background: rgba(99,102,241,0.04);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.09);
        }
        .form-input.green:focus {
          border-color: rgba(16,185,129,0.55);
          background: rgba(16,185,129,0.04);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.09);
        }
        .btn-submit {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(99,102,241,0.4);
        }
        .btn-submit:active:not(:disabled) { transform: translateY(0); }
        .spinner {
          display: inline-block;
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider-line {
          display: flex; align-items: center; gap: 12px;
        }
        .divider-line::before, .divider-line::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.07);
        }
      `}</style>

      <div className="blob-tr" />
      <div className="blob-bl" />

      <div className="font-syne min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="card-rise card-corner relative z-10 w-full max-w-[520px] bg-white/[0.03] border border-white/[0.07] rounded-[20px] px-10 py-12 max-sm:px-6 max-sm:py-9 backdrop-blur-[10px]">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-9">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <div className="w-[34px] h-[34px] rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, #6366f1, #10b981)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                  <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                </svg>
              </div>
              <span className="text-[18px] font-extrabold text-white tracking-[-0.5px]">
                cloud<span className="text-indigo-400">Vault</span>
              </span>
            </Link>
            <span className="font-mono-dm text-[11px] text-white/30 border border-white/[0.08] px-2.5 py-1 rounded-full">
              Step 1 of 1
            </span>
          </div>

          {/* Form title */}
          <div className="mb-8">
            <div className="font-mono-dm inline-block text-[10px] tracking-[2px] uppercase text-emerald-400 bg-emerald-500/[0.08] border border-emerald-500/20 px-3 py-1 rounded-full mb-3">
              New account
            </div>
            <h2 className="text-[28px] font-extrabold text-white tracking-[-1px] mb-1.5">Create account</h2>
            <p className="font-mono-dm text-[13px] text-white/35">Join thousands of users storing files on the cloud</p>
          </div>

          {/* Error */}
          {error && (
            <div className="font-mono-dm flex items-center gap-2 bg-red-500/[0.07] border border-red-500/20 rounded-[10px] px-3.5 py-3 text-[12px] text-red-400 mb-[18px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name + Email row */}
            <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-4 mb-[18px]">
              <div>
                <label htmlFor="name" className="font-mono-dm block text-[10px] font-semibold tracking-[1.5px] uppercase text-white/40 mb-1.5">
                  Full name
                </label>
                <input
                  id="name" type="text" className="form-input"
                  placeholder="Alex Johnson"
                  value={form.name} onChange={(e) => update("name", e.target.value)} required
                />
              </div>
              <div>
                <label htmlFor="email" className="font-mono-dm block text-[10px] font-semibold tracking-[1.5px] uppercase text-white/40 mb-1.5">
                  Email address
                </label>
                <input
                  id="email" type="email" className="form-input"
                  placeholder="you@example.com"
                  value={form.email} onChange={(e) => update("email", e.target.value)} required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-[18px]">
              <label htmlFor="pw" className="font-mono-dm block text-[10px] font-semibold tracking-[1.5px] uppercase text-white/40 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="pw"
                  type={showPw ? "text" : "password"}
                  className="form-input with-toggle"
                  placeholder="Min. 8 characters"
                  value={form.password} onChange={(e) => update("password", e.target.value)} required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label="Toggle password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer text-white/25 flex items-center p-1 hover:text-white/60 transition-colors"
                >
                  {showPw ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Strength meter */}
              {form.password && (
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-[3px] rounded-full transition-all duration-300"
                        style={{ background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)" }}
                      />
                    ))}
                  </div>
                  <span className="font-mono-dm text-[10px] font-medium min-w-[36px] text-right" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div className="mb-[18px]">
              <label htmlFor="confirm" className="font-mono-dm block text-[10px] font-semibold tracking-[1.5px] uppercase text-white/40 mb-1.5">
                Confirm password
              </label>
              <input
                id="confirm"
                type={showPw ? "text" : "password"}
                className="form-input green"
                placeholder="Repeat password"
                value={form.confirm} onChange={(e) => update("confirm", e.target.value)} required
              />
            </div>

            {/* Terms */}
            <div className="font-mono-dm flex items-start gap-2.5 text-[12px] text-white/35 leading-[1.5] mt-[18px] mb-[22px]">
              <input
                type="checkbox" id="terms" required
                className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 accent-indigo-500 cursor-pointer"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-indigo-400 no-underline hover:text-indigo-300 transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-indigo-400 no-underline hover:text-indigo-300 transition-colors">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-submit w-full py-3.5 rounded-[10px] text-[15px] font-bold text-white border-0 cursor-pointer tracking-[0.3px] disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {loading && <span className="spinner" />}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-line font-mono-dm text-[11px] text-white/15 my-[22px]">
            already have an account?
          </div>

          <div className="font-mono-dm text-center text-[13px] text-white/30">
            <Link href="/login" className="text-emerald-400 no-underline font-medium hover:text-emerald-300 transition-colors">
              Sign in instead →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}