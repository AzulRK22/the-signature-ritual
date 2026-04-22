# The Signature Experience - Recomendaciones Técnicas Detalladas

## 🔧 **Implementación: Prioridad & Esfuerzo**

---

## **TIER 1: CRÍTICO (Hacer primero - 2-3 sprints)**

### 1️⃣ **Email Capture & Persistence**

#### Problema
- Landing + Refill generan intención pero no capturan email
- Sin persistencia → cada reload = restart del journey
- No hay retargeting posible

#### Solución
```typescript
// components/EmailCaptureModal.tsx
export function EmailCaptureModal({ 
  stage, 
  onSubscribe 
}: { 
  stage: string; 
  onSubscribe: (email: string) => void 
}) {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  
  // Trigger en Landing after 3s o SkinScentFit after completion
  useEffect(() => {
    if (stage === "landing") {
      setTimeout(() => setShowModal(true), 3000);
    } else if (stage === "skin-scent-fit-complete") {
      setShowModal(true);
    }
  }, [stage]);

  const handleSubscribe = async () => {
    // POST to /api/subscribers
    const res = await fetch("/api/subscribers", {
      method: "POST",
      body: JSON.stringify({ email, stage, timestamp: new Date() })
    });
    
    // Store in localStorage as proof
    localStorage.setItem("subscriber_email", email);
    onSubscribe(email);
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <motion.div className="luxury-card max-w-sm">
            <h3 className="font-display text-xl text-foreground mb-3">
              Unlock Your Scent Journey
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get early access to seasonal releases, loyalty rewards, and exclusive insights.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full mb-4"
            />
            <div className="flex gap-2">
              <button onClick={handleSubscribe} className="btn-primary-luxury flex-1">
                Subscribe
              </button>
              <button onClick={() => setShowModal(false)} className="btn-outline-luxury flex-1">
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### Backend (pseudocode)
```typescript
// POST /api/subscribers
export async function subscribeUser(req, res) {
  const { email, stage, timestamp } = req.body;
  
  // Validate email
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  
  // Save to database
  const subscriber = await db.subscribers.create({
    email,
    subscriptionStage: stage,
    subscribedAt: new Date(timestamp),
    locale: req.headers['accept-language'],
    source: "journey"
  });
  
  // Add to email list (Mailchimp/Klaviyo)
  await emailService.addToList(email, "signature-experience");
  
  // Send welcome email (async)
  await emailQueue.add({
    type: "welcome",
    email,
    stage
  });
  
  return res.json({ success: true, subscriberId: subscriber.id });
}
```

#### Integración con localStorage
```typescript
// lib/persistence.ts
export function saveJourneyState(state: Partial<JourneyState>) {
  const timestamp = new Date().toISOString();
  const payload = {
    ...state,
    savedAt: timestamp,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 días
  };
  
  localStorage.setItem("journey_state_v1", JSON.stringify(payload));
}

export function loadJourneyState(): Partial<JourneyState> | null {
  const stored = localStorage.getItem("journey_state_v1");
  if (!stored) return null;
  
  const payload = JSON.parse(stored);
  
  // Check expiration
  if (new Date(payload.expiresAt) < new Date()) {
    localStorage.removeItem("journey_state_v1");
    return null;
  }
  
  return payload;
}

// En JourneyProvider
export function JourneyProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>(() => {
    const saved = loadJourneyState();
    return saved?.answers || {};
  });
  
  const [skinFit, setSkinFit] = useState<Partial<SkinFitAnswers>>(() => {
    const saved = loadJourneyState();
    return saved?.skinFit || {};
  });
  
  // Auto-save en cada cambio
  useEffect(() => {
    saveJourneyState({
      answers,
      skinFit,
      profile,
      signatureScent,
      wardrobe
    });
  }, [answers, skinFit, profile, signatureScent, wardrobe]);
  
  // ... resto del código
}
```

#### Duración: **4-6 hrs** | ROI: **+20-25% CLTV**

---

### 2️⃣ **Sensivity Mode - Implementación Real**

#### Problema
- Toggle existe pero no cambia nada
- Beneficiaria: usuarios con parálisis por análisis

#### Solución
```typescript
// context/JourneyContext.tsx - agregar
const [sensitivityMode, setSensitivityMode] = useState(false);

