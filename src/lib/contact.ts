import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Need a real email").max(120),
  studio: z.string().trim().max(80).optional(),
  message: z.string().trim().min(12, "Tell me a little more").max(2000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  studio: string | null;
  message: string;
  created_at: string;
};

export const submitInquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    const sql = await getSql();
    let userId: string | null = null;
    try {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      const user = await getSessionUser();
      userId = user?.id ?? null;
    } catch {
      userId = null;
    }

    const rows = await sql<{ id: number }>`
      insert into inquiries (user_id, name, email, studio, message)
      values (
        ${userId},
        ${data.name},
        ${data.email},
        ${data.studio && data.studio.length > 0 ? data.studio : null},
        ${data.message}
      )
      returning id
    `;

    return { ok: true as const, id: rows[0]?.id ?? 0 };
  });

export const listMyInquiries = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<Inquiry>`
      select id, name, email, studio, message, created_at
      from inquiries
      where user_id = ${context.userId}
      order by created_at desc
    `;
  });
