"use client";

import GlowCard from "./GlowCard";

interface EventCardProps {
  title: string;
  category: string;
  date: string;
  location: string | null;
  description: string | null;
  image_url?: string | null;
}

export default function EventCard({ title, category, date, location, description, image_url }: EventCardProps) {
  const isSport = category === "spor";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255,69,0" : "0,212,255";
  const gradient = isSport ? "from-[#FF4500] to-[#FFB347]" : "from-[#00D4FF] to-[#7C3AED]";

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("tr-TR", { month: "short" }).toUpperCase();
  const year = dateObj.getFullYear();

  return (
    <GlowCard glowColor={accent} glowRgb={glowRgb} gradient={gradient} padding="p-0">
      {/* Image */}
      {image_url && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={image_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0"
            style={{ background: `linear-gradient(180deg, transparent 30%, rgba(10,10,20,0.95) 100%)` }} />
          {/* Category badge on image */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ backgroundColor: `rgba(${glowRgb}, 0.2)`, color: accent, border: `1px solid rgba(${glowRgb}, 0.3)` }}>
              {isSport ? "SPOR" : "E-SPOR"}
            </span>
          </div>
          {/* Date badge on image */}
          <div className="absolute bottom-3 left-4">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-black text-white leading-none" style={{ textShadow: `0 0 20px rgba(${glowRgb}, 0.5)` }}>{day}</span>
              <div className="mb-0.5">
                <span className="text-[10px] uppercase text-white/60 font-bold tracking-wider block">{month}</span>
                <span className="text-[9px] text-white/40 font-medium">{year}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {!image_url && (
          <div className="flex items-center gap-3 mb-3">
            <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-b ${isSport ? "from-[#FF4500]/10 to-transparent" : "from-[#00D4FF]/10 to-transparent"} flex flex-col items-center justify-center`}
              style={{ border: `1px solid rgba(${glowRgb}, 0.1)` }}>
              <span className="text-lg font-black text-white leading-none">{day}</span>
              <span className="text-[8px] uppercase text-[#555568] font-bold tracking-wider">{month}</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `rgba(${glowRgb}, 0.08)`, color: accent }}>
              {isSport ? "SPOR" : "E-SPOR"}
            </span>
          </div>
        )}

        <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
        {description && <p className="text-sm text-[#555568] mb-3 line-clamp-2">{description}</p>}

        <div className="flex items-center gap-3 text-xs text-[#555568]">
          {location && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {location}
            </span>
          )}
          {image_url && (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Galeri
            </span>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
