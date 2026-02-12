import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { announcements as staticAnnouncements } from "@/lib/data";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(announcements);
  } catch {
    return NextResponse.json(staticAnnouncements);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const announcement = await prisma.announcement.create({ data });
    return NextResponse.json(announcement, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
