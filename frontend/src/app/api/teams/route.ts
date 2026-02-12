import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teams as staticTeams } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const where = category ? { category } : {};
    const teams = await prisma.team.findMany({ where, orderBy: { id: "asc" } });
    return NextResponse.json(teams);
  } catch {
    const category = request.nextUrl.searchParams.get("category");
    const filtered = category ? staticTeams.filter(t => t.category === category) : staticTeams;
    return NextResponse.json(filtered);
  }
}
