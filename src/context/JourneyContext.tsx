import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import type {
  OnboardingAnswers,
  SkinFitAnswers,
  ScentProfile,
  Fragrance,
  JourneyState,
  JourneyEmailLead,
  EmailCaptureSource,
  SignatureFeedback,
  SignatureFeedbackSentiment,
  AuraScaleKey,
} from "@/types";
import {
  matchProfile,
  getProfileFragrances,
  buildWardrobe,
} from "@/lib/recommendation";
import { scentProfiles } from "@/data/profiles";
import { fragrances } from "@/data/fragrances";
import { trackEvent } from "@/lib/analytics";
import { getJourneyGamification } from "@/lib/journeyGamification";
import { JourneyContext } from "@/context/journey-context";

const JOURNEY_STORAGE_KEY = "signature-ritual-journey";

interface JourneySnapshot {
  answers: Partial<OnboardingAnswers>;
  skinFit: Partial<SkinFitAnswers>;
  profileId: string | null;
  recommendationIds: string[];
  signatureScentId: string | null;
  wardrobeIds: Record<string, string | null>;
  auraScales: ScentProfile["aura"]["scales"] | null;
  emailLead: JourneyEmailLead | null;
  signatureFeedback: SignatureFeedback | null;
  sensitivityMode: boolean;
}

