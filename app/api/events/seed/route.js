import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";

const demoEvents = [
  {
    title: "AI World Cup 2026",
    description: "The world's largest AI hackathon. Build innovative AI solutions and compete for $500,000 in prizes.",
    startDate: new Date("2026-03-15"),
    endDate: new Date("2026-03-20"),
    registrationDeadline: new Date("2026-03-10"),
    location: "Tokyo, Japan",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Teams of 2-5 members",
      "Open to all skill levels",
      "Must use AI/ML technologies",
      "Submit before deadline"
    ],
    tracks: ["AI/ML", "Deep Learning", "Computer Vision", "NLP"]
  },
  
  {
    title: "ClimateTech Hackathon",
    description: "Innovate for our planet. Build solutions addressing climate change and environmental challenges.",
    startDate: new Date("2026-03-22"),
    endDate: new Date("2026-03-24"),
    registrationDeadline: new Date("2026-03-18"),
    location: "London, UK",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Teams of 2-5 members",
      "Theme: Climate Action",
      "Sustainability focus required"
    ],
    tracks: ["Sustainability", "Clean Energy", "Green Tech", "Carbon Tracking"]
  },
  {
    title: "React Summit 2026",
    description: "The biggest React conference in Europe. Learn from core team members and industry experts.",
    startDate: new Date("2026-04-20"),
    endDate: new Date("2026-04-22"),
    registrationDeadline: new Date("2026-04-15"),
    location: "Amsterdam, Netherlands",
    status: "upcoming",
    isPublic: true,
    rules: [
      "All skill levels welcome",
      "React-based projects only"
    ],
    tracks: ["Web Development", "React", "JavaScript", "Frontend"]
  },
  {
    title: "GitHub Universe",
    description: "GitHub's annual developer conference. Learn about the future of software development.",
    startDate: new Date("2026-11-10"),
    endDate: new Date("2026-11-12"),
    registrationDeadline: new Date("2026-11-01"),
    location: "San Francisco, CA",
    status: "upcoming",
    isPublic: true,
    rules: [
      "GitHub Actions challenge",
      "Open source projects welcome"
    ],
    tracks: ["Developer Tools", "GitHub", "Open Source", "DevRel"]
  }
];

// SEED demo events
export async function POST() {
  try {
    await dbConnect();
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Check if events already exist
    const existingCount = await Event.countDocuments();
    if (existingCount > 0) {
      // Clear existing events first
      await Event.deleteMany({});
    }

    // Create demo events
    // Add organizer if possible, defaulting to the admin running the seed
    const eventsWithOrganizer = demoEvents.map(event => ({
      ...event,
      organizer: session.user.id
    }));

    const createdEvents = await Event.insertMany(eventsWithOrganizer);

    return NextResponse.json({
      message: `Created ${createdEvents.length} demo events`,
      events: createdEvents
    }, { status: 201 });
  } catch (error) {
    console.error("Error seeding events:", error);
    return NextResponse.json(
      { error: "Failed to seed events" },
      { status: 500 }
    );
  }
}

