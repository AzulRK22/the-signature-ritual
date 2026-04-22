import { createContext } from "react";
import type { JourneyState } from "@/types";

export const JourneyContext = createContext<JourneyState | null>(null);
