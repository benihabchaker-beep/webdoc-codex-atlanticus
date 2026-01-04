"use client";

import { motion } from "framer-motion";
import { content } from "@/data/content";

export default function IntroSection() {
    return (
        <section id="intro" className="relative min-h-[50vh] flex flex-col items-center justify-center py-24 bg-[#050505] text-center px-4 overflow-hidden">
            <div className="max-w-3xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-serif text-slate-100 mb-8 leading-tight"
                >
                    {content.intro.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-10"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-slate-300 font-serif leading-relaxed"
                >
                    {content.intro.text}
                </motion.p>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />
        </section>
    );
}
