import { NextResponse } from "next/server";
import { verifyToken } from "@/services/auth.service";

export async function authMiddleware(request) {
    const { pathname } = request.nextUrl;

    // Define public routes
    const isPublicRoute =
        pathname === "/" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico");

    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Get token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("token");
        return response;
    }

    return NextResponse.next();
}
