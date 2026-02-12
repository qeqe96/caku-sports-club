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
  try {
    const data = await request.json();
    const announcement = await prisma.announcement.create({ data });
    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    const requestData = await request.json().catch(() => ({}));
    const newAnnouncement = { ...requestData, id: staticAnnouncements.length + 1 };
    return NextResponse.json({ ...newAnnouncement, message: "Demo modu: Gerçek kayıt yapılmadı" }, { status: 201 });
  }
}
