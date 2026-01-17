"use client";

import { useState, useEffect } from "react";
import { ToolLayout, CopyButton } from "@/components/tools/tool-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Users,
    FileText,
    ShoppingBag,
    CheckSquare,
    MessageCircle,
    ShoppingCart,
    Building2,
    Quote,
    Play,
    Copy,
    Check,
    ExternalLink,
    Zap,
    Globe,
    Code2,
    Database,
    ChevronRight,
    Loader2,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";

interface Endpoint {
    method: "GET";
    path: string;
    description: string;
    params?: { name: string; type: string; description: string }[];
    example?: string;
}

interface ApiResource {
    id: string;
    name: string;
    icon: React.ElementType;
    description: string;
    color: string;
    endpoints: Endpoint[];
    sampleResponse: string;
}

const BASE_URL = typeof window !== "undefined" ? window.location.origin : "";

const apiResources: ApiResource[] = [
    {
        id: "users",
        name: "Users",
        icon: Users,
        description: "1000+ Indian users with realistic names, emails, addresses, phone numbers",
        color: "text-blue-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/users",
                description: "Get all users (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number (default: 1)" },
                    { name: "limit", type: "number", description: "Items per page (default: 10, max: 50)" },
                    { name: "sortBy", type: "string", description: "Sort field (e.g., firstName, age)" },
                    { name: "order", type: "asc|desc", description: "Sort order" },
                ],
            },
            {
                method: "GET",
                path: "/api/users/:id",
                description: "Get user by ID",
                example: "/api/users/1",
            },
        ],
        sampleResponse: `{
  "users": [
    {
      "id": 1,
      "firstName": "Aarav",
      "lastName": "Sharma",
      "age": 28,
      "gender": "male",
      "email": "aarav.sharma1@example.in",
      "phone": "+91 98765-4321",
      "username": "aarav1",
      "birthDate": "1995-03-15",
      "address": {
        "address": "42 MG Road",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400001",
        "country": "India"
      },
      "university": "IIT Bombay",
      "company": {
        "name": "Sharma Tech Pvt Ltd",
        "department": "Engineering",
        "title": "Software Developer"
      }
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "posts",
        name: "Posts",
        icon: FileText,
        description: "1000+ blog posts with tags, reactions, and views",
        color: "text-emerald-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/posts",
                description: "Get all posts (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "sortBy", type: "string", description: "Sort field (e.g., views, title)" },
                ],
            },
            {
                method: "GET",
                path: "/api/posts/:id",
                description: "Get post by ID",
                example: "/api/posts/1",
            },
        ],
        sampleResponse: `{
  "posts": [
    {
      "id": 1,
      "title": "React Tutorial 1: Basics",
      "body": "Comprehensive guide on react covering fundamentals...",
      "tags": ["react", "javascript", "india", "tutorial"],
      "reactions": {
        "likes": 2879,
        "dislikes": 44
      },
      "views": 21112,
      "userId": 42,
      "createdAt": "2024-05-12"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "products",
        name: "Products",
        icon: ShoppingBag,
        description: "1000+ products with Indian brands and categories",
        color: "text-purple-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/products",
                description: "Get all products (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "sortBy", type: "string", description: "Sort field (e.g., price, rating)" },
                ],
            },
            {
                method: "GET",
                path: "/api/products/:id",
                description: "Get product by ID",
                example: "/api/products/1",
            },
        ],
        sampleResponse: `{
  "products": [
    {
      "id": 1,
      "title": "Boat Electronics Item 1",
      "description": "High-quality electronics product from Boat...",
      "category": "electronics",
      "price": 1547.94,
      "discountPercentage": 15.72,
      "rating": 4.5,
      "stock": 156,
      "brand": "Boat",
      "tags": ["electronics", "india", "boat", "popular"]
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "todos",
        name: "Todos",
        icon: CheckSquare,
        description: "1000+ todo items with completion status",
        color: "text-amber-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/todos",
                description: "Get all todos (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                ],
            },
            {
                method: "GET",
                path: "/api/todos/:id",
                description: "Get todo by ID",
                example: "/api/todos/1",
            },
        ],
        sampleResponse: `{
  "todos": [
    {
      "id": 1,
      "todo": "Pay electricity bill - #1",
      "completed": false,
      "userId": 42,
      "priority": "high",
      "dueDate": "2026-02-15"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "comments",
        name: "Comments",
        icon: MessageCircle,
        description: "1000+ comments with user and post references",
        color: "text-cyan-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/comments",
                description: "Get all comments (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "postId", type: "number", description: "Filter by post ID" },
                    { name: "userId", type: "number", description: "Filter by user ID" },
                ],
            },
            {
                method: "GET",
                path: "/api/comments/:id",
                description: "Get comment by ID",
                example: "/api/comments/1",
            },
        ],
        sampleResponse: `{
  "comments": [
    {
      "id": 1,
      "body": "Great article! Very informative and well-written.",
      "postId": 42,
      "userId": 15,
      "likes": 234,
      "createdAt": "2024-06-20"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "orders",
        name: "Orders",
        icon: ShoppingCart,
        description: "1000+ e-commerce orders with items and status",
        color: "text-rose-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/orders",
                description: "Get all orders (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "status", type: "string", description: "Filter by status (pending, processing, shipped, delivered, cancelled)" },
                    { name: "userId", type: "number", description: "Filter by user ID" },
                ],
            },
            {
                method: "GET",
                path: "/api/orders/:id",
                description: "Get order by ID",
                example: "/api/orders/1",
            },
        ],
        sampleResponse: `{
  "orders": [
    {
      "id": 1,
      "userId": 42,
      "items": [
        { "productId": 15, "quantity": 2, "price": 1299.99 }
      ],
      "total": 2599.98,
      "status": "delivered",
      "paymentMethod": "UPI",
      "shippingAddress": {
        "address": "123 Brigade Road",
        "city": "Bengaluru",
        "state": "Karnataka",
        "postalCode": "560001"
      },
      "orderDate": "2024-01-15",
      "deliveryDate": "2024-01-20"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "companies",
        name: "Companies",
        icon: Building2,
        description: "1000+ Indian companies with GST numbers and industries",
        color: "text-indigo-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/companies",
                description: "Get all companies (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "industry", type: "string", description: "Filter by industry" },
                ],
            },
            {
                method: "GET",
                path: "/api/companies/:id",
                description: "Get company by ID",
                example: "/api/companies/1",
            },
        ],
        sampleResponse: `{
  "companies": [
    {
      "id": 1,
      "name": "Sharma Engineering Pvt Ltd",
      "industry": "Information Technology",
      "gstNumber": "29ABCDE1234F1Z5",
      "pan": "ABCDE1234F",
      "email": "contact@sharmaengineering.in",
      "phone": "+91 80123-4567",
      "address": {
        "address": "456 MG Road",
        "city": "Mumbai",
        "state": "Maharashtra",
        "postalCode": "400001"
      },
      "founded": 1995,
      "employees": 1250,
      "revenue": "₹450 Cr",
      "website": "https://sharmaengineering.in"
    }
  ],
  "total": 1000,
  "page": 1,
  "limit": 10,
  "totalPages": 100
}`,
    },
    {
        id: "quotes",
        name: "Quotes",
        icon: Quote,
        description: "200 verified inspirational quotes from famous personalities",
        color: "text-pink-500",
        endpoints: [
            {
                method: "GET",
                path: "/api/quotes",
                description: "Get all quotes (paginated)",
                params: [
                    { name: "page", type: "number", description: "Page number" },
                    { name: "limit", type: "number", description: "Items per page" },
                    { name: "category", type: "string", description: "Filter by category (motivation, wisdom, life, success, education, peace)" },
                ],
            },
            {
                method: "GET",
                path: "/api/quotes/:id",
                description: "Get quote by ID",
                example: "/api/quotes/1",
            },
            {
                method: "GET",
                path: "/api/quotes/random",
                description: "Get a random quote",
                params: [
                    { name: "category", type: "string", description: "Filter by category (optional)" },
                ],
            },
        ],
        sampleResponse: `{
  "quotes": [
    {
      "id": 1,
      "quote": "Be the change that you wish to see in the world.",
      "author": "Mahatma Gandhi",
      "category": "motivation",
      "likes": 9547,
      "shares": 4821
    }
  ],
  "total": 200,
  "page": 1,
  "limit": 10,
  "totalPages": 20
}`,
    },
];

