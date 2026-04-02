// Scent Identity Profiles
export interface ScentProfile {
  id: string;
  title: string;
  description: string;
  traits: string[];
  moodKeywords: string[];
  scentDirection: string;
  fragranceIds: string[];
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  scentFamily: string;
  keyNotes: string[];
  intensity: number; // 1-5
  bestMoment: string;
  description: string;
  wardrobeCategory: string;
  color: string; // for visual accent
}

export interface OnboardingAnswers {
  mood: string;
  style: string;
  occasion: string;
  presence: string;
  intensity: string;
  familiarity: string;
}

export const onboardingSteps = [
  {
    key: "mood" as const,
    title: "What mood do you want to carry?",
    subtitle: "Select the energy that feels most like you",
    options: [
      { value: "calm", label: "Calm", description: "Serene & grounded" },
      { value: "magnetic", label: "Magnetic", description: "Irresistibly present" },
      { value: "fresh", label: "Fresh", description: "Light & alive" },
      { value: "bold", label: "Bold", description: "Unapologetically powerful" },
      { value: "sophisticated", label: "Sophisticated", description: "Refined & knowing" },
      { value: "comforting", label: "Comforting", description: "Warm & embracing" },
    ],
  },
  {
    key: "style" as const,
    title: "How would you describe your presence?",
    subtitle: "Your style speaks before you do",
    options: [
      { value: "quiet-luxury", label: "Quiet Luxury", description: "Understated excellence" },
      { value: "clean-minimalist", label: "Clean Minimalist", description: "Pure & intentional" },
      { value: "night-energy", label: "Night Energy", description: "After-dark magnetism" },
      { value: "soft-elegance", label: "Soft Elegance", description: "Graceful warmth" },
      { value: "statement-maker", label: "Statement Maker", description: "Impossible to ignore" },
      { value: "timeless-classic", label: "Timeless Classic", description: "Eternally chic" },
    ],
  },
  {
    key: "occasion" as const,
    title: "When will you wear your signature?",
    subtitle: "Every moment deserves its own scent story",
    options: [
      { value: "everyday", label: "Everyday", description: "Your daily companion" },
      { value: "work", label: "Work", description: "Professional & polished" },
      { value: "evening", label: "Evening", description: "When the lights dim" },
      { value: "date-night", label: "Date Night", description: "Intimate & alluring" },
      { value: "special-event", label: "Special Event", description: "Unforgettable moments" },
      { value: "weekend", label: "Weekend Escape", description: "Free & unhurried" },
    ],
  },
  {
    key: "presence" as const,
    title: "What impression do you want to leave?",
    subtitle: "The trace of you that lingers",
    options: [
      { value: "understated", label: "Understated", description: "Subtle & close" },
      { value: "memorable", label: "Memorable", description: "Long after you leave" },
      { value: "warm", label: "Warm", description: "Inviting & gentle" },
      { value: "seductive", label: "Seductive", description: "Draw them closer" },
      { value: "polished", label: "Polished", description: "Impeccably presented" },
      { value: "confident", label: "Confident", description: "Sure & anchored" },
    ],
  },
  {
    key: "intensity" as const,
    title: "How should your scent speak?",
    subtitle: "From whisper to declaration",
    options: [
      { value: "soft", label: "Soft Skin Scent", description: "Only when they lean in" },
      { value: "balanced", label: "Balanced", description: "Present but not imposing" },
      { value: "strong", label: "Strong & Lasting", description: "Announce your arrival" },
    ],
  },
  {
    key: "familiarity" as const,
    title: "Where are you in your fragrance journey?",
    subtitle: "There are no wrong answers",
    options: [
      { value: "beginner", label: "Beginner", description: "Just starting to explore" },
      { value: "curious", label: "Curious Explorer", description: "Eager to discover more" },
      { value: "enthusiast", label: "Fragrance Enthusiast", description: "You know what you love" },
    ],
  },
];

