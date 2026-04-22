import { buildWardrobe } from "@/lib/recommendation";
import type {
  AuraConfig,
  JourneyAchievement,
  JourneyEmailLead,
  JourneyLoyaltyStatus,
  OnboardingAnswers,
  ScentProfile,
  SignatureFeedback,
  SkinFitAnswers,
  Fragrance,
} from "@/types";

interface JourneyGamificationInput {
  answers: Partial<OnboardingAnswers>;
  skinFit: Partial<SkinFitAnswers>;
  profile: ScentProfile | null;
  signatureScent: Fragrance | null;
  wardrobe: Record<string, Fragrance | null>;
  auraScales: AuraConfig["scales"] | null;
  emailLead: JourneyEmailLead | null;
  signatureFeedback: SignatureFeedback | null;
}

const tierThresholds = [
  { label: "Explorer", min: 0, next: 400 },
  { label: "Curator", min: 400, next: 700 },
  { label: "Collector", min: 700, next: 1000 },
  { label: "Icon", min: 1000, next: 1000 },
] as const;

export function getJourneyGamification({
  answers,
  skinFit,
  profile,
  signatureScent,
  wardrobe,
  auraScales,
  emailLead,
  signatureFeedback,
}: JourneyGamificationInput): {
  achievements: JourneyAchievement[];
  journeyProgress: number;
  loyaltyStatus: JourneyLoyaltyStatus;
} {
  const defaultWardrobe =
    profile && signatureScent ? buildWardrobe(signatureScent.id, profile) : null;

  const wardrobeCustomized = Boolean(
    defaultWardrobe &&
      Object.entries(wardrobe).some(([slot, fragrance]) => {
        const baseline = defaultWardrobe[slot];
        return baseline?.id !== fragrance?.id;
      }),
  );

  const auraCustomized = Boolean(
    auraScales &&
      profile &&
      Object.entries(auraScales).some(
        ([key, value]) => profile.aura.scales[key as keyof AuraConfig["scales"]] !== value,
      ),
  );

  const answeredSenseMe = Object.keys(answers).length > 0;
  const completedSkinFit = [
    "skinType",
    "sensitivity",
    "longevity",
    "projection",
    "climate",
    "timeOfDay",
  ].every((key) => Boolean(skinFit[key as keyof SkinFitAnswers]));

  const achievements: JourneyAchievement[] = [
    {
      id: "journey-begins",
      title: "Journey Begins",
      description: "You started translating identity into scent.",
      unlocked: answeredSenseMe,
    },
    {
      id: "identity-decoded",
      title: "Identity Decoded",
      description: "Your scent profile has been revealed.",
      unlocked: Boolean(profile),
    },
    {
      id: "fit-strategist",
      title: "Fit Strategist",
      description: "You completed the Skin & Scent Fit layer.",
      unlocked: completedSkinFit,
    },
    {
      id: "signature-found",
      title: "Signature Found",
      description: "You committed to a signature fragrance.",
      unlocked: Boolean(signatureScent),
    },
    {
      id: "aura-alchemist",
      title: "Aura Alchemist",
      description: "You refined your aura scales manually.",
      unlocked: auraCustomized,
    },
    {
      id: "wardrobe-curator",
      title: "Wardrobe Curator",
      description: "You reshaped your wardrobe beyond the default build.",
      unlocked: wardrobeCustomized,
    },
    {
      id: "feedback-giver",
      title: "Feedback Giver",
      description: "You helped train the confidence loop.",
      unlocked: Boolean(signatureFeedback),
    },
    {
      id: "continuity-member",
      title: "Continuity Member",
      description: "You saved your journey for future loyalty moments.",
      unlocked: Boolean(emailLead),
    },
  ];

  const unlockedCount = achievements.filter((achievement) => achievement.unlocked).length;
  const journeyProgress = Math.round((unlockedCount / achievements.length) * 100);
  const points = achievements.reduce(
    (total, achievement) => total + (achievement.unlocked ? 125 : 0),
    0,
  );
  const activeTier =
    [...tierThresholds].reverse().find((tier) => points >= tier.min) ?? tierThresholds[0];
  const tierSpan = Math.max(1, activeTier.next - activeTier.min);
  const progress =
    activeTier.next === activeTier.min
      ? 100
      : Math.min(100, Math.round(((points - activeTier.min) / tierSpan) * 100));

  return {
    achievements,
    journeyProgress,
    loyaltyStatus: {
      level: activeTier.label,
      points,
      nextLevelPoints: activeTier.next,
      progress,
    },
  };
}
