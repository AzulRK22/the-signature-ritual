import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";

const formats = [
  { id: "story", label: "Story", aspect: "aspect-[9/16]", maxW: "max-w-[280px]" },
  { id: "square", label: "Square", aspect: "aspect-square", maxW: "max-w-[320px]" },
  { id: "wallpaper", label: "Wallpaper", aspect: "aspect-[9/19]", maxW: "max-w-[240px]" },
] as const;

export default function AuraCard() {
  const navigate = useNavigate();
  const { profile, signatureScent } = useJourney();
  const [format, setFormat] = useState<string>("story");

  if (!profile) {
    navigate("/sense-me");
    return null;
  }

  const { aura } = profile;
  const currentFormat = formats.find((f) => f.id === format)!;

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">
              Your Aura Card
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              Wear your signature, visually
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
              Your identity, in fragrance form. Share your scent aura with the world.
            </p>
          </motion.div>

          {/* Format switcher */}
          <div className="flex gap-2 justify-center mb-8">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`text-xs font-body px-4 py-2 rounded-full border transition-all duration-300 ${
                  format === f.id ? "border-primary/60 text-amber" : "border-border/30 text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Card preview */}
          <motion.div
            layout
            className={`${currentFormat.aspect} ${currentFormat.maxW} mx-auto rounded-2xl overflow-hidden relative mb-10`}
            style={{ background: `hsl(var(--obsidian-light))` }}
          >
            {/* Background aura */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-3/4 h-3/4 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(${aura.primaryColor} / 0.25), hsl(${aura.secondaryColor} / 0.1) 60%, transparent)`,
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="w-1/2 h-1/2 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle at 30% 30%, hsl(${aura.primaryColor} / 0.4), transparent 70%)`,
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8">
              <div className="text-center">
                <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-body">
                  This is my scent aura
                </p>
              </div>

              <div className="text-center">
                <h2 className="font-display text-3xl font-light text-foreground italic mb-2">
                  {profile.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                  {profile.moodKeywords.map((k) => (
                    <span key={k} className="text-xs px-2.5 py-0.5 rounded-full border border-border/40 text-amber font-body">
                      {k}
                    </span>
                  ))}
                </div>
                {signatureScent && (
                  <p className="text-xs text-muted-foreground font-body">
                    Signature: <span className="text-foreground">{signatureScent.name}</span>
                  </p>
                )}
              </div>

              <div className="text-center">
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body">
                  From hype to signature
                </p>
                <p className="text-[10px] text-muted-foreground/50 font-body mt-1">
                  The Signature Experience
                </p>
              </div>
            </div>

            {/* Border glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: `1px solid hsl(${aura.primaryColor} / 0.2)`,
                boxShadow: `inset 0 0 30px hsl(${aura.primaryColor} / 0.05)`,
              }}
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="btn-primary-luxury">Share to Story</button>
              <button className="btn-outline-luxury">Save My Card</button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="btn-outline-luxury" onClick={() => navigate("/grow-with-me")}>
                Continue to My Wardrobe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
