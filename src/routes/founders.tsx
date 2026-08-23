import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useSiteArt } from "@/lib/art-context";
import { ProjectGrid } from "@/components/project-grid";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/founders")({
  component: FoundersPage,
  head: () => ({
    meta: [
      { title: "For founders · notquite" },
      {
        name: "description",
        content:
          "Exclusive luxury UGC. Eleven seconds. No crew. No flights. A ritual a product could inhabit.",
      },
    ],
  }),
});

function FoundersHero() {
  const { src } = useSiteArt();

  return (
    <section className="relative min-h-svh overflow-hidden">
      <img
        src={src("the-suit-that-stayed", "/art/ivory-suit.jpg")}
        alt="An ivory suit standing empty on a terrace at sunset"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-transparent to-bg/40" />

      <div className="relative mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="rise-in font-mono text-[0.65rem] tracking-[0.32em] text-accent uppercase">
          exclusive luxury ugc
        </p>
        <div className="cue-line mt-5 h-px w-24 bg-accent/70" />
        <h1 className="rise-in rise-in-1 font-display mt-6 max-w-full text-hero leading-display tracking-tight text-fg italic">
          for founders.
        </h1>
        <p className="rise-in rise-in-2 font-display mt-3 max-w-xl text-2xl text-fg/80 italic md:text-3xl">
          Eleven seconds. No crew. No flights.
        </p>
        <p className="rise-in rise-in-3 mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          A ritual a product could inhabit. Fashion. Fragrance. Jewelry. A
          serum, a tumbler, a villa, a suit that holds a sky. The film does
          not sell. It seduces.
        </p>
        <div className="rise-in rise-in-4 mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex h-12 items-center rounded-lg bg-fg px-6 text-sm tracking-[0.14em] text-bg uppercase transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96]"
          >
            See the book
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-lg border border-border px-6 text-sm tracking-[0.14em] text-fg uppercase transition-[border-color,background-color,transform] duration-150 hover:border-fg/40 hover:bg-fg/5 active:scale-[0.96]"
          >
            Brief a scene
          </a>
        </div>
        <a
          href="#work"
          className="rise-in rise-in-5 mt-14 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-muted uppercase transition-colors hover:text-fg"
        >
          <ArrowDown className="size-3.5" />
          The book
        </a>
      </div>
    </section>
  );
}

function FoundersMethod() {
  const items = [
    { n: "01", title: "Three words", note: "The brand, the climate, the cut. That is the brief." },
    { n: "02", title: "Three frames", note: "A still, a hover line, eleven seconds of reel." },
    { n: "03", title: "Three hours", note: "No crew. No flights. Your product walks into a world that already exists." },
  ];

  return (
    <section className="border-t border-border px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
          the method
        </p>
        <h2 className="font-display mt-3 max-w-2xl pr-2 text-3xl text-fg italic md:text-6xl">
          A film, not a slot.
        </h2>
        <ul className="mt-14 grid gap-10 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.n}>
              <p className="font-mono text-[0.7rem] tracking-[0.16em] text-subtle">{item.n}</p>
              <p className="font-display mt-3 text-2xl text-fg italic">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-16 max-w-xl text-sm leading-relaxed text-muted">
          Art direction lives on the main reel. This page is the founder book
          only.{" "}
          <Link to="/" className="text-fg underline-offset-4 hover:underline">
            See the gallery
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function FoundersPage() {
  return (
    <main>
      <FoundersHero />
      <ProjectGrid locked="UGC" />
      <FoundersMethod />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
