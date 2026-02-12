import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sponsors);
}
