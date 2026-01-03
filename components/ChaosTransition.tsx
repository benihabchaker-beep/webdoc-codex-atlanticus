"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ChaosTransition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Generate 20 "fragments"
    const fragments = Array.from({ length: 24 });

    // Transform chaos to order
    // We'll map scroll progress 0 -> 0.5 (Entering) to alignment

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-black">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

                {/* Visual Container */}
                <div className="relative w-full max-w-4xl aspect-video">
                    {fragments.map((_, i) => (
                        <Fragment key={i} index={i} progress={scrollYProgress} />
                    ))}
                </div>

                {/* Narrative Text */}
                <motion.div
                    className="absolute z-20 text-center px-4 mix-blend-difference"
                    style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.8], [0, 1, 0]) }}
                >
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">
                        Du Chaos à l'Ordre
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto">
                        "Face à la fragmentation, la numérisation seule ne suffit pas.<br />
                        <span className="text-cyan-400 font-mono">Il faut structurer l'entropie.</span>"
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

function Fragment({ index, progress }: { index: number, progress: any }) {
    // Random initial positions (Entropy)
    const randomX = (index % 5) * 20 - 50 + (Math.random() * 40 - 20); // Chaotic spread
    const randomY = (Math.floor(index / 5)) * 20 - 50 + (Math.random() * 40 - 20);
    const randomRotate = Math.random() * 360;

    // Target grid positions (OAIS Order)
    const gridCols = 6;
    const gridX = (index % gridCols) * 15 - 37.5; // Roughly centered grid
    const gridY = (Math.floor(index / gridCols)) * 15 - 20;

    const x = useTransform(progress, [0.1, 0.6], [`${randomX}%`, `${gridX}%`]);
    const y = useTransform(progress, [0.1, 0.6], [`${randomY}%`, `${gridY}%`]);
    const rotate = useTransform(progress, [0.1, 0.6], [randomRotate, 0]);
    const scale = useTransform(progress, [0.1, 0.6], [0.5 + Math.random(), 1]);
    const opacity = useTransform(progress, [0, 0.2], [0, 1]);

    // Color shift: Paper (Chaos) -> Data (Order)
    const backgroundColor = useTransform(progress, [0.4, 0.7], ["#f59e0b", "#06b6d4"]);

    return (
        <motion.div
            className="absolute w-12 h-16 md:w-24 md:h-32 rounded border border-white/10 backdrop-blur-sm flex items-center justify-center font-mono text-[10px] text-black/50 overflow-hidden shadow-2xl"
            style={{
                left: "50%",
                top: "50%",
                x,
                y,
                rotate,
                scale,
                opacity,
                backgroundColor
            }}
        >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />
            <span className="opacity-50">F.{index}</span>
        </motion.div>
    );
}
