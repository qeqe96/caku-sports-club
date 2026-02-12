import HeroSection from "@/components/HeroSection";
import HomeContent from "@/components/HomeContent";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  // Check if database is available (production build)
  const hasDb = process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("username:password");

  let teams: any[] = [], tournaments: any[] = [], achievements: any[] = [], events: any[] = [], announcements: any[] = [], sponsors: any[] = [];

  if (hasDb) {
    // Production: Sequential queries to avoid connection pool exhaustion
    teams = await prisma.team.findMany({ orderBy: { id: "asc" } });
    tournaments = await prisma.tournament.findMany({ orderBy: { id: "asc" } });
    achievements = await prisma.achievement.findMany({ orderBy: { id: "asc" } });
    events = await prisma.event.findMany({ orderBy: { id: "asc" } });
    announcements = await prisma.announcement.findMany({ orderBy: { id: "asc" } });
    sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });
  } else {
    // Build time: Empty arrays to avoid database errors
    teams = tournaments = achievements = events = announcements = sponsors = [];
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
