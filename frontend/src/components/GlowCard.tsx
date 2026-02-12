"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useParticles } from "@/hooks/useParticles";

interface GlowCardProps {
  children: ReactNode;
  glowColor: string;       // hex like "#FF4500"
  glowRgb: string;         // "255,69,0"
  gradient?: string;       // tailwind gradient classes
  className?: string;
  padding?: string;
  maxTilt?: number;
}

export default function GlowCard({
  children,
  glowColor,
  glowRgb,
  gradient = "from-[#FF4500] to-[#FFB347]",
  className = "",
  padding = "p-6",
  maxTilt = 10,
}: GlowCardProps) {
  const {
    ref: tiltRef, tiltStyle, isHovered,
    handleMouseMove: handleTiltMove,
    handleMouseEnter: handleTiltEnter,
    handleMouseLeave: handleTiltLeave,
  } = useTilt(maxTilt);

  const {
    canvasRef,
    handleMouseMove: handleParticleMove,
    startParticles, stopParticles,
  } = useParticles(glowColor);

  const glowRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleTiltMove(e);
    handleParticleMove(e);
    if (tiltRef.current) {
      const rect = tiltRef.current.getBoundingClientRect();
      setGlowPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, [handleTiltMove, handleParticleMove, tiltRef]);

  const handleMouseEnter = useCallback(() => {
    handleTiltEnter();
    startParticles();
  }, [handleTiltEnter, startParticles]);

  const handleMouseLeave = useCallback(() => {
    handleTiltLeave();
    stopParticles();
  }, [handleTiltLeave, stopParticles]);

  return (
    <div
      ref={tiltRef}
      style={{
        ...tiltStyle,
        backgroundColor: "#0a0a14",
        border: `1px solid rgba(${glowRgb}, 0.08)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl cursor-pointer ${className}`}
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at ${glowPos.x}% ${glowPos.y}%, rgba(${glowRgb}, 0.1), transparent 40%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          boxShadow: isHovered
            ? `inset 0 0 0 1px rgba(${glowRgb}, 0.4), 0 0 40px -15px ${glowColor}`
            : "none",
          opacity: isHovered ? 1 : 0,
          transition: "all 0.5s",
        }}
      />

      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "left", filter: `drop-shadow(0 0 6px ${glowColor})` }}
        />
      </div>

      {/* Scanline effect on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, rgba(${glowRgb}, 0.02), rgba(${glowRgb}, 0.02) 1px, transparent 1px, transparent 3px)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.7s",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-3 right-3 w-5 h-5 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.4 : 0.1 }}>
        <div className="absolute top-0 right-0 w-full h-[1px]" style={{ background: glowColor }} />
        <div className="absolute top-0 right-0 h-full w-[1px]" style={{ background: glowColor }} />
      </div>
      <div className="absolute bottom-3 left-3 w-5 h-5 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 0.4 : 0.1 }}>
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: glowColor }} />
        <div className="absolute bottom-0 left-0 h-full w-[1px]" style={{ background: glowColor }} />
      </div>

      {/* Content */}
      <div className={`relative z-20 ${padding}`}>
        {children}
      </div>

      {/* Background decoration */}
      <div
        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor}, transparent)`,
          opacity: isHovered ? 0.06 : 0.02,
          transition: "opacity 0.7s",
        }}
      />
    </div>
  );
}
