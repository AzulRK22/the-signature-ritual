import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="intensity-bar">
        <motion.div
          className="intensity-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <p className="text-center text-muted-foreground text-xs mt-3 font-body tracking-widest uppercase">
        {current + 1} of {total}
      </p>
    </div>
  );
}
