"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Brain, Globe, Scan, ArrowRight } from "lucide-react";
import { content } from "@/data/content";

const STEP_DURATION = 4000; // 4 seconds per step
const TOTAL_DURATION = STEP_DURATION * 4; // 16 seconds total cycle

const themes = [
    {
        id: "ingest",
        color: "text-emerald-400",
        glow: "shadow-[0_0_20px_rgba(52,211,153,0.5)]",
        border: "border-emerald-500/50",
        bg: "bg-emerald-950/30",
        beam: "from-emerald-500/10",
        icon: Scan,
        code: "SCAN_INIT... OK"
    },
    {
        id: "archive",
        color: "text-amber-400",
        glow: "shadow-[0_0_20px_rgba(251,191,36,0.5)]",
        border: "border-amber-500/50",
        bg: "bg-amber-950/30",
        beam: "from-amber-500/10",
        icon: Database,
        code: "AIP_PACKING... 100%"
    },
    {
        id: "ai",
        color: "text-violet-400",
        glow: "shadow-[0_0_20px_rgba(167,139,250,0.5)]",
        border: "border-violet-500/50",
        bg: "bg-violet-950/30",
        beam: "from-violet-500/10",
        icon: Brain,
        code: "NEURAL_NET::ACTIVE"
    },
    {
        id: "web",
        color: "text-cyan-400",
        glow: "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
        border: "border-cyan-500/50",
        bg: "bg-cyan-950/30",
        beam: "from-cyan-500/10",
        icon: Globe,
        code: "WEBGL_RENDER::ON"
    }
];

export default function MethodologyTimeline() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % themes.length);
        }, STEP_DURATION);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="methodologie" className="relative py-24 bg-[#0a0b0e] border-y border-slate-900 overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0b0e] to-[#0a0b0e]" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-serif text-slate-100">{content.methodology.title}</h2>
                    <p className="text-slate-500 font-mono text-xs mt-2 tracking-widest uppercase">Pipeline de Traitement Automatisé</p>
                </div>

                {/* The Cards Container */}
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 md:gap-8">
                    {content.methodology.steps.map((step, index) => {
                        const theme = themes[index];
                        return (
                            <div key={index} className="contents">
                                <PipelineCard
                                    index={index}
                                    current={activeStep}
                                    data={step}
                                    theme={theme}
                                />
                                {index < themes.length - 1 && (
                                    <PipelineConnector active={activeStep >= index + 1} />
                                )}
                            </div>
                        );
                    })}
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
        </section>
    );
}

function PipelineCard({ index, current, data, theme }: any) {
    const isActive = index === current;
    const Icon = theme.icon;

    return (
        <motion.div
            animate={{
                scale: isActive ? 1.05 : 0.95,
                opacity: isActive ? 1 : 0.5,
                borderColor: isActive ? "rgba(255,255,255,0.2)" : "rgba(30,41,59,0.3)",
                backgroundColor: isActive ? "rgba(10,10,20,0.8)" : "rgba(15,23,42,0.4)"
            }}
            className={`flex-1 min-h-[300px] backdrop-blur-md rounded-xl border flex flex-col relative overflow-hidden transition-all duration-700 ${isActive ? theme.border : ''} ${isActive ? theme.glow : ''}`}
        >
            {/* ACTIVE STATE: COLORS */}
            {isActive && (
                <>
                    <motion.div
                        className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent ${theme.beam}`}
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className={`absolute inset-0 bg-${theme.color.split('-')[1]}-500/5`} />
                </>
            )}

            {/* HEADER */}
            <div className="p-6 border-b border-white/5 flex justify-between items-start relative z-10">
                <span className={`font-mono text-[10px] tracking-widest ${isActive ? theme.color : 'text-slate-600'}`}>STEP_0{index + 1}</span>
                <Icon className={`w-5 h-5 ${isActive ? theme.color : 'text-slate-600'}`} />
            </div>

            {/* BODY: DATA VIZ */}
            <div className="flex-1 p-6 flex flex-col justify-end relative z-10">
                {/* Fake Binary Stream */}
                <div className="absolute top-16 left-6 right-6 bottom-24 overflow-hidden mask-image-b-0 opacity-30 pointer-events-none">
                    <div className={`font-mono text-[8px] leading-tight break-all transition-colors duration-500 ${isActive ? theme.color : 'text-slate-800'}`}>
                        {isActive ? (
                            "01010110 11001010 11100101 10101010 01010011 11010101 10101111 SYSTEM_OK LOADING... BUFFER_74% 01010110 11001010 VECTOR_PATH_FOUND 00110010 DATA_STREAM_ACTIVE"
                        ) : (
                            "00000000 00000000 00000000 ..."
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-slate-700'}`} />
                        <span className={`font-mono text-[9px] ${isActive ? theme.color : 'text-slate-600'}`}>
                            {isActive ? theme.code : "WAITING..."}
                        </span>
                    </div>
                    <h3 className={`text-lg font-bold font-serif mb-1 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {data.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-snug">
                        {data.desc}
                    </p>
                </div>
            </div>

            {/* Bottom Progress Line */}
            {isActive && (
                <div className={`absolute bottom-0 left-0 h-0.5 w-full animate-[loading_4s_ease-in-out] bg-current ${theme.color}`} />
            )}
        </motion.div>
    )
}

function PipelineConnector({ active }: { active: boolean }) {
    return (
        <div className="hidden md:flex flex-col justify-center items-center w-8 opacity-30">
            <motion.div
                animate={{ color: active ? "#ffffff" : "#475569" }}
                transition={{ duration: 0.5 }}
            >
                <ArrowRight className="w-4 h-4" />
            </motion.div>
        </div>
    )
}
