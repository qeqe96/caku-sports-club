import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teams as staticTeams } from "@/lib/data";

export async function GET() {
  try {
    const teams = await prisma.team.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(teams);
  } catch {
    return NextResponse.json(staticTeams);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const team = await prisma.team.create({ data });
    return NextResponse.json(team, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
