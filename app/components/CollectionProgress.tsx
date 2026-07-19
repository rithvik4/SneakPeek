"use client";

import { chapterNumber } from "@/app/lib/utils";

type CollectionProgressProps = {
  total: number;
  active: number;
  names: string[];
};

export function CollectionProgress({ total, active, names }: CollectionProgressProps) {
  return (
    <aside className="fixed right-3 top-1/2 z-40 hidden w-44 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur lg:block">
      <p className="text-sm text-white">
        {chapterNumber(active)} / {chapterNumber(total - 1)}
      </p>
      <ul className="mt-3 space-y-2 text-xs text-[#a8a8a8]">
        {names.map((name, index) => (
          <li key={name} className={index === active ? "text-[#f1e6bf]" : ""}>
            {chapterNumber(index)} {name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
