export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { s3Key, effectId, names = [] } = await req.json();
  // TODO: validate payload (zod)
  const job = await prisma.job.create({
    data: { s3Key, effectId, names },
  });
  return NextResponse.json(job, { status: 201 });
}

export async function GET(_req: NextRequest) {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

