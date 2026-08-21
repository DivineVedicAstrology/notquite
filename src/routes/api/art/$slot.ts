import { createFileRoute } from "@tanstack/react-router";
import { isArtSlot, readStoredArt } from "@/lib/art";

export const Route = createFileRoute("/api/art/$slot")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const slot = params.slot;
          if (!slot || !isArtSlot(slot)) {
            return new Response("Not found", { status: 404 });
          }
          const row = await readStoredArt(slot);
          if (!row) return new Response("Not found", { status: 404 });
          const binary = Uint8Array.from(Buffer.from(row.data, "base64"));
          return new Response(binary, {
            headers: {
              "Content-Type": row.mime,
              "Cache-Control": "public, max-age=60",
            },
          });
        } catch (err) {
          console.error("[art] GET failed", err);
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
