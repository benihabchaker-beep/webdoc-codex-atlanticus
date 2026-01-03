"use client";

import { motion } from "framer-motion";
import { FileWarning, FileCode, CheckCircle } from "lucide-react";

export default function ResultsGallery() {
    return (
        <section id="resultats" className="py-32 bg-black px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-mono text-xs tracking-widest mb-4 block uppercase">
                        VI. PREUVE DE CONCEPT
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
                        Séquence Comparative
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-1 h-[600px]">

                    {/* 1. ORIGINAL */}
                    <div className="relative group overflow-hidden border-r border-white/10">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter sepia grayscale contrast-125" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-serif text-white mb-2">Original</h3>
                            <div className="text-xs font-mono text-red-500 bg-black/80 px-2 py-1 inline-block border border-red-900">
                                DAMAGE: CRITICAL
                            </div>
                        </div>
                    </div>

                    {/* 2. XML / CODE */}
                    <div className="relative group overflow-hidden bg-[#0f1014] border-r border-white/10 font-mono text-[10px] text-amber-500/50 p-8 leading-tight select-none">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        <p>
                            {"<bitstream id='BS_1'>"}<br />
                            {"  <checksum type='MD5'>a1b2c...3d4</checksum>"}<br />
                            {"  <mix:mix xmlns:mix='...'>"}<br />
                            {"    <mix:CompressionScheme>LZW</mix:CompressionScheme>"}<br />
                            {"  </mix:mix>"}<br />
                            {"</bitstream>"}
                        </p>

                        <div className="absolute bottom-8 left-8 z-10">
                            <h3 className="text-2xl font-serif text-white mb-2">Structure</h3>
                            <div className="text-xs font-mono text-amber-500 bg-black/80 px-2 py-1 inline-block border border-amber-900">
                                FORMAT: OAIS
                            </div>
                        </div>
                    </div>

                    {/* 3. AI RESULT */}
                    <div className="relative group overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e3/Leonardo_da_Vinci_-_Codex_Atlanticus_-_f._30_v.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-cyan-900/30 mix-blend-overlay" />

                        {/* Vector Overlay */}
                        <svg className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M 0 50 Q 50 0 100 50" stroke="cyan" strokeWidth="0.5" fill="none" />
                            <path d="M 50 0 L 50 100" stroke="cyan" strokeWidth="0.2" fill="none" />
                        </svg>

                        <div className="absolute bottom-8 left-8">
                            <h3 className="text-2xl font-serif text-white mb-2">Révélation</h3>
                            <div className="text-xs font-mono text-cyan-500 bg-black/80 px-2 py-1 inline-block border border-cyan-900">
                                RECOVERY: 100%
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
