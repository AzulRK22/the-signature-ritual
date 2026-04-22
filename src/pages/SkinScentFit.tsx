import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ProgressBar from "@/components/ProgressBar";
import { useJourney } from "@/context/useJourney";
import { skinFitSteps, SkinFitAnswers, getFitInsights } from "@/data/mockData";

function getInitialStep(answers: Partial<SkinFitAnswers>) {
  const nextIndex = skinFitSteps.findIndex((step) => !answers[step.key]);
  return nextIndex === -1 ? skinFitSteps.length - 1 : nextIndex;
}

export default function SkinScentFit() {
  const navigate = useNavigate();
  const { skinFit, setSkinFitAnswer, recommendations, profile } = useJourney();
  const [step, setStep] = useState(() => getInitialStep(skinFit));
  const [showInsights, setShowInsights] = useState(() =>
    skinFitSteps.every((candidate) => Boolean(skinFit[candidate.key])),
  );

  if (!profile || recommendations.length === 0) {
    navigate("/sense-me");
    return null;
  }

  const current = skinFitSteps[step];
  const selected = skinFit[current.key as keyof SkinFitAnswers];

  const handleSelect = (value: string) => {
    setSkinFitAnswer(current.key as keyof SkinFitAnswers, value);
    setTimeout(() => {
      if (step < skinFitSteps.length - 1) {
        setStep(step + 1);
      } else {
        setShowInsights(true);
      }
    }, 400);
  };

  if (showInsights) {
    const insights = getFitInsights(skinFit, recommendations[0]);
    return (
      <PageTransition>
        <div className="min-h-screen bg-obsidian px-6 py-16 flex flex-col items-center justify-center">
          <div className="max-w-lg w-full">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">Skin & Scent Fit</p>
              <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
                Your Fit Profile
              </h1>
              <p className="text-sm text-muted-foreground font-body">
                Personalized insights to refine your fragrance experience.
              </p>
            </motion.div>

            <div className="grid gap-3 mb-10">
              {insights.map((insight, i) => (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  className="luxury-card"
                >
                  <p className="font-display text-lg text-foreground mb-1">{insight.label}</p>
                  <p className="text-xs text-muted-foreground font-body">{insight.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button onClick={() => navigate("/signature-ritual")} className="btn-primary-luxury">
                Continue to Signature Ritual
              </button>
              <button onClick={() => { setShowInsights(false); setStep(0); }} className="btn-outline-luxury">
                Refine My Matches
              </button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex flex-col">
        <div className="pt-8 pb-4 px-6">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
            Skin & Scent Fit
          </p>
        </div>

        <div className="px-6 py-4">
          <ProgressBar current={step} total={skinFitSteps.length} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm mx-auto text-center"
            >
              <h2 className="font-display text-3xl font-light text-foreground mb-8">
                {current.title}
              </h2>

              <div className="grid gap-3">
                {current.options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(option.value)}
                    className={`selection-card text-left transition-all ${
                      selected === option.value ? "selected" : ""
                    }`}
                  >
                    <p className="font-display text-lg text-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">{option.description}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-8 text-xs tracking-widest uppercase text-muted-foreground font-body hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
