"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, Eye, Lock, FileCode, Terminal, Cpu } from "lucide-react";

export default function NeuralLens() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    // Simulate AI logs
    useEffect(() => {
        if (isHovering) {
            const interval = setInterval(() => {
                const newLog = `> ANALYZING VECTOR [${Math.floor(Math.random() * 999)}:${Math.floor(Math.random() * 999)}]... ${(Math.random() * 100).toFixed(2)}% MATCH`;
                setLogs(prev => [newLog, ...prev].slice(0, 5));
            }, 300);
            return () => clearInterval(interval);
        }
    }, [isHovering]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section className="relative py-32 bg-[#0a0b0e] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-xs tracking-widest mb-4 uppercase">
                        <Cpu className="w-4 h-4 animate-pulse" />
                        <span>Décodeur Neuronal V.4.0</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-6">
                        L'Intelligence Artificielle
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        L'IA ne fait pas que nettoyer. Elle <span className="text-cyan-400">comprend</span>.
                        Déplacement sémantique, reconnaissance de glyphes, reconstruction vectorielle.
                    </p>
                </div>

                {/* LENS CONTAINER */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative w-full aspect-[16/9] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl cursor-none group"
                >
                    {/* LAYER 1: ORIGINAL (Blurred/Obscured) */}
                    <div className="absolute inset-0 bg-cover bg-center select-none pointer-events-none filter blur-[2px] brightness-50 grayscale"
                        style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')` }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-slate-600 font-serif italic text-4xl opacity-50">En attente d'analyse...</span>
                        </div>
                    </div>

                    {/* LAYER 2: REVEALED (Clean + Vectors) - MASKED */}
                    <motion.div
                        className="absolute inset-0 bg-[#0f1014] select-none pointer-events-none"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')`, // Ideally a "Cleaned" version
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitMaskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                            maskImage: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                        }}
                    >
                        {/* Tech Overlay inside the lens */}
                        <div className="absolute inset-0 bg-cyan-950/30 mix-blend-overlay" />

                        {/* Dynamic Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        {/* Bounding Boxes (Simulated OCR) inside the lens scope */}
                        {/* These would ideally be dynamically filtered by distance to mouse, but hardcoding "near" elements for effect works if dense enough */}
                        <div className="absolute top-[30%] left-[40%] border border-cyan-500/80 bg-cyan-500/10 px-1 text-[8px] text-cyan-400 font-mono">GEAR_RATIO_01</div>
                        <div className="absolute top-[35%] left-[45%] border border-cyan-500/80 w-12 h-4" />
                        <div className="absolute bottom-[40%] right-[30%] border border-cyan-500/80 bg-cyan-500/10 px-1 text-[8px] text-cyan-400 font-mono">FORCE_VECTOR</div>

                        {/* Enhanced Contrast */}
                        <div className="absolute inset-0 mix-blend-hard-light filter contrast-125 sepia-[0.3]" />
                    </motion.div>

                    {/* THE HUD UI (Following cursor) */}
                    <motion.div
                        className="absolute pointer-events-none z-50"
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y,
                            x: "-50%",
                            y: "-50%"
                        }}
                        animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
                    >
                        {/* Main Reticle */}
                        <div className="w-[400px] h-[400px] rounded-full border border-cyan-500/30 flex items-center justify-center relative backdrop-blur-[1px]">

                            {/* Rotating Elements */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-t border-r border-cyan-500/50"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 rounded-full border-b border-l border-cyan-500/30"
                            />

                            {/* Terminal Log Floating Next to Lens */}
                            <div className="absolute left-[110%] top-0 w-64 bg-black/80 border-l-2 border-cyan-500 p-4 font-mono text-[10px] text-cyan-400 flex flex-col gap-1 shadow-xl">
                                <div className="flex items-center gap-2 border-b border-cyan-900 pb-2 mb-2">
                                    <Terminal className="w-3 h-3" />
                                    <span>NEURAL_LOG_STREAM</span>
                                </div>
                                {logs.map((log, i) => (
                                    <div key={i} className="opacity-80 truncate">{log}</div>
                                ))}
                            </div>

                            {/* Confidence Score */}
                            <div className="absolute bottom-10 bg-cyan-950/80 px-2 py-1 rounded text-xs font-bold text-cyan-300 border border-cyan-500/50">
                                CONFIDENCE: 98.4%
                            </div>
                        </div>
                    </motion.div>

                    {/* Prompt */}
                    {!isHovering && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/20 animate-pulse">
                                <Eye className="w-5 h-5" />
                                <span>Activer le Décodeur Neuronal</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
