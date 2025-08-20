export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { createJob, jobs } from "@/lib/jobsStore";
import { JobInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as JobInput;
  const job = createJob(body);
  return NextResponse.json(job, { status: 201 });
}

export async function GET(_req: NextRequest) {
  return NextResponse.json(Array.from(jobs.values()));
}

