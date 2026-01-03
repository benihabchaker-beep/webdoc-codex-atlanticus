"use client";

import { useState, useRef } from "react";
import { MoveHorizontal, ZoomIn, Scan } from "lucide-react";

export default function ResultsGallery() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isZoomed, setIsZoomed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPosition((x / rect.width) * 100);
    };

    return (
        <section id="resultats" className="py-24 bg-[#0a0b0e] relative border-t border-slate-900">
            <div className="max-w-6xl mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-slate-100 mb-4">La Révélation</h2>
                    <p className="text-slate-400">Glissez pour comparer le manuscrit original et sa restauration vectorielle.</p>
                </div>

                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`
                        relative w-full aspect-video rounded-xl overflow-hidden cursor-col-resize select-none border border-slate-800 shadow-2xl transition-all duration-700 bg-black
                        ${isZoomed ? "scale-110 z-50 cursor-zoom-out" : "hover:shadow-cyan-900/20 cursor-crosshair"}
                    `}
                >
                    {/* Layer 1: ORIGINAL (Underneath) */}
                    <div className="absolute inset-0 bg-white">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg"
                            className="w-full h-full object-cover filter sepia-[0.3] contrast-125"
                            alt="Original"
                        />
                        <div className="absolute top-8 left-8 bg-black/50 backdrop-blur px-4 py-2 text-white font-serif rounded">
                            Original (1483)
                        </div>
                    </div>

                    {/* Layer 2: RESTORED (Over, Clipped) */}
                    <div
                        className="absolute inset-0 bg-[#0f1014]"
                        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    >
                        {/* Base Image (Darkened) */}
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg"
                            className="w-full h-full object-cover filter grayscale contrast-150 brightness-50 opacity-50"
                            alt="Restored"
                        />

                        {/* THE VECTOR MESH (The logic implementation the user wanted) */}
                        <div className="absolute inset-0 opacity-80 mix-blend-screen">
                            <svg className="w-full h-full" preserveAspectRatio="none">
                                <defs>
                                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <circle cx="2" cy="2" r="0.5" fill="#22d3ee" opacity="0.5" />
                                    </pattern>
                                </defs>

                                {/* Background Grid Points */}
                                <rect width="100%" height="100%" fill="url(#smallGrid)" />

                                {/* Simulated Vector Paths (Bezier Curves) */}
                                <path
                                    d="M 100,500 C 200,400 300,600 400,300 S 600,200 800,400"
                                    fill="none" stroke="#22d3ee" strokeWidth="1" vectorEffect="non-scaling-stroke"
                                    className="animate-draw-path"
                                />
                                <path
                                    d="M 50,200 C 150,150 250,250 350,150 S 550,100 750,200"
                                    fill="none" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="5,5" vectorEffect="non-scaling-stroke"
                                />

                                {/* Simulated Nodes */}
                                <g fill="#22d3ee">
                                    <circle cx="10%" cy="40%" r="3" className="animate-pulse" />
                                    <circle cx="30%" cy="60%" r="2" />
                                    <circle cx="60%" cy="30%" r="4" className="animate-pulse" />
                                    <circle cx="80%" cy="50%" r="2" />
                                </g>

                                {/* Construction Lines */}
                                <line x1="10%" y1="40%" x2="30%" y2="60%" stroke="#22d3ee" strokeWidth="0.2" opacity="0.5" />
                                <line x1="30%" y1="60%" x2="60%" y2="30%" stroke="#22d3ee" strokeWidth="0.2" opacity="0.5" />
                                <line x1="60%" y1="30%" x2="80%" y2="50%" stroke="#22d3ee" strokeWidth="0.2" opacity="0.5" />
                            </svg>
                        </div>

                        {/* Scanning Overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:100%_8px]" />

                        <div className="absolute top-8 right-8 bg-cyan-950/80 backdrop-blur px-4 py-2 text-cyan-400 font-mono text-xs rounded border border-cyan-500/30 flex items-center gap-2">
                            <Scan className="w-4 h-4 animate-spin-slow" />
                            VECTOR_RECONSTRUCTION::ACTIVE
                        </div>
                    </div>

                    {/* The Handle */}
                    <div
                        className="absolute top-0 bottom-0 w-[2px] bg-cyan-500 cursor-col-resize z-20 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-cyan-500 border border-cyan-500 rounded-full p-2 shadow-xl">
                            <MoveHorizontal className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Zoom Hint */}
                    {!isZoomed && (
                        <div className="absolute bottom-4 right-4 text-xs font-mono text-cyan-500/50 flex items-center gap-2 pointer-events-none animate-bounce">
                            <ZoomIn className="w-3 h-3" />
                            CLICK_TO_ANALYZE
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}
