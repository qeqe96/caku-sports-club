"use client";

import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import TournamentCard from "./TournamentCard";
import TeamCard from "./TeamCard";
import AchievementCard from "./AchievementCard";
import EventCard from "./EventCard";
import AnnouncementCard from "./AnnouncementCard";
import SectionTitle from "./SectionTitle";
import type { Team, Tournament, Achievement, Event, Announcement } from "@/lib/api";

interface HomeContentProps {
  teams: Team[];
  tournaments: Tournament[];
  achievements: Achievement[];
  events: Event[];
  announcements: Announcement[];
}

/* Slide animations */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: EASE },
  }),
};

export default function HomeContent({ teams, tournaments, achievements, events, announcements }: HomeContentProps) {
  const sportTeamCount = teams.filter((t) => t.category === "spor").length;
  const esportTeamCount = teams.filter((t) => t.category === "e-spor").length;
  const sportAchCount = achievements.filter((a) => a.category === "spor").length;
  const esportAchCount = achievements.filter((a) => a.category === "e-spor").length;

  // Sort announcements by date descending (newest first), pinned first
  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="relative noise-overlay">
      {/* Ambient glow for home */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{ position: "absolute", top: "20%", left: 0, width: "30%", height: "40%",
          background: "radial-gradient(ellipse at 0% 50%, rgba(255,69,0,0.04) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "40%", right: 0, width: "30%", height: "40%",
          background: "radial-gradient(ellipse at 100% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <section id="kategoriler" className="py-20 scroll-mt-20">
          <SectionTitle title="Kategoriler" subtitle="Spor ve E-Spor dünyamızı keşfet" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}>
              <CategoryCard title="Spor" subtitle="Geleneksel Spor Branşları"
                description="Futbol, basketbol, voleybol ve daha fazlası. Üniversitemizin geleneksel spor takımları ile gurur duyuyoruz."
                href="/spor" color="sport"
                icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                stats={[{ label: "Takım", value: sportTeamCount.toString() }, { label: "Başarı", value: sportAchCount.toString() }, { label: "Branş", value: "4+" }]} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }}>
              <CategoryCard title="E-Spor" subtitle="Dijital Rekabet Arenası"
                description="Valorant, League of Legends, CS2 ve daha fazlası. E-spor dünyasında iddialıyız."
                href="/e-spor" color="esport"
                icon={<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
                stats={[{ label: "Takım", value: esportTeamCount.toString() }, { label: "Başarı", value: esportAchCount.toString() }, { label: "Oyun", value: "4+" }]} />
            </motion.div>
          </div>
        </section>

        {/* Duyurular / Announcements - right after categories */}
        {sortedAnnouncements.length > 0 && (
          <section id="duyurular" className="py-12 scroll-mt-20">
            <SectionTitle title="Duyurular" subtitle="Spor ve E-Spor dünyamızdan son haberler" />

            {/* Category filter tabs visual */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(255,69,0,0.06)", border: "1px solid rgba(255,69,0,0.12)" }}>
                <span className="w-2 h-2 rounded-full bg-[#FF4500]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4500]">Spor</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <span className="w-2 h-2 rounded-full bg-[#00D4FF]" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00D4FF]">E-Spor</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {sortedAnnouncements.map((a, i) => (
                <motion.div key={a.id} custom={i} variants={slideUp}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <AnnouncementCard {...a} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Etkinlikler / Events - after announcements, with images */}
        {events.length > 0 && (
          <section id="etkinlikler" className="py-12 scroll-mt-20">
            <SectionTitle title="Etkinlikler" subtitle="Yapılan ve yaklaşan etkinliklerimiz" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((e, i) => (
                <motion.div key={e.id} custom={i} variants={slideUp}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <EventCard {...e} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Tournaments - slide from right */}
        {tournaments.length > 0 && (
          <section id="turnuvalar" className="py-12 scroll-mt-20">
            <SectionTitle title="Turnuvalarımız" subtitle="Yaklaşan ve devam eden turnuvalar" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments.map((t, i) => (
                <motion.div key={t.id} custom={i} variants={slideFromRight}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <TournamentCard {...t} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Teams - slide from left */}
        {teams.length > 0 && (
          <section className="py-12">
            <SectionTitle title="Takımlarımız" subtitle="Spor ve E-Spor branşlarındaki takımlarımız" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map((t, i) => (
                <motion.div key={t.id} custom={i} variants={slideFromLeft}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
                  <TeamCard {...t} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section className="py-12">
            <SectionTitle title="Başarılarımız" subtitle="Gurur duyduğumuz başarılarımız" />
            <div className="max-w-2xl">
              {achievements.map((a, i) => <AchievementCard key={a.id} {...a} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
