"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, AlertTriangle, FileWarning, Microscope, History } from "lucide-react";
import { content } from "@/data/content";

type Incident = {
    id: string;
    year: string;
    title: string;
    description: string;
    x: number;
    y: number;
    icon: any;
    mediaArg: { type: 'image' | 'video', src: string, caption: string };
    details: React.ReactNode;
};

const incidents: Incident[] = [
    {
        id: "napoleon",
        year: "1796",
        title: "Le Vol Impérial",
        description: "Napoléon Bonaparte s'empare des manuscrits. Le Codex est démembré.",
        x: 30,
        y: 40,
        icon: History,
        mediaArg: {
            type: 'image',
            src: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Ingres%2C_Napoleon_on_his_Imperial_throne.jpg',
            caption: 'Portrait de Napoléon Ier (Ingres, 1806)'
        },
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Lors de la Campagne d'Italie, Bonaparte exige la remise des chefs-d'œuvre.
                    Le Codex Atlanticus est transféré à Paris.
                </p>
                <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">
                    <p className="text-amber-500 italic text-sm">
                        "C'est ici que la pagination fut perdue à jamais. Les feuillets furent séparés, mélangés, et certains ne revinrent jamais à Milan."
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "moines",
        year: "1960",
        title: "La Chimie Fatale",
        description: "Une restauration désastreuse avec de la colle vinylique.",
        x: 60,
        y: 60,
        icon: FileWarning,
        mediaArg: {
            type: 'image',
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
            caption: 'Analyse spectrale des dégâts chimiques'
        },
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Des moines de Grottaferrata tentent de "sauver" les feuillets en les collant
                    sur des supports modernes.
                </p>
                <ul className="list-disc pl-5 text-base text-slate-400 space-y-2">
                    <li>Utilisation de colles synthétiques instables.</li>
                    <li>Réaction d'oxydation après 50 ans.</li>
                    <li><span className="text-red-400">Noircissement irréversible</span> des bords.</li>
                </ul>
            </div>
        )
    },
    {
        id: "digital",
        year: "2024",
        title: "Bit Rot",
        description: "L'obsolescence silencieuse des formats numériques.",
        x: 50,
        y: 20,
        icon: Microscope,
        mediaArg: {
            type: 'image',
            src: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Glitch_art_01.jpg', // Placeholder for digital corruption
            caption: 'Corruption de données (Bit Rot)'
        },
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Même numérisé, le Codex n'est pas sauvé. La corruption des données (Bit Rot)
                    et l'obsolescence des formats (JPEG vs TIFF) sont les nouveaux ennemis.
                </p>
                <div className="font-mono text-xs bg-black p-4 text-green-500 border border-green-900 rounded overflow-hidden relative">
                    <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
                    ERROR: CORRUPT_HEADER<br />
                    UNREADABLE SECTOR 0x4F2A<br />
                    Attempting recovery... FAILED.
                </div>
            </div>
        )
    }
];

export default function ProblemSection() {
    const [activeIncident, setActiveIncident] = useState<Incident | null>(null);

    return (
        <section id="problematique" className="relative h-screen bg-[#050505] overflow-hidden">

            {/* Background: The "Body" with Radar Effect */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')] bg-cover bg-center opacity-20 grayscale contrast-125">
                {/* Radar Sweep */}
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,0,0,0.1)_360deg)] animate-[spin_10s_linear_infinite] opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,#050505_100%)]" />
            </div>

            {/* Overlay & Title */}
            <div className="absolute top-12 left-12 z-10 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-100 opacity-90 leading-tight">
                    {content.problem.title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h2>
                <div className="mt-8 flex items-center gap-4">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <p className="text-red-500 font-mono text-sm tracking-widest uppercase animate-pulse">
                        {content.problem.status}
                    </p>
                </div>
            </div>

            {/* Connecting Lines (Timeline visual) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-30">
                <path d="M 30% 40% L 60% 60% L 50% 20%" fill="none" stroke="red" strokeWidth="1" strokeDasharray="5,5" />
            </svg>

            {/* Hotspots Layer */}
            <div className="absolute inset-0 z-20">
                {incidents.map((incident) => (
                    <button
                        key={incident.id}
                        onClick={() => setActiveIncident(incident)}
                        className="absolute w-16 h-16 -ml-8 -mt-8 group focus:outline-none"
                        style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
                    >
                        {/* Ripple Effect */}
                        <div className="absolute inset-0 border border-red-500/50 rounded-full animate-ping opacity-20 group-hover:opacity-50 duration-1000" />
                        <div className="absolute -inset-4 border border-red-500/20 rounded-full animate-ping opacity-10 animation-delay-500" />

                        {/* Core Button */}
                        <div className="absolute inset-2 bg-black/80 backdrop-blur-md border border-red-500 rounded-full flex items-center justify-center text-red-500 transition-all group-hover:scale-110 group-hover:bg-red-950/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                            <incident.icon className="w-6 h-6" />
                        </div>

                        {/* Always Visible Badge (Year) */}
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-red-950/80 px-2 py-1 rounded text-[10px] font-mono text-red-200 border border-red-900 whitespace-nowrap">
                            {incident.year}
                        </div>
                    </button>
                ))}
            </div>

            {/* Drawer (The Investigation) */}
            <AnimatePresence>
                {activeIncident && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setActiveIncident(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40"
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-full md:w-[600px] bg-slate-950 border-l border-red-900/30 z-50 p-0 overflow-y-auto shadow-2xl flex flex-col"
                        >
                            {/* Header Image/Video Area */}
                            <div className="relative h-64 w-full bg-slate-900 overflow-hidden shrink-0">
                                <img
                                    src={activeIncident.mediaArg.src}
                                    alt={activeIncident.title}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                                <button
                                    onClick={() => setActiveIncident(null)}
                                    className="absolute top-6 right-6 p-2 bg-black/50 rounded-full text-slate-300 hover:text-white hover:bg-red-500/80 transition-all backdrop-blur"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-6 left-8">
                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded mb-2 inline-block">PREUVE #{activeIncident.year}</span>
                                    <h3 className="text-3xl font-serif text-white">{activeIncident.title}</h3>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-8 md:p-12 flex-1 relative">
                                {/* Decorative Tech Lines */}
                                <div className="absolute top-0 left-8 w-px h-full bg-slate-800" />

                                <div className="relative pl-8">
                                    <div className="flex items-center gap-2 text-red-400 mb-6 text-sm font-mono uppercase tracking-widest">
                                        <AlertTriangle className="w-4 h-4" />
                                        Rapport d'incident
                                    </div>

                                    <p className="text-2xl text-slate-200 font-light leading-relaxed mb-8">
                                        {activeIncident.description}
                                    </p>

                                    <div className="border-t border-slate-800 pt-8 text-lg text-slate-400">
                                        {activeIncident.details}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
}
