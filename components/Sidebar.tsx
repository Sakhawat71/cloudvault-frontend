"use client";

import { useAuth } from "@/providers/AuthProvider";
import { logoutUser } from "@/services/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
        ),
    },
    {
        label: "Upload",
        href: "/dashboard/upload",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
            </svg>
        ),
    },
    {
        label: "My Files",
        href: "/dashboard/files",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
            </svg>
        ),
    },
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        ),
    },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, setUser } = useAuth();
    const route = useRouter();
    const isActive = (href: string) =>
        href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        route.push("/");
    };


    return (
        <>
            {/* Mobile backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm min-[861px]:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-0 bottom-0 left-0 z-50 w-60 shrink-0 border-r border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl flex flex-col transition-transform duration-300 ease-in-out min-[861px]:translate-x-0 min-[861px]:z-10 ${open ? "translate-x-0 shadow-[4px_0_30px_rgba(0,0,0,0.6)]" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2.5 px-6 py-5 border-b border-white/[0.06] no-underline"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6366f1] to-[#10b981] rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                        </svg>
                    </div>
                    <span className="text-[17px] font-black text-white tracking-tight">
                        Cloud<span className="text-[#818cf8]">Vault</span>
                    </span>
                </Link>

                {/* Nav */}
                <nav className="pt-5 px-4 flex-1 space-y-0.5">
                    <p className="font-mono text-[9px] font-bold tracking-[2px] uppercase text-white/20 px-3 mb-2">
                        Menu
                    </p>
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg text-[13px] font-semibold border transition-all no-underline ${isActive(item.href)
                                ? "bg-indigo-500/10 text-[#818cf8] border-indigo-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                                : "text-white/40 border-transparent hover:bg-white/[0.03] hover:text-white/80"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    ))}
                </nav>


                {/* User */}
                <div className="px-4 pb-5 border-t border-white/[0.06] pt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#10b981] flex items-center justify-center text-[11px] font-black text-white shrink-0">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-white truncate">{user?.name}</p>
                        <p className="text-[10px] text-white/30 font-mono truncate">{user?.email}</p>
                    </div>
                    <button
                        className="text-white/25 hover:text-red-400 transition-colors bg-transparent border-0 cursor-pointer"
                        title="Logout"
                        onClick={async () => {
                            await handleLogout();
                        }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                    </button>
                </div>
            </aside>
        </>
    );
}