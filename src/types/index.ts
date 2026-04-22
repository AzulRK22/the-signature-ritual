/**
 * Core type definitions for The Signature Experience
 * 
 * All domain types are centralized here for clarity,
 * reuse, and easy extension.
 */

// ─── Aura Visualization ─────────────────────────────────────────────

/** Drives the Scent Mirror aura visual and Aura Card rendering */
export interface AuraConfig {
  primaryColor: string;
  secondaryColor: string;
  /** Overall visual intensity 0–1 */
  intensity: number;
  /** Identity spectrum scales, each 0–100 */
  scales: {
    intimate: number;  // 0 = intimate, 100 = expressive
    calm: number;      // 0 = calm,     100 = magnetic
    soft: number;      // 0 = soft,     100 = intense
    day: number;       // 0 = day,      100 = night
  };
}

// ─── Scent Identity Profile ─────────────────────────────────────────

export interface ScentProfile {
  id: string;
  title: string;
  description: string;
  traits: string[];
  moodKeywords: string[];
  scentDirection: string;
  fragranceIds: string[];
  aura: AuraConfig;
  /** Optional reframing for hype-driven selections */
  hypeReframe?: string;
}

// ─── Fragrance ──────────────────────────────────────────────────────

export interface Fragrance {
  id: string;
  name: string;
  brand: string;
  scentFamily: string;
  keyNotes: string[];
  /** 1–5 scale */
  intensity: number;
  bestMoment: string;
  description: string;
  /** Maps to wardrobe slot: everyday | work | evening | comfort */
  wardrobeCategory: string;
  /** HSL color string for visual accents */
  color: string;
  emotionalCharacter: string;
  concentration: string;
}

// ─── Onboarding (Sense Me) ──────────────────────────────────────────

export interface OnboardingAnswers {
  mood: string;
  style: string;
  occasion: string;
  presence: string;
  intensity: string;
  familiarity: string;
}

export interface OnboardingOption {
  value: string;
  label: string;
  description: string;
}

export interface OnboardingStep {
  key: keyof OnboardingAnswers;
  title: string;
  subtitle: string;
  options: OnboardingOption[];
}

// ─── Skin & Scent Fit ───────────────────────────────────────────────

export interface SkinFitAnswers {
  skinType: string;
  sensitivity: string;
  longevity: string;
  projection: string;
  climate: string;
  timeOfDay: string;
}

export interface SkinFitOption {
  value: string;
  label: string;
  description: string;
}

export interface SkinFitStep {
  key: keyof SkinFitAnswers;
  title: string;
  options: SkinFitOption[];
}

// ─── Recommendation Engine Outputs ──────────────────────────────────

export interface ConfidenceScores {
  signature: number;
  everyday: number;
  evening: number;
}

export interface FitInsight {
  label: string;
  description: string;
}

// ─── Wardrobe ───────────────────────────────────────────────────────

export interface WardrobeSlots {
  signature: Fragrance | null;
  everyday: Fragrance | null;
  work: Fragrance | null;
  evening: Fragrance | null;
  comfort: Fragrance | null;
}

// ─── Journey State ──────────────────────────────────────────────────

export type EmailCaptureSource = "landing" | "refill";

export interface JourneyEmailLead {
  address: string;
  consent: boolean;
  source: EmailCaptureSource;
  capturedAt: string;
}

export interface JourneyState {
  answers: Partial<OnboardingAnswers>;
  skinFit: Partial<SkinFitAnswers>;
  profile: ScentProfile | null;
  recommendations: Fragrance[];
  signatureScent: Fragrance | null;
  wardrobe: Record<string, Fragrance | null>;
  emailLead: JourneyEmailLead | null;
  sensitivityMode: boolean;
  setAnswer: (key: keyof OnboardingAnswers, value: string) => void;
  setSkinFitAnswer: (key: keyof SkinFitAnswers, value: string) => void;
  setSensitivityMode: (value: boolean) => void;
  saveEmailLead: (
    address: string,
    source: EmailCaptureSource,
    consent: boolean,
  ) => void;
  computeProfile: () => ScentProfile;
  selectSignature: (fragrance: Fragrance) => void;
  reset: () => void;
}
