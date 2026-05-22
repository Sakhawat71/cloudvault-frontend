"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";


// Page title map
const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
    "/dashboard": { title: "Dashboard", sub: "Overview" },
    "/dashboard/upload": { title: "Upload", sub: "Add new files" },
    "/dashboard/files": { title: "My Files", sub: "Manage your storage" },
    "/dashboard/profile": { title: "Profile", sub: "Account settings" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const meta = PAGE_TITLES[pathname] ?? { title: "Dashboard", sub: "" };

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex text-white antialiased">
            {/* Shared sidebar */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main — offset by sidebar width on desktop */}
            <main className="flex-1 min-h-screen flex flex-col pl-60 max-[860px]:pl-0">
                {/* Sticky topbar */}
                <header className="h-14 border-b border-white/[0.05] flex items-center px-8 max-[860px]:px-5 gap-4 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-30">
                    {/* Mobile hamburger */}
                    <button
                        className="hidden max-[860px]:flex bg-transparent border-0 text-white/50 p-1 cursor-pointer hover:text-white transition-colors"
                        onClick={() => setSidebarOpen((v) => !v)}
                        aria-label="Toggle Menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                        </svg>
                    </button>

                    {/* Title */}
                    <div className="flex-1 flex items-center gap-2">
                        <span className="text-[15px] font-extrabold tracking-tight text-white">
                            {meta.title}
                        </span>
                        {meta.sub && (
                            <span className="text-white/20 font-normal text-xs font-mono">
                                / {meta.sub}
                            </span>
                        )}
                    </div>

                    {/* Right: notification bell placeholder */}
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-colors cursor-pointer">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                        </svg>
                    </button>
                </header>

                {/* Page content */}
                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
