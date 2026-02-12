"use client";

import { motion } from "framer-motion";
import type { Sponsor } from "@/lib/api";

interface HeroSectionProps {
  sponsors?: Sponsor[];
}

export default function HeroSection({ sponsors = [] }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow - left orange */}
      <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 10% 30%, rgba(255,69,0,0.07) 0%, transparent 60%)" }} />
      {/* Ambient glow - right blue */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 90% 70%, rgba(0,212,255,0.06) 0%, transparent 60%)" }} />
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,69,0,0.3), rgba(0,212,255,0.3), transparent)" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
          style={{ background: "rgba(255,69,0,0.06)", border: "1px solid rgba(255,69,0,0.15)" }}>
          <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" style={{ boxShadow: "0 0 8px rgba(255,69,0,0.6)" }} />
          <span className="text-xs text-[#FF6B2C] font-bold uppercase tracking-wider">2026 Bahar Sezonu Aktif</span>
        </motion.div>

        {/* Main title */}
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 leading-[0.9]">
          <span className="text-white block" style={{ textShadow: "0 0 40px rgba(255,255,255,0.1)" }}>ÇAKÜ</span>
          <span className="block bg-gradient-to-r from-[#FF4500] via-[#FF6B2C] to-[#00D4FF] bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 30px rgba(255,69,0,0.3))" }}>
            SPOR
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base md:text-lg text-[#6b6b80] max-w-xl mx-auto mb-12 leading-relaxed font-medium">
          Çankırı Karatekin Üniversitesi&apos;nin dijital ve fiziksel arenadaki gücünü keşfet.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#kategoriler"
            className="group relative px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-white overflow-hidden transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #FF4500, #FF6B2C)", boxShadow: "0 0 30px rgba(255,69,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)" }}>
            <span className="relative z-10">Keşfet</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a href="#turnuvalar"
            className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-[#8a8a9a] hover:text-white transition-all duration-300"
            style={{ border: "1px solid rgba(255,69,0,0.2)", background: "rgba(255,69,0,0.03)" }}>
            Turnuvaları Gör
          </a>
        </motion.div>

        {/* Sponsors & Partnerships */}
        {sponsors.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#3a3a4e] font-bold mb-5">
              Sponsorlar &amp; İşbirlikleri
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {sponsors.map((sponsor, i) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="group flex flex-col items-center gap-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}>
                    {sponsor.logo_url ? (
                      <img
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        className="w-8 h-8 object-contain opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                    ) : (
                      <span className="text-base font-black text-[#3a3a4e] group-hover:text-[#555568] transition-colors duration-300">
                        {sponsor.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-[#3a3a4e] group-hover:text-[#555568] font-bold transition-colors duration-300 max-w-[80px] text-center leading-tight">
                    {sponsor.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-11 rounded-full flex items-start justify-center p-2"
            style={{ border: "2px solid rgba(255,69,0,0.2)" }}>
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2.5, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-[#FF4500]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
