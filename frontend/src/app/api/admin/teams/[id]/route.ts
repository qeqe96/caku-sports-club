import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teams as staticTeams } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const team = await prisma.team.findUnique({ where: { id: parseInt(id) } });
    if (!team) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(team);
  } catch {
    const { id } = await params;
    const team = staticTeams.find(t => t.id === parseInt(id));
    if (!team) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(team);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  try {
    const team = await prisma.team.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(team);
  } catch {
    return NextResponse.json({ ...staticTeams.find(t => t.id === parseInt(id)), ...data });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.team.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true, message: "Demo modu: Gerçek silme yapılmadı" });
  }
}
