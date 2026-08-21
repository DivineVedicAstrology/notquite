import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AuthSlot } from "@/components/auth-slot";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#work", label: "Reel" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Craft" },
  { href: "/#contact", label: "Collaborate" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border/80 bg-bg/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
          <Link
            to="/"
            className="font-display text-[1.7rem] leading-none text-fg italic"
          >
            notquite
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.7rem] tracking-[0.2em] text-muted uppercase transition-colors duration-150 hover:text-fg"
              >
                {link.label}
              </a>
            ))}
            <AuthSlot />
          </nav>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
          className={cn(
          "fixed inset-0 z-30 bg-bg/95 pt-24 backdrop-blur-md transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none invisible opacity-0",
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-2 px-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display py-3 text-4xl text-fg italic"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8">
            <AuthSlot />
          </div>
        </nav>
      </div>
    </>
  );
}
