import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Project } from "@/lib/data/projects";
import { useSiteArt } from "@/lib/art-context";

export function StageOverlay({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { src } = useSiteArt();
  return (
    <Dialog.Root open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-bg/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto focus:outline-none md:inset-6 md:rounded-xl md:border md:border-border md:bg-surface">
          {project ? (
            <div className="grid min-h-full bg-bg md:min-h-0 md:grid-cols-2 md:bg-surface">
              <div className="relative min-h-[50svh] md:min-h-full">
                <img
                  src={src(project.slug, project.image)}
                  alt={project.title}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="relative flex flex-col justify-between px-6 py-10 md:px-12 md:py-14">
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.28em] text-muted uppercase">
                    {project.category === "UGC"
                      ? `UGC · Exclusive · ${project.year}`
                      : `${project.category} · ${project.year}`}
                  </p>
                  <Dialog.Title className="font-display mt-5 text-4xl leading-none text-fg italic md:text-5xl">
                    {project.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-6 max-w-md text-base leading-relaxed text-muted">
                    {project.synopsis}
                  </Dialog.Description>
                  <p className="font-display mt-8 max-w-sm text-xl text-fg/85 italic">
                    {project.line}
                  </p>
                </div>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex h-12 items-center rounded-lg bg-fg px-6 text-sm tracking-[0.14em] text-bg uppercase transition-[background-color,transform] duration-150 hover:bg-accent active:scale-[0.96]"
                  >
                    Direct this with me
                  </a>
                  <Dialog.Close className="inline-flex h-12 items-center text-sm tracking-[0.14em] text-muted uppercase transition-colors hover:text-fg">
                    Close scene
                  </Dialog.Close>
                </div>
                <Dialog.Close
                  className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-md text-fg/80 transition-colors hover:bg-fg/10 hover:text-fg"
                  aria-label="Close"
                >
                  <X className="size-5" />
                </Dialog.Close>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
