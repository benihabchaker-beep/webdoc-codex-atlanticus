"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Check, ChevronRight, X, AlertTriangle, FileWarning, Microscope, History } from "lucide-react";
import { content } from "@/data/content";

type StoryStep = {
    id: string;
    year: string;
    title: string;
    lockedTitle: string;
    description: string;
    x: number;
    y: number;
    icon: any;
    mediaArg: { src: string };
    transformOrigin: string;
    details: React.ReactNode;
};

const steps: StoryStep[] = [
    {
        id: "napoleon",
        year: "1796",
        title: "Le Grand Pillage",
        lockedTitle: "L'Origine du Mal",
        description: "Napoléon exige le Codex comme butin de guerre. Les feuillets sont désolidarisés, mélangés, et transportés en charrettes vers Paris. Le début du chaos.",
        x: 25,
        y: 40,
        icon: History,
        mediaArg: { src: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Ingres%2C_Napoleon_on_his_Imperial_throne.jpg' },
        transformOrigin: "30% 20%",
        details: (
            <div className="space-y-4 font-serif text-slate-300">
                <p>
                    Lors de la Campagne d'Italie, Bonaparte exige la remise des chefs-d'œuvre.
                    Le Codex Atlanticus est transféré à Paris comme butin de guerre.
                </p>
                <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">
                    <p className="text-amber-500 italic text-sm">
                        "C'est ici que la pagination fut perdue à jamais. Les feuillets furent séparés pour être encadrés."
                    </p>
                </div>
            </div>
        )
    },
    {
        id: "moines",
        year: "1960",
        title: "La Chimère Chimique",
        lockedTitle: "Le Silence des Moines",
        description: "Au laboratoire de Grottaferrata, des moines tentent de sauver le papier. Ils utilisent de la colle vinyle. 40 ans plus tard, cette colle réagit chimiquement et crée des taches noires irréversibles.",
        x: 50,
        y: 60,
        icon: FileWarning,
        mediaArg: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' },
        transformOrigin: "80% 80%",
        details: (
            <div className="space-y-4 font-serif text-slate-300">
                <p>
                    Des moines de Grottaferrata tentent de "sauver" les feuillets en les collant sur des supports modernes.
                </p>
                <ul className="list-disc pl-5 text-base text-slate-400 space-y-2">
                    <li>Utilisation de colles synthétiques instables.</li>
                    <li>Réaction d'oxydation après 50 ans.</li>
                </ul>
            </div>
        )
    },
    {
        id: "digital",
        year: "2024",
        title: "L'Urgence Absolue",
        lockedTitle: "Le Danger Invisible",
        description: "Chaque jour, l'encre s'efface un peu plus. La numérisation n'est plus une option, c'est une opération de sauvetage.",
        x: 75,
        y: 35,
        icon: Microscope,
        mediaArg: { src: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Glitch_Art.jpg' },
        transformOrigin: "50% 50%",
        details: (
            <div className="space-y-4 font-serif text-slate-300">
                <p>
                    Même numérisé, le Codex n'est pas sauvé. La corruption des données (Bit Rot)
                    et l'obsolescence des formats (JPEG vs TIFF) sont les nouveaux ennemis.
                </p>
                <div className="font-mono text-xs bg-black p-4 text-green-500 border border-green-900 rounded overflow-hidden">
                    ERROR: CORRUPT_HEADER<br />
                    UNREADABLE SECTOR 0x4F2A
                </div>
            </div>
        )
    }
];

interface NarrativeJourneyProps {
    onUnlock?: () => void;
}

export default function NarrativeJourney({ onUnlock }: NarrativeJourneyProps) {
    const [progress, setProgress] = useState(0); // 0 = unlocking step 1, 1 = unlocking step 2... 3 = finished
    const [activeStep, setActiveStep] = useState<StoryStep | null>(null);

    // Lock body scroll when a step is active (modal open)
    useEffect(() => {
        if (activeStep) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeStep]);

    const handleStepClick = (index: number) => {
        if (index <= progress) {
            setActiveStep(steps[index]);
        }
    };

    const handleCompleteStep = () => {
        if (activeStep) {
            const index = steps.findIndex(s => s.id === activeStep.id);
            if (index === progress) {
                setProgress(prev => prev + 1);
            }

            // Auto-advance to next step if available
            if (index < steps.length - 1) {
                setActiveStep(steps[index + 1]);
            } else {
                setActiveStep(null);
            }
        }
    };

    return (
        <section id="problematique" className="relative h-screen bg-[#050505] overflow-hidden">

            {/* 1. BACKGROUND ZOOM EFFECT */}
            <motion.div
                className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b4/Leonardo_da_Vinci_-_Ambrosiana-Codice-Atlantico-Codex-Atlanticus-f-1-recto.jpg')] bg-cover bg-center opacity-30 grayscale contrast-125"
                animate={{
                    scale: activeStep ? (activeStep.id === 'moines' ? 2 : 1.5) : 1,
                    x: activeStep ? (activeStep.id === 'napoleon' ? "10%" : activeStep.id === 'moines' ? "-20%" : "0%") : "0%",
                    y: activeStep ? (activeStep.id === 'napoleon' ? "10%" : activeStep.id === 'moines' ? "-20%" : "0%") : "0%",
                    transformOrigin: activeStep ? activeStep.transformOrigin : "center center",
                }}
                transition={{ duration: 1.5, type: "spring", damping: 20 }}
            />

            {/* Global Overlay (Vignette) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#050505_100%)] pointer-events-none" />

            {/* 2. INTRO TEXT */}
            <AnimatePresence>
                {!activeStep && progress < 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="absolute top-12 left-0 right-0 text-center z-10 px-4 pointer-events-none"
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-slate-100 mb-6">{content.problem.title}</h2>
                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8" />
                        <p className="text-slate-300 font-serif text-lg max-w-2xl mx-auto leading-relaxed bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/5 shadow-2xl">
                            {content.problem.description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. TIMELINE SVG (Connecting the dots) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ opacity: activeStep ? 0.1 : 0.5 }}>
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
                        <stop offset={`${(progress / 2) * 100}%`} stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#334155" stopOpacity="0.3" />
                    </linearGradient>
                </defs>
                {/* Bezier curve through points */}
                <motion.path
                    d={`M ${steps[0].x}% ${steps[0].y}% Q 50% 80% ${steps[1].x}% ${steps[1].y}% T ${steps[2].x}% ${steps[2].y}%`}
                    fill="none"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progress / 3 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>

            {/* 4. THE STEPS (GANTLET) */}
            <div className="absolute inset-0 z-20">
                {steps.map((step, index) => {
                    const isUnlocked = index <= progress;
                    const isCompleted = index < progress;
                    const isCurrent = index === progress;

                    return (
                        <div key={step.id} className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2" style={{ left: `${step.x}%`, top: `${step.y}%` }}>
                            <motion.button
                                onClick={() => handleStepClick(index)}
                                disabled={!isUnlocked}
                                className={`
                                    relative w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500
                                    ${isCompleted ? 'bg-emerald-900/50 border-emerald-500 text-emerald-400' : ''}
                                    ${isCurrent ? 'bg-red-900/50 border-red-500 text-red-100 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : ''}
                                    ${!isUnlocked ? 'bg-slate-900/80 border-slate-700 text-slate-600 grayscale cursor-not-allowed' : ''}
                                `}
                                whileHover={isUnlocked ? { scale: 1.2 } : {}}
                            >
                                {isCompleted ? <Check className="w-6 h-6" /> : isCurrent ? <Unlock className="w-6 h-6 animate-pulse" /> : <Lock className="w-5 h-5" />}
                            </motion.button>

                            {/* Label */}
                            <div className="mt-4 w-48 text-center pt-4 pointer-events-none">
                                <span className={`text-[10px] font-mono border px-1 rounded ${isUnlocked ? 'border-red-500/30 text-red-400' : 'border-slate-800 text-slate-600'}`}>
                                    {step.year}
                                </span>
                                <h3 className={`text-sm font-bold mt-1 ${isUnlocked ? 'text-white' : 'text-slate-600'}`}>
                                    {isUnlocked ? step.title : step.lockedTitle}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 5. DRAWER (DEEP DIVE) */}
            <AnimatePresence>
                {activeStep && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl z-40"
                            onClick={() => setActiveStep(null)}
                        />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25 }}
                            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-slate-950 border-l border-red-900/30 z-50 overflow-y-auto flex flex-col"
                        >
                            {/* Header Image */}
                            <div className="h-80 relative shrink-0">
                                <img src={activeStep.mediaArg.src} alt="Archive" className="w-full h-full object-cover object-top" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                                <button onClick={() => setActiveStep(null)} className="absolute top-6 right-6 p-2 bg-black/50 rounded-full hover:bg-white/20 transition"><X /></button>
                            </div>

                            {/* Content */}
                            <div className="p-10 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-red-500 font-mono text-sm mb-4">
                                    <activeStep.icon className="w-4 h-4" />
                                    <span>ARCHIVE #{activeStep.year}</span>
                                </div>
                                <h3 className="text-4xl font-serif text-white mb-6">{activeStep.title}</h3>
                                <p className="text-xl text-slate-300 leading-relaxed mb-8">{activeStep.description}</p>
                                <div className="mb-12">{activeStep.details}</div>

                                {/* Action Buttons */}
                                <div className="mt-auto pt-8 border-t border-slate-800 flex justify-end">
                                    <button
                                        onClick={handleCompleteStep}
                                        className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg group"
                                    >
                                        {steps.indexOf(activeStep) === steps.length - 1 ? "VOIR LA CONCLUSION" : "SUIVANT : IMPACT"}
                                        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* 6. FINAL SYNTHESIS (Appears after completion) */}
            {progress === 3 && (
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 z-50 bg-[#0f1014]/95 flex flex-col items-center justify-center text-center p-8"
                >
                    <motion.div
                        initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">Le Temps est Compté.</h2>
                        <p className="text-xl text-slate-300 mb-12">
                            L'histoire s'effrite. Nos supports numériques pourrissent aussi vite que le papier.<br />
                            Il est temps de passer à la méthode scientifique.
                        </p>
                        <button
                            onClick={() => {
                                setProgress(4);
                                if (onUnlock) onUnlock();
                                setTimeout(() => {
                                    document.getElementById('etat-art')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-cyan-400 transition-colors"
                        >
                            DÉCOUVRIR LA SOLUTION
                        </button>
                    </motion.div>
                </motion.div>
            )}

        </section>
    );
}
