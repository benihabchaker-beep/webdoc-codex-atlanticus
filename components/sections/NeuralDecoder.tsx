"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Activity, ScanLine, Type } from "lucide-react";

export default function NeuralDecoder() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Metrics
    const [confidence, setConfidence] = useState(85);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });

        if (isHovering) {
            setConfidence(prev => Math.min(99.9, Math.max(80, prev + (Math.random() - 0.5) * 5)));
        }
    };

    return (
        <div
            className="relative w-full h-full min-h-[400px] bg-slate-950 rounded-xl overflow-hidden cursor-none group border border-slate-800 shadow-2xl"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* 1. LAYER: RUINED (Blur + Noise) */}
            <div className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-50 blur-[2px]"
                style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')` }}
            >
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* 2. LAYER: DECODED (Clean + Vector Overlay) - MASKED */}
            <motion.div
                className="absolute inset-0 bg-[#0f1014]"
                style={{
                    backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitMaskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                    maskImage: `radial-gradient(circle 180px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                }}
            >
                {/* 2A. Darken background to make vectors pop */}
                <div className="absolute inset-0 bg-cyan-950/80 mix-blend-multiply" />

                {/* 2B. THE RICH VECTOR LAYER */}
                <div className="absolute inset-0 opacity-80 mix-blend-screen" style={{ transform: `translate(${-mousePosition.x / 40}px, ${-mousePosition.y / 40}px)` }}>
                    <svg width="100%" height="100%" preserveAspectRatio="none">
                        <defs>
                            <pattern id="lensGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <rect width="1" height="1" fill="#22d3ee" opacity="0.3" />
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="0.2" opacity="0.2" />
                            </pattern>
                        </defs>

                        {/* Background Micro-Grid */}
                        <rect width="100%" height="100%" fill="url(#lensGrid)" />

                        {/* Simulated Bezier Curves (The "Reconstruction") */}
                        <g stroke="#22d3ee" fill="none" strokeWidth="1" opacity="0.8">
                            <path d="M 100,300 Q 250,100 400,300 T 700,300" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                            <path d="M 50,100 C 150,200 150,50 250,150" strokeWidth="0.5" />
                            <path d="M 600,100 L 700,200 L 800,100" strokeWidth="0.5" />

                            {/* Circle Analysis */}
                            <circle cx="400" cy="250" r="50" strokeWidth="0.5" opacity="0.5" />
                            <circle cx="400" cy="250" r="30" strokeWidth="0.2" strokeDasharray="2,2" className="animate-spin-slow" />
                        </g>

                        {/* Connecting Lines */}
                        <g stroke="#22d3ee" strokeWidth="0.2" opacity="0.4">
                            <line x1="100" y1="300" x2="400" y2="250" />
                            <line x1="400" y1="250" x2="700" y2="300" />
                        </g>

                        {/* Semantic Bounding Boxes (Text Recognition) */}
                        <g stroke="#22d3ee" fill="rgba(34,211,238,0.1)" strokeWidth="0.5">
                            <rect x="50" y="400" width="200" height="30" />
                            <rect x="300" y="420" width="150" height="25" />
                            <rect x="100" y="50" width="100" height="20" />
                        </g>

                        {/* Annotations */}
                        <g fill="#22d3ee" fontSize="8" fontFamily="monospace" opacity="0.7">
                            <text x="50" y="395">TEXT_BLOCK_A1</text>
                            <text x="300" y="415">LATIN_SCRIPT</text>
                            <text x="400" y="190">GEOMETRY_CIRCLE</text>
                        </g>
                    </svg>
                </div>

                {/* 2C. Dynamic Scan Line */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(34,211,238,0.2)_50%,transparent_100%)] h-[20%] w-full animate-[scan_3s_linear_infinite]" />
            </motion.div>

            {/* 3. HEAD-UP DISPLAY (Floating UI) */}
            <motion.div
                className="absolute pointer-events-none z-50 text-cyan-400 will-change-transform"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    x: "-50%",
                    y: "-50%"
                }}
                animate={{ scale: isHovering ? 1 : 0.8, opacity: isHovering ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
                <div className="w-[360px] h-[360px] rounded-full border border-cyan-500/30 flex items-center justify-center relative backdrop-blur-[0px]">

                    {/* Rotating Segments */}
                    <div className="absolute inset-0 rounded-full border-t border-cyan-500 animate-[spin_4s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border-r border-t border-cyan-500/20 animate-[spin_3s_linear_infinite_reverse]" />

                    {/* Crosshairs */}
                    <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-4 bg-cyan-500" />
                    <div className="absolute bottom-0 left-1/2 -ml-[1px] w-[2px] h-4 bg-cyan-500" />
                    <div className="absolute left-0 top-1/2 -mt-[1px] w-4 h-[2px] bg-cyan-500" />
                    <div className="absolute right-0 top-1/2 -mt-[1px] w-4 h-[2px] bg-cyan-500" />

                    {/* DYNAMIC METRICS */}
                    <div className="absolute top-8 right-12 text-xs font-mono text-cyan-300 flex flex-col gap-1 items-end">
                        <div className="flex items-center gap-2">
                            <span className="opacity-70">CONFIDENCE</span>
                            <span className="font-bold bg-cyan-950/80 px-1 border border-cyan-500/50">{confidence.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="opacity-70">LAYER</span>
                            <span className="text-white font-bold">SEMANTIC</span>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-12 text-[10px] font-mono text-cyan-500/70 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Activity className="w-3 h-3 animate-pulse" />
                            <span>VECTOR_MESH_GENERATED</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Type className="w-3 h-3" />
                            <span>OCR_DETECTED</span>
                        </div>
                    </div>

                </div>
            </motion.div>

            {/* Idle State Prompt */}
            <AnimatePresence>
                {!isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-slate-900/80 backdrop-blur border border-cyan-500/30 px-6 py-3 rounded-full flex items-center gap-3 text-cyan-400/90 animate-pulse shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                            <Target className="w-5 h-5" />
                            <span className="font-mono text-sm tracking-widest">INITIALIZE NEURAL LENS</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