const features = [
    {
        icon: Zap,
        title: "No Auth Required",
        description: "Start using immediately, no API keys needed",
    },
    {
        icon: Globe,
        title: "CORS Enabled",
        description: "Works from any domain or localhost",
    },
    {
        icon: Database,
        title: "Indian Data",
        description: "Names, phones, addresses — all India-centric",
    },
    {
        icon: Code2,
        title: "REST Standard",
        description: "Pagination, sorting, filtering built-in",
    },
];

type Language = "javascript" | "bash" | "python" | "go" | "java" | "php" | "ruby" | "rust";

const LANGUAGE_STORAGE_KEY = "devtools-api-language";

const languageLabels: Record<Language, string> = {
    javascript: "JavaScript",
    bash: "cURL",
    python: "Python",
    go: "Go",
    java: "Java",
    php: "PHP",
    ruby: "Ruby",
    rust: "Rust",
};

function getCodeSnippet(language: Language, baseUrl: string): string {
    const url = baseUrl || "https://tools.parthsali.com";

    switch (language) {
        case "javascript":
            return `// Fetch all users
const response = await fetch('${url}/api/users');
const data = await response.json();

console.log(data.users);
// → [{ id: 1, firstName: "Aarav", lastName: "Sharma", ... }, ...]

// With pagination
const page2 = await fetch('${url}/api/users?page=2&limit=20');

// Get single user
const user = await fetch('${url}/api/users/1');

// Get random quote
const quote = await fetch('${url}/api/quotes/random').then(r => r.json());

// Get random quote by category
const motivationQuote = await fetch('${url}/api/quotes/random?category=motivation').then(r => r.json());`;

        case "bash":
            return `# Get all users
curl ${url}/api/users

# With pagination
curl "${url}/api/users?page=1&limit=5"

# Get single user
curl ${url}/api/users/1

# Get products sorted by price
curl "${url}/api/products?sortBy=price&order=desc"

# Get random quote
curl ${url}/api/quotes/random

# Get random quote by category
curl "${url}/api/quotes/random?category=wisdom"`;

        case "python":
            return `import requests

# Get all users
response = requests.get('${url}/api/users')
data = response.json()

print(data['users'])
# → [{'id': 1, 'firstName': 'Aarav', 'lastName': 'Sharma', ...}, ...]

# With pagination
response = requests.get('${url}/api/users', params={'page': 2, 'limit': 20})

# Get single post
post = requests.get('${url}/api/posts/1').json()

# Get random quote
quote = requests.get('${url}/api/quotes/random').json()
print(f"{quote['quote']} - {quote['author']}")

# Get random quote by category
motivation_quote = requests.get('${url}/api/quotes/random', params={'category': 'motivation'}).json()`;

        case "go":
            return `package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID        int    \`json:"id"\`
    FirstName string \`json:"firstName"\`
    LastName  string \`json:"lastName"\`
    Email     string \`json:"email"\`
}

type UsersResponse struct {
    Users []User \`json:"users"\`
    Total int    \`json:"total"\`
}

func main() {
    // Get all users
    resp, _ := http.Get("${url}/api/users")
    defer resp.Body.Close()
    
    var data UsersResponse
    json.NewDecoder(resp.Body).Decode(&data)
    
    fmt.Println(data.Users)
    
    // Get random quote
    resp, _ = http.Get("${url}/api/quotes/random")
    defer resp.Body.Close()
    
    var quote map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&quote)
    fmt.Printf("%s - %s\\n", quote["quote"], quote["author"])
    
    // Get random quote by category
    resp, _ = http.Get("${url}/api/quotes/random?category=success")
}`;

        case "java":
            return `import java.net.http.*;
import java.net.URI;
import com.google.gson.*;

public class ApiClient {
    private static final HttpClient client = HttpClient.newHttpClient();
    private static final String BASE_URL = "${url}";
    
    public static void main(String[] args) throws Exception {
        // Get all users
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/api/users"))
            .GET()
            .build();
        
        HttpResponse<String> response = client.send(request, 
            HttpResponse.BodyHandlers.ofString());
        
        JsonObject data = JsonParser.parseString(response.body()).getAsJsonObject();
        System.out.println(data.get("users"));
        
        // Get random quote
        request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/api/quotes/random"))
            .GET()
            .build();
        
        response = client.send(request, HttpResponse.BodyHandlers.ofString());
        JsonObject quote = JsonParser.parseString(response.body()).getAsJsonObject();
        System.out.println(quote.get("quote") + " - " + quote.get("author"));
        
        // Get random quote by category
        request = HttpRequest.newBuilder()
            .uri(URI.create(BASE_URL + "/api/quotes/random?category=peace"))
            .GET()
            .build();
    }
}`;

        case "php":
            return `<?php
// Get all users
$response = file_get_contents('${url}/api/users');
$data = json_decode($response, true);

print_r($data['users']);
// → Array with users

// With pagination
$url = '${url}/api/users?page=2&limit=20';
$response = file_get_contents($url);
$data = json_decode($response, true);

// Get single user using cURL
$ch = curl_init('${url}/api/users/1');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$user = json_decode(curl_exec($ch), true);
curl_close($ch);

// Get random quote
$quote = json_decode(
    file_get_contents('${url}/api/quotes/random'), 
    true
);
echo $quote['quote'] . " - " . $quote['author'];

// Get random quote by category
$quote = json_decode(
    file_get_contents('${url}/api/quotes/random?category=education'), 
    true
);
?>`;

        case "ruby":
            return `require 'net/http'
require 'json'

# Get all users
uri = URI('${url}/api/users')
response = Net::HTTP.get(uri)
data = JSON.parse(response)

puts data['users']
# → Array of user hashes

# With pagination
uri = URI('${url}/api/users?page=2&limit=20')
response = Net::HTTP.get(uri)
data = JSON.parse(response)

# Get single post
uri = URI('${url}/api/posts/1')
post = JSON.parse(Net::HTTP.get(uri))

# Get random quote
uri = URI('${url}/api/quotes/random')
quote = JSON.parse(Net::HTTP.get(uri))
puts "#{quote['quote']} - #{quote['author']}"

# Get random quote by category
uri = URI('${url}/api/quotes/random?category=life')
quote = JSON.parse(Net::HTTP.get(uri))`;

        case "rust":
            return `use reqwest;
use serde_json::Value;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Get all users
    let res = reqwest::get("${url}/api/users")
        .await?
        .json::<Value>()
        .await?;
    
    println!("{:?}", res["users"]);
    
    // With pagination
    let url = "${url}/api/users?page=2&limit=20";
    let res = reqwest::get(url).await?.json::<Value>().await?;
    
    // Get single user
    let user = reqwest::get("${url}/api/users/1")
        .await?
        .json::<Value>()
        .await?;
    
    // Get random quote
    let quote = reqwest::get("${url}/api/quotes/random")
        .await?
        .json::<Value>()
        .await?;
    
    println!("{} - {}", quote["quote"], quote["author"]);
    
    // Get random quote by category
    let quote = reqwest::get("${url}/api/quotes/random?category=motivation")
        .await?
        .json::<Value>()
        .await?;
    
    Ok(())
}`;

        default:
            return "";
    }
}

