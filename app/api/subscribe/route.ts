import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BUTTONDOWN_URL = "https://api.buttondown.com/v1/subscribers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: { email?: unknown };
  try {
    payload = (await request.json()) as { email?: unknown };
  } catch {
    return new NextResponse("Invalid request body.", { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!EMAIL_PATTERN.test(email)) {
    return new NextResponse("Please enter a valid email address.", {
      status: 400,
    });
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    return new NextResponse("Email subscriptions are not configured yet.", {
      status: 503,
    });
  }

  let upstream: Response;
  try {
    upstream = await fetch(BUTTONDOWN_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });
  } catch {
    return new NextResponse("Could not reach the subscription service.", {
      status: 502,
    });
  }

  if (upstream.ok) {
    return NextResponse.json({ ok: true });
  }

  if (upstream.status === 400 || upstream.status === 409) {
    return new NextResponse("This email is already subscribed.", {
      status: upstream.status,
    });
  }

  return new NextResponse("Something went wrong. Please try again.", {
    status: 502,
  });
}
