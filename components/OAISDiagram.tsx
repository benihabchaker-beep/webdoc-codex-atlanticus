"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, FileInput, Globe, ArrowRight, ShieldCheck, Server } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
    {
        id: "sip",
        title: "SIP",
        subtitle: "Submission Info Package",
        icon: FileInput,
        description: "Le point d'entrée. Le manuscrit numérisé brut est ingéré avec ses métadonnées descriptives. C'est la matière première de l'archive.",
        color: "text-blue-400",
        border: "border-blue-500",
        bg: "bg-blue-950/40",
        glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    },
    {
        id: "aip",
        title: "AIP",
        subtitle: "Archival Info Package",
        icon: Server,
        description: "Le cœur du système OAIS (ISO 14721). Les données sont normalisées, dupliquées et sécurisées pour le long terme. C'est la 'Forteresse Numérique'.",
        color: "text-amber-400",
        border: "border-amber-500",
        bg: "bg-amber-950/40",
        glow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]",
    },
    {
        id: "dip",
        title: "DIP",
        subtitle: "Dissemination Info Package",
        icon: Globe,
        description: "L'interface publique. Une version optimisée pour le web (comme ce site) est générée à partir de l'archive maîtresse (AIP).",
        color: "text-emerald-400",
        border: "border-emerald-500",
        bg: "bg-emerald-950/40",
        glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    },
];

export default function OAISDiagram() {
    const [activeStage, setActiveStage] = useState<string | null>(null);

    return (
        <section id="oais" className="py-32 px-4 bg-slate-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-500">
                    Modèle d'Archivage OAIS
                </h2>

                {/* Diagram Container */}
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 py-12 px-4 md:px-12">

                    {/* SVG Connecting Lines (Desktop) */}
                    <svg className="hidden md:block absolute top-[50%] left-0 w-full h-24 -translate-y-[50%] z-0 pointer-events-none overflow-visible">
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#1e293b" stopOpacity="0" />
                                <stop offset="10%" stopColor="#1e293b" stopOpacity="1" />
                                <stop offset="90%" stopColor="#1e293b" stopOpacity="1" />
                                <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        {/* Base Line */}
                        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#lineGrad)" strokeWidth="2" />

                        {/* Animated Data Packets */}
                        <circle r="4" fill="#06b6d4">
                            <animateMotion dur="4s" repeatCount="indefinite" path="M 120,50 L 1000,50" />
                        </circle>
                        <circle r="4" fill="#fbbf24" opacity="0.5">
                            <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M 120,50 L 1000,50" />
                        </circle>
                    </svg>

                    {stages.map((stage, index) => (
                        <div key={stage.id} className="relative z-10 flex flex-col items-center group">
                            <motion.button
                                whileHover={{ scale: 1.1, translateY: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                                className={cn(
                                    "w-36 h-36 md:w-48 md:h-48 rounded-2xl flex flex-col items-center justify-center border transition-all duration-300 relative overflow-hidden",
                                    stage.border,
                                    stage.bg,
                                    stage.glow,
                                    activeStage === stage.id ? "ring-4 ring-offset-4 ring-offset-slate-950 " + stage.border.replace("border", "ring") : "opacity-90 hover:opacity-100"
                                )}
                            >
                                {/* Cyberpunk Grid Background */}
                                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

                                <stage.icon className={cn("w-12 h-12 mb-3 relative z-10", stage.color)} />
                                <span className="font-bold text-2xl text-slate-100 relative z-10 tracking-widest">{stage.title}</span>

                                {/* Hover Corner Accents */}
                                <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity", stage.color.replace("text", "border"))} />
                                <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity", stage.color.replace("text", "border"))} />
                            </motion.button>


                            {/* Arrow for mobile flow */}
                            {index < stages.length - 1 && (
                                <ArrowRight className="md:hidden mt-4 text-slate-600" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Detail Panel */}
                <div className="h-64 mt-8 relative">
                    <AnimatePresence mode="wait">
                        {activeStage ? (
                            <motion.div
                                key={activeStage}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl max-w-3xl mx-auto backdrop-blur-md"
                            >
                                {stages.map(s => {
                                    if (s.id !== activeStage) return null;
                                    return (
                                        <div key={s.id} className="text-center">
                                            <h3 className={cn("text-2xl font-bold mb-2", s.color)}>{s.subtitle}</h3>
                                            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                                                {s.description}
                                            </p>
                                            <div className="mt-6 flex justify-center gap-4 text-sm font-mono text-slate-500">
                                                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Intégrité Vérifiée</span>
                                                <span className="flex items-center gap-1"><Database className="w-4 h-4" /> Métadonnées XML</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-slate-500 font-mono mt-12"
                            >
                                [Cliquez sur un module pour inspecter le flux de données]
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
