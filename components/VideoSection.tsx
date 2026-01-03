"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
    return (
        <section className="relative py-32 px-4 bg-[#0f1014] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#d4af37] mb-6">
                        Le Geste et la Préservation
                    </h2>
                    <div className="w-24 h-1 bg-[#d4af37]/30 mx-auto" />
                </motion.div>

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-[#d4af37]/20"
                >
                    {/* Official production about the restoration of Leonardo's works */}
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/81PJz-3iFTc" title="How Art Restorers Ruined Leonardo da Vinci’s Masterpiece"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen

                        className="absolute inset-0"
                    />

                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12 text-slate-400 font-sans max-w-2xl mx-auto text-lg leading-relaxed italic"
                >
                    "Voir le Codex, ce n'est pas seulement lire des notes. C'est observer la main de Léonard qui hésite, rature, et découvre."
                </motion.p>
            </div>
        </section>
    );
}
