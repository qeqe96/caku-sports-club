import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { id: "asc" },
    include: { team: true },
  });
  return NextResponse.json(achievements);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (data.team_id) data.team_id = parseInt(data.team_id);
    const achievement = await prisma.achievement.create({ data });
    return NextResponse.json(achievement, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Başarı oluşturulamadı" }, { status: 400 });
  }
}
