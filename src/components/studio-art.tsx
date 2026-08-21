import { ART_SLOTS } from "@/lib/art";
import { StillUpload } from "@/components/still-upload";

export function StudioArt() {
  return (
    <section className="mt-16 border-t border-border pt-16">
      <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
        Art direction
      </p>
      <h2 className="font-display mt-3 pr-2 text-3xl text-fg italic md:text-4xl">
        Recast the stills.
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        Recast the portrait still with your real face, or swap any frame in
        the reel. JPEG, PNG, or WebP. Large photos are resized automatically.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {ART_SLOTS.map((still) => (
          <article key={still.slot} className="rounded-xl border border-border bg-surface p-4">
            <p className="mb-3 font-mono text-[0.62rem] tracking-[0.18em] text-subtle uppercase">
              {still.label}
            </p>
            <StillUpload
              slot={still.slot}
              label={still.label}
              fallback={still.fallback}
              aspect={still.aspect}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
