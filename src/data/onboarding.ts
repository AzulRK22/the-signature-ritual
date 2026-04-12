/**
 * Onboarding & Skin-Fit step definitions — The Signature Experience
 */

import type { OnboardingStep, SkinFitStep } from "@/types";

export const onboardingSteps: OnboardingStep[] = [
  {
    key: "mood",
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
    key: "style",
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
    key: "occasion",
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
    key: "presence",
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
    key: "intensity",
    title: "How should your scent speak?",
    subtitle: "From whisper to declaration",
    options: [
      { value: "soft", label: "Soft Skin Scent", description: "Only when they lean in" },
      { value: "balanced", label: "Balanced", description: "Present but not imposing" },
      { value: "strong", label: "Strong Projection", description: "Announce your arrival" },
    ],
  },
  {
    key: "familiarity",
    title: "Where are you in your fragrance journey?",
    subtitle: "There are no wrong answers",
    options: [
      { value: "beginner", label: "Beginner", description: "Just starting to explore" },
      { value: "curious", label: "Curious Explorer", description: "Eager to discover more" },
      { value: "enthusiast", label: "Enthusiast", description: "You know what you love" },
    ],
  },
];

export const skinFitSteps: SkinFitStep[] = [
  {
    key: "skinType",
    title: "Your skin type",
    options: [
      { value: "dry", label: "Dry", description: "Fragrance tends to fade faster" },
      { value: "normal", label: "Normal", description: "Balanced absorption" },
      { value: "oily", label: "Oily", description: "Scent lingers naturally" },
    ],
  },
  {
    key: "sensitivity",
    title: "Skin sensitivity",
    options: [
      { value: "sensitive", label: "Sensitive", description: "Prefer gentle formulations" },
      { value: "normal", label: "Normal", description: "No particular concerns" },
    ],
  },
  {
    key: "longevity",
    title: "Preferred longevity",
    options: [
      { value: "light", label: "A few hours", description: "Light & refreshing" },
      { value: "moderate", label: "Half day", description: "Morning to afternoon" },
      { value: "long", label: "All day", description: "From dawn to dusk" },
    ],
  },
  {
    key: "projection",
    title: "Projection preference",
    options: [
      { value: "close", label: "Close to skin", description: "Personal & intimate" },
      { value: "moderate", label: "Moderate", description: "Noticeable presence" },
      { value: "strong", label: "Strong sillage", description: "Leave a trail" },
    ],
  },
  {
    key: "climate",
    title: "Your usual climate",
    options: [
      { value: "warm", label: "Warm & humid", description: "Tropical or summer" },
      { value: "temperate", label: "Temperate", description: "Mild four seasons" },
      { value: "cool", label: "Cool & dry", description: "Autumn or winter" },
    ],
  },
  {
    key: "timeOfDay",
    title: "Primary time of use",
    options: [
      { value: "day", label: "Daytime", description: "Morning to afternoon" },
      { value: "evening", label: "Evening", description: "Dusk and beyond" },
      { value: "both", label: "Both", description: "All moments matter" },
    ],
  },
];
