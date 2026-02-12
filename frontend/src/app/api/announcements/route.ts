import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { announcements as staticAnnouncements } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");
    const where = category ? { category } : {};
    const announcements = await prisma.announcement.findMany({ where, orderBy: { id: "asc" } });
    return NextResponse.json(announcements);
  } catch {
    const category = request.nextUrl.searchParams.get("category");
    const filtered = category ? staticAnnouncements.filter(a => a.category === category) : staticAnnouncements;
    return NextResponse.json(filtered);
  }
}
