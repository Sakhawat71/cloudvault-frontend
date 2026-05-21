import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - VaultX",
    description: "CloudVault secure file storage and management",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}