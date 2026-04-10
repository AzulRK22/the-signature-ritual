import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";

const phrases = [
  "Interpreting identity signals…",
  "Translating presence into scent language…",
  "Building your fragrance confidence profile…",
  "Moving from preference to signature…",
];

export default function DecodeMe() {
  const navigate = useNavigate();
  const { computeProfile } = useJourney();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => {
        if (prev >= phrases.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            computeProfile();
            navigate("/scent-mirror");
          }, 1200);
          return prev;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="relative w-40 h-40 mx-auto mb-12">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(36 60% 50% / 0.3), transparent 70%)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{ background: "radial-gradient(circle, hsl(36 80% 60% / 0.4), transparent 60%)" }}
              animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute inset-12 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-6">
            Decode Me
          </p>

          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="font-display text-2xl md:text-3xl font-light text-foreground italic"
            >
              {phrases[phraseIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
