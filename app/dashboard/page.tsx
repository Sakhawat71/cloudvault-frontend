"use client";

import { useState } from "react";
import Link from "next/link";


const MOCK_USER = { name: "Alex Johnson", email: "alex@example.com", plan: "Free" };
const MOCK_STATS = { totalFiles: 24, storageUsedMB: 348, storageLimitMB: 5120 };
const MOCK_RECENT = [
    { id: "1", name: "Project_Report_Final.pdf", size: 2400000, uploadedAt: "2024-06-10T09:15:00Z", type: "pdf" },
    { id: "2", name: "design_assets.zip", size: 5100000, uploadedAt: "2024-06-09T14:22:00Z", type: "zip" },
    { id: "3", name: "cover_letter.docx", size: 340000, uploadedAt: "2024-06-09T08:00:00Z", type: "doc" },
    { id: "4", name: "profile_photo.png", size: 870000, uploadedAt: "2024-06-08T18:45:00Z", type: "img" },
    { id: "5", name: "notes.txt", size: 12000, uploadedAt: "2024-06-07T11:30:00Z", type: "txt" },
];

// ─── Helpers
function fmtSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}
function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
function typeIcon(type: string) {
    const icons: Record<string, { bg: string; color: string; label: string }> = {
        pdf: { bg: "bg-red-500/10", color: "text-red-400", label: "PDF" },
        zip: { bg: "bg-amber-500/10", color: "text-amber-400", label: "ZIP" },
        doc: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
        img: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
        txt: { bg: "bg-gray-500/10", color: "text-gray-400", label: "TXT" },
    };
    return icons[type] ?? { bg: "bg-gray-500/10", color: "text-gray-400", label: "FILE" };
}

