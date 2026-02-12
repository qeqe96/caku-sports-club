"use client";

import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Logo config per route ─── */
function getLogoConfig(pathname: string) {
  if (pathname.startsWith("/spor")) return {
    gradient: "from-[#FF4500] via-[#FF6B2C] to-[#FFB347]",
    shadow1: "rgba(255,69,0,0.4)",
    shadow2: "rgba(255,107,44,0.3)",
    trailColor: "rgba(255,69,0,",
    ringColor: "#FF4500",
    ringColor2: "#FF4500",
    particleHex: "#FF4500",
    particleHex2: "#FF4500",
    dual: false,
  };
  if (pathname.startsWith("/e-spor")) return {
    gradient: "from-[#00D4FF] via-[#6366F1] to-[#7C3AED]",
    shadow1: "rgba(0,212,255,0.4)",
    shadow2: "rgba(99,102,241,0.3)",
    trailColor: "rgba(0,212,255,",
    ringColor: "#00D4FF",
    ringColor2: "#00D4FF",
    particleHex: "#00D4FF",
    particleHex2: "#00D4FF",
    dual: false,
  };
  return {
    gradient: "from-[#FF4500] via-[#FF6B2C] via-50% to-[#00D4FF]",
    shadow1: "rgba(255,69,0,0.35)",
    shadow2: "rgba(0,212,255,0.35)",
    trailColor: "rgba(255,69,0,",
    ringColor: "#FF4500",
    ringColor2: "#00D4FF",
    particleHex: "#FF4500",
    particleHex2: "#00D4FF",
    dual: true,
  };
}

/* ─── Logo Particle Canvas - emits particles on scroll ─── */
interface LogoParticle {
  x: number; y: number; vx: number; vy: number;
  size: number; alpha: number; decay: number; color: string;
}

function LogoParticleCanvas({ color, scrolling }: { color: string; scrolling: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<LogoParticle[]>([]);
  const animRef = useRef<number | null>(null);

  const hexToRgb = (hex: string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) } : { r: 255, g: 69, b: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 120;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 28;

    const createParticle = (): LogoParticle => {
      const angle = Math.random() * Math.PI * 2;
      const rgb = hexToRgb(color);
      const v = 20;
      const r = Math.min(255, Math.max(0, rgb.r + (Math.random() - 0.5) * v));
      const g = Math.min(255, Math.max(0, rgb.g + (Math.random() - 0.5) * v));
      const b = Math.min(255, Math.max(0, rgb.b + (Math.random() - 0.5) * v));
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        vx: Math.cos(angle) * (Math.random() * 1.5 + 0.5),
        vy: Math.sin(angle) * (Math.random() * 1.5 + 0.5),
        size: Math.random() * 2.5 + 0.8,
        alpha: Math.random() * 0.7 + 0.3,
        decay: Math.random() * 0.02 + 0.01,
        color: `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},`,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Spawn particles when scrolling
      if (scrolling) {
        for (let i = 0; i < 3; i++) {
          particlesRef.current.push(createParticle());
        }
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        if (p.alpha <= 0) return false;

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha * 0.2})`;
        ctx.fill();

        return true;
      });

      if (particlesRef.current.length > 80) {
        particlesRef.current = particlesRef.current.slice(-80);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [color, scrolling]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none z-30"
      style={{
        width: 120,
        height: 120,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

const menuItems = [
  { href: "#takimlar", label: "Takımlarımız" },
  { href: "#turnuvalar", label: "Turnuvalarımız" },
  { href: "#basarilar", label: "Başarılarımız" },
  { href: "#etkinlikler", label: "Etkinlikler" },
];

interface CatConfig {
  label: string;
  href: string;
  accent: string;
  glowRgb: string;
  gradient: string;
}

const categories: CatConfig[] = [
  {
    label: "Spor",
    href: "/spor",
    accent: "#FF4500",
    glowRgb: "255, 69, 0",
    gradient: "from-[#FF4500] via-[#FF6B2C] to-[#FFB347]",
  },
  {
    label: "E-Spor",
    href: "/e-spor",
    accent: "#00D4FF",
    glowRgb: "0, 212, 255",
    gradient: "from-[#00D4FF] via-[#6366F1] to-[#7C3AED]",
  },
];

/* ─── Side Effects Canvas ─── */
function SideEffects({ color, side }: { color: string; side: "left" | "right" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  const hexToRgb = (hex: string) => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r
      ? { r: parseInt(r[1], 16), g: parseInt(r[2], 16), b: parseInt(r[3], 16) }
      : { r: 255, g: 69, b: 0 };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    const rgb = hexToRgb(color);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Particles
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; decay: number;
    }[] = [];

    // Spawn initial burst
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: side === "left" ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6,
        y: Math.random() * h,
        vx: (side === "left" ? 1 : -1) * (Math.random() * 0.5 + 0.2),
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.1,
        decay: 0,
      });
    }

    const draw = () => {
      timeRef.current += 0.012;
      const t = timeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Draw flowing wave lines
      for (let line = 0; line < 5; line++) {
        const baseX = side === "left" ? 20 + line * 25 : w - 20 - line * 25;
        const amp = 30 + line * 10;
        const freq = 0.008 + line * 0.002;
        const phase = t * (1.5 + line * 0.3);
        const lineAlpha = 0.12 - line * 0.02;

        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lineAlpha * 0.5})`;
        ctx.shadowBlur = 10;

        for (let y = 0; y < h; y += 2) {
          const offset = Math.sin(y * freq + phase) * amp +
            Math.sin(y * freq * 2.3 + phase * 0.7) * (amp * 0.4);
          const px = baseX + offset;
          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Draw swirl circles
      for (let i = 0; i < 3; i++) {
        const cy = h * (0.2 + i * 0.3) + Math.sin(t * 0.8 + i) * 30;
        const cx = side === "left" ? 60 + Math.sin(t + i * 2) * 30 : w - 60 + Math.sin(t + i * 2) * 30;
        const radius = 20 + Math.sin(t * 1.2 + i * 1.5) * 10;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner glow
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2);
        grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.06)`);
        grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t * 2 + p.y * 0.01) * 0.3;
        p.y += p.vy;

        // Wrap around vertically
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Pulse alpha
        const pulseAlpha = p.alpha * (0.5 + 0.5 * Math.sin(t * 3 + p.x * 0.05));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${pulseAlpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${pulseAlpha * 0.15})`;
        ctx.fill();

        // Keep particles in bounds horizontally
        if (side === "left" && p.x > w * 0.7) p.vx *= -1;
        if (side === "right" && p.x < w * 0.3) p.vx *= -1;
        if (p.x < 0) p.x = side === "left" ? 0 : w;
        if (p.x > w) p.x = side === "left" ? 0 : w;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [color, side]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 h-full pointer-events-none"
      style={{
        width: "220px",
        [side]: 0,
      }}
    />
  );
}

