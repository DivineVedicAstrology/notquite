import { useRef, useState } from "react";
import { toast } from "sonner";
import { resetArt, uploadArt } from "@/lib/art";
import { fileToStill } from "@/lib/read-image";
import { useSiteArt } from "@/lib/art-context";

export function StillControls({ slot }: { slot: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLocal, refresh, urls } = useSiteArt();
  const [busy, setBusy] = useState(false);
  const custom = Boolean(urls[slot]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    try {
      const still = await fileToStill(file);
      setLocal(slot, still.preview);
      await uploadArt({
        data: { slot, mime: still.mime, data: still.data },
      });
      await refresh();
      toast.success("The still is recast.");
    } catch (err) {
      await refresh();
      toast.error(err instanceof Error ? err.message : "Could not recast this still.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function onReset() {
    setBusy(true);
    try {
      await resetArt({ data: slot });
      await refresh();
      toast.success("Original still restored.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not restore.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(e) => void onFile(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="inline-flex h-11 items-center rounded-md bg-fg px-4 text-[0.7rem] tracking-[0.16em] text-bg uppercase transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96] disabled:opacity-40"
      >
        {busy ? "Recasting…" : "Upload"}
      </button>
      {custom ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => void onReset()}
          className="inline-flex h-11 items-center rounded-md border border-border px-4 text-[0.7rem] tracking-[0.16em] text-muted uppercase transition-colors hover:text-fg disabled:opacity-40"
        >
          Restore
        </button>
      ) : null}
    </div>
  );
}

export function StillUpload({
  slot,
  label,
  fallback,
  aspect,
}: {
  slot: string;
  label: string;
  fallback: string;
  aspect: string;
}) {
  const { src, urls } = useSiteArt();
  const current = src(slot, fallback);

  return (
    <div className="space-y-3">
      <div
        className="relative overflow-hidden rounded-lg bg-elevated"
        style={{ aspectRatio: aspect }}
      >
        <img
          src={current}
          alt={label}
          className="art-frame absolute inset-0 size-full object-cover"
        />
      </div>
      <StillControls slot={slot} />
      {urls[slot] ? (
        <p className="font-mono text-[0.6rem] tracking-[0.14em] text-subtle uppercase">
          Custom still
        </p>
      ) : null}
    </div>
  );
}
