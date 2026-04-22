import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/useJourney";
import { Slider } from "@/components/ui/slider";

const scaleLabels = [
  { key: "intimate", left: "Intimate", right: "Expressive" },
  { key: "calm", left: "Calm", right: "Magnetic" },
  { key: "soft", left: "Soft", right: "Intense" },
  { key: "day", left: "Day", right: "Night" },
] as const;

export default function ScentMirror() {
  const navigate = useNavigate();
  const { profile, auraScales, setAuraScale, resetAuraScales } = useJourney();
  const [hoverIntensity, setHoverIntensity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setHoverIntensity(Math.sqrt((x - 0.5) ** 2 + (y - 0.5) ** 2) * 2);
  }, []);

  if (!profile) {
    navigate("/sense-me");
    return null;
  }

  const { aura } = profile;
  const displayScales = auraScales ?? aura.scales;
  const averageScale =
    Object.values(displayScales).reduce((total, value) => total + value, 0) /
    Object.values(displayScales).length;
  const displayIntensity = Math.min(
    0.95,
    Math.max(0.35, (aura.intensity + averageScale / 100) / 2),
  );

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
              Your Scent Mirror
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground italic mb-2">
              {profile.title}
            </h1>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">
              {profile.description}
            </p>
          </motion.div>

          {/* Aura visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative w-full aspect-square max-w-sm mx-auto mb-10 cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoverIntensity(0)}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${aura.primaryColor} / ${0.15 + hoverIntensity * 0.1}), transparent 70%)`,
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Mid glow */}
            <motion.div
              className="absolute inset-[15%] rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${aura.secondaryColor} / ${0.2 + hoverIntensity * 0.15}), transparent 65%)`,
              }}
              animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Inner core */}
            <motion.div
              className="absolute inset-[30%] rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(${aura.primaryColor} / ${0.2 + displayIntensity * 0.35}), hsl(${aura.secondaryColor} / 0.1) 80%, transparent)`,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            {/* Particle layers */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: `hsl(${aura.primaryColor})`,
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 30, 0],
                  y: [0, (Math.random() - 0.5) * 30, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>

          {/* Emotional tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-2 justify-center mb-10"
          >
            {profile.moodKeywords.map((k) => (
              <span key={k} className="text-sm px-4 py-1.5 rounded-full border border-border/50 text-amber font-body">
                {k}
              </span>
            ))}
            {profile.traits.slice(0, 2).map((t) => (
              <span key={t} className="text-sm px-4 py-1.5 rounded-full bg-muted text-foreground font-body">
                {t}
              </span>
            ))}
          </motion.div>

          {/* Hype reframe */}
          {profile.hypeReframe && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="luxury-card text-center mb-8"
            >
              <p className="text-xs tracking-widest uppercase text-amber mb-2">From Hype to Signature</p>
              <p className="text-sm text-foreground/80 font-display italic leading-relaxed">
                {profile.hypeReframe}
              </p>
            </motion.div>
          )}

          {/* Visual scales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="luxury-card mb-10"
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-6 text-center">
              Your Scent Identity Spectrum
            </p>
            <div className="space-y-5">
              {scaleLabels.map(({ key, left, right }) => (
                <div key={key}>
                  <div className="flex justify-between text-xs text-muted-foreground font-body mb-1.5">
                    <span>{left}</span>
                    <span>{right}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Slider
                        value={[displayScales[key]]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={([value]) => setAuraScale(key, value)}
                      />
                    </div>
                    <span className="text-xs text-amber w-8 text-right">
                      {displayScales[key]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-muted-foreground font-body">
                Tune the mirror until it feels like your real aura, not just the system's first read.
              </p>
              <button onClick={resetAuraScales} className="btn-outline-luxury text-xs">
                Reset Scales
              </button>
            </div>
          </motion.div>

          {/* Scent direction */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mb-10"
          >
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Scent Direction</p>
            <p className="font-display text-lg italic text-foreground/80 max-w-md mx-auto">
              {profile.scentDirection}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button onClick={() => navigate("/skin-scent-fit")} className="btn-primary-luxury">
              Reveal My Signature Fragrances
            </button>
            <button onClick={() => navigate("/sense-me")} className="btn-outline-luxury">
              Refine My Fit
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
