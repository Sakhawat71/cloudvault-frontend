"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FileRow {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: string;
}

// ── Mock data (replace with real API) ─────────────────────────────────────────
const MOCK_FILES: FileRow[] = [
    { id: "1", name: "Project_Report_Final.pdf", size: 2_480_000, type: "pdf", uploadedAt: "2025-07-10T09:12:00Z" },
    { id: "2", name: "Design_Assets_v3.zip", size: 15_200_000, type: "zip", uploadedAt: "2025-07-09T14:30:00Z" },
    { id: "3", name: "Profile_Photo.png", size: 840_000, type: "image", uploadedAt: "2025-07-08T11:00:00Z" },
    { id: "4", name: "Meeting_Notes.docx", size: 128_000, type: "doc", uploadedAt: "2025-07-07T16:45:00Z" },
    { id: "5", name: "Dataset_Q3.csv", size: 560_000, type: "other", uploadedAt: "2025-07-06T08:20:00Z" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtBytes(b: number) {
    if (b >= 1_000_000) return `${(b / 1_000_000).toFixed(1)} MB`;
    if (b >= 1_000) return `${(b / 1_000).toFixed(0)} KB`;
    return `${b} B`;
}

function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function FileTypeIcon({ type }: { type: string }) {
    const map: Record<string, { bg: string; color: string; label: string }> = {
        pdf: { bg: "bg-red-500/10", color: "text-red-400", label: "PDF" },
        zip: { bg: "bg-amber-500/10", color: "text-amber-400", label: "ZIP" },
        image: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
        doc: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
        other: { bg: "bg-gray-500/10", color: "text-gray-400", label: "FILE" },
    };
    const { bg, color, label } = map[type] ?? map.other;
    return (
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[8px] font-bold shrink-0 ${bg} ${color}`}>
            {label}
        </div>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DashboardPage() {
    const [files, setFiles] = useState<FileRow[]>(MOCK_FILES);
    const [search, setSearch] = useState("");
    const { user } = useAuth();

    const totalSize = files.reduce((a, f) => a + f.size, 0);
    const usedPct = Math.min((totalSize / (5 * 1_000_000_000)) * 100, 100);

    const filtered = files.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => setFiles((p) => p.filter((f) => f.id !== id));

    // ── Stat cards config
    const STATS = [
        {
            label: "Total Files",
            value: String(files.length),
            iconBg: "bg-indigo-500/10",
            iconColor: "text-indigo-400",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2v6l2 2-2 2v6l-2 1h16l-2-1v-6l-2-2 2-2V2H6zm10 14.08V20H8v-3.92L10 14l2 2 2-2 2 2.08zM10 10l-2-2V4h8v4l-2 2-2-2-2 2z" /></svg>,
        },
        {
            label: "Storage Used",
            value: fmtBytes(totalSize),
            iconBg: "bg-emerald-500/10",
            iconColor: "text-emerald-400",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" /></svg>,
        },
        {
            label: "Last Upload",
            value: fmtDate(MOCK_FILES[0]?.uploadedAt ?? ""),
            iconBg: "bg-amber-500/10",
            iconColor: "text-amber-400",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg>,
        },
        {
            label: "Capacity Used",
            value: `${usedPct.toFixed(1)}%`,
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-400",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>,
        },
    ];

    return (
        <div className="p-8 max-[600px]:p-5 max-w-5xl w-full mx-auto space-y-7">

            {/* ── Welcome + quick action ── */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h1 className="text-2xl font-black tracking-tight mb-1">Welcome back, {user?.name}👋</h1>
                    <p className="text-xs text-white/30 font-mono">Here`s what1s happening with your cloud storage today.</p>
                </div>
                <Link
                    href="/dashboard/upload"
                    className="flex items-center gap-2 py-2.5 px-5 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(99,102,241,0.25)] hover:-translate-y-px no-underline"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
                    </svg>
                    Upload Files
                </Link>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((s) => (
                    <div
                        key={s.label}
                        className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 flex items-center gap-4 hover:border-white/[0.1] transition-colors"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg} ${s.iconColor}`}>
                            {s.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[18px] font-black text-white leading-tight truncate">{s.value}</p>
                            <p className="text-[10px] text-white/30 font-mono mt-0.5">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Recent files table ── */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Table header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] gap-3 flex-wrap">
                    <h2 className="text-[13px] font-extrabold tracking-tight">Recent Files</h2>

                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div className="relative flex items-center">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="absolute left-3 text-white/25 pointer-events-none">
                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search files…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-white/[0.04] border border-white/[0.06] rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-indigo-500/40 transition-colors w-44"
                            />
                        </div>

                        <Link
                            href="/dashboard/files"
                            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono no-underline transition-colors whitespace-nowrap"
                        >
                            View all →
                        </Link>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center py-14 text-white/20">
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="mb-3 opacity-30">
                            <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                        </svg>
                        <p className="text-xs font-mono">No files found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-[12px]">
                            <thead>
                                <tr className="border-b border-white/[0.04]">
                                    <th className="text-left px-5 py-3 text-[10px] font-bold font-mono uppercase tracking-widest text-white/20">File</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold font-mono uppercase tracking-widest text-white/20 max-[600px]:hidden">Size</th>
                                    <th className="text-left px-5 py-3 text-[10px] font-bold font-mono uppercase tracking-widest text-white/20 max-[600px]:hidden">Uploaded</th>
                                    <th className="text-right px-5 py-3 text-[10px] font-bold font-mono uppercase tracking-widest text-white/20">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((file) => (
                                    <tr
                                        key={file.id}
                                        className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <FileTypeIcon type={file.type} />
                                                <span className="font-semibold text-white/80 truncate max-w-[200px]">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-white/35 font-mono max-[600px]:hidden">
                                            {fmtBytes(file.size)}
                                        </td>
                                        <td className="px-5 py-3.5 text-white/35 font-mono max-[600px]:hidden">
                                            {fmtDate(file.uploadedAt)}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center justify-end gap-1.5">
                                                {/* Download */}
                                                <button
                                                    className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-indigo-400 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-colors cursor-pointer"
                                                    title="Download"
                                                    onClick={() => window.open(`/api/files/${file.id}/download`)}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
                                                </button>
                                                {/* Delete */}
                                                <button
                                                    className="w-7 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-colors cursor-pointer"
                                                    title="Delete"
                                                    onClick={() => handleDelete(file.id)}
                                                >
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}