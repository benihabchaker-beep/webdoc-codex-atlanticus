"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Brain, Globe, Scan, ArrowRight, Server, Activity, Lock } from "lucide-react";

const STEP_DURATION = 4000; // 4 seconds per step
const TOTAL_DURATION = STEP_DURATION * 4; // 16 seconds total cycle

const steps = [
    {
        id: "ingest",
        title: "Ingestion",
        icon: Scan,
        code: "SCAN_INIT... OK",
        desc: "Numérisation Haute Définition [8K]",
        color: "text-emerald-400",
        glow: "shadow-[0_0_20px_rgba(52,211,153,0.5)]",
        border: "border-emerald-500/50",
        bg: "bg-emerald-950/30",
        beam: "from-emerald-500/10"
    },
    {
        id: "archive",
        title: "Archivage",
        icon: Database,
        code: "AIP_PACKING... 100%",
        desc: "Encapsulation OAIS & Checksums",
        color: "text-amber-400",
        glow: "shadow-[0_0_20px_rgba(251,191,36,0.5)]",
        border: "border-amber-500/50",
        bg: "bg-amber-950/30",
        beam: "from-amber-500/10"
    },
    {
        id: "ai",
        title: "Intelligence",
        icon: Brain,
        code: "NEURAL_NET::ACTIVE",
        desc: "Restauration Vectorielle IA",
        color: "text-violet-400",
        glow: "shadow-[0_0_20px_rgba(167,139,250,0.5)]",
        border: "border-violet-500/50",
        bg: "bg-violet-950/30",
        beam: "from-violet-500/10"
    },
    {
        id: "web",
        title: "Diffusion",
        icon: Globe,
        code: "WEBGL_RENDER::ON",
        desc: "Distribution Métavers & Web",
        color: "text-cyan-400",
        glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
        border: "border-cyan-500/50",
        bg: "bg-cyan-950/30",
        beam: "from-cyan-500/10"
    }
];

