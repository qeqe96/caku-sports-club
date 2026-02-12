import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { achievements as staticAchievements } from "@/lib/data";

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { id: "asc" },
      include: { team: true },
    });
    return NextResponse.json(achievements);
  } catch {
    return NextResponse.json(staticAchievements);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (data.team_id) data.team_id = parseInt(data.team_id);
  try {
    const achievement = await prisma.achievement.create({ data });
    return NextResponse.json(achievement, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