export const scentProfiles: ScentProfile[] = [
  {
    id: "quiet-gold",
    title: "Quiet Gold",
    description: "You don't need to be loud to be unforgettable. Your presence is a warm, gilded whisper that lingers long after you've left the room. Refined, intentional, effortlessly magnetic.",
    traits: ["Understated", "Refined", "Warm", "Intentional"],
    moodKeywords: ["calm confidence", "quiet luxury", "golden warmth"],
    scentDirection: "Warm woods with soft amber and a touch of creamy vanilla. Think cashmere on skin.",
    fragranceIds: ["noir-absolu", "velvet-oud", "amber-ritual"],
  },
  {
    id: "midnight-presence",
    title: "Midnight Presence",
    description: "You come alive when the world quiets down. There's a magnetic intensity to your energy — dark, alluring, impossible to look away from. You are the night itself.",
    traits: ["Magnetic", "Intense", "Mysterious", "Powerful"],
    moodKeywords: ["dark allure", "midnight magnetism", "deep intensity"],
    scentDirection: "Rich oud, smoky incense, dark florals with a leather edge. Enigmatic and enveloping.",
    fragranceIds: ["obsidian-noir", "smoke-ritual", "dark-bloom"],
  },
  {
    id: "soft-power",
    title: "Soft Power",
    description: "Strength doesn't need armor. Your power lies in grace, in the gentle certainty of someone who knows exactly who they are. Elegant, composed, undeniably present.",
    traits: ["Graceful", "Composed", "Elegant", "Certain"],
    moodKeywords: ["gentle strength", "poised elegance", "soft authority"],
    scentDirection: "Iris, soft suede, white musk with a whisper of cedar. Clean power.",
    fragranceIds: ["iris-voile", "suede-lumiere", "blanc-absolu"],
  },
  {
    id: "velvet-heat",
    title: "Velvet Heat",
    description: "There's a warmth that radiates from you — not aggressive, but impossible to ignore. Like sunlit amber on warm skin, you draw people in with sensual ease.",
    traits: ["Sensual", "Warm", "Inviting", "Bold"],
    moodKeywords: ["amber warmth", "sensual radiance", "velvet touch"],
    scentDirection: "Amber, tonka bean, saffron, warm sandalwood. Rich and intimate.",
    fragranceIds: ["amber-ritual", "santal-dore", "noir-absolu"],
  },
  {
    id: "clean-aura",
    title: "Clean Aura",
    description: "You are the first breath of morning air — clear, bright, and renewing. There's an effortless freshness to everything you touch. Pure intention made tangible.",
    traits: ["Fresh", "Pure", "Effortless", "Light"],
    moodKeywords: ["morning clarity", "pure freshness", "clean energy"],
    scentDirection: "Bergamot, white tea, clean musk, driftwood. A breath of clarity.",
    fragranceIds: ["blanc-absolu", "cedre-frais", "iris-voile"],
  },
  {
    id: "magnetic-minimalist",
    title: "Magnetic Minimalist",
    description: "Less is more, but your less is devastating. Every choice is deliberate, every detail earned. You are proof that restraint is the ultimate statement.",
    traits: ["Deliberate", "Minimal", "Sharp", "Modern"],
    moodKeywords: ["precise minimalism", "sharp elegance", "modern edge"],
    scentDirection: "Vetiver, black pepper, dry cedar, mineral accord. Architecturally beautiful.",
    fragranceIds: ["cedre-frais", "smoke-ritual", "suede-lumiere"],
  },
];

