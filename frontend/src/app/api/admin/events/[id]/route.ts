import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { events as staticEvents } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({ where: { id: parseInt(id) } });
    if (!event) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(event);
  } catch {
    const { id } = await params;
    const event = staticEvents.find(e => e.id === parseInt(id));
    if (!event) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    return NextResponse.json(event);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await request.json();
  try {
    const event = await prisma.event.update({
      where: { id: parseInt(id) },
      data,
    });
    return NextResponse.json(event);
  } catch {
    return NextResponse.json({ ...staticEvents.find(e => e.id === parseInt(id)), ...data });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.event.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true, message: "Demo modu: Gerçek silme yapılmadı" });
  }
}
