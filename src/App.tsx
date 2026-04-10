import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JourneyProvider } from "@/context/JourneyContext";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import SenseMe from "./pages/SenseMe";
import DecodeMe from "./pages/DecodeMe";
import ScentMirror from "./pages/ScentMirror";
import SkinScentFit from "./pages/SkinScentFit";
import SignatureRitual from "./pages/SignatureRitual";
import Signature from "./pages/Signature";
import AuraCard from "./pages/AuraCard";
import GrowWithMe from "./pages/GrowWithMe";
import Refill from "./pages/Refill";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <JourneyProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/sense-me" element={<SenseMe />} />
              <Route path="/decode-me" element={<DecodeMe />} />
              <Route path="/scent-mirror" element={<ScentMirror />} />
              <Route path="/skin-scent-fit" element={<SkinScentFit />} />
              <Route path="/signature-ritual" element={<SignatureRitual />} />
              <Route path="/signature" element={<Signature />} />
              <Route path="/aura-card" element={<AuraCard />} />
              <Route path="/grow-with-me" element={<GrowWithMe />} />
              <Route path="/refill" element={<Refill />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </JourneyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
