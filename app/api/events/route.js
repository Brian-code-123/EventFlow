import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const limiter = rateLimit({
    interval: 60 * 1000, // 1 minute
});

const eventSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(1000).optional(),
    date: z.string().datetime(),
    location: z.string().min(3).max(100),
});

export async function GET() {
    await dbConnect();
    // Fetch events logic
    return NextResponse.json({ events: [] });
}

export async function POST(request) {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { isRateLimited } = limiter.check(20, ip); // 20 requests per minute per IP

    if (isRateLimited) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    try {
        const body = await request.json();
        const validation = eventSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid input", details: validation.error.format() }, { status: 400 });
        }

        await dbConnect();
        // Create event logic (placeholder)
        return NextResponse.json({ message: "Event created", data: validation.data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 400 });
    }
}
