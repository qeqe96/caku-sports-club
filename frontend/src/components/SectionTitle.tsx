"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionTitle({ title, subtitle, id }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      id={id}
      className="mb-10 scroll-mt-24"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[2px] w-8 bg-gradient-to-r from-[#FF4500] to-[#00D4FF]"
          style={{ boxShadow: "0 0 8px rgba(255,69,0,0.3)" }} />
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{title}</h2>
      </div>
      {subtitle && <p className="text-[#6b6b80] text-sm ml-12 font-medium">{subtitle}</p>}
    </motion.div>
  );
}
