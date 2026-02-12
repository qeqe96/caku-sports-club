"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useParticles } from "@/hooks/useParticles";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  color: "sport" | "esport";
  icon: React.ReactNode;
  stats: { label: string; value: string }[];
}

const colorConfig = {
  sport: {
    gradient: "from-[#FF4500] via-[#FF6B2C] to-[#FFB347]",
    glow: "#FF4500",
    glowRgb: "255, 69, 0",
    borderHover: "rgba(255, 69, 0, 0.5)",
    particleColor: "#FF4500",
    scanline: "rgba(255, 69, 0, 0.03)",
  },
  esport: {
    gradient: "from-[#00D4FF] via-[#6366F1] to-[#7C3AED]",
    glow: "#00D4FF",
    glowRgb: "0, 212, 255",
    borderHover: "rgba(0, 212, 255, 0.5)",
    particleColor: "#00D4FF",
    scanline: "rgba(0, 212, 255, 0.03)",
  },
};

export default function CategoryCard({
  title,
  subtitle,
  description,
  href,
  color,
  icon,
  stats,
}: CategoryCardProps) {
  const config = colorConfig[color];
  const {
    ref: tiltRef, tiltStyle, isHovered,
    handleMouseMove: handleTiltMove,
    handleMouseEnter: handleTiltEnter,
    handleMouseLeave: handleTiltLeave,
  } = useTilt(14);

  const {
    canvasRef,
    handleMouseMove: handleParticleMove,
    startParticles, stopParticles,
  } = useParticles(config.particleColor);

  const glowRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleTiltMove(e);
    handleParticleMove(e);
    if (tiltRef.current) {
      const rect = tiltRef.current.getBoundingClientRect();
      setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
    }
  }, [handleTiltMove, handleParticleMove, tiltRef]);

  const handleMouseEnter = useCallback(() => { handleTiltEnter(); startParticles(); }, [handleTiltEnter, startParticles]);
  const handleMouseLeave = useCallback(() => { handleTiltLeave(); stopParticles(); }, [handleTiltLeave, stopParticles]);

  return (
    <Link href={href} className="block group">
      <div ref={tiltRef} style={{ ...tiltStyle, backgroundColor: "#0a0a14", border: `1px solid rgba(${config.glowRgb}, 0.08)` }}
        onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-2xl p-8 md:p-10 h-[440px] flex flex-col justify-between cursor-pointer">

        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Mouse-follow glow */}
        <div ref={glowRef} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(500px circle at ${glowPos.x}% ${glowPos.y}%, rgba(${config.glowRgb}, 0.12), transparent 40%)` }} />

        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${config.borderHover}, 0 0 60px -15px ${config.glow}` }} />

        {/* Animated gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
          <motion.div className={`h-full bg-gradient-to-r ${config.gradient}`}
            initial={{ scaleX: 0 }} animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left", filter: `drop-shadow(0 0 6px ${config.glow})` }} />
        </div>

        {/* Scanline effect on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, ${config.scanline}, ${config.scanline} 1px, transparent 1px, transparent 3px)` }} />

        {/* Corner decorations */}
        <div className="absolute top-4 right-4 w-8 h-8 pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity">
          <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: config.glow }} />
          <div className="absolute top-0 right-0 h-full w-[1px]" style={{ background: config.glow }} />
        </div>
        <div className="absolute bottom-4 left-4 w-8 h-8 pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity">
          <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: config.glow }} />
          <div className="absolute bottom-0 left-0 h-full w-[1px]" style={{ background: config.glow }} />
        </div>

        {/* Content */}
        <div className="relative z-20">
          <motion.div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6`}
            animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? 5 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ boxShadow: isHovered ? `0 0 30px rgba(${config.glowRgb}, 0.4)` : `0 0 10px rgba(${config.glowRgb}, 0.15)` }}>
            {icon}
          </motion.div>

          <h3 className="text-3xl md:text-4xl font-black text-white mb-1 uppercase tracking-tight">{title}</h3>
          <p className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-3`}>{subtitle}</p>
          <p className="text-[#6b6b80] text-sm leading-relaxed max-w-md">{description}</p>
        </div>

        {/* Stats */}
        <div className="relative z-20 flex gap-8 mt-6">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className={`text-2xl font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-[#555568] font-bold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Arrow */}
        <motion.div className="absolute bottom-8 right-8 z-20"
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${config.glow}, transparent)` }} />
      </div>
    </Link>
  );
}
