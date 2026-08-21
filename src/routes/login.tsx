import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useSiteArt } from "@/lib/art-context";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { src } = useSiteArt();
  return (
    <main className="relative min-h-svh">
      <img
        src={src("hero", "/art/rahul-hero.jpg")}
        alt=""
        className="absolute inset-0 size-full object-cover object-left md:object-center"
      />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="relative mx-auto flex min-h-svh max-w-md flex-col justify-center px-5 py-28">
        <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
          studio
        </p>
        <h1 className="font-display mt-3 pr-2 text-4xl text-fg italic md:text-5xl">
          enter notquite
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Sign in to recast stills with your own images, and to keep a private
          copy of the notes you send. Guests may still collaborate unsigned.
        </p>

        <div className="mt-10 space-y-3">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => signIn(p.providerId, { callbackURL: "/studio" })}
                className="flex h-12 w-full items-center justify-center rounded-lg border border-border bg-surface/80 text-sm tracking-[0.14em] text-fg uppercase transition-[border-color,background-color,transform] duration-150 hover:border-fg/40 hover:bg-fg/5 active:scale-[0.96]"
              >
                Continue with {p.label}
              </button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>

        <Link
          to="/"
          className="mt-10 inline-flex h-11 items-center text-sm tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg"
        >
          Back to the reel
        </Link>
      </div>
    </main>
  );
}
