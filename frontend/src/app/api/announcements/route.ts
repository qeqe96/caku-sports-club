import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const where = category ? { category } : {};
  const announcements = await prisma.announcement.findMany({ where, orderBy: { id: "asc" } });
  return NextResponse.json(announcements);
}