/* ─── Mega Menu Overlay ─── */
function MegaMenu({ cat, onClose, onContentEnter, onContentLeave }: { cat: CatConfig; onClose: () => void; onContentEnter: () => void; onContentLeave: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 flex"
      style={{ top: "64px" }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050508]/95 backdrop-blur-xl" />

      {/* Side effects - Left */}
      <SideEffects color={cat.accent} side="left" />

      {/* Side effects - Right */}
      <SideEffects color={cat.accent} side="right" />

      {/* Ambient glow edges */}
      <div className="absolute top-0 left-0 w-64 h-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 50%, rgba(${cat.glowRgb}, 0.08), transparent 70%)` }} />
      <div className="absolute top-0 right-0 w-64 h-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 100% 50%, rgba(${cat.glowRgb}, 0.08), transparent 70%)` }} />

      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent 10%, rgba(${cat.glowRgb}, 0.4) 50%, transparent 90%)`, boxShadow: `0 0 15px rgba(${cat.glowRgb}, 0.3)` }} />

      {/* Content - mouse must stay inside this zone */}
      <div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4"
        onMouseEnter={onContentEnter}
        onMouseLeave={onContentLeave}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Category title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 text-center"
        >
          <Link href={cat.href} onClick={onClose}
            className={`text-5xl md:text-6xl font-black uppercase tracking-tighter bg-gradient-to-r ${cat.gradient} bg-clip-text text-transparent`}
            style={{ filter: `drop-shadow(0 0 30px rgba(${cat.glowRgb}, 0.3))` }}>
            {cat.label}
          </Link>
        </motion.div>

        {/* Menu items - vertical list */}
        <div className="flex flex-col items-center gap-1 w-full max-w-md">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="w-full"
            >
              <Link
                href={`${cat.href}${item.href}`}
                onClick={onClose}
                className="group relative flex items-center justify-center w-full py-5 px-8 rounded-xl text-center transition-all duration-300 hover:scale-[1.02]"
                style={{ border: `1px solid rgba(${cat.glowRgb}, 0.06)`, backgroundColor: "rgba(255,255,255, 0.01)" }}
              >
                {/* Hover glow bg */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(${cat.glowRgb}, 0.06), transparent 70%)`, boxShadow: `inset 0 0 0 1px rgba(${cat.glowRgb}, 0.15), 0 0 30px -10px rgba(${cat.glowRgb}, 0.2)` }} />

                {/* Left accent line on hover */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-8 rounded-full transition-all duration-300"
                  style={{ backgroundColor: cat.accent, boxShadow: `0 0 10px ${cat.accent}` }} />

                <span className="relative z-10 text-lg md:text-xl font-bold text-[#6b6b80] group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                  {item.label}
                </span>

                {/* Right arrow on hover */}
                <svg className="absolute right-6 w-5 h-5 opacity-0 translate-x-[-8px] group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300"
                  style={{ color: cat.accent }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8"
        >
          <Link href={cat.href} onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
            style={{ color: cat.accent, border: `1px solid rgba(${cat.glowRgb}, 0.2)`, background: `rgba(${cat.glowRgb}, 0.03)` }}>
            Tümünü Gör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const pathname = usePathname();
  const logoConfig = getLogoConfig(pathname);
  const [activeCat, setActiveCat] = useState<CatConfig | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setScrollRotation(window.scrollY * 0.15);
      setIsScrolling(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
      scrollTimer.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (scrollTimer.current) clearTimeout(scrollTimer.current); };
  }, []);

  const handleCatEnter = useCallback((cat: CatConfig) => {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    setActiveCat(cat);
  }, []);

  const handleCatLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setActiveCat(null), 300);
  }, []);

  const handleMenuEnter = useCallback(() => {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimeout.current = setTimeout(() => setActiveCat(null), 200);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || activeCat
          ? "bg-[#050508]/95 backdrop-blur-xl border-b border-[#1a1a2e]/60 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            {/* Centered nav group: Spor — Logo — E-Spor */}
            <div className="hidden md:flex items-center gap-2">
              {/* Spor */}
              <div
                onMouseEnter={() => handleCatEnter(categories[0])}
                onMouseLeave={handleCatLeave}
                className="relative"
              >
                <Link href={categories[0].href}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCat?.href === categories[0].href ? "text-white" : "text-[#8a8a9a] hover:text-white"
                  }`}>
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${categories[0].gradient} transition-shadow duration-300`}
                    style={{ boxShadow: activeCat?.href === categories[0].href ? `0 0 10px rgba(${categories[0].glowRgb}, 0.8)` : "none" }} />
                  {categories[0].label}
                  <motion.div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: categories[0].accent, boxShadow: `0 0 8px ${categories[0].accent}` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeCat?.href === categories[0].href ? 1 : 0 }}
                    transition={{ duration: 0.3 }} />
                </Link>
              </div>

              {/* Separator dot */}
              <div className="w-1 h-1 rounded-full bg-[#2a2a3e] mx-1" />

              {/* Logo - circular, rotates on scroll, page-specific color + trail + particles */}
              <Link href="/" className="relative group mx-3" style={{ width: 48, height: 48 }}>
                {/* Scroll particle emitter */}
                <LogoParticleCanvas color={logoConfig.particleHex} scrolling={isScrolling} />

                {/* Ghost trail rings - appear when scrolling */}
                {[0.2, 0.13, 0.07].map((opacity, i) => (
                  <div key={i}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      transform: `rotate(${scrollRotation - (i + 1) * 15}deg) scale(${1 + (i + 1) * 0.08})`,
                      border: `2.5px solid ${logoConfig.trailColor}${isScrolling ? opacity : scrolled ? opacity * 0.4 : 0})`,
                      transition: "border 0.2s",
                      filter: `blur(${(i + 1) * 1.2}px)`,
                    }}
                  />
                ))}
                {/* Main logo */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${logoConfig.gradient} flex items-center justify-center font-black text-white text-sm`}
                  style={{
                    transform: `rotate(${scrollRotation}deg)`,
                    boxShadow: isScrolling
                      ? `0 0 25px ${logoConfig.shadow1}, 0 0 25px ${logoConfig.shadow2}, 0 0 50px ${logoConfig.trailColor}0.15)`
                      : scrolled
                        ? `0 0 20px ${logoConfig.shadow1}, 0 0 20px ${logoConfig.shadow2}`
                        : `0 0 12px ${logoConfig.shadow1}40, 0 0 12px ${logoConfig.shadow2}40`,
                    transition: "box-shadow 0.3s",
                  }}
                >
                  ÇK
                </div>
                {/* Outer outline ring - THICK */}
                <div className="absolute -inset-2 rounded-full pointer-events-none"
                  style={{
                    border: `3px solid ${logoConfig.ringColor}`,
                    opacity: isScrolling ? 0.7 : scrolled ? 0.4 : 0.2,
                    transform: `rotate(${-scrollRotation * 0.5}deg)`,
                    boxShadow: `0 0 ${isScrolling ? 20 : 8}px ${logoConfig.trailColor}${isScrolling ? 0.5 : 0.2})`,
                    transition: "opacity 0.2s, box-shadow 0.2s",
                  }} />
                {/* Second outer ring (cyan) - only on home for dual theme */}
                {logoConfig.dual && (
                  <div className="absolute -inset-3 rounded-full pointer-events-none"
                    style={{
                      border: `2.5px solid ${logoConfig.ringColor2}`,
                      opacity: isScrolling ? 0.6 : scrolled ? 0.3 : 0.12,
                      transform: `rotate(${scrollRotation * 0.4}deg)`,
                      boxShadow: `0 0 ${isScrolling ? 18 : 6}px rgba(0,212,255,${isScrolling ? 0.4 : 0.15})`,
                      transition: "opacity 0.2s, box-shadow 0.2s",
                    }} />
                )}
                {/* Inner outline ring - dashed */}
                <div className="absolute -inset-0.5 rounded-full pointer-events-none"
                  style={{
                    border: `2px dashed ${logoConfig.ringColor}`,
                    opacity: isScrolling ? 0.5 : scrolled ? 0.2 : 0.08,
                    transform: `rotate(${scrollRotation * 0.7}deg)`,
                    transition: "opacity 0.2s",
                  }} />
              </Link>

              {/* Separator dot */}
              <div className="w-1 h-1 rounded-full bg-[#2a2a3e] mx-1" />

              {/* E-Spor */}
              <div
                onMouseEnter={() => handleCatEnter(categories[1])}
                onMouseLeave={handleCatLeave}
                className="relative"
              >
                <Link href={categories[1].href}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeCat?.href === categories[1].href ? "text-white" : "text-[#8a8a9a] hover:text-white"
                  }`}>
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${categories[1].gradient} transition-shadow duration-300`}
                    style={{ boxShadow: activeCat?.href === categories[1].href ? `0 0 10px rgba(${categories[1].glowRgb}, 0.8)` : "none" }} />
                  {categories[1].label}
                  <motion.div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: categories[1].accent, boxShadow: `0 0 8px ${categories[1].accent}` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeCat?.href === categories[1].href ? 1 : 0 }}
                    transition={{ duration: 0.3 }} />
                </Link>
              </div>
            </div>

            {/* Mobile: logo left, burger right */}
            <div className="flex md:hidden items-center justify-between w-full">
              <Link href="/" className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${logoConfig.gradient} flex items-center justify-center font-black text-white text-xs`}
                  style={{ transform: `rotate(${scrollRotation}deg)`, boxShadow: `0 0 15px ${logoConfig.shadow1}, 0 0 15px ${logoConfig.shadow2}` }}>
                  ÇK
                </div>
                <div className="absolute -inset-1.5 rounded-full pointer-events-none"
                  style={{ border: `2.5px solid ${logoConfig.ringColor}`, opacity: isScrolling ? 0.6 : 0.25, transform: `rotate(${-scrollRotation * 0.5}deg)`, boxShadow: isScrolling ? `0 0 12px ${logoConfig.trailColor}0.4)` : "none", transition: "opacity 0.2s, box-shadow 0.2s" }} />
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu Overlay */}
      <AnimatePresence>
        {activeCat && (
          <MegaMenu
            cat={activeCat}
            onClose={() => setActiveCat(null)}
            onContentEnter={handleMenuEnter}
            onContentLeave={handleMenuLeave}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-[#050508]/98 backdrop-blur-xl pt-20 md:hidden overflow-y-auto">
            <div className="px-6 py-4 space-y-2">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="block px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-[#8a8a9a] hover:text-white hover:bg-white/5 transition-all">
                Ana Sayfa
              </Link>

              {categories.map((cat) => (
                <div key={cat.href}>
                  <button onClick={() => setMobileExpanded(mobileExpanded === cat.href ? null : cat.href)}
                    className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-base font-bold uppercase tracking-wider text-[#8a8a9a] hover:text-white hover:bg-white/5 transition-all">
                    <span className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${cat.gradient}`} />
                      {cat.label}
                    </span>
                    <motion.svg animate={{ rotate: mobileExpanded === cat.href ? 180 : 0 }}
                      transition={{ duration: 0.2 }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === cat.href && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="pl-8 pb-3 space-y-1">
                          {menuItems.map((item) => (
                            <Link key={item.href} href={`${cat.href}${item.href}`} onClick={() => setMobileOpen(false)}
                              className="block px-4 py-3 rounded-lg text-sm text-[#6b6b80] hover:text-white hover:bg-white/5 transition-all font-medium">
                              {item.label}
                            </Link>
                          ))}
                          <Link href={cat.href} onClick={() => setMobileOpen(false)}
                            className="block px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                            style={{ color: cat.accent }}>
                            Tümünü Gör →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
