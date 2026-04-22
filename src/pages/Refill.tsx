import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { useJourney } from "@/context/JourneyContext";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { trackEvent } from "@/lib/analytics";

export default function Refill() {
  const navigate = useNavigate();
  const { signatureScent, reset, emailLead, saveEmailLead } = useJourney();
  const { toast } = useToast();
  const [email, setEmail] = useState(emailLead?.address ?? "");
  const [consent, setConsent] = useState(emailLead?.consent ?? true);

  const handleReminderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(normalizedEmail)) {
      toast({
        title: "Add a valid email",
        description: "That lets us send refill reminders and loyalty follow-ups to the right place.",
      });
      return;
    }

    saveEmailLead(normalizedEmail, "refill", consent);
    trackEvent("refill_reminder_requested", {
      signature: signatureScent?.id ?? "unknown",
      consent,
    });
    toast({
      title: "Refill reminder saved",
      description: "Your loyalty and refill updates are now attached to this journey.",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-obsidian px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">Continuity & Care</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">
              Your Next Chapter
            </h1>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Keep your signature alive. Great taste deserves commitment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="luxury-card">
              <p className="text-xs tracking-widest uppercase text-amber mb-3">Refill Service</p>
              <h3 className="font-display text-2xl text-foreground mb-3">
                {signatureScent ? `Refill ${signatureScent.name}` : "Your Signature Refill"}
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Less waste, more certainty. Schedule a refill when you're ready — never run out of your signature.
              </p>
              <form onSubmit={handleReminderSubmit} className="space-y-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="bg-background/60 border-border/40 text-foreground"
                />
                <label className="flex items-start gap-3 text-xs text-muted-foreground font-body">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-border/50 bg-transparent"
                  />
                  <span>Send loyalty reminders, refill nudges, and early-access fragrance drops.</span>
                </label>
                <button type="submit" className="btn-outline-luxury text-xs w-full">
                  {emailLead ? "Update Refill Reminder" : "Set Refill Reminder"}
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="luxury-card">
              <p className="text-xs tracking-widest uppercase text-amber mb-3">Loyalty Journey</p>
              <h3 className="font-display text-2xl text-foreground mb-3">Earn & Evolve</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Every discovery builds your scent intelligence. Unlock exclusive access, early releases, and personalized curation.
              </p>
              <div className="intensity-bar mb-2">
                <div className="intensity-bar-fill" style={{ width: "35%" }} />
              </div>
              <p className="text-xs text-muted-foreground">Explorer Level · 350 / 1000 points</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="luxury-card">
              <p className="text-xs tracking-widest uppercase text-amber mb-3">Next Chapter</p>
              <h3 className="font-display text-2xl text-foreground mb-3">Ready for your next chapter?</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Your taste evolves. Retake the scent identity journey to discover new dimensions of yourself.
              </p>
              <button
                onClick={() => { reset(); navigate("/sense-me"); }}
                className="btn-outline-luxury text-xs"
              >
                Start New Journey
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="luxury-card">
              <p className="text-xs tracking-widest uppercase text-amber mb-3">Intentional Consumption</p>
              <h3 className="font-display text-2xl text-foreground mb-3">Smarter Discovery</h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                Fewer wrong purchases. Less waste. More meaning. Every bottle in your wardrobe is there for a reason.
              </p>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="font-display text-2xl text-amber">87%</p>
                  <p className="text-xs text-muted-foreground">Less trial waste</p>
                </div>
                <div>
                  <p className="font-display text-2xl text-amber">3×</p>
                  <p className="text-xs text-muted-foreground">Higher satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <button onClick={() => navigate("/")} className="btn-outline-luxury">
              Return Home
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
