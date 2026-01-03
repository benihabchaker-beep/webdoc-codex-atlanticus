"use client";

import { motion } from "framer-motion";

interface NarrativeBridgeProps {
    text: string;
}

export default function NarrativeBridge({ text }: NarrativeBridgeProps) {
    return (
        <section className="min-h-[50vh] flex items-center justify-center bg-[#050505] overflow-hidden py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1 }}
                className="max-w-3xl px-8 text-center"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-900 to-transparent mx-auto mb-8" />
                <h3 className="text-2xl md:text-4xl font-serif text-slate-300 leading-relaxed tracking-wide">
                    "{text}"
                </h3>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-900 to-transparent mx-auto mt-8" />
            </motion.div>
        </section>
    );
}
