import { motion } from "framer-motion";
import { Fragrance } from "@/data/mockData";

interface FragranceCardProps {
  fragrance: Fragrance;
  whyFits?: string;
  onSelect?: () => void;
  selected?: boolean;
  large?: boolean;
}

export default function FragranceCard({
  fragrance,
  whyFits,
  onSelect,
  selected,
  large,
}: FragranceCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={`luxury-card cursor-pointer ${selected ? "border-primary/60 glow-amber-soft" : ""} ${large ? "p-8" : ""}`}
      onClick={onSelect}
      role="button"
      aria-pressed={selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.();
        }
      }}
    >
      {/* Color accent bar */}
      <div
        className="w-full h-1 rounded-full mb-5"
        style={{
          background: `linear-gradient(90deg, hsl(${fragrance.color}), hsl(${fragrance.color} / 0.3))`,
        }}
      />

      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-body mb-1">
        {fragrance.brand}
      </p>
      <h3
        className={`font-display ${large ? "text-3xl" : "text-2xl"} font-light text-foreground mb-3`}
      >
        {fragrance.name}
      </h3>

      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
        {fragrance.description}
      </p>

      <div className="space-y-3">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Scent Family
          </p>
          <p className="text-sm text-foreground">{fragrance.scentFamily}</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Key Notes
          </p>
          <div className="flex flex-wrap gap-2">
            {fragrance.keyNotes.map((note) => (
              <span
                key={note}
                className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Intensity
          </p>
          <div className="intensity-bar w-24">
            <div
              className="intensity-bar-fill"
              style={{ width: `${(fragrance.intensity / 5) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">
            Best For
          </p>
          <p className="text-sm text-foreground">{fragrance.bestMoment}</p>
        </div>
      </div>

      {whyFits && (
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs tracking-widest uppercase text-amber mb-1">
            Why This Is You
          </p>
          <p className="text-sm text-foreground/80 italic font-display">
            {whyFits}
          </p>
        </div>
      )}
    </motion.div>
  );
}
