"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Plus, Trash2, Wand2 } from "lucide-react";

// Sample data pools
const FIRST_NAMES = [
    "James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Oliver", "Isabella",
    "Benjamin", "Mia", "Elijah", "Charlotte", "Lucas", "Amelia", "Mason", "Harper", "Ethan", "Evelyn",
    "Alexander", "Abigail", "Henry", "Emily", "Sebastian", "Elizabeth", "Jack", "Sofia", "Daniel", "Avery",
    "Michael", "Ella", "Owen", "Scarlett", "Ryan", "Grace", "Nathan", "Lily", "Caleb", "Chloe",
];

const LAST_NAMES = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
    "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
    "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
];

const DOMAINS = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "proton.me", "icloud.com",
    "example.com", "test.com", "mail.com", "email.com",
];

const COMPANIES = [
    "Acme Corp", "Tech Solutions", "Digital Dynamics", "Cloud Nine", "Data Systems",
    "Innovation Labs", "Future Tech", "Smart Solutions", "Web Works", "Code Factory",
];

const CITIES = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville",
];

const STREETS = [
    "Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd", "Elm St",
    "Washington Blvd", "Park Ave", "Lake Dr", "Hill Rd", "River Ln", "Valley Way",
];

const COUNTRIES = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "Japan",
    "Australia", "China", "India", "Brazil", "Mexico", "Italy", "Spain",
    "South Korea", "Netherlands", "Sweden", "Switzerland", "Singapore",
];

interface Field {
    id: string;
    name: string;
    type: FieldType;
    enabled: boolean;
}

type FieldType =
    | "firstName" | "lastName" | "fullName" | "email" | "username"
    | "password" | "phone" | "uuid" | "number" | "boolean"
    | "date" | "company" | "address" | "city" | "country"
    | "url" | "ipv4" | "color";

const FIELD_GROUPS = [
    {
        label: "Personal",
        items: [
            { value: "firstName", label: "First Name" },
            { value: "lastName", label: "Last Name" },
            { value: "fullName", label: "Full Name" },
            { value: "email", label: "Email" },
            { value: "username", label: "Username" },
            { value: "password", label: "Password" },
            { value: "phone", label: "Phone" },
        ]
    },
    {
        label: "Location",
        items: [
            { value: "address", label: "Address" },
            { value: "city", label: "City" },
            { value: "country", label: "Country" },
        ]
    },
    {
        label: "Data Types",
        items: [
            { value: "uuid", label: "UUID" },
            { value: "number", label: "Number" },
            { value: "boolean", label: "Boolean" },
            { value: "date", label: "Date (ISO)" },
            { value: "color", label: "HEX Color" },
        ]
    },
    {
        label: "Net & Tech",
        items: [
            { value: "company", label: "Company" },
            { value: "url", label: "URL" },
            { value: "ipv4", label: "IPv4" },
        ]
    }
] as const;

