"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Brain, Globe, FileInput } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Ingestion",
        icon: FileInput,
        desc: "Normalisation SIP",
        color: "text-slate-400"
    },
    {
        id: 2,
        title: "Archivage",
        icon: Database,
        desc: "Modèle OAIS (AIP)",
        color: "text-amber-500"
    },
    {
        id: 3,
        title: "Intelligence",
        icon: Brain,
        desc: "Enrichissement Sémantique",
        color: "text-cyan-500"
    },
    {
        id: 4,
        title: "Diffusion",
        icon: Globe,
        desc: "Accès Universel (DIP)",
        color: "text-slate-200"
    }
];

export default function Methodology() {
    return (
        <section id="methods" className="py-24 bg-[#0a0b0e] border-y border-slate-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-16">
                    <h3 className="text-xl font-mono text-slate-500 uppercase tracking-widest mb-2">III. Méthodologie</h3>
                    <p className="text-slate-400">Le pipeline de préservation numérique.</p>
                </div>

                {/* Flowchart Container */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">

                    {/* Connection Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-0.5 bg-slate-800 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:border-current ${step.color} shadow-lg relative z-10`}>
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h4 className="text-lg font-bold text-slate-200 mb-1">{step.title}</h4>
                            <p className="text-xs font-mono text-slate-500">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
