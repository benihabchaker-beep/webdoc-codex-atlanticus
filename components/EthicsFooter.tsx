"use client";

import { Lock, FileText, Share2, Github, ExternalLink } from "lucide-react";

export default function EthicsFooter() {
    return (
        <section id="ethics" className="py-24 px-4 bg-black border-t border-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* Main Question */}
                <div className="text-center mb-24">
                    <div className="inline-block p-4 rounded-full bg-slate-900/50 border border-slate-800 mb-8 blur-[1px]">
                        <Lock className="w-8 h-8 text-slate-500" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif text-white opacity-90 tracking-tight leading-none mix-blend-exclusion">
                        À QUI APPARTIENT <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-white">LA MÉMOIRE ?</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-16 border-t border-slate-900 pt-16">

                    {/* 1. MANIFESTE */}
                    <div>
                        <h4 className="flex items-center gap-2 text-cyan-500 font-mono text-xs uppercase tracking-widest mb-6">
                            <FileText className="w-4 h-4" /> Manifeste Numérique
                        </h4>
                        <div className="prose prose-invert prose-sm text-slate-400">
                            <p>
                                Ce projet n'est pas seulement une archive ; c'est un acte de résistance contre l'oubli.
                                Dans un monde où les données sont fuyantes, nous proposons un modèle de
                                <span className="text-white font-bold"> "Sanctuaire Numérique"</span>.
                            </p>
                            <p>
                                Nous croyons que le patrimoine de l'humanité doit être :
                            </p>
                            <ul className="list-disc pl-4 space-y-2">
                                <li><span className="text-white">Décentralisé</span> (IPFS / Blockchain)</li>
                                <li><span className="text-white">Intelligible</span> (Sémantique IA)</li>
                                <li><span className="text-white">Universel</span> (Open Source)</li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. CONNEXIONS */}
                    <div>
                        <h4 className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-widest mb-6">
                            <Share2 className="w-4 h-4" /> Réseau Connexe
                        </h4>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="flex items-center justify-between group p-4 border border-slate-800 rounded-lg hover:bg-slate-900 transition-colors">
                                    <div>
                                        <div className="text-white font-bold group-hover:text-amber-500 transition-colors">Europeana</div>
                                        <div className="text-xs text-slate-500">Bibliothèque Numérique Européenne</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-between group p-4 border border-slate-800 rounded-lg hover:bg-slate-900 transition-colors">
                                    <div>
                                        <div className="text-white font-bold group-hover:text-amber-500 transition-colors">IIIF Consortium</div>
                                        <div className="text-xs text-slate-500">International Image Interoperability Framework</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white" />
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center justify-between group p-4 border border-slate-800 rounded-lg hover:bg-slate-900 transition-colors">
                                    <div>
                                        <div className="text-white font-bold group-hover:text-amber-500 transition-colors">Internet Archive</div>
                                        <div className="text-xs text-slate-500">Wayback Machine</div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-white" />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                <footer className="mt-24 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono uppercase">
                    <div className="flex items-center gap-4">
                        <span>Codex Atlanticus 2.0</span>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span>University Research Project</span>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white flex items-center gap-1"><Github className="w-3 h-3" /> Source Code</a>
                        <span className="w-1 h-1 bg-slate-800 rounded-full" />
                        <span>MIT License</span>
                    </div>
                </footer>
            </div>
        </section>
    );
}
