import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";
import { Fragrance, computeConfidenceScores } from "@/data/mockData";
import { trackEvent } from "@/lib/analytics";
import { getTopConfidenceMatch } from "@/lib/recommendation";

const scentStories: Record<string, string> = {
  default:
    "Close your eyes. Imagine the warmth of this fragrance on your skin — the first spray, the dry down, the trace you leave behind. Does it feel like you?",
};

export default function SignatureRitual() {
  const navigate = useNavigate();
  const { recommendations, selectSignature, profile, skinFit } = useJourney();
  const [selected, setSelected] = useState<Fragrance | null>(null);
  const [compareQueue, setCompareQueue] = useState<Fragrance[]>([]);
  const selectedScoreMap = useMemo(
    () =>
      profile
        ? Object.fromEntries(
            recommendations.map((fragrance) => [
              fragrance.id,
              computeConfidenceScores(fragrance, profile, skinFit),
            ]),
          )
        : {},
    [recommendations, profile, skinFit],
  );

  if (!profile || recommendations.length === 0) {
    navigate("/sense-me");
    return null;
  }

  const topMatch = getTopConfidenceMatch(recommendations, profile, skinFit);
  const liveTarget = selected ?? topMatch?.fragrance ?? recommendations[0];
  const liveScores = computeConfidenceScores(liveTarget, profile, skinFit);
  const compareCards = compareQueue.slice(0, 2);

  const handleChoose = () => {
    if (selected) {
      selectSignature(selected);
      navigate("/signature");
    }
  };

  const handleSelect = (fragrance: Fragrance) => {
    setSelected(fragrance);
    trackEvent("signature_candidate_viewed", {
      fragrance_id: fragrance.id,
      mode: compareQueue.some((item) => item.id === fragrance.id) ? "compare" : "detail",
    });
  };

  const handleCompareToggle = (fragrance: Fragrance) => {
    setCompareQueue((current) => {
      const exists = current.some((item) => item.id === fragrance.id);
      const next = exists
        ? current.filter((item) => item.id !== fragrance.id)
        : [...current, fragrance].slice(-2);

      trackEvent("signature_compare_toggled", {
        fragrance_id: fragrance.id,
        enabled: !exists,
        compare_count: next.length,
      });

      return next;
    });
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="luxury-card mb-8"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-2">
                  Live Confidence Score
                </p>
                <h2 className="font-display text-2xl text-foreground mb-1">
                  {liveTarget.name}
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  {selected
                    ? "Your current focus updates this confidence panel in real time."
                    : "Your highest-confidence match is highlighted while you explore."}
                </p>
              </div>

              <div className="grid gap-3 min-w-full lg:min-w-[320px]">
                {[
                  { label: "Signature Match", value: liveScores.signature },
                  { label: "Everyday Fit", value: liveScores.everyday },
                  { label: "Evening Presence", value: liveScores.evening },
                ].map((score) => (
                  <div key={score.label} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28">{score.label}</span>
                    <div className="intensity-bar flex-1">
                      <div className="intensity-bar-fill" style={{ width: `${score.value}%` }} />
                    </div>
                    <span className="text-xs text-amber w-8 text-right">{score.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {topMatch && (
              <p className="mt-4 text-xs text-muted-foreground font-body">
                System read: <span className="text-foreground">{topMatch.fragrance.name}</span> is currently your strongest projected match at{" "}
                <span className="text-amber">{topMatch.scores.signature}%</span>.
              </p>
            )}
          </motion.div>

          {/* Fragrance cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {recommendations.map((frag, i) => {
              const scores = selectedScoreMap[frag.id];
              const isCompared = compareQueue.some((item) => item.id === frag.id);
              return (
                <motion.div
                  key={frag.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(frag)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(frag);
                    }
                  }}
                  className={`selection-card text-left ${selected?.id === frag.id ? "selected" : ""}`}
                >
                  <div
                    className="w-full h-1 rounded-full mb-3"
                    style={{ background: `linear-gradient(90deg, hsl(${frag.color}), hsl(${frag.color} / 0.3))` }}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">{frag.brand}</p>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCompareToggle(frag);
                      }}
                      className={`text-[10px] tracking-[0.2em] uppercase font-body transition-colors ${
                        isCompared ? "text-amber" : "text-muted-foreground"
                      }`}
                    >
                      {isCompared ? "Comparing" : "Compare"}
                    </button>
                  </div>
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
                </motion.div>
              );
            })}
          </div>

          {compareCards.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-1">
                    Fragrance Comparator
                  </p>
                  <p className="text-sm text-muted-foreground font-body">
                    Compare up to two candidates side by side before you commit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCompareQueue([])}
                  className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body"
                >
                  Clear
                </button>
              </div>

              <div className={`grid gap-4 ${compareCards.length === 1 ? "md:grid-cols-1" : "md:grid-cols-2"}`}>
                {compareCards.map((fragrance) => {
                  const scores = selectedScoreMap[fragrance.id];
                  return (
                    <div key={fragrance.id} className="luxury-card">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body mb-1">
                            {fragrance.brand}
                          </p>
                          <h3 className="font-display text-2xl text-foreground">{fragrance.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{fragrance.scentFamily}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelect(fragrance)}
                          className="btn-outline-luxury text-xs"
                        >
                          Focus
                        </button>
                      </div>

                      <div className="space-y-3 mb-5">
                        {[
                          { label: "Signature", value: scores.signature },
                          { label: "Everyday", value: scores.everyday },
                          { label: "Evening", value: scores.evening },
                        ].map((score) => (
                          <div key={score.label} className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-20">{score.label}</span>
                            <div className="intensity-bar flex-1">
                              <div className="intensity-bar-fill" style={{ width: `${score.value}%` }} />
                            </div>
                            <span className="text-xs text-amber w-8 text-right">{score.value}%</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-3 text-sm">
                        <div>
                          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Key Notes</p>
                          <p className="text-foreground">{fragrance.keyNotes.join(" · ")}</p>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Best For</p>
                          <p className="text-foreground">{fragrance.bestMoment}</p>
                        </div>
                        <div>
                          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Character</p>
                          <p className="text-foreground">{fragrance.emotionalCharacter}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

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
