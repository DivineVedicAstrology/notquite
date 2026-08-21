import { useSiteArt } from "@/lib/art-context";

export function AboutSection() {
  const { src } = useSiteArt();

  return (
    <section id="about" className="scroll-mt-24 border-t border-border px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={src("portrait", "/art/rahul-portrait.jpg")}
              alt="Rahul Sharma, notquite"
              className="art-frame aspect-[2/3] w-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/80 to-transparent px-5 py-4">
              <p className="font-mono text-[0.62rem] tracking-[0.22em] text-accent uppercase">
                Rahul Sharma
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
            the maker
          </p>
          <h2 className="font-display mt-3 max-w-full pr-2 text-3xl text-fg italic md:text-6xl">
            not quite a bio.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Rahul Sharma works as notquite. The name is the brief: images
              that are not quite photographs, not quite paintings, not quite
              reality, and somehow more itself because of that.
            </p>
            <p>
              Cinematic surrealism. Glitch. Quiet luxury. Hyper-visual loops
              and prompt worlds. You hide. You fracture. You reveal. Every
              frame is a scene the edit almost cut.
            </p>
            <p>
              For founders: exclusive luxury UGC. Eleven seconds. No crew. No
              flights. A ritual a product could inhabit: a serum under
              water, a tumbler in morning light, a villa that never needed a
              booking. The film does not sell. It seduces.
            </p>
          </div>
          <blockquote className="font-display mt-10 max-w-xl border-l border-accent/50 pl-5 text-2xl leading-snug text-fg italic md:text-3xl">
            real enough to believe.
          </blockquote>
          <p className="mt-6 text-sm tracking-[0.16em] text-subtle uppercase">
            Mohali · @RahulAiArt · notquite
          </p>
        </div>
      </div>
    </section>
  );
}
