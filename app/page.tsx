"use client";

import { useMemo, useState } from "react";
import {
  Code2,
  Crop,
  Image as ImageIcon,
  Minimize2,
  Orbit,
  Palette,
  Search,
  Sparkles,
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
    description: "Create responsive picture and srcset markup.",
    badge: "For Devs",
    hoverColor: "#F59E0B",
    href: "https://chopshop-ashy.vercel.app",
    Icon: ImageIcon
  },
  {
    name: "SlimFont",
    description: "Reduce font files for faster page loads.",
    badge: "For Devs",
    hoverColor: "#3B82F6",
    href: "https://slimfont-eight.vercel.app",
    Icon: Type
  },
  {
    name: "TagTeam",
    description: "Convert SVG files into React and Vue components.",
    badge: "For Devs",
    hoverColor: "#10B981",
    href: "https://tagteam-ten.vercel.app",
    Icon: Code2
  },
  {
    name: "SafeSpace",
    description: "Crop videos and images for social safe zones.",
    badge: "For Designers",
    hoverColor: "#FF385C",
    href: "https://safespace-gray.vercel.app",
    Icon: Crop
  },
  {
    name: "Shrink",
    description:
      "Compress photos and video for the web — smaller files, ready to ship.",
    badge: "For Designers",
    hoverColor: "#0071E3",
    href: "https://image-and-video-compression.vercel.app",
    Icon: Minimize2
  },
  {
    name: "UIColorGenerator",
    description: "Generate playful palettes mapped to production-ready tokens.",
    badge: "For Designers",
    hoverColor: "#8B5CF6",
    href: "https://uicolor-generator.vercel.app",
    Icon: Palette
  },
  {
    name: "VibePrompt",
    description:
      "Build structured vibe-coding prompts from industry, stack, motion, and style choices.",
    badge: "For Designers",
    hoverColor: "#EC4899",
    href: "https://websitepromptgenerator.vercel.app/",
    Icon: Sparkles
  },
  {
    name: "Mood to Motion",
    description:
      "Preview how feeling tags map to motion: element, effect, interaction, and background in one live canvas.",
    badge: "For Designers",
    hoverColor: "#0EA5E9",
    href: "https://moodtomotion.vercel.app/",
    Icon: Orbit
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
  const [query, setQuery] = useState("");

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

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return tools;

    return tools.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(normalized) ||
        tool.description.toLowerCase().includes(normalized) ||
        tool.badge.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10 md:px-8 md:py-16">
      <section className="flex flex-col gap-8 border-b border-[#E8E8ED] pb-14 md:gap-10 md:pb-20">
        <motion.div
          variants={heroVariant}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl"
        >
          <label
            htmlFor="tool-search"
            className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#86868B]"
          >
            Search Tools
          </label>
          <div className="flex items-center gap-2 rounded-full border border-[#E8E8ED] bg-[#F5F5F7] px-4 py-3 focus-within:border-[#6859E8] focus-within:ring-2 focus-within:ring-[#CCAFFF]">
            <Search className="h-4 w-4 text-[#86868B]" />
            <input
              id="tool-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, purpose, or role"
              className="w-full bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
            />
          </div>
        </motion.div>

        <motion.p
          variants={heroVariant}
          initial="hidden"
          animate="show"
          className="text-sm font-medium uppercase tracking-[0.2em] text-[#86868B]"
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
          className="max-w-3xl text-base leading-relaxed text-[#86868B] md:text-lg"
        >
          Fast browser tools for everyday design and development tasks. No
          sign-up. No setup.
        </motion.p>

        <motion.a
          href="#tools"
          variants={heroVariant}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.3 }}
          className="inline-flex w-fit items-center justify-center rounded-full bg-[#1D1D1F] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(104,89,232,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6859E8] focus-visible:ring-offset-2"
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
          {filteredTools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={cardVariant}
              className="h-full"
              style={
                {
                  "--hover-color": tool.hoverColor
                } as React.CSSProperties
              }
            >
              <a
                href={tool.href}
                aria-label={`Open ${tool.name}`}
                className="group block h-full rounded-2xl border border-[#E8E8ED] bg-white p-6 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--hover-color)] hover:shadow-[0_12px_28px_rgba(17,17,17,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6859E8] focus-visible:ring-offset-2"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center rounded-full border border-[#E8E8ED] px-3 py-1 text-xs font-medium text-[#86868B] transition-colors duration-300 group-hover:border-[var(--hover-color)] group-hover:text-[#1D1D1F]">
                    {tool.badge}
                  </span>
                  <tool.Icon className="h-6 w-6 text-[#1D1D1F] transition-colors duration-300 group-hover:text-[var(--hover-color)]" />
                </div>
                <h2 className="mb-3 text-3xl tracking-[-0.01em] text-[#1D1D1F]">
                  {tool.name}
                </h2>
                <p className="text-sm leading-relaxed text-[#86868B] md:text-base">
                  {tool.description}
                </p>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-[#E8E8ED] bg-white p-6 text-sm text-[#86868B]">
            No tools found. Try a different keyword.
          </div>
        ) : null}
      </section>

      <section className="border-y border-[#E8E8ED] py-12 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {valueProps.map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="text-2xl tracking-[-0.01em] text-[#1D1D1F]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#86868B] md:text-base">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-4 py-8 text-sm text-[#86868B] md:flex-row md:items-center">
        <p>Built by Ictraeh</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#1D1D1F]"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-[#1D1D1F]"
          >
            Twitter
          </a>
        </div>
      </footer>
    </main>
  );
}
