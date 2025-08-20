export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { createJob, jobs } from "../../../lib/jobsStore";
import { JobInput } from "../../../lib/types";

export async function POST(req: Request) {
  const body = (await req.json()) as JobInput;  // typed
  // You might validate here (zod/valibot) before createJob
  const job = createJob(body);
  return NextResponse.json(job, { status: 201 });
}

export async function GET() {
  // dev helper: list jobs
  const list = Array.from(jobs.values());
  return NextResponse.json(list);
}

