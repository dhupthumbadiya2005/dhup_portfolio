"use client";

import { useEffect, useRef } from "react";

const cssVar = (n: string) =>
  typeof window === "undefined"
    ? ""
    : getComputedStyle(document.documentElement).getPropertyValue(n).trim();

/* ══════════════════════════════════════════════════════════════════════════
   CODE RAIN  ·  left panel
   Falling columns of code symbols; cursor hover lights up nearby chars
══════════════════════════════════════════════════════════════════════════ */

const SYMS  = "01{}[]();:=<>+-*/&|!?.,@#^~0123456789".split("");
const COL_W = 14;
const CH    = 14; // char height / row pitch

function rndChar() {
  return SYMS[(Math.random() * SYMS.length) | 0];
}

interface Col {
  x: number;
  y: number;       // head y (pixels)
  spd: number;
  len: number;     // trail length in chars
  chars: string[];
  wait: number;    // frames to skip before moving
}

function makeCol(x: number, H: number): Col {
  return {
    x,
    y: -Math.random() * H,
    spd:  0.6 + Math.random() * 1.6,
    len:  14 + ((Math.random() * 18) | 0),
    chars: Array.from({ length: 36 }, rndChar),
    wait: 0,
  };
}

function CodeRain() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef   = useRef<HTMLCanvasElement>(null);
  const cols    = useRef<Col[]>([]);
  const mouse   = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const wrap = wrapRef.current, cv = cvRef.current;
    if (!wrap || !cv) return;
    let active = true;

    const init = () => {
      cv.width  = wrap.clientWidth;
      cv.height = wrap.clientHeight;
      const n   = Math.floor(cv.width / COL_W);
      cols.current = Array.from({ length: n }, (_, i) =>
        makeCol(i * COL_W + COL_W / 2, cv.height)
      );
    };

    const tick = () => {
      if (!active) return;
      const ctx = cv.getContext("2d")!;
      const W = cv.width, H = cv.height;
      const primary = cssVar("--primary");
      const fg      = cssVar("--foreground");

      ctx.clearRect(0, 0, W, H);
      ctx.font      = `${CH - 1}px monospace`;
      ctx.textAlign = "center";

      for (const col of cols.current) {
        if (col.wait > 0) { col.wait--; continue; }

        col.y += col.spd;

        // randomly mutate a char in the stream
        if (Math.random() < 0.04)
          col.chars[(Math.random() * col.chars.length) | 0] = rndChar();

        for (let i = 0; i < col.len; i++) {
          const cy = col.y - i * CH;
          if (cy < -CH || cy > H + CH) continue;

          const dx  = col.x - mouse.current.x;
          const dy  = cy    - mouse.current.y;
          const glow = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 90);

          if (i === 0) {
            ctx.globalAlpha = 0.12 + glow * 0.35;
            ctx.fillStyle   = glow > 0.3 ? fg : primary;
          } else {
            const fade = (1 - i / col.len);
            ctx.globalAlpha = fade * 0.07 + glow * 0.05;
            ctx.fillStyle   = primary;
          }
          ctx.fillText(col.chars[i % col.chars.length], col.x, cy);
        }

        // reset column after it exits bottom
        if (col.y - col.len * CH > H) {
          col.y    = -CH;
          col.spd  = 0.6 + Math.random() * 1.6;
          col.len  = 14 + ((Math.random() * 18) | 0);
          col.chars = Array.from({ length: 36 }, rndChar);
          col.wait = (Math.random() * 80) | 0;
        }
      }

      ctx.globalAlpha = 1;
      ctx.textAlign   = "left";
      requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(init);
    ro.observe(wrap);
    init();

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    requestAnimationFrame(tick);

    return () => {
      active = false;
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full pointer-events-auto">
      <canvas ref={cvRef} className="absolute inset-0" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PARTICLE NET  ·  right panel
   Floating dots that connect when close; cursor gently pulls them
══════════════════════════════════════════════════════════════════════════ */

const P_COUNT  = 55;
const LINK_D   = 115; // max connection distance

interface P {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  phase: number;
}

function makeP(W: number, H: number): P {
  const spd = 0.18 + Math.random() * 0.52;
  const ang = Math.random() * Math.PI * 2;
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: Math.cos(ang) * spd,
    vy: Math.sin(ang) * spd,
    r: 1.4 + Math.random() * 1.4,
    phase: Math.random() * Math.PI * 2,
  };
}

function ParticleNet() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cvRef   = useRef<HTMLCanvasElement>(null);
  const ps      = useRef<P[]>([]);
  const mouse   = useRef({ x: -9999, y: -9999 });
  const frame   = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current, cv = cvRef.current;
    if (!wrap || !cv) return;
    let active = true;

    const init = () => {
      cv.width  = wrap.clientWidth;
      cv.height = wrap.clientHeight;
      ps.current = Array.from({ length: P_COUNT }, () => makeP(cv.width, cv.height));
    };

    const tick = () => {
      if (!active) return;
      const ctx = cv.getContext("2d")!;
      const W = cv.width, H = cv.height;
      const t  = frame.current++ / 60;

      const primary = cssVar("--primary");
      const border  = cssVar("--border");

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x, my = mouse.current.y;
      const list = ps.current;

      /* update & draw dots */
      for (const p of list) {
        // cursor pull
        const dx = mx - p.x, dy = my - p.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 160 && d > 0) {
          const f = (1 - d / 160) * 0.035;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        // speed cap
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1.1) { p.vx *= 1.1 / spd; p.vy *= 1.1 / spd; }

        p.x += p.vx; p.y += p.vy;

        // bounce
        if (p.x < p.r || p.x > W - p.r) { p.vx *= -1; p.x = Math.max(p.r, Math.min(W - p.r, p.x)); }
        if (p.y < p.r || p.y > H - p.r) { p.vy *= -1; p.y = Math.max(p.r, Math.min(H - p.r, p.y)); }

        const pulse = p.r + Math.sin(t * 1.8 + p.phase) * 0.5;
        ctx.globalAlpha = 0.12;
        ctx.fillStyle   = primary;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      /* connections */
      ctx.lineWidth = 0.75;
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const dx = list[i].x - list[j].x;
          const dy = list[i].y - list[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_D) {
            ctx.globalAlpha = (1 - d / LINK_D) * 0.1;
            ctx.strokeStyle = border || primary;
            ctx.beginPath();
            ctx.moveTo(list[i].x, list[i].y);
            ctx.lineTo(list[j].x, list[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(init);
    ro.observe(wrap);
    init();

    const onMove = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    requestAnimationFrame(tick);

    return () => {
      active = false;
      ro.disconnect();
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full pointer-events-auto">
      <canvas ref={cvRef} className="absolute inset-0" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PANELS
══════════════════════════════════════════════════════════════════════════ */

const GUTTER = { width: "calc((100vw - 42rem) / 2)" };

export function TechSidePanels() {
  return (
    <>
      <div className="hidden xl:block fixed top-0 left-0 h-full z-1" style={GUTTER}>
        <CodeRain />
      </div>
      <div className="hidden xl:block fixed top-0 right-0 h-full z-1" style={GUTTER}>
        <ParticleNet />
      </div>
    </>
  );
}
