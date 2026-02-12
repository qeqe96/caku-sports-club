import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { achievements as staticAchievements } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const where = category ? { category } : {};
    const achievements = await prisma.achievement.findMany({ where, orderBy: { id: "asc" } });
    return NextResponse.json(achievements);
  } catch {
    const category = request.nextUrl.searchParams.get("category");
    const filtered = category ? staticAchievements.filter(a => a.category === category) : staticAchievements;
    return NextResponse.json(filtered);
  }
}
