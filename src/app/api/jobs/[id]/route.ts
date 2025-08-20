export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { getJob } from "@/lib/jobsStore";

export async function GET(
  _req: NextRequest,                                  // must be present (1st arg)
  context: { params: Promise<{ id: string }> }        // 2nd arg with Promise params
) {
  // optional: silence the unused param rule globally in .eslintrc, or:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { id } = await context.params;
  const job = getJob(id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

