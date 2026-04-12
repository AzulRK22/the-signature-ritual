/**
 * Recommendation Engine — The Signature Experience
 *
 * This module contains all scoring, matching, and insight
 * logic that powers the fragrance confidence system.
 *
 * ┌─────────────────────────────────────────────────────┐
 * │  HOW IT WORKS                                       │
 * │                                                     │
 * │  1. Sense Me answers → matchProfile()               │
 * │     Scores each of 6 profiles by summing weighted   │
 * │     points from mood, style, and presence maps.     │
 * │     Highest score wins.                             │
 * │                                                     │
 * │  2. Profile → getProfileFragrances()                │
 * │     Each profile pre-maps to 3 fragrance IDs.       │
 * │                                                     │
 * │  3. Skin Fit → computeConfidenceScores()            │
 * │     Base score from profile alignment, then          │
 * │     bonuses/penalties from skin type, climate,       │
 * │     sensitivity, longevity, and projection.          │
 * │                                                     │
 * │  4. getFitInsights() generates editorial cards       │
 * │     based on the user's physiological inputs.        │
 * │                                                     │
 * │  5. buildWardrobe() fills occasion-based slots       │
 * │     from the remaining fragrance catalogue.          │
 * └─────────────────────────────────────────────────────┘
 */

import type {
  OnboardingAnswers,
  SkinFitAnswers,
  ScentProfile,
  Fragrance,
  ConfidenceScores,
  FitInsight,
} from "@/types";
import { scentProfiles } from "@/data/profiles";
import { fragrances } from "@/data/fragrances";

// ─── Mood → Profile Mapping ────────────────────────────────────────
// Each mood value maps to profiles in priority order (index 0 = strongest fit).

const moodMap: Record<string, string[]> = {
  calm: ["quiet-gold", "soft-power", "clean-aura"],
  magnetic: ["midnight-presence", "velvet-heat", "magnetic-minimalist"],
  fresh: ["clean-aura", "soft-power", "magnetic-minimalist"],
  bold: ["midnight-presence", "velvet-heat"],
  sophisticated: ["quiet-gold", "soft-power", "magnetic-minimalist"],
  comforting: ["quiet-gold", "velvet-heat", "clean-aura"],
};

// ─── Style → Profile Mapping ───────────────────────────────────────

const styleMap: Record<string, string[]> = {
  "quiet-luxury": ["quiet-gold", "soft-power"],
  "clean-minimalist": ["clean-aura", "magnetic-minimalist"],
  "night-energy": ["midnight-presence", "velvet-heat"],
  "soft-elegance": ["soft-power", "quiet-gold"],
  "statement-maker": ["midnight-presence", "velvet-heat"],
  "timeless-classic": ["quiet-gold", "magnetic-minimalist"],
};

// ─── Presence → Profile Mapping ────────────────────────────────────

const presenceMap: Record<string, string[]> = {
  understated: ["quiet-gold", "clean-aura", "soft-power"],
  memorable: ["midnight-presence", "velvet-heat"],
  warm: ["quiet-gold", "velvet-heat"],
  seductive: ["midnight-presence", "velvet-heat"],
  polished: ["soft-power", "magnetic-minimalist"],
  confident: ["magnetic-minimalist", "midnight-presence"],
};

/**
 * Matches onboarding answers to the best-fitting scent identity profile.
 *
 * Scoring: each mapping array awards (3 – index) points per match.
 * The profile with the highest total score wins.
 */
export function matchProfile(answers: OnboardingAnswers): ScentProfile {
  const scoring: Record<string, number> = {};
  scentProfiles.forEach((p) => (scoring[p.id] = 0));

  [moodMap[answers.mood], styleMap[answers.style], presenceMap[answers.presence]].forEach((ids) => {
    ids?.forEach((id, i) => {
      scoring[id] = (scoring[id] || 0) + (3 - i);
    });
  });

  const best = Object.entries(scoring).sort((a, b) => b[1] - a[1])[0][0];
  return scentProfiles.find((p) => p.id === best) || scentProfiles[0];
}

/** Returns the 3 fragrances linked to a profile */
export function getProfileFragrances(profile: ScentProfile): Fragrance[] {
  return profile.fragranceIds
    .map((id) => fragrances.find((f) => f.id === id)!)
    .filter(Boolean);
}

/**
 * Builds a complete scent wardrobe around a chosen signature.
 *
 * Wardrobe rules:
 * 1. Signature slot → the chosen fragrance
 * 2. Everyday slot  → first match with wardrobeCategory "everyday"
 * 3. Work slot      → first match with wardrobeCategory "work"
 * 4. Evening slot   → first match with wardrobeCategory "evening"
 * 5. Comfort slot   → first match with wardrobeCategory "comfort"
 */
export function buildWardrobe(
  signatureId: string,
  _profile: ScentProfile
): Record<string, Fragrance | null> {
  const signature = fragrances.find((f) => f.id === signatureId)!;
  const rest = fragrances.filter((f) => f.id !== signatureId);

  return {
    signature,
    everyday: rest.find((f) => f.wardrobeCategory === "everyday") || null,
    work: rest.find((f) => f.wardrobeCategory === "work") || null,
    evening: rest.find((f) => f.wardrobeCategory === "evening") || null,
    comfort: rest.find((f) => f.wardrobeCategory === "comfort") || null,
  };
}

/**
 * Computes confidence scores for a fragrance against a profile + skin fit.
 *
 * Base score: 85 if the fragrance is in the profile's list, otherwise 70.
 * Bonuses from intensity alignment and skin-fit variables.
 */
export function computeConfidenceScores(
  fragrance: Fragrance,
  profile: ScentProfile,
  skinFit?: Partial<SkinFitAnswers>
): ConfidenceScores {
  let base = profile.fragranceIds.includes(fragrance.id) ? 85 : 70;

  // Intensity alignment bonus
  const profileIntensity = profile.aura.intensity * 5;
  const diff = Math.abs(fragrance.intensity - profileIntensity);
  base += Math.max(0, 10 - diff * 3);

  // Skin-fit bonuses
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

/** Generates editorial fit insight cards */
export function getFitInsights(
  skinFit: Partial<SkinFitAnswers>,
  fragrance: Fragrance
): FitInsight[] {
  const insights: FitInsight[] = [];

  if (skinFit.projection === "close") {
    insights.push({ label: "Close-to-skin elegance", description: "Best experienced in intimate moments" });
  } else if (skinFit.projection === "strong") {
    insights.push({ label: "Bold projection", description: "Leaves a memorable sillage trail" });
  }

  if (skinFit.sensitivity === "sensitive" && fragrance.intensity <= 2) {
    insights.push({ label: "Sensitivity-friendly", description: "Gentle formulation compatible with sensitive skin" });
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

  insights.push({
    label: `Recommended: ${fragrance.concentration}`,
    description: "Ideal concentration for your preferences",
  });

  return insights.slice(0, 4);
}
