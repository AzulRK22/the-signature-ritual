/**
 * Scent Identity Profiles — The Signature Experience
 *
 * Each profile represents a distinct fragrance identity archetype.
 * Profiles are matched via the recommendation engine in lib/recommendation.ts.
 */

import type { ScentProfile } from "@/types";

export const scentProfiles: ScentProfile[] = [
  {
    id: "quiet-gold",
    title: "Quiet Gold",
    description:
      "You don't need to be loud to be unforgettable. Your presence is a warm, gilded whisper that lingers long after you've left the room. Refined, intentional, effortlessly magnetic.",
    traits: ["Understated", "Refined", "Warm", "Intentional"],
    moodKeywords: ["calm confidence", "quiet luxury", "golden warmth"],
    scentDirection:
      "Warm woods with soft amber and a touch of creamy vanilla. Think cashmere on skin.",
    fragranceIds: ["noir-absolu", "velvet-oud", "amber-ritual"],
    aura: {
      primaryColor: "36 60% 50%",
      secondaryColor: "40 35% 40%",
      intensity: 0.6,
      scales: { intimate: 25, calm: 20, soft: 30, day: 35 },
    },
    hypeReframe:
      "Your interest in warm, luxurious scents isn't trend-following — it's an instinct for timeless elegance.",
  },
  {
    id: "midnight-presence",
    title: "Midnight Presence",
    description:
      "You come alive when the world quiets down. There's a magnetic intensity to your energy — dark, alluring, impossible to look away from. You are the night itself.",
    traits: ["Magnetic", "Intense", "Mysterious", "Powerful"],
    moodKeywords: ["dark allure", "midnight magnetism", "deep intensity"],
    scentDirection:
      "Rich oud, smoky incense, dark florals with a leather edge. Enigmatic and enveloping.",
    fragranceIds: ["obsidian-noir", "smoke-ritual", "dark-bloom"],
    aura: {
      primaryColor: "280 20% 30%",
      secondaryColor: "0 0% 15%",
      intensity: 0.9,
      scales: { intimate: 70, calm: 85, soft: 80, day: 90 },
    },
    hypeReframe:
      "What others call bold, you experience as authentic. Your attraction to intensity is about presence, not performance.",
  },
  {
    id: "soft-power",
    title: "Soft Power",
    description:
      "Strength doesn't need armor. Your power lies in grace, in the gentle certainty of someone who knows exactly who they are. Elegant, composed, undeniably present.",
    traits: ["Graceful", "Composed", "Elegant", "Certain"],
    moodKeywords: ["gentle strength", "poised elegance", "soft authority"],
    scentDirection:
      "Iris, soft suede, white musk with a whisper of cedar. Clean power.",
    fragranceIds: ["iris-voile", "suede-lumiere", "blanc-absolu"],
    aura: {
      primaryColor: "260 20% 60%",
      secondaryColor: "300 10% 50%",
      intensity: 0.5,
      scales: { intimate: 35, calm: 30, soft: 25, day: 40 },
    },
  },
  {
    id: "velvet-heat",
    title: "Velvet Heat",
    description:
      "There's a warmth that radiates from you — not aggressive, but impossible to ignore. Like sunlit amber on warm skin, you draw people in with sensual ease.",
    traits: ["Sensual", "Warm", "Inviting", "Bold"],
    moodKeywords: ["amber warmth", "sensual radiance", "velvet touch"],
    scentDirection:
      "Amber, tonka bean, saffron, warm sandalwood. Rich and intimate.",
    fragranceIds: ["amber-ritual", "santal-dore", "noir-absolu"],
    aura: {
      primaryColor: "15 40% 45%",
      secondaryColor: "36 80% 60%",
      intensity: 0.75,
      scales: { intimate: 55, calm: 50, soft: 60, day: 55 },
    },
    hypeReframe:
      "Your draw to warmth and sensuality is deeply personal — it's about connection, not conformity.",
  },
  {
    id: "clean-aura",
    title: "Clean Aura",
    description:
      "You are the first breath of morning air — clear, bright, and renewing. There's an effortless freshness to everything you touch. Pure intention made tangible.",
    traits: ["Fresh", "Pure", "Effortless", "Light"],
    moodKeywords: ["morning clarity", "pure freshness", "clean energy"],
    scentDirection:
      "Bergamot, white tea, clean musk, driftwood. A breath of clarity.",
    fragranceIds: ["blanc-absolu", "cedre-frais", "iris-voile"],
    aura: {
      primaryColor: "180 15% 55%",
      secondaryColor: "42 20% 80%",
      intensity: 0.4,
      scales: { intimate: 20, calm: 15, soft: 15, day: 20 },
    },
  },
  {
    id: "magnetic-minimalist",
    title: "Magnetic Minimalist",
    description:
      "Less is more, but your less is devastating. Every choice is deliberate, every detail earned. You are proof that restraint is the ultimate statement.",
    traits: ["Deliberate", "Minimal", "Sharp", "Modern"],
    moodKeywords: ["precise minimalism", "sharp elegance", "modern edge"],
    scentDirection:
      "Vetiver, black pepper, dry cedar, mineral accord. Architecturally beautiful.",
    fragranceIds: ["cedre-frais", "smoke-ritual", "suede-lumiere"],
    aura: {
      primaryColor: "150 15% 40%",
      secondaryColor: "0 0% 25%",
      intensity: 0.55,
      scales: { intimate: 45, calm: 55, soft: 45, day: 50 },
    },
  },
];
