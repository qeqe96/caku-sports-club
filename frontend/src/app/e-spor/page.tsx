import CategoryPageContent from "@/components/CategoryPageContent";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "E-Spor - ÇAKÜ Spor Kulübü",
  description: "Çankırı Karatekin Üniversitesi e-spor takımları ve turnuvaları",
};

export default async function ESporPage() {
  // Check if database is available (production build)
  const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");

  let teams: any[] = [], tournaments: any[] = [], achievements: any[] = [], events: any[] = [];

  if (hasDb) {
    // Production: Sequential queries to avoid connection pool exhaustion
    teams = await prisma.team.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
    tournaments = await prisma.tournament.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
    achievements = await prisma.achievement.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
    events = await prisma.event.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
  } else {
    // Build time: Empty arrays to avoid database errors
    teams = tournaments = achievements = events = [];
  }

  return (
    <CategoryPageContent
      category="e-spor"
      title="E-Spor"
      subtitle="Valorant, League of Legends, CS2 ve daha fazlası. Dijital rekabet arenasında iddialıyız."
      teams={teams}
      tournaments={tournaments}
      achievements={achievements}
      events={events}
    />
  );
}
