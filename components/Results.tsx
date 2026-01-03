"use client";

import { motion } from "framer-motion";
import { FileWarning, FileCode, CheckCircle } from "lucide-react";

const cards = [
    {
        title: "Original Abîmé",
        subtitle: "CHAOS PHYSIQUE",
        icon: FileWarning,
        color: "red",
        bg: "bg-red-950/20",
        border: "border-red-900",
        text: "text-red-500",
        content: (
            <div className="w-full h-48 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')] bg-cover bg-center sepia brightness-50 contrast-125 opacity-70" />
        )
    },
    {
        title: "Paquet AIP",
        subtitle: "ORDRE LOGIQUE",
        icon: FileCode,
        color: "amber",
        bg: "bg-amber-950/20",
        border: "border-amber-900",
        text: "text-amber-500",
        content: (
            <div className="w-full h-48 bg-slate-950 p-4 font-mono text-[10px] text-amber-500/80 overflow-hidden leading-tight">
                {"<mets:mets xmlns:mets='http://www.loc.gov/METS/'>"}<br />
                {"  <mets:dmdSec ID='DMA1'>"}<br />
                {"    <mets:mdWrap MDTYPE='DC'>"}<br />
                {"      <dc:title>Codex Atlanticus f.1</dc:title>"}<br />
                {"      <dc:creator>Da Vinci, Leonardo</dc:creator>"}<br />
                {"      <dc:date>1478</dc:date>"}<br />
                {"    </mets:mdWrap>"}<br />
                {"  </mets:dmdSec>"}<br />
                {"  <mets:fileSec>"}<br />
                {"    <mets:fileGrp USE='MASTER'>"}<br />
                {"       <mets:file ID='FILE001' CHECKSUM='a1b2c3d4'/>"}<br />
                {"    </mets:fileGrp>"}<br />
                {"  </mets:fileSec>"}<br />
                {"</mets:mets>"}
            </div>
        )
    },
    {
        title: "Rendu IA",
        subtitle: "SENS RETROUVÉ",
        icon: CheckCircle,
        color: "cyan",
        bg: "bg-cyan-950/20",
        border: "border-cyan-900",
        text: "text-cyan-500",
        content: (
            <div className="relative w-full h-48 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/f1/Leonardo_da_Vinci_-_Head_of_Leda_-_Google_Art_Project.jpg')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border border-cyan-500/50 px-4 py-2 bg-cyan-950/80 backdrop-blur-sm rounded text-cyan-400 font-mono text-xs">
                        RECONSTRUCTION: 100%
                    </div>
                </div>
            </div>
        )
    }
];

export default function Results() {
    return (
        <section id="results" className="py-32 bg-black px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-mono text-xs tracking-widest mb-4 block uppercase">
                        VI. PREUVE DE CONCEPT
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-100">
                        Résultats Comparatifs
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`rounded-xl border ${card.border} ${card.bg} overflow-hidden hover:border-opacity-100 transition-all duration-300`}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-800/50 flex items-center justify-between">
                                <div>
                                    <h3 className={`font-bold text-lg text-slate-200`}>{card.title}</h3>
                                    <p className={`text-[10px] font-mono tracking-widest uppercase ${card.text}`}>{card.subtitle}</p>
                                </div>
                                <card.icon className={`w-6 h-6 ${card.text}`} />
                            </div>

                            {/* Visual Content */}
                            {card.content}

                            {/* Footer Status */}
                            <div className="px-6 py-4 bg-black/20 text-xs text-slate-500 font-mono flex justify-between">
                                <span>STATUS:</span>
                                <span className={card.text}>{["CRITICAL", "SECURE", "OPTIMIZED"][i]}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-xl md:text-2xl font-serif text-slate-400 italic">
                        "Donnée sécurisée. Sens retrouvé. Accès universel."
                    </p>
                </div>
            </div>
        </section>
    );
}
