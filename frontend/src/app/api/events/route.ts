import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { events as staticEvents } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const where = category ? { category } : {};
    const events = await prisma.event.findMany({ where, orderBy: { id: "asc" } });
    return NextResponse.json(events);
  } catch {
    const category = request.nextUrl.searchParams.get("category");
    const filtered = category ? staticEvents.filter(e => e.category === category) : staticEvents;
    return NextResponse.json(filtered);
  }
}
