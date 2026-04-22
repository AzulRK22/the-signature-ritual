import { describe, it, expect } from "vitest";
import {
  matchProfile,
  getProfileFragrances,
  getTopConfidenceMatch,
} from "@/lib/recommendation";
import { scentProfiles } from "@/data/profiles";
import { fragrances } from "@/data/fragrances";
import type { OnboardingAnswers } from "@/types";
import { getSensitivityAssistOption } from "@/lib/sensitivity";
import { getJourneyGamification } from "@/lib/journeyGamification";

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
        style: "clean-minimalist",
        occasion: "everyday",
        presence: "confident",
        intensity: "balanced",
        familiarity: "curious",
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

      const profileFragrances = getProfileFragrances(profile);
      expect(profileFragrances).toBeDefined();
      expect(Array.isArray(profileFragrances)).toBe(true);
      expect(profileFragrances.length).toBeGreaterThan(0);
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

  describe("getTopConfidenceMatch", () => {
    it("should return the strongest signature candidate", () => {
      const profile = scentProfiles[0];
      const recommendations = profile.fragranceIds
        .map((id) => fragrances.find((fragrance) => fragrance.id === id))
        .filter((fragrance) => Boolean(fragrance));

      const topMatch = getTopConfidenceMatch(recommendations, profile, {
        skinType: "normal",
        climate: "temperate",
      });

      expect(topMatch).toBeDefined();
      expect(topMatch?.fragrance.id).toBeDefined();
      expect(topMatch?.scores.signature).toBeGreaterThanOrEqual(75);
    });
  });

  describe("getJourneyGamification", () => {
    it("should unlock progress and achievements from meaningful milestones", () => {
      const profile = scentProfiles[0];
      const signatureScent = fragrances.find((fragrance) => fragrance.id === profile.fragranceIds[0])!;
      const wardrobe = {
        signature: signatureScent,
        everyday: fragrances.find((fragrance) => fragrance.id === "suede-lumiere") ?? null,
        work: fragrances.find((fragrance) => fragrance.id === "iris-voile") ?? null,
        evening: fragrances.find((fragrance) => fragrance.id === "velvet-oud") ?? null,
        comfort: fragrances.find((fragrance) => fragrance.id === "santal-dore") ?? null,
      };

      const result = getJourneyGamification({
        answers: { mood: "calm" },
        skinFit: {
          skinType: "normal",
          sensitivity: "normal",
          longevity: "moderate",
          projection: "moderate",
          climate: "temperate",
          timeOfDay: "day",
        },
        profile,
        signatureScent,
        wardrobe,
        auraScales: { ...profile.aura.scales, calm: 40 },
        emailLead: {
          address: "test@example.com",
          consent: true,
          source: "landing",
          capturedAt: new Date().toISOString(),
        },
        signatureFeedback: {
          sentiment: "yes",
          note: "Strong fit",
          submittedAt: new Date().toISOString(),
        },
      });

      expect(result.journeyProgress).toBeGreaterThan(50);
      expect(result.loyaltyStatus.points).toBeGreaterThan(0);
      expect(
        result.achievements.some(
          (achievement) => achievement.id === "aura-alchemist" && achievement.unlocked,
        ),
      ).toBe(true);
      expect(
        result.achievements.some(
          (achievement) => achievement.id === "wardrobe-curator" && achievement.unlocked,
        ),
      ).toBe(true);
    });
  });
});
