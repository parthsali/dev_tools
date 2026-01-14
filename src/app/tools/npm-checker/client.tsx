"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    Package,
    Loader2,
    ExternalLink,
    User,
    Calendar,
    Download,
    GitBranch,
    Star,
    AlertCircle,
    Clock
} from "lucide-react";

interface PackageInfo {
    name: string;
    version: string;
    description: string;
    author?: { name?: string; email?: string };
    license?: string;
    homepage?: string;
    repository?: { url?: string };
    keywords?: string[];
    versions?: string[];
    time?: { created?: string; modified?: string };
    downloads?: number;
}

interface SearchResult {
    package: {
        name: string;
        version: string;
        description: string;
        keywords?: string[];
        publisher?: { username: string };
        date: string;
    };
    score: {
        final: number;
    };
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function NpmCheckerPage() {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [error, setError] = useState("");

    const debouncedQuery = useDebounce(query, 300);
    const inputRef = useRef<HTMLInputElement>(null);

    // Search packages on type
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const searchPackages = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(
                    `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(debouncedQuery)}&size=12`
                );

                if (!res.ok) throw new Error("Search failed");

                const data = await res.json();
                setSearchResults(data.objects || []);
            } catch (e) {
                setError("Failed to search packages. Please try again.");
                setSearchResults([]);
            }

