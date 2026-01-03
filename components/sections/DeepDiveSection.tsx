"use client";

import { content } from "@/data/content";
import OAISLab from "./OAISLab";
import NeuralDecoder from "./NeuralDecoder";
import { Server, Cpu } from "lucide-react";

export default function DeepDiveSection() {
    return (
        <section id="developpement" className="relative bg-[#050505] py-32 border-t border-slate-900">

            {/* Section Header */}
            <div className="container mx-auto px-4 mb-24 text-center">
                <h2 className="text-4xl md:text-6xl font-serif text-slate-100 mb-4">{content.deepDive.title}</h2>
                <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">{content.deepDive.subtitle}</p>
            </div>

            <div className="container mx-auto px-4 grid gap-32">

                {/* SUB-SECTION A: OAIS ARCHITECTURE */}
                <div className="grid md:grid-cols-[300px_1fr] gap-12">
                    <div className="text-left">
                        <div className="bg-slate-900/50 p-4 rounded-lg inline-block mb-6 border border-slate-800">
                            <Server className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-serif text-slate-200 mb-4">Architecture OAIS</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            La norme ISO 14721 définit un système d'information ouvert pour l'archivage.
                            Le processus d'ingestion transforme les données brutes (SIP) en paquets d'archivage (AIP) pérennes.
                        </p>
                    </div>

                    {/* The Interactive Lab */}
                    <div className="h-[500px]">
                        <OAISLab />
                    </div>
                </div>

                {/* SUB-SECTION B: NEURAL SCIENCE */}
                <div className="grid md:grid-cols-[1fr_300px] gap-12">
                    <div className="order-2 md:order-1 h-[500px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                        <NeuralDecoder />
                    </div>

                    <div className="text-right order-1 md:order-2">
                        <div className="bg-slate-900/50 p-4 rounded-lg inline-block mb-6 border border-slate-800">
                            <Cpu className="w-8 h-8 text-cyan-500" />
                        </div>
                        <h3 className="text-2xl font-serif text-slate-200 mb-4">Intelligence Artificielle</h3>
                        <p className="text-slate-400 leading-relaxed text-sm">
                            L'utilisation de réseaux de neurones convolutionnels (CNN) permet de restaurer les tracés disparus.
                            Le système atteint une précision de reconnaissance de 99.8%.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
