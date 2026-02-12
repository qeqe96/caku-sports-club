"use client";

import { motion } from "framer-motion";
import GlowCard from "./GlowCard";

interface AchievementCardProps {
  title: string;
  category: string;
  date: string;
  description: string | null;
  index: number;
}

export default function AchievementCard({ title, category, date, description, index }: AchievementCardProps) {
  const isSport = category === "spor";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255,69,0" : "0,212,255";
  const gradient = isSport ? "from-[#FF4500] to-[#FFB347]" : "from-[#00D4FF] to-[#7C3AED]";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="relative flex gap-6 group"
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full z-10 group-hover:scale-150 transition-transform duration-300"
          style={{ border: `2px solid ${accent}`, backgroundColor: `rgba(${glowRgb}, 0.15)`, boxShadow: `0 0 10px rgba(${glowRgb}, 0.2)` }} />
        <div className="flex-1 w-[1px]" style={{ background: `linear-gradient(180deg, rgba(${glowRgb}, 0.2), transparent)` }} />
      </div>

      <div className="pb-6 flex-1">
        <GlowCard glowColor={accent} glowRgb={glowRgb} gradient={gradient} maxTilt={8} padding="p-5">
          <span className="text-[10px] uppercase tracking-wider font-bold mb-2 block" style={{ color: `rgba(${glowRgb}, 0.5)` }}>
            {new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </span>
          <h4 className="text-base font-bold text-white mb-1">{title}</h4>
          {description && <p className="text-sm text-[#555568] leading-relaxed">{description}</p>}
          <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ backgroundColor: `rgba(${glowRgb}, 0.08)`, color: accent }}>
            {isSport ? "SPOR" : "E-SPOR"}
          </span>
        </GlowCard>
      </div>
    </motion.div>
  );
}
