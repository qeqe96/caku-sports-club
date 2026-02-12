import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(sponsors);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (data.order) data.order = parseInt(data.order);
    const sponsor = await prisma.sponsor.create({ data });
    return NextResponse.json(sponsor, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Sponsor oluşturulamadı" }, { status: 400 });
  }
}
