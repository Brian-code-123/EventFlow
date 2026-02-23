import { NextResponse } from "next/server";
import connectDB from "@/lib/db-connect";
import Team from "@/models/Team";
import Submission from "@/models/Submission";
import { auth } from "@/lib/auth";

// GET - Fetch submissions from teams assigned to this mentor
export async function GET(req) {
  try {
    await connectDB();
    const session = await auth();

    if (!session || session.user.role !== "mentor") {
      return NextResponse.json(
        { error: "Unauthorized - Mentor access required" },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    // Find teams where this user is the assigned mentor
    const mentorTeams = await Team.find({ assignedMentor: userId, status: "active" }).select("_id");
    const teamIds = mentorTeams.map(t => t._id);

    if (teamIds.length === 0) {
      return NextResponse.json({
        success: true,
        submissions: []
      });
    }

    // Fetch submissions for mentor's teams
    const submissions = await Submission.find({ team: { $in: teamIds } })
      .populate({
        path: "team",
        select: "name description",
        populate: [
          { path: "leader", select: "name email" },
          { path: "members", select: "name email" }
        ]
      })
      .populate("event", "title startDate endDate")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      submissions
    });

  } catch (error) {
    console.error("Mentor Submissions Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
