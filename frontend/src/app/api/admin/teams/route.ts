import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const teams = await prisma.team.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(teams);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const team = await prisma.team.create({ data });
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Takım oluşturulamadı" }, { status: 400 });
  }
}
