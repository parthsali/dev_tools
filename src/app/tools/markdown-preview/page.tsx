"use client";

import { useState, useMemo, useRef } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { ImagePlus, Eye, Code, Trash2, Copy, Check } from "lucide-react";

interface UploadedImage {
    id: string;
    name: string;
    dataUrl: string;
}

// Simple markdown to HTML converter
function markdownToHtml(md: string, images: UploadedImage[] = []): string {
    let html = md;

    const imageMap = new Map<string, string>();
    images.forEach(img => imageMap.set(img.name, img.dataUrl));

    // Escape HTML first
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Links and images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
        const src = imageMap.get(url) || url;
        return `<img alt="${alt}" src="${src}" style="max-width:100%;border-radius:8px;margin:8px 0;" />`;
    });

    // Normal links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

    // Horizontal rules
    html = html.replace(/^---$/gm, "<hr />");
    html = html.replace(/^\*\*\*$/gm, "<hr />");

    // Unordered lists
    html = html.replace(/^\s*[-*+]\s+(.+)$/gm, "<li>$1</li>");

    // Ordered lists
    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, "<li>$1</li>");

    // Wrap consecutive li elements
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return "<ul>" + match + "</ul>";
    });

    // Paragraphs
    html = html.replace(/\n\n+/g, "</p><p>");
    html = "<p>" + html + "</p>";

    // Clean up empty paragraphs and fix structure
    html = html.replace(/<p>\s*<(h[1-6]|ul|ol|blockquote|pre|hr)/g, "<$1");
    html = html.replace(/<\/(h[1-6]|ul|ol|blockquote|pre)>\s*<\/p>/g, "</$1>");
    html = html.replace(/<p>\s*<\/p>/g, "");
    html = html.replace(/<p><hr \/><\/p>/g, "<hr />");

    return html;
}

const SAMPLE_MARKDOWN = `# Welcome to Markdown Preview

This is a **live preview** of your markdown content with image support.

## Features

- Real-time preview
- **Temporary image upload** - upload images to use in your markdown
- Online image URLs supported
- Clean, minimal design

### Adding Images

You can add images in two ways:

1. **Upload temporary images** using the image button
2. **Use online URLs** with markdown syntax: \`![alt text](url)\`

![Example Image](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop)

### Code

Inline \`code\` looks like this.

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Formatting

You can make text **bold**, *italic*, or ***both***.

> This is a blockquote

---

[Visit GitHub](https://github.com)
`;



export default function MarkdownPreviewPage() {
    const [markdown, setMarkdown] = useState(SAMPLE_MARKDOWN);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const html = useMemo(() => markdownToHtml(markdown, uploadedImages), [markdown, uploadedImages]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target?.result as string;
                const id = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                setUploadedImages((prev) => [
                    ...prev,
                    { id, name: file.name, dataUrl }
                ]);
            };
            reader.readAsDataURL(file);
        });

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (id: string) => {
        setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    };

    const copyImageMarkdown = async (img: UploadedImage) => {
        const md = `![${img.name}](${img.name})`;
        await navigator.clipboard.writeText(md);
        setCopiedId(img.id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    const insertImage = (img: UploadedImage) => {
        // Using the image name as the reference URL to handle duplicate filenames correctly. 
        // The parser will look up the filename in the uploadedImages list
        const md = `![${img.name}](${img.name})`;
        setMarkdown((prev) => prev + "\n" + md);
        setDialogOpen(false);
    };

    return (
        <ToolLayout
            title="Markdown Preview"
            description="Live markdown editor with instant preview and image support"
        >
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <ImagePlus className="h-4 w-4 mr-2" />
                                    Add Image
                                    {uploadedImages.length > 0 && (
                                        <Badge variant="secondary" className="ml-2">
                                            {uploadedImages.length}
                                        </Badge>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Upload Images</DialogTitle>
                                    <DialogDescription>
                                        Upload temporary images to use in your markdown. Images are stored locally and won't be saved permanently.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div
                                        className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload images
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, JPG, GIF up to 5MB
                                        </p>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />

                                    {uploadedImages.length > 0 && (
                                        <ScrollArea className="h-48">
                                            <div className="space-y-2">
                                                {uploadedImages.map((img) => (
                                                    <div
                                                        key={img.id}
                                                        className="flex items-center gap-3 p-2 rounded-lg border bg-muted/30"
                                                    >
                                                        <img
                                                            src={img.dataUrl}
                                                            alt={img.name}
                                                            className="h-12 w-12 object-cover rounded"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium truncate">{img.name}</p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => insertImage(img)}
                                                            >
                                                                Insert
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => copyImageMarkdown(img)}
                                                            >
                                                                {copiedId === img.id ? (
                                                                    <Check className="h-3 w-3" />
                                                                ) : (
                                                                    <Copy className="h-3 w-3" />
                                                                )}
                                                            </Button>
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                onClick={() => removeImage(img.id)}
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <CopyButton text={markdown} />
                </div>

                {/* Editor and Preview */}
                <div className="grid gap-4 lg:grid-cols-2 h-[calc(100vh-16rem)]">
                    {/* Editor */}
                    <Card className="flex flex-col min-h-0">
                        <CardHeader className="pb-2 shrink-0">
                            <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <CardTitle className="text-sm">Markdown</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0 pb-4">
                            <Textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                placeholder="Write your markdown here..."
                                className="h-full font-mono text-sm resize-none"
                            />
                        </CardContent>
                    </Card>

                    {/* Preview */}
                    <Card className="flex flex-col min-h-0">
                        <CardHeader className="pb-2 shrink-0">
                            <div className="flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                <CardTitle className="text-sm">Preview</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 min-h-0 pb-4">
                            <ScrollArea className="h-full rounded-lg border bg-muted/20">
                                <div
                                    className="p-4 prose prose-sm dark:prose-invert max-w-none
                                        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-0
                                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6
                                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
                                        [&_p]:mb-3 [&_p]:leading-relaxed
                                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                                        [&_li]:mb-1
                                        [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
                                        [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:mb-3
                                        [&_pre_code]:bg-transparent [&_pre_code]:p-0
                                        [&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
                                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2
                                        [&_hr]:my-6 [&_hr]:border-border
                                        [&_strong]:font-bold
                                        [&_em]:italic
                                        [&_img]:rounded-lg [&_img]:my-4"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                    💡 Tip: Uploaded images are temporary and stored in your browser. Use online image URLs for permanent images.
                </p>
            </div>
        </ToolLayout>
    );
}
