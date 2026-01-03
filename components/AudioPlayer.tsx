"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Initialize Audio Object
        // Using a reliable Google Cloud hosted MP3 to avoid NotSupportedError
        audioRef.current = new Audio("https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.2; // Ambient level

        const attemptPlay = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    })
                    .catch(() => {
                        // Expected if user hasn't interacted yet
                    });
            }
        };

        // Listen for interaction anywhere
        window.addEventListener('click', attemptPlay, { once: true });

        return () => {
            window.removeEventListener('click', attemptPlay);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [hasInteracted]);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent re-triggering the global listener if clicked directly
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[90]">
            <button
                onClick={togglePlay}
                className="relative group flex items-center justify-center w-12 h-12 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full hover:border-cyan-500 transition-colors shadow-2xl overflow-hidden"
            >
                {/* Visualizer Simulation */}
                {isPlaying && (
                    <div className="absolute inset-0 flex items-end justify-center gap-[2px] pb-3 opacity-30">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-1 bg-cyan-400 animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s`, height: '60%' }} />
                        ))}
                    </div>
                )}

                <span className="relative z-10 text-cyan-400">
                    {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                </span>
            </button>
        </div>
    );
}
