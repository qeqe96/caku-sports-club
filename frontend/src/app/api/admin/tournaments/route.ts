import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tournaments = await prisma.tournament.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(tournaments);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const tournament = await prisma.tournament.create({ data });
    return NextResponse.json(tournament, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Turnuva oluşturulamadı" }, { status: 400 });
  }
}
