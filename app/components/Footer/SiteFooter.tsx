import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-white/10 px-4 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-2xl font-semibold text-white">SneakPeek</p>
          <p className="mt-2 text-sm text-[#a8a8a8]">Designed and developed by Rithvik Kumar</p>
        </div>
        <div className="flex items-center gap-3 text-xl text-[#d9d9d9]">
          <a href="#" aria-label="Instagram" className="rounded-full border border-white/10 p-3 transition hover:-translate-y-0.5 hover:border-white/30">
            <FaInstagram />
          </a>
          <a href="#" aria-label="X" className="rounded-full border border-white/10 p-3 transition hover:-translate-y-0.5 hover:border-white/30">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="GitHub" className="rounded-full border border-white/10 p-3 transition hover:-translate-y-0.5 hover:border-white/30">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
