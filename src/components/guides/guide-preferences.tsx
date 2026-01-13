"use client";

import * as React from "react";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
type OperatingSystem = "mac" | "windows" | "linux";

interface GuidePreferencesContextType {
    packageManager: PackageManager;
    setPackageManager: (pm: PackageManager) => void;
    os: OperatingSystem;
    setOs: (os: OperatingSystem) => void;
}

const GuidePreferencesContext = React.createContext<GuidePreferencesContextType | undefined>(undefined);

export function GuidePreferencesProvider({ children }: { children: React.ReactNode }) {
    const [packageManager, setPackageManagerState] = React.useState<PackageManager>("npm");
    const [os, setOsState] = React.useState<OperatingSystem>("mac");

    // Load from local storage on mount
    React.useEffect(() => {
        const savedPm = localStorage.getItem("guide-preference-pm");
        const savedOs = localStorage.getItem("guide-preference-os");

        if (savedPm && ["npm", "pnpm", "yarn", "bun"].includes(savedPm)) {
            setPackageManagerState(savedPm as PackageManager);
        }
        if (savedOs && ["mac", "windows", "linux"].includes(savedOs)) {
            setOsState(savedOs as OperatingSystem);
        }
    }, []);

    const setPackageManager = (pm: PackageManager) => {
        setPackageManagerState(pm);
        localStorage.setItem("guide-preference-pm", pm);
    };

    const setOs = (newOs: OperatingSystem) => {
        setOsState(newOs);
        localStorage.setItem("guide-preference-os", newOs);
    };

    return (
        <GuidePreferencesContext.Provider value={{ packageManager, setPackageManager, os, setOs }}>
            {children}
        </GuidePreferencesContext.Provider>
    );
}

export function useGuidePreferences() {
    const context = React.useContext(GuidePreferencesContext);
    if (context === undefined) {
        throw new Error("useGuidePreferences must be used within a GuidePreferencesProvider");
    }
    return context;
}
