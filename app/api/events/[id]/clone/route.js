import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/db-connect";
import Event from "@/models/Event";

export async function POST(req, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid event ID format" },
        { status: 400 }
      );
    }

    const original = await Event.findById(id);

    if (!original) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    const cloned = await Event.create({
      title: original.title + " (Copy)",
      description: original.description,
      startDate: original.startDate,
      endDate: original.endDate,
      registrationDeadline: original.registrationDeadline,
      organizer: original.organizer,
      status: "draft",
      rules: original.rules,
      tracks: original.tracks,
    });

    return NextResponse.json(cloned, { status: 201 });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Clone failed", details: err.message },
      { status: 500 }
    );
  }
}
