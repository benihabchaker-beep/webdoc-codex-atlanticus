"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/data/content";

export default function HeroSection() {
    const [titleText, setTitleText] = useState("");
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const fullTitle = content.hero.title;

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= fullTitle.length) {
                setTitleText(fullTitle.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [fullTitle]);

    // Subtitle Cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setSubtitleIndex((prev) => (prev + 1) % content.hero.subtitles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="intro" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#050505]/70 z-10" />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg"
                    alt="Codex Background"
                    className="w-full h-full object-cover opacity-40 grayscale contrast-125 animate-pan-slow"
                />
            </div>

            <div className="relative z-20 text-center px-4">
                <h1 className="text-6xl md:text-9xl font-serif text-slate-100 tracking-tighter mb-6 relative">
                    {titleText}
                    <span className="animate-blink">|</span>
                </h1>

                <div className="h-12 overflow-hidden relative flex justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={subtitleIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-xl md:text-2xl font-mono text-cyan-500 tracking-widest uppercase"
                        >
                            {content.hero.subtitles[subtitleIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                <p className="mt-8 text-slate-400 max-w-xl mx-auto font-light text-lg">
                    {content.hero.description}
                </p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 text-slate-500 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
                <span className="text-[10px] tracking-widest uppercase">Scroll to Discover</span>
            </motion.div>
        </section>
    );
}
