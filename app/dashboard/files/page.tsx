"use client";

import { useState } from "react";
import Link from "next/link";

// 1. Matches your Prisma File Model exactly
interface FileModel {
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize: number; // Int in Prisma
    fileType: string;
    s3Key: string;
    userId: string;
    createdAt: string; // DateTime
}

export default function FilesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // 2. Updated sample data to reflect your real model properties
    const [files] = useState<FileModel[]>([
        { id: "obj-9a2c", fileName: "system_kernel_logs.txt", fileUrl: "https://bucket.s3.amazonaws.com/logs.txt", fileSize: 14540, fileType: "TXT", s3Key: "uploads/logs.txt", userId: "usr-201", createdAt: "2026-05-18 14:22" },
        { id: "obj-4f8e", fileName: "production_db_backup.tar.gz", fileUrl: "https://bucket.s3.amazonaws.com/backup.tar.gz", fileSize: 432852100, fileType: "ZIP", s3Key: "uploads/backup.tar.gz", userId: "usr-201", createdAt: "2026-05-20 02:00" },
        { id: "obj-1b7d", fileName: "vector_brand_asset_matrix.svg", fileUrl: "https://bucket.s3.amazonaws.com/asset.svg", fileSize: 2516580, fileType: "SVG", s3Key: "uploads/asset.svg", userId: "usr-201", createdAt: "2026-04-12 09:15" },
        { id: "obj-6c9a", fileName: "q4_compliance_audit_v2.pdf", fileUrl: "https://bucket.s3.amazonaws.com/audit.pdf", fileSize: 18979200, fileType: "PDF", s3Key: "uploads/audit.pdf", userId: "usr-202", createdAt: "2026-05-01 11:40" },
        { id: "obj-3e2f", fileName: "user_avatar_pool_compiled.json", fileUrl: "https://bucket.s3.amazonaws.com/pool.json", fileSize: 9332700, fileType: "JSON", s3Key: "uploads/pool.json", userId: "usr-201", createdAt: "2026-05-19 23:11" }
    ]);

    function getFileBadgeColors(type: string) {
        const mapping: Record<string, string> = {
            PDF: "bg-red-500/10 text-red-400 border-red-500/10",
            ZIP: "bg-amber-500/10 text-amber-400 border-amber-500/10",
            SVG: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
            TXT: "bg-gray-500/10 text-gray-400 border-white/[0.06]",
            JSON: "bg-purple-500/10 text-purple-400 border-purple-500/10",
        };
        return mapping[type] ?? "bg-gray-500/10 text-gray-400 border-white/[0.06]";
    }

    // Helper to format raw integer bytes to readable strings
    function formatBytes(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
    }

    const filteredFiles = files.filter(file => {
        return file.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex text-white antialiased">

            {/* ─── MAIN FRAME CONTENT ────────────────────────────────────── */}
            <main className="flex-1 min-h-screen flex flex-col max-[860px]:pl-0">
                
                {/* Main Space Container */}
                <div className="p-8 max-[600px]:p-5 flex-1 max-w-6xl w-full mx-auto space-y-6">
                    {/* Top Row Context Title Block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-1">Bucket Infrastructure Explorer</h1>
                            <p className="text-xs text-white/35 font-mono">Query, analyze, and manage files staged in localized container pools</p>
                        </div>
                        <Link href="/dashboard/upload" className="w-fit flex items-center gap-2 py-2 px-4 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px no-underline">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                            Ingest New File
                        </Link>
                    </div>

                    {/* Filter Utilities Matrix Base */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/[0.01] border border-white/[0.05] p-3 rounded-xl">
                        {/* Query Input Bar */}
                        <div className="w-full relative">
                            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/20" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                            <input
                                type="text"
                                placeholder="Filter objects by filename pattern..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 bg-black/40 border border-white/[0.06] rounded-lg pl-9 pr-4 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Data Storage Grid Output Table */}
                    <div className="border border-white/[0.05] rounded-xl bg-white/[0.01] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-xs">
                                <thead>
                                    <tr className="border-b border-white/[0.05] bg-white/[0.01] text-white/40 font-mono text-[10px] tracking-wider uppercase select-none">
                                        <th className="p-4 font-bold">File Asset Descriptor</th>
                                        <th className="p-4 font-bold">Storage Size</th>
                                        <th className="p-4 font-bold">AWS S3 Identifier Key</th>
                                        <th className="p-4 font-bold">Committed Time</th>
                                        <th className="p-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {filteredFiles.length > 0 ? (
                                        filteredFiles.map((file) => (
                                            <tr key={file.id} className="hover:bg-white/[0.01] transition-colors group">
                                                {/* File Name (fileName) + Type Badge (fileType) */}
                                                <td className="p-4 font-sans flex items-center gap-3 min-w-[240px]">
                                                    <span className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold border ${getFileBadgeColors(file.fileType)}`}>
                                                        {file.fileType}
                                                    </span>
                                                    <span className="font-bold text-white/90 group-hover:text-white truncate max-w-[220px]" title={file.fileName}>
                                                        {file.fileName}
                                                    </span>
                                                </td>
                                                {/* Size (fileSize) converted from raw bytes */}
                                                <td className="p-4 font-mono text-white/60">{formatBytes(file.fileSize)}</td>
                                                {/* S3 Key string (s3Key) */}
                                                <td className="p-4 font-mono text-white/40 text-[11px]">{file.s3Key}</td>
                                                {/* Timestamp (createdAt) */}
                                                <td className="p-4 font-mono text-white/40 text-[11px]">{file.createdAt}</td>
                                                {/* Action menu using dynamic URL (fileUrl) */}
                                                <td className="p-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a href={file.fileUrl} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-md bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer" title="Download Asset">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                                        </a>
                                                        <button className="w-7 h-7 rounded-md bg-white/[0.02] hover:bg-red-500/10 border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-red-400 transition-colors cursor-pointer" title="Purge Record">
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-12 text-center text-white/20 font-mono select-none">
                                                <svg className="mx-auto mb-2 opacity-20" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                                No storage entries match query string parameters.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}