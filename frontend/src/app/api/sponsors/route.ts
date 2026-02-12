import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sponsors as staticSponsors } from "@/lib/data";

export async function GET() {
  try {
    const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(sponsors);
  } catch {
    return NextResponse.json(staticSponsors);
  }
}
