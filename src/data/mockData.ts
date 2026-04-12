/**
 * Re-export barrel for backward compatibility.
 * All data and logic have been refactored into separate modules.
 */

export type {
  ScentProfile,
  AuraConfig,
  Fragrance,
  OnboardingAnswers,
  SkinFitAnswers,
  FitInsight,
  ConfidenceScores,
} from "@/types";

export { scentProfiles } from "@/data/profiles";
export { fragrances } from "@/data/fragrances";
export { onboardingSteps, skinFitSteps } from "@/data/onboarding";
export {
  matchProfile,
  getProfileFragrances,
  buildWardrobe,
  computeConfidenceScores,
  getFitInsights,
} from "@/lib/recommendation";
