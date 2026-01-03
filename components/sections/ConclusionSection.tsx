"use client";

import { motion } from "framer-motion";
import { MoveUpRight, Github, FileText, Globe } from "lucide-react";
import { content } from "@/data/content";

export default function ConclusionSection() {
    return (
        <section id="conclusion" className="min-h-[80vh] bg-[#050505] relative flex flex-col justify-center items-center py-24 overflow-hidden">

            {/* Glitch Background Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
                <h1 className="text-[20vw] font-black font-mono text-white leading-none tracking-tighter mix-blend-difference animate-pulse">
                    MEMORIA
                </h1>
            </div>

            <div className="container mx-auto px-4 z-10 max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-slate-100 mb-8 leading-tight">
                        <span className="block text-slate-500 text-2xl mb-2 font-sans font-light tracking-widest uppercase">Perspective</span>
                        {content.conclusion.text}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {content.conclusion.links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            className="group flex flex-col items-center justify-center p-8 bg-slate-900/50 border border-slate-800 rounded-lg hover:bg-slate-800 transition-all hover:border-cyan-500/30"
                        >
                            <div className="mb-4 text-cyan-500 group-hover:scale-110 transition-transform">
                                {idx === 0 ? <Globe className="w-6 h-6" /> : idx === 1 ? <FileText className="w-6 h-6" /> : <Github className="w-6 h-6" />}
                            </div>
                            <span className="text-slate-300 font-mono text-sm tracking-wider uppercase group-hover:text-white">
                                {link.label}
                            </span>
                            <MoveUpRight className="w-3 h-3 text-slate-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>

                <footer className="mt-24 text-slate-600 font-mono text-xs flex justify-between items-end border-t border-slate-900 pt-8">
                    <div>
                        <p>CODEX ATLANTICUS © 2024</p>
                        <p>SYSTEME DE PRESERVATION NUMERIQUE</p>
                    </div>
                    <div className="text-right">
                        <p>DESIGNED FOR ACADEMIC PURPOSE</p>
                        <p>NEXT.JS / FRAMER MOTION</p>
                    </div>
                </footer>
            </div>
        </section>
    );
}
