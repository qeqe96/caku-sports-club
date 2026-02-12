import CategoryPageContent from "@/components/CategoryPageContent";
import { prisma } from "@/lib/prisma";
import * as staticData from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Spor - ÇAKÜ Spor Kulübü",
  description: "Çankırı Karatekin Üniversitesi geleneksel spor branşları",
};

export default async function SporPage() {
  let teams: any[] = staticData.teams.filter(t => t.category === "spor");
  let tournaments: any[] = staticData.tournaments.filter(t => t.category === "spor");
  let achievements: any[] = staticData.achievements.filter(a => a.category === "spor");
  let events: any[] = staticData.events.filter(e => e.category === "spor");

  try {
    const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");
    if (hasDb) {
      teams = await prisma.team.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
      tournaments = await prisma.tournament.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
      achievements = await prisma.achievement.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
      events = await prisma.event.findMany({ where: { category: "spor" }, orderBy: { id: "asc" } });
    }
  } catch {
    // Fallback to static data on error
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
