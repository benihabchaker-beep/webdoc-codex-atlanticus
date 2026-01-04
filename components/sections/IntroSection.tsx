"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function IntroSection() {
    return (
        <section id="intro" className="relative min-h-[60vh] flex items-center justify-center py-24 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">

                {/* 1. TEXT COLUMN (Left) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-left"
                >
                    <div className="h-[1px] w-24 bg-red-600 mb-8" />
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-100 mb-8 leading-tight">
                        {content.intro.title}
                    </h2>
                    <p className="text-xl text-slate-300 font-serif leading-relaxed text-justify">
                        {content.intro.text}
                    </p>
                </motion.div>

                {/* 2. VISUAL COLUMN (Right) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg shadow-2xl border border-slate-800"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/L%C3%A9onard_de_Vinci_-_Codex_Atlanticus_-_000_R-1.jpg"
                        alt="Codex Page"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-110"
                    />
                    <div className="absolute bottom-6 left-6 z-20 font-mono text-xs text-slate-400">
                        FOLIO 1035 v
                    </div>
                </motion.div>

            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
