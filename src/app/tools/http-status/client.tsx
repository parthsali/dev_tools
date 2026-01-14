"use client";

import { useState, useMemo } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Info, CheckCircle, ArrowRight, AlertTriangle, XCircle, Server } from "lucide-react";

const HTTP_STATUS_CODES = [
    // 1xx Informational
    { code: 100, name: "Continue", description: "The server has received the request headers and the client should proceed to send the request body.", category: "1xx" },
    { code: 101, name: "Switching Protocols", description: "The requester has asked the server to switch protocols.", category: "1xx" },
    { code: 102, name: "Processing", description: "The server has received and is processing the request, but no response is available yet.", category: "1xx" },
    { code: 103, name: "Early Hints", description: "Used to return some response headers before final HTTP message.", category: "1xx" },

    // 2xx Success
    { code: 200, name: "OK", description: "The request was successful.", category: "2xx" },
    { code: 201, name: "Created", description: "The request was successful and a resource was created.", category: "2xx" },
    { code: 202, name: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed.", category: "2xx" },
    { code: 203, name: "Non-Authoritative Information", description: "The request was successful but the enclosed payload has been modified.", category: "2xx" },
    { code: 204, name: "No Content", description: "The request was successful but there is no content to return.", category: "2xx" },
    { code: 205, name: "Reset Content", description: "The request was successful and the user agent should reset the document view.", category: "2xx" },
    { code: 206, name: "Partial Content", description: "The server is delivering only part of the resource due to a range header sent by the client.", category: "2xx" },
    { code: 207, name: "Multi-Status", description: "The message body contains multiple separate response codes.", category: "2xx" },

    // 3xx Redirection
    { code: 300, name: "Multiple Choices", description: "There are multiple options for the resource that the client may follow.", category: "3xx" },
    { code: 301, name: "Moved Permanently", description: "The resource has been moved to a new URL permanently.", category: "3xx" },
    { code: 302, name: "Found", description: "The resource was found at a different URL temporarily.", category: "3xx" },
    { code: 303, name: "See Other", description: "The response can be found under a different URI using GET method.", category: "3xx" },
    { code: 304, name: "Not Modified", description: "The resource has not been modified since the last request.", category: "3xx" },
    { code: 307, name: "Temporary Redirect", description: "The request should be repeated with another URI but future requests should still use the original URI.", category: "3xx" },
    { code: 308, name: "Permanent Redirect", description: "The request and all future requests should be repeated using another URI.", category: "3xx" },

    // 4xx Client Errors
    { code: 400, name: "Bad Request", description: "The server could not understand the request due to invalid syntax.", category: "4xx" },
    { code: 401, name: "Unauthorized", description: "The client must authenticate itself to get the requested response.", category: "4xx" },
    { code: 402, name: "Payment Required", description: "Reserved for future use.", category: "4xx" },
    { code: 403, name: "Forbidden", description: "The client does not have access rights to the content.", category: "4xx" },
    { code: 404, name: "Not Found", description: "The server cannot find the requested resource.", category: "4xx" },
    { code: 405, name: "Method Not Allowed", description: "The request method is known by the server but not supported by the target resource.", category: "4xx" },
    { code: 406, name: "Not Acceptable", description: "The server cannot produce a response matching the list of acceptable values.", category: "4xx" },
    { code: 407, name: "Proxy Authentication Required", description: "The client must first authenticate itself with the proxy.", category: "4xx" },
    { code: 408, name: "Request Timeout", description: "The server timed out waiting for the request.", category: "4xx" },
    { code: 409, name: "Conflict", description: "The request could not be completed due to a conflict with the current state of the target resource.", category: "4xx" },
    { code: 410, name: "Gone", description: "The requested content has been permanently deleted from the server.", category: "4xx" },
    { code: 411, name: "Length Required", description: "The server requires a Content-Length header field.", category: "4xx" },
    { code: 412, name: "Precondition Failed", description: "The client has indicated preconditions in its headers which the server does not meet.", category: "4xx" },
    { code: 413, name: "Payload Too Large", description: "Request entity is larger than limits defined by server.", category: "4xx" },
    { code: 414, name: "URI Too Long", description: "The URI requested by the client is longer than the server is willing to interpret.", category: "4xx" },
    { code: 415, name: "Unsupported Media Type", description: "The media format of the requested data is not supported by the server.", category: "4xx" },
    { code: 416, name: "Range Not Satisfiable", description: "The range specified in the Range header field cannot be fulfilled.", category: "4xx" },
    { code: 417, name: "Expectation Failed", description: "The expectation given in the Expect request-header field could not be met by the server.", category: "4xx" },
    { code: 418, name: "I'm a Teapot", description: "The server refuses to brew coffee because it is a teapot.", category: "4xx" },
    { code: 422, name: "Unprocessable Entity", description: "The request was well-formed but could not be followed due to semantic errors.", category: "4xx" },
    { code: 423, name: "Locked", description: "The resource that is being accessed is locked.", category: "4xx" },
    { code: 425, name: "Too Early", description: "The server is unwilling to risk processing a request that might be replayed.", category: "4xx" },
    { code: 426, name: "Upgrade Required", description: "The client should switch to a different protocol.", category: "4xx" },
    { code: 428, name: "Precondition Required", description: "The server requires the request to be conditional.", category: "4xx" },
    { code: 429, name: "Too Many Requests", description: "The user has sent too many requests in a given amount of time.", category: "4xx" },
    { code: 431, name: "Request Header Fields Too Large", description: "The server is unwilling to process the request because its header fields are too large.", category: "4xx" },
    { code: 451, name: "Unavailable For Legal Reasons", description: "The user agent requested a resource that cannot legally be provided.", category: "4xx" },

    // 5xx Server Errors
    { code: 500, name: "Internal Server Error", description: "The server has encountered a situation it doesn't know how to handle.", category: "5xx" },
    { code: 501, name: "Not Implemented", description: "The request method is not supported by the server.", category: "5xx" },
    { code: 502, name: "Bad Gateway", description: "The server got an invalid response while acting as a gateway.", category: "5xx" },
    { code: 503, name: "Service Unavailable", description: "The server is not ready to handle the request.", category: "5xx" },
    { code: 504, name: "Gateway Timeout", description: "The server is acting as a gateway and cannot get a response in time.", category: "5xx" },
    { code: 505, name: "HTTP Version Not Supported", description: "The HTTP version used in the request is not supported by the server.", category: "5xx" },
    { code: 506, name: "Variant Also Negotiates", description: "The server has an internal configuration error.", category: "5xx" },
    { code: 507, name: "Insufficient Storage", description: "The server cannot store the representation needed to complete the request.", category: "5xx" },
    { code: 508, name: "Loop Detected", description: "The server detected an infinite loop while processing the request.", category: "5xx" },
    { code: 510, name: "Not Extended", description: "Further extensions to the request are required for the server to fulfill it.", category: "5xx" },
    { code: 511, name: "Network Authentication Required", description: "The client needs to authenticate to gain network access.", category: "5xx" },
];

const CATEGORY_INFO = {
    "1xx": { name: "Informational", icon: Info, color: "text-blue-500", bg: "bg-blue-500/10", badge: "info" as const },
    "2xx": { name: "Success", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", badge: "success" as const },
    "3xx": { name: "Redirection", icon: ArrowRight, color: "text-amber-500", bg: "bg-amber-500/10", badge: "warning" as const },
    "4xx": { name: "Client Error", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10", badge: "destructive" as const },
    "5xx": { name: "Server Error", icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", badge: "secondary" as const },
};

export default function HttpStatusPage() {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const filtered = useMemo(() => {
        let results = HTTP_STATUS_CODES;

        // Filter by category
        if (selectedCategories.length > 0) {
            results = results.filter((s) => selectedCategories.includes(s.category));
        }

        // Filter by search
        if (search.trim()) {
            const lower = search.toLowerCase();
            results = results.filter(
                (s) =>
                    s.code.toString().includes(lower) ||
                    s.name.toLowerCase().includes(lower) ||
                    s.description.toLowerCase().includes(lower)
            );
        }

        return results;
    }, [search, selectedCategories]);

    const grouped = useMemo(() => {
        const groups: Record<string, typeof HTTP_STATUS_CODES> = {};
        filtered.forEach((status) => {
            if (!groups[status.category]) {
                groups[status.category] = [];
            }
            groups[status.category].push(status);
        });
        return groups;
    }, [filtered]);

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { "1xx": 0, "2xx": 0, "3xx": 0, "4xx": 0, "5xx": 0 };
        HTTP_STATUS_CODES.forEach((s) => {
            counts[s.category]++;
        });
        return counts;
    }, []);

    return (
        <ToolLayout
            title="HTTP Status Codes"
            description="Quick reference for HTTP status codes"
        >
            <div className="space-y-4">
                {/* Filters */}
                <Card>
                    <CardContent className="pt-4 space-y-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by code, name, or description..."
                                className="pl-9"
                            />
                        </div>

                        {/* Category Filters */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-sm text-muted-foreground self-center">Filter:</span>
                            <ToggleGroup
                                type="multiple"
                                value={selectedCategories}
                                onValueChange={setSelectedCategories}
                                className="flex-wrap justify-start"
                            >
                                {Object.entries(CATEGORY_INFO).map(([key, info]) => {
                                    const Icon = info.icon;
                                    const isSelected = selectedCategories.includes(key);
                                    return (
                                        <ToggleGroupItem
                                            key={key}
                                            value={key}
                                            className={`gap-1 ${isSelected ? info.bg : ""}`}
                                        >
                                            <Icon className={`h-3 w-3 ${isSelected ? info.color : ""}`} />
                                            <span>{key}</span>
                                            <Badge variant="outline" className="ml-1 h-5 px-1.5 text-xs">
                                                {categoryCounts[key]}
                                            </Badge>
                                        </ToggleGroupItem>
                                    );
                                })}
                            </ToggleGroup>
                            {selectedCategories.length > 0 && (
                                <button
                                    onClick={() => setSelectedCategories([])}
                                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Results Count */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {filtered.length} of {HTTP_STATUS_CODES.length} status codes
                    </p>
                </div>

                {/* Status Codes List */}
                <ScrollArea className="h-[calc(100vh-24rem)]">
                    <div className="space-y-6 pr-4">
                        {Object.entries(grouped).map(([category, statuses]) => {
                            const info = CATEGORY_INFO[category as keyof typeof CATEGORY_INFO];
                            const Icon = info.icon;

                            return (
                                <div key={category}>
                                    {/* Category Header */}
                                    <div className={`flex items-center gap-2 sticky top-0 py-2 px-3 rounded-lg ${info.bg} backdrop-blur-sm z-10 mb-3`}>
                                        <Icon className={`h-4 w-4 ${info.color}`} />
                                        <span className={`font-medium ${info.color}`}>{category}</span>
                                        <span className="text-muted-foreground">—</span>
                                        <span className="text-sm text-muted-foreground">{info.name}</span>
                                        <Badge variant="outline" className="ml-auto">
                                            {statuses.length}
                                        </Badge>
                                    </div>

                                    {/* Status Cards */}
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {statuses.map((status) => (
                                            <Card key={status.code} className="hover:bg-muted/50 transition-colors">
                                                <CardContent className="p-4">
                                                    <div className="flex items-start gap-3">
                                                        <Badge
                                                            variant={info.badge}
                                                            className="font-mono text-base px-2 py-1 shrink-0"
                                                        >
                                                            {status.code}
                                                        </Badge>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="font-medium text-sm">{status.name}</p>
                                                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                                {status.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>

                {filtered.length === 0 && (
                    <Card className="py-12">
                        <CardContent className="text-center">
                            <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                                No status codes found matching "{search}"
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </ToolLayout>
    );
}