export const fragrances: Fragrance[] = [
  {
    id: "noir-absolu",
    name: "Noir Absolu",
    brand: "Maison Lumière",
    scentFamily: "Oriental Woody",
    keyNotes: ["Black Amber", "Oud", "Vanilla Absolute", "Smoked Cedar"],
    intensity: 4,
    bestMoment: "Evening & Special Occasions",
    description: "A deep, enveloping fragrance that wraps you in warmth and mystery. For the moments that matter most.",
    wardrobeCategory: "evening",
    color: "36 60% 50%",
  },
  {
    id: "velvet-oud",
    name: "Velvet Oud",
    brand: "Atelier Doré",
    scentFamily: "Woody Oriental",
    keyNotes: ["Rose Oud", "Velvet Musk", "Saffron", "Sandalwood"],
    intensity: 4,
    bestMoment: "Date Night & Evening",
    description: "Opulent yet intimate, like a secret shared in candlelight. Richly layered, deeply personal.",
    wardrobeCategory: "evening",
    color: "15 40% 45%",
  },
  {
    id: "amber-ritual",
    name: "Amber Ritual",
    brand: "Maison Lumière",
    scentFamily: "Amber",
    keyNotes: ["Liquid Amber", "Tonka", "Benzoin", "Warm Skin Musk"],
    intensity: 3,
    bestMoment: "Everyday Luxury & Work",
    description: "Your daily ritual of warmth. A scent that feels like coming home to yourself.",
    wardrobeCategory: "everyday",
    color: "36 80% 60%",
  },
  {
    id: "obsidian-noir",
    name: "Obsidian Noir",
    brand: "Noctis",
    scentFamily: "Leather Smoky",
    keyNotes: ["Black Leather", "Incense", "Dark Plum", "Birch Tar"],
    intensity: 5,
    bestMoment: "Night Out & Statement Moments",
    description: "Unapologetically bold. A fragrance that enters the room before you do and stays after you leave.",
    wardrobeCategory: "evening",
    color: "0 0% 20%",
  },
  {
    id: "smoke-ritual",
    name: "Smoke & Ritual",
    brand: "Noctis",
    scentFamily: "Aromatic Smoky",
    keyNotes: ["Palo Santo", "Smoked Tea", "Labdanum", "Dry Vetiver"],
    intensity: 3,
    bestMoment: "Creative Work & Contemplation",
    description: "For the thinkers, the creators, the ones who find peace in complexity.",
    wardrobeCategory: "work",
    color: "0 0% 30%",
  },
  {
    id: "dark-bloom",
    name: "Dark Bloom",
    brand: "Atelier Doré",
    scentFamily: "Floral Dark",
    keyNotes: ["Black Rose", "Oud", "Dark Honey", "Patchouli"],
    intensity: 4,
    bestMoment: "Evening & Intimate Gatherings",
    description: "Beauty with depth. A dark floral that reveals new layers with every hour.",
    wardrobeCategory: "evening",
    color: "340 30% 35%",
  },
  {
    id: "iris-voile",
    name: "Iris Voile",
    brand: "Maison Lumière",
    scentFamily: "Powdery Floral",
    keyNotes: ["Iris Butter", "White Suede", "Violet Leaf", "Soft Musk"],
    intensity: 2,
    bestMoment: "Work & Everyday Elegance",
    description: "Quiet sophistication in liquid form. A scent that whispers confidence.",
    wardrobeCategory: "work",
    color: "260 20% 60%",
  },
  {
    id: "suede-lumiere",
    name: "Suède Lumière",
    brand: "Atelier Doré",
    scentFamily: "Leather Soft",
    keyNotes: ["White Suede", "Orris", "Blonde Wood", "Ambrette"],
    intensity: 2,
    bestMoment: "Everyday & Professional Settings",
    description: "The feel of soft leather in sunlight. Polished without trying too hard.",
    wardrobeCategory: "everyday",
    color: "30 25% 55%",
  },
  {
    id: "blanc-absolu",
    name: "Blanc Absolu",
    brand: "Maison Lumière",
    scentFamily: "Clean Musk",
    keyNotes: ["White Musk", "Bergamot", "Cashmeran", "Driftwood"],
    intensity: 2,
    bestMoment: "Morning & Fresh Starts",
    description: "A clean slate, a fresh chapter. Pure intention made into scent.",
    wardrobeCategory: "everyday",
    color: "42 20% 80%",
  },
  {
    id: "cedre-frais",
    name: "Cèdre Frais",
    brand: "Noctis",
    scentFamily: "Woody Aromatic",
    keyNotes: ["Atlas Cedar", "Grapefruit", "Vetiver", "Green Cardamom"],
    intensity: 3,
    bestMoment: "Work & Weekend",
    description: "Architectural freshness. Sharp, clean lines in a world of noise.",
    wardrobeCategory: "work",
    color: "150 15% 40%",
  },
  {
    id: "santal-dore",
    name: "Santal Doré",
    brand: "Atelier Doré",
    scentFamily: "Woody Creamy",
    keyNotes: ["Sandalwood", "Golden Milk", "Cardamom", "Vanilla"],
    intensity: 3,
    bestMoment: "Comfort & Personal Moments",
    description: "Liquid comfort. A fragrance that feels like a warm embrace on bare skin.",
    wardrobeCategory: "comfort",
    color: "36 50% 55%",
  },
  {
    id: "terra-calida",
    name: "Terra Cálida",
    brand: "Noctis",
    scentFamily: "Earthy Warm",
    keyNotes: ["Terracotta Accord", "Fig Leaf", "Dry Earth", "Warm Spice"],
    intensity: 3,
    bestMoment: "Weekend & Travel",
    description: "Sun-baked earth and warm wind. For the wanderer with roots.",
    wardrobeCategory: "comfort",
    color: "15 45% 50%",
  },
];

