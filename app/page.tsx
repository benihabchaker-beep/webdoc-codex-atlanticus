"use client";

import StickyNav from "@/components/StickyNav";
import NoiseOverlay from "@/components/NoiseOverlay";
import AudioPlayer from "@/components/AudioPlayer";
import CustomCursor from "@/components/CustomCursor";

// Sections (Strict 7-step structure)
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import StateOfArt from "@/components/sections/StateOfArt";
import MethodologyTimeline from "@/components/sections/MethodologyTimeline";
import DeepDiveSection from "@/components/sections/DeepDiveSection";
import ResultsGallery from "@/components/sections/ResultsGallery";
import ConclusionSection from "@/components/sections/ConclusionSection";

export default function Home() {
  return (
    <main className="bg-[#0f1014] min-h-screen text-slate-300 selection:bg-cyan-500/30">

      {/* Global Atmospherics */}
      <NoiseOverlay />
      <CustomCursor />
      <AudioPlayer />
      <StickyNav />

      {/* 1. INTRODUCTION */}
      <HeroSection />

      {/* 2. PROBLÉMATIQUE */}
      <ProblemSection />

      {/* 3. ÉTAT DE L'ART */}
      <StateOfArt />

      {/* 4. HYPOTHÈSE & MÉTHODES */}
      <MethodologyTimeline />

      {/* 5. DÉVELOPPEMENT DU SUJET */}
      <DeepDiveSection />

      {/* 6. RÉSULTATS */}
      <section id="resultats" className="py-24 bg-[#0a0b0e]">
        <ResultsGallery />
      </section>

      {/* 7. CONCLUSION */}
      <ConclusionSection />

    </main>
  );
}
