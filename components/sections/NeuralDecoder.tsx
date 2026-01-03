"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ScanLine, Terminal } from "lucide-react";

export default function NeuralDecoder() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section className="py-24 bg-[#0a0b0e] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">

                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Context Side */}
                    <div className="w-full md:w-1/3">
                        <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-xs tracking-widest mb-4 uppercase">
                            <ScanLine className="w-4 h-4" />
                            <span>Module 02: Décodeur</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-100 mb-6">
                            Mieux que l'œil humain.
                        </h2>
                        {/* Text visibility improved: slate-300 and font-light */}
                        <p className="text-slate-300 mb-6 leading-relaxed text-lg font-light">
                            L'IA ne se contente pas de voir. Elle <span className="text-cyan-400">reconstruit</span>. En comparant des milliers de fragments, elle prédit les tracés effacés par le temps.
                        </p>
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded font-mono text-xs text-cyan-500/80">
                            &gt; LOAD_MODEL: LEONARDO_V4<br />
                            &gt; DETECT_INK_TYPE: GALLIC<br />
                            &gt; CONFIDENCE: 99.8%
                        </div>
                    </div>

                    {/* The Lens Interaction */}
                    <div className="w-full md:w-2/3 relative aspect-video group cursor-none"
                        ref={containerRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {/* 1. LAYER: RUINED (Blur + Noise) */}
                        <div className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-50 blur-[1px]"
                            style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')` }}
                        >
                            <div className="absolute inset-0 bg-black/50" />
                        </div>

                        {/* 2. LAYER: DECODED (Clean + Vector Overlay) - MASKED */}
                        <motion.div
                            className="absolute inset-0 bg-[#0f1014]"
                            style={{
                                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                                maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                            }}
                        >
                            {/* The Vectors (Simulated) */}
                            <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <path d="M 30 50 Q 50 30 70 50" stroke="cyan" strokeWidth="0.2" fill="none" strokeDasharray="1 1" />
                                <circle cx="50" cy="50" r="10" stroke="cyan" strokeWidth="0.1" fill="none" />
                            </svg>
                            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
                            <div className="absolute inset-0 mix-blend-color-dodge filter contrast-125 sepia-[0.5] hue-rotate-180" />
                        </motion.div>

                        {/* 3. HUD UI (Floating) */}
                        <motion.div
                            className="absolute pointer-events-none z-50 text-cyan-400"
                            style={{
                                left: mousePosition.x,
                                top: mousePosition.y,
                                x: "-50%",
                                y: "-50%"
                            }}
                            animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
                        >
                            <div className="w-[400px] h-[400px] rounded-full border border-cyan-500/20 flex items-center justify-center relative backdrop-blur-[1px]">
                                <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-4 bg-cyan-500" />
                                <div className="absolute bottom-0 left-1/2 -ml-[1px] w-[2px] h-4 bg-cyan-500" />
                                <div className="absolute left-0 top-1/2 -mt-[1px] w-4 h-[2px] bg-cyan-500" />
                                <div className="absolute right-0 top-1/2 -mt-[1px] w-4 h-[2px] bg-cyan-500" />

                                {/* Coordinates */}
                                <div className="absolute top-4 right-10 font-mono text-[10px]">
                                    X: {Math.floor(mousePosition.x)}<br />
                                    Y: {Math.floor(mousePosition.y)}
                                </div>

                                {/* Spinning Arc */}
                                <motion.div
                                    className="absolute inset-8 border-t border-r border-cyan-500/40 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </motion.div>

                        {!isHovering && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-black/60 backdrop-blur border border-white/20 px-6 py-3 rounded-full flex items-center gap-3 text-white animate-pulse">
                                    <Eye className="w-5 h-5" />
                                    <span>Survolez pour scanner</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