// Profile matching logic
export function matchProfile(answers: OnboardingAnswers): ScentProfile {
  const scoring: Record<string, number> = {};
  scentProfiles.forEach((p) => (scoring[p.id] = 0));

  // Mood mapping
  const moodMap: Record<string, string[]> = {
    calm: ["quiet-gold", "soft-power", "clean-aura"],
    magnetic: ["midnight-presence", "velvet-heat", "magnetic-minimalist"],
    fresh: ["clean-aura", "soft-power", "magnetic-minimalist"],
    bold: ["midnight-presence", "velvet-heat"],
    sophisticated: ["quiet-gold", "soft-power", "magnetic-minimalist"],
    comforting: ["quiet-gold", "velvet-heat", "clean-aura"],
  };

  const styleMap: Record<string, string[]> = {
    "quiet-luxury": ["quiet-gold", "soft-power"],
    "clean-minimalist": ["clean-aura", "magnetic-minimalist"],
    "night-energy": ["midnight-presence", "velvet-heat"],
    "soft-elegance": ["soft-power", "quiet-gold"],
    "statement-maker": ["midnight-presence", "velvet-heat"],
    "timeless-classic": ["quiet-gold", "magnetic-minimalist"],
  };

  const presenceMap: Record<string, string[]> = {
    understated: ["quiet-gold", "clean-aura", "soft-power"],
    memorable: ["midnight-presence", "velvet-heat"],
    warm: ["quiet-gold", "velvet-heat"],
    seductive: ["midnight-presence", "velvet-heat"],
    polished: ["soft-power", "magnetic-minimalist"],
    confident: ["magnetic-minimalist", "midnight-presence"],
  };

  [moodMap[answers.mood], styleMap[answers.style], presenceMap[answers.presence]].forEach((ids) => {
    ids?.forEach((id, i) => {
      scoring[id] = (scoring[id] || 0) + (3 - i);
    });
  });

  const best = Object.entries(scoring).sort((a, b) => b[1] - a[1])[0][0];
  return scentProfiles.find((p) => p.id === best) || scentProfiles[0];
}

export function getProfileFragrances(profile: ScentProfile): Fragrance[] {
  return profile.fragranceIds.map((id) => fragrances.find((f) => f.id === id)!).filter(Boolean);
}

// Wardrobe rules
export function buildWardrobe(signatureId: string, profile: ScentProfile): Record<string, Fragrance | null> {
  const signature = fragrances.find((f) => f.id === signatureId)!;
  const all = fragrances.filter((f) => f.id !== signatureId);

  return {
    signature,
    everyday: all.find((f) => f.wardrobeCategory === "everyday") || null,
    work: all.find((f) => f.wardrobeCategory === "work") || null,
    evening: all.find((f) => f.wardrobeCategory === "evening") || null,
    comfort: all.find((f) => f.wardrobeCategory === "comfort") || null,
  };
}
