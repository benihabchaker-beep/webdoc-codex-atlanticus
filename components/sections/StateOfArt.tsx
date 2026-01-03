"use client";

import { motion } from "framer-motion";
import { Eye, BookOpen, Scale } from "lucide-react";
import { content } from "@/data/content";

export default function StateOfArt() {
    const { title, subtitle, cards } = content.stateOfArt;

    const icons = {
        Eye: Eye,
        BookOpen: BookOpen,
        Scale: Scale
    };

    return (
        <section id="etat-art" className="min-h-screen bg-slate-950 flex flex-col items-center justify-center py-24 relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] mask-image-gradient" />

            <div className="container mx-auto px-4 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-100 mb-4">{title}</h2>
                    <p className="text-slate-400 font-light text-lg">{subtitle}</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cards.map((card, idx) => {
                        const Icon = icons[card.icon as keyof typeof icons];
                        const isSolution = card.id === "solution";

                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                whileHover="hover"
                                className={`
                                    relative aspect-[3/4] rounded-xl border p-8 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group transition-colors duration-500
                                    ${isSolution
                                        ? "bg-cyan-950/20 border-cyan-500/50 hover:bg-cyan-900/30"
                                        : "bg-slate-900/40 border-slate-800 hover:bg-red-950/20 hover:border-red-900"}
                                `}
                            >
                                {/* Default State */}
                                <motion.div
                                    variants={{ hover: { opacity: 0, scale: 0.8 } }}
                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-300"
                                >
                                    <div className={`p-4 rounded-full mb-6 ${isSolution ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-100 mb-2">{card.title}</h3>
                                    <p className="text-slate-400">{card.description}</p>
                                </motion.div>

                                {/* Hover State (The Critique) */}
                                <motion.div
                                    variants={{ hover: { opacity: 1, scale: 1 } }}
                                    initial={{ opacity: 0, scale: 1.2 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/80 backdrop-blur-md"
                                >
                                    <p className={`text-lg font-serif italic leading-relaxed ${isSolution ? 'text-cyan-400' : 'text-red-400'}`}>
                                        "{card.hoverText}"
                                    </p>
                                    {isSolution && (
                                        <div className="mt-4 px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs font-mono text-cyan-300">
                                            RECOMMENDED
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