// ─── Component 
export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const storagePercent = Math.round((MOCK_STATS.storageUsedMB / MOCK_STATS.storageLimitMB) * 100);

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex text-white antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Mobile backdrop overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm min-[861px]:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`fixed top-0 bottom-0 left-0 z-50 w-60 shrink-0 border-r border-white/[0.06] bg-white/[0.015] backdrop-blur-xl flex flex-col py-6 transition-transform duration-300 ease-in-out min-[861px]:translate-x-0 min-[861px]:z-10 ${sidebarOpen ? "translate-x-0 shadow-[4px_0_30px_rgba(0,0,0,0.6)]" : "-translate-x-full"
                }`}>
                {/* Logo Brand Head */}
                <Link href="/" className="flex items-center gap-2.5 px-6 pb-6 border-b border-white/[0.06] no-underline">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                            <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                            <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                        </svg>
                    </div>
                    <span className="text-lg font-black text-white tracking-tight">cloud<span className="text-[#818cf8]">Vault</span></span>
                </Link>

                {/* Nav Links section */}
                <nav className="pt-6 px-4 flex-1 space-y-1">
                    <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-white/20 px-3 mb-2">Menu</div>
                    {[
                        { label: "Dashboard", active: true, icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg> },
                        { label: "My Files", active: false, href: "/dashboard/files", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg> },
                        { label: "Upload", active: false, href: "/dashboard/upload", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg> },
                        { label: "Profile", active: false, href: "/profile", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> },
                    ].map((item) => (
                        <Link
                            key={item.label}
                            href={item.href ?? "#"}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-[13px] font-semibold transition-all duration-200 no-underline ${item.active
                                    ? "bg-indigo-500/10 text-[#818cf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-indigo-500/10"
                                    : "text-white/40 border border-transparent hover:bg-white/[0.03] hover:text-white/80"
                                }`}
                        >
                            <span className={`shrink-0 ${item.active ? "opacity-100" : "opacity-60"}`}>{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}

                    <div className="pt-4">
                        <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-white/20 px-3 mb-2">System</div>
                        <Link href="/api/auth/logout" className="flex items-center gap-3 py-2.5 px-3 border border-transparent rounded-lg text-[13px] font-semibold text-red-400/70 hover:bg-red-500/5 hover:text-red-400 transition-colors no-underline">
                            <svg className="shrink-0 opacity-60" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                            Logout
                        </Link>
                    </div>
                </nav>

                {/* Footer User Widget / Meter */}
                <div className="p-4 border-t border-white/[0.06] space-y-3">
                    <div className="p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-mono text-[9px] font-semibold tracking-wider uppercase text-white/30">Storage</span>
                            <span className="font-mono text-[10px] text-white/50">{MOCK_STATS.storageUsedMB} MB / {MOCK_STATS.storageLimitMB / 1024} GB</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#10b981] transition-[width] duration-1000 ease-out" style={{ width: `${storagePercent}%` }} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 border border-white/[0.04] rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">{MOCK_USER.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                            <div className="text-[12.5px] font-bold text-white truncate">{MOCK_USER.name}</div>
                            <div className="text-[10px] text-white/30 font-mono tracking-tight">{MOCK_USER.plan} Plan</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Application Container */}
            <main className="flex-1 min-h-screen flex flex-col pl-60 max-[860px]:pl-0">
                {/* Header Navbar */}
                <header className="h-16 border-b border-white/[0.05] flex items-center px-8 max-[860px]:px-5 gap-4 bg-[#0a0a0f]/70 backdrop-blur-md sticky top-0 z-30">
                    <button className="hidden max-[860px]:flex bg-transparent border-0 text-white/60 p-1 cursor-pointer transition-colors hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Navigation Menu">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        </svg>
                    </button>
                    <div className="text-[15px] font-extrabold tracking-tight flex-1 flex items-center gap-2">
                        Dashboard
                        <span className="text-white/20 font-normal text-xs font-mono">/ Overview</span>
                    </div>
                    <div>
                        <Link href="/deshboard/upload" className="flex items-center gap-1.5 py-2 px-4 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-lg text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(99,102,241,0.35)] no-underline">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>
                            Upload File
                        </Link>
                    </div>
                </header>

                {/* Main Dynamic View Content */}
                <div className="p-8 max-[600px]:p-5 flex-1 max-w-6xl w-full mx-auto">
                    {/* Welcome Header Hero */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-black tracking-tight mb-1">Welcome back, {MOCK_USER.name.split(" ")[0]} 👋</h1>
                        <p className="text-xs text-white/35 font-mono">Cloud cluster status up and functional</p>
                    </div>

                    {/* Dashboard Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {/* Metric Box 1 */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 relative overflow-hidden group transition-all hover:border-indigo-500/30 hover:bg-white/[0.03] hover:-translate-y-0.5 duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-indigo-500/10 text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg>
                            </div>
                            <div className="text-2xl font-black tracking-tight mb-0.5">{MOCK_STATS.totalFiles}</div>
                            <div className="text-[11px] text-white/35 font-mono uppercase tracking-wider font-semibold">Total Files</div>
                            <div className="text-[10px] text-white/20 font-mono mt-1">S3 persistent assets</div>
                        </div>

                        {/* Metric Box 2 */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 relative overflow-hidden group transition-all hover:border-emerald-500/30 hover:bg-white/[0.03] hover:-translate-y-0.5 duration-300">
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" /></svg>
                            </div>
                            <div className="text-2xl font-black tracking-tight mb-0.5">{MOCK_STATS.storageUsedMB} <span className="text-xs font-normal text-white/40 font-mono">MB</span></div>
                            <div className="text-[11px] text-white/35 font-mono uppercase tracking-wider font-semibold">Storage Used</div>
                            <div className="text-[10px] text-white/20 font-mono mt-1">{storagePercent}% of {MOCK_STATS.storageLimitMB / 1024} GB cap</div>
                        </div>

                        {/* Metric Box 3 */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 relative overflow-hidden group transition-all hover:border-amber-500/30 hover:bg-white/[0.03] hover:-translate-y-0.5 duration-300 sm:col-span-2 lg:col-span-1">
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_70%)] pointer-events-none" />
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>
                            </div>
                            <div className="text-2xl font-black tracking-tight mb-0.5">{MOCK_RECENT.length}</div>
                            <div className="text-[11px] text-white/35 font-mono uppercase tracking-wider font-semibold">Weekly Uploads</div>
                            <div className="text-[10px] text-white/20 font-mono mt-1">Activity rolling window</div>
                        </div>
                    </div>

                    {/* Quick Core Interface Buttons Section */}
                    <div className="mb-3.5 flex items-center">
                        <span className="text-xs font-bold tracking-tight text-white/60 font-mono uppercase">Quick Hub Actions</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                        {[
                            { label: "Upload File", sub: "Add S3 object", href: "/dashboard/upload", bg: "bg-indigo-500/10", color: "text-[#818cf8]", border: "hover:border-indigo-500/20", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg> },
                            { label: "View Files", sub: "Inspect logs", href: "/files", bg: "bg-emerald-500/10", color: "text-[#34d399]", border: "hover:border-emerald-500/20", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z" /></svg> },
                            { label: "Profile", sub: "Identity setup", href: "/profile", bg: "bg-amber-500/10", color: "text-[#fbbf24]", border: "hover:border-amber-500/20", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg> },
                            { label: "Purge Asset", sub: "Remove blocks", href: "/dashboard/files", bg: "bg-red-500/10", color: "text-[#f87171]", border: "hover:border-red-500/20", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg> },
                        ].map((act) => (
                            <Link key={act.label} href={act.href} className={`p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex flex-col items-start gap-3 no-underline text-white transition-all hover:bg-white/[0.04] hover:-translate-y-0.5 duration-200 ${act.border}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${act.bg} ${act.color}`}>{act.icon}</div>
                                <div className="min-w-0 w-full">
                                    <div className="text-[13px] font-bold truncate">{act.label}</div>
                                    <div className="text-[10px] text-white/30 font-mono truncate">{act.sub}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Recent Uploaded File Rows List */}
                    <div className="flex items-center justify-between mb-3.5">
                        <span className="text-xs font-bold tracking-tight text-white/60 font-mono uppercase">Recent Upload Logs</span>
                        <Link href="/dashboard/files" className="text-xs text-indigo-400 font-mono hover:text-indigo-300 no-underline transition-colors">See complete manifest →</Link>
                    </div>

                    {/* Table File Component Container */}
                    <div className="bg-white/[0.015] border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-md">
                        {/* Table Head row */}
                        <div className="grid grid-cols-[1fr_90px] sm:grid-cols-[1fr_100px_110px_100px] px-6 py-3 border-b border-white/[0.06] bg-white/[0.01] font-mono text-[9px] font-bold tracking-wider uppercase text-white/30">
                            <span>Object Asset Name</span>
                            <span>Size</span>
                            <span className="hidden sm:block">Timestamp</span>
                            <span className="hidden sm:block text-right">Actions</span>
                        </div>

                        {/* Table Data list rows loop */}
                        <div className="divide-y divide-white/[0.04]">
                            {MOCK_RECENT.map((file) => {
                                const iconStyle = typeIcon(file.type);
                                return (
                                    <div key={file.id} className="grid grid-cols-[1fr_90px] sm:grid-cols-[1fr_100px_110px_100px] px-6 py-3.5 items-center transition-colors hover:bg-white/[0.025]">
                                        <div className="flex items-center gap-3 min-w-0 pr-2">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[8px] font-bold shrink-0 ${iconStyle.bg} ${iconStyle.color}`}>{iconStyle.label}</div>
                                            <span className="text-[13px] font-semibold text-white/85 truncate">{file.name}</span>
                                        </div>
                                        <div className="font-mono text-xs text-white/40">{fmtSize(file.size)}</div>
                                        <div className="font-mono text-[11px] text-white/30 hidden sm:block">{fmtDate(file.uploadedAt)}</div>
                                        <div className="hidden sm:flex gap-1.5 justify-end">
                                            <a href="#" className="w-7 h-7 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] rounded-md text-white/40 hover:bg-white/10 hover:text-white transition-all" title="Download payload data structure">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 20h14v-2H5v2zm7-18L5.33 9h4.34v6h4.66V9h4.34L12 2z" /></svg>
                                            </a>
                                            <a href="#" className="w-7 h-7 flex items-center justify-center bg-white/[0.04] border border-white/[0.06] rounded-md text-white/40 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all" title="Wipe block address">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
