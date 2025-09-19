"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const fit = () => {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    window.addEventListener("resize", fit);

    const BASE_STARS = 420;
    const SHOOT_CHANCE = 0.02;
    const NOVA_CHANCE = 0.003;

    const w = () => canvas.clientWidth;
    const h = () => canvas.clientHeight;

    type Star = { x: number; y: number; r: number; b: number; tw: number; hue: number };
    const stars: Star[] = [];
    const starCount = Math.floor(BASE_STARS * (Math.max(w() * h(), 1) / (1440 * 900)));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        r: 0.6 + Math.random() * 2.0,
        b: 0.5 + Math.random() * 0.6,
        tw: 0.8 + Math.random() * 1.2,
        hue: Math.random() < 0.25 ? (Math.random() < 0.5 ? 195 : 300) : 0,
      });
    }

    type Trail = { x: number; y: number; vx: number; vy: number; life: number; max: number };
    const trails: Trail[] = [];

    type Nova = { x: number; y: number; r: number; maxR: number; hue: number };
    const novae: Nova[] = [];

    const addShootingStar = () => {
      const fromLeft = Math.random() < 0.5;
      const y = 40 + Math.random() * (h() * 0.6);
      const speed = 16 + Math.random() * 16;
      const angle = fromLeft ? (-Math.PI / 6) : (-5 * Math.PI / 6);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const x = fromLeft ? -60 : w() + 60;
      trails.push({ x, y, vx, vy, life: 0, max: 70 + Math.random() * 60 });
    };

    const addSupernova = () => {
      const x = 80 + Math.random() * (w() - 160);
      const y = 80 + Math.random() * (h() * 0.7);
      const maxR = 140 + Math.random() * 200;
      const hue = Math.random() < 0.5 ? 195 : 300;
      novae.push({ x, y, r: 0, maxR, hue });
    };

    let t = 0;
    const loop = () => {
      t += 0.016;

      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, w(), h());
      const fog = ctx.createLinearGradient(0, 0, 0, h());
      fog.addColorStop(0, "rgba(255,255,255,0.020)");
      fog.addColorStop(1, "rgba(255,255,255,0.000)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w(), h());

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = (Math.sin(t * s.tw + i) + 1) * 0.5;
        const a = 0.55 + tw * 0.45;
        ctx.fillStyle = s.hue === 0
          ? `rgba(255,255,255,${a * s.b})`
          : `hsla(${s.hue}, 100%, 85%, ${a * s.b})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = s.hue === 0
          ? `rgba(180,220,255,${0.12 * a})`
          : `hsla(${s.hue}, 100%, 70%, ${0.14 * a})`;
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      if (Math.random() < SHOOT_CHANCE && trails.length < 3) addShootingStar();
      for (let i = trails.length - 1; i >= 0; i--) {
        const st = trails[i];
        st.x += st.vx; st.y += st.vy; st.life++;
        const grad = ctx.createLinearGradient(st.x, st.y, st.x - st.vx * 1.2, st.y - st.vy * 1.2);
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * 0.9, st.y - st.vy * 0.9);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.arc(st.x, st.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        if (st.life > st.max || st.x < -100 || st.x > w() + 100 || st.y > h() + 100) trails.splice(i, 1);
      }

      if (Math.random() < NOVA_CHANCE && novae.length < 3) addSupernova();
      for (let i = novae.length - 1; i >= 0; i--) {
        const n = novae[i];
        n.r += 8;
        const p = n.r / n.maxR;
        const alpha = Math.max(0, 0.45 - p * 0.45);
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${n.hue}, 100%, 70%, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.stroke();
        const coreA = Math.max(0, 0.55 - p * 0.55);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${n.hue}, 100%, 75%, ${coreA})`;
        ctx.arc(n.x, n.y, Math.max(24 - n.r * 0.12, 3), 0, Math.PI * 2);
        ctx.fill();
        if (n.r > n.maxR) novae.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ backgroundColor: "#05060a" }}
    />
  );
}
