import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tournaments as staticTournaments } from "@/lib/data";

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(tournaments);
  } catch {
    return NextResponse.json(staticTournaments);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const tournament = await prisma.tournament.create({ data });
    return NextResponse.json(tournament, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
