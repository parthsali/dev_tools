"use client";

import { useState } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
    "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
    "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
    "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
    "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
    "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
    "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos",
    "dolores", "quas", "molestias", "excepturi", "occaecati", "cupiditate",
    "provident", "similique", "mollitia", "animi", "cumque", "impedit", "quo",
    "minus", "quod", "maxime", "placeat", "facere", "possimus", "omnis",
];

function generateWord(): string {
    return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords = 8, maxWords = 15): string {
    const length = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = Array.from({ length }, generateWord);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(" ") + ".";
}

function generateParagraph(minSentences = 4, maxSentences = 8): string {
    const length = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    return Array.from({ length }, () => generateSentence()).join(" ");
}

export default function LoremIpsumPage() {
    const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
    const [count, setCount] = useState("3");
    const [output, setOutput] = useState("");
    const [startWithLorem, setStartWithLorem] = useState(true);

    const handleGenerate = () => {
        const num = parseInt(count) || 1;
        let result = "";

        switch (type) {
            case "paragraphs":
                result = Array.from({ length: num }, () => generateParagraph()).join("\n\n");
                break;
            case "sentences":
                result = Array.from({ length: num }, () => generateSentence()).join(" ");
                break;
            case "words":
                result = Array.from({ length: num }, generateWord).join(" ");
                break;
        }

        if (startWithLorem && result.length > 0) {
            result = "Lorem ipsum dolor sit amet, " + result.charAt(0).toLowerCase() + result.slice(1);
        }

        setOutput(result);
    };

    return (
        <ToolLayout
            title="Lorem Ipsum"
            description="Generate placeholder text"
        >
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Controls */}
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-base">Options</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select value={type} onValueChange={(v) => setType(v as typeof type)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="paragraphs">Paragraphs</SelectItem>
                                        <SelectItem value="sentences">Sentences</SelectItem>
                                        <SelectItem value="words">Words</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Count</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={count}
                                    onChange={(e) => setCount(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button onClick={handleGenerate} className="w-full">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Generate
                        </Button>
                    </CardContent>
                </Card>

                {/* Output */}
                {output && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Generated Text</Label>
                            <CopyButton text={output} />
                        </div>
                        <Textarea
                            value={output}
                            readOnly
                            className="min-h-[300px] bg-muted/30"
                        />
                        <p className="text-xs text-muted-foreground text-right">
                            {output.split(/\s+/).length} words • {output.length} characters
                        </p>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
