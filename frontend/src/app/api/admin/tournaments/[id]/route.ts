import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tournaments as staticTournaments } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tournament = await prisma.tournament.findUnique({ where: { id: parseInt(id) } });
    if (!tournament) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(tournament);
  } catch {
    const { id } = await params;
    const tournament = staticTournaments.find(t => t.id === parseInt(id));
    if (!tournament) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(tournament);
  }
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
  } catch (error) {
    const { id } = await params;
    const requestData = await request.json().catch(() => ({}));
    const updatedTournament = { ...staticTournaments.find(t => t.id === parseInt(id)), ...requestData, message: "Demo modu: Gerçek güncelleme yapılmadı" };
    return NextResponse.json(updatedTournament);
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
    return NextResponse.json({ success: true, message: "Demo modu: Gerçek silme yapılmadı" });
  }
}