// Map our language names to Prism language identifiers
// prism-react-renderer only supports: javascript, jsx, tsx, typescript, json, bash, python, go, graphql, markup, markdown, css
// For unsupported languages, we map to the closest supported alternative
function getPrismLanguage(language: Language | string): string {
    const mapping: Record<string, string> = {
        javascript: "javascript",
        bash: "bash",
        python: "python",
        go: "go",
        // Java syntax is similar to TypeScript for basic highlighting
        java: "typescript",
        // PHP has C-like syntax, use JavaScript for basic highlighting
        php: "javascript",
        // Ruby syntax can be approximated with Python
        ruby: "python",
        // Rust has C-like syntax, use TypeScript for basic highlighting
        rust: "typescript",
        json: "json",
    };
    return mapping[language] || "javascript";
}

function SyntaxHighlightedCode({ code, language }: { code: string; language: string }) {
    const prismLanguage = getPrismLanguage(language);

    return (
        <Highlight theme={themes.oneDark} code={code} language={prismLanguage}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className="p-4 text-sm font-mono overflow-x-auto"
                    style={{ ...style, background: "transparent", margin: 0 }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
}

function CodeBlock({ code, language = "json" }: { code: string; language?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <div className="rounded-lg border bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
                <SyntaxHighlightedCode code={code} language={language} />
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/80 hover:bg-zinc-700"
                onClick={handleCopy}
            >
                {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                )}
            </Button>
        </div>
    );
}

function QuickStartCodeBlock() {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");
    const [copied, setCopied] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved language from localStorage on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        if (savedLanguage && languageLabels[savedLanguage]) {
            setSelectedLanguage(savedLanguage);
        }
        setIsHydrated(true);
    }, []);

    // Save language to localStorage whenever it changes
    const handleLanguageChange = (value: Language) => {
        setSelectedLanguage(value);
        localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(getCodeSnippet(selectedLanguage, BASE_URL));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const code = getCodeSnippet(selectedLanguage, BASE_URL);

    return (
        <div className="space-y-4">
            {/* Language Selector Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Language:</span>
                    <Select
                        value={selectedLanguage}
                        onValueChange={(value) => handleLanguageChange(value as Language)}
                    >
                        <SelectTrigger className="w-[160px] h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {(Object.keys(languageLabels) as Language[]).map((lang) => (
                                <SelectItem key={lang} value={lang}>
                                    {languageLabels[lang]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-2"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" />
                            Copy Code
                        </>
                    )}
                </Button>
            </div>

            {/* Code Display with Syntax Highlighting */}
            <div className="rounded-lg border bg-zinc-950 dark:bg-zinc-900 overflow-hidden">
                <SyntaxHighlightedCode
                    code={isHydrated ? code : getCodeSnippet("javascript", BASE_URL)}
                    language={isHydrated ? selectedLanguage : "javascript"}
                />
            </div>
        </div>
    );
}

