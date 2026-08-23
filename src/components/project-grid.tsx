import { useMemo, useState } from "react";
import { CATEGORIES, projects, type Category, type Project } from "@/lib/data/projects";
import { StageOverlay } from "@/components/stage-overlay";
import { useSiteArt } from "@/lib/art-context";
import { cn } from "@/lib/utils";

const spanClass: Record<Project["span"], string> = {
  wide: "md:col-span-8",
  tall: "md:col-span-4",
  mid: "md:col-span-6",
};

const aspectClass: Record<Project["span"], string> = {
  wide: "aspect-[16/10] md:aspect-[16/9]",
  tall: "aspect-[3/4]",
  mid: "aspect-[4/3]",
};

export function ProjectGrid() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<Project | null>(null);
  const { src } = useSiteArt();

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="work" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
              the reel
            </p>
            <h2 className="font-display mt-3 max-w-full pr-2 text-3xl text-fg italic md:text-6xl">
              not quite a gallery.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {projects.length} stills. Hover for the line behind the cut.
              Filter a room: cyberpunk, ocean, animal, poetic, or UGC luxury.
            </p>
          </div>
          <p className="font-mono text-[0.65rem] tracking-[0.22em] text-subtle uppercase">
            {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} scenes
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {(["All", ...CATEGORIES] as const).map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(cat)}
                className={cn(
                  "inline-flex h-10 items-center rounded-full border px-3.5 text-[0.65rem] tracking-[0.14em] uppercase transition-[background-color,border-color,color] duration-150",
                  selected
                    ? "border-fg bg-fg text-bg"
                    : "border-border text-muted hover:border-fg/35 hover:text-fg",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
          {visible.map((project, i) => (
            <article
              key={project.slug}
              className={cn("group relative", spanClass[project.span])}
            >
              <button
                type="button"
                onClick={() => setActive(project)}
                className={cn(
                  "relative block w-full overflow-hidden rounded-lg text-left",
                  aspectClass[project.span],
                )}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <img
                  src={src(project.slug, project.image)}
                  alt={project.title}
                  className="art-frame absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className="font-mono text-[0.62rem] tracking-[0.22em] text-accent uppercase">
                    {project.category === "UGC"
                      ? "UGC · Exclusive"
                      : project.category}
                  </p>
                  <h3 className="font-display mt-2 text-2xl leading-tight text-fg md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-fg/80 opacity-100 transition-[opacity,transform] duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {project.line}
                  </p>
                </div>
              </button>
            </article>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-sm text-muted">No scenes in this cut.</p>
        ) : null}
      </div>

      <StageOverlay project={active} onClose={() => setActive(null)} />
    </section>
  );
}
