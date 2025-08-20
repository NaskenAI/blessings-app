import { NextResponse } from "next/server";

let jobs: Record<string, any> = {}; // for demo, replace with DB

export async function POST(req: Request) {
  const body = await req.json();
  const id = crypto.randomUUID();

  jobs[id] = {
    id,
    status: "queued",
    input: body,
    previewUrl: null,
    finalUrl: null,
  };

  // TODO: enqueue actual generation here
  return NextResponse.json(jobs[id]);
}

export async function GET() {
  // return all jobs for testing
  return NextResponse.json(Object.values(jobs));
}

