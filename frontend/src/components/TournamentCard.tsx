"use client";

import GlowCard from "./GlowCard";

interface TournamentCardProps {
  name: string;
  category: string;
  date: string;
  location: string | null;
  status: string;
  description: string | null;
}

const statusConfig: Record<string, { label: string; color: string; dotColor: string }> = {
  upcoming: { label: "YAKLAŞAN", color: "#FFB347", dotColor: "#FFB347" },
  ongoing: { label: "CANLI", color: "#22C55E", dotColor: "#22C55E" },
  completed: { label: "BİTTİ", color: "#555568", dotColor: "#555568" },
};

export default function TournamentCard({ name, category, date, location, status, description }: TournamentCardProps) {
  const statusInfo = statusConfig[status] || statusConfig.upcoming;
  const isSport = category === "spor";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255,69,0" : "0,212,255";
  const gradient = isSport ? "from-[#FF4500] to-[#FFB347]" : "from-[#00D4FF] to-[#7C3AED]";

  return (
    <GlowCard glowColor={accent} glowRgb={glowRgb} gradient={gradient}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3"
            style={{ backgroundColor: `${statusInfo.color}15`, color: statusInfo.color }}>
            {status === "ongoing" && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusInfo.dotColor, boxShadow: `0 0 6px ${statusInfo.dotColor}` }} />}
            {statusInfo.label}
          </span>
          <h4 className="text-lg font-bold text-white">{name}</h4>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
          style={{ backgroundColor: `rgba(${glowRgb}, 0.08)`, color: accent }}>
          {isSport ? "SPOR" : "E-SPOR"}
        </span>
      </div>

      {description && <p className="text-sm text-[#555568] mb-4 line-clamp-2">{description}</p>}

      <div className="flex items-center gap-4 text-xs text-[#555568]">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
        </span>
        {location && (
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </span>
        )}
      </div>
    </GlowCard>
  );
}