// pages/SenseMe.tsx - modificar
export default function SenseMe() {
  const { sensitivityMode } = useJourney();
  
  // Filtrar preguntas si sensitivity activado
  const filteredSteps = sensitivityMode 
    ? onboardingSteps.map(step => ({
        ...step,
        options: step.options.slice(0, 3) // Solo 3 opciones máximo
      }))
    : onboardingSteps;
  
  // Simplificar descripciones
  const step = filteredSteps[currentStep];
  const simplifiedStep = sensitivityMode
    ? {
        ...step,
        subtitle: step.subtitle.replace(/\?.*/, ""), // Shorter subtitle
        options: step.options.map(opt => ({
          ...opt,
          description: opt.description.slice(0, 30) + "..." // Shorter desc
        }))
      }
    : step;
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex flex-col">
        <div className="pt-8 pb-4 px-6 flex items-center justify-between">
          {/* ... */}
          <button
            onClick={() => setSensitivityMode(!sensitivityMode)}
            className={`text-xs font-body px-3 py-1 rounded-full border transition-all ${
              sensitivityMode ? "border-primary/60 text-amber" : "border-border/30 text-muted"
            }`}
          >
            {sensitivityMode 
              ? "✓ Simplified Mode" 
              : "Sensitivity Mode"}
          </button>
        </div>
        {/* Render simplified step */}
      </div>
    </PageTransition>
  );
}
```

#### Analytics
```typescript
// Tracking
const handleSelect = (value: string) => {
  analyticsQueue.push({
    event: "senseme_selection",
    properties: {
      question_index: step,
      option: value,
      sensitivity_mode: sensitivityMode,
      time_to_select: Date.now() - questionStartTime
    }
  });
  
  // Continue...
};
```

#### Duración: **2-3 hrs** | ROI: **+5-8% completion rate (para segment vulnerable)**

---

### 3️⃣ **Analytics Setup & Event Tracking**

#### Estructura de eventos
```typescript
// lib/analytics.ts
import { analytics } from "@/lib/mixpanel"; // o Amplitude

export const journeyEvents = {
  // Landing
  LANDING_VIEWED: "landing:viewed",
  LANDING_CTA_CLICKED: "landing:cta_clicked",
  
  // Sense Me
  SENSEME_STARTED: "senseme:started",
  SENSEME_QUESTION_ANSWERED: "senseme:question_answered",
  SENSEME_COMPLETED: "senseme:completed",
  
  // Decode Me
  DECODEME_STARTED: "decodeme:started",
  DECODEME_COMPLETED: "decodeme:completed",
  
  // Scent Mirror
  SCENTMIRROR_VIEWED: "scentmirror:viewed",
  SCENTMIRROR_INTERACTED: "scentmirror:interacted",
  
  // Skin Fit
  SKINFITCOMPLETED: "skinfit:completed",
  
  // Signature Ritual
  SIGRITUAL_FRAGRANCE_SELECTED: "sigritual:fragrance_selected",
  SIGRITUAL_COMPLETED: "sigritual:completed",
  
  // Signature
  SIGNATURE_CONFIRMED: "signature:confirmed",
  
  // Aura Card
  AURACARD_VIEWED: "auracard:viewed",
  AURACARD_SHARED: "auracard:shared",
  AURACARD_FORMAT_CHANGED: "auracard:format_changed",
  
  // Grow With Me
  WARDROBE_VIEWED: "wardrobe:viewed",
  
  // Refill
  REFILL_VIEWED: "refill:viewed",
  REFILL_REMINDER_SET: "refill:reminder_set"
};

// Helper
export function trackEvent(
  eventName: string, 
  properties?: Record<string, any>
) {
  analytics.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
    locale: navigator.language,
    userAgent: navigator.userAgent.slice(0, 50)
  });
}
```

#### Implementación por página
```typescript
// pages/SenseMe.tsx
useEffect(() => {
  trackEvent(journeyEvents.SENSEME_STARTED, {
    sensitivity_mode: sensitivityMode
  });
}, [sensitivityMode]);

const handleSelect = (value: string) => {
  trackEvent(journeyEvents.SENSEME_QUESTION_ANSWERED, {
    question_index: step,
    question_key: current.key,
    answer: value,
    time_spent_ms: Date.now() - questionStartTime
  });
  // ...
};

