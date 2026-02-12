import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const achievement = await prisma.achievement.findUnique({
    where: { id: parseInt(id) },
    include: { team: true },
  });
  if (!achievement) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(achievement);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    if (data.team_id) data.team_id = parseInt(data.team_id);
    const achievement = await prisma.achievement.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(achievement);
  } catch {
    return NextResponse.json({ error: "Güncellenemedi" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.achievement.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silinemedi" }, { status: 400 });
  }
}
