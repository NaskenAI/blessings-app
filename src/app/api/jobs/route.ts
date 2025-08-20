export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: NextRequest) {
  // list jobs (no params here)
  const list = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const { s3Key, effectId, names = [] } = await req.json();
  const job = await prisma.job.create({ data: { s3Key, effectId, names } });
  return NextResponse.json(job, { status: 201 });
}

