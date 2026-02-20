const BASE_URL = "http://localhost:3000/api";

async function testAuthProtection() {
  console.log("\n🔒 TESTING AUTHORIZATION...");
  // Try to create an event without login
  try {
    const res = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hacked Event" })
    });
    console.log(`POST /api/events (No Auth) -> Status: ${res.status} (Expected: 401/403)`);
  } catch (error) {
    console.log("POST /api/events failed:", error.message);
  }
}

async function testValidation() {
  console.log("\n✅ TESTING INPUT VALIDATION...");
  // We'll hit /api/auth/register as it's public and validated
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "not-an-email", password: "123" }) // Invalid email, short pwd
    });
    const data = await res.json();
    console.log(`POST /api/auth/register (Invalid Data) -> Status: ${res.status}`);
    console.log(`Response Body:`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log("POST /api/auth/register failed:", error.message);
  }
}

async function testRateLimit() {
  console.log("\n🚦 TESTING RATE LIMITING...");
  // We'll hit the join team endpoint 15 times
  console.log("Sending 15 rapid requests to /api/teams/join...");
  
  for (let i = 1; i <= 15; i++) {
    try {
      const res = await fetch(`${BASE_URL}/teams/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteCode: "ANY_CODE" })
      });
      if (res.status === 429) {
        console.log(`Request ${i}: 🛑 BLOCKED (429 Too Many Requests)`);
      } else {
        console.log(`Request ${i}: Allowed (${res.status})`);
      }
    } catch (error) {
      console.log(`Request ${i} failed:`, error.message);
    }
  }
}

async function run() {
  await testAuthProtection();
  await testValidation();
  await testRateLimit();
}

run();
