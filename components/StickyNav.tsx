"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
    { id: "intro", label: "Introduction" },
    { id: "corpus", label: "Le Corpus" },
    { id: "problematique", label: "Problématique" },
    { id: "etat-art", label: "État de l'Art" },
    { id: "methodologie", label: "Méthodologie" },
    { id: "developpement", label: "Développement" },
    { id: "resultats", label: "Résultats" },
    { id: "conclusion", label: "Conclusion" }
];

export default function StickyNav() {
    const [activeSection, setActiveSection] = useState("intro");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            {sections.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="group relative flex items-center justify-end"
                >
                    <span
                        className={`absolute right-6 px-2 py-1 rounded bg-slate-900/80 text-white text-[10px] font-mono tracking-widest opacity-0 transition-opacity duration-300 pointer-events-none ${activeSection === id ? 'group-hover:opacity-100' : 'group-hover:opacity-100'}`}
                    >
                        {label}
                    </span>
                    <motion.div
                        animate={{
                            scale: activeSection === id ? 1.5 : 1,
                            backgroundColor: activeSection === id ? "#22d3ee" : "#475569"
                        }}
                        className="w-2 h-2 rounded-full transition-colors duration-300"
                    />
                </button>
            ))}
        </div>
    );
}
