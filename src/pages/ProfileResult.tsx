import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";

export default function ProfileResult() {
  const navigate = useNavigate();
  const { profile } = useJourney();

  if (!profile) {
    navigate("/onboarding");
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-4"
          >
            Your Scent Identity
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-light text-foreground italic mb-6"
          >
            {profile.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/80 font-body leading-relaxed mb-8"
          >
            {profile.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="luxury-card text-left mb-8"
          >
            <div className="space-y-5">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Profile Traits</p>
                <div className="flex flex-wrap gap-2">
                  {profile.traits.map((t) => (
                    <span key={t} className="text-sm px-3 py-1 rounded-full bg-muted text-foreground font-body">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Mood Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {profile.moodKeywords.map((k) => (
                    <span key={k} className="text-sm px-3 py-1 rounded-full border border-border/50 text-amber font-body">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Scent Direction</p>
                <p className="text-sm text-foreground/80 font-display italic leading-relaxed">
                  {profile.scentDirection}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={() => navigate("/recommendations")}
              className="btn-primary-luxury"
            >
              Discover Your Fragrances
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
