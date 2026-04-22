import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JourneyProvider } from "@/context/JourneyContext";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { HelmetProvider } from "react-helmet-async";

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

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <JourneyProvider>
            <BrowserRouter>
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
