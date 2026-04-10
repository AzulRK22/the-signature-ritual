// Scent Identity Profiles
export interface ScentProfile {
  id: string;
  title: string;
  description: string;
  traits: string[];
  moodKeywords: string[];
  scentDirection: string;
  fragranceIds: string[];
  aura: AuraConfig;
  hypeReframe?: string;
}

export interface AuraConfig {
  primaryColor: string;
  secondaryColor: string;
  intensity: number;
  scales: {
    intimate: number; // 0-100, 0=intimate, 100=expressive
    calm: number; // 0-100, 0=calm, 100=magnetic
    soft: number; // 0-100, 0=soft, 100=intense
    day: number; // 0-100, 0=day, 100=night
  };
}

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  scentFamily: string;
  keyNotes: string[];
  intensity: number;
  bestMoment: string;
  description: string;
  wardrobeCategory: string;
  color: string;
  emotionalCharacter: string;
  concentration: string;
}

export interface OnboardingAnswers {
  mood: string;
  style: string;
  occasion: string;
  presence: string;
  intensity: string;
  familiarity: string;
}

export interface SkinFitAnswers {
  skinType: string;
  sensitivity: string;
  longevity: string;
  projection: string;
  climate: string;
  timeOfDay: string;
}

export interface FitInsight {
  label: string;
  description: string;
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
      { value: "strong", label: "Strong Projection", description: "Announce your arrival" },
    ],
  },
  {
    key: "familiarity" as const,
    title: "Where are you in your fragrance journey?",
    subtitle: "There are no wrong answers",
    options: [
      { value: "beginner", label: "Beginner", description: "Just starting to explore" },
      { value: "curious", label: "Curious Explorer", description: "Eager to discover more" },
      { value: "enthusiast", label: "Enthusiast", description: "You know what you love" },
    ],
  },
];

