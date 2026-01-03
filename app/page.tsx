"use client";

import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HypothesisSection from "@/components/HypothesisSection";
import MethodologyFlow from "@/components/MethodologyFlow";
import OAISLab from "@/components/OAISLab";
import NeuralDecoder from "@/components/NeuralDecoder";
import ResultsGallery from "@/components/ResultsGallery";
import EthicsFooter from "@/components/EthicsFooter";

import VideoSection from "@/components/VideoSection"; // Keeping this for the 'context' block
import GlobalOverlay from "@/components/GlobalOverlay";
import NavigationDock from "@/components/NavigationDock";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden selection:bg-cyan-500/30 font-sans">
      <GlobalOverlay />
      <CustomCursor />
      <AudioPlayer />
      <NavigationDock />

      {/* 1. INTRODUCTION */}
      <section id="introduction">
        <HeroSection />
      </section>

      {/* 2. PROBLEMATIQUE (L'Enquête) */}
      <ProblemSection />

      {/* 3. HYPOTHESE */}
      <HypothesisSection />

      {/* 4. METHODOLOGIE (Horizontal Scroll) */}
      <MethodologyFlow />

      {/* 5. DEVELOPPEMENT (Le Cœur) */}
      <section id="development" className="relative border-t border-slate-900 bg-[#0a0b0e]">

        <div className="py-24 text-center">
          <span className="text-cyan-600 font-mono text-xs tracking-widest uppercase mb-2 block">
            V. SYSTÈME TECHNIQUE
          </span>
          <h2 className="text-4xl md:text-5xl text-slate-100 font-serif">Le Double Numérique</h2>
        </div>

        {/* A. Le Labo (Gamification) */}
        <div className="relative border-b border-slate-900/50">
          <OAISLab />
          <div className="absolute right-8 top-12 text-slate-700 font-mono text-xs rotate-90 origin-right">PHASE_01::SÉCURISATION</div>
        </div>

        {/* B. Le Décodeur (Science) */}
        <div className="relative border-b border-slate-900/50">
          <NeuralDecoder />
          <div className="absolute right-8 top-12 text-slate-700 font-mono text-xs rotate-90 origin-right">PHASE_02::INTELLIGENCE</div>
        </div>

        {/* C. Le Contexte (Histoire) */}
        <div className="relative py-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-slate-400">Le Geste Originel</h3>
          </div>
          <VideoSection />
        </div>
      </section>

      {/* 6. RESULTATS */}
      <ResultsGallery />

      {/* 7. ETHIQUE & CONCLUSION */}
      <EthicsFooter />

    </main>
  );
}
