import { NextResponse } from "next/server";

let jobs: Record<string, any> = {}; // share with above in real DB

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const job = jobs[params.id];
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

