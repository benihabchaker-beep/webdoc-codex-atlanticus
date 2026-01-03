"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Database, Brain, Globe, Scan } from "lucide-react";
import { content } from "@/data/content";

export default function MethodologyTimeline() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform vertical scroll to horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-75%"]);

    const steps = content.methodology.steps;
    const icons = [Scan, Database, Brain, Globe];

    return (
        <section ref={targetRef} id="methodologie" className="relative h-[300vh] bg-[#0a0b0e]">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Title Overlay */}
                <div className="absolute top-12 left-12 z-20">
                    <h2 className="text-3xl font-serif text-slate-100">{content.methodology.title}</h2>
                    <p className="text-slate-500 font-mono text-xs mt-2">PIPELINE DE TRAITEMENT</p>
                </div>

                {/* Horizontal Scroll Container */}
                <motion.div style={{ x }} className="flex items-center gap-32 pl-[20vw] pr-[20vw]">
                    {steps.map((step, i) => {
                        const Icon = icons[i];
                        return (
                            <div key={i} className="relative group min-w-[300px]">
                                {/* Connector Line */}
                                {i < steps.length - 1 && (
                                    <div className="absolute top-1/2 left-full w-32 h-[2px] bg-slate-800 -z-10">
                                        <motion.div
                                            className="h-full bg-cyan-500"
                                            initial={{ width: "0%" }}
                                            whileInView={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                        />
                                    </div>
                                )}

                                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 p-8 rounded-xl w-[320px] hover:border-cyan-500/50 transition-colors duration-500">
                                    <div className="w-12 h-12 rounded-full bg-cyan-950/50 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-mono text-xs text-cyan-500 tracking-widest mb-2 block">STEP 0{i + 1}</span>
                                    <h3 className="text-2xl font-serif text-slate-200 mb-2">{step.title}</h3>
                                    <p className="text-slate-400 text-sm">{step.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Progress Indicator */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-2">
                    {steps.map((_, i) => (
                        <div key={i} className={`w-16 h-1 rounded-full bg-slate-800`}>
                            {/* We could animate this based on scroll progress too */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
