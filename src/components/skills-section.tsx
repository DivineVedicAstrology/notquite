const TECHNICAL = [
  { n: "01", title: "AI filmmaking", note: "Prompt worlds, Imagine, motion stills that already feel cut." },
  { n: "02", title: "Motion design", note: "Hyper-visual loops. The gif as a scene, not a sticker." },
  { n: "03", title: "Narrative direction", note: "Three words. Three frames. Three hours. A film, not a slot." },
  { n: "04", title: "Luxury UGC", note: "Exclusive quiet-luxury films in 24 hours. Product as ritual, never as shout." },
  { n: "05", title: "VOID OS visuals", note: "Glitch systems made spatial. Programs you can walk through." },
];

const ARCHETYPES = [
  { n: "01", title: "Surreal loops", note: "Corridors, moons, rooms that refuse to end." },
  { n: "02", title: "Fractured masks", note: "Identity as an edit. Light leaking from the cut." },
  { n: "03", title: "Cinematic storytelling", note: "Anamorphic hush. Stage light as a cue, not a glow." },
  { n: "04", title: "Celestial myth", note: "Dragons of lantern-light. Observatories aimed at the script." },
  { n: "05", title: "Quiet luxury ritual", note: "Paris at dawn. Rain on Haussmann glass. A life, inhabited." },
  { n: "06", title: "Gallery rooms", note: "Cyberpunk rain. Voxel cathedrals. Tigers in silk. Ocean as a pause." },
];

function SkillColumn({
  kicker,
  heading,
  items,
}: {
  kicker: string;
  heading: string;
  items: typeof TECHNICAL;
}) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
        {kicker}
      </p>
      <h3 className="font-display mt-3 text-3xl text-fg italic md:text-4xl">
        {heading}
      </h3>
      <ul className="mt-8 divide-y divide-border">
        {items.map((item) => (
          <li key={item.n} className="flex gap-5 py-5">
            <span className="font-mono w-8 shrink-0 text-[0.7rem] tracking-[0.16em] text-subtle">
              {item.n}
            </span>
            <div>
              <p className="text-sm tracking-[0.04em] text-fg">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[0.65rem] tracking-[0.32em] text-muted uppercase">
          the craft
        </p>
        <h2 className="font-display mt-3 max-w-2xl pr-2 text-3xl text-fg italic md:text-6xl">
          Fluency beside archetype.
        </h2>
        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SkillColumn
            kicker="Technical"
            heading="The instruments."
            items={TECHNICAL}
          />
          <SkillColumn
            kicker="Creative"
            heading="The roles I play."
            items={ARCHETYPES}
          />
        </div>
      </div>
    </section>
  );
}
