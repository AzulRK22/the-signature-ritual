import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JourneyProvider } from "@/context/JourneyContext";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import Onboarding from "./pages/Onboarding";
import Profiling from "./pages/Profiling";
import ProfileResult from "./pages/ProfileResult";
import Recommendations from "./pages/Recommendations";
import Ritual from "./pages/Ritual";
import Signature from "./pages/Signature";
import Wardrobe from "./pages/Wardrobe";
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
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profiling" element={<Profiling />} />
              <Route path="/profile-result" element={<ProfileResult />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/ritual" element={<Ritual />} />
              <Route path="/signature" element={<Signature />} />
              <Route path="/wardrobe" element={<Wardrobe />} />
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
