"use client";

import { useUI } from "./UIContext";
import { motion } from "framer-motion";

export default function NoiseOverlay() {
    let { grainIntensity } = { grainIntensity: 0.1 }; // Default fallback
    try {
        const ui = useUI();
        grainIntensity = ui.grainIntensity;
    } catch (e) {
        // UIProvider might not be up yet in some renders
    }

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
            animate={{ opacity: grainIntensity }}
            transition={{ duration: 1.5 }}
        >
            <div className="absolute inset-0 bg-repeat opacity-[0.5] mix-blend-overlay w-[200%] h-[200%] animate-grain"
                style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />
        </motion.div>
    );
}
