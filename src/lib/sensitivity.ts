import type { OnboardingAnswers } from "@/types";

export function getSensitivityAssistOption(
  step: keyof OnboardingAnswers,
  answers: Partial<OnboardingAnswers>,
): string {
  switch (step) {
    case "mood":
      return answers.presence === "warm" ? "comforting" : "sophisticated";
    case "style":
      return answers.mood === "comforting" || answers.mood === "calm"
        ? "soft-elegance"
        : "clean-minimalist";
    case "occasion":
      return answers.style === "night-energy" || answers.mood === "magnetic"
        ? "evening"
        : "everyday";
    case "presence":
      return answers.mood === "comforting" || answers.style === "soft-elegance"
        ? "warm"
        : "confident";
    case "intensity":
      return answers.occasion === "special-event" ? "strong" : "balanced";
    case "familiarity":
      return "curious";
    default:
      return "curious";
  }
}
