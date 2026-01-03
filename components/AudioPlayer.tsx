"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Reliable ambient track (Standard Test MP3)
        // Using a reliable MP3 source that allows CORS: Galaxy Invaders Theme (Public Domain / Google Demo)
        audioRef.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:bg-cyan-900 transition-colors"
            onClick={togglePlay}
        >
            {isPlaying ? (
                <div className="relative">
                    <Volume2 className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                </div>
            ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
            )}
        </motion.button>
    );
}
