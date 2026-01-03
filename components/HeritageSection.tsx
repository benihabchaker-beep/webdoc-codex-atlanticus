"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Info, History, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data: Les Faits Historiques Précis ---
const hotspots = [
    {
        id: "napoleon",
        x: 30, // % from left
        y: 40, // % from top
        label: "1796",
        icon: History,
        title: "Le Vol de Napoléon",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/50/Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg",
        content: (
            <>
                <p className="text-lg leading-relaxed mb-4">
                    <strong className="text-amber-500">15 Mai 1796.</strong> Napoléon Bonaparte entre à Milan en conquérant.
                    Il n'exige pas seulement de l'or, mais du savoir. Le <em>Codex Atlanticus</em> est saisi à la Bibliothèque Ambrosienne
                    comme "Tribut de Guerre" et expédié à Paris.
                </p>
                <p className="text-slate-300 mb-4">
                    Pendant 17 ans, il restera à l'Institut de France. C'est là que le drame se produit : les chercheurs français,
                    pensant bien faire, tentent de le "classer". Ils désassemblent les reliures originales et confondent l'ordre des pages,
                    brisant la logique cryptique de Léonard.
                </p>
                <div className="bg-slate-900/50 p-4 border-l-2 border-amber-500 text-sm italic text-slate-400">
                    "Il est revenu à Milan en 1815, mais il est revenu... différent. Amputé de sa logique interne."
                </div>
            </>
        )
    },
    {
        id: "colle",
        x: 65,
        y: 60,
        label: "1960",
        icon: AlertTriangle,
        title: "La Chimique Fatale",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg", // En vrai il faudrait une texture de dommage
        content: (
            <>
                <p className="text-lg leading-relaxed mb-4">
                    <strong className="text-red-500">La restauration de l'horreur.</strong> Entre 1962 et 1972, les moines
                    de Grottaferrata entreprennent une restauration "moderne". Pour fixer les feuillets, ils utilisent une colle
                    synthétique expérimentale : le <em>Vinyle</em>.
                </p>
                <p className="text-slate-300 mb-4">
                    40 ans plus tard, en 2008, on découvre des tâches noires qui rongent le papier.
                    L'oxydation de la colle libère du mercure et du soufre. La technologie qui devait le sauver était en train de le tuer.
                </p>
                <p className="text-slate-300">
                    Il a fallu une opération chirurgicale page par page pour retirer chaque micro-gramme de cette colle toxique.
                </p>
            </>
        )
    },
    {
        id: "feuillets",
        x: 50,
        y: 20,
        label: "1 119",
        icon: Info,
        title: "Le Géant de Papier",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Leonardo_da_Vinci_-_Head_of_Leda_-_Google_Art_Project.jpg",
        content: (
            <>
                <p className="text-lg leading-relaxed mb-4">
                    Ce n'est pas un livre. C'est un <strong>cerveau externalisé</strong>.
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                    <li>1 119 Feuillets (le plus grand au monde)</li>
                    <li>Format "Atlanticus" (65x44 cm, taille d'atlas)</li>
                    <li>40 ans de vie (1478-1519)</li>
                </ul>
                <p className="text-slate-300">
                    De la liste de ses courses ("acheter de la craie") aux plans de machines volantes,
                    tout est mélangé. C'est le chaos d'un génie en temps réel.
                </p>
            </>
        )
    }
];

export default function HeritageSection() {
    const [selectedSpot, setSelectedSpot] = useState<(typeof hotspots)[0] | null>(null);

    return (
        <section className="relative h-[120vh] bg-[#0f1014] overflow-hidden flex flex-col items-center justify-center">

            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />

            {/* Main Interactive Stage */}
            <div className="relative z-10 w-full max-w-6xl aspect-[16/9] bg-slate-900/20 backdrop-blur-sm rounded-xl border border-slate-800 shadow-2xl overflow-hidden group">

                {/* The Manuscript Base Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[2s] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')` }}
                />
                <div className="absolute inset-0 bg-black/40" />

                {/* Hotspots Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path
                        d={`M ${hotspots[0].x}% ${hotspots[0].y}% L ${hotspots[2].x}% ${hotspots[2].y}% L ${hotspots[1].x}% ${hotspots[1].y}%`}
                        fill="none"
                        stroke="#f59e0b" // Amber-500
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-30"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </svg>

                {hotspots.map((spot, index) => (
                    <button
                        key={spot.id}
                        onClick={() => setSelectedSpot(spot)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group/spot cursor-pointer z-10"
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    >
                        {/* Pulsing Ripple */}
                        <span className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping" />

                        {/* The Dot */}
                        <div className="relative w-12 h-12 bg-slate-900/90 border border-amber-500/50 rounded-full flex items-center justify-center text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 group-hover/spot:scale-110 group-hover/spot:bg-amber-900/90">
                            <span className="font-mono text-xs font-bold">{index + 1}</span>
                        </div>

                        {/* Label Tooltip */}
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/spot:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-3 py-1 text-xs font-mono text-amber-500 border border-amber-500/30 rounded z-20">
                            {spot.label}
                        </div>
                    </button>
                ))}

                {/* Introduction Overlay (Fades out on interaction could be added, but keeping it simple) */}
                {!selectedSpot && (
                    <div className="absolute bottom-8 left-8 max-w-sm pointer-events-none">
                        <h2 className="text-3xl font-serif text-slate-200 mb-2">Anatomie d'un Désastre</h2>
                        <p className="text-slate-400 text-sm">Explorez les cicatrices du manuscrit. Cliquez sur les points d'intérêt.</p>
                    </div>
                )}
            </div>

            {/* Deep Dive Drawer (Modal/Side-Panel) */}
            <AnimatePresence>
                {selectedSpot && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpot(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-[#0c0d11] border-l border-slate-800 z-50 overflow-y-auto shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedSpot(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Content Container */}
                            <div className="flex flex-col h-full">

                                {/* Visual Header */}
                                <div className="relative h-64 w-full shrink-0">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url('${selectedSpot.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d11] to-transparent" />

                                    {/* Title Floating */}
                                    <div className="absolute bottom-6 left-8">
                                        <span className="font-mono text-amber-500 text-sm tracking-widest mb-2 block">
                                            ARCHIVE #{selectedSpot.label}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
                                            {selectedSpot.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Scrollable Body */}
                                <div className="p-8 md:p-12 space-y-8">
                                    {/* Article Content */}
                                    <div className="prose prose-invert prose-lg">
                                        {selectedSpot.content}
                                    </div>

                                    {/* Interactive Elements (Zoom/Audio Placeholders) */}
                                    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-800">
                                        <button className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-amber-500/30 hover:bg-slate-800 transition-all group">
                                            <ZoomIn className="w-8 h-8 text-slate-500 group-hover:text-amber-500 mb-3" />
                                            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Deep Zoom</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800 transition-all group">
                                            <div className="w-8 h-8 rounded-full border-2 border-slate-600 flex items-center justify-center mb-3 group-hover:border-cyan-500">
                                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-slate-500 border-b-[6px] border-b-transparent ml-1 group-hover:border-l-cyan-500" />
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Écouter l'Expert</span>
                                        </button>
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
