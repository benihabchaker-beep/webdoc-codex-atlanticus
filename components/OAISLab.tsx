"use client";

import { useState, useEffect } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import { FileWarning, FileCheck, CheckCircle, UploadCloud, Database, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OAISLab() {
    const [status, setStatus] = useState<"IDLE" | "DRAGGING" | "PROCESSING" | "TRANSFORMING" | "SECURE">("IDLE");

    // Fake file data that improves as it gets processed
    const fileData = {
        idle: { color: "text-red-500", border: "border-red-500", bg: "bg-red-500/10", icon: FileWarning, label: "CORRUPT_RAW.tiff" },
        secure: { color: "text-[#d4af37]", border: "border-[#d4af37]", bg: "bg-[#d4af37]/10", icon: ShieldCheck, label: "AIP_SECURE_V1.json" },
    };

    useEffect(() => {
        if (status === "PROCESSING") {
            const timer = setTimeout(() => setStatus("TRANSFORMING"), 1500);
            return () => clearTimeout(timer);
        }
        if (status === "TRANSFORMING") {
            const timer = setTimeout(() => setStatus("SECURE"), 1500);
            return () => clearTimeout(timer);
        }
    }, [status]);

    return (
        <section className="relative min-h-screen bg-[#0a0b0e] py-32 px-4 flex flex-col items-center justify-center overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent" />

            <div className="relative z-10 max-w-5xl w-full">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-cyan-400 text-xs font-mono mb-4"
                    >
                        <Database className="w-3 h-3" />
                        <span>LABORATOIRE DE PRESERVATION - PROTOCOLE OAIS</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-100 font-serif mb-4">
                        Sauvez la Mémoire
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        Le modèle OAIS (Open Archival Information System) transforme des données brutes en archives pérennes. <br />
                        <span className="text-cyan-400">Glissez le fichier corrompu vers l'Ingest (SIP) pour le sécuriser.</span>
                    </p>
                </div>

                {/* The Game Area */}
                <div className="grid md:grid-cols-3 gap-8 items-center h-[400px]">

                    {/* ZONE 1: PRODUCER (Source) */}
                    <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-8 h-full flex flex-col items-center justify-center relative overlow-hidden">
                        <div className="absolute top-4 left-4 text-xs font-mono text-slate-500">ZONE: PRODUCTEUR</div>

                        <AnimatePresence>
                            {status === "IDLE" && (
                                <DraggableFile
                                    onDragStart={() => setStatus("DRAGGING")}
                                    onDragEnd={(success) => setStatus(success ? "PROCESSING" : "IDLE")}
                                />
                            )}
                            {status === "SECURE" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-600 font-mono text-sm">
                                    Fichier Tranféré.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ZONE 2: OAIS INGEST (The Machine) */}
                    <div className="relative border-2 border-dashed border-slate-700 rounded-xl max-h-[300px] h-full flex flex-col items-center justify-center transition-colors duration-300"
                        style={{
                            borderColor: status === "DRAGGING" ? "#22d3ee" : status === "PROCESSING" ? "#f59e0b" : status === "SECURE" ? "#d4af37" : "#334155",
                            backgroundColor: status === "DRAGGING" ? "rgba(34, 211, 238, 0.05)" : "transparent"
                        }}
                    >
                        <div className="absolute -top-3 bg-[#0a0b0e] px-2 text-xs font-mono font-bold"
                            style={{ color: status === "DRAGGING" ? "#22d3ee" : "#64748b" }}
                        >
                            SIP INGEST TARGET
                        </div>

                        {/* Inner Feedback */}
                        {status === "PROCESSING" ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center gap-4 text-amber-500"
                            >
                                <Loader2 className="w-10 h-10 animate-spin" />
                                <div className="font-mono text-sm">ANALYSIS & METADATA...</div>
                            </motion.div>
                        ) : status === "TRANSFORMING" ? (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                {/* The Cube Animation */}
                                <div className="w-16 h-16 border-2 border-cyan-500 animate-spin relative flex items-center justify-center">
                                    <div className="w-8 h-8 bg-cyan-500 rounded animate-ping" />
                                </div>
                                <div className="font-mono text-sm text-cyan-400">ENCAPSULATION AIP...</div>
                            </motion.div>
                        ) : status === "SECURE" ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 flex items-center justify-center border border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                                    <ShieldCheck className="w-10 h-10 text-[#d4af37]" />
                                </div>
                                <div className="text-[#d4af37] font-bold font-mono">AIP PACKAGE CREATED</div>
                            </motion.div>
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center pointer-events-none">
                                <UploadCloud className="w-12 h-12 mb-2 opacity-50" />
                                <span className="text-sm">Déposez ici</span>
                            </div>
                        )}
                    </div>

                    {/* ZONE 3: ARCHIVAL STORAGE (Destination) */}
                    <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-8 h-full flex flex-col items-center justify-center opacity-50 transition-opacity duration-500"
                        style={{ opacity: status === "SECURE" ? 1 : 0.5 }}
                    >
                        <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">ZONE: STOCKAGE</div>

                        {status === "SECURE" ? (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-full bg-[#1e293b] p-4 rounded-lg border border-[#d4af37]/30 flex items-center gap-3"
                            >
                                <Database className="w-6 h-6 text-[#d4af37]" />
                                <div className="flex-1 overflow-hidden">
                                    <div className="text-xs text-[#d4af37] font-bold truncate">AIP_SECURE_V1.json</div>
                                    <div className="text-[10px] text-slate-400">Archived: Just now</div>
                                </div>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </motion.div>
                        ) : (
                            <div className="text-slate-700 font-mono text-sm text-center">
                                En attente de paquet AIP validé...
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

function DraggableFile({ onDragStart, onDragEnd }: { onDragStart: () => void, onDragEnd: (success: boolean) => void }) {
    return (
        <motion.div
            drag
            dragSnapToOrigin // Snaps back if not dropped in successful area
            onDragStart={onDragStart}
            onDragEnd={(event, info) => {
                // Simple logic: if dropped roughly in the center (screen coordinates would be needed for robustness, 
                // but for this demo in a controlled grid, we'll assume a drag distance threshold or check intersection manually).

                // Since we can't easily check DOM intersection in simple Framer Motion without ref bounding boxes,
                // we will use a simplifying assumption: if dragged far enough to the right (positive X).
                // The container is ~ large. Let's say > 100px X movement acts as a "drop".
                // In a real app we'd use a more robust Dnd library or measure refs.

                if (info.offset.x > 100 && info.offset.x < 500) {
                    // Simulate "dropped in zone 2" roughly
                    onDragEnd(true);
                } else {
                    onDragEnd(false);
                }
            }}
            whileDrag={{ scale: 1.1, cursor: "grabbing" }}
            className="cursor-grab relative z-50"
        >
            <div className="w-32 h-40 bg-slate-950 border-2 border-red-500/50 rounded-lg flex flex-col items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-red-500 transition-colors">
                <FileWarning className="w-10 h-10 text-red-500 animate-pulse" />
                <div className="bg-red-950/50 px-2 py-1 rounded text-[10px] text-red-400 font-mono">
                    CORRUPT_RAW
                </div>
            </div>
            <div className="absolute -bottom-6 w-full text-center text-xs text-slate-500 animate-bounce">
                Glissez-moi &rarr;
            </div>
        </motion.div>
    );
}
