import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";
import { computeConfidenceScores } from "@/data/mockData";

export default function Signature() {
  const navigate = useNavigate();
  const { signatureScent, profile, skinFit } = useJourney();

  if (!signatureScent || !profile) {
    navigate("/sense-me");
    return null;
  }

  const scores = computeConfidenceScores(signatureScent, profile, skinFit);

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <motion.div
            className="relative w-48 h-48 mx-auto mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div
              className="absolute inset-0 rounded-full animate-glow-pulse"
              style={{ background: `radial-gradient(circle, hsl(${signatureScent.color} / 0.3), transparent 70%)` }}
            />
            <div
              className="absolute inset-6 rounded-full"
              style={{ background: `radial-gradient(circle, hsl(${signatureScent.color} / 0.5), transparent 60%)` }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-2"
          >
            Your Signature Scent
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground italic mb-2"
          >
            {signatureScent.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-6"
          >
            by {signatureScent.brand}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-foreground/80 font-body leading-relaxed mb-4"
          >
            {signatureScent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="luxury-card text-left mb-8"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {signatureScent.keyNotes.map((n) => (
                <span key={n} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground">{n}</span>
              ))}
            </div>
            <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-muted-foreground">Scent Identity</span>
              <span className="text-amber font-display italic">{profile.title}</span>
            </div>
            <div className="space-y-2">
              {[
                { label: "Signature Match", value: scores.signature },
                { label: "Everyday Fit", value: scores.everyday },
                { label: "Evening Presence", value: scores.evening },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-28">{s.label}</span>
                  <div className="intensity-bar flex-1">
                    <div className="intensity-bar-fill" style={{ width: `${s.value}%` }} />
                  </div>
                  <span className="text-xs text-amber w-8 text-right">{s.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate("/aura-card")} className="btn-primary-luxury">
                Create My Aura Card
              </button>
              <button onClick={() => navigate("/grow-with-me")} className="btn-outline-luxury">
                Build My Scent Wardrobe
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => navigate("/refill")} className="btn-outline-luxury">
                View Refill Journey
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
