"use client";

import { motion } from "framer-motion";

export default function Hypothesis() {
    return (
        <section id="hypothesis" className="py-32 bg-black flex items-center justify-center px-4 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent" />

            <div className="max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="border-t border-b border-slate-800 py-12"
                >
                    <span className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase mb-6 block">
                        Hypothèse Scientifique
                    </span>

                    <h2 className="text-2xl md:text-4xl font-serif text-slate-200 leading-relaxed font-light italic">
                        "L'hypothèse du <span className="text-cyan-400 font-normal">Double Numérique</span> :<br />
                        Seule une hybridation entre <span className="text-amber-500 font-normal">archivage normé (OAIS)</span> et <br />
                        <span className="text-cyan-400 font-normal">intelligence artificielle</span> peut garantir une pérennité millénaire."
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
