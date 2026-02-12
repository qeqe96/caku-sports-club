import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sponsors as staticSponsors } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sponsor = await prisma.sponsor.findUnique({ where: { id: parseInt(id) } });
    if (!sponsor) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(sponsor);
  } catch {
    const { id } = await params;
    const sponsor = staticSponsors.find(s => s.id === parseInt(id));
    if (!sponsor) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(sponsor);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  if (data.order) data.order = parseInt(data.order);
  try {
    const sponsor = await prisma.sponsor.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(sponsor);
  } catch {
    return NextResponse.json({ ...staticSponsors.find(s => s.id === parseInt(id)), ...data });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.sponsor.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
