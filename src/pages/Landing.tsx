import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { FormEvent, useState } from "react";
import PageTransition from "@/components/PageTransition";
import heroImage from "@/assets/hero-fragrance.jpg";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useJourney } from "@/context/useJourney";
import { trackEvent } from "@/lib/analytics";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { saveEmailLead, emailLead } = useJourney();
  const [email, setEmail] = useState(emailLead?.address ?? "");
  const [consent, setConsent] = useState(emailLead?.consent ?? true);

  const handleStartJourney = () => {
    trackEvent("journey_started", {
      has_email: Boolean(emailLead?.address),
    });
    navigate("/sense-me");
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(normalizedEmail)) {
      toast({
        title: "Please enter a valid email",
        description: "We use it for reminders, loyalty updates, and signature follow-ups.",
      });
      return;
    }

    saveEmailLead(normalizedEmail, "landing", consent);
    toast({
      title: "Email saved",
      description: "We will keep your progress and send only the fragrance updates you opted into.",
    });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>The Signature Experience - Luxury Fragrance Discovery</title>
        <meta
          name="description"
          content="Transform fragrance discovery from hype to signature. A luxury fragrance confidence system for L'Oréal Luxe."
        />
        <meta
          name="keywords"
          content="fragrance, luxury, signature, scent, L'Oréal"
        />
      </Helmet>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-obsidian" />
        <div className="absolute inset-0 gradient-radial-amber opacity-60" />

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Elegant fragrance bottle with amber glow"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </motion.div>

        <motion.div
          className="absolute w-96 h-96 rounded-full animate-glow-pulse"
          style={{
            background:
              "radial-gradient(circle, hsl(36 60% 50% / 0.15), transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase text-muted-foreground font-body mb-6"
          >
            L'Oréal Luxe Innovation
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-7xl font-light text-foreground leading-[1.1] mb-4"
          >
            {t("Welcome to The Signature Experience")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl font-display italic text-muted-foreground mb-2"
          >
            {t("From hype to signature.")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-sm text-muted-foreground font-body leading-relaxed max-w-md mx-auto mb-10"
          >
            A luxury fragrance confidence system. Discover the scent that feels
            like you through identity, intelligent fit, and personal ritual.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleStartJourney}
              className="btn-primary-luxury"
            >
              Begin Your Scent Journey
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("concept")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-luxury"
            >
              Explore the Experience
            </button>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            onSubmit={handleEmailSubmit}
            className="mt-8 luxury-card text-left max-w-xl mx-auto"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-3">
              Save My Journey
            </p>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
              Leave your email to save your fragrance progress for later, unlock loyalty reminders, and stay close to your future signature.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="bg-background/60 border-border/40 text-foreground"
              />
              <button type="submit" className="btn-outline-luxury whitespace-nowrap">
                {emailLead ? "Update Email" : "Save Progress"}
              </button>
            </div>
            <label className="mt-4 flex items-start gap-3 text-xs text-muted-foreground font-body">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-border/50 bg-transparent"
              />
              <span>I want loyalty reminders, signature follow-ups, and early access updates.</span>
            </label>
          </motion.form>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5, y: [0, 8, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
        </motion.div>
      </div>

      <section id="concept" className="bg-obsidian py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-amber font-body mb-4">
              The Promise
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground mb-6">
              Less guesswork. More meaning.
            </h2>
            <p className="text-muted-foreground font-body max-w-lg mx-auto">
              Your identity, translated through fragrance. A confidence system
              that goes beyond trends to find what truly resonates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Identity", desc: "Know your scent language" },
              { title: "Confidence", desc: "Choose with certainty" },
              { title: "Scent Mirror", desc: "Visualize your aura" },
              { title: "Skin Fit", desc: "Intelligent precision" },
              { title: "Ritual", desc: "Decide with meaning" },
              { title: "Wardrobe", desc: "Build a collection" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="luxury-card text-center"
              >
                <h3 className="font-display text-lg text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
