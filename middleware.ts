import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    // If user is NOT logged in and tries dashboard
    if (isDashboard && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is logged in and tries login page
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
};