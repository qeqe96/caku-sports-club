"use client";

import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function useParticles(color: string = "#ef4444") {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const animationRef = useRef<number | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 100, b: 100 };
  };

  const createParticle = useCallback(
    (x: number, y: number): Particle => {
      const rgb = hexToRgb(color);
      const variation = 40;
      const r = Math.min(
        255,
        Math.max(0, rgb.r + (Math.random() - 0.5) * variation)
      );
      const g = Math.min(
        255,
        Math.max(0, rgb.g + (Math.random() - 0.5) * variation)
      );
      const b = Math.min(
        255,
        Math.max(0, rgb.b + (Math.random() - 0.5) * variation)
      );

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.015 + 0.008,
        color: `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)},`,
      };
    },
    [color]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn new particles when hovered
    if (isHoveredRef.current) {
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 60;
        particlesRef.current.push(
          createParticle(
            mouseRef.current.x + offsetX,
            mouseRef.current.y + offsetY
          )
        );
      }
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.02; // Slight upward drift
      p.alpha -= p.decay;

      if (p.alpha <= 0) return false;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.alpha * 0.3})`;
      ctx.fill();

      return true;
    });

    // Limit particles
    if (particlesRef.current.length > 150) {
      particlesRef.current = particlesRef.current.slice(-150);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    []
  );

  const startParticles = useCallback(() => {
    isHoveredRef.current = true;
    if (!animationRef.current) {
      animate();
    }
  }, [animate]);

  const stopParticles = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const resizeObserver = new ResizeObserver(() => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      });
      resizeObserver.observe(canvas);

      // Start animation loop
      animate();

      return () => {
        resizeObserver.disconnect();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [animate]);

  return {
    canvasRef,
    handleMouseMove,
    startParticles,
    stopParticles,
  };
}
