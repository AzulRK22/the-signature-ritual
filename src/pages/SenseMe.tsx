import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ProgressBar from "@/components/ProgressBar";
import { useJourney } from "@/context/JourneyContext";
import { onboardingSteps, OnboardingAnswers } from "@/data/mockData";
import { getSensitivityAssistOption } from "@/lib/sensitivity";

function getInitialStep(answers: Partial<OnboardingAnswers>) {
  const nextIndex = onboardingSteps.findIndex((step) => !answers[step.key]);
  return nextIndex === -1 ? onboardingSteps.length - 1 : nextIndex;
}

export default function SenseMe() {
  const navigate = useNavigate();
  const { answers, setAnswer, sensitivityMode, setSensitivityMode } = useJourney();
  const [step, setStep] = useState(() => getInitialStep(answers));
  const current = onboardingSteps[step];
  const selected = answers[current.key as keyof OnboardingAnswers];
  const suggestedOption = useMemo(
    () => getSensitivityAssistOption(current.key as keyof OnboardingAnswers, answers),
    [answers, current.key],
  );

  const handleSelect = (value: string) => {
    setAnswer(current.key as keyof OnboardingAnswers, value);
    setTimeout(() => {
      if (step < onboardingSteps.length - 1) {
        setStep(step + 1);
      } else {
        navigate("/decode-me");
      }
    }, 400);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex flex-col">
        <div className="pt-8 pb-4 px-6 flex items-center justify-between">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
            Sense Me
          </p>
          <button
            onClick={() => setSensitivityMode(!sensitivityMode)}
            className={`text-xs font-body px-3 py-1 rounded-full border transition-all duration-300 ${
              sensitivityMode ? "border-primary/60 text-amber" : "border-border/30 text-muted-foreground"
            }`}
          >
            {sensitivityMode ? "Sensitivity Mode On" : "Sensitivity Mode"}
          </button>
        </div>

        <div className="px-6 py-4">
          <ProgressBar current={step} total={onboardingSteps.length} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">
                {current.title}
              </h2>
              <p className="text-sm text-muted-foreground font-body mb-10">
                {current.subtitle}
              </p>

              {sensitivityMode && (
                <div className="luxury-card text-left mb-6">
                  <p className="text-xs tracking-[0.25em] uppercase text-amber font-body mb-2">
                    Sensitivity Guidance
                  </p>
                  <p className="text-sm text-muted-foreground font-body mb-4">
                    We highlight a lower-pressure next choice when you want a steadier path instead of second-guessing every step.
                  </p>
                  <button
                    onClick={() => handleSelect(suggestedOption)}
                    className="btn-outline-luxury w-full text-xs"
                  >
                    Choose My Best Next Step
                  </button>
                </div>
              )}

              <div className={`grid gap-3 ${current.options.length <= 3 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-2"}`}>
                {current.options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(option.value)}
                    className={`selection-card text-left transition-all ${
                      selected === option.value ? "selected" : ""
                    } ${sensitivityMode && option.value === suggestedOption ? "border-primary/40" : ""}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-lg text-foreground">{option.label}</p>
                      {sensitivityMode && option.value === suggestedOption && (
                        <span className="text-[10px] tracking-[0.2em] uppercase text-amber font-body">
                          Recommended
                        </span>
                      )}
                    </div>
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
