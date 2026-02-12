"use client";

import { motion } from "framer-motion";
import TournamentCard from "./TournamentCard";
import TeamCard from "./TeamCard";
import AchievementCard from "./AchievementCard";
import EventCard from "./EventCard";
import SectionTitle from "./SectionTitle";
import type { Team, Tournament, Achievement, Event } from "@/lib/api";

interface CategoryPageContentProps {
  category: "spor" | "e-spor";
  title: string;
  subtitle: string;
  teams: Team[];
  tournaments: Tournament[];
  achievements: Achievement[];
  events: Event[];
}

/* Slide-in variants */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
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

export default function CategoryPageContent({
  category, title, subtitle, teams, tournaments, achievements, events,
}: CategoryPageContentProps) {
  const isSport = category === "spor";
  const gradient = isSport
    ? "from-[#FF4500] via-[#FF6B2C] to-[#FFB347]"
    : "from-[#00D4FF] via-[#6366F1] to-[#7C3AED]";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255, 69, 0" : "0, 212, 255";

  return (
    <div className="min-h-screen pt-20 relative noise-overlay">
      {/* Ambient edge glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "60%", background: `radial-gradient(ellipse at 0% 0%, rgba(${glowRgb}, 0.06) 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "40%", height: "50%", background: `radial-gradient(ellipse at 100% 100%, rgba(${glowRgb}, 0.04) 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "50%", right: 0, width: "20%", height: "40%", background: `radial-gradient(ellipse at 100% 50%, rgba(${glowRgb}, 0.03) 0%, transparent 70%)` }} />
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden py-24 mb-10">
        {/* Big ambient glow behind title */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(${glowRgb}, 0.08), transparent 60%)` }} />

        {/* Scanlines */}
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(${glowRgb}, 0.015), rgba(${glowRgb}, 0.015) 1px, transparent 1px, transparent 3px)` }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>

            {/* Neon label */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: `rgba(${glowRgb}, 0.06)`, border: `1px solid rgba(${glowRgb}, 0.15)` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>{isSport ? "Spor Kategorisi" : "E-Spor Kategorisi"}</span>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-black mb-4 uppercase tracking-tighter">
              <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                style={{ filter: `drop-shadow(0 0 40px rgba(${glowRgb}, 0.3))` }}>
                {title}
              </span>
            </h1>
            <p className="text-lg text-[#6b6b80] max-w-xl font-medium">{subtitle}</p>
          </motion.div>

          {/* Stats with slide-in */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }} className="flex gap-10 mt-10">
            {[
              { label: "Takım", value: teams.length },
              { label: "Turnuva", value: tournaments.length },
              { label: "Başarı", value: achievements.length },
              { label: "Etkinlik", value: events.length },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}>
                <p className={`text-3xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#555568] font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Teams - Slide from left */}
        {teams.length > 0 && (
          <section id="takimlar" className="py-12 scroll-mt-24">
            <SectionTitle title="Takımlarımız" />
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

        {/* Tournaments - Slide from right */}
        {tournaments.length > 0 && (
          <section id="turnuvalar" className="py-12 scroll-mt-24">
            <SectionTitle title="Turnuvalarımız" />
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

        {/* Achievements - Slide up */}
        {achievements.length > 0 && (
          <section id="basarilar" className="py-12 scroll-mt-24">
            <SectionTitle title="Başarılarımız" />
            <div className="max-w-2xl">
              {achievements.map((a, i) => (
                <AchievementCard key={a.id} {...a} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Events - Slide up */}
        {events.length > 0 && (
          <section id="etkinlikler" className="py-12 scroll-mt-24">
            <SectionTitle title="Etkinlikler" />
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
      </div>
    </div>
  );
}