// On completion
const handleNavigateNext = () => {
  if (step === onboardingSteps.length - 1) {
    trackEvent(journeyEvents.SENSEME_COMPLETED, {
      total_time_ms: Date.now() - journeyStartTime,
      answers: answers
    });
  }
};
```

#### Dashboard (pseudocode - Mixpanel)
```
Funnel: Landing → SenseMe → Decode → ScentMirror → SkinFit → SigRitual → Signature
- Landing → SenseMe: 45% (drop 55%)
- SenseMe → Decode: 92% (drop 8%)
- Decode → ScentMirror: 98% (drop 2%)
- ScentMirror → SkinFit: 88% (drop 12%) ← optimization needed
- SkinFit → SigRitual: 95% (drop 5%)
- SigRitual → Signature: 87% (drop 13%) ← users re-exploring

Cohort analysis:
- Beginners: 35% completion
- Enthusiasts: 72% completion
- → Tailor experience por familiarity
```

#### Duración: **6-8 hrs** | ROI: **Critical for optimization**

---

## **TIER 2: MEJORA UX (1-2 sprints)**

### 4️⃣ **Live Confidence Scores en SkinScentFit**

#### Problema
- Usuarios solo ven scores al final
- No hay feedback progresivo mientras responden

#### Solución
```typescript
// pages/SkinScentFit.tsx
export default function SkinScentFit() {
  const { skinFit, setSkinFitAnswer, recommendations, profile } = useJourney();
  const [liveScores, setLiveScores] = useState<ConfidenceScores[] | null>(null);
  
  const handleSelect = (value: string) => {
    setSkinFitAnswer(current.key as keyof SkinFitAnswers, value);
    
    // Compute live scores
    if (recommendations.length > 0) {
      const updatedFit = { ...skinFit, [current.key]: value };
      const newScores = recommendations.map(frag => 
        computeConfidenceScores(frag, profile!, updatedFit)
      );
      setLiveScores(newScores);
    }
    
    // Continue logic...
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex flex-col">
        {/* Progress bar */}
        <div className="px-6 py-4">
          <ProgressBar current={step} total={skinFitSteps.length} />
        </div>
        
        <div className="flex-1 grid md:grid-cols-3 gap-4 px-6 pb-12">
          {/* Left: Current question */}
          <div className="md:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div key={step} className="text-center">
                <h2 className="font-display text-2xl text-foreground mb-4">
                  {current.title}
                </h2>
                <div className="grid gap-2">
                  {current.options.map(opt => (
                    <motion.button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`selection-card ${
                        selected === opt.value ? "selected" : ""
                      }`}
                    >
                      {opt.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Right: Live scores preview */}
          {liveScores && (
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-xs tracking-widest text-amber mb-4">
                TOP MATCHES UPDATE
              </p>
              <div className="grid gap-3">
                {recommendations.map((frag, i) => {
                  const scores = liveScores[i];
                  return (
                    <motion.div
                      key={frag.id}
                      className="luxury-card"
                      layout
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-lg text-foreground">
                          {frag.name}
                        </h3>
                        <span className="text-amber font-display">
                          {scores.signature}%
                        </span>
                      </div>
                      <div className="intensity-bar">
                        <motion.div
                          className="intensity-bar-fill"
                          animate={{ width: `${scores.signature}%` }}
                          transition={{ type: "spring", stiffness: 50 }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {scores.everyday}% everyday · {scores.evening}% evening
                      </p>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Insight note */}
              <motion.div
                className="luxury-card mt-4 bg-muted/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs text-muted-foreground">
                  💡 <span className="text-amber">Insight:</span> Your{" "}
                  {skinFit.skinType === "oily" ? "oily skin" : "skin"} preference
                  is boosting intense fragrances.
                </p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
```

#### Duración: **5-7 hrs** | ROI: **+10-15% decision confidence**

---

### 5️⃣ **Feedback Loop Post-Signature**

#### Problema
- No hay validación si selección fue acertada
- Sin retro, imposible mejorar algoritmo

#### Solución
```typescript
// pages/Signature.tsx - agregar
export default function Signature() {
  const { signatureScent, profile } = useJourney();
  const [showFeedback, setShowFeedback] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  
  const handleConfidenceFeedback = async (level: 1 | 2 | 3 | 4 | 5) => {
    setConfidence(level);
    
    // POST to backend
    await fetch("/api/journey-feedback", {
      method: "POST",
      body: JSON.stringify({
        journeyId: localStorage.getItem("journey_id"),
        profileId: profile?.id,
        signatureFragranceId: signatureScent?.id,
        confidenceLevel: level,
        timestamp: new Date(),
        sessionDuration: Date.now() - journeyStartTime
      })
    });
    
    // Show encouragement
    setTimeout(() => setShowFeedback(true), 1000);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full text-center">
          {/* Existing signature display... */}
          
          {/* Confidence prompt (new) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="luxury-card mt-8"
          >
            <p className="text-sm text-muted-foreground mb-4">
              How confident are you in this choice?
            </p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(level => (
                <motion.button
                  key={level}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleConfidenceFeedback(level as any)}
                  className={`w-10 h-10 rounded-full border transition-all ${
                    confidence === level
                      ? "bg-amber border-amber text-obsidian"
                      : "border-border/50 text-muted-foreground hover:border-amber"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Encouragement after feedback */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center mt-4"
              >
                {confidence! >= 4 ? (
                  <>
                    <p className="text-amber font-display text-lg mb-2">
                      Excellent! 🎉
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You're among 78% of {profile?.title} users who are
                      highly confident.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-amber font-display text-lg mb-2">
                      Let's refine it
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <button
                        onClick={() => navigate("/signature-ritual")}
                        className="underline hover:text-foreground"
                      >
                        Go back & explore alternatives
                      </button>
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Rest of page... */}
        </div>
      </div>
    </PageTransition>
  );
}
```

#### Duración: **3-4 hrs** | ROI: **Data-driven algorithm improvement**

---

## **TIER 3: MEJORA PROFUNDA (2-3 sprints)**

### 6️⃣ **Comparador de Fragancias lado a lado**

#### Problema
- Usuarios seleccionan ciegamente entre 3 opciones
- No hay forma de comparar directamente

#### Solución
```typescript
// pages/SignatureRitual.tsx - agregar mode
const [compareMode, setCompareMode] = useState(false);
const [compared, setCompared] = useState<[Fragrance, Fragrance] | null>(null);

return (
  <PageTransition>
    <div className="min-h-screen bg-obsidian px-6 py-16">
      {/* Toggle button */}
      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setCompareMode(false)}
          className={`btn ${!compareMode ? "btn-primary" : "btn-outline"}`}
        >
          View Mode
        </button>
        <button
          onClick={() => setCompareMode(true)}
          className={`btn ${compareMode ? "btn-primary" : "btn-outline"}`}
        >
          Compare Mode
        </button>
      </div>
      
      {!compareMode ? (
        // Original grid display
        <div className="grid md:grid-cols-3 gap-4">
          {/* ...existing grid... */}
        </div>
      ) : (
        // Comparison view
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {compared && compared.map(frag => (
              <div key={frag.id} className="luxury-card">
                {/* Left: Fragrance A */}
                <h3 className="font-display text-2xl text-foreground mb-4">
                  {frag.name}
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Brand</p>
                    <p className="text-foreground">{frag.brand}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Family</p>
                    <p className="text-foreground">{frag.scentFamily}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Key Notes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {frag.keyNotes.map(n => (
                        <span key={n} className="px-2 py-1 rounded bg-muted text-xs">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Intensity</p>
                    <div className="intensity-bar h-2">
                      <div
                        className="intensity-bar-fill h-full"
                        style={{ width: `${(frag.intensity / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-amber mt-1">{frag.intensity}/5</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Best Moment</p>
                    <p className="text-foreground">{frag.bestMoment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comparison summary */}
          <motion.div className="luxury-card mt-6">
            <h3 className="font-display text-lg text-foreground mb-4">
              Side-by-Side Comparison
            </h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Projection</td>
                  <td className="py-2 text-foreground">
                    {compared![0].intensity > compared![1].intensity ? (
                      <>
                        <span className="text-amber">{compared![0].name}</span>
                        {" is more intense"}
                      </>
                    ) : (
                      <>
                        <span className="text-amber">{compared![1].name}</span>
                        {" is more intense"}
                      </>
                    )}
                  </td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-2 text-muted-foreground">Best For</td>
                  <td className="py-2 text-foreground">
                    {compared![0].wardrobeCategory === "evening" ? (
                      <>
                        <span className="text-amber">{compared![0].name}</span>
                        {" for night"}
                      </>
                    ) : (
                      <>
                        <span className="text-amber">{compared![1].name}</span>
                        {" for night"}
                      </>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </div>
  </PageTransition>
);
```

#### Duración: **6-8 hrs** | ROI: **+8-12% user satisfaction**

---

### 7️⃣ **Slot Interactivity en Grow With Me**

#### Problema
- Wardrobe slots son estáticos
- Usuarios pueden no estar contentos con asignación automática

#### Solución
```typescript
// components/WardrobeSlot.tsx - hacer interactivo
interface WardrobeSlotProps {
  label: string;
  fragrance: Fragrance | null;
  slotKey: string;
  onSwap: (slotKey: string, fragrance: Fragrance | null) => void;
  allFragrances: Fragrance[];
}

export function WardrobeSlot({
  label,
  fragrance,
  slotKey,
  onSwap,
  allFragrances
}: WardrobeSlotProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);
  
  return (
    <div className="luxury-card relative group">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">
          {label}
        </p>
        {fragrance && (
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="text-xs text-amber hover:text-foreground transition"
          >
            {showAlternatives ? "Hide" : "Change"}
          </button>
        )}
      </div>
      
      {fragrance ? (
        <>
          <h3 className="font-display text-lg text-foreground">{fragrance.name}</h3>
          {/* ...existing display... */}
          
          {/* Alternatives dropdown */}
          <AnimatePresence>
            {showAlternatives && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 pt-4 border-t border-border/30"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  Other options:
                </p>
                <div className="grid gap-2">
                  {allFragrances
                    .filter(f => f.id !== fragrance.id)
                    .slice(0, 3)
                    .map(alt => (
                      <button
                        key={alt.id}
                        onClick={() => {
                          onSwap(slotKey, alt);
                          setShowAlternatives(false);
                        }}
                        className="p-2 rounded bg-muted/50 text-left hover:bg-muted transition text-sm"
                      >
                        <p className="text-foreground font-display">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.brand}</p>
                      </button>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <p className="text-sm text-muted-foreground italic">
            Awaiting discovery…
          </p>
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="mt-2 text-xs text-amber hover:text-foreground transition"
          >
            Suggest options
          </button>
          
          <AnimatePresence>
            {showAlternatives && (
              <motion.div className="mt-4 pt-4 border-t border-border/30">
                <div className="grid gap-2">
                  {allFragrances.slice(0, 3).map(alt => (
                    <button
                      key={alt.id}
                      onClick={() => {
                        onSwap(slotKey, alt);
                        setShowAlternatives(false);
                      }}
                      className="p-2 rounded bg-muted/50 text-left hover:bg-muted transition text-sm"
                    >
                      <p className="text-foreground font-display">{alt.name}</p>
                      <p className="text-xs text-muted-foreground">{alt.brand}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

// En GrowWithMe.tsx
const [wardrobe, setWardrobe] = useState(initialWardrobe);

const handleSwapFragrance = (slotKey: string, newFragrance: Fragrance | null) => {
  setWardrobe(prev => ({
    ...prev,
    [slotKey]: newFragrance
  }));
  
  // Analytics
  trackEvent("wardrobe:fragrance_swapped", {
    slotKey,
    newFragranceId: newFragrance?.id || null
  });
};
```

#### Duración: **5-6 hrs** | ROI: **+5-10% wardrobe satisfaction**

---

## **TIER 4: INFRAESTRUCTURA BACKEND (3-4 sprints)**

### 8️⃣ **Loyalty Backend MVP**

#### Pseudocode de implementación
```typescript
// Backend: models/Loyalty.ts
export interface LoyaltyAccount {
  userId: string;
  points: number;
  tier: "Explorer" | "Curator" | "Connoisseur";
  createdAt: Date;
  
  // Milestones
  milestones: {
    firstProfileCreated: boolean;
    firstSignatureChosen: boolean;
    wardrobeCompleted: boolean;
    refillSet: boolean;
    friendReferred: boolean;
  };
  
  // Referrals
  referralCode: string;
  referredCount: number;
}

export interface PointsTransaction {
  userId: string;
  points: number;
  type: "purchase" | "referral" | "milestone" | "engagement";
  description: string;
  timestamp: Date;
}

// POST /api/loyalty/init
export async function initializeLoyalty(userId: string) {
  const account = new LoyaltyAccount({
    userId,
    points: 0,
    tier: "Explorer",
    referralCode: generateCode(userId),
    createdAt: new Date()
  });
  
  await account.save();
  return account;
}

// POST /api/loyalty/add-points
export async function addPoints(
  userId: string,
  points: number,
  type: string,
  description: string
) {
  const account = await LoyaltyAccount.findOne({ userId });
  account.points += points;
  
  // Check tier upgrade
  if (account.points >= 150 && account.tier === "Explorer") {
    account.tier = "Curator";
    // Send email: tier upgrade
  }
  if (account.points >= 500 && account.tier === "Curator") {
    account.tier = "Connoisseur";
    // Send email: tier upgrade
  }
  
  const transaction = new PointsTransaction({
    userId,
    points,
    type,
    description,
    timestamp: new Date()
  });
  
  await Promise.all([account.save(), transaction.save()]);
  return account;
}

// GET /api/loyalty/account/:userId
export async function getLoyaltyAccount(userId: string) {
  return await LoyaltyAccount.findOne({ userId });
}

// POST /api/loyalty/redeem
export async function redeemPoints(userId: string, pointsToRedeem: number) {
  const account = await LoyaltyAccount.findOne({ userId });
  
  if (account.points < pointsToRedeem) {
    throw new Error("Insufficient points");
  }
  
  account.points -= pointsToRedeem;
  
  // Create coupon or discount code
  const couponValue = (pointsToRedeem / 100) * 5; // 100 pts = $5
  const coupon = new Coupon({
    code: generateCouponCode(),
    userId,
    value: couponValue,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    redeemed: false
  });
  
  await Promise.all([account.save(), coupon.save()]);
  return coupon;
}
```

#### Frontend integration
```typescript
// pages/Refill.tsx - Refactor with backend
export default function Refill() {
  const [loyaltyData, setLoyaltyData] = useState<LoyaltyAccount | null>(null);
  
  useEffect(() => {
    const fetchLoyalty = async () => {
      const userId = localStorage.getItem("user_id");
      const res = await fetch(`/api/loyalty/account/${userId}`);
      setLoyaltyData(await res.json());
    };
    
    fetchLoyalty();
  }, []);
  
  const handleRedeemPoints = async (pointsToRedeem: number) => {
    const userId = localStorage.getItem("user_id");
    const res = await fetch("/api/loyalty/redeem", {
      method: "POST",
      body: JSON.stringify({ userId, pointsToRedeem })
    });
    
    const coupon = await res.json();
    // Copy to clipboard & show success
    navigator.clipboard.writeText(coupon.code);
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        {loyaltyData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto mb-10"
          >
            <div className="luxury-card">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs tracking-widest text-amber">Loyalty Status</p>
                <span className="text-2xl">{getTierEmoji(loyaltyData.tier)}</span>
              </div>
              
              <h2 className="font-display text-3xl text-foreground mb-2">
                {loyaltyData.tier} Level
              </h2>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {loyaltyData.points} / {getTierThreshold(loyaltyData.tier)}
                  </span>
                </div>
                <div className="intensity-bar">
                  <motion.div
                    className="intensity-bar-fill"
                    animate={{
                      width: `${
                        (loyaltyData.points / getTierThreshold(loyaltyData.tier)) *
                        100
                      }%`
                    }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => handleRedeemPoints(100)}
                disabled={loyaltyData.points < 100}
                className="btn-primary-luxury w-full"
              >
                Redeem 100 Points ($5 off)
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}

function getTierEmoji(tier: string) {
  return { Explorer: "🌍", Curator: "🎯", Connoisseur: "👑" }[tier];
}

function getTierThreshold(tier: string) {
  return { Explorer: 150, Curator: 500, Connoisseur: Infinity }[tier];
}
```

#### Duración: **10-12 hrs** | ROI: **+30-40% repeat purchase rate**

---

## 🎯 **Resumen de Roadmap de Implementación**

| Priority | Feature | Hours | ROI | Dependencies |
|----------|---------|-------|-----|--------------|
| **1** | Email capture + persistence | 6 | +20% CLTV | None |
| **1** | Sensitivity mode implementation | 3 | +5% completion | SenseMe |
| **1** | Analytics setup | 8 | Critical | None |
| **2** | Live confidence scores | 6 | +10% confidence | SkinScentFit |
| **2** | Feedback loop | 4 | Data insights | Signature |
| **2** | Comparador fragancias | 7 | +10% satisfaction | SigRitual |
| **3** | Wardrobe slot interactivity | 6 | +5% satisfaction | GrowWithMe |
| **3** | Loyalty backend MVP | 12 | +30% repeat | None (pero separate) |

**Total TIER 1-3: ~52 horas (~2 sprints de 2 semanas)**
**TIER 4: +1 sprint adicional**

---

Esta es la hoja de ruta técnica completa. ¿Necesitas profundización en alguna área específica?
