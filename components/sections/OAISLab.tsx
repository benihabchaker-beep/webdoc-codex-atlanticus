"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Loader2, Database, Terminal as TerminalIcon } from "lucide-react";
import { content } from "@/data/content";

type Status = "IDLE" | "DRAGGING" | "PROCESSING" | "TRANSFORMING" | "SECURE";

export default function OAISLab() {
    const [status, setStatus] = useState<Status>("IDLE");
    const [logs, setLogs] = useState<string[]>([]);

    // Audio Refs
    const processInAudio = useRef<HTMLAudioElement | null>(null);
    const successAudio = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize simple SFX
        processInAudio.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.mp3"); // Placeholder tech sound
        processInAudio.current.volume = 0.2;

        successAudio.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.mp3"); // Placeholder success chime
        successAudio.current.volume = 0.3;
    }, []);

    const playSound = (type: 'process' | 'success') => {
        if (type === 'process' && processInAudio.current) {
            processInAudio.current.currentTime = 0;
            processInAudio.current.play().catch(() => { });
        } else if (type === 'success' && successAudio.current) {
            successAudio.current.currentTime = 0;
            successAudio.current.play().catch(() => { });
        }
    };

    const addLog = (text: string) => {
        setLogs(prev => [...prev.slice(-8), `> ${text}`]);
    };

    const handleDrop = () => {
        setStatus("PROCESSING");
        playSound('process');
        addLog("SIP_DETECTED: Ingesting...");
        addLog("VALIDATING_FORMAT: TIFF 6.0 [OK]");

        setTimeout(() => {
            setStatus("TRANSFORMING");
            addLog("METS_WRAPPER: Initializing...");
            addLog("PREMIS_METADATA: Generating UUID...");
        }, 2000);

        setTimeout(() => {
            setStatus("SECURE");
            playSound('success');
            addLog("AIP_CREATED: Storage ID 0x8F92");
            addLog("REPLICATION: Node 1, Node 2, Node 3 [OK]");
        }, 4500);
    };

    // Terminal Typewriter Effect Logic for XML
    useEffect(() => {
        if (status === "SECURE") {
            const xmlLines = [
                "<mets:mets xmlns:mets='http://www.loc.gov/METS/'>",
                "  <mets:dmdSec ID='DMD_001'>",
                "    <mets:mdWrap MDTYPE='MODS'>",
                "      <mets:xmlData>",
                "        <mods:title>Codex Atlanticus f.1r</mods:title>",
                "      </mets:xmlData>",
                "    </mets:mdWrap>",
                "  </mets:dmdSec>",
                "</mets:mets>"
            ];
            let delay = 0;
            xmlLines.forEach(line => {
                setTimeout(() => addLog(line), delay);
                delay += 300;
            });
        }
    }, [status]);

    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 h-full flex flex-col md:flex-row gap-8">

            {/* Interactive Area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                <h3 className="text-xl font-serif text-slate-200 mb-8">{content.deepDive.oais.title}</h3>

                <motion.div
                    onHoverStart={() => status === "IDLE" && setStatus("DRAGGING")}
                    onHoverEnd={() => status === "DRAGGING" && setStatus("IDLE")}
                    onClick={status === "IDLE" || status === "DRAGGING" ? handleDrop : undefined}
                    animate={{
                        scale: status === "DRAGGING" ? 1.05 : 1,
                        borderColor: status === "SECURE" ? "#10b981" : status === "PROCESSING" ? "#06b6d4" : "#475569"
                    }}
                    className={`
                        w-64 h-64 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden
                        ${status === "IDLE" ? "border-slate-600 bg-slate-800/30" : ""}
                        ${status === "DRAGGING" ? "border-cyan-400 bg-cyan-900/20" : ""}
                        ${status === "PROCESSING" || status === "TRANSFORMING" ? "border-cyan-500 bg-cyan-950/50" : ""}
                        ${status === "SECURE" ? "border-emerald-500 bg-emerald-900/20" : ""}
                    `}
                >
                    <AnimatePresence mode="wait">
                        {status === "IDLE" && (
                            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                <FileDown className="w-12 h-12 text-slate-500 mb-4 mx-auto" />
                                <p className="text-sm text-slate-400 font-mono">DRAG & DROP<br />SIP PACKET</p>
                            </motion.div>
                        )}
                        {(status === "PROCESSING" || status === "TRANSFORMING") && (
                            <motion.div key="prof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4 mx-auto" />
                                <p className="text-sm text-cyan-400 font-mono">CONVERTING...</p>
                            </motion.div>
                        )}
                        {status === "SECURE" && (
                            <motion.div key="secure" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                                <Database className="w-12 h-12 text-emerald-400 mb-4 mx-auto" />
                                <p className="text-sm text-emerald-400 font-mono">AIP SECURED</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="mt-8 text-slate-500 text-xs font-mono">{content.deepDive.oais.instruction}</p>
            </div>

            {/* Terminal Output */}
            <div className="w-full md:w-1/3 bg-black rounded-lg border border-slate-800 p-4 font-mono text-[10px] text-green-500/80 overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <div className="absolute top-2 right-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-2 opacity-50">
                    <TerminalIcon className="w-3 h-3" />
                    <span>OAIS_CORE_LOGS</span>
                </div>
                <div className="flex flex-col gap-1">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="break-all"
                        >
                            {log}
                        </motion.div>
                    ))}
                    <motion.span
                        animate={{ opacity: [0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-2 h-4 bg-green-500 block"
                    />
                </div>
            </div>

        </div>
    );
}
