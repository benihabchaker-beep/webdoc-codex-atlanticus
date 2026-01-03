"use client";

import { motion } from "framer-motion";

export default function HypothesisSection() {
    return (
        <section id="hypothese" className="min-h-[50vh] bg-black flex items-center justify-center px-4 relative overflow-hidden">
            <div className="max-w-4xl text-center relative z-10 py-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-5xl font-serif text-slate-200 leading-snug font-light italic">
                        "L'Hypothèse du <span className="text-cyan-400 font-normal">Double Numérique</span> :<br /><br />
                        Hybrider la norme <span className="text-amber-500 font-normal">(OAIS)</span> et l'intelligence <span className="text-cyan-400 font-normal">(IA)</span><br />
                        pour l'éternité."
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
