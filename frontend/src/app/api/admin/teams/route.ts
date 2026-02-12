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
  try {
    const data = await request.json();
    const team = await prisma.team.create({ data });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    // Fallback: Return mock success with static data
    const requestData = await request.json().catch(() => ({}));
    const newTeam = { ...requestData, id: staticTeams.length + 1 };
    return NextResponse.json({ ...newTeam, message: "Demo modu: Gerçek kayıt yapılmadı" }, { status: 201 });
  }
}
