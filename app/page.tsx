"use client";

// Sections (Strict 7-step structure)
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import NarrativeJourney from "@/components/sections/NarrativeJourney";
import StateOfArt from "@/components/sections/StateOfArt";
import HypothesisSection from "@/components/sections/HypothesisSection";
import MethodologyTimeline from "@/components/sections/MethodologyTimeline";
import DeepDiveSection from "@/components/sections/DeepDiveSection";
import ResultsGallery from "@/components/sections/ResultsGallery";
import ConclusionSection from "@/components/sections/ConclusionSection";

// Utilities
import NarrativeBridge from "@/components/NarrativeBridge";
import { UIProvider } from "@/components/UIContext";
import NoiseOverlay from "@/components/NoiseOverlay";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";
import StickyNav from "@/components/StickyNav";

// Helper for FadeIn
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [journeyUnlocked, setJourneyUnlocked] = useState(false);

  return (
    <UIProvider>
      <main className="bg-[#0f1014] min-h-screen text-slate-300 selection:bg-cyan-500/30">

        {/* Global Atmospherics */}
        <NoiseOverlay />
        <CustomCursor />
        <AudioPlayer />
        <StickyNav dependency={journeyUnlocked} />

        {/* 1. EMOTION (HERO) */}
        <HeroSection />

        {/* 2. LE SUJET (INTRO) */}
        <IntroSection />

        {/* 3. LE PROBLÈME (NARRATIVE JOURNEY) */}
        <NarrativeJourney onUnlock={() => setJourneyUnlocked(true)} />

        {/* LOCKED CONTENT: ONLY APPEARS AFTER JOURNEY */}
        <AnimatePresence>
          {journeyUnlocked && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

              {/* 4. ÉCHEC DES AUTRES (ÉTAT DE L'ART) */}
              <StateOfArt />

              {/* 5. TRANSITION */}
              <NarrativeBridge text="Si l'image ne suffit pas, il faut repenser la nature même de l'archive." />

              {/* 6. HYPOTHÈSE (PIVOT) */}
              <HypothesisSection />

              {/* TRANSITION */}
              <NarrativeBridge text="Comment transformer cette théorie en une machine fonctionnelle ?" />

              {/* 7. MÉTHODOLOGIE */}
              <MethodologyTimeline />

              {/* 8. DÉMONSTRATION TECHNIQUE */}
              <DeepDiveSection />

              {/* 9. RÉSULTATS */}
              <section id="resultats" className="py-24 bg-[#0a0b0e]">
                <ResultsGallery />
              </section>

              {/* 10. CONCLUSION */}
              <ConclusionSection />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </UIProvider>
  );
}
