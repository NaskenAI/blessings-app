import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // in real life: validate image, store to S3, enqueue job, return jobId
  const body = await req.json();
  const job = {
    id: crypto.randomUUID(),
    status: "queued",
    effectId: body?.effectId ?? "blessing",
  };
  return NextResponse.json(job, { status: 201 });
}

export async function GET() {
  // health check
  return NextResponse.json({ ok: true });
}

