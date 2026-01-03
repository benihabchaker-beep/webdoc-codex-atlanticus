"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth physics for the ring (lag behind)
    const springConfig = { damping: 25, stiffness: 120 };
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX - 16); // Center the 32px ring
            springY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Detect clickable elements
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest('button') ||
                target.closest('a') ||
                target.style.cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [springX, springY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden hidden md:block">
            {/* 1. Center Dot (Instant) */}
            <motion.div
                className="absolute w-2 h-2 bg-white rounded-full mix-blend-difference"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                    scale: isHovering ? 0.5 : 1,
                }}
                transition={{ type: "tween", duration: 0 }}
            />

            {/* 2. Outer Ring (Lag + Magnetic Scale) */}
            <motion.div
                className="absolute w-8 h-8 border border-white rounded-full mix-blend-difference"
                style={{ x: springX, y: springY }}
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    borderWidth: isHovering ? "1px" : "1px",
                    borderColor: isHovering ? "#ffffff" : "#ffffff" // Mix blend handles color
                }}
            />

            {/* 3. Crosshair Lines (Only on Hover) */}
            <motion.div
                className="absolute w-8 h-8 mix-blend-difference flex items-center justify-center"
                style={{ x: springX, y: springY }}
                animate={{ opacity: isHovering ? 1 : 0, rotate: isHovering ? 90 : 0 }}
            >
                <div className="w-full h-[1px] bg-white absolute" />
                <div className="h-full w-[1px] bg-white absolute" />
            </motion.div>
        </div>
    );
}
