import CategoryPageContent from "@/components/CategoryPageContent";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Spor - ÇAKÜ Spor Kulübü",
  description: "Çankırı Karatekin Üniversitesi geleneksel spor branşları",
};

export default async function SporPage() {
  // Check if database is available (production build)
  const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");

  let teams: any[] = [], tournaments: any[] = [], achievements: any[] = [], events: any[] = [];

  if (hasDb) {
    // Production: Sequential queries to avoid connection pool exhaustion
    teams = await prisma.team.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
    tournaments = await prisma.tournament.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
    achievements = await prisma.achievement.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
    events = await prisma.event.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
  } else {
    // Build time: Empty arrays to avoid database errors
    teams = tournaments = achievements = events = [];
  }

  return (
    <CategoryPageContent
      category="spor"
      title="Spor"
      subtitle="Futbol, basketbol, voleybol ve daha fazlası. Üniversitemizin geleneksel spor takımlarını keşfedin."
      teams={teams}
      tournaments={tournaments}
      achievements={achievements}
      events={events}
    />
  );
}
