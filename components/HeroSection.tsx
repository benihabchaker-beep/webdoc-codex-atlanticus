"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                // Gold or Indigo particles for Illuminated Theme
                this.color = Math.random() > 0.5 ? "rgba(212, 175, 55, 0.4)" : "rgba(75, 85, 99, 0.3)";
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas!.width) this.x = 0;
                if (this.x < 0) this.x = canvas!.width;
                if (this.y > canvas!.height) this.y = 0;
                if (this.y < 0) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 70; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        init();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const title = "CODEX ATLANTICUS";
    const subtitle = "2.0";

    return (
        <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f1014]">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0f1014_90%)] z-10 pointer-events-none" />
            {/* Verified URL: Ailes battantes by Luc Viatour (Leonardo Model) */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/9/97/Ailes_battantes_Luc_Viatour.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay grayscale z-0" />

            {/* Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none opacity-50" />

            {/* Main Content Container */}
            <div className="relative z-20 text-center px-4 flex flex-col items-center justify-center h-full">

                {/* Title Block */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative inline-block"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tighter text-[#e2e8f0] relative z-10 drop-shadow-2xl">
                        {title.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: "backOut" }}
                                className="inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Fixed '2.0' Positioning - Top Right of the Title Container */}
                    <motion.div
                        className="absolute -top-4 -right-8 md:-top-4 md:-right-16 text-[#d4af37] font-sans font-bold text-xl md:text-4xl tracking-widest rotate-12"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                    >
                        {subtitle}
                    </motion.div>
                </motion.div>

                {/* Tagline */}
                <motion.div
                    className="mt-12 relative max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <div className="absolute inset-0 bg-[#d4af37] blur-[80px] opacity-5 rounded-full" />
                    <p className="relative text-base md:text-xl text-slate-400 font-sans tracking-[0.3em] uppercase border-y border-[#d4af37]/30 py-4 px-12">
                        Sauver la mémoire. Archiver l'éternité.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator - DOCKED TO VIEWPORT BOTTOM */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#d4af37]/60">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#d4af37] to-transparent opacity-50 overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1/2 bg-[#d4af37]"
                            animate={{ top: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