export default function MethodologyFlow() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, STEP_DURATION);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[200vh] bg-[#0a0b0e] border-y border-slate-900">

            {/* PART 1: THE PIPELINE (Fixed View) */}
            <div className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0b0e] to-[#0a0b0e]" />

                <div className="relative z-10 w-full max-w-7xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-slate-100">Pipeline de Traitement</h2>
                        <p className="text-slate-500 font-mono text-xs mt-2">AUTOMATED_SEQUENCE::RUNNING</p>
                    </div>

                    {/* The Cards Container */}
                    <div className="flex items-stretch justify-center gap-4 md:gap-8">
                        {steps.map((step, index) => (
                            <div key={step.id} className="contents">
                                <PipelineCard
                                    index={index}
                                    current={activeStep}
                                    data={step}
                                />
                                {index < steps.length - 1 && (
                                    <PipelineConnector active={activeStep >= index + 1} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-4xl mx-auto h-1 bg-slate-900 mt-16 rounded-full overflow-hidden relative">
                        {/* Background track marks */}
                        <div className="absolute inset-0 flex justify-between px-[12%] z-10">
                            <div className="w-px h-full bg-slate-800" />
                            <div className="w-px h-full bg-slate-800" />
                            <div className="w-px h-full bg-slate-800" />
                        </div>

                        {/* Continuous Animation Progress Bar */}
                        <motion.div
                            className="h-full bg-gradient-to-r from-slate-800 via-white to-white shadow-[0_0_15px_white] relative z-20"
                            animate={{
                                width: ["0%", "100%"]
                            }}
                            transition={{
                                duration: 16, // Matches total cycle (4s * 4 steps)
                                ease: "linear",
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* PART 2: FILLING THE SPACE (Deep Dive Details) */}
            <div className="relative z-20 bg-[#0a0b0e] py-32 border-t border-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">

                        {/* Left: Server Visualization */}
                        <div className="relative aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-8 flex flex-col gap-4 group hover:border-cyan-500/50 transition-colors">
                            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] animate-scan" />

                            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                                <span>CLUSTER_STATUS</span>
                                <span className="text-green-500 animate-pulse">Running...</span>
                            </div>

                            {/* Fake Server Racks */}
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="flex-1 bg-slate-900 rounded border border-slate-800 flex items-center px-4 gap-2">
                                    <div className={`w-1 h-1 rounded-full ${activeStep === (i % 4) ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`} />
                                    <div className="flex-1 h-1 bg-slate-800 rounded overflow-hidden">
                                        <motion.div
                                            className="h-full bg-cyan-900"
                                            animate={{ width: ["0%", "100%", "0%"] }}
                                            transition={{ duration: 2 + i, repeat: Infinity }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono">NODE_0{i}</span>
                                </div>
                            ))}

                            {/* Detailed Logs (New) */}
                            <div className="flex-1 bg-black/30 rounded p-4 font-mono text-[10px] text-slate-400 overflow-hidden flex flex-col justify-end">
                                <span className="opacity-50">init_sequence(active)</span>
                                <span className="opacity-70">loading_modules...</span>
                                <span className="text-cyan-500">ready.</span>
                            </div>
                        </div>

                        {/* Right: Technical Stats */}
                        <div className="space-y-12">
                            <div>
                                <div className="flex items-center gap-3 text-amber-500 mb-4">
                                    <Server className="w-6 h-6" />
                                    <h3 className="font-serif text-2xl">Stockage Pérenne</h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    Le modèle OAIS garantit que les métadonnées de préservation (PDI) sont indissociables du contenu.
                                    Chaque fichier est répliqué sur 3 serveurs distants (Cold Storage).
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 text-cyan-500 mb-4">
                                    <Activity className="w-6 h-6" />
                                    <h3 className="font-serif text-2xl">Monitoring Actif</h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    Des agents logiciels vérifient l'intégrité des checksums (Fixity Check) chaque semaine pour détecter le "Bit Rot" avant qu'il ne soit irréversible.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 text-slate-200 mb-4">
                                    <Lock className="w-6 h-6" />
                                    <h3 className="font-serif text-2xl">Encapsulation</h3>
                                </div>
                                <p className="text-slate-300 leading-relaxed text-lg">
                                    Le format METS standardise le paquetage. Le manuscrit n'est plus une image, c'est un objet numérique complet incluant son contexte historique.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

function PipelineCard({ index, current, data }: any) {
    const isActive = index === current;

    return (
        <motion.div
            animate={{
                scale: isActive ? 1.1 : 0.95,
                opacity: isActive ? 1 : 0.4,
                borderColor: isActive ? "rgba(255,255,255,0.5)" : "rgba(30,41,59,0.3)", // Generic border, color handled by class
                backgroundColor: isActive ? "rgba(10,10,20,0.8)" : "rgba(15,23,42,0.4)"
            }}
            className={`w-full max-w-[260px] aspect-[4/5] backdrop-blur-md rounded-xl border flex flex-col relative overflow-hidden transition-all duration-700 ${isActive ? data.border : ''} ${isActive ? data.shadow : ''}`}
        >
            {/* ACTIVE STATE: COLORS */}
            {isActive && (
                <>
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent ${data.beam}`}
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className={`absolute inset-0 bg-${data.color}-500/5`} />
                </>
            )}

            {/* HEADER */}
            <div className="p-6 border-b border-white/5 flex justify-between items-start relative z-10">
                <span className={`font-mono text-[10px] tracking-widest ${isActive ? data.color : 'text-slate-600'}`}>STEP_0{index + 1}</span>
                <data.icon className={`w-5 h-5 ${isActive ? data.color : 'text-slate-600'}`} />
            </div>

            {/* BODY: DATA VIZ */}
            <div className="flex-1 p-6 flex flex-col justify-end relative z-10">
                {/* Fake Binary Stream */}
                <div className="absolute top-4 left-6 right-6 bottom-24 overflow-hidden mask-image-b-0 opacity-50">
                    <div className={`font-mono text-[9px] leading-tight break-all transition-colors duration-500 ${isActive ? data.color : 'text-slate-800'}`}>
                        {isActive ? (
                            "01010110 11001010 11100101 10101010 01010011 11010101 10101111 SYSTEM_OK LOADING... BUFFER_74% 01010110 11001010 VECTOR_PATH_FOUND"
                        ) : (
                            "00000000 00000000 00000000 ..."
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-700'}`} />
                        <span className={`font-mono text-[10px] ${isActive ? data.color : 'text-slate-600'}`}>
                            {isActive ? data.code : "WAITING..."}
                        </span>
                    </div>
                    <h3 className={`text-xl font-bold font-serif mb-1 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {data.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">
                        {data.desc}
                    </p>
                </div>
            </div>

            {/* Bottom Progress Line */}
            {isActive && (
                <div className={`absolute bottom-0 left-0 h-0.5 w-full animate-[loading_4s_ease-in-out] ${data.bg.replace('/30', '')} bg-current ${data.color}`} />
            )}
        </motion.div>
    )
}

function PipelineConnector({ active }: { active: boolean }) {
    return (
        <div className="hidden md:flex flex-col justify-center items-center w-6 opacity-30">
            <motion.div
                animate={{ color: active ? "#ffffff" : "#475569" }}
                transition={{ duration: 0.5 }}
            >
                <ArrowRight className="w-4 h-4" />
            </motion.div>
        </div>
    )
}