            setLoading(false);
        };

        searchPackages();
    }, [debouncedQuery]);

    // Fetch package details
    const fetchPackageDetails = async (packageName: string) => {
        setLoadingDetails(true);
        setError("");

        try {
            const res = await fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`);

            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error("Package not found");
                }
                throw new Error("Failed to fetch package details");
            }

            const data = await res.json();
            const latest = data["dist-tags"]?.latest;
            const latestVersion = data.versions?.[latest] || {};
            const versions = Object.keys(data.versions || {}).reverse().slice(0, 10);

            setSelectedPackage({
                name: data.name,
                version: latest,
                description: latestVersion.description || data.description,
                author: latestVersion.author || data.author,
                license: latestVersion.license || data.license,
                homepage: latestVersion.homepage || data.homepage,
                repository: latestVersion.repository || data.repository,
                keywords: latestVersion.keywords || data.keywords,
                versions,
                time: data.time,
            });
        } catch (e) {
            setError((e as Error).message);
            setSelectedPackage(null);
        }

        setLoadingDetails(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getRepoUrl = (repo?: { url?: string }) => {
        if (!repo?.url) return null;
        return repo.url
            .replace(/^git\+/, "")
            .replace(/\.git$/, "")
            .replace(/^git:\/\//, "https://");
    };

    return (
        <ToolLayout
            title="NPM Checker"
            description="Search and check npm package information"
        >
            <div className="space-y-4">
                {/* Search Input */}
                <Card>
                    <CardContent className="pt-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Start typing to search npm packages..."
                                className="pl-9 pr-9"
                            />
                            {loading && (
                                <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            💡 Search updates as you type with 300ms debounce
                        </p>
                    </CardContent>
                </Card>

                {error && (
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="py-3">
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <p className="text-sm">{error}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid gap-4 lg:grid-cols-2">
                    {/* Search Results */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-muted-foreground px-1">
                            {searchResults.length > 0
                                ? `Found ${searchResults.length} packages`
                                : query ? "No results" : "Search results will appear here"}
                        </h3>
                        <ScrollArea className="h-[500px]">
                            <div className="space-y-2 pr-4">
                                {searchResults.map((result) => (
                                    <Card
                                        key={result.package.name}
                                        className={`cursor-pointer transition-all hover:bg-muted/50 ${selectedPackage?.name === result.package.name
                                                ? "border-primary bg-primary/5"
                                                : ""
                                            }`}
                                        onClick={() => fetchPackageDetails(result.package.name)}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="h-4 w-4 text-red-500 shrink-0" />
                                                        <span className="font-medium truncate">{result.package.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="secondary" className="font-mono text-xs">
                                                            v{result.package.version}
                                                        </Badge>
                                                        {result.package.publisher && (
                                                            <span className="text-xs text-muted-foreground">
                                                                by {result.package.publisher.username}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                                        {result.package.description || "No description"}
                                                    </p>
                                                </div>
                                            </div>
                                            {result.package.keywords && result.package.keywords.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {result.package.keywords.slice(0, 3).map((keyword) => (
                                                        <Badge key={keyword} variant="outline" className="text-xs">
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                    {result.package.keywords.length > 3 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{result.package.keywords.length - 3}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Package Details */}
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground px-1 mb-2">
                            Package Details
                        </h3>
                        {loadingDetails ? (
                            <Card className="h-[500px] flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </Card>
                        ) : selectedPackage ? (
                            <Card className="h-[500px] overflow-hidden">
                                <ScrollArea className="h-full">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <CardTitle className="flex items-center gap-2">
                                                    <Package className="h-5 w-5 text-red-500" />
                                                    {selectedPackage.name}
                                                </CardTitle>
                                                <CardDescription className="mt-1">
                                                    {selectedPackage.description}
                                                </CardDescription>
                                            </div>
                                            <Badge className="font-mono shrink-0">
                                                v{selectedPackage.version}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Install Command */}
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 font-mono text-sm">
                                            <span>npm install {selectedPackage.name}</span>
                                            <CopyButton text={`npm install ${selectedPackage.name}`} />
                                        </div>

                                        {/* Quick Info */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {selectedPackage.author?.name && (
                                                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm truncate">{selectedPackage.author.name}</span>
                                                </div>
                                            )}
                                            {selectedPackage.license && (
                                                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                                                    <Badge variant="outline">{selectedPackage.license}</Badge>
                                                </div>
                                            )}
                                            {selectedPackage.time?.modified && (
                                                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-xs">
                                                        Updated {formatDate(selectedPackage.time.modified)}
                                                    </span>
                                                </div>
                                            )}
                                            {selectedPackage.time?.created && (
                                                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-xs">
                                                        Created {formatDate(selectedPackage.time.created)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Links */}
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={`https://www.npmjs.com/package/${selectedPackage.name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Package className="h-3 w-3 mr-1" />
                                                    npm
                                                    <ExternalLink className="h-3 w-3 ml-1" />
                                                </a>
                                            </Button>
                                            {getRepoUrl(selectedPackage.repository) && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <a
                                                        href={getRepoUrl(selectedPackage.repository)!}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <GitBranch className="h-3 w-3 mr-1" />
                                                        Repository
                                                        <ExternalLink className="h-3 w-3 ml-1" />
                                                    </a>
                                                </Button>
                                            )}
                                            {selectedPackage.homepage && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <a
                                                        href={selectedPackage.homepage}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="h-3 w-3 mr-1" />
                                                        Homepage
                                                    </a>
                                                </Button>
                                            )}
                                        </div>

                                        <Separator />

                                        {/* Keywords */}
                                        {selectedPackage.keywords && selectedPackage.keywords.length > 0 && (
                                            <div>
                                                <label className="text-xs text-muted-foreground mb-2 block">Keywords</label>
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedPackage.keywords.slice(0, 10).map((keyword) => (
                                                        <Badge key={keyword} variant="secondary" className="text-xs">
                                                            {keyword}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Recent Versions */}
                                        {selectedPackage.versions && selectedPackage.versions.length > 0 && (
                                            <div>
                                                <label className="text-xs text-muted-foreground mb-2 block">
                                                    Recent Versions
                                                </label>
                                                <div className="flex flex-wrap gap-1">
                                                    {selectedPackage.versions.slice(0, 8).map((version, i) => (
                                                        <Badge
                                                            key={version}
                                                            variant={i === 0 ? "default" : "outline"}
                                                            className="font-mono text-xs"
                                                        >
                                                            {version}
                                                            {i === 0 && " (latest)"}
                                                        </Badge>
                                                    ))}
                                                    {selectedPackage.versions.length > 8 && (
                                                        <Badge variant="outline" className="text-xs">
                                                            +{selectedPackage.versions.length - 8} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </ScrollArea>
                            </Card>
                        ) : (
                            <Card className="h-[500px] flex items-center justify-center">
                                <div className="text-center text-muted-foreground">
                                    <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                    <p>Select a package to view details</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
