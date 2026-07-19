type MobileDockProps = {
  onOpenCurrent: () => void;
};

export function MobileDock({ onOpenCurrent }: MobileDockProps) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur lg:hidden">
      <a href="#collection" className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#d9d9d9]">
        Collection
      </a>
      <button
        type="button"
        onClick={onOpenCurrent}
        className="rounded-full border border-[#f1e6bf]/60 px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#f1e6bf]"
      >
        Open Box
      </button>
      <a href="#about" className="rounded-full px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#d9d9d9]">
        About
      </a>
    </div>
  );
}
