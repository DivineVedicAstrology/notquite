import { projects } from "@/lib/data/projects";

export function SiteFooter() {
  const highlights = projects.filter((p) =>
    ["paris-quiet-luxury", "blue-reset", "villa-light", "after-hours"].includes(
      p.slug,
    ),
  );

  return (
    <footer className="border-t border-border px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl text-fg italic">notquite</p>
          <p className="font-display mt-3 text-xl text-muted italic">
            real enough to believe.
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-subtle">
            Rahul Sharma. Not quite photographs. Not quite paintings. Not
            quite reality.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] text-subtle uppercase">
            Reel
          </p>
          <ul className="mt-4 space-y-2">
            {highlights.map((p) => (
              <li key={p.slug}>
                <a
                  href="#work"
                  className="text-sm text-muted transition-colors hover:text-fg"
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="font-mono text-[0.62rem] tracking-[0.22em] text-subtle uppercase">
            Studio
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <a
                href="https://x.com/RahulAiArt"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                X / @RahulAiArt
              </a>
            </li>
            <li>
              <a href="/founders" className="text-sm text-muted transition-colors hover:text-fg">
                For founders
              </a>
            </li>
            <li>
              <a href="#contact" className="text-sm text-muted transition-colors hover:text-fg">
                Collaborate
              </a>
            </li>
            <li>
              <a href="/login" className="text-sm text-muted transition-colors hover:text-fg">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs tracking-[0.14em] text-subtle uppercase">
          not quite real
        </p>
        <p className="text-xs text-subtle">
          © {new Date().getFullYear()} notquite · Rahul Sharma
        </p>
      </div>
    </footer>
  );
}
