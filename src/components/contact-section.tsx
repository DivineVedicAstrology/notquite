import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { inquirySchema, submitInquiry, type InquiryInput } from "@/lib/contact";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  const user = useCurrentUser();
  const [sent, setSent] = useState(false);

  const form = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: user?.displayName ?? "",
      email: user?.primaryEmail ?? "",
      studio: "",
      message: "",
    },
  });

  async function onSubmit(values: InquiryInput) {
    try {
      await submitInquiry({ data: values });
      setSent(true);
      toast.success("The scene is noted.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not send.";
      toast.error(message);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
            the line
          </p>
          <h2 className="font-display mt-3 pr-2 text-3xl text-fg italic md:text-6xl">
            a line, not a pitch.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Brands, founders, fellow makers. Send three words and a product.
            You get an exclusive luxury test film. A ritual, not a deck.
          </p>
          <p className="mt-8 font-mono text-[0.65rem] tracking-[0.2em] text-subtle uppercase">
            Response within 48 hours
          </p>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="rounded-xl border border-border bg-surface px-8 py-14">
              <p className="font-mono text-[0.65rem] tracking-[0.28em] text-muted uppercase">
                Scene noted
              </p>
              <h3 className="font-display mt-4 text-4xl text-fg italic">
                Noted. Almost sent back already.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                Thank you. I will read it slowly, then all at once. Real
                enough to believe.
              </p>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 rounded-xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  error={form.formState.errors.name?.message}
                >
                  <Input
                    autoComplete="name"
                    placeholder="Your name"
                    {...form.register("name")}
                  />
                </Field>
                <Field
                  label="Email"
                  error={form.formState.errors.email?.message}
                >
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    {...form.register("email")}
                  />
                </Field>
              </div>
              <Field
                label="Studio / brand"
                error={form.formState.errors.studio?.message}
              >
                <Input placeholder="Optional" {...form.register("studio")} />
              </Field>
              <Field
                label="The scene"
                error={form.formState.errors.message?.message}
              >
                <Textarea
                  placeholder="Three words. A product. A feeling you want inhabited."
                  {...form.register("message")}
                />
              </Field>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending…" : "Send the scene"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-danger">{error}</p> : null}
    </div>
  );
}
