import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/useJourney";
import { computeConfidenceScores } from "@/data/mockData";
import { Textarea } from "@/components/ui/textarea";
import type { SignatureFeedbackSentiment } from "@/types";

export default function Signature() {
  const navigate = useNavigate();
  const { signatureScent, profile, skinFit, signatureFeedback, saveSignatureFeedback } =
    useJourney();
  const [sentiment, setSentiment] = useState<SignatureFeedbackSentiment>(
    signatureFeedback?.sentiment ?? "yes",
  );
  const [note, setNote] = useState(signatureFeedback?.note ?? "");

  if (!signatureScent || !profile) {
    navigate("/sense-me");
    return null;
  }

  const scores = computeConfidenceScores(signatureScent, profile, skinFit);

  const handleFeedbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSignatureFeedback(sentiment, note);
  };

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

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35 }}
            onSubmit={handleFeedbackSubmit}
            className="luxury-card text-left mb-8"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">
              Feedback Loop
            </p>
            <h2 className="font-display text-2xl text-foreground mb-2">
              ¿Acertamos?
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-5">
              Your answer helps us sharpen future recommendations and understand where the confidence model is over- or under-reading your taste.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { value: "yes", label: "Yes, exactly" },
                { value: "close", label: "Close, but tweakable" },
                { value: "not-quite", label: "Not really" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSentiment(option.value as SignatureFeedbackSentiment)}
                  className={`selection-card text-left ${
                    sentiment === option.value ? "selected" : ""
                  }`}
                >
                  <p className="font-display text-lg text-foreground">{option.label}</p>
                </button>
              ))}
            </div>

            <Textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Optional: tell us what felt right, off, too bold, too soft, too generic, or unexpectedly perfect."
              className="min-h-[110px] bg-background/60 border-border/40 text-foreground mb-4"
            />

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground font-body">
                {signatureFeedback
                  ? "Feedback saved to this journey."
                  : "You can submit now and still continue through the experience."}
              </p>
              <button type="submit" className="btn-outline-luxury">
                {signatureFeedback ? "Update Feedback" : "Send Feedback"}
              </button>
            </div>
          </motion.form>

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