function hydrateJourneySnapshot(): JourneySnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as JourneySnapshot;
  } catch (error) {
    console.warn("Failed to restore saved journey", error);
    return null;
  }
}

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [initialSnapshot] = useState(() => hydrateJourneySnapshot());
  const initialProfile = initialSnapshot?.profileId
    ? scentProfiles.find((candidate) => candidate.id === initialSnapshot.profileId) ?? null
    : null;
  const initialRecommendations = initialSnapshot?.recommendationIds?.length
    ? initialSnapshot.recommendationIds
        .map((id) => fragrances.find((fragrance) => fragrance.id === id) ?? null)
        .filter((fragrance): fragrance is Fragrance => Boolean(fragrance))
    : initialProfile
      ? getProfileFragrances(initialProfile)
      : [];
  const initialSignature = initialSnapshot?.signatureScentId
    ? fragrances.find((fragrance) => fragrance.id === initialSnapshot.signatureScentId) ?? null
    : null;

  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>(initialSnapshot?.answers ?? {});
  const [skinFit, setSkinFit] = useState<Partial<SkinFitAnswers>>(initialSnapshot?.skinFit ?? {});
  const [profile, setProfile] = useState<ScentProfile | null>(initialProfile);
  const [recommendations, setRecommendations] = useState<Fragrance[]>(initialRecommendations);
  const [signatureScent, setSignatureScent] = useState<Fragrance | null>(initialSignature);
  const [wardrobe, setWardrobe] = useState<Record<string, Fragrance | null>>(
    Object.fromEntries(
      Object.entries(initialSnapshot?.wardrobeIds ?? {}).map(([key, id]) => [
        key,
        id ? fragrances.find((fragrance) => fragrance.id === id) ?? null : null,
      ]),
    ),
  );
  const [auraScales, setAuraScales] = useState<ScentProfile["aura"]["scales"] | null>(
    initialSnapshot?.auraScales ?? null,
  );
  const [emailLead, setEmailLead] = useState<JourneyEmailLead | null>(
    initialSnapshot?.emailLead ?? null,
  );
  const [signatureFeedback, setSignatureFeedback] = useState<SignatureFeedback | null>(
    initialSnapshot?.signatureFeedback ?? null,
  );
  const [sensitivityMode, setSensitivityModeState] = useState<boolean>(
    initialSnapshot?.sensitivityMode ?? false,
  );
  const { achievements, journeyProgress, loyaltyStatus } = useMemo(
    () =>
      getJourneyGamification({
        answers,
        skinFit,
        profile,
        signatureScent,
        wardrobe,
        auraScales,
        emailLead,
        signatureFeedback,
      }),
    [
      answers,
      skinFit,
      profile,
      signatureScent,
      wardrobe,
      auraScales,
      emailLead,
      signatureFeedback,
    ],
  );

  useEffect(() => {
    if (!initialSnapshot) {
      return;
    }

    trackEvent("journey_restored", {
      has_profile: Boolean(initialSnapshot.profileId),
      has_signature: Boolean(initialSnapshot.signatureScentId),
      has_email: Boolean(initialSnapshot.emailLead?.address),
    });
  }, [initialSnapshot]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const payload: JourneySnapshot = {
      answers,
      skinFit,
      profileId: profile?.id ?? null,
      recommendationIds: recommendations.map((fragrance) => fragrance.id),
      signatureScentId: signatureScent?.id ?? null,
      wardrobeIds: Object.fromEntries(
        Object.entries(wardrobe).map(([key, fragrance]) => [key, fragrance?.id ?? null]),
      ),
      auraScales,
      emailLead,
      signatureFeedback,
      sensitivityMode,
    };

    window.localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(payload));
  }, [
    answers,
    skinFit,
    profile,
    recommendations,
    signatureScent,
    wardrobe,
    auraScales,
    emailLead,
    signatureFeedback,
    sensitivityMode,
  ]);

  const setAnswer = useCallback(
    (key: keyof OnboardingAnswers, value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }));
      trackEvent("sense_me_answered", { question: key, value });
    },
    [],
  );

  const setSkinFitAnswer = useCallback(
    (key: keyof SkinFitAnswers, value: string) => {
      setSkinFit((prev) => ({ ...prev, [key]: value }));
      trackEvent("skin_fit_answered", { question: key, value });
    },
    [],
  );

  const setSensitivityMode = useCallback((value: boolean) => {
    setSensitivityModeState(value);
    trackEvent("sensitivity_mode_toggled", { enabled: value });
  }, []);

  const setAuraScale = useCallback(
    (key: AuraScaleKey, value: number) => {
      setAuraScales((current) => {
        const baseScales = current ?? profile?.aura.scales;
        if (!baseScales) {
          return current;
        }

        trackEvent("scent_mirror_scale_adjusted", {
          scale: key,
          value,
        });

        return {
          ...baseScales,
          [key]: value,
        };
      });
    },
    [profile],
  );

  const resetAuraScales = useCallback(() => {
    setAuraScales(null);
    trackEvent("scent_mirror_scales_reset", {
      profile_id: profile?.id ?? "unknown",
    });
  }, [profile]);

  const saveEmailLead = useCallback(
    (address: string, source: EmailCaptureSource, consent: boolean) => {
      const normalizedAddress = address.trim().toLowerCase();
      const nextLead: JourneyEmailLead = {
        address: normalizedAddress,
        consent,
        source,
        capturedAt: new Date().toISOString(),
      };

      setEmailLead(nextLead);
      trackEvent("email_captured", {
        source,
        consent,
        domain: normalizedAddress.split("@")[1] ?? "unknown",
      });
    },
    [],
  );

  const saveSignatureFeedback = useCallback(
    (sentiment: SignatureFeedbackSentiment, note: string) => {
      const trimmedNote = note.trim();
      const nextFeedback: SignatureFeedback = {
        sentiment,
        note: trimmedNote,
        submittedAt: new Date().toISOString(),
      };

      setSignatureFeedback(nextFeedback);
      trackEvent("signature_feedback_submitted", {
        sentiment,
        has_note: Boolean(trimmedNote),
        signature_id: signatureScent?.id ?? "unknown",
      });
    },
    [signatureScent],
  );

  const updateWardrobeSlot = useCallback((slot: string, fragrance: Fragrance) => {
    setWardrobe((current) => ({
      ...current,
      [slot]: fragrance,
    }));

    if (slot === "signature") {
      setSignatureScent(fragrance);
    }

    trackEvent("wardrobe_slot_updated", {
      slot,
      fragrance_id: fragrance.id,
      fragrance_name: fragrance.name,
    });
  }, []);

  const computeProfile = useCallback(() => {
    const fullAnswers = answers as OnboardingAnswers;
    const matchedProfile = matchProfile(fullAnswers, { sensitivityMode });
    const matchedRecommendations = getProfileFragrances(matchedProfile);

    setProfile(matchedProfile);
    setRecommendations(matchedRecommendations);
    setAuraScales(null);
    trackEvent("profile_computed", {
      profile_id: matchedProfile.id,
      sensitivity_mode: sensitivityMode,
    });
    return matchedProfile;
  }, [answers, sensitivityMode]);

  const selectSignature = useCallback(
    (fragrance: Fragrance) => {
      setSignatureScent(fragrance);
      if (profile) {
        setWardrobe(buildWardrobe(fragrance.id, profile));
      }
      trackEvent("signature_selected", {
        fragrance_id: fragrance.id,
        fragrance_name: fragrance.name,
        profile_id: profile?.id ?? "unknown",
      });
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
    setAuraScales(null);
    setEmailLead(null);
    setSignatureFeedback(null);
    setSensitivityModeState(false);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(JOURNEY_STORAGE_KEY);
    }

    trackEvent("journey_reset");
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
        auraScales,
        emailLead,
        signatureFeedback,
        achievements,
        journeyProgress,
        loyaltyStatus,
        sensitivityMode,
        setAnswer,
        setSkinFitAnswer,
        setSensitivityMode,
        setAuraScale,
        resetAuraScales,
        saveEmailLead,
        saveSignatureFeedback,
        updateWardrobeSlot,
        computeProfile,
        selectSignature,
        reset,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
