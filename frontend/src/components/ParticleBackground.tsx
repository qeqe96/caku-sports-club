"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface Dot {
  x: number; y: number; vx: number; vy: number; size: number; color: string;
}

function getColors(pathname: string): [string, string] {
  if (pathname.startsWith("/spor")) return ["rgba(255,69,0,", "rgba(255,107,44,"];
  if (pathname.startsWith("/e-spor")) return ["rgba(0,212,255,", "rgba(99,102,241,"];
  return ["rgba(255,69,0,", "rgba(0,212,255,"];
}

function getLineColor(pathname: string): string {
  if (pathname.startsWith("/spor")) return "255,69,0";
  if (pathname.startsWith("/e-spor")) return "0,212,255";
  return "255,255,255";
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const colorsRef = useRef(getColors(pathname));
  const lineColorRef = useRef(getLineColor(pathname));

  // Update colors on route change
  useEffect(() => {
    colorsRef.current = getColors(pathname);
    lineColorRef.current = getLineColor(pathname);
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Re-size on scroll to capture full page height
    const resizeObserver = new MutationObserver(resize);
    resizeObserver.observe(document.body, { childList: true, subtree: true });

    const dots: Dot[] = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 25000));
    for (let i = 0; i < count; i++) {
      const c = colorsRef.current;
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? c[0] : c[1],
      });
    }

    let animId: number;
    const draw = () => {
      resize(); // keep height up to date
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update dot colors smoothly
      const c = colorsRef.current;
      dots.forEach((d, i) => {
        d.color = i % 2 === 0 ? c[0] : c[1];
      });

      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}0.35)`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}0.04)`;
        ctx.fill();
      });

      // Draw connections
      const lc = lineColorRef.current;
      dots.forEach((a, i) => {
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lc},${0.025 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
}
