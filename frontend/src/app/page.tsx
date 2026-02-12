import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";
import { prisma } from "@/lib/prisma";
import * as staticData from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let teams: any[] = staticData.teams;
  let tournaments: any[] = staticData.tournaments;
  let achievements: any[] = staticData.achievements;
  let events: any[] = staticData.events;
  let announcements: any[] = staticData.announcements;
  let sponsors: any[] = staticData.sponsors;

  try {
    const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");
    if (hasDb) {
      teams = await prisma.team.findMany({ orderBy: { id: "asc" } });
      tournaments = await prisma.tournament.findMany({ orderBy: { id: "asc" } });
      achievements = await prisma.achievement.findMany({ orderBy: { id: "asc" } });
      events = await prisma.event.findMany({ orderBy: { id: "asc" } });
      announcements = await prisma.announcement.findMany({ orderBy: { id: "asc" } });
      sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
    }
  } catch {
    // Fallback to static data on error
  }

  return (
    <>
      <HeroSection sponsors={sponsors} />
      <HomeContent
        teams={teams}
        tournaments={tournaments}
        achievements={achievements}
        events={events}
        announcements={announcements}
      />
    </>
  );
}
