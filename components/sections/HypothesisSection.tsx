"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Database, Sparkles } from "lucide-react";
import { useUI } from "@/components/UIContext";

export default function HypothesisSection() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.5 });
    const { setGrainIntensity } = useUI();

    // Effect: Cleaner grain when arriving here (Moment of clarity)
    useEffect(() => {
        if (isInView) {
            setGrainIntensity(0.05); // Clean digital
        }
    }, [isInView, setGrainIntensity]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-[#0f1014] overflow-hidden py-24">

            {/* Background Fusion */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                {/* Left: Structure (OAIS) */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: "-10%", opacity: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-[800px] h-[800px] border border-amber-500/20 rounded-full flex items-center justify-center"
                >
                    <div className="w-2/3 h-2/3 border border-amber-500/40 rotate-45" />
                    <Database className="w-32 h-32 text-amber-500/50" />
                </motion.div>

                {/* Right: Flow (AI) */}
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    whileInView={{ x: "10%", opacity: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute w-[800px] h-[800px] rounded-full bg-cyan-900/10 blur-3xl flex items-center justify-center"
                >
                    <Sparkles className="w-32 h-32 text-cyan-400/50" />
                </motion.div>

                {/* The Crash/Fusion Point */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.5, 1], opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute w-2 h-[500px] bg-white blur-xl"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <span className="inline-block py-1 px-3 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-mono mb-8 tracking-widest uppercase bg-cyan-950/20">
                        Le Concept Clé
                    </span>

                    <h2 className="text-5xl md:text-7xl font-serif text-slate-100 mb-8 leading-tight">
                        L'Hypothèse du <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-cyan-400 animate-pulse">
                            Double Numérique
                        </span>
                    </h2>

                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                        La numérisation simple est une impasse. Seule l'hybridation entre la <strong className="text-amber-400 font-normal">Rigueur de l'Archivage (OAIS)</strong> et la <strong className="text-cyan-400 font-normal">Puissance Sémantique (IA)</strong> peut garantir une mémoire éternelle et intelligible.
                    </p>
                </motion.div>
            </div>

        </section>
    );
}
