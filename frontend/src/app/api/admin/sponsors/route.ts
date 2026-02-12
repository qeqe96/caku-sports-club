import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sponsors as staticSponsors } from "@/lib/data";

export async function GET() {
  try {
    const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(sponsors);
  } catch {
    return NextResponse.json(staticSponsors);
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  if (data.order) data.order = parseInt(data.order);
  try {
    const sponsor = await prisma.sponsor.create({ data });
    return NextResponse.json(sponsor, { status: 201 });
  } catch {
    return NextResponse.json({ ...data, id: Date.now() }, { status: 201 });
  }
}
