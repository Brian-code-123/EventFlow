import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";

// GET all events
export async function GET(request) {
  try {
    const session = await auth();
    const connected = await dbConnect();
    if (!connected) {
      return NextResponse.json({ events: [] }, { status: 200 }); // Graceful fallback
    }

    // Build query based on user role
    let query = {};
    const userRole = session?.user?.role;
    const userId = session?.user?.id;

    // Admin sees all events
    if (userRole === "admin") {
      query = {};
    }
    // Organizer sees their events + public events
    else if (userRole === "organizer") {
      const { searchParams } = new URL(request.url);
      const view = searchParams.get("view");
      if (view === "mine") {
        query = { organizer: userId };
      } else {
        query = {
          $or: [
            { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
            { organizer: userId }
          ]
        };
      }
    }
    // Judge sees public events + assigned events
    else if (userRole === "judge") {
      query = {
        $or: [
          { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
          { judges: userId }
        ]
      };
    }
    // Mentor sees public events + assigned events
    else if (userRole === "mentor") {
      query = {
        $or: [
          { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
          { mentors: userId }
        ]
      };
    }
    // Everyone else (participant or no role) sees public upcoming/ongoing events
    else {
      query = { isPublic: true, status: { $in: ["upcoming", "ongoing"] } };
    }

    const events = await Event.find(query)
      .populate("organizer", "name email")
      .sort({ startDate: 1 });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// CREATE event
export async function POST(request) {
  try {
    const session = await auth();

    // Authorization check
    if (!session || (session.user.role !== "organizer" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    // Destructure all possible fields
    const {
      title,
      description,
      startDate,
      endDate,
      registrationDeadline,
      location,
      minTeamSize,
      maxTeamSize,
      tracks,
      rules,
      judges,
      mentors,
      isPublic
    } = body;

    // Basic validation
    if (!title || !description || !startDate || !endDate || !registrationDeadline) {
      return NextResponse.json({ error: "Missing required fields (title, description, startDate, endDate, registrationDeadline)" }, { status: 400 });
    }

    const event = await Event.create({
      title,
      description,
      startDate,
      endDate,
      registrationDeadline,
      location: location || "Virtual",
      organizer: session.user.id,
      minTeamSize: minTeamSize || 2,
      maxTeamSize: maxTeamSize || 4,
      tracks: tracks || [],
      rules: rules || [],
      judges: judges || [],
      mentors: mentors || [],
      isPublic: isPublic !== undefined ? isPublic : true,
      status: "upcoming"
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
