"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  ["Collection", "#collection"],
  ["About", "#about"],
  ["Favorites", "#favorites"],
  ["Contact", "#contact"]
] as const;

export function TopNavbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let prev = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > prev && current > 120);
      prev = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl sm:px-6">
        <a href="#top" className="text-sm font-semibold tracking-[0.25em] text-white">
          SneakPeek
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => (
            <li key={label}>
              <a
                href={href}
                className={clsx(
                  "rounded-full px-4 py-2 text-sm text-[#d9d9d9] transition",
                  "hover:bg-white/10 hover:text-white"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#f1e6bf] transition hover:border-[#f1e6bf]/60"
          aria-label="Toggle sound"
        >
          Mute
        </button>
      </nav>
    </motion.header>
  );
}
