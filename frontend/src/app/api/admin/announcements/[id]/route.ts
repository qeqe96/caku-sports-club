import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { announcements as staticAnnouncements } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const announcement = await prisma.announcement.findUnique({ where: { id: parseInt(id) } });
    if (!announcement) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(announcement);
  } catch {
    const { id } = await params;
    const announcement = staticAnnouncements.find(a => a.id === parseInt(id));
    if (!announcement) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(announcement);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  try {
    const announcement = await prisma.announcement.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(announcement);
  } catch {
    return NextResponse.json({ ...staticAnnouncements.find(a => a.id === parseInt(id)), ...data });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.announcement.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
