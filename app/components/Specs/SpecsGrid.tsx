import type { Sneaker } from "@/app/data/shoes";
import { formatRating } from "@/app/lib/utils";

type SpecsGridProps = {
  shoe: Sneaker;
};

export function SpecsGrid({ shoe }: SpecsGridProps) {
  const rows = [
    ["Name", `${shoe.brand} ${shoe.model}`],
    ["Nickname", shoe.nickname],
    ["Release Year", String(shoe.releaseYear)],
    ["Purchase Date", shoe.purchaseDate],
    ["Purchase Location", shoe.purchaseLocation],
    ["Retail Price", shoe.retailPrice],
    ["Current Value", shoe.currentValue],
    ["Comfort Rating", formatRating(shoe.comfort)],
    ["Style Rating", formatRating(shoe.style)],
    ["Condition", shoe.condition],
    ["Favorite Outfit", shoe.favoriteOutfit],
    ["First Time Worn", shoe.firstTimeWorn]
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map(([label, value], index) => (
        <article
          key={label}
          className="group rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition duration-500 hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_15px_30px_rgba(0,0,0,0.35)]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-[#a8a8a8]">{label}</p>
          <p className="mt-2 text-base leading-snug text-white">{value}</p>
        </article>
      ))}
    </div>
  );
}
