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
  try {
    const data = await request.json();
    if (data.order) data.order = parseInt(data.order);
    const sponsor = await prisma.sponsor.create({ data });
    return NextResponse.json(sponsor, { status: 201 });
  } catch (error) {
    const requestData = await request.json().catch(() => ({}));
    const newSponsor = { ...requestData, id: staticSponsors.length + 1 };
    return NextResponse.json({ ...newSponsor, message: "Demo modu: Gerçek kayıt yapılmadı" }, { status: 201 });
  }
}
