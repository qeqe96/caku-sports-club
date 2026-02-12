import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { events as staticEvents } from "@/lib/data";

export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { id: "asc" } });
    return NextResponse.json(events);
  } catch {
    return NextResponse.json(staticEvents);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({ data });
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    const requestData = await request.json().catch(() => ({}));
    const newEvent = { ...requestData, id: staticEvents.length + 1 };
    return NextResponse.json({ ...newEvent, message: "Demo modu: Gerçek kayıt yapılmadı" }, { status: 201 });
  }
}
