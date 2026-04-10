import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";
import { Fragrance } from "@/data/mockData";

const categories = [
  { key: "signature", label: "Your Signature", icon: "✦", occasion: "Your anchor — the scent that defines your presence" },
  { key: "everyday", label: "Everyday", icon: "○", occasion: "Daily confidence, effortless and reliable" },
  { key: "work", label: "Work · Polished", icon: "◇", occasion: "Professional polish, understated authority" },
  { key: "evening", label: "Evening · Statement", icon: "●", occasion: "After-dark magnetism, unforgettable presence" },
  { key: "comfort", label: "Comfort · Personal", icon: "◠", occasion: "Intimate warmth, personal sanctuary" },
];

function WardrobeSlot({ label, icon, fragrance, occasion }: { label: string; icon: string; fragrance: Fragrance | null; occasion: string }) {
  return (
    <div className="luxury-card">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-amber text-lg">{icon}</span>
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">{label}</p>
      </div>
      {fragrance ? (
        <>
          <h3 className="font-display text-2xl font-light text-foreground mb-1">{fragrance.name}</h3>
          <p className="text-xs text-muted-foreground font-body mb-2">{fragrance.brand} · {fragrance.scentFamily}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {fragrance.keyNotes.slice(0, 3).map((n) => (
              <span key={n} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{n}</span>
            ))}
          </div>
          <div className="intensity-bar w-20">
            <div className="intensity-bar-fill" style={{ width: `${(fragrance.intensity / 5) * 100}%` }} />
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground italic font-display">Awaiting discovery…</p>
      )}
      <p className="text-xs text-muted-foreground/70 font-body mt-3 italic">{occasion}</p>
    </div>
  );
}

export default function GrowWithMe() {
  const navigate = useNavigate();
  const { wardrobe, signatureScent } = useJourney();

  if (!signatureScent) {
    navigate("/sense-me");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">Grow With Me</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              Your Scent Wardrobe
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              A fragrance for every facet of your life. Your signature anchors the collection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <WardrobeSlot
                  label={cat.label}
                  icon={cat.icon}
                  fragrance={wardrobe[cat.key] as Fragrance | null}
                  occasion={cat.occasion}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="luxury-card border-dashed">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-amber text-lg">❋</span>
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-body">Seasonal</p>
                </div>
                <p className="font-display text-lg text-foreground/60 italic">Spring discovery coming soon…</p>
                <p className="text-xs text-muted-foreground mt-2">
                  A seasonal scent suggestion based on your evolving preferences.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Layering guidance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="luxury-card mb-10"
          >
            <p className="text-xs tracking-widest uppercase text-amber mb-3">Layering Guidance</p>
            <p className="text-sm text-foreground/80 font-body leading-relaxed mb-4">
              Your signature scent can be layered with complementary fragrances from your wardrobe for added depth. 
              Try combining your everyday scent as a base with your signature for a richer evening presence.
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">Base + Signature</span>
              <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">Comfort + Evening</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button onClick={() => navigate("/refill")} className="btn-primary-luxury">
              Refill & Continuity
            </button>
            <button onClick={() => navigate("/aura-card")} className="btn-outline-luxury">
              View Aura Card
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
