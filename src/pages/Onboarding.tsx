import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import ProgressBar from "@/components/ProgressBar";
import { useJourney } from "@/context/JourneyContext";
import { onboardingSteps, OnboardingAnswers } from "@/data/mockData";

export default function Onboarding() {
  const navigate = useNavigate();
  const { answers, setAnswer } = useJourney();
  const [step, setStep] = useState(0);
  const current = onboardingSteps[step];

  const selected = answers[current.key as keyof OnboardingAnswers];

  const handleSelect = (value: string) => {
    setAnswer(current.key as keyof OnboardingAnswers, value);
    setTimeout(() => {
      if (step < onboardingSteps.length - 1) {
        setStep(step + 1);
      } else {
        navigate("/profiling");
      }
    }, 400);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex flex-col">
        {/* Header */}
        <div className="pt-8 pb-4 px-6">
          <p className="text-center text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
            The Signature Experience
          </p>
        </div>

        <div className="px-6 py-4">
          <ProgressBar current={step} total={onboardingSteps.length} />
        </div>

        {/* Question */}
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

              <div className={`grid gap-3 ${current.options.length <= 3 ? "grid-cols-1 max-w-sm mx-auto" : "grid-cols-2"}`}>
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
