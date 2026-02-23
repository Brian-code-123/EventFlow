// Seed script to add demo events
// Run with: node scripts/seed-events.js

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eventflow";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: Date,
  location: { type: String, default: "Virtual" },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["draft", "upcoming", "ongoing", "completed"],
    default: "draft",
  },
  rules: [String],
  tracks: [String],
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

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
    title: "ETH Denver 2026",
    description: "The premier Ethereum and DeFi conference. Build the future of decentralized finance.",
    startDate: new Date("2026-02-28"),
    endDate: new Date("2026-03-02"),
    registrationDeadline: new Date("2026-02-25"),
    location: "Denver, CO",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Teams of 2-4 members",
      "Must build on Ethereum",
      "Open source preferred"
    ],
    tracks: ["Web3", "DeFi", "Smart Contracts", "NFTs"]
  },
  {
    title: "Google Cloud Next",
    description: "Google's annual cloud computing conference. Explore the latest in cloud technology and AI.",
    startDate: new Date("2026-04-12"),
    endDate: new Date("2026-04-14"),
    registrationDeadline: new Date("2026-04-05"),
    location: "Las Vegas, NV",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Individual or teams up to 3",
      "Must use Google Cloud"
    ],
    tracks: ["Cloud", "AI/ML", "DevOps", "Data Analytics"]
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
    title: "NASA Space Apps Challenge",
    description: "The largest annual hackathon on the planet. Solve challenges using space data and technology.",
    startDate: new Date("2026-10-02"),
    endDate: new Date("2026-10-04"),
    registrationDeadline: new Date("2026-09-28"),
    location: "Global (Virtual)",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Teams of 2-6 members",
      "Use NASA open data",
      "48-hour challenge"
    ],
    tracks: ["Space Tech", "Data Science", "Earth Science", "Robotics"]
  },
  {
    title: "DevOps World 2026",
    description: "Learn the latest in CI/CD, Kubernetes, and cloud-native technologies from industry leaders.",
    startDate: new Date("2026-06-08"),
    endDate: new Date("2026-06-10"),
    registrationDeadline: new Date("2026-06-01"),
    location: "New York, NY",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Teams of 2-4",
      "Must demonstrate CI/CD pipeline"
    ],
    tracks: ["DevOps", "Kubernetes", "Cloud Native", "Automation"]
  },
  {
    title: "CyberSec Global",
    description: "The premier cybersecurity conference. Discover latest threats, defenses, and best practices.",
    startDate: new Date("2026-07-15"),
    endDate: new Date("2026-07-17"),
    registrationDeadline: new Date("2026-07-10"),
    location: "Singapore",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Individual or teams up to 3",
      "Ethical hacking only",
      "Bug bounty focus"
    ],
    tracks: ["Cybersecurity", "Network Security", "Penetration Testing", "Zero Trust"]
  },
  {
    title: "NVIDIA GTC 2026",
    description: "GPU Technology Conference. Explore AI, deep learning, and accelerated computing breakthroughs.",
    startDate: new Date("2026-03-18"),
    endDate: new Date("2026-03-21"),
    registrationDeadline: new Date("2026-03-15"),
    location: "San Jose, CA",
    status: "ongoing",
    isPublic: true,
    rules: [
      "Must use NVIDIA technologies",
      "GPU-accelerated applications"
    ],
    tracks: ["AI/ML", "GPU Computing", "Deep Learning", "Computer Vision"]
  },
  {
    title: "Quantum Computing Summit",
    description: "Dive into the quantum revolution. Connect with researchers and pioneers in quantum computing.",
    startDate: new Date("2026-09-25"),
    endDate: new Date("2026-09-27"),
    registrationDeadline: new Date("2026-09-20"),
    location: "Berlin, Germany",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Research-focused submissions",
      "Quantum algorithms"
    ],
    tracks: ["Quantum Computing", "Quantum Algorithms", "Qiskit", "Cirq"]
  },
  {
    title: "TechCrunch Disrupt 2026",
    description: "The startup conference of the year. Pitch investors, network with founders, and discover the next big thing.",
    startDate: new Date("2026-05-05"),
    endDate: new Date("2026-05-07"),
    registrationDeadline: new Date("2026-04-28"),
    location: "San Francisco, CA",
    status: "upcoming",
    isPublic: true,
    rules: [
      "Startup pitch competition",
      "VC networking",
      "Demo day included"
    ],
    tracks: ["Startup", "Venture Capital", "Innovation", "SaaS"]
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

async function seedEvents() {
  try {
    process.stdout.write("Connecting to MongoDB...\n");
    await mongoose.connect(MONGODB_URI);
    process.stdout.write("Connected to MongoDB\n");

    // Check if events already exist
    const existingCount = await Event.countDocuments();
    if (existingCount > 0) {
      process.stdout.write(`Found ${existingCount} existing events.\n`);
      
      // Optionally clear existing events
      // await Event.deleteMany({});
    }

    // Create demo events
    const createdEvents = await Event.insertMany(demoEvents);
    process.stdout.write(`Created ${createdEvents.length} demo events:\n`);
    
    createdEvents.forEach((event, index) => {
      process.stdout.write(`  ${index + 1}. ${event.title} (${event.status})\n`);
    });

    process.stdout.write("\nSeed completed successfully!\n");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding events:", error);
    process.exit(1);
  }
}

seedEvents();