export const skinFitSteps = [
  {
    key: "skinType" as const,
    title: "Your skin type",
    options: [
      { value: "dry", label: "Dry", description: "Fragrance tends to fade faster" },
      { value: "normal", label: "Normal", description: "Balanced absorption" },
      { value: "oily", label: "Oily", description: "Scent lingers naturally" },
    ],
  },
  {
    key: "sensitivity" as const,
    title: "Skin sensitivity",
    options: [
      { value: "sensitive", label: "Sensitive", description: "Prefer gentle formulations" },
      { value: "normal", label: "Normal", description: "No particular concerns" },
    ],
  },
  {
    key: "longevity" as const,
    title: "Preferred longevity",
    options: [
      { value: "light", label: "A few hours", description: "Light & refreshing" },
      { value: "moderate", label: "Half day", description: "Morning to afternoon" },
      { value: "long", label: "All day", description: "From dawn to dusk" },
    ],
  },
  {
    key: "projection" as const,
    title: "Projection preference",
    options: [
      { value: "close", label: "Close to skin", description: "Personal & intimate" },
      { value: "moderate", label: "Moderate", description: "Noticeable presence" },
      { value: "strong", label: "Strong sillage", description: "Leave a trail" },
    ],
  },
  {
    key: "climate" as const,
    title: "Your usual climate",
    options: [
      { value: "warm", label: "Warm & humid", description: "Tropical or summer" },
      { value: "temperate", label: "Temperate", description: "Mild four seasons" },
      { value: "cool", label: "Cool & dry", description: "Autumn or winter" },
    ],
  },
  {
    key: "timeOfDay" as const,
    title: "Primary time of use",
    options: [
      { value: "day", label: "Daytime", description: "Morning to afternoon" },
      { value: "evening", label: "Evening", description: "Dusk and beyond" },
      { value: "both", label: "Both", description: "All moments matter" },
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
    aura: { primaryColor: "36 60% 50%", secondaryColor: "40 35% 40%", intensity: 0.6, scales: { intimate: 25, calm: 20, soft: 30, day: 35 } },
    hypeReframe: "Your interest in warm, luxurious scents isn't trend-following — it's an instinct for timeless elegance.",
  },
  {
    id: "midnight-presence",
    title: "Midnight Presence",
    description: "You come alive when the world quiets down. There's a magnetic intensity to your energy — dark, alluring, impossible to look away from. You are the night itself.",
    traits: ["Magnetic", "Intense", "Mysterious", "Powerful"],
    moodKeywords: ["dark allure", "midnight magnetism", "deep intensity"],
    scentDirection: "Rich oud, smoky incense, dark florals with a leather edge. Enigmatic and enveloping.",
    fragranceIds: ["obsidian-noir", "smoke-ritual", "dark-bloom"],
    aura: { primaryColor: "280 20% 30%", secondaryColor: "0 0% 15%", intensity: 0.9, scales: { intimate: 70, calm: 85, soft: 80, day: 90 } },
    hypeReframe: "What others call bold, you experience as authentic. Your attraction to intensity is about presence, not performance.",
  },
  {
    id: "soft-power",
    title: "Soft Power",
    description: "Strength doesn't need armor. Your power lies in grace, in the gentle certainty of someone who knows exactly who they are. Elegant, composed, undeniably present.",
    traits: ["Graceful", "Composed", "Elegant", "Certain"],
    moodKeywords: ["gentle strength", "poised elegance", "soft authority"],
    scentDirection: "Iris, soft suede, white musk with a whisper of cedar. Clean power.",
    fragranceIds: ["iris-voile", "suede-lumiere", "blanc-absolu"],
    aura: { primaryColor: "260 20% 60%", secondaryColor: "300 10% 50%", intensity: 0.5, scales: { intimate: 35, calm: 30, soft: 25, day: 40 } },
  },
  {
    id: "velvet-heat",
    title: "Velvet Heat",
    description: "There's a warmth that radiates from you — not aggressive, but impossible to ignore. Like sunlit amber on warm skin, you draw people in with sensual ease.",
    traits: ["Sensual", "Warm", "Inviting", "Bold"],
    moodKeywords: ["amber warmth", "sensual radiance", "velvet touch"],
    scentDirection: "Amber, tonka bean, saffron, warm sandalwood. Rich and intimate.",
    fragranceIds: ["amber-ritual", "santal-dore", "noir-absolu"],
    aura: { primaryColor: "15 40% 45%", secondaryColor: "36 80% 60%", intensity: 0.75, scales: { intimate: 55, calm: 50, soft: 60, day: 55 } },
    hypeReframe: "Your draw to warmth and sensuality is deeply personal — it's about connection, not conformity.",
  },
  {
    id: "clean-aura",
    title: "Clean Aura",
    description: "You are the first breath of morning air — clear, bright, and renewing. There's an effortless freshness to everything you touch. Pure intention made tangible.",
    traits: ["Fresh", "Pure", "Effortless", "Light"],
    moodKeywords: ["morning clarity", "pure freshness", "clean energy"],
    scentDirection: "Bergamot, white tea, clean musk, driftwood. A breath of clarity.",
    fragranceIds: ["blanc-absolu", "cedre-frais", "iris-voile"],
    aura: { primaryColor: "180 15% 55%", secondaryColor: "42 20% 80%", intensity: 0.4, scales: { intimate: 20, calm: 15, soft: 15, day: 20 } },
  },
  {
    id: "magnetic-minimalist",
    title: "Magnetic Minimalist",
    description: "Less is more, but your less is devastating. Every choice is deliberate, every detail earned. You are proof that restraint is the ultimate statement.",
    traits: ["Deliberate", "Minimal", "Sharp", "Modern"],
    moodKeywords: ["precise minimalism", "sharp elegance", "modern edge"],
    scentDirection: "Vetiver, black pepper, dry cedar, mineral accord. Architecturally beautiful.",
    fragranceIds: ["cedre-frais", "smoke-ritual", "suede-lumiere"],
    aura: { primaryColor: "150 15% 40%", secondaryColor: "0 0% 25%", intensity: 0.55, scales: { intimate: 45, calm: 55, soft: 45, day: 50 } },
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
    emotionalCharacter: "Mysterious depth meets golden warmth",
    concentration: "Eau de Parfum Intense",
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
    emotionalCharacter: "Intimate opulence with depth",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Warm embrace, daily confidence",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Raw power, unapologetic presence",
    concentration: "Extrait de Parfum",
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
    emotionalCharacter: "Contemplative depth, creative focus",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Layered beauty, evolving mystery",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Whispered sophistication",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Effortless polish, quiet luxury",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Clarity and new beginnings",
    concentration: "Eau de Toilette",
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
    emotionalCharacter: "Architectural precision, modern clarity",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Pure comfort, skin-like warmth",
    concentration: "Eau de Parfum",
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
    emotionalCharacter: "Grounded wanderlust, earthy warmth",
    concentration: "Eau de Parfum",
  },
];

// Profile matching logic
export function matchProfile(answers: OnboardingAnswers): ScentProfile {
  const scoring: Record<string, number> = {};
  scentProfiles.forEach((p) => (scoring[p.id] = 0));

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

// Confidence scoring
export function computeConfidenceScores(
  fragrance: Fragrance,
  profile: ScentProfile,
  skinFit?: Partial<SkinFitAnswers>
): { signature: number; everyday: number; evening: number } {
  let base = profile.fragranceIds.includes(fragrance.id) ? 85 : 70;

  // Intensity alignment
  const profileIntensity = profile.aura.intensity * 5;
  const diff = Math.abs(fragrance.intensity - profileIntensity);
  base += Math.max(0, 10 - diff * 3);

  // Skin fit bonuses
  if (skinFit) {
    if (skinFit.skinType === "oily" && fragrance.intensity >= 3) base += 3;
    if (skinFit.skinType === "dry" && fragrance.concentration === "Extrait de Parfum") base += 3;
    if (skinFit.sensitivity === "sensitive" && fragrance.intensity <= 2) base += 4;
    if (skinFit.longevity === "long" && fragrance.intensity >= 4) base += 3;
    if (skinFit.climate === "warm" && fragrance.intensity <= 3) base += 2;
    if (skinFit.climate === "cool" && fragrance.intensity >= 3) base += 2;
  }

  const signature = Math.min(98, Math.max(75, Math.round(base)));
  const everyday = Math.min(95, Math.max(65, Math.round(base - (fragrance.intensity > 3 ? 8 : 0))));
  const evening = Math.min(98, Math.max(70, Math.round(base + (fragrance.intensity >= 3 ? 5 : -5))));

  return { signature, everyday, evening };
}

export function getFitInsights(skinFit: Partial<SkinFitAnswers>, fragrance: Fragrance): FitInsight[] {
  const insights: FitInsight[] = [];

  if (skinFit.projection === "close") {
    insights.push({ label: "Close-to-skin elegance", description: "Best experienced in intimate moments" });
  } else if (skinFit.projection === "strong") {
    insights.push({ label: "Bold projection", description: "Leaves a memorable sillage trail" });
  }

  if (skinFit.sensitivity === "sensitive") {
    if (fragrance.intensity <= 2) {
      insights.push({ label: "Sensitivity-friendly", description: "Gentle formulation compatible with sensitive skin" });
    }
  }

  if (skinFit.climate === "warm") {
    insights.push({ label: "Warm climate adapted", description: "Performs beautifully in heat and humidity" });
  } else if (skinFit.climate === "cool") {
    insights.push({ label: "Cool weather companion", description: "Rich notes bloom in cooler air" });
  }

  if (skinFit.timeOfDay === "evening" && fragrance.intensity >= 3) {
    insights.push({ label: "Evening presence", description: "Optimal projection for night occasions" });
  } else if (skinFit.timeOfDay === "day" && fragrance.intensity <= 3) {
    insights.push({ label: "Daytime elegance", description: "Perfectly calibrated for daylight hours" });
  }

  insights.push({ label: `Recommended: ${fragrance.concentration}`, description: "Ideal concentration for your preferences" });

  return insights.slice(0, 4);
}
