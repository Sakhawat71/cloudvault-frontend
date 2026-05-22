"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const {user} = useAuth()
    console.log(user);

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
            {/* Global Gradient Ambient Blobs */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

            {/* ─── NAVBAR ─────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-[#0a0a0f]/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 no-underline">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                                <path d="M13 10h-2v3H8l4 4 4-4h-3z" />
                            </svg>
                        </div>
                        <span className="text-lg font-black text-white tracking-tight">cloud<span className="text-[#818cf8]">Vault</span></span>
                    </Link>

                    {/* Desktop Navigation Link Blocks */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
                        <a href="#features" className="hover:text-white transition-colors no-underline">Features</a>
                        <a href="#architecture" className="hover:text-white transition-colors no-underline">Architecture</a>
                        <a href="#pricing" className="hover:text-white transition-colors no-underline">Pricing</a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors no-underline flex items-center gap-1">
                            Docs
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                        </a>
                    </nav>

                    {/* Desktop Authentication Call-To-Action buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-semibold text-white/70 hover:text-white transition-colors no-underline">Sign In</Link>
                        <Link href="/dashboard" className="py-2 px-4 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] rounded-lg text-xs font-bold transition-all no-underline shadow-sm">
                            Console Panel
                        </Link>
                    </div>

                    {/* Mobile Menu Action trigger */}
                    <button className="flex md:hidden bg-transparent border-0 text-white/70 p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            {mobileMenuOpen ? (
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            ) : (
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Dropdown Menu panel */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-white/[0.05] bg-[#0a0a0f] p-5 space-y-4 flex flex-col">
                        <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-white/60 no-underline">Features</a>
                        <a href="#architecture" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-white/60 no-underline">Architecture</a>
                        <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-white/60 no-underline">Pricing</a>
                        <div className="h-px bg-white/[0.05] my-2" />
                        <Link href="/login" className="text-sm font-semibold text-white/70 no-underline">Sign In</Link>
                        <Link href="/dashboard" className="py-2.5 text-center bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-xl text-xs font-bold no-underline text-white shadow-md">
                            Access Dashboard Console
                        </Link>
                    </div>
                )}
            </header>

            {/* ─── HERO SECTION ───────────────────────────────────────────── */}
            <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 font-mono text-[11px] tracking-wide mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AWS S3 Secure Cluster Architecture Active
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-[1.1] mb-6">
                    Decentralized Cloud Ingestion & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#6366f1] to-[#10b981]">Secure Storage Pool</span>
                </h1>

                <p className="text-base sm:text-lg text-white/45 font-mono max-w-xl mx-auto leading-relaxed mb-10">
                    Stream, compile, and mirror raw digital assets into unified S3 infrastructure block grids with low latency parameters.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-xl text-sm font-bold text-white transition-all shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:-translate-y-px no-underline">
                        Launch System Console
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" /></svg>
                    </Link>
                    <a href="#features" className="w-full sm:w-auto py-3 px-6 bg-white/[0.02] border border-white/[0.07] hover:bg-white/[0.05] rounded-xl text-sm font-bold transition-all no-underline">
                        Explore Cluster Blueprint
                    </a>
                </div>
            </section>

            {/* ─── CORE FEATURES MATRICES ────────────────────────────────── */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.04]">
                <div className="mb-12">
                    <span className="font-mono text-[10px] font-bold tracking-[2px] text-[#818cf8] uppercase block mb-2">Core Parameters</span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Engineered for Persistent Integrity</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Immutable S3 Backing", desc: "Every uploaded asset maps to dedicated AWS infrastructure instances with automated regional bucket replication maps.", icon: <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /> },
                        { title: "Live Chunk Sniffer", desc: "Upload pipelines instantly preview code blocks, structural documents, and image matrices prior to memory indexing arrays.", icon: <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /> },
                        { title: "Cryptographic Salts", desc: "Assets are salted and tokenized via isolated encryption handlers preventing directory mapping leaks or sniffing vectors.", icon: <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" /> }
                    ].map((feat, i) => (
                        <div key={i} className="p-6 bg-white/[0.015] border border-white/[0.05] rounded-2xl group hover:border-indigo-500/20 hover:bg-white/[0.03] transition-all duration-300">
                            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{feat.icon}</svg>
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                            <p className="text-xs text-white/40 font-sans leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── SYSTEM METRICS ARCHITECTURE ────────────────────────────── */}
            <section id="architecture" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.04]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="font-mono text-[10px] font-bold tracking-[2px] text-emerald-400 uppercase block mb-2">Network Topology</span>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-5">High-Velocity Cluster Pipeline</h2>
                        <p className="text-sm text-white/45 leading-relaxed mb-6">
                            CloudVault separates interface layout executions from memory payload layers. When files populate into your drag-and-drop staging buffers, they stream directly to edge servers bypassing proxy bottlenecks entirely.
                        </p>

                        <div className="space-y-4 font-mono text-xs">
                            <div className="flex items-center gap-3 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                                <span className="text-emerald-400 font-bold">01 /</span>
                                <span className="text-white/70">Asynchronous streaming directly to endpoints</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white/[0.01] border border-white/[0.04] rounded-xl">
                                <span className="text-[#818cf8] font-bold">02 /</span>
                                <span className="text-white/70">Automatic cryptographic type mapping & isolation</span>
                            </div>
                        </div>
                    </div>

                    {/* Faux Code Terminal UI Block Asset */}
                    <div className="bg-black/40 border border-white/[0.06] rounded-2xl p-5 font-mono text-[11px] text-white/40 shadow-2xl relative overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-4 pb-3 border-b border-white/[0.05]">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                            <span className="text-[10px] text-white/20 ml-2">aws_cluster_pool.json</span>
                        </div>
                        <pre className="text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                            {`{
  "cluster_id": "vltx_node_887a0",
  "status": "POOL_HEALTHY_OPERATIONAL",
  "encryption_layer": "AES_256_GCM_SALTED",
  "active_nodes": [
    { "zone": "us-east-1", "ping_ms": 14 },
    { "zone": "eu-central-1", "ping_ms": 42 }
  ],
  "ingest_pipeline": {
    "chunk_buffer_mb": 50,
    "stream_multiplexing": true
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* ─── PRICING MATRIX ─────────────────────────────────────────── */}
            <section id="pricing" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/[0.04]">
                <div className="text-center mb-12">
                    <span className="font-mono text-[10px] font-bold tracking-[2px] text-indigo-400 uppercase block mb-2">Pricing Blueprint</span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Transparent Infrastructure Tiers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tier 1 */}
                    <div className="bg-white/[0.015] border border-white/[0.06] rounded-2xl p-6 relative flex flex-col justify-between">
                        <div>
                            <div className="text-sm font-bold mb-1">Developer Tier</div>
                            <div className="text-xs text-white/30 font-mono mb-4">For sandbox testing vectors</div>
                            <div className="text-3xl font-black mb-4">$0 <span className="text-xs font-normal text-white/30 font-mono">/ baseline</span></div>
                            <div className="h-px bg-white/[0.05] mb-4" />
                            <ul className="space-y-2.5 text-xs text-white/50 p-0 list-none font-mono">
                                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 512 MB S3 allocation</li>
                                <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Live manifest log previewers</li>
                                <li className="flex items-center gap-2 text-white/20"><span className="text-white/20">✗</span> Regional bucket mirroring</li>
                            </ul>
                        </div>
                        <Link href="/dashboard" className="w-full text-center mt-6 py-2 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-xs font-bold rounded-lg text-white no-underline transition-all">Initialize Free Core</Link>
                    </div>

                    {/* Tier 2 */}
                    <div className="bg-gradient-to-b from-indigo-500/[0.03] to-transparent border border-indigo-500/30 rounded-2xl p-6 relative flex flex-col justify-between shadow-[0_10px_30px_rgba(99,102,241,0.05)]">
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono text-[9px] font-bold uppercase tracking-wider">Production</div>
                        <div>
                            <div className="text-sm font-bold mb-1">Enterprise Link</div>
                            <div className="text-xs text-white/30 font-mono mb-4">Unlimited payload streaming variables</div>
                            <div className="text-3xl font-black mb-4">$12 <span className="text-xs font-normal text-white/30 font-mono">/ monthly</span></div>
                            <div className="h-px bg-indigo-500/20 mb-4" />
                            <ul className="space-y-2.5 text-xs text-white/70 p-0 list-none font-mono">
                                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> 50 GB High-Velocity storage</li>
                                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Dynamic multi-region replication</li>
                                <li className="flex items-center gap-2"><span className="text-indigo-400">✓</span> Priority cluster support strings</li>
                            </ul>
                        </div>
                        <Link href="/dashboard" className="w-full text-center mt-6 py-2 bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-xs font-bold rounded-lg text-white no-underline transition-all shadow-md">Deploy Production Asset</Link>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER INDEX ───────────────────────────────────────────── */}
            <footer className="border-t border-white/[0.05] bg-black/20">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Meta Column */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded flex items-center justify-center">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" /></svg>
                            </div>
                            <span className="text-sm font-bold text-white tracking-tight">CloudVault Storage</span>
                        </div>
                        <p className="text-[11px] text-white/30 font-mono leading-relaxed">
                            Securing raw computing data matrices across highly-available cloud infrastructures safely.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-2.5 font-mono text-xs">
                        <div className="text-[10px] text-white/20 font-bold tracking-wider uppercase mb-1">System Links</div>
                        <a href="#features" className="block text-white/40 hover:text-white transition-colors no-underline">Node Features</a>
                        <a href="#architecture" className="block text-white/40 hover:text-white transition-colors no-underline">Pipeline Layout</a>
                        <a href="#pricing" className="block text-white/40 hover:text-white transition-colors no-underline">Pricing Blocks</a>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-2.5 font-mono text-xs">
                        <div className="text-[10px] text-white/20 font-bold tracking-wider uppercase mb-1">Documentation</div>
                        <a href="#" className="block text-white/40 hover:text-white transition-colors no-underline">API Ingest Schema</a>
                        <a href="#" className="block text-white/40 hover:text-white transition-colors no-underline">AWS S3 Policies</a>
                        <a href="#" className="block text-white/40 hover:text-white transition-colors no-underline">Security Auditing</a>
                    </div>

                    {/* Column 4 */}
                    <div className="space-y-2.5 font-mono text-xs">
                        <div className="text-[10px] text-white/20 font-bold tracking-wider uppercase mb-1">Legal Parameters</div>
                        <a href="#" className="block text-white/40 hover:text-white transition-colors no-underline">Privacy Isolation</a>
                        <a href="#" className="block text-white/40 hover:text-white transition-colors no-underline">Terms of Cluster Use</a>
                    </div>
                </div>

                {/* Copyright Base Strip */}
                <div className="border-t border-white/[0.04] py-4 text-center font-mono text-[10px] text-white/20">
                    &copy; {new Date().getFullYear()} CloudVault System Inc. All operational rights reserved.
                </div>
            </footer>
        </div>
    );
}