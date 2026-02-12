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
  try {
    const data = await request.json();
    const tournament = await prisma.tournament.create({ data });
    return NextResponse.json(tournament, { status: 201 });
  } catch (error) {
    const requestData = await request.json().catch(() => ({}));
    const newTournament = { ...requestData, id: staticTournaments.length + 1 };
    return NextResponse.json({ ...newTournament, message: "Demo modu: Gerçek kayıt yapılmadı" }, { status: 201 });
  }
}
