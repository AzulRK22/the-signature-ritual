import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JourneyProvider } from "@/context/JourneyContext";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const Landing = lazy(() => import("./pages/Landing"));
const SenseMe = lazy(() => import("./pages/SenseMe"));
const DecodeMe = lazy(() => import("./pages/DecodeMe"));
const ScentMirror = lazy(() => import("./pages/ScentMirror"));
const SkinScentFit = lazy(() => import("./pages/SkinScentFit"));
const SignatureRitual = lazy(() => import("./pages/SignatureRitual"));
const Signature = lazy(() => import("./pages/Signature"));
const AuraCard = lazy(() => import("./pages/AuraCard"));
const GrowWithMe = lazy(() => import("./pages/GrowWithMe"));
const Refill = lazy(() => import("./pages/Refill"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const stageNameByPath: Record<string, string> = {
  "/": "landing",
  "/sense-me": "sense-me",
  "/decode-me": "decode-me",
  "/scent-mirror": "scent-mirror",
  "/skin-scent-fit": "skin-scent-fit",
  "/signature-ritual": "signature-ritual",
  "/signature": "signature",
  "/aura-card": "aura-card",
  "/grow-with-me": "grow-with-me",
  "/refill": "refill",
};

function JourneyAnalytics() {
  const location = useLocation();

  useEffect(() => {
    trackEvent("journey_stage_viewed", {
      path: location.pathname,
      stage: stageNameByPath[location.pathname] ?? "unknown",
    });
  }, [location.pathname]);

  return null;
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <JourneyProvider>
            <BrowserRouter>
              <Analytics />
              <SpeedInsights />
              <JourneyAnalytics />
              <AnimatePresence mode="wait">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sense-me" element={<SenseMe />} />
                    <Route path="/decode-me" element={<DecodeMe />} />
                    <Route path="/scent-mirror" element={<ScentMirror />} />
                    <Route path="/skin-scent-fit" element={<SkinScentFit />} />
                    <Route
                      path="/signature-ritual"
                      element={<SignatureRitual />}
                    />
                    <Route path="/signature" element={<Signature />} />
                    <Route path="/aura-card" element={<AuraCard />} />
                    <Route path="/grow-with-me" element={<GrowWithMe />} />
                    <Route path="/refill" element={<Refill />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </BrowserRouter>
          </JourneyProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
