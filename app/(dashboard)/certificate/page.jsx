"use client";

import { useState } from "react";

export default function CertificatePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("participant");
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const eventId = "69915583867353dfbcf38e95"; // <-- replace later dynamically

  const generateCertificate = async () => {
    setLoading(true);
    setDownloadUrl("");

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          recipientName: name,
          recipientEmail: email,
          role,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setDownloadUrl(data.certificate.certificateUrl);
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate Certificate</h1>

      <input
        className="border p-3 w-full mb-4"
        placeholder="Recipient Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="border p-3 w-full mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="participant">Participant</option>
        <option value="winner">Winner</option>
        <option value="mentor">Mentor</option>
        <option value="organizer">Organizer</option>
      </select>

      <button
        onClick={generateCertificate}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded w-full"
      >
        {loading ? "Generating..." : "Generate Certificate"}
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          className="block mt-6 text-center text-green-600 font-semibold"
        >
          Download Certificate
        </a>
      )}
    </div>
  );
}
