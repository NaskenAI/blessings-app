export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,                               // ← keep the first arg (required by Next)
  context: { params: Promise<{ id: string }> }     // ← params is a Promise in Next 15
) {
  void _req;                                       // ← silence “unused” without eslint-disable
  const { id } = await context.params;

  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(job);
}

