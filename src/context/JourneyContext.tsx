import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type {
  OnboardingAnswers,
  SkinFitAnswers,
  ScentProfile,
  Fragrance,
  JourneyState,
} from "@/types";
import {
  matchProfile,
  getProfileFragrances,
  buildWardrobe,
} from "@/lib/recommendation";

/** Pre-filled demo journey for quick walkthroughs */
const DEMO_ANSWERS: OnboardingAnswers = {
  mood: "magnetic",
  style: "night-energy",
  occasion: "evening",
  presence: "seductive",
  intensity: "strong",
  familiarity: "enthusiast",
};

const JourneyContext = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});
  const [skinFit, setSkinFit] = useState<Partial<SkinFitAnswers>>({});
  const [profile, setProfile] = useState<ScentProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Fragrance[]>([]);
  const [signatureScent, setSignatureScent] = useState<Fragrance | null>(null);
  const [wardrobe, setWardrobe] = useState<Record<string, Fragrance | null>>(
    {},
  );

  const setAnswer = useCallback(
    (key: keyof OnboardingAnswers, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setSkinFitAnswer = useCallback(
    (key: keyof SkinFitAnswers, value: string) => {
      setSkinFit((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const computeProfile = useCallback(() => {
    const fullAnswers = answers as OnboardingAnswers;
    const p = matchProfile(fullAnswers);
    setProfile(p);
    setRecommendations(getProfileFragrances(p));
    return p;
  }, [answers]);

  const selectSignature = useCallback(
    (fragrance: Fragrance) => {
      setSignatureScent(fragrance);
      if (profile) {
        setWardrobe(buildWardrobe(fragrance.id, profile));
      }
    },
    [profile],
  );

  const reset = useCallback(() => {
    setAnswers({});
    setSkinFit({});
    setProfile(null);
    setRecommendations([]);
    setSignatureScent(null);
    setWardrobe({});
  }, []);

  /** Quick-fill answers for demo mode, then navigate to decode-me */
  const startDemo = useCallback(() => {
    setAnswers(DEMO_ANSWERS);
  }, []);

  return (
    <JourneyContext.Provider
      value={{
        answers,
        skinFit,
        profile,
        recommendations,
        signatureScent,
        wardrobe,
        setAnswer,
        setSkinFitAnswer,
        computeProfile,
        selectSignature,
        reset,
      }}
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

export { DEMO_ANSWERS };
