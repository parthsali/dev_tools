"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Clock, CalendarIcon, RefreshCw, Copy, Check, ArrowRight, ArrowLeftRight } from "lucide-react";
import { format } from "date-fns";

export default function TimestampPage() {
    const [timestamp, setTimestamp] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [liveTime, setLiveTime] = useState(new Date());
    const [copiedValue, setCopiedValue] = useState<string | null>(null);

    // Live clock update
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Parse timestamp to date
    const parsedDate = (() => {
        if (!timestamp.trim()) return null;
        const num = parseInt(timestamp);
        if (isNaN(num)) return null;
        try {
            const date = new Date(unit === "seconds" ? num * 1000 : num);
            if (isNaN(date.getTime())) return null;
            return date;
        } catch {
            return null;
        }
    })();

    // Parse date string to timestamp
    const parsedTimestamp = (() => {
        if (!dateInput.trim()) return null;
        try {
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) return null;
            return date.getTime();
        } catch {
            return null;
        }
    })();

    const setCurrentTime = () => {
        const now = Date.now();
        setTimestamp(unit === "seconds" ? Math.floor(now / 1000).toString() : now.toString());
    };

    const setFromCalendar = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            // Set to noon to avoid timezone issues
            date.setHours(12, 0, 0, 0);
            setTimestamp(
                unit === "seconds"
                    ? Math.floor(date.getTime() / 1000).toString()
                    : date.getTime().toString()
            );
        }
    };

    const copyValue = async (value: string) => {
        await navigator.clipboard.writeText(value);
        setCopiedValue(value);
        setTimeout(() => setCopiedValue(null), 1500);
    };

    const liveTimestamp = unit === "seconds"
        ? Math.floor(liveTime.getTime() / 1000)
        : liveTime.getTime();

    return (
        <ToolLayout
            title="Timestamp Converter"
            description="Convert between Unix timestamps and dates"
        >
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Live Time Card */}
                <Card className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
                    <CardContent className="py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-full bg-primary/10">
                                    <Clock className="h-5 w-5 text-primary animate-pulse" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Current Time</p>
                                    <p className="font-mono text-lg">
                                        {liveTime.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => copyValue(liveTimestamp.toString())}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background/80 hover:bg-background transition-colors border"
                                >
                                    <span className="font-mono text-sm">{liveTimestamp}</span>
                                    {copiedValue === liveTimestamp.toString() ? (
                                        <Check className="h-3 w-3 text-emerald-500" />
                                    ) : (
                                        <Copy className="h-3 w-3 text-muted-foreground" />
                                    )}
                                </button>
                                <Badge variant="secondary">{unit}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Unit Toggle */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Unit:</span>
                    <ToggleGroup
                        type="single"
                        value={unit}
                        onValueChange={(v) => v && setUnit(v as typeof unit)}
                        className="bg-muted p-1 rounded-lg"
                    >
                        <ToggleGroupItem
                            value="seconds"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            Seconds
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="milliseconds"
                            className="data-[state=on]:bg-background data-[state=on]:shadow-sm px-4"
                        >
                            Milliseconds
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>

                <Tabs defaultValue="to-date" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="to-date">Timestamp → Date</TabsTrigger>
                        <TabsTrigger value="to-timestamp">Date → Timestamp</TabsTrigger>
                    </TabsList>

                    <TabsContent value="to-date" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Unix Timestamp</CardTitle>
                                <CardDescription>
                                    Enter a Unix timestamp ({unit}) or pick from calendar
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <Input
                                            type="number"
                                            value={timestamp}
                                            onChange={(e) => setTimestamp(e.target.value)}
                                            placeholder={unit === "seconds" ? "1704067200" : "1704067200000"}
                                            className="font-mono pr-20"
                                        />
                                        <Badge
                                            variant="outline"
                                            className="absolute right-2 top-1/2 -translate-y-1/2"
                                        >
                                            {unit}
                                        </Badge>
                                    </div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <CalendarIcon className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setFromCalendar}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Button variant="outline" onClick={setCurrentTime}>
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Now
                                    </Button>
                                </div>

                                {parsedDate && (
                                    <div className="space-y-2">
                                        <Separator />
                                        <Label className="text-xs text-muted-foreground">Converted Date</Label>
                                        <div className="space-y-2">
                                            {[
                                                { label: "ISO 8601", value: parsedDate.toISOString() },
                                                { label: "Local", value: parsedDate.toLocaleString() },
                                                { label: "UTC", value: parsedDate.toUTCString() },
                                                { label: "Date Only", value: format(parsedDate, "MMMM d, yyyy") },
                                                { label: "Time Only", value: format(parsedDate, "h:mm:ss a") },
                                                { label: "RFC 2822", value: format(parsedDate, "EEE, dd MMM yyyy HH:mm:ss xx") },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => copyValue(item.value)}
                                                    className="w-full flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline" className="w-20 justify-center text-xs">
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
                                )}

                                {timestamp && !parsedDate && (
                                    <p className="text-sm text-destructive">Invalid timestamp</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="to-timestamp" className="mt-4 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Date String</CardTitle>
                                <CardDescription>
                                    Enter a date string (ISO, RFC, or common formats)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    value={dateInput}
                                    onChange={(e) => setDateInput(e.target.value)}
                                    placeholder="2024-01-01T00:00:00Z or Jan 1, 2024 12:00 PM"
                                    className="font-mono"
                                />

                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs text-muted-foreground self-center">Quick:</span>
                                    {[
                                        { label: "Now", value: new Date().toISOString() },
                                        { label: "Today", value: format(new Date(), "yyyy-MM-dd") },
                                        { label: "Tomorrow", value: format(new Date(Date.now() + 86400000), "yyyy-MM-dd") },
                                    ].map((preset) => (
                                        <Button
                                            key={preset.label}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDateInput(preset.value)}
                                        >
                                            {preset.label}
                                        </Button>
                                    ))}
                                </div>

                                {parsedTimestamp && (
                                    <div className="space-y-2">
                                        <Separator />
                                        <Label className="text-xs text-muted-foreground">Converted Timestamp</Label>
                                        <div className="space-y-2">
                                            {[
                                                { label: "Seconds", value: Math.floor(parsedTimestamp / 1000).toString() },
                                                { label: "Milliseconds", value: parsedTimestamp.toString() },
                                            ].map((item) => (
                                                <button
                                                    key={item.label}
                                                    onClick={() => copyValue(item.value)}
                                                    className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="outline" className="w-24 justify-center">
                                                            {item.label}
                                                        </Badge>
                                                        <code className="font-mono text-lg">{item.value}</code>
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
                                )}

                                {dateInput && !parsedTimestamp && (
                                    <p className="text-sm text-destructive">Invalid date format</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Reference */}
                <Card className="bg-muted/30">
                    <CardContent className="py-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground mb-1">Epoch</p>
                                <p className="font-mono">January 1, 1970 00:00:00 UTC</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-1">Max 32-bit (2038 problem)</p>
                                <p className="font-mono">2,147,483,647</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ToolLayout>
    );
}
