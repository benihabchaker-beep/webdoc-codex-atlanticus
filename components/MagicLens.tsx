"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Scan, Eye, Lock, FileCode } from "lucide-react";

export default function MagicLens() {
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
        <section className="relative py-32 bg-[#0a0b0e] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 relative z-10">

                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-cyan-500 font-mono text-xs tracking-widest mb-4 uppercase">
                        <Scan className="w-4 h-4" />
                        <span>Technologie Multispectrale</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-6">
                        La Loupe de Vérité
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Utilisez votre curseur pour révéler ce que l'œil nu ne peut pas voir.
                        L'IA a reconstruit les traits disparus sous les ratures.
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
                            <span className="text-slate-600 font-serif italic text-4xl opacity-50">Illisible...</span>
                        </div>
                    </div>

                    {/* LAYER 2: REVEALED (Clean + Vectors) - MASKED */}
                    <motion.div
                        className="absolute inset-0 bg-[#0f1014] select-none pointer-events-none"
                        style={{
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')`, // Ideally a "Cleaned" version
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                            maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                        }}
                    >
                        {/* Tech Overlay inside the lens */}
                        <div className="absolute inset-0 bg-cyan-950/30 mix-blend-overlay" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/30 w-[80%] h-[80%] rounded-full opacity-20" />

                        {/* Vector Annotation Mockups */}
                        <div className="absolute top-[30%] left-[40%] text-cyan-400 font-mono text-[10px] bg-cyan-950/80 px-1 rounded border border-cyan-500/50">
                            Pignon principal (Reconstruit)
                        </div>
                        <div className="absolute bottom-[40%] right-[30%] text-cyan-400 font-mono text-[10px] bg-cyan-950/80 px-1 rounded border border-cyan-500/50">
                            Ligne de force
                        </div>

                        {/* Enhanced Contrast for "Readability" */}
                        <div className="absolute inset-0 mix-blend-hard-light filter contrast-125 sepia-[0.3]" />
                    </motion.div>

                    {/* THE LENS UI (Ring following cursor) */}
                    <motion.div
                        className="absolute pointer-events-none z-50 flex items-center justify-center"
                        style={{
                            left: mousePosition.x,
                            top: mousePosition.y,
                            x: "-50%",
                            y: "-50%"
                        }}
                        animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
                    >
                        {/* Outer Ring */}
                        <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/50 shadow-[0_0_50px_rgba(34,211,238,0.2)] flex items-center justify-center relative">
                            {/* Crosshairs */}
                            <div className="absolute top-0 w-[1px] h-4 bg-cyan-500" />
                            <div className="absolute bottom-0 w-[1px] h-4 bg-cyan-500" />
                            <div className="absolute left-0 w-4 h-[1px] bg-cyan-500" />
                            <div className="absolute right-0 w-4 h-[1px] bg-cyan-500" />

                            {/* Center dot */}
                            <div className="w-1 h-1 bg-cyan-400 rounded-full" />

                            {/* Floating Labels */}
                            <div className="absolute top-[-20px] text-[10px] font-mono text-cyan-500">
                                SCANNING...
                            </div>
                        </div>
                    </motion.div>

                    {/* Hint if not hovering */}
                    {!isHovering && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-3 border border-white/20 animate-pulse">
                                <Eye className="w-5 h-5" />
                                <span>Survolez pour révéler</span>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
