import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/services/auth.service";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(request) {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { isRateLimited } = limiter.check(10, ip); // 10 requests per minute per IP

    if (isRateLimited) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    try {
        const body = await request.json();
        const validation = loginSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const { email, password } = validation.data;

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = signToken({ userId: user._id, email: user.email });

        const response = NextResponse.json(
            { message: "Login successful", user: { email: user.email, name: user.name } },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400, // 1 day
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
