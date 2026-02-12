import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tournaments as staticTournaments } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const where = category ? { category } : {};
    const tournaments = await prisma.tournament.findMany({ where, orderBy: { id: "asc" } });
    return NextResponse.json(tournaments);
  } catch {
    const category = request.nextUrl.searchParams.get("category");
    const filtered = category ? staticTournaments.filter(t => t.category === category) : staticTournaments;
    return NextResponse.json(filtered);
  }
}
