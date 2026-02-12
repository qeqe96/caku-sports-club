import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tournament = await prisma.tournament.findUnique({ where: { id: parseInt(id) } });
  if (!tournament) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(tournament);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const tournament = await prisma.tournament.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(tournament);
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
    await prisma.tournament.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Silinemedi" }, { status: 400 });
  }
}
