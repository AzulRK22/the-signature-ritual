import { describe, it, expect } from "vitest";
import { matchProfile, getProfileFragrances } from "@/lib/recommendation";
import { scentProfiles } from "@/data/profiles";
import type { OnboardingAnswers } from "@/types";
import { getSensitivityAssistOption } from "@/lib/sensitivity";

describe("Recommendation Engine", () => {
  describe("matchProfile", () => {
    it("should return a valid profile for given answers", () => {
      const answers: OnboardingAnswers = {
        mood: "magnetic",
        style: "night-energy",
        occasion: "evening",
        presence: "seductive",
        intensity: "strong",
        familiarity: "enthusiast",
      };

      const profile = matchProfile(answers);
      expect(profile).toBeDefined();
      expect(profile.id).toBeDefined();
      expect(profile.title).toBeDefined();
    });

    it("should handle different mood values", () => {
      const answers: OnboardingAnswers = {
        mood: "calm",
        style: "day-energy",
        occasion: "day",
        presence: "confident",
        intensity: "moderate",
        familiarity: "novice",
      };

      const profile = matchProfile(answers);
      expect(profile).toBeDefined();
    });

    it("should support sensitivity mode without breaking matching", () => {
      const answers: OnboardingAnswers = {
        mood: "comforting",
        style: "soft-elegance",
        occasion: "everyday",
        presence: "warm",
        intensity: "balanced",
        familiarity: "beginner",
      };

      const profile = matchProfile(answers, { sensitivityMode: true });
      expect(profile).toBeDefined();
      expect(profile.id).toBe("quiet-gold");
    });
  });

  describe("getProfileFragrances", () => {
    it("should return fragrances for a valid profile", () => {
      const profile = scentProfiles[0];

      const fragrances = getProfileFragrances(profile);
      expect(fragrances).toBeDefined();
      expect(Array.isArray(fragrances)).toBe(true);
      expect(fragrances.length).toBeGreaterThan(0);
    });
  });

  describe("getSensitivityAssistOption", () => {
    it("should recommend a lower-pressure fallback for indecisive users", () => {
      expect(
        getSensitivityAssistOption("occasion", {
          mood: "calm",
          style: "soft-elegance",
        }),
      ).toBe("everyday");
      expect(
        getSensitivityAssistOption("intensity", {
          occasion: "work",
        }),
      ).toBe("balanced");
    });
  });
});
