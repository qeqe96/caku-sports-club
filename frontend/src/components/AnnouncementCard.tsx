"use client";

import GlowCard from "./GlowCard";

interface AnnouncementCardProps {
  title: string;
  category: string;
  date: string;
  summary: string;
  pinned: boolean;
}

export default function AnnouncementCard({ title, category, date, summary, pinned }: AnnouncementCardProps) {
  const isSport = category === "spor";
  const accent = isSport ? "#FF4500" : "#00D4FF";
  const glowRgb = isSport ? "255,69,0" : "0,212,255";
  const gradient = isSport ? "from-[#FF4500] to-[#FFB347]" : "from-[#00D4FF] to-[#7C3AED]";

  const dateObj = new Date(date);
  const timeAgo = getTimeAgo(dateObj);

  return (
    <GlowCard glowColor={accent} glowRgb={glowRgb} gradient={gradient}>
      <div className="flex items-start gap-4">
        {/* Category indicator */}
        <div className="shrink-0 mt-1">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
            style={{ boxShadow: `0 0 12px rgba(${glowRgb}, 0.2)` }}>
            {isSport ? (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            {pinned && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `rgba(${glowRgb}, 0.1)`, color: accent }}>
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                SABİT
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `rgba(${glowRgb}, 0.08)`, color: accent }}>
              {isSport ? "SPOR" : "E-SPOR"}
            </span>
            <span className="text-[10px] text-[#555568] font-medium">{timeAgo}</span>
          </div>

          <h4 className="text-base font-bold text-white mb-1.5 leading-snug">{title}</h4>
          <p className="text-sm text-[#555568] leading-relaxed line-clamp-2">{summary}</p>
        </div>
      </div>
    </GlowCard>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} gün önce`;
  if (hours > 0) return `${hours} saat önce`;
  if (minutes > 0) return `${minutes} dk önce`;
  return "Az önce";
}
