import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import FragranceCard from "@/components/FragranceCard";
import { useJourney } from "@/context/JourneyContext";

const fitReasons = [
  "Perfectly mirrors your warm, grounded energy — a scent that feels like an extension of who you already are.",
  "Captures the magnetic depth of your presence — rich, layered, and impossible to forget.",
  "Balances your refined taste with unexpected complexity — sophisticated without being predictable.",
];

export default function Recommendations() {
  const navigate = useNavigate();
  const { recommendations, profile } = useJourney();

  if (!profile || recommendations.length === 0) {
    navigate("/onboarding");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">
              Curated for {profile.title}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              Your Fragrance Selection
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Three fragrances chosen to resonate with your scent identity. Each one a different expression of you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {recommendations.map((frag, i) => (
              <motion.div
                key={frag.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                <FragranceCard fragrance={frag} whyFits={fitReasons[i]} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <button
              onClick={() => navigate("/ritual")}
              className="btn-primary-luxury"
            >
              Begin the Signature Ritual
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
