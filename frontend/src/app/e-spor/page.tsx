import CategoryPageContent from "@/components/CategoryPageContent";
import { prisma } from "@/lib/prisma";
import * as staticData from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "E-Spor - ÇAKÜ Spor Kulübü",
  description: "Çankırı Karatekin Üniversitesi e-spor takımları ve turnuvaları",
};

export default async function ESporPage() {
  let teams: any[] = staticData.teams.filter(t => t.category === "e-spor");
  let tournaments: any[] = staticData.tournaments.filter(t => t.category === "e-spor");
  let achievements: any[] = staticData.achievements.filter(a => a.category === "e-spor");
  let events: any[] = staticData.events.filter(e => e.category === "e-spor");

  try {
    const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");
    if (hasDb) {
      teams = await prisma.team.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
      tournaments = await prisma.tournament.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
      achievements = await prisma.achievement.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
      events = await prisma.event.findMany({ where: { category: "e-spor" }, orderBy: { id: "asc" } });
    }
  } catch {
    // Fallback to static data on error
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
