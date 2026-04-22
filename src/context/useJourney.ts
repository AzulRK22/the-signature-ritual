import { useContext } from "react";
import { JourneyContext } from "@/context/journey-context";

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error("useJourney must be used within JourneyProvider");
  }

  return ctx;
}
