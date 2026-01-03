"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, AlertTriangle, FileWarning } from "lucide-react";

type Incident = {
    id: string;
    year: string;
    title: string;
    description: string;
    x: number; // Percentage
    y: number; // Percentage
    icon: any;
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
        icon: AlertTriangle,
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Lors de la Campagne d'Italie, Bonaparte exige la remise des chefs-d'œuvre.
                    Le Codex Atlanticus est transféré à Paris.
                </p>
                <p className="text-amber-500 italic">
                    "C'est ici que la pagination fut perdue à jamais."
                </p>
                <div className="h-40 bg-slate-800 rounded border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-500">
                    [CARTE: MILAN ➡️ PARIS]
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
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Des moines de Grottaferrata tentent de "sauver" les feuillets en les collant
                    sur des supports modernes.
                </p>
                <p>
                    50 ans plus tard, <span className="text-red-500">la colle noircit</span> et attaque l'encre originale.
                </p>
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
        icon: Search,
        details: (
            <div className="space-y-4 font-serif text-slate-300 text-lg">
                <p>
                    Même numérisé, le Codex n'est pas sauvé. La corruption des données (Bit Rot)
                    et l'obsolescence des formats (JPEG vs TIFF) sont les nouveaux ennemis.
                </p>
                <div className="font-mono text-xs bg-black p-2 text-green-500 border border-green-900">
                    ERROR: CORRUPT_HEADER<br />
                    UNREADABLE SECTOR 0x4F2A
                </div>
            </div>
        )
    }
];

export default function ProblemSection() {
    const [activeIncident, setActiveIncident] = useState<Incident | null>(null);

    return (
        <section id="problematique" className="relative h-screen bg-[#050505] overflow-hidden">

            {/* Background: The "Body" */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')] bg-cover bg-center opacity-30 grayscale contrast-125" />

            {/* Overlay & Title */}
            <div className="absolute top-12 left-12 z-10 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-100 opacity-90">
                    AUTOPSIE<br />DU DÉSASTRE
                </h2>
                <p className="mt-4 text-slate-400 max-w-md font-mono text-sm border-l-2 border-red-500 pl-4">
                    RAPPORT D'INCIDENT #842<br />
                    STATUS: CRITIQUE
                </p>
            </div>

            {/* Hotspots Layer */}
            <div className="absolute inset-0 z-20">
                {incidents.map((incident) => (
                    <button
                        key={incident.id}
                        onClick={() => setActiveIncident(incident)}
                        className="absolute w-12 h-12 -ml-6 -mt-6 group focus:outline-none"
                        style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
                    >
                        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20 group-hover:opacity-50" />
                        <div className="absolute inset-2 bg-red-950/80 backdrop-blur-sm border border-red-500 rounded-full flex items-center justify-center text-red-500 transition-transform group-hover:scale-110">
                            <incident.icon className="w-4 h-4" />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute text-center w-32 left-1/2 -translate-x-1/2 top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded border border-red-900 text-xs text-red-100 pointer-events-none">
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
                            className="absolute right-0 top-0 bottom-0 w-full md:w-[500px] bg-slate-950 border-l border-slate-800 z-50 p-12 overflow-y-auto shadow-2xl"
                        >
                            <button
                                onClick={() => setActiveIncident(null)}
                                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <div className="mt-12">
                                <span className="text-red-500 font-mono text-sm tracking-widest">{activeIncident.year}</span>
                                <h3 className="text-4xl font-serif text-white mt-2 mb-8">{activeIncident.title}</h3>
                                <p className="text-xl text-slate-300 leading-relaxed mb-12">
                                    {activeIncident.description}
                                </p>

                                <div className="border-t border-slate-800 pt-8 text-lg text-slate-400">
                                    {activeIncident.details}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
}
