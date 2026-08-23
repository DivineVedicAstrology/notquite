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
  {
    slug: "breaking-of-quiet",
    title: "The Breaking of Quiet",
    category: "Surrealism",
    year: "2026",
    span: "tall",
    image: "/art/quiet.jpg",
    line: "Silence does not shatter. It hangs, glass in moonlight, waiting to be named.",
    synopsis:
      "A still lake that refuses to stay still. The break is beautiful because it was never loud. It was inevitable.",
  },
  {
    slug: "hide-fracture-reveal",
    title: "Hide. Fracture. Reveal.",
    category: "Glitch",
    year: "2026",
    span: "tall",
    image: "/art/mask.jpg",
    line: "You hide. You fracture. You reveal. Identity as a sequence of cuts.",
    synopsis:
      "A porcelain mask splitting on cue. Light leaks from the wound like a secret the edit was always going to tell.",
  },
  {
    slug: "beauty-in-ache",
    title: "Beauty in Ache",
    category: "Psychedelic",
    year: "2026",
    span: "mid",
    image: "/art/ache.jpg",
    line: "The wound as wardrobe. Fabric that remembers every leaving.",
    synopsis:
      "Silk dissolving into petals and smoke. Psychedelia, held at a whisper. The ache is the costume; the costume is the scene.",
  },
  {
    slug: "paris-quiet-luxury",
    title: "Paris, Quiet Luxury",
    category: "UGC",
    year: "2026",
    span: "wide",
    image: "/art/paris.jpg",
    line: "Eleven seconds. No crew. No flights. A ritual a product could inhabit.",
    synopsis:
      "Not an ad. A life. Three words, three frames, three hours. A film that does not sell. It seduces. Founders: imagine your brand living like this.",
  },
  {
    slug: "strings-burn",
    title: "Strings Burn, Sand Screams",
    category: "Glitch",
    year: "2026",
    span: "wide",
    image: "/art/strings.jpg",
    line: "A live-action fever dream the moon is watching. Strings burn. Sand screams.",
    synopsis:
      "Granny Chiyo versus Sasori, recast as cinema. Puppetry as glitch, desert as stage, the moon as the only critic that matters.",
  },
  {
    slug: "keep-looking-up",
    title: "Keep Looking Up",
    category: "UGC",
    year: "2026",
    span: "tall",
    image: "/art/looking-up.jpg",
    line: "Aviation and photography as twin acts of faith. Capture the magic.",
    synopsis:
      "A white horse, a rooftop, a sky full of machines. Keep looking up. Keep capturing the magic. Faith, framed.",
  },
  {
    slug: "dragons-day",
    title: "Dragon's Day",
    category: "Psychedelic",
    year: "2026",
    span: "mid",
    image: "/art/dragon.jpg",
    line: "Scale and fire, rendered as blessing rather than threat.",
    synopsis:
      "A lantern-born dragon coiled around a sleeping city. Psychedelic myth, editorial restraint. The blessing is the burn.",
  },
  {
    slug: "void-os",
    title: "VOID OS",
    category: "Glitch",
    year: "2026",
    span: "wide",
    image: "/art/void.jpg",
    line: "An operating system you can walk through. Chrome windows hanging in a black room.",
    synopsis:
      "Cinematic surrealism made spatial. A program with walls. VOID OS visuals for brands that want the machine to feel like a set.",
  },
  {
    slug: "celestial-script",
    title: "The Script You're Rewriting",
    category: "Surrealism",
    year: "2026",
    span: "tall",
    image: "/art/observatory.jpg",
    line: "A director's chair facing the cosmos. Celestial storyteller, notes open.",
    synopsis:
      "Not a biography. A rewrite. Masks, programs, and paradoxes. The chair is empty because the director is already in the shot.",
  },
  {
    slug: "blue-reset",
    title: "Blue Reset",
    category: "UGC",
    year: "2026",
    span: "tall",
    image: "/art/blue-reset.jpg",
    line: "Calming, made spatial. A serum becomes a world beneath the surface.",
    synopsis:
      "A speculative 10-second beauty film. Cerulean water, one drop, no crew. The product does not pose. It inhabits a climate.",
  },
  {
    slug: "tumbler-ritual",
    title: "The Tumbler Ritual",
    category: "UGC",
    year: "2026",
    span: "wide",
    image: "/art/tumbler.jpg",
    line: "Your tumbler. Morning light. Not filmed. Not staged. Inhabited.",
    synopsis:
      "Founder-grade UGC: a ceramic cup, linen, citrus, steam. We swap in your vessel and the room still feels like a life.",
  },
  {
    slug: "rai-face-mask",
    title: "RAi Face Mask",
    category: "UGC",
    year: "2026",
    span: "tall",
    image: "/art/rai-mask.jpg",
    line: "It blooms when you touch it. It leaves light on the skin.",
    synopsis:
      "Luxury skincare as artifact, not advert. Dew, marble, a mask that almost breathes. Scan for proof, or just believe the still.",
  },
  {
    slug: "villa-light",
    title: "Villa Light",
    category: "UGC",
    year: "2026",
    span: "wide",
    image: "/art/villa.jpg",
    line: "Linen, lemon, late afternoon. A product could live here without raising its voice.",
    synopsis:
      "Quiet-luxury architecture as a set. No villa rental. No flight. Three hours and a terrace that already knows your brand.",
  },
  {
    slug: "after-hours",
    title: "After Hours",
    category: "UGC",
    year: "2026",
    span: "mid",
    image: "/art/after-hours.jpg",
    line: "Rain on black lacquer. Brass catching the awning. Luxury that winks, never shouts.",
    synopsis:
      "An evening a fragrance, a watch, a key could occupy. Wet cobble, one gold handle, the cut before anyone speaks.",
  },
  {
    slug: "neon-that-remembers",
    title: "Neon That Remembers",
    category: "Cyberpunk",
    year: "2026",
    span: "wide",
    image: "/art/neon-rain.jpg",
    line: "Rain writes the city twice. Once on the sign. Once on the street.",
    synopsis:
      "A crimson alley, steam from the grate, a coat that knows the hour. Cyberpunk as hush, not noise. The night is the set.",
  },
  {
    slug: "the-voxel-nave",
    title: "The Voxel Nave",
    category: "Pixel",
    year: "2026",
    span: "tall",
    image: "/art/voxel-nave.jpg",
    line: "Worship, built one cube at a time. Candlelight with edges.",
    synopsis:
      "A cathedral assembled from gold voxels in a black studio. Pixel craft as relic. The sacred, rendered discrete.",
  },
  {
    slug: "a-comma-on-water",
    title: "A Comma on Water",
    category: "Oceanscape",
    year: "2026",
    span: "wide",
    image: "/art/comma-on-water.jpg",
    line: "The sea is a sentence. The boat is the pause.",
    synopsis:
      "Blue hour, one pale hull, a path of moon. Gallery quiet. Nothing happens, and that is the event.",
  },
  {
    slug: "gold-dust-dress",
    title: "Gold Dust Dress",
    category: "Ethereal",
    year: "2026",
    span: "tall",
    image: "/art/gold-dust.jpg",
    line: "She is leaving the body the way light leaves a room.",
    synopsis:
      "Marble, fog, a figure dissolving into gold. Ethereal not as filter, as physics. The hush is the costume.",
  },
  {
    slug: "the-last-station",
    title: "The Last Station",
    category: "Futuristic",
    year: "2026",
    span: "mid",
    image: "/art/last-station.jpg",
    line: "A red train waiting in a white shell. Dawn with no passengers.",
    synopsis:
      "Maglev architecture as tenderness. Sterile, then suddenly human. The future, held before the doors open.",
  },
  {
    slug: "stairs-that-fold",
    title: "Stairs That Fold",
    category: "Illusion",
    year: "2026",
    span: "tall",
    image: "/art/stairs-fold.jpg",
    line: "Up and down are the same instruction, if you trust the stone.",
    synopsis:
      "An impossible stairwell, one figure, museum light. Optical illusion as choreography. The eye is the editor.",
  },
  {
    slug: "two-lives-one-cut",
    title: "Two Lives, One Cut",
    category: "Double Exposure",
    year: "2026",
    span: "mid",
    image: "/art/two-lives.jpg",
    line: "A forest growing through a face. Winter as a second biography.",
    synopsis:
      "Analog composite, silver and bone. Double exposure as confession. Two lives occupying one frame until neither blinks.",
  },
  {
    slug: "night-circuit",
    title: "Night Circuit",
    category: "Asphalt",
    year: "2026",
    span: "wide",
    image: "/art/night-circuit.jpg",
    line: "Rain on the hood. Light that refuses to sit still.",
    synopsis:
      "A black car, a wet mountain road, trails of amber. Asphalt as cinema. Speed, held in a still.",
  },
  {
    slug: "palace-tiger",
    title: "Palace Tiger",
    category: "Animals",
    year: "2026",
    span: "tall",
    image: "/art/palace-tiger.jpg",
    line: "Royalty that does not need a throne. Silk is enough.",
    synopsis:
      "A white tiger in a ruined palace of moonlight. Animal as myth, not mascot. The gaze is the whole script.",
  },
  {
    slug: "letter-to-rain",
    title: "Letter to Rain",
    category: "Poetic",
    year: "2026",
    span: "mid",
    image: "/art/letter-rain.jpg",
    line: "A page, a flower, a window. The weather reading over your shoulder.",
    synopsis:
      "Still life as a poem you do not have to finish. Ink that almost speaks. The rain is the only critic in the room.",
  },
  {
    slug: "when-the-signal-fails",
    title: "When the Signal Fails",
    category: "Glitch",
    year: "2026",
    span: "wide",
    image: "/art/signal-fails.jpg",
    line: "Marble that remembers being a file. Beauty, with the channels split.",
    synopsis:
      "A classical bust in RGB fracture. Glitch as restoration, not damage. The face stays, the signal does not.",
  },
  {
    slug: "koi-in-the-nave",
    title: "Koi in the Nave",
    category: "Surrealism",
    year: "2026",
    span: "tall",
    image: "/art/koi-nave.jpg",
    line: "A church that learned how to hold water. Gold, swimming the aisle.",
    synopsis:
      "Baroque light, a giant koi, dust as stained glass. Surrealism at museum volume. Faith, rewritten as weather.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
