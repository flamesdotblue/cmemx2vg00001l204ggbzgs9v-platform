"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

type Slide = {
  heading: string;
  description: string;
  color: string; // tailwind gradient: from-xxx to-yyy
};

export function MacbookScroll({
  title,
  subtitle,
  slides
}: {
  title: string;
  subtitle?: string;
  slides: Slide[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // Laptop transforms
  const rotateX = useTransform(smooth, [0, 1], [12, -8]);
  const rotateY = useTransform(smooth, [0, 1], [-12, 8]);
  const scale = useTransform(smooth, [0, 0.5, 1], [0.9, 1.05, 0.95]);
  const elevation = useTransform(smooth, [0, 1], [0, 20]);

  // Screen slide swap
  const screenIndex = useTransform(smooth, (v) => Math.min(slides.length - 1, Math.floor(v * slides.length)));

  // Backdrop accent following progress
  const hue = useTransform(smooth, [0, 1], [200, 320]);
  const bgOpacity = useTransform(smooth, [0, 0.15, 0.85, 1], [0, 0.15, 0.15, 0]);
  const filter = useTransform(hue, (h) => `saturate(140%) hue-rotate(${h}deg)`);

  const [active, setActive] = useState(0);
  useMotionValueEvent(screenIndex, 'change', (v) => setActive(v));

  const sections = useMemo(() => slides.map((s, i) => ({ ...s, i })), [slides]);

  return (
    <section ref={containerRef} className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ opacity: bgOpacity, filter }}
          className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,0.25),transparent_70%)]"
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-3 text-white/70 md:text-lg">{subtitle}</p>}
      </div>

      <div className="relative h-[240vh]">
        <div ref={stickyRef} className="sticky top-0 flex min-h-screen items-center justify-center">
          <motion.div
            style={{ rotateX, rotateY, scale, y: elevation }}
            className="relative w-[90vw] max-w-5xl"
          >
            <Laptop3D>
              <Screen slides={sections} active={active} />
            </Laptop3D>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-24 grid gap-8">
        {sections.map((sec, i) => (
          <div key={i} className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="text-sm uppercase tracking-wider text-white/50">Feature {i + 1}</div>
            <div className="text-xl font-semibold">{sec.heading}</div>
            <p className="text-white/70">{sec.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Laptop3D({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto">
      {/* Lid */}
      <div className="relative mx-auto h-[420px] w-[720px] rounded-[18px] border border-white/15 bg-gradient-to-b from-zinc-900 to-black shadow-2xl shadow-black/50 ring-1 ring-black/60">
        {/* Bezel */}
        <div className="absolute inset-0 rounded-[18px] p-3">
          <div className="relative h-full w-full rounded-[12px] border border-black/50 bg-black overflow-hidden">
            {/* Notch */}
            <div className="absolute left-1/2 top-0 z-20 h-3 w-32 -translate-x-1/2 rounded-b-2xl bg-black/90" />
            {/* Screen content */}
            <div className="relative z-10 h-full w-full">{children}</div>
            {/* Glass glare */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(20deg,rgba(255,255,255,0.08),transparent_40%)]" />
          </div>
        </div>
      </div>
      {/* Hinge shadow */}
      <div className="mx-auto h-2 w-[760px] rounded-b-[20px] bg-gradient-to-b from-zinc-700 to-zinc-900" />
      {/* Base */}
      <div className="mx-auto h-3 w-[900px] rounded-b-[24px] bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]" />
    </div>
  );
}

function Screen({ slides, active }: { slides: Array<Slide & { i: number }>; active: number }) {
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ opacity: i === active ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <div className={`h-full w-full bg-gradient-to-br ${s.color}`} />
          </motion.div>
        ))}
      </div>
      {/* Overlay text inside screen */}
      <div className="relative z-10 flex h-full w-full items-end justify-between p-6">
        <div className="max-w-md">
          <motion.h3
            key={`h-${active}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-xl font-semibold"
          >
            {slides[active]?.heading}
          </motion.h3>
          <motion.p
            key={`p-${active}`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
            className="mt-1 text-white/85"
          >
            {slides[active]?.description}
          </motion.p>
        </div>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-all ${i === active ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
