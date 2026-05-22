"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface StagedFile {
    id: string;
    file: File;
    name: string;
    size: number;
    type: string;
    previewUrl?: string;
    textPreview?: string;
}

function getFileTypeInfo(fileName: string) {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    const icons: Record<string, { bg: string; color: string; label: string }> = {
        pdf: { bg: "bg-red-500/10", color: "text-red-400", label: "PDF" },
        zip: { bg: "bg-amber-500/10", color: "text-amber-400", label: "ZIP" },
        rar: { bg: "bg-amber-500/10", color: "text-amber-400", label: "RAR" },
        doc: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
        docx: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
        png: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
        jpg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
        jpeg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
        svg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "SVG" },
        txt: { bg: "bg-gray-500/10", color: "text-gray-400", label: "TXT" },
        json: { bg: "bg-purple-500/10", color: "text-purple-400", label: "JSON" },
    };
    return icons[ext] ?? { bg: "bg-gray-500/10", color: "text-gray-400", label: "FILE" };
}

function fmtSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

export default function UploadPage() {
    const [dragActive, setDragActive] = useState(false);
    const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const processFiles = (files: FileList) => {
        Array.from(files).forEach((file) => {
            const ext = file.name.split(".").pop()?.toLowerCase() || "";
            const staged: StagedFile = {
                id: Math.random().toString(36).substring(2, 9),
                file, name: file.name, size: file.size, type: ext,
            };
            if (file.type.startsWith("image/")) {
                staged.previewUrl = URL.createObjectURL(file);
                setStagedFiles((p) => [...p, staged]);
            } else if (file.type === "text/plain" || ext === "json" || ext === "txt") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    staged.textPreview = e.target?.result as string;
                    setStagedFiles((p) => [...p, staged]);
                };
                reader.readAsText(file.slice(0, 300));
            } else {
                setStagedFiles((p) => [...p, staged]);
            }
        });
    };

    const handleDrag = (e: DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) processFiles(e.dataTransfer.files);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) processFiles(e.target.files);
    };

    const removeFile = (id: string, url?: string) => {
        if (url) URL.revokeObjectURL(url);
        setStagedFiles((p) => p.filter((f) => f.id !== id));
    };

    const triggerUpload = async () => {
        if (!stagedFiles.length) return;
        setIsUploading(true);
        await new Promise((r) => setTimeout(r, 2000));
        stagedFiles.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
        setStagedFiles([]);
        setIsUploading(false);
        alert("Files uploaded successfully to AWS S3.");
    };

    return (
        <div className="p-8 max-[600px]:p-5 max-w-4xl w-full mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-black tracking-tight mb-1">Upload Files</h1>
                <p className="text-xs text-white/35 font-mono">
                    Stage and upload files securely to your AWS S3 bucket
                </p>
            </div>

            {/* ── Drop zone ── */}
            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer select-none ${dragActive
                        ? "border-indigo-400 bg-indigo-500/[0.04] scale-[0.99] shadow-[0_0_25px_rgba(99,102,241,0.1)]"
                        : "border-white/[0.08] bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                />
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </div>
                <div>
                    <p className="text-[14px] font-bold tracking-tight">
                        Drag &amp; drop files here, or{" "}
                        <span className="text-[#818cf8] hover:underline">browse files</span>
                    </p>
                    <p className="text-[11px] text-white/30 font-mono mt-1">
                        Accepts PDF, DOC, DOCX, images, ZIP, TXT — up to 50 MB each
                    </p>
                </div>
            </div>

            {/* ── Staged manifest ── */}
            {stagedFiles.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono tracking-wider uppercase text-white/40">
                            Staged ({stagedFiles.length})
                        </span>
                        <button
                            onClick={() => setStagedFiles([])}
                            className="text-[11px] font-mono text-red-400/70 hover:text-red-400 bg-transparent border-0 cursor-pointer"
                        >
                            Clear all
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stagedFiles.map((file) => {
                            const meta = getFileTypeInfo(file.name);
                            return (
                                <div
                                    key={file.id}
                                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors"
                                >
                                    {/* Top row */}
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[8px] font-bold shrink-0 ${meta.bg} ${meta.color}`}>
                                            {meta.label}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[13px] font-bold truncate text-white/90">{file.name}</div>
                                            <div className="text-[10px] text-white/40 font-mono">{fmtSize(file.size)}</div>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); removeFile(file.id, file.previewUrl); }}
                                            className="w-6 h-6 rounded-md bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Preview */}
                                    <div className="w-full h-32 rounded-lg border border-white/[0.04] bg-black/40 overflow-hidden flex items-center justify-center">
                                        {file.previewUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={file.previewUrl}
                                                alt="preview"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : file.textPreview ? (
                                            <pre className="w-full h-full p-2.5 font-mono text-[10px] text-white/50 overflow-hidden leading-relaxed select-none whitespace-pre-wrap text-left">
                                                {file.textPreview}...
                                            </pre>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1.5 opacity-30 select-none">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                                                </svg>
                                                <span className="font-mono text-[9px] uppercase tracking-wider">No preview</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Upload button */}
                    <div className="pt-4 border-t border-white/[0.05] flex justify-end">
                        <button
                            onClick={triggerUpload}
                            disabled={isUploading}
                            className="flex items-center gap-2 py-2.5 px-5 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] disabled:from-white/10 disabled:to-white/10 disabled:text-white/30 disabled:cursor-not-allowed rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px"
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Uploading to S3…
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                                    </svg>
                                    Upload {stagedFiles.length} file{stagedFiles.length !== 1 ? "s" : ""}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}










// "use client";

// import { useState, useRef, DragEvent, ChangeEvent } from "react";
// import Link from "next/link";

// interface StagedFile {
//     id: string;
//     file: File;
//     name: string;
//     size: number;
//     type: string;
//     previewUrl?: string;
//     textPreview?: string;
// }

// export default function UploadPage() {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [dragActive, setDragActive] = useState(false);
//     const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
//     const [isUploading, setIsUploading] = useState(false);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // Dynamic type checking for styled badge previews
//     function getFileTypeInfo(fileName: string) {
//         const ext = fileName.split(".").pop()?.toLowerCase() || "";
//         const icons: Record<string, { bg: string; color: string; label: string }> = {
//             pdf: { bg: "bg-red-500/10", color: "text-red-400", label: "PDF" },
//             zip: { bg: "bg-amber-500/10", color: "text-amber-400", label: "ZIP" },
//             rar: { bg: "bg-amber-500/10", color: "text-amber-400", label: "RAR" },
//             doc: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
//             docx: { bg: "bg-indigo-500/10", color: "text-indigo-400", label: "DOC" },
//             png: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
//             jpg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
//             jpeg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "IMG" },
//             svg: { bg: "bg-emerald-500/10", color: "text-emerald-400", label: "SVG" },
//             txt: { bg: "bg-gray-500/10", color: "text-gray-400", label: "TXT" },
//             json: { bg: "bg-purple-500/10", color: "text-purple-400", label: "JSON" },
//         };
//         return icons[ext] ?? { bg: "bg-gray-500/10", color: "text-gray-400", label: "FILE" };
//     }

//     function fmtSize(bytes: number) {
//         if (bytes < 1024) return `${bytes} B`;
//         if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
//         return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
//     }

//     // Process staged files & handle native previews safely
//     const processFiles = (files: FileList) => {
//         const fileArray = Array.from(files);

//         fileArray.forEach((file) => {
//             const ext = file.name.split(".").pop()?.toLowerCase() || "";
//             const newStagedFile: StagedFile = {
//                 id: Math.random().toString(36).substring(2, 9),
//                 file,
//                 name: file.name,
//                 size: file.size,
//                 type: ext
//             };

//             // Read image formats for active background asset staging
//             if (file.type.startsWith("image/")) {
//                 newStagedFile.previewUrl = URL.createObjectURL(file);
//                 setStagedFiles(prev => [...prev, newStagedFile]);
//             }
//             // Sniff human-readable text contents for mini logs
//             else if (file.type === "text/plain" || ext === "json" || ext === "txt") {
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     newStagedFile.textPreview = e.target?.result as string;
//                     setStagedFiles(prev => [...prev, newStagedFile]);
//                 };
//                 reader.readAsText(file.slice(0, 300)); // Sample first 300 characters
//             } else {
//                 setStagedFiles(prev => [...prev, newStagedFile]);
//             }
//         });
//     };

//     const handleDrag = (e: DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true);
//         } else if (e.type === "dragleave") {
//             setDragActive(false);
//         }
//     };

//     const handleDrop = (e: DragEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragActive(false);
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             processFiles(e.dataTransfer.files);
//         }
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             processFiles(e.target.files);
//         }
//     };

//     const removeFile = (id: string, url?: string) => {
//         if (url) URL.revokeObjectURL(url);
//         setStagedFiles(prev => prev.filter(f => f.id !== id));
//     };

//     const triggerUpload = async () => {
//         if (stagedFiles.length === 0) return;
//         setIsUploading(true);

//         // Simulating progressive cloud chunk storage integration
//         await new Promise(resolve => setTimeout(resolve, 2000));

//         stagedFiles.forEach(f => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
//         setStagedFiles([]);
//         setIsUploading(false);
//         alert("Assets deployed safely into AWS cluster pools.");
//     };

//     return (
//         <div className="min-h-screen bg-[#0a0a0f] flex text-white antialiased">
//             {/* Mobile backdrop overlay */}
//             {sidebarOpen && (
//                 <div
//                     className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm min-[861px]:hidden transition-opacity duration-300"
//                     onClick={() => setSidebarOpen(false)}
//                 />
//             )}

//             {/* Sidebar Navigation */}
//             <aside className={`fixed top-0 bottom-0 left-0 z-50 w-60 shrink-0 border-r border-white/[0.06] bg-white/[0.015] backdrop-blur-xl flex flex-col py-6 transition-transform duration-300 ease-in-out min-[861px]:translate-x-0 min-[861px]:z-10 ${sidebarOpen ? "translate-x-0 shadow-[4px_0_30px_rgba(0,0,0,0.6)]" : "-translate-x-full"
//                 }`}>
//                 <Link href="/dashboard" className="flex items-center gap-2.5 px-6 pb-6 border-b border-white/[0.06] no-underline">
//                     <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
//                             <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
//                             <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
//                         </svg>
//                     </div>
//                     <span className="text-lg font-black text-white tracking-tight">cloud<span className="text-[#818cf8]">Vault</span></span>
//                 </Link>

//                 <nav className="pt-6 px-4 flex-1 space-y-1">
//                     <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-white/20 px-3 mb-2">Menu</div>
//                     <Link href="/dashboard" className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-[13px] font-semibold text-white/40 border border-transparent hover:bg-white/[0.03] hover:text-white/80 transition-all no-underline">
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
//                         Dashboard
//                     </Link>
//                     <Link href="#" className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-[13px] font-semibold bg-indigo-500/10 text-[#818cf8] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-indigo-500/10 no-underline">
//                         <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" /></svg>
//                         Upload Area
//                     </Link>
//                 </nav>
//             </aside>

//             {/* Main Application Base */}
//             <main className="flex-1 min-h-screen flex flex-col pl-60 max-[860px]:pl-0">
//                 {/* Header Navbar */}
//                 <header className="h-16 border-b border-white/[0.05] flex items-center px-8 max-[860px]:px-5 gap-4 bg-[#0a0a0f]/70 backdrop-blur-md sticky top-0 z-30">
//                     <button className="hidden max-[860px]:flex bg-transparent border-0 text-white/60 p-1 cursor-pointer transition-colors hover:text-white" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle Menu">
//                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
//                     </button>
//                     <div className="text-[15px] font-extrabold tracking-tight flex-1 flex items-center gap-2">
//                         Cloud Pipeline
//                         <span className="text-white/20 font-normal text-xs font-mono">/ Ingest Storage</span>
//                     </div>
//                 </header>

//                 {/* View Frame */}
//                 <div className="p-8 max-[600px]:p-5 flex-1 max-w-4xl w-full mx-auto space-y-6">
//                     <div>
//                         <h1 className="text-2xl font-black tracking-tight mb-1">Upload New Payload Assets</h1>
//                         <p className="text-xs text-white/35 font-mono">Stage and stream items securely into your cloud infrastructure parameters</p>
//                     </div>

//                     {/* Interactive Dropzone Element */}
//                     <div
//                         onDragEnter={handleDrag}
//                         onDragOver={handleDrag}
//                         onDragLeave={handleDrag}
//                         onDrop={handleDrop}
//                         onClick={() => fileInputRef.current?.click()}
//                         className={`border-2 border-dashed rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 cursor-pointer ${dragActive
//                                 ? "border-indigo-400 bg-indigo-500/[0.04] scale-[0.99] shadow-[0_0_25px_rgba(99,102,241,0.1)]"
//                                 : "border-white/[0.08] bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.02]"
//                             }`}
//                     >
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             multiple
//                             className="hidden"
//                         />

//                         <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
//                             <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//                                 <polyline points="17 8 12 3 7 8" />
//                                 <line x1="12" y1="3" x2="12" y2="15" />
//                             </svg>
//                         </div>

//                         <div>
//                             <p className="text-[14px] font-bold tracking-tight">Drag & Drop objects here, or <span className="text-[#818cf8] hover:underline">browse files</span></p>
//                             <p className="text-[11px] text-white/30 font-mono mt-1">Accepts images, raw system logs, PDFs and packed distributions up to 50MB</p>
//                         </div>
//                     </div>

//                     {/* Staged Live Manifest & Previews */}
//                     {stagedFiles.length > 0 && (
//                         <div className="space-y-3">
//                             <div className="flex items-center justify-between">
//                                 <span className="text-xs font-bold font-mono tracking-wider uppercase text-white/40">Staged Ingest Manifest ({stagedFiles.length})</span>
//                                 <button onClick={() => setStagedFiles([])} className="text-[11px] font-mono text-red-400/70 hover:text-red-400 bg-transparent border-0 cursor-pointer">Clear Buffer</button>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 {stagedFiles.map((file) => {
//                                     const meta = getFileTypeInfo(file.name);
//                                     return (
//                                         <div key={file.id} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
//                                             {/* Top Control Block Row */}
//                                             <div className="flex items-start gap-3 mb-3">
//                                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[8px] font-bold shrink-0 ${meta.bg} ${meta.color}`}>{meta.label}</div>
//                                                 <div className="min-w-0 flex-1">
//                                                     <div className="text-[13px] font-bold truncate text-white/90">{file.name}</div>
//                                                     <div className="text-[10px] text-white/40 font-mono">{fmtSize(file.size)}</div>
//                                                 </div>
//                                                 <button
//                                                     onClick={(e) => { e.stopPropagation(); removeFile(file.id, file.previewUrl); }}
//                                                     className="w-6 h-6 rounded-md bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.05] flex items-center justify-center text-white/30 hover:text-red-400 transition-colors cursor-pointer"
//                                                 >
//                                                     <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
//                                                 </button>
//                                             </div>

//                                             {/* Preview Display Window Layer */}
//                                             <div className="w-full h-32 rounded-lg border border-white/[0.04] bg-black/40 overflow-hidden relative flex items-center justify-center">
//                                                 {file.previewUrl ? (
//                                                     /* Image Format Previews */
//                                                     // eslint-disable-next-line @next/next/no-img-element
//                                                     <img src={file.previewUrl} alt="Payload snapshot" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
//                                                 ) : file.textPreview ? (
//                                                     /* Text File Sniffer Previews */
//                                                     <pre className="w-full h-full p-2.5 font-mono text-[10px] text-white/50 overflow-hidden leading-relaxed select-none whitespace-pre-wrap text-left">{file.textPreview}...</pre>
//                                                 ) : (
//                                                     /* Static Fallback Asset View */
//                                                     <div className="flex flex-col items-center gap-1.5 opacity-30 select-none">
//                                                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
//                                                         <span className="font-mono text-[9px] uppercase tracking-wider">No Raw Preview</span>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             {/* Execution Activation Bar */}
//                             <div className="pt-4 border-t border-white/[0.05] flex justify-end">
//                                 <button
//                                     onClick={triggerUpload}
//                                     disabled={isUploading}
//                                     className="flex items-center gap-2 py-2.5 px-5 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] disabled:from-white/10 disabled:to-white/10 disabled:text-white/30 disabled:cursor-not-allowed rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:-translate-y-px"
//                                 >
//                                     {isUploading ? (
//                                         <>
//                                             <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
//                                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                                             </svg>
//                                             Streaming to Cloud Pipeline...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" /></svg>
//                                             Commit Changes to Cluster
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }
