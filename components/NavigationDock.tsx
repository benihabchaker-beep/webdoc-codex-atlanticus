"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // Note: We might need to install react-scroll or just use custom scrolling
import { Home, BookOpen, Search, Network } from "lucide-react";
import { useState } from "react";

// Using simple anchor scrolling for now to avoid extra deps if possible, 
// but smooth scroll behavior in CSS is already set.

const navItems = [
    { id: "hero", icon: Home, label: "ACCUEIL" },
    { id: "heritage", icon: BookOpen, label: "HÉRITAGE" },
    { id: "lens", icon: Search, label: "DÉCRYPTAGE" },
    { id: "oais", icon: Network, label: "ARCHIVE" },
];

export default function NavigationDock() {
    const [hovered, setHovered] = useState<string | null>(null);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        onMouseEnter={() => setHovered(item.id)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative group p-3 rounded-full hover:bg-slate-800 transition-colors"
                    >
                        <item.icon className={`w-5 h-5 ${hovered === item.id ? "text-cyan-400" : "text-slate-400"} transition-colors`} />

                        {/* Tooltip */}
                        {hovered === item.id && (
                            <motion.div
                                layoutId="navTooltip"
                                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-700 px-3 py-1 rounded text-xs font-mono text-cyan-400 whitespace-nowrap"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {item.label}
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-b border-r border-slate-700 rotate-45" />
                            </motion.div>
                        )}

                        {/* Active Indicator (Mock logic for now, could be improved with intersection observer) */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-transparent group-hover:bg-cyan-500 rounded-full transition-colors" />
                    </button>
                ))}
            </div>
        </div>
    );
}
