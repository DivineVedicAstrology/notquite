import { ArrowDown } from "lucide-react";
import { useSiteArt } from "@/lib/art-context";

export function Hero() {
  const { src } = useSiteArt();

  return (
    <section className="relative min-h-svh overflow-hidden">
      <img
        src={src("hero", "/art/rahul-hero.jpg")}
        alt="Rahul Sharma in a dark gallery before a celestial painting"
        className="absolute inset-0 size-full object-cover object-left md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/40" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="rise-in font-mono text-[0.65rem] tracking-[0.32em] text-accent uppercase">
          not quite photographs
        </p>
        <div className="cue-line mt-5 h-px w-24 bg-accent/70" />
        <h1 className="rise-in rise-in-1 font-display mt-6 max-w-full text-hero leading-display tracking-tight text-fg italic">
          notquite
        </h1>
        <p className="rise-in rise-in-2 font-display mt-3 max-w-xl text-2xl text-fg/80 italic md:text-3xl">
          real enough to believe.
        </p>
        <p className="rise-in rise-in-3 mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Rahul Sharma. Images that sit between photograph and painting:
          cinematic, surreal, glitch. Not quite reality. Close enough to
          want.
        </p>
        <div className="rise-in rise-in-4 mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex h-12 items-center rounded-lg bg-fg px-6 text-sm tracking-[0.14em] text-bg uppercase transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96]"
          >
            Enter the reel
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-lg border border-border px-6 text-sm tracking-[0.14em] text-fg uppercase transition-[border-color,background-color,transform] duration-150 hover:border-fg/40 hover:bg-fg/5 active:scale-[0.96]"
          >
            Collaborate
          </a>
        </div>
        <a
          href="#work"
          className="rise-in rise-in-5 mt-14 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-muted uppercase transition-colors hover:text-fg"
        >
          <ArrowDown className="size-3.5" />
          Keep looking
        </a>
      </div>
    </section>
  );
}
