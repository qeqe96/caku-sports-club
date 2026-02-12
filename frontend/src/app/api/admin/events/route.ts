import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const events = await prisma.event.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({ data });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Etkinlik oluşturulamadı" }, { status: 400 });
  }
}
