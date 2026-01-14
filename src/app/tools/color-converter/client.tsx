"use client";

import { useState, useMemo, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pipette, Copy, Check, Shuffle } from "lucide-react";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const clean = hex.replace("#", "");
    if (!/^[0-9A-Fa-f]{6}$/.test(clean) && !/^[0-9A-Fa-f]{3}$/.test(clean)) return null;

    let r, g, b;
    if (clean.length === 3) {
        r = parseInt(clean[0] + clean[0], 16);
        g = parseInt(clean[1] + clean[1], 16);
        b = parseInt(clean[2] + clean[2], 16);
    } else {
        r = parseInt(clean.slice(0, 2), 16);
        g = parseInt(clean.slice(2, 4), 16);
        b = parseInt(clean.slice(4, 6), 16);
    }
    return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;

    if (s === 0) {
        const v = Math.round(l * 255);
        return { r: v, g: v, b: v };
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
        r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, h) * 255),
        b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
    };
}

function getContrastColor(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

// Preset color palettes
const COLOR_PALETTES = [
    { name: "Brand Colors", colors: ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#eab308", "#22c55e", "#14b8a6"] },
    { name: "Pastels", colors: ["#fecaca", "#fed7aa", "#fef08a", "#bbf7d0", "#a5f3fc", "#c7d2fe", "#e9d5ff", "#fce7f3"] },
    { name: "Dark Mode", colors: ["#0f172a", "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8", "#cbd5e1", "#f1f5f9"] },
    { name: "Vibrant", colors: ["#ff0000", "#ff8000", "#ffff00", "#80ff00", "#00ff80", "#00ffff", "#0080ff", "#8000ff"] },
];

export default function ColorConverterPage() {
    const [hex, setHex] = useState("#6366f1");
    const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
    const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    const updateFromHex = (value: string) => {
        setHex(value);
        const parsed = hexToRgb(value);
        if (parsed) {
            setRgb(parsed);
            setHsl(rgbToHsl(parsed.r, parsed.g, parsed.b));
        }
    };

    const updateFromRgb = (newRgb: { r: number; g: number; b: number }) => {
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
        setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    };

    const updateFromHsl = (newHsl: { h: number; s: number; l: number }) => {
        setHsl(newHsl);
        const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgb(newRgb);
        setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    };

    const copyValue = async (value: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedValue(value);
        setTimeout(() => setCopiedValue(null), 1500);
    };

    const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        updateFromRgb({ r, g, b });
    };

    const hexString = hex.toUpperCase();
    const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const rgbaString = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
    const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    return (
        <ToolLayout
            title="Color Converter"
            description="Convert between HEX, RGB, and HSL color formats"
        >
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Color Preview */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* Large Color Preview */}
                            <div className="relative">
                                <div
                                    className="w-32 h-32 rounded-2xl shadow-lg border-4 border-background transition-colors"
                                    style={{ backgroundColor: hex }}
                                />
                                <Input
                                    type="color"
                                    value={hex}
                                    onChange={(e) => updateFromHex(e.target.value)}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-32 h-32"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <Pipette className="h-6 w-6" style={{ color: getContrastColor(hex) }} />
                                </div>
                            </div>

                            {/* Color Values */}
                            <div className="flex-1 space-y-2 w-full">
                                {[
                                    { label: "HEX", value: hexString },
                                    { label: "RGB", value: rgbString },
                                    { label: "RGBA", value: rgbaString },
                                    { label: "HSL", value: hslString },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => copyValue(item.value)}
                                        className="w-full flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Badge variant="outline" className="w-12 justify-center">
                                                {item.label}
                                            </Badge>
                                            <code className="font-mono text-sm">{item.value}</code>
                                        </div>
                                        {copiedValue === item.value ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Controls */}
                <Tabs defaultValue="sliders" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="sliders">Sliders</TabsTrigger>
                        <TabsTrigger value="input">Manual Input</TabsTrigger>
                        <TabsTrigger value="palettes">Palettes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="sliders" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm">HSL Controls</CardTitle>
                                    <Button variant="outline" size="sm" onClick={randomColor}>
                                        <Shuffle className="h-3 w-3 mr-1" />
                                        Random
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Hue */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs">Hue</Label>
                                        <span className="text-xs text-muted-foreground">{hsl.h}°</span>
                                    </div>
                                    <div
                                        className="h-3 rounded-full"
                                        style={{
                                            background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"
                                        }}
                                    />
                                    <Slider
                                        value={[hsl.h]}
                                        min={0}
                                        max={360}
                                        step={1}
                                        onValueChange={([h]) => updateFromHsl({ ...hsl, h })}
                                    />
                                </div>

                                {/* Saturation */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs">Saturation</Label>
                                        <span className="text-xs text-muted-foreground">{hsl.s}%</span>
                                    </div>
                                    <div
                                        className="h-3 rounded-full"
                                        style={{
                                            background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`
                                        }}
                                    />
                                    <Slider
                                        value={[hsl.s]}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={([s]) => updateFromHsl({ ...hsl, s })}
                                    />
                                </div>

                                {/* Lightness */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label className="text-xs">Lightness</Label>
                                        <span className="text-xs text-muted-foreground">{hsl.l}%</span>
                                    </div>
                                    <div
                                        className="h-3 rounded-full"
                                        style={{
                                            background: `linear-gradient(to right, #000000, hsl(${hsl.h}, ${hsl.s}%, 50%), #ffffff)`
                                        }}
                                    />
                                    <Slider
                                        value={[hsl.l]}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={([l]) => updateFromHsl({ ...hsl, l })}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="input" className="mt-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Manual Input</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {/* HEX Input */}
                                    <div className="space-y-2">
                                        <Label className="text-xs">HEX</Label>
                                        <Input
                                            value={hex}
                                            onChange={(e) => updateFromHex(e.target.value)}
                                            placeholder="#000000"
                                            className="font-mono"
                                        />
                                    </div>

                                    {/* RGB Input */}
                                    <div className="space-y-2">
                                        <Label className="text-xs">RGB</Label>
                                        <div className="flex gap-1">
                                            {(["r", "g", "b"] as const).map((channel) => (
                                                <Input
                                                    key={channel}
                                                    type="number"
                                                    min={0}
                                                    max={255}
                                                    value={rgb[channel]}
                                                    onChange={(e) => updateFromRgb({
                                                        ...rgb,
                                                        [channel]: Math.max(0, Math.min(255, parseInt(e.target.value) || 0))
                                                    })}
                                                    className="font-mono text-center"
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* HSL Input */}
                                    <div className="space-y-2">
                                        <Label className="text-xs">HSL</Label>
                                        <div className="flex gap-1">
                                            <Input
                                                type="number"
                                                min={0}
                                                max={360}
                                                value={hsl.h}
                                                onChange={(e) => updateFromHsl({
                                                    ...hsl,
                                                    h: Math.max(0, Math.min(360, parseInt(e.target.value) || 0))
                                                })}
                                                className="font-mono text-center"
                                            />
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={hsl.s}
                                                onChange={(e) => updateFromHsl({
                                                    ...hsl,
                                                    s: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                                                })}
                                                className="font-mono text-center"
                                            />
                                            <Input
                                                type="number"
                                                min={0}
                                                max={100}
                                                value={hsl.l}
                                                onChange={(e) => updateFromHsl({
                                                    ...hsl,
                                                    l: Math.max(0, Math.min(100, parseInt(e.target.value) || 0))
                                                })}
                                                className="font-mono text-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="palettes" className="mt-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Color Palettes</CardTitle>
                                <CardDescription>Click any color to use it</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {COLOR_PALETTES.map((palette) => (
                                    <div key={palette.name} className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">{palette.name}</Label>
                                        <div className="flex gap-2">
                                            {palette.colors.map((color) => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateFromHex(color)}
                                                    className="w-10 h-10 rounded-lg border-2 border-transparent hover:border-foreground/20 transition-all hover:scale-110 shadow-sm"
                                                    style={{ backgroundColor: color }}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </ToolLayout>
    );
}
