"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export default function CodexConstellation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.3 });

    // Counter Animation
    const count = useSpring(0, { stiffness: 50, damping: 20, duration: 3000 });
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            count.set(1119);
        }
    }, [isInView, count]);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            setDisplayCount(latest);
        });
    }, [rounded]);

    // CANVAS LOGIC
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = canvas.clientWidth;
        let height = canvas.height = canvas.clientHeight;

        let mouseX = -1000;
        let mouseY = -1000;

        const TOTAL_PARTICLES = 1119;
        const particles: Particle[] = [];
        const GOLD = "212, 165, 83"; // #D4A553
        const CYAN = "0, 240, 255";   // #00F0FF

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
            baseX: number;
            baseY: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 0.5;

                // 60% Gold (Paper), 40% Cyan (Data)
                const isGold = Math.random() > 0.4;
                this.color = isGold
                    ? `rgba(${GOLD}, ${Math.random() * 0.5 + 0.2})`
                    : `rgba(${CYAN}, ${Math.random() * 0.5 + 0.2})`;

                this.baseX = this.x;
                this.baseY = this.y;
            }

            update() {
                // Brownion Motion
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse Interaction (Constellation / Repulsion)
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                if (distance < maxDistance) {
                    // Slight repulsion/attraction mix
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (maxDistance - distance) / maxDistance;

                    // Push away gently
                    this.x -= forceDirectionX * force * 2;
                    this.y -= forceDirectionY * force * 2;

                    // Draw connection line
                    if (ctx) {
                        ctx.beginPath();
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(mouseX, mouseY);
                        ctx.strokeStyle = `rgba(${CYAN}, ${0.1 * force})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        // Initialize
        for (let i = 0; i < TOTAL_PARTICLES; i++) {
            particles.push(new Particle());
        }

        // Animation Loop
        let animationFrameId: number;
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles (Optimized: only check a subset or nearby)
            // For 1119 particles, N*N checks is too heavy (~1M checks per frame).
            // We skip particle-particle lines for performance, keeping only particle-mouse.
            // Or we draw simple particles.

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Event Listeners
        const handleResize = () => {
            width = canvas.width = canvas.clientWidth;
            height = canvas.height = canvas.clientHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        window.addEventListener("resize", handleResize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section id="corpus" ref={containerRef} className="relative w-full h-[600px] bg-[#050505] overflow-hidden flex items-center justify-center border-t border-slate-900">
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0 cursor-crosshair"
            />

            {/* Overlay Gradient (Vignette) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-10" />

            {/* Content Layer */}
            <div className="relative z-30 text-center pointer-events-none">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-8xl md:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 font-bold mb-4 tracking-tighter drop-shadow-2xl">
                        {displayCount}
                    </h2>
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                        <p className="text-xl md:text-2xl font-mono text-cyan-400 tracking-[0.3em] uppercase drop-shadow-lg">
                            Feuillets
                        </p>
                        <p className="text-lg md:text-xl text-slate-200 font-serif italic max-w-md mt-4 leading-relaxed drop-shadow-md bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-slate-800/50">
                            "Une vie de travail dispersée à travers le temps, rassemblée ici en une seule constellation numérique."
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
