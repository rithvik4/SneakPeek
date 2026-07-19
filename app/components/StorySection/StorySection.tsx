import type { Sneaker } from "@/app/data/shoes";

type StorySectionProps = {
  shoe: Sneaker;
};

export function StorySection({ shoe }: StorySectionProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10">
      <p className="text-xs uppercase tracking-[0.3em] text-[#a8a8a8]">Personal Story</p>
      <blockquote className="mt-5 max-w-3xl text-2xl leading-tight text-white sm:text-4xl">
        &ldquo;{shoe.story}&rdquo;
      </blockquote>
    </section>
  );
}
