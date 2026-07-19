import Image from "next/image";

type GalleryStripProps = {
  images: string[];
};

export function GalleryStrip({ images }: GalleryStripProps) {
  return (
    <section>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a8a8a8]">Gallery</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111]"
          >
            <Image
              src={image}
              alt={`Lifestyle sneaker frame ${index + 1}`}
              width={1200}
              height={1200}
              className="h-56 w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              unoptimized
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}