function TryItButton({ endpoint }: { endpoint: string }) {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTry = async () => {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (e) {
            setError((e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <Button
                onClick={handleTry}
                disabled={loading}
                size="sm"
                className="gap-2"
            >
                {loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                    <Play className="h-3.5 w-3.5" />
                )}
                Try it Live
            </Button>

            <AnimatePresence>
                {response && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <CodeBlock code={response} language="json" />
                    </motion.div>
                )}
                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
                    >
                        Error: {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function EndpointCard({ resource, endpoint }: { resource: ApiResource; endpoint: Endpoint }) {
    // Always use the path and replace :id with 1 for the API call
    const tryUrl = endpoint.path.includes(":id")
        ? endpoint.path.replace(":id", "1")
        : endpoint.path + "?limit=3";

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                                {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono font-medium truncate">
                                {endpoint.path}
                            </code>
                        </div>
                        <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </div>
                </div>

                {endpoint.params && endpoint.params.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Query Parameters
                        </p>
                        <div className="grid gap-1.5">
                            {endpoint.params.map((param) => (
                                <div
                                    key={param.name}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted">
                                        {param.name}
                                    </code>
                                    <span className="text-muted-foreground text-xs">
                                        {param.type}
                                    </span>
                                    <span className="text-muted-foreground text-xs">
                                        — {param.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Separator />

                <TryItButton endpoint={tryUrl} />
            </CardContent>
        </Card>
    );
}

function ResourceSection({ resource }: { resource: ApiResource }) {
    const Icon = resource.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${resource.color}`}>
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-semibold">{resource.name}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
            </div>

            <div className="grid gap-4">
                {resource.endpoints.map((endpoint, i) => (
                    <EndpointCard key={i} resource={resource} endpoint={endpoint} />
                ))}
            </div>

            <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Sample Response
                </p>
                <CodeBlock code={resource.sampleResponse} language="json" />
            </div>
        </motion.div>
    );
}

export default function DummyApiClient() {
    const [selectedResource, setSelectedResource] = useState("users");
    const [copied, setCopied] = useState(false);

    const handleCopyBaseUrl = async () => {
        await navigator.clipboard.writeText(BASE_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="Mock REST API"
            description="DevTools Mock REST API with 8000+ Indian data points for testing & prototyping"
        >
            <div className="space-y-8">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        <Zap className="h-3.5 w-3.5" />
                        No authentication required
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight">
                        REST APIs with <span className="text-emerald-500">1000+ Indian Data</span> per Category
                    </h2>

                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Mock REST API for testing and prototyping. Get 1000+ users, posts, products, todos, comments, orders, companies, and 200 verified quotes
                        with realistic Indian names, phone numbers, addresses, and more.
                    </p>

                    {/* Base URL */}
                    <div className="flex items-center justify-center gap-2 pt-2">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted font-mono text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{BASE_URL || "https://tools.parthsali.com"}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCopyBaseUrl}
                            className="h-9 w-9"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {features.map((feature, i) => (
                        <Card key={i} className="text-center p-4">
                            <feature.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                            <p className="font-medium text-sm">{feature.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                        </Card>
                    ))}
                </motion.div>

                {/* Quick Start */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Code2 className="h-5 w-5" />
                                Quick Start
                            </CardTitle>
                            <CardDescription>
                                Fetch data in seconds. Select your language and copy the code.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <QuickStartCodeBlock />
                        </CardContent>
                    </Card>
                </motion.div>

                {/* API Resources */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                Available Resources
                            </CardTitle>
                            <CardDescription>
                                Click on a resource to explore endpoints and try them live
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Resource Tabs */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {apiResources.map((resource) => {
                                    const Icon = resource.icon;
                                    const isActive = selectedResource === resource.id;
                                    return (
                                        <Button
                                            key={resource.id}
                                            variant={isActive ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedResource(resource.id)}
                                            className="gap-2"
                                        >
                                            <Icon className={`h-4 w-4 ${isActive ? "" : resource.color}`} />
                                            {resource.name}
                                        </Button>
                                    );
                                })}
                            </div>

                            {/* Selected Resource */}
                            <AnimatePresence mode="wait">
                                {apiResources
                                    .filter((r) => r.id === selectedResource)
                                    .map((resource) => (
                                        <ResourceSection key={resource.id} resource={resource} />
                                    ))}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Data Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center text-sm text-muted-foreground space-y-2"
                >
                    <p>
                        🇮🇳 All data features Indian names, cities, states, phone numbers, GST numbers, and addresses
                    </p>
                    <p>
                        8200+ unique data points across 8 categories — powered by DevTools
                    </p>
                </motion.div>
            </div>
        </ToolLayout>
    );
}
