import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const announcements = await prisma.announcement.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(announcements);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const announcement = await prisma.announcement.create({ data });
    return NextResponse.json(announcement, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Duyuru oluşturulamadı" }, { status: 400 });
  }
}
