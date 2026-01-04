"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { content } from "@/data/content";

export default function HeroSection() {
    const [titleText, setTitleText] = useState("");
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const fullTitle = content.hero.title;

    // Parallax Logic (Performance Optimized)
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    // Mouse Parallax with MotionValues (No Re-renders)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth physics
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);
    // Invert for background
    const springXInv = useTransform(springX, (val) => val * -0.5);
    const springYInv = useTransform(springY, (val) => val * -0.5);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = (clientX - window.innerWidth / 2) * 0.05; // 5% movement
        const moveY = (clientY - window.innerHeight / 2) * 0.05;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    // Typewriter effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= fullTitle.length) {
                setTitleText(fullTitle.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 100);
        return () => clearInterval(interval);
    }, [fullTitle]);

    // Subtitle Cycle
    useEffect(() => {
        const interval = setInterval(() => {
            setSubtitleIndex((prev) => (prev + 1) % content.hero.subtitles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="intro"
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* Background Parallax Layer */}
            <motion.div
                style={{ y: y1, x: springXInv, translateY: springYInv, scale: 1.1 }}
                className="absolute inset-0 z-0 will-change-transform"
            >
                <div className="absolute inset-0 bg-[#050505]/60 z-10" />
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg"
                    alt="Codex Background"
                    className="w-full h-full object-cover opacity-50 grayscale contrast-125 selection:bg-none pointer-events-none"
                />
            </motion.div>

            {/* Content Parallax Layer */}
            <motion.div
                style={{ y: y2, x: springX, translateY: springY }}
                className="relative z-20 text-center px-4 mix-blend-screen will-change-transform"
            >
                <h1 className="text-6xl md:text-9xl font-serif text-slate-100 tracking-tighter mb-6 relative select-none">
                    {titleText}
                    <span className="animate-blink">|</span>
                </h1>

                <div className="h-12 overflow-hidden relative flex justify-center">
                    <motion.p
                        key={subtitleIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="text-xl md:text-2xl font-mono text-cyan-500 tracking-widest uppercase select-none"
                    >
                        {content.hero.subtitles[subtitleIndex]}
                    </motion.p>
                </div>

                <p className="mt-8 text-slate-300 max-w-2xl mx-auto font-light text-lg tracking-wide border-t border-slate-700/50 pt-8 select-none leading-relaxed">
                    {content.hero.description}
                </p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={() => document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-12 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors z-30 pointer-events-auto shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                >
                    OUVRIR LE CODEX
                </motion.button>
            </motion.div>

            {/* Stats / Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 text-slate-500 font-mono text-xs tracking-widest uppercase z-30 select-none"
            >
                {content.hero.stats}
            </motion.div>
        </section>
    );
}
