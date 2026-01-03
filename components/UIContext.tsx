"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UIContextType = {
    grainIntensity: number;
    setGrainIntensity: (intensity: number) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
    const [grainIntensity, setGrainIntensity] = useState(0.05); // Default subtle

    return (
        <UIContext.Provider value={{ grainIntensity, setGrainIntensity }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error("useUI must be used within a UIProvider");
    }
    return context;
}
