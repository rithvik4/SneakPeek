"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { SiAdidas, SiCnes, SiNewbalance, SiNike, SiPuma } from "react-icons/si";
import type { Sneaker } from "@/app/data/shoes";
import { shoes } from "@/app/data/shoes";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

const OpenBox3DScene = dynamic(
  () => import("@/app/components/OpenBox3DScene").then((module) => module.OpenBox3DScene),
  { ssr: false }
);

function hexToRgba(hexColor: string, alpha: number) {
  const clean = hexColor.replace("#", "").trim();
  const normalized = clean.length === 3
    ? clean.split("").map((char) => `${char}${char}`).join("")
    : clean;

  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value) || normalized.length !== 6) {
    return `rgba(0,0,0,${alpha})`;
  }

  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function hexToRgb(hexColor: string) {
  const clean = hexColor.replace("#", "").trim();
  const normalized = clean.length === 3
    ? clean.split("").map((char) => `${char}${char}`).join("")
    : clean;

  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value) || normalized.length !== 6) {
    return { r: 255, g: 255, b: 255 };
  }

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function getPerceivedLuminance(hexColor: string) {
  const { r, g, b } = hexToRgb(hexColor);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function getColorTooltipLabel(hexColor: string, shoe: Sneaker) {
  const normalized = hexColor.trim().toLowerCase();

  const labelMap: Record<string, string> = {
    "#ffffff": shoe.id === "converse-chuck-70" ? "White" : "Off White",
    "#f8f8f6": "Off White",
    "#f5efe4": "Cream",
    "#111111": "Black",
    "#2c2f37": "Charcoal",
    "#2c4741": "Deep Green",
    "#3d68ee": "Blue",
    "#d7262d": "Red",
    "#7dd8ef": "Aqua",
    "#d9d9d9": "Gray",
    "#8d8d8d": "Gray",
    "#1a1a1a": "Black",
  };

  return labelMap[normalized] ?? "Shoe Colour";
}

function BrandMark({ brand, color, compact = false }: { brand: string; color: string; compact?: boolean }) {
  const normalized = brand.trim().toUpperCase();
  const iconClassName = compact ? "h-7 w-auto" : "h-8 w-auto sm:h-9";

  if (normalized === "NIKE") {
    return <SiNike className={iconClassName} style={{ color }} aria-hidden="true" />;
  }

  if (normalized === "ADIDAS") {
    return <SiAdidas className={iconClassName} style={{ color }} aria-hidden="true" />;
  }

  if (normalized === "PUMA") {
    return <SiPuma className={iconClassName} style={{ color }} aria-hidden="true" />;
  }

  if (normalized === "NEW BALANCE") {
    return <SiNewbalance className={iconClassName} style={{ color }} aria-hidden="true" />;
  }

  if (normalized === "CONVERSE") {
    return <SiCnes className={iconClassName} style={{ color }} aria-hidden="true" />;
  }

  return (
    <span className={compact ? "text-lg font-semibold tracking-wide" : "text-xl font-semibold tracking-wide"} style={{ color }}>
      {brand}
    </span>
  );
}

function BoxPatterns({ shoe }: { shoe: Sneaker }) {
  if (shoe.pattern === "adidas-stripes") {
    return (
      <div className="pointer-events-none absolute inset-y-0 left-[30%] flex gap-5 opacity-95">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className="block h-full w-7 -skew-x-[22deg] rounded-sm"
            style={{ backgroundColor: shoe.patternColor }}
          />
        ))}
      </div>
    );
  }

  if (shoe.pattern === "fila-bars") {
    return (
      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-1.5">
        <span className="h-8 w-2 rounded-full" style={{ backgroundColor: shoe.patternColor }} />
        <span className="h-8 w-2 rounded-full" style={{ backgroundColor: shoe.accentBarColor }} />
        <span className="h-8 w-2 rounded-full" style={{ backgroundColor: shoe.patternColor }} />
      </div>
    );
  }

  if (shoe.pattern === "converse-badge") {
    return (
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/converse-box-transparent.png"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-95"
        />
      </div>
    );
  }

  if (shoe.pattern === "bottom-band") {
    return (
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-4 rounded-b-[0.2rem]"
        style={{ backgroundColor: shoe.patternColor }}
      />
    );
  }

  return null;
}