const random = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateValue(type: FieldType): string | number | boolean {
    const firstName = random(FIRST_NAMES);
    const lastName = random(LAST_NAMES);

    switch (type) {
        case "firstName":
            return firstName;
        case "lastName":
            return lastName;
        case "fullName":
            return `${firstName} ${lastName}`;
        case "email":
            return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1, 999)}@${random(DOMAINS)}`;
        case "username":
            return `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}${randomInt(1, 99)}`;
        case "password":
            const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
            return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
        case "phone":
            return `+1${randomInt(200, 999)}${randomInt(100, 999)}${randomInt(1000, 9999)}`;
        case "uuid":
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        case "number":
            return randomInt(1, 1000);
        case "boolean":
            return Math.random() > 0.5;
        case "date":
            const now = Date.now();
            const past = now - 365 * 24 * 60 * 60 * 1000;
            return new Date(past + Math.random() * (now - past)).toISOString();
        case "company":
            return random(COMPANIES);
        case "address":
            return `${randomInt(100, 9999)} ${random(STREETS)}`;
        case "city":
            return random(CITIES);
        case "country":
            return random(COUNTRIES);
        case "url":
            return `https://${random(["www.", "app.", "api.", ""])}${firstName.toLowerCase()}.com`;
        case "ipv4":
            return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 255)}`;
        case "color":
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
        default:
            return "";
    }
}

const PRESETS: { name: string; fields: Field[] }[] = [
    {
        name: "User Registration",
        fields: [
            { id: "1", name: "name", type: "fullName", enabled: true },
            { id: "2", name: "email", type: "email", enabled: true },
            { id: "3", name: "password", type: "password", enabled: true },
            { id: "4", name: "username", type: "username", enabled: true },
        ],
    },
    {
        name: "User Profile",
        fields: [
            { id: "1", name: "firstName", type: "firstName", enabled: true },
            { id: "2", name: "lastName", type: "lastName", enabled: true },
            { id: "3", name: "email", type: "email", enabled: true },
            { id: "4", name: "phone", type: "phone", enabled: true },
            { id: "5", name: "address", type: "address", enabled: true },
            { id: "6", name: "city", type: "city", enabled: true },
        ],
    },
    {
        name: "Company",
        fields: [
            { id: "1", name: "id", type: "uuid", enabled: true },
            { id: "2", name: "name", type: "company", enabled: true },
            { id: "3", name: "website", type: "url", enabled: true },
            { id: "4", name: "email", type: "email", enabled: true },
        ],
    },
];

export default function DataGeneratorPage() {
    const [fields, setFields] = useState<Field[]>(PRESETS[0].fields);
    const [count, setCount] = useState("1");
    const [output, setOutput] = useState("");
    const [isArray, setIsArray] = useState(true);

    const generateData = () => {
        const num = Math.min(parseInt(count) || 1, 100);
        const enabledFields = fields.filter((f) => f.enabled);

        const items = Array.from({ length: num }, () => {
            const obj: Record<string, string | number | boolean> = {};
            enabledFields.forEach((field) => {
                obj[field.name] = generateValue(field.type);
            });
            return obj;
        });

        if (isArray || num > 1) {
            setOutput(JSON.stringify(items, null, 2));
        } else {
            setOutput(JSON.stringify(items[0], null, 2));
        }
    };

    const addField = () => {
        setFields([
            ...fields,
            { id: Date.now().toString(), name: "field", type: "firstName", enabled: true },
        ]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
    };

    const updateField = (id: string, updates: Partial<Field>) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const loadPreset = (preset: typeof PRESETS[0]) => {
        setFields(preset.fields.map((f) => ({ ...f, id: Date.now().toString() + f.id })));
    };

    return (
        <ToolLayout
            title="Data Generator"
            description="Generate random test data with customizable fields"
        >
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Configuration */}
                <div className="space-y-4">
                    {/* Presets */}
                    <div className="flex flex-wrap gap-2">
                        {PRESETS.map((preset) => (
                            <Button
                                key={preset.name}
                                size="sm"
                                variant="outline"
                                onClick={() => loadPreset(preset)}
                            >
                                {preset.name}
                            </Button>
                        ))}
                    </div>

                    {/* Fields */}
                    <Card>
                        <CardHeader className="py-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">Fields</CardTitle>
                                <Button size="sm" variant="ghost" onClick={addField}>
                                    <Plus className="h-3 w-3 mr-1" /> Add
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <ScrollArea className="h-[250px]">
                                <div className="space-y-2">
                                    {fields.map((field) => (
                                        <div key={field.id} className="flex items-center gap-2">
                                            <Switch
                                                checked={field.enabled}
                                                onCheckedChange={(v) => updateField(field.id, { enabled: v })}
                                            />
                                            <Input
                                                value={field.name}
                                                onChange={(e) => updateField(field.id, { name: e.target.value })}
                                                placeholder="fieldName"
                                                className="flex-1"
                                            />
                                            <Select
                                                value={field.type}
                                                onValueChange={(v) => updateField(field.id, { type: v as FieldType })}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {FIELD_GROUPS.map((group) => (
                                                        <SelectGroup key={group.label}>
                                                            <SelectLabel>{group.label}</SelectLabel>
                                                            {group.items.map((item) => (
                                                                <SelectItem key={item.value} value={item.value}>
                                                                    {item.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => removeField(field.id)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Options */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Label>Count</Label>
                            <Input
                                type="number"
                                min={1}
                                max={100}
                                value={count}
                                onChange={(e) => setCount(e.target.value)}
                                className="w-20"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                id="isArray"
                                checked={isArray}
                                onCheckedChange={setIsArray}
                            />
                            <Label htmlFor="isArray">Array output</Label>
                        </div>
                    </div>

                    <Button onClick={generateData} className="w-full">
                        <Wand2 className="h-4 w-4 mr-2" />
                        Generate Data
                    </Button>
                </div>

                {/* Output */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Generated JSON</Label>
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={generateData}>
                                <RefreshCw className="h-3 w-3" />
                            </Button>
                            <CopyButton text={output} />
                        </div>
                    </div>
                    <Textarea
                        value={output}
                        readOnly
                        className="min-h-[400px] font-mono text-sm bg-muted/30"
                        placeholder="Click 'Generate Data' to create random JSON..."
                    />
                </div>
            </div>
        </ToolLayout>
    );
}
