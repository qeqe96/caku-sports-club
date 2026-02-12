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
  const data = await request.json();
  try {
    const event = await prisma.event.create({ data });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
