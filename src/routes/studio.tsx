import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { listMyInquiries, type Inquiry } from "@/lib/contact";
import { SiteFooter } from "@/components/site-footer";
import { StudioArt } from "@/components/studio-art";

export const Route = createFileRoute("/studio")({ component: Studio });

function Studio() {
  const { user, isPending } = useCurrentUserState();
  const [mounted, setMounted] = useState(false);
  const [notes, setNotes] = useState<Inquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    listMyInquiries()
      .then((rows) => {
        if (!cancelled) setNotes(rows);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not load notes.");
          setNotes([]);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!mounted || isPending) {
    return (
      <main className="flex min-h-svh items-center justify-center px-5">
        <div className="h-8 w-40 animate-pulse rounded-md bg-fg/10" />
      </main>
    );
  }

  if (!user) return <RedirectToSignIn />;

  return (
    <main>
      <section className="mx-auto max-w-4xl px-5 pt-28 pb-24 md:px-8 md:pt-36">
        <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
          Private reel
        </p>
        <h1 className="font-display mt-3 pr-2 text-4xl text-fg italic md:text-5xl">Studio notes</h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          Recast the portrait and the reel with your own images. Collaboration
          notes you send while signed in wait here as well.
        </p>

        {error ? <p className="mt-8 text-sm text-danger">{error}</p> : null}

        {notes === null ? (
          <div className="mt-12 space-y-4">
            <div className="h-28 animate-pulse rounded-lg bg-fg/5" />
            <div className="h-28 animate-pulse rounded-lg bg-fg/5" />
          </div>
        ) : notes.length === 0 ? (
          <div className="mt-12 rounded-xl border border-border bg-surface px-8 py-14">
            <h2 className="font-display text-3xl text-fg italic">No scenes yet.</h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Send a collaboration note from the reel. It will wait for you
              here.
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-8 inline-flex h-12 items-center rounded-lg bg-fg px-6 text-sm tracking-[0.14em] text-bg uppercase transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96]"
            >
              Open the line
            </Link>
          </div>
        ) : (
          <ul className="mt-12 space-y-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <p className="font-mono text-[0.62rem] tracking-[0.2em] text-subtle uppercase">
                  {formatDate(note.created_at)}
                  {note.studio ? ` · ${note.studio}` : ""}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg">{note.message}</p>
                <p className="mt-4 text-xs text-muted">
                  {note.name} · {note.email}
                </p>
              </li>
            ))}
          </ul>
        )}

        <StudioArt />
      </section>
      <SiteFooter />
    </main>
  );
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return format(d, "d MMM yyyy");
}
