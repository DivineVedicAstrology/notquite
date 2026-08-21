import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { projects } from "@/lib/data/projects";

export type ArtSlotMeta = {
  slot: string;
  label: string;
  fallback: string;
  aspect: string;
};

export const ART_SLOTS: ArtSlotMeta[] = [
  {
    slot: "portrait",
    label: "Portrait still",
    fallback: "/art/rahul-portrait.jpg",
    aspect: "2/3",
  },
  {
    slot: "hero",
    label: "Opening scene",
    fallback: "/art/rahul-hero.jpg",
    aspect: "16/9",
  },
  ...projects.map((p) => ({
    slot: p.slug,
    label: p.title,
    fallback: p.image,
    aspect: p.span === "tall" ? "3/4" : p.span === "mid" ? "4/3" : "16/9",
  })),
];

const ALLOWED = new Set(ART_SLOTS.map((s) => s.slot));

export function isArtSlot(slot: string): boolean {
  return ALLOWED.has(slot);
}

export type ArtMap = Record<string, string>;

function publicUrl(slot: string, updatedAt: string) {
  return `/api/art/${encodeURIComponent(slot)}?v=${encodeURIComponent(updatedAt)}`;
}

export const listArtUrls = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    const rows = await sql<{ slot: string; updated_at: string }>`
      select slot, updated_at from site_art
    `;
    const map: ArtMap = {};
    for (const row of rows) {
      if (!ALLOWED.has(row.slot)) continue;
      map[row.slot] = publicUrl(row.slot, String(row.updated_at));
    }
    return map;
  },
);

const uploadSchema = z.object({
  slot: z.string().min(1).max(80),
  mime: z.enum(["image/jpeg", "image/png", "image/webp"]),
  data: z.string().min(80).max(3_500_000),
});

export const uploadArt = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => uploadSchema.parse(data))
  .handler(async ({ context, data }) => {
    if (!ALLOWED.has(data.slot)) {
      throw new Error("Unknown still.");
    }
    const padding = data.data.length % 4 === 0 ? 0 : 4 - (data.data.length % 4);
    const bytes = Math.floor((data.data.length * 3) / 4) - padding;
    if (bytes > 2_500_000) {
      throw new Error("Image is too large. Use a still under 2 MB.");
    }

    const sql = await getSql();
    await sql`
      insert into site_art (slot, mime, data, user_id, updated_at)
      values (${data.slot}, ${data.mime}, ${data.data}, ${context.userId}, now())
      on conflict (slot) do update set
        mime = excluded.mime,
        data = excluded.data,
        user_id = excluded.user_id,
        updated_at = now()
    `;

    const rows = await sql<{ updated_at: string }>`
      select updated_at from site_art where slot = ${data.slot}
    `;
    return { ok: true as const, url: publicUrl(data.slot, String(rows[0]?.updated_at ?? Date.now())) };
  });

export const resetArt = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((slot: unknown) => {
    const value = z.string().parse(slot);
    if (!ALLOWED.has(value)) throw new Error("Unknown still.");
    return value;
  })
  .handler(async ({ data: slot }) => {
    const sql = await getSql();
    await sql`delete from site_art where slot = ${slot}`;
    return { ok: true as const };
  });

export type StoredArt = { mime: string; data: string };

export async function readStoredArt(slot: string): Promise<StoredArt | null> {
  if (!ALLOWED.has(slot)) return null;
  const sql = await getSql();
  const rows = await sql<StoredArt>`
    select mime, data from site_art where slot = ${slot} limit 1
  `;
  return rows[0] ?? null;
}
