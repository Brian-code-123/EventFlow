import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Event from "@/models/Event";

// GET all events
export async function GET() {
  await dbConnect();
  const events = await Event.find();
  return NextResponse.json({ events });
}

// CREATE event
export async function POST() {
  await dbConnect();

  const event = await Event.create({
    title: "Demo Event",
    description: "Test event",
    startDate: new Date(),
    endDate: new Date(),
    organizer: "507f1f77bcf86cd799439011",
  });

  return NextResponse.json(event);
}
