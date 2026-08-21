import { Link, useRouterState } from "@tanstack/react-router";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot({ compact = false }: { compact?: boolean }) {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (isPending) {
    return (
      <div
        className="size-8 animate-pulse rounded-full bg-fg/10"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    if (pathname === "/login") return null;
    return (
      <Link
        to="/login"
        className="inline-flex h-11 items-center text-sm tracking-[0.12em] text-fg/80 uppercase transition-colors duration-150 hover:text-fg"
      >
        Sign in
      </Link>
    );
  }

  const label = user.displayName ?? user.primaryEmail ?? "Studio";

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/studio"
        className="inline-flex h-11 items-center text-sm tracking-[0.12em] text-fg/80 uppercase transition-colors duration-150 hover:text-fg"
      >
        Studio
      </Link>
      {!compact && user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt=""
          className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-fg/15"
        />
      ) : null}
      <button
        type="button"
        onClick={() => void signOut()}
        className="inline-flex h-11 items-center text-sm tracking-[0.12em] text-muted uppercase transition-colors duration-150 hover:text-fg"
        aria-label={`Sign out ${label}`}
      >
        Sign out
      </button>
    </div>
  );
}
