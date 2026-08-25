export const CATEGORIES = [
  "Surrealism",
  "Glitch",
  "Psychedelic",
  "UGC",
  "Cyberpunk",
  "Pixel",
  "Oceanscape",
  "Ethereal",
  "Futuristic",
  "Illusion",
  "Double Exposure",
  "Asphalt",
  "Animals",
  "Poetic",
  "Editorial",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ProjectSpan = "wide" | "tall" | "mid";

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  span: ProjectSpan;
  image: string;
  line: string;
  synopsis: string;
};

export const projects: Project[] = [
  {
    slug: "brb-overthinking",
    title: "BRB: Overthinking",
    category: "Surrealism",
    year: "2026",
    span: "wide",
    image: "/art/brb.jpg",
    line: "The mind as a looping corridor. Every door is the same thought, dressed differently.",
    synopsis:
      "A hyper-visual loop about the rooms we keep walking back into. One door ajar. Bone-white light. Watch closely. It resolves.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getUgcProjects() {
  return projects.filter((p) => p.category === "UGC");
}
