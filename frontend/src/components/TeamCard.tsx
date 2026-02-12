"use client";

import GlowCard from "./GlowCard";

interface TeamCardProps {
  name: string;
  category: string;
  sport_type: string;
  members_count: number;
  description: string | null;
}

export default function TeamCard({ name, category, sport_type, members_count, description }: TeamCardProps) {
  const isSport = category === "spor";
  const gradient = isSport ? "from-[#FF4500] to-[#FFB347]" : "from-[#00D4FF] to-[#7C3AED]";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255,69,0" : "0,212,255";

  return (
    <GlowCard glowColor={accent} glowRgb={glowRgb} gradient={gradient}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
          style={{ boxShadow: `0 0 15px rgba(${glowRgb}, 0.25)` }}>
          <span className="text-white text-lg font-black">{sport_type.charAt(0)}</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold" style={{ color: `rgba(${glowRgb}, 0.6)` }}>
          {members_count} Üye
        </span>
      </div>

      <h4 className="text-base font-bold text-white mb-1">{name}</h4>
      <p className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accent }}>{sport_type}</p>
      {description && <p className="text-sm text-[#555568] line-clamp-2">{description}</p>}
    </GlowCard>
  );
}