function CollectionBox({ shoe, onSelect }: { shoe: Sneaker; onSelect: () => void }) {
  const isConverse = shoe.pattern === "converse-badge";

  if (isConverse) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        whileHover={{ y: -6, scale: 1.005 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group relative block w-full overflow-hidden bg-transparent text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/30"
        aria-label={`Open ${shoe.model}`}
      >
        <Image
          src="/images/converse-box-transparent.png"
          alt="Converse shoebox"
          width={730}
          height={253}
          className="block h-auto w-full"
          sizes="(min-width: 1280px) 1120px, (min-width: 768px) 88vw, 94vw"
        />

        <div
          className="absolute right-[3.2%] top-1/2 -translate-y-1/2 rounded-[0.85rem] bg-white px-5 py-3 text-[1.35rem] leading-none text-black shadow-[0_2px_4px_rgba(0,0,0,0.08)] sm:px-6 sm:text-[1.5rem]"
          style={{ backgroundColor: shoe.boxLabelColor }}
        >
          <span className="block -rotate-[2deg] font-[cursive] tracking-tight">{shoe.collectionLabel}</span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block w-full rounded-[0.2rem] text-left shadow-[0_16px_30px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black/30"
      aria-label={`Open ${shoe.model}`}
    >
      <div
        className="relative overflow-hidden rounded-[0.2rem] border border-black/10"
        style={{ backgroundColor: shoe.boxColor, color: shoe.boxTextColor }}
      >
        <div className="absolute inset-x-0 top-[41%] h-px bg-black/12" />
        <div className="absolute inset-x-0 top-[4%] text-center text-[11px] font-semibold tracking-[0.34em] opacity-75">
          {shoe.lidText}
        </div>

        <BoxPatterns shoe={shoe} />

        <div className="relative flex min-h-[118px] items-center justify-between px-7 py-6 sm:min-h-[132px] sm:px-9">
          <div className="flex items-center">
            <BrandMark brand={shoe.brand} color={shoe.boxTextColor} />
          </div>
          <div
            className="rounded-[0.85rem] px-5 py-3 text-[2rem] leading-none text-black shadow-[0_2px_4px_rgba(0,0,0,0.08)] sm:px-6 sm:text-[2.1rem]"
            style={{ backgroundColor: shoe.boxLabelColor }}
          >
            <span className="block -rotate-[2deg] font-[cursive] tracking-tight">{shoe.collectionLabel}</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function OpenBoxImageReveal({
  openBoxImage,
  shoeImage,
  reduceMotion,
}: {
  openBoxImage: string;
  shoeImage: string;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[0.3rem]">
      <div className="absolute inset-0 scale-[1.20]">
        <Image
          src={openBoxImage}
          alt="Open shoe box"
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 660px, 92vw"
        />
      </div>

      <motion.div
        initial={reduceMotion ? false : { y: 80, opacity: 0, scale: 0.84, rotate: -30 }}
        animate={reduceMotion ? undefined : { y: -78, opacity: 1, scale: 1.01, rotate: -22 }}
        transition={{ duration: 0.78, ease: [0.2, 1, 0.3, 1], delay: 0.72 }}
        className="absolute left-1/2 top-[10%] z-10 w-[68%] -translate-x-1/2 sm:top-[7%] sm:w-[60%] lg:top-[5%]"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
          transition={{ duration: 2.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "loop", delay: 1.55 }}
        >
          <Image
            src={shoeImage}
            alt="Shoe pair emerging"
            width={420}
            height={420}
            className="h-auto w-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.34)]"
            sizes="(min-width: 1024px) 390px, 55vw"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.82 }}
        className="absolute left-1/2 top-[31%] z-0 h-11 w-60 -translate-x-1/2 rounded-full bg-black/16 blur-md"
      />
    </div>
  );
}

function OpenBoxDetail({
  shoe,
  onBack,
  onPrevious,
  onNext,
  reduceMotion,
}: {
  shoe: Sneaker;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
  reduceMotion: boolean;
}) {
  const swatches = shoe.detailColorSwatches && shoe.detailColorSwatches.length > 0
    ? shoe.detailColorSwatches
    : ["#ffffff", shoe.shoeAccentStart, shoe.boxColor];

  const neutralTone = swatches[1] ?? "#d9d9d9";
  const pageIsLight = getPerceivedLuminance(neutralTone) > 0.6;
  const notesBackground = pageIsLight
    ? `linear-gradient(180deg, ${hexToRgba("#1a1a1a", 0.95)}, ${hexToRgba("#0f0f0f", 0.9)})`
    : `linear-gradient(180deg, rgba(255,255,255,0.95), ${hexToRgba(neutralTone, 0.14)})`;
  const notesTextColor = pageIsLight ? "#f2f2f2" : "#1e1e1e";
  const notesLabelColor = pageIsLight ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.35)";
  const notesBorderColor = pageIsLight ? "rgba(255,255,255,0.14)" : hexToRgba(neutralTone, 0.22);
  const notesShadow = pageIsLight ? "0 14px 28px rgba(0,0,0,0.24)" : "0 10px 22px rgba(14,14,14,0.04)";
  const realPhotos = shoe.id === "converse-chuck-70"
    ? [
        "/images/chunk70 1.jpg",
        "/images/chunk70 2.jpg",
        "/images/chunk70 3.jpg",
        "/images/chunk70 4.webp",
        "/images/chunk70 5.jpg",
        "/images/chunk70 6.jpg",
        "/images/chunk70 7.jpg",
        "/images/chunk70 8.jpg",
        "/images/chunk70 9.jpg",
      ]
    : (shoe.gallery.length > 0 ? [...shoe.gallery, ...shoe.gallery] : [shoe.detailShoeImage ?? ""]);

  const inspirationPhotos = shoe.id === "converse-chuck-70"
    ? [
        "/images/chunk70 5.jpg",
        "/images/chunk70 8.jpg",
        "/images/chunk70 11.jpg",
        "/images/chunk70 7.jpg",
        "/images/chunk70 10.jpg",
        "/images/chunk70 9.jpg",
        "/images/chunk70 1.jpg",
        "/images/chunk70 2.jpg",
        "/images/chunk70 13.webp",
        "/images/chunk70 4.webp",
      ]
    : (shoe.gallery.length > 0 ? [...shoe.gallery, ...shoe.gallery, ...shoe.gallery] : [shoe.detailShoeImage ?? ""]);

  return (
    <motion.section
      key={shoe.id}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pb-16 pt-10 text-center sm:px-8"
    >
      <div className="mb-5 flex w-full max-w-4xl items-center justify-between text-sm text-black/45 sm:mb-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.28em] transition hover:border-black/20 hover:text-black"
        >
          <IoChevronBack className="h-3.5 w-3.5" aria-hidden="true" />
          take me back
        </button>
      </div>

      <div className="grid w-full max-w-[46rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:max-w-[56rem] sm:gap-5">
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/50 transition hover:border-black/20 hover:text-black sm:size-12"
          aria-label="View previous shoe"
        >
          <IoChevronBack className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="relative h-[27rem] w-full max-w-[25rem] justify-self-center sm:h-[32rem] sm:max-w-[30rem] lg:h-[33rem] lg:max-w-[31rem]">
          {shoe.detailOpenBoxImage && shoe.detailShoeImage ? (
            <OpenBoxImageReveal
              openBoxImage={shoe.detailOpenBoxImage}
              shoeImage={shoe.detailShoeImage}
              reduceMotion={reduceMotion}
            />
          ) : (
            <OpenBox3DScene boxColor={shoe.boxColor} shoeImage={shoe.detailShoeImage} reduceMotion={reduceMotion} />
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/50 transition hover:border-black/20 hover:text-black sm:size-12"
          aria-label="View next shoe"
        >
          <IoChevronForward className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="max-w-2xl -mt-16 sm:-mt-20 lg:-mt-24">
        <h1 className="text-5xl font-semibold tracking-[-0.04em] text-[#111] sm:text-6xl">{shoe.model}</h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.26em] text-black/35">{shoe.brand}</p>
      </div>

      <div
        className="mt-8 w-full max-w-[30rem] rotate-[-0.7deg] rounded-[0.2rem] border px-6 py-5 text-left sm:mt-9 sm:max-w-[33rem] sm:px-7 sm:py-6"
        style={{
          borderColor: notesBorderColor,
          background: notesBackground,
          boxShadow: notesShadow,
        }}
      >
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em]" style={{ color: notesLabelColor }}>Rithvik&apos;s Notes</p>
        <p
          className="mt-3 text-[1.04rem] leading-[1.72] sm:text-[1.08rem]"
          style={{ color: notesTextColor, transform: "rotate(0.35deg)", fontFamily: "'Comic Sans MS', 'Bradley Hand', cursive" }}
        >
          {shoe.story}
        </p>
      </div>

      <div
        className="mx-auto mt-8 grid w-full max-w-[43rem] grid-cols-3 text-center sm:mt-9 sm:max-w-[46rem]"
      >
        <div className="border-b border-r p-5 sm:p-6" style={{ borderColor: hexToRgba(neutralTone, 0.22) }}>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Size</p>
          <p className="mt-4 text-[1.6rem] font-medium leading-snug tracking-[-0.02em] text-[#111] sm:text-[1.75rem]">{shoe.size}</p>
        </div>
        <div className="border-b border-r p-5 sm:p-6" style={{ borderColor: hexToRgba(neutralTone, 0.22) }}>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Bought</p>
          <p className="mt-4 text-[1.22rem] font-medium leading-snug tracking-[-0.015em] text-[#111] sm:text-[1.45rem]">{shoe.bought}</p>
        </div>
        <div className="border-b p-5 sm:p-6" style={{ borderColor: hexToRgba(neutralTone, 0.22) }}>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Color</p>
          <div className="mt-5 flex w-full items-center justify-center gap-3">
            {swatches.map((color, index) => (
              <div key={`${color}-${index}`} className="group relative flex items-center justify-center">
                <span
                  className="h-8 w-8 rounded-full border border-black/10"
                  style={{ backgroundColor: color }}
                />
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black px-3 py-1 text-[0.68rem] font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:opacity-100">
                  {getColorTooltipLabel(color, shoe)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-r p-5 sm:p-6" style={{ borderColor: hexToRgba(neutralTone, 0.22) }}>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Material</p>
          <p className="mt-4 text-[1.22rem] font-medium leading-snug tracking-[-0.01em] text-[#111] sm:text-[1.45rem]">{shoe.material ?? "Textile"}</p>
        </div>
        <div className="border-r p-5 sm:p-6" style={{ borderColor: hexToRgba(neutralTone, 0.22) }}>
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Gender</p>
          <p className="mt-4 text-[1.22rem] font-medium leading-snug tracking-[-0.01em] text-[#111] sm:text-[1.45rem]">Unisex</p>
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-black/45">Usecase</p>
          <p className="mt-4 text-[1.22rem] font-medium leading-snug tracking-[-0.01em] text-[#111] sm:text-[1.45rem]">{shoe.category}</p>
        </div>
      </div>

      <div className="mt-12 w-full max-w-[43rem] sm:mt-14 sm:max-w-[46rem]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#111] sm:text-xl">Real photos</h2>
        </div>
        <div className="overflow-hidden">
          <motion.div
            animate={reduceMotion ? undefined : { x: [0, "-50%"] }}
            transition={reduceMotion ? undefined : { duration: 24, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            className="flex w-max gap-4"
          >
            {realPhotos.map((photo, index) => (
              <div
                key={`${photo}-${index}-real`}
                className="relative h-52 w-40 flex-none overflow-hidden rounded-[0.25rem] bg-black/5 sm:h-56 sm:w-44"
              >
                <Image
                  src={photo}
                  alt={`${shoe.model} real photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-12 w-full max-w-[43rem] sm:mt-16 sm:max-w-[46rem]">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-lg font-semibold text-[#111] sm:text-xl">Styling inspiration</h2>
          <div className="group relative inline-flex items-center justify-center">
            <span className="flex size-7 items-center justify-center rounded-full border border-black/10 text-xs text-black/35">i</span>
            <span className="pointer-events-none absolute left-0 top-full z-10 mt-2 w-72 rounded-[0.4rem] bg-black px-4 py-3 text-left text-[0.88rem] leading-snug text-white opacity-0 shadow-[0_10px_28px_rgba(0,0,0,0.24)] transition duration-200 group-hover:opacity-100">
              Ideas to style similar color, style and silhouette sneakers.
            </span>
          </div>
        </div>
        <div className="grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[10.5rem] sm:grid-cols-3">
          {inspirationPhotos.slice(0, 9).map((photo, index) => {
            const tall = index % 3 === 0;
            const wide = index % 4 === 1;

            return (
              <div
                key={`${photo}-${index}-inspiration`}
                className={`${tall ? "row-span-2" : ""} ${wide ? "col-span-2" : ""} relative overflow-hidden rounded-[0.25rem] bg-black/5`}
              >
                <Image
                  src={photo}
                  alt={`${shoe.model} styling inspiration ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 33vw, 50vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export function SneakPeekExperience() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  const selectedShoe = shoes.find((shoe) => shoe.id === selectedId) ?? null;
  const selectedIndex = selectedShoe ? shoes.findIndex((shoe) => shoe.id === selectedShoe.id) : -1;

  const pageTone = selectedShoe
    ? (selectedShoe.detailColorSwatches?.[1] ?? selectedShoe.boxColor)
    : "#9ca3af";

  const pageBackground = `linear-gradient(180deg, #ffffff 0%, ${hexToRgba(pageTone, 0.05)} 52%, ${hexToRgba(pageTone, 0.22)} 100%)`;

  const goToShoe = (index: number) => {
    const normalizedIndex = (index + shoes.length) % shoes.length;
    setSelectedId(shoes[normalizedIndex]?.id ?? null);
  };

  return (
    <div className="min-h-screen text-[#111]" style={{ background: pageBackground }}>
      <AnimatePresence mode="wait">
        {selectedShoe ? (
          <OpenBoxDetail
            key={selectedShoe.id}
            shoe={selectedShoe}
            onBack={() => setSelectedId(null)}
            onPrevious={() => goToShoe(selectedIndex - 1)}
            onNext={() => goToShoe(selectedIndex + 1)}
            reduceMotion={reduceMotion}
          />
        ) : (
          <motion.main
            key="collection"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col justify-center px-4 py-10 sm:px-8"
          >
            <div className="mb-8 w-full max-w-[400px] text-left">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#111] sm:text-4xl">SneakPeek</h1>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-sm text-black/45">Tap a box to open the pair.</p>
                <Image src="/icon.png" alt="SneakPeek icon" width={34} height={34} className="h-8 w-8 shrink-0" priority />
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-[400px] flex-col gap-4 sm:gap-5 lg:max-w-[400px]">
              {shoes.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto w-full"
                >
                  <CollectionBox shoe={shoe} onSelect={() => setSelectedId(shoe.id)} />
                </motion.div>
              ))}
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
