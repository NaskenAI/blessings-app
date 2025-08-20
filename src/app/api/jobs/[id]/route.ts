export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getJob } from "@/lib/jobsStore";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const job = getJob(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

