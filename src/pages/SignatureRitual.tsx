import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";
import { Fragrance, computeConfidenceScores } from "@/data/mockData";

const scentStories: Record<string, string> = {
  default:
    "Close your eyes. Imagine the warmth of this fragrance on your skin — the first spray, the dry down, the trace you leave behind. Does it feel like you?",
};

export default function SignatureRitual() {
  const navigate = useNavigate();
  const { recommendations, selectSignature, profile, skinFit } = useJourney();
  const [selected, setSelected] = useState<Fragrance | null>(null);

  if (!profile || recommendations.length === 0) {
    navigate("/sense-me");
    return null;
  }

  const handleChoose = () => {
    if (selected) {
      selectSignature(selected);
      navigate("/signature");
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">
              The Signature Ritual
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              Find your one.
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Take a moment with each fragrance. Feel which one resonates with your identity.
            </p>
          </motion.div>

          {/* Fragrance cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {recommendations.map((frag, i) => {
              const scores = computeConfidenceScores(frag, profile, skinFit);
              return (
                <motion.button
                  key={frag.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setSelected(frag)}
                  className={`selection-card text-left ${selected?.id === frag.id ? "selected" : ""}`}
                >
                  <div
                    className="w-full h-1 rounded-full mb-3"
                    style={{ background: `linear-gradient(90deg, hsl(${frag.color}), hsl(${frag.color} / 0.3))` }}
                  />
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">{frag.brand}</p>
                  <p className="font-display text-xl text-foreground">{frag.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">{frag.scentFamily}</p>
                  {/* Confidence score */}
                  <div className="flex items-center gap-2">
                    <div className="intensity-bar flex-1">
                      <div className="intensity-bar-fill" style={{ width: `${scores.signature}%` }} />
                    </div>
                    <span className="text-xs text-amber font-body">{scores.signature}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Signature Match</p>
                </motion.button>
              );
            })}
          </div>

          {/* Deep dive */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="luxury-card mb-8"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-amber mb-4">The Scent Story</p>
                    <p className="font-display text-lg italic text-foreground/80 leading-relaxed mb-6">
                      {scentStories.default}
                    </p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Key Notes</p>
                        <p className="text-sm text-foreground">{selected.keyNotes.join(" · ")}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Best For</p>
                        <p className="text-sm text-foreground">{selected.bestMoment}</p>
                      </div>
                      <div>
                        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Character</p>
                        <p className="text-sm text-foreground">{selected.emotionalCharacter}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-amber mb-4">Why This Is You</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <p className="text-sm text-foreground">Matches your <span className="text-amber">{profile.title}</span> identity</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <p className="text-sm text-foreground">Aligns with your {profile.traits[0].toLowerCase()} nature</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60" />
                        <p className="text-sm text-foreground">Perfect for {selected.bestMoment.toLowerCase()}</p>
                      </div>
                    </div>

                    {/* Confidence scores */}
                    <div className="mt-6 space-y-3">
                      <p className="text-xs tracking-widest uppercase text-muted-foreground">Confidence Scores</p>
                      {(() => {
                        const scores = computeConfidenceScores(selected, profile, skinFit);
                        return (
                          <>
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
                          </>
                        );
                      })()}
                    </div>

                    <div className="mt-6">
                      <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Intensity</p>
                      <div className="intensity-bar w-full">
                        <div className="intensity-bar-fill" style={{ width: `${(selected.intensity / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <button onClick={handleChoose} className="btn-primary-luxury">
                This Is My Signature
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
