import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  OnboardingAnswers,
  SkinFitAnswers,
  ScentProfile,
  Fragrance,
  matchProfile,
  getProfileFragrances,
  buildWardrobe,
} from "@/data/mockData";

interface JourneyState {
  answers: Partial<OnboardingAnswers>;
  skinFit: Partial<SkinFitAnswers>;
  profile: ScentProfile | null;
  recommendations: Fragrance[];
  signatureScent: Fragrance | null;
  wardrobe: Record<string, Fragrance | null>;
  setAnswer: (key: keyof OnboardingAnswers, value: string) => void;
  setSkinFitAnswer: (key: keyof SkinFitAnswers, value: string) => void;
  computeProfile: () => ScentProfile;
  selectSignature: (fragrance: Fragrance) => void;
  reset: () => void;
}

const JourneyContext = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [skinFit, setSkinFit] = useState<Partial<SkinFitAnswers>>({});
  const [profile, setProfile] = useState<ScentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Fragrance[]>([]);
  const [signatureScent, setSignatureScent] = useState<Fragrance | null>(null);
  const [wardrobe, setWardrobe] = useState<Record<string, Fragrance | null>>({});

  const setAnswer = (key: keyof OnboardingAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const setSkinFitAnswer = (key: keyof SkinFitAnswers, value: string) => {
    setSkinFit((prev) => ({ ...prev, [key]: value }));
  };

  const computeProfile = () => {
    const fullAnswers = answers as OnboardingAnswers;
    const p = matchProfile(fullAnswers);
    setProfile(p);
    setRecommendations(getProfileFragrances(p));
    return p;
  };

  const selectSignature = (fragrance: Fragrance) => {
    setSignatureScent(fragrance);
    if (profile) {
      setWardrobe(buildWardrobe(fragrance.id, profile));
    }
  };

  const reset = () => {
    setAnswers({});
    setSkinFit({});
    setProfile(null);
    setRecommendations([]);
    setSignatureScent(null);
    setWardrobe({});
  };

  return (
    <JourneyContext.Provider
      value={{ answers, skinFit, profile, recommendations, signatureScent, wardrobe, setAnswer, setSkinFitAnswer, computeProfile, selectSignature, reset }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used within JourneyProvider");
  return ctx;
}
