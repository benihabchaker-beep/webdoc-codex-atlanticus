// Sections (Strict 7-step structure)
import HeroSection from "@/components/sections/HeroSection";
import CodexConstellation from "@/components/sections/CodexConstellation";
import ProblemSection from "@/components/sections/ProblemSection";
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

export default function Home() {
  return (
    <UIProvider>
      <main className="bg-[#0f1014] min-h-screen text-slate-300 selection:bg-cyan-500/30">

        {/* Global Atmospherics */}
        <NoiseOverlay />
        <CustomCursor />
        <AudioPlayer />
        <StickyNav />

        {/* 1. INTRODUCTION */}
        <HeroSection />

        {/* 1.5. DATA VISUALIZATION (CORPUS) */}
        <CodexConstellation />

        {/* BRIDGE 1 */}
        <NarrativeBridge text="Face à l'urgence, les solutions actuelles échouent. Pourquoi ?" />

        {/* 2. PROBLÉMATIQUE */}
        <ProblemSection />

        {/* 3. ÉTAT DE L'ART */}
        <StateOfArt />

        {/* BRIDGE 2 */}
        <NarrativeBridge text="Si l'image ne suffit pas, il faut repenser la nature même de l'archive." />

        {/* 4. HYPOTHÈSE (PIVOT) */}
        <HypothesisSection />

        {/* BRIDGE 3 */}
        <NarrativeBridge text="Comment transformer cette théorie en une machine fonctionnelle ?" />

        {/* 4.5 MÉTHODOLOGIE */}
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
    </UIProvider>
  );
}
