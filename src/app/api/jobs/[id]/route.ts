// src/app/api/jobs/[id]/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,                                // 1st arg REQUIRED by Next.js
  context: { params: Promise<{ id: string }> }      // 2nd arg: params is a Promise in Next 15
) {
  void _req;                                        // silence unused var warning

  const { id } = await context.params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

