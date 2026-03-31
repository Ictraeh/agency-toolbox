"use client";

import {
  Code2,
  Crop,
  Image as ImageIcon,
  Type
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

type Tool = {
  name: string;
  description: string;
  badge: string;
  hoverColor: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const tools: Tool[] = [
  {
    name: "ChopShop",
    description: "Generate responsive <picture> tags and srcset attributes.",
    badge: "For Devs",
    hoverColor: "#F59E0B",
    href: process.env.NEXT_PUBLIC_CHOPSHOP_URL ?? "http://127.0.0.1:3002",
    Icon: ImageIcon
  },
  {
    name: "SlimFont",
    description: "Subset heavy fonts to drastically reduce page load times.",
    badge: "For Devs",
    hoverColor: "#3B82F6",
    href: process.env.NEXT_PUBLIC_SLIMFONT_URL ?? "http://127.0.0.1:3003",
    Icon: Type
  },
  {
    name: "TagTeam",
    description: "Batch-convert raw SVGs into clean React/Vue components.",
    badge: "For Devs",
    hoverColor: "#10B981",
    href: process.env.NEXT_PUBLIC_TAGTEAM_URL ?? "http://127.0.0.1:3004",
    Icon: Code2
  },
  {
    name: "SafeSpace",
    description: "Crop videos and photos perfectly for social media safe zones.",
    badge: "For Designers",
    hoverColor: "#FF385C",
    href: process.env.NEXT_PUBLIC_SAFESPACE_URL ?? "http://127.0.0.1:3005",
    Icon: Crop
  }
];

const valueProps = [
  {
    title: "100% Private",
    text: "Runs locally in the browser."
  },
  {
    title: "Zero Friction",
    text: "No accounts, no paywalls."
  },
  {
    title: "Lightning Fast",
    text: "Powered by WebAssembly."
  }
];

export default function Home() {
  const reduceMotion = useReducedMotion();

  const heroVariant: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const listContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.15
      }
    }
  };

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 md:px-8 md:py-16">
      <section className="flex flex-col gap-8 border-b border-[#E8E8ED] pb-14 md:gap-10 md:pb-20">
        <motion.p
          variants={heroVariant}
          initial="hidden"
          animate="show"
          className="text-sm font-medium uppercase tracking-[0.2em] text-[#6B7280]"
        >
          Developer & Designer Micro-Tools
        </motion.p>

        <motion.h1
          variants={heroVariant}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.1 }}
          className="max-w-4xl text-5xl leading-[0.95] tracking-[-0.02em] md:text-7xl"
        >
          Tiny tools for massive workflows.
        </motion.h1>

        <motion.p
          variants={heroVariant}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.2 }}
          className="max-w-3xl text-base leading-relaxed text-[#6B7280] md:text-lg"
        >
          Lightning-fast, browser-based utilities to save designers and developers
          from everyday friction. No servers, no sign-ups.
        </motion.p>

        <motion.a
          href="#tools"
          variants={heroVariant}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.3 }}
          className="inline-flex w-fit items-center justify-center rounded-full bg-[#111111] px-7 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
        >
          Explore the Tools
        </motion.a>
      </section>

      <section id="tools" className="py-14 md:py-20">
        <motion.div
          variants={listContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {tools.map((tool) => (
            <motion.a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${tool.name}`}
              variants={cardVariant}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              style={
                {
                  "--hover-color": tool.hoverColor
                } as React.CSSProperties
              }
              className="group block rounded-2xl border border-[#E8E8ED] bg-white p-6 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:border-[var(--hover-color)] hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6859E8] focus-visible:ring-offset-2"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex items-center rounded-full border border-[#E8E8ED] px-3 py-1 text-xs font-medium text-[#6B7280] transition-colors duration-300 group-hover:border-[var(--hover-color)] group-hover:text-[#111111]">
                  {tool.badge}
                </span>
                <tool.Icon className="h-6 w-6 text-[#111111] transition-colors duration-300 group-hover:text-[var(--hover-color)]" />
              </div>
              <h2 className="mb-3 text-3xl tracking-[-0.01em]">{tool.name}</h2>
              <p className="text-sm leading-relaxed text-[#6B7280] md:text-base">
                {tool.description}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <section className="border-y border-[#E8E8ED] py-12 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {valueProps.map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="text-2xl tracking-[-0.01em]">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#6B7280] md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-4 py-8 text-sm text-[#6B7280] md:flex-row md:items-center">
        <p>Build by Ictraeh</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#111111]"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#111111]"
          >
            Twitter
          </a>
        </div>
      </footer>
    </main>
  );
}
