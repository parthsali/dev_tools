import { FileCode, Server, Database, Shield, Globe, Smartphone, Package, Lock, Container, Layers, GitBranch, Zap, Code2, type LucideIcon } from "lucide-react";

export interface Guide {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    category: string;
    tags: string[];
}

export interface GuideStep {
    title: string;
    description?: string;
    command?: string | {
        // Package Managers
        npm?: string;
        pnpm?: string;
        yarn?: string;
        bun?: string;
        // OS Specific
        windows?: string;
        mac?: string;
        linux?: string;
        // Generic fallback
        default?: string;
    };
    code?: { language: string; content: string; fileName?: string };
    note?: string;
}

export interface GuideContent {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
    prerequisites?: string[];
    references?: { label: string; url: string }[];
    steps: GuideStep[];
}

export const guides: Guide[] = [
    {
        id: "nextjs-shadcn",
        title: "Next.js + shadcn/ui",
        description: "Modern React framework with beautiful, accessible UI components",
        icon: FileCode,
        category: "frontend",
        tags: ["Next.js", "React", "shadcn", "Tailwind"],
    },
    {
        id: "express-typescript-mongo",
        title: "Express.js + TypeScript + MongoDB",
        description: "Production-ready REST API with TypeScript and MongoDB",
        icon: Server,
        category: "backend",
        tags: ["Express", "TypeScript", "MongoDB", "Node.js"],
    },
    {
        id: "nextjs-clerk-auth",
        title: "Next.js + Clerk Authentication",
        description: "Drop-in auth with user management, social logins, and route protection",
        icon: Lock,
        category: "fullstack",
        tags: ["Next.js", "Clerk", "Authentication", "TypeScript"],
    },
    {
        id: "prisma-postgres",
        title: "Prisma + PostgreSQL",
        description: "Type-safe database access with Prisma ORM and PostgreSQL",
        icon: Database,
        category: "backend",
        tags: ["Prisma", "PostgreSQL", "TypeScript", "ORM"],
    },
    {
        id: "docker-nodejs",
        title: "Docker + Node.js",
        description: "Containerize a Node.js app with multi-stage Dockerfile and Compose",
        icon: Container,
        category: "devops",
        tags: ["Docker", "Node.js", "Docker Compose", "DevOps"],
    },
    {
        id: "go-gin-gorm",
        title: "Go + Gin + GORM",
        description: "Build a fast, idiomatic REST API in Go with Gin and GORM",
        icon: Code2,
        category: "backend",
        tags: ["Go", "Golang", "Gin", "GORM", "PostgreSQL"],
    },
    {
        id: "trpc-nextjs",
        title: "tRPC v11 + Next.js",
        description: "End-to-end type-safe APIs with zero code generation",
        icon: Layers,
        category: "fullstack",
        tags: ["tRPC", "Next.js", "TypeScript", "TanStack Query"],
    },
    {
        id: "nextjs-supabase",
        title: "Next.js + Supabase",
        description: "Full-stack app with Supabase Auth, Postgres database, and SSR",
        icon: Database,
        category: "fullstack",
        tags: ["Next.js", "Supabase", "Auth", "PostgreSQL"],
    },
    {
        id: "github-actions-cicd",
        title: "GitHub Actions CI/CD",
        description: "Automate lint, type-check, test, build, and deploy on every push",
        icon: GitBranch,
        category: "devops",
        tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation"],
    },
];

export const guideContents: Record<string, GuideContent> = {
    "nextjs-shadcn": {
        id: "nextjs-shadcn",
        title: "Next.js + shadcn/ui Setup",
        description: "Set up a modern Next.js project with shadcn/ui components and Tailwind CSS",
        icon: FileCode,
        tags: ["Next.js", "React", "shadcn", "Tailwind"],
        prerequisites: ["Node.js 18+", "Package manager"],
        references: [
            { label: "Next.js Docs", url: "https://nextjs.org/docs" },
            { label: "shadcn/ui Docs", url: "https://ui.shadcn.com" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                description: "Initialize a new project using `create-next-app`. See [Next.js Installation](https://nextjs.org/docs/getting-started/installation).",
                command: {
                    npm: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
                    pnpm: "pnpm create next-app my-app --typescript --tailwind --eslint",
                    yarn: "yarn create next-app my-app --typescript --tailwind --eslint",
                    bun: "bun create next-app my-app --typescript --tailwind --eslint"
                },
                note: "You will be asked a few questions. Select defaults if unsure.",
            },
            {
                title: "Navigate to Project",
                description: "Move into your newly created project directory.",
                command: "cd my-app",
            },
            {
                title: "Initialize shadcn/ui",
                description: "Run the initialization command to set up the base styles and configuration. See [shadcn/ui CLI](https://ui.shadcn.com/docs/cli).",
                command: {
                    npm: "npx shadcn@latest init",
                    pnpm: "pnpm dlx shadcn@latest init",
                    yarn: "npx shadcn@latest init",
                    bun: "bunx shadcn@latest init"
                },
            },
            {
                title: "Add Button Component",
                description: "Install the Button component to test your setup. See [Button Docs](https://ui.shadcn.com/docs/components/button).",
                command: {
                    npm: "npx shadcn@latest add button",
                    pnpm: "pnpm dlx shadcn@latest add button",
                    yarn: "npx shadcn@latest add button",
                    bun: "bunx shadcn@latest add button"
                },
            },
            {
                title: "Update Page Content",
                description: "Replace the contents of `src/app/page.tsx` with this simple example using the Button.",
                code: {
                    language: "tsx",
                    fileName: "src/app/page.tsx",
                    content: `import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  )
}`,
                },
            },
            {
                title: "Start Development Server",
                description: "Start the local development server to view your app.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev"
                },
                note: "Visit http://localhost:3000 in your browser",
            },
        ],
    },
    "express-typescript-mongo": {
        id: "express-typescript-mongo",
        title: "Express.js + TypeScript + MongoDB",
        description: "Build a robust REST API using Express, TypeScript, and MongoDB with best practices.",
        icon: Server,
        tags: ["Express", "TypeScript", "MongoDB", "Node.js", "Backend"],
        prerequisites: ["Node.js 18+ installed", "MongoDB (local or Atlas connection string)"],
        references: [
            { label: "Express Docs", url: "https://expressjs.com" },
            { label: "Mongoose Docs", url: "https://mongoosejs.com/docs/guide.html" },
            { label: "TypeScript Docs", url: "https://www.typescriptlang.org/docs/" },
        ],
        steps: [
            {
                title: "Initialize Project",
                description: "Create a new directory and initialize `package.json`. See [npm init utils](https://docs.npmjs.com/cli/v8/commands/npm-init).",
                command: {
                    npm: "mkdir my-express-api && cd my-express-api && npm init -y",
                    pnpm: "mkdir my-express-api && cd my-express-api && pnpm init",
                    yarn: "mkdir my-express-api && cd my-express-api && yarn init -y",
                    bun: "mkdir my-express-api && cd my-express-api && bun init -y"
                },
            },
            {
                title: "Install Dependencies",
                description: "Install core libraries: [Express](https://expressjs.com) (framework), [Mongoose](https://mongoosejs.com) (ORM), [dotenv](https://www.npmjs.com/package/dotenv) (env vars), [cors](https://www.npmjs.com/package/cors) (CORS), and [helmet](https://helmetjs.github.io) (security headers).",
                command: {
                    npm: "npm install express mongoose dotenv cors helmet",
                    pnpm: "pnpm add express mongoose dotenv cors helmet",
                    yarn: "yarn add express mongoose dotenv cors helmet",
                    bun: "bun add express mongoose dotenv cors helmet"
                },
            },
            {
                title: "Install Dev Dependencies",
                description: "Install development tools: [TypeScript](https://www.typescriptlang.org), type definitions (@types/*), and [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for hot-reloading.",
                command: {
                    npm: "npm install -D typescript @types/node @types/express @types/cors ts-node-dev",
                    pnpm: "pnpm add -D typescript @types/node @types/express @types/cors ts-node-dev",
                    yarn: "yarn add -D typescript @types/node @types/express @types/cors ts-node-dev",
                    bun: "bun add -D typescript @types/node @types/express @types/cors ts-node-dev"
                },
            },
            {
                title: "Initialize TypeScript",
                description: "Generate a `tsconfig.json` file properly configured for Node.js development.",
                command: {
                    npm: "npx tsc --init",
                    pnpm: "pnpm dlx tsc --init",
                    yarn: "yarn tsc --init",
                    bun: "bunx tsc --init"
                },
            },
            {
                title: "Configure tsconfig.json",
                description: "Update `tsconfig.json` to strictly type your code and output to the `./dist` directory. See [tsconfig ref](https://www.typescriptlang.org/tsconfig).",
                code: {
                    language: "json",
                    fileName: "tsconfig.json",
                    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}`,
                },
            },
            {
                title: "Create Server File",
                description: "Create the entry point `src/index.ts` with a basic [Express app setup](https://expressjs.com/en/starter/hello-world.html) and [MongoDB connection](https://mongoosejs.com/docs/connections.html).",
                code: {
                    language: "typescript",
                    fileName: "src/index.ts",
                    content: `import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(\`Server running on port \${PORT}\`);
    });
  })
  .catch(console.error);`,
                },
            },
            {
                title: "Create .env File",
                description: "Define environment variables. Ensure `MONGODB_URI` points to your database instance.",
                code: {
                    language: "bash",
                    fileName: ".env",
                    content: `PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp`,
                },
            },
            {
                title: "Add Scripts to package.json",
                description: "Add `dev`, `build`, and `start` scripts to run your application.",
                code: {
                    language: "json",
                    fileName: "package.json",
                    content: `"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}`,
                },
            },
            {
                title: "Start Development Server",
                description: "Run the development server with hot-reloading.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev"
                },
                note: "Server should start on http://localhost:3000",
            },
        ],
    },
    "nextjs-better-auth-prisma": {
        id: "nextjs-better-auth-prisma",
        title: "Next.js + Better Auth + Prisma + PostgreSQL",
        description: "Set up full-stack authentication with Better Auth and Prisma",
        icon: Shield,
        tags: ["Next.js", "Better Auth", "Prisma", "PostgreSQL"],
        prerequisites: ["Node.js 18+", "PostgreSQL database"],
        references: [
            { label: "Better Auth Docs", url: "https://www.better-auth.com" },
            { label: "Prisma Docs", url: "https://www.prisma.io/docs" },
            { label: "Next.js Docs", url: "https://nextjs.org/docs" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                command: "npx create-next-app@latest my-auth-app --typescript --tailwind --app --src-dir",
            },
            {
                title: "Navigate to Project",
                command: "cd my-auth-app",
            },
            {
                title: "Install Dependencies",
                command: "npm install better-auth @prisma/client && npm install -D prisma",
            },
            {
                title: "Initialize Prisma",
                command: "npx prisma init",
            },
            {
                title: "Configure Database Schema",
                description: "Update prisma/schema.prisma with Better Auth models",
                code: {
                    language: "prisma",
                    content: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  providerId        String
  providerAccountId String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([providerId, providerAccountId])
}`,
                },
            },
            {
                title: "Create .env File",
                code: {
                    language: "bash",
                    content: `DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"`,
                },
            },
            {
                title: "Run Database Migration",
                command: "npx prisma migrate dev --name init",
            },
            {
                title: "Create Auth Configuration",
                description: "Create src/lib/auth.ts",
                code: {
                    language: "typescript",
                    content: `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});`,
                },
            },
            {
                title: "Create API Route",
                description: "Create src/app/api/auth/[...all]/route.ts",
                code: {
                    language: "typescript",
                    content: `import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);`,
                },
            },
            {
                title: "Start Development Server",
                command: "npm run dev",
                note: "Your auth endpoints are now available at /api/auth/*",
            },
        ],
    },
    "nextjs-drizzle-turso": {
        id: "nextjs-drizzle-turso",
        title: "Next.js + Drizzle + Turso",
        description: "Edge-ready database setup with Drizzle ORM and Turso",
        icon: Database,
        tags: ["Next.js", "Drizzle", "Turso", "SQLite"],
        prerequisites: ["Node.js 18+", "Turso account"],
        references: [
            { label: "Drizzle Docs", url: "https://orm.drizzle.team" },
            { label: "Turso Docs", url: "https://docs.turso.tech" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                command: "npx create-next-app@latest my-turso-app --typescript --tailwind --app",
            },
            {
                title: "Install Dependencies",
                command: "npm install drizzle-orm @libsql/client && npm install -D drizzle-kit",
            },
            {
                title: "Create Turso Database",
                description: "Install Turso CLI and create a database",
                command: "turso db create my-db && turso db tokens create my-db",
            },
            {
                title: "Configure Environment",
                code: {
                    language: "bash",
                    content: `TURSO_DATABASE_URL="libsql://your-db-name.turso.io"
TURSO_AUTH_TOKEN="your-auth-token"`,
                },
            },
            {
                title: "Create Database Client",
                description: "Create src/db/index.ts",
                code: {
                    language: "typescript",
                    content: `import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);`,
                },
            },
            {
                title: "Define Schema",
                description: "Create src/db/schema.ts",
                code: {
                    language: "typescript",
                    content: `import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});`,
                },
            },
            {
                title: "Create Drizzle Config",
                description: "Create drizzle.config.ts",
                code: {
                    language: "typescript",
                    content: `import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;`,
                },
            },
            {
                title: "Push Schema to Database",
                command: "npx drizzle-kit push:sqlite",
            },
        ],
    },
    "react-native-expo": {
        id: "react-native-expo",
        title: "React Native + Expo Setup",
        description: "Create a cross-platform mobile app with Expo",
        icon: Smartphone,
        tags: ["React Native", "Expo", "Mobile"],
        prerequisites: ["Node.js 18+", "Expo Go app on your phone"],
        references: [
            { label: "Expo Docs", url: "https://docs.expo.dev" },
            { label: "React Native Docs", url: "https://reactnative.dev/docs" },
        ],
        steps: [
            {
                title: "Create Expo Project",
                command: "npx create-expo-app my-app --template blank-typescript",
            },
            {
                title: "Navigate to Project",
                command: "cd my-app",
            },
            {
                title: "Install Additional Dependencies",
                command: "npx expo install expo-router expo-status-bar react-native-safe-area-context",
            },
            {
                title: "Start Development Server",
                command: "npx expo start",
                note: "Scan the QR code with Expo Go app to preview on your device",
            },
        ],
    },
    "nextjs-internationalization": {
        id: "nextjs-internationalization",
        title: "Next.js Internationalization (i18n)",
        description: "Add multi-language support to your Next.js app",
        icon: Globe,
        tags: ["Next.js", "i18n", "Localization"],
        prerequisites: ["Existing Next.js 14+ project with App Router"],
        references: [
            { label: "Next.js i18n Docs", url: "https://nextjs.org/docs/app/building-your-application/routing/internationalization" },
            { label: "next-intl", url: "https://next-intl-docs.vercel.app" },
        ],
        steps: [
            {
                title: "Install next-intl",
                command: "npm install next-intl",
            },
            {
                title: "Create Message Files",
                description: "Create messages/en.json",
                code: {
                    language: "json",
                    content: `{
  "HomePage": {
    "title": "Welcome to My App",
    "description": "This is a multilingual application"
  }
}`,
                },
            },
            {
                title: "Create i18n Configuration",
                description: "Create src/i18n.ts",
                code: {
                    language: "typescript",
                    content: `import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(\`../messages/\${locale}.json\`)).default
}));`,
                },
            },
            {
                title: "Update next.config.js",
                code: {
                    language: "javascript",
                    content: `const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);`,
                },
            },
            {
                title: "Create Middleware",
                description: "Create src/middleware.ts",
                code: {
                    language: "typescript",
                    content: `import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|es|fr)/:path*']
};`,
                },
            },
        ],
    },
    "nextjs-clerk-auth": {
        id: "nextjs-clerk-auth",
        title: "Next.js + Clerk Authentication",
        description: "Add complete authentication with user management, social logins, and protected routes using Clerk.",
        icon: Lock,
        tags: ["Next.js", "Clerk", "Authentication", "TypeScript"],
        prerequisites: ["Node.js 18+", "Clerk account (free tier available)"],
        references: [
            { label: "Clerk Docs", url: "https://clerk.com/docs" },
            { label: "Clerk Next.js Quickstart", url: "https://clerk.com/docs/quickstarts/nextjs" },
            { label: "Next.js Middleware", url: "https://nextjs.org/docs/app/building-your-application/routing/middleware" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                description: "Bootstrap a new Next.js app with TypeScript and the App Router.",
                command: {
                    npm: "npx create-next-app@latest my-app --typescript --tailwind --app --src-dir",
                    pnpm: "pnpm create next-app my-app --typescript --tailwind --app --src-dir",
                    yarn: "yarn create next-app my-app --typescript --tailwind --app --src-dir",
                    bun: "bun create next-app my-app --typescript --tailwind --app --src-dir",
                },
            },
            {
                title: "Install Clerk SDK",
                description: "Install the official [Clerk Next.js SDK](https://clerk.com/docs/references/nextjs/overview).",
                command: {
                    npm: "npm install @clerk/nextjs",
                    pnpm: "pnpm add @clerk/nextjs",
                    yarn: "yarn add @clerk/nextjs",
                    bun: "bun add @clerk/nextjs",
                },
            },
            {
                title: "Get Clerk API Keys",
                description: "Create a new application at [dashboard.clerk.com](https://dashboard.clerk.com). Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` from the API Keys section.",
                code: {
                    language: "bash",
                    fileName: ".env.local",
                    content: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Optional: custom redirect paths
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`,
                },
            },
            {
                title: "Wrap App with ClerkProvider",
                description: "Add `ClerkProvider` to your root layout. This makes auth state available throughout your app. See [ClerkProvider docs](https://clerk.com/docs/components/clerk-provider).",
                code: {
                    language: "tsx",
                    fileName: "src/app/layout.tsx",
                    content: `import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}`,
                },
            },
            {
                title: "Add Auth Middleware",
                description: "Create `src/middleware.ts` to protect routes. The `clerkMiddleware` helper integrates with Next.js middleware to redirect unauthenticated users. See [auth middleware docs](https://clerk.com/docs/references/nextjs/clerk-middleware).",
                code: {
                    language: "typescript",
                    fileName: "src/middleware.ts",
                    content: `import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}`,
                },
            },
            {
                title: "Create Sign-In and Sign-Up Pages",
                description: "Add Clerk's pre-built auth UI components. Place them in the correct directories so Clerk's redirect variables work automatically.",
                code: {
                    language: "tsx",
                    fileName: "src/app/sign-in/[[...sign-in]]/page.tsx",
                    content: `import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <SignIn />
    </main>
  )
}`,
                },
                note: "Create an identical file at src/app/sign-up/[[...sign-up]]/page.tsx replacing <SignIn /> with <SignUp />",
            },
            {
                title: "Build a Protected Dashboard",
                description: "Use `currentUser()` on the server or `useUser()` on the client to access user data. Both are provided by the Clerk SDK.",
                code: {
                    language: "tsx",
                    fileName: "src/app/dashboard/page.tsx",
                    content: `import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) redirect('/sign-in')

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Welcome back, {user.firstName}!
      </h1>
      <p className="text-muted-foreground mt-1">
        {user.primaryEmailAddress?.emailAddress}
      </p>
    </main>
  )
}`,
                },
            },
            {
                title: "Add Navigation with Auth State",
                description: "Use Clerk's `<SignedIn>`, `<SignedOut>`, and `<UserButton>` components to build a header that adapts to auth state.",
                code: {
                    language: "tsx",
                    fileName: "src/components/Navbar.tsx",
                    content: `import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <Link href="/" className="font-semibold text-lg">My App</Link>
      <nav className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium">Sign in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white">
              Get started
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard" className="text-sm">Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </nav>
    </header>
  )
}`,
                },
            },
            {
                title: "Protect API Routes",
                description: "Use `auth()` in Route Handlers to secure API endpoints. Returns `userId: null` for unauthenticated requests.",
                code: {
                    language: "typescript",
                    fileName: "src/app/api/protected/route.ts",
                    content: `import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'This is protected data',
    userId,
  })
}`,
                },
            },
            {
                title: "Start Development Server",
                description: "Run the dev server and navigate to `/` to see the public page, then try `/dashboard` to trigger the auth redirect.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "Visit http://localhost:3000 — unauthenticated users hitting /dashboard will be redirected to /sign-in automatically.",
            },
        ],
    },
    "trpc-nextjs": {
        id: "trpc-nextjs",
        title: "tRPC v11 + Next.js App Router",
        description: "Build fully type-safe APIs that share types between your Next.js server and client — no schemas, no code generation. Uses the new @trpc/tanstack-react-query integration.",
        icon: Layers,
        tags: ["tRPC", "Next.js", "TypeScript", "TanStack Query"],
        prerequisites: ["Node.js 18+", "Next.js 14+ with App Router", "TypeScript knowledge"],
        references: [
            { label: "tRPC Docs", url: "https://trpc.io/docs" },
            { label: "tRPC TanStack React Query Setup", url: "https://trpc.io/docs/client/tanstack-react-query/setup" },
            { label: "tRPC App Router Guide", url: "https://trpc.io/docs/client/nextjs/app-router-setup" },
            { label: "TanStack Query Docs", url: "https://tanstack.com/query/latest" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                description: "Scaffold a new Next.js app with TypeScript and the App Router.",
                command: {
                    npm: "npx create-next-app@latest my-trpc-app --typescript --tailwind --app --src-dir",
                    pnpm: "pnpm create next-app my-trpc-app --typescript --tailwind --app --src-dir",
                    yarn: "yarn create next-app my-trpc-app --typescript --tailwind --app --src-dir",
                    bun: "bun create next-app my-trpc-app --typescript --tailwind --app --src-dir",
                },
            },
            {
                title: "Install tRPC v11 and Dependencies",
                description: "tRPC v11 uses `@trpc/tanstack-react-query` — the new TanStack Query-native client that replaces the legacy `@trpc/react-query`. Also install `server-only` and `client-only` to enforce module boundaries. See [migration guide](https://trpc.io/docs/migrate-from-v10-to-v11).",
                command: {
                    npm: "npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only client-only",
                    pnpm: "pnpm add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only client-only",
                    yarn: "yarn add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only client-only",
                    bun: "bun add @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only client-only",
                },
            },
            {
                title: "Initialize the tRPC Instance",
                description: "Create `src/server/trpc.ts`. `initTRPC.create()` returns the builder you use to define all procedures and routers. The `server-only` import prevents this from being accidentally imported in client components.",
                code: {
                    language: "typescript",
                    fileName: "src/server/trpc.ts",
                    content: `import 'server-only'
import { initTRPC } from '@trpc/server'

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure`,
                },
            },
            {
                title: "Create the App Router",
                description: "Define your procedures in `src/server/routers/app.ts`. Queries return data, mutations change it. Zod validates all inputs at runtime — a mismatch throws a 400 before your resolver runs.",
                code: {
                    language: "typescript",
                    fileName: "src/server/routers/app.ts",
                    content: `import 'server-only'
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

const usersRouter = router({
  list: publicProcedure.query(async () => {
    // Replace with a real DB call
    return [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob',   email: 'bob@example.com' },
    ]
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return { id: input.id, name: 'Alice', email: 'alice@example.com' }
    }),

  create: publicProcedure
    .input(z.object({
      name:  z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email'),
    }))
    .mutation(async ({ input }) => {
      return { id: Date.now(), ...input }
    }),
})

export const appRouter = router({ users: usersRouter })

export type AppRouter = typeof appRouter`,
                },
            },
            {
                title: "Create the Next.js API Route Handler",
                description: "Mount the tRPC router on a Next.js catch-all Route Handler using the [fetch adapter](https://trpc.io/docs/server/adapters/nextjs) — required for the App Router since it uses Web-standard `Request`/`Response`.",
                code: {
                    language: "typescript",
                    fileName: "src/app/api/trpc/[trpc]/route.ts",
                    content: `import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server/routers/app'
import type { NextRequest } from 'next/server'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}),
  })

export { handler as GET, handler as POST }`,
                },
            },
            {
                title: "Create the Typed tRPC Client",
                description: "Create `src/lib/trpc/client.ts`. In tRPC v11, `createTRPCContext` produces a `TRPCProvider` and a `useTRPC` hook — all fully typed from your `AppRouter`. The `client-only` import prevents server components from accidentally calling this.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/trpc/client.ts",
                    content: `import 'client-only'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import type { AppRouter } from '@/server/routers/app'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()`,
                },
            },
            {
                title: "Create the Providers Component",
                description: "Wrap your app with the TanStack Query client and the tRPC provider. `httpBatchStreamLink` batches multiple tRPC calls into a single HTTP request and supports streaming responses.",
                code: {
                    language: "tsx",
                    fileName: "src/components/Providers.tsx",
                    content: `'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client'
import { useState } from 'react'
import type { AppRouter } from '@/server/routers/app'
import { TRPCProvider } from '@/lib/trpc/client'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchStreamLink({ url: '/api/trpc' }),
      ],
    })
  )

  return (
    <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TRPCProvider>
  )
}`,
                },
            },
            {
                title: "Wrap Root Layout with Providers",
                description: "Import your `Providers` component in the root layout.",
                code: {
                    language: "tsx",
                    fileName: "src/app/layout.tsx",
                    content: `import { Providers } from '@/components/Providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}`,
                },
            },
            {
                title: "Use tRPC in a Client Component",
                description: "In tRPC v11, `useTRPC()` returns the typed router. Pass the result to TanStack Query hooks via `.queryOptions()` and `.mutationOptions()`. Full autocomplete and inference — no manual types needed.",
                code: {
                    language: "tsx",
                    fileName: "src/app/users/page.tsx",
                    content: `'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTRPC } from '@/lib/trpc/client'

export default function UsersPage() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery(trpc.users.list.queryOptions())

  const createUser = useMutation(
    trpc.users.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.users.list.queryFilter())
      },
    })
  )

  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')

  if (isLoading) return <p className="p-8">Loading...</p>

  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <ul className="mb-8 space-y-2">
        {users?.map(u => (
          <li key={u.id} className="border rounded p-3">
            <p className="font-medium">{u.name}</p>
            <p className="text-sm text-muted-foreground">{u.email}</p>
          </li>
        ))}
      </ul>

      <form
        className="flex flex-col gap-3"
        onSubmit={e => {
          e.preventDefault()
          createUser.mutate({ name, email })
          setName(''); setEmail('')
        }}
      >
        <input className="border rounded px-3 py-2" placeholder="Name"
          value={name} onChange={e => setName(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit"
          className="rounded bg-black text-white py-2 text-sm font-medium">
          Add User
        </button>
      </form>
    </main>
  )
}`,
                },
            },
            {
                title: "Start the Development Server",
                description: "Run the dev server. Hover over any tRPC call to see the inferred input/output types. Rename a field in your router — TypeScript will flag every caller instantly.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "Navigate to http://localhost:3000/users. The `useTRPC()` hook gives you fully typed access to every procedure — no casting, no guessing.",
            },
        ],
    },
    "docker-nodejs": {
        id: "docker-nodejs",
        title: "Docker + Node.js",
        description: "Containerize a Node.js application with a production-ready multi-stage Dockerfile and Docker Compose for local development.",
        icon: Container,
        tags: ["Docker", "Node.js", "Docker Compose", "DevOps"],
        prerequisites: ["Docker Desktop installed", "Node.js 18+ installed", "Existing Node.js / Express app"],
        references: [
            { label: "Docker Docs", url: "https://docs.docker.com" },
            { label: "Node.js Docker Best Practices", url: "https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md" },
            { label: "Docker Compose Docs", url: "https://docs.docker.com/compose" },
        ],
        steps: [
            {
                title: "Create a .dockerignore File",
                description: "Exclude files that should not be copied into the image — `node_modules`, build output, and secrets. This dramatically reduces image size and build time.",
                code: {
                    language: "bash",
                    fileName: ".dockerignore",
                    content: `node_modules
npm-debug.log
dist
.next
.env
.env.local
.git
.gitignore
README.md
*.test.ts
coverage`,
                },
            },
            {
                title: "Write a Multi-Stage Dockerfile",
                description: "Multi-stage builds keep the final image lean — the `builder` stage installs all dev dependencies and compiles TypeScript, while the `runner` stage copies only the compiled output and production deps.",
                code: {
                    language: "dockerfile",
                    fileName: "Dockerfile",
                    content: `# ── Stage 1: Install deps & build ────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Production image ────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what's needed to run
COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Run as non-root for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000

CMD ["node", "dist/index.js"]`,
                },
                note: "Alpine-based images are ~5x smaller than the default debian ones. Adjust the CMD to match your app's entry point.",
            },
            {
                title: "Build and Run the Image",
                description: "Build the Docker image and run a container locally to confirm everything works before setting up Compose.",
                command: {
                    default: "docker build -t my-node-app . && docker run -p 3000:3000 --env-file .env my-node-app",
                },
            },
            {
                title: "Create docker-compose.yml for Local Development",
                description: "Docker Compose wires up your app, a database, and any other services. Using `volumes` to mount source code enables hot-reload without rebuilding the image on every change.",
                code: {
                    language: "yaml",
                    fileName: "docker-compose.yml",
                    content: `version: '3.9'

services:
  app:
    build:
      context: .
      target: builder        # use builder stage for dev (has ts-node-dev)
    command: npm run dev
    ports:
      - '3000:3000'
    volumes:
      - .:/app               # live-reload: changes reflect immediately
      - /app/node_modules    # prevent host node_modules from overriding container's
    env_file:
      - .env
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mongo:7
    ports:
      - '27017:27017'
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: ['CMD', 'mongosh', '--eval', "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo_data:`,
                },
            },
            {
                title: "Start Services with Docker Compose",
                description: "Spin up all services defined in `docker-compose.yml`. The `-d` flag runs them in detached (background) mode.",
                command: {
                    default: "docker compose up -d",
                },
                note: "Use `docker compose logs -f app` to tail logs, and `docker compose down` to stop all services.",
            },
            {
                title: "Create a Production docker-compose.prod.yml",
                description: "Override the dev compose file for production deployments. This targets the lean `runner` stage and removes volume mounts.",
                code: {
                    language: "yaml",
                    fileName: "docker-compose.prod.yml",
                    content: `version: '3.9'

services:
  app:
    build:
      context: .
      target: runner          # lean production image
    command: node dist/index.js
    restart: unless-stopped
    environment:
      NODE_ENV: production
      PORT: 3000
      MONGODB_URI: mongodb://db:27017/myapp
    ports:
      - '3000:3000'
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - mongo_data:/data/db
    healthcheck:
      test: ['CMD', 'mongosh', '--eval', "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  mongo_data:`,
                },
            },
            {
                title: "Add Useful npm Scripts",
                description: "Add convenience scripts to `package.json` so the team doesn't have to remember long Docker commands.",
                code: {
                    language: "json",
                    fileName: "package.json (scripts section)",
                    content: `"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "docker:dev": "docker compose up -d",
  "docker:down": "docker compose down",
  "docker:logs": "docker compose logs -f app",
  "docker:prod": "docker compose -f docker-compose.prod.yml up -d --build"
}`,
                },
            },
            {
                title: "Verify the Running Container",
                description: "Check that your container is up, inspect its logs, and exec into it for debugging if needed.",
                command: {
                    default: "docker compose ps && curl http://localhost:3000",
                },
                note: "Use `docker compose exec app sh` to open a shell inside the running container for debugging.",
            },
        ],
    },
    "prisma-postgres": {
        id: "prisma-postgres",
        title: "Prisma + PostgreSQL",
        description: "Set up Prisma ORM with PostgreSQL for fully type-safe database access, migrations, and seeding in a Node.js or Next.js project.",
        icon: Database,
        tags: ["Prisma", "PostgreSQL", "TypeScript", "ORM"],
        prerequisites: ["Node.js 18+", "PostgreSQL database (local or cloud — Supabase / Neon work great)"],
        references: [
            { label: "Prisma Docs", url: "https://www.prisma.io/docs" },
            { label: "Prisma Schema Reference", url: "https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference" },
            { label: "Prisma Client API", url: "https://www.prisma.io/docs/reference/api-reference/prisma-client-reference" },
        ],
        steps: [
            {
                title: "Initialize the Project",
                description: "Create a new Node.js project with TypeScript. Skip this step if you're adding Prisma to an existing project.",
                command: {
                    npm: "mkdir my-prisma-app && cd my-prisma-app && npm init -y && npm install -D typescript ts-node @types/node && npx tsc --init",
                    pnpm: "mkdir my-prisma-app && cd my-prisma-app && pnpm init && pnpm add -D typescript ts-node @types/node && pnpm dlx tsc --init",
                    yarn: "mkdir my-prisma-app && cd my-prisma-app && yarn init -y && yarn add -D typescript ts-node @types/node && yarn tsc --init",
                    bun: "mkdir my-prisma-app && cd my-prisma-app && bun init -y",
                },
            },
            {
                title: "Install Prisma",
                description: "Install the Prisma CLI as a dev dependency and the Prisma Client as a runtime dependency.",
                command: {
                    npm: "npm install -D prisma && npm install @prisma/client",
                    pnpm: "pnpm add -D prisma && pnpm add @prisma/client",
                    yarn: "yarn add -D prisma && yarn add @prisma/client",
                    bun: "bun add -D prisma && bun add @prisma/client",
                },
            },
            {
                title: "Initialize Prisma",
                description: "Run `prisma init` to create `prisma/schema.prisma` and a `.env` file. Pass `--datasource-provider postgresql` to pre-configure the provider.",
                command: {
                    npm: "npx prisma init --datasource-provider postgresql",
                    pnpm: "pnpm dlx prisma init --datasource-provider postgresql",
                    yarn: "yarn prisma init --datasource-provider postgresql",
                    bun: "bunx prisma init --datasource-provider postgresql",
                },
            },
            {
                title: "Configure Database URL",
                description: "Set your PostgreSQL connection string in `.env`. For cloud providers, grab the connection string from their dashboard.",
                code: {
                    language: "bash",
                    fileName: ".env",
                    content: `# Local PostgreSQL
DATABASE_URL="postgresql://postgres:password@localhost:5432/myapp?schema=public"

# Supabase (Transaction Mode pooler — recommended for serverless)
# DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Neon
# DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"`,
                },
            },
            {
                title: "Define the Schema",
                description: "Model your data in `prisma/schema.prisma`. Prisma models map 1:1 to database tables. Relations are declared with `@relation`.",
                code: {
                    language: "prisma",
                    fileName: "prisma/schema.prisma",
                    content: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
}

enum Role {
  USER
  ADMIN
}`,
                },
                note: "Run `npx prisma format` to auto-format your schema file.",
            },
            {
                title: "Run the First Migration",
                description: "Create and apply a migration. Prisma generates SQL and stores the migration history in `prisma/migrations/`. Always review the generated SQL before applying in production.",
                command: {
                    npm: "npx prisma migrate dev --name init",
                    pnpm: "pnpm dlx prisma migrate dev --name init",
                    yarn: "yarn prisma migrate dev --name init",
                    bun: "bunx prisma migrate dev --name init",
                },
            },
            {
                title: "Create a Singleton Prisma Client",
                description: "In development, Next.js hot-reload can create many Prisma Client instances. A singleton pattern prevents connection pool exhaustion.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/prisma.ts",
                    content: `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}`,
                },
            },
            {
                title: "Perform CRUD Operations",
                description: "Use the generated Prisma Client to query your database. All methods are fully typed based on your schema.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/users.ts",
                    content: `import { prisma } from './prisma'

// CREATE
export async function createUser(email: string, name: string) {
  return prisma.user.create({
    data: { email, name },
  })
}

// READ — single user with their posts
export async function getUserWithPosts(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { posts: { orderBy: { createdAt: 'desc' } } },
  })
}

// READ — paginated list
export async function listUsers(page = 1, pageSize = 20) {
  return prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  })
}

// UPDATE
export async function publishPost(postId: number) {
  return prisma.post.update({
    where: { id: postId },
    data: { published: true },
  })
}

// DELETE
export async function deleteUser(id: number) {
  // Posts are deleted automatically via onDelete: Cascade
  return prisma.user.delete({ where: { id } })
}

// TRANSACTION — create a user and first post atomically
export async function createUserWithPost(
  email: string,
  name: string,
  postTitle: string,
) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({ data: { email, name } })
    const post = await tx.post.create({
      data: { title: postTitle, authorId: user.id },
    })
    return { user, post }
  })
}`,
                },
            },
            {
                title: "Seed the Database",
                description: "Create `prisma/seed.ts` to populate the database with initial data. Register the seed script in `package.json` so `prisma migrate reset` runs it automatically.",
                code: {
                    language: "typescript",
                    fileName: "prisma/seed.ts",
                    content: `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice',
      role: 'ADMIN',
      posts: {
        create: [
          { title: 'Hello World', content: 'My first post', published: true },
          { title: 'Draft post', content: 'Coming soon...' },
        ],
      },
    },
  })

  console.log({ alice })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())`,
                },
                note: "Add `\"prisma\": { \"seed\": \"ts-node prisma/seed.ts\" }` to package.json, then run `npx prisma db seed`.",
            },
            {
                title: "Open Prisma Studio",
                description: "Launch Prisma Studio — a visual browser-based GUI to inspect and edit your database data without writing SQL.",
                command: {
                    npm: "npx prisma studio",
                    pnpm: "pnpm dlx prisma studio",
                    yarn: "yarn prisma studio",
                    bun: "bunx prisma studio",
                },
                note: "Prisma Studio opens at http://localhost:5555",
            },
        ],
    },
    "express-winston-logging": {
        id: "express-winston-logging",
        title: "Express.js + Winston Logging",
        description: "Add production-grade structured logging to an Express.js TypeScript app using Winston and Morgan, with daily log rotation and a global error handler.",
        icon: Server,
        tags: ["Express", "Winston", "Morgan", "Node.js", "TypeScript"],
        prerequisites: ["Node.js 18+", "Existing Express + TypeScript project (or follow the express-typescript-mongo guide first)"],
        references: [
            { label: "Winston Docs", url: "https://github.com/winstonjs/winston" },
            { label: "Morgan Docs", url: "https://github.com/expressjs/morgan" },
            { label: "winston-daily-rotate-file", url: "https://github.com/winstonjs/winston-daily-rotate-file" },
            { label: "Better Stack Winston Guide", url: "https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/" },
        ],
        steps: [
            {
                title: "Install Winston, Morgan, and Daily Rotate",
                description: "Install [Winston](https://github.com/winstonjs/winston) (the logger), [Morgan](https://github.com/expressjs/morgan) (HTTP request middleware), and [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) (log rotation). Add `@types/morgan` for TypeScript support.",
                command: {
                    npm: "npm install winston morgan winston-daily-rotate-file && npm install -D @types/morgan",
                    pnpm: "pnpm add winston morgan winston-daily-rotate-file && pnpm add -D @types/morgan",
                    yarn: "yarn add winston morgan winston-daily-rotate-file && yarn add -D @types/morgan",
                    bun: "bun add winston morgan winston-daily-rotate-file && bun add -D @types/morgan",
                },
            },
            {
                title: "Create the Logger",
                description: "Create `src/lib/logger.ts`. In development it prints colorized, human-readable output. In production it emits JSON — perfect for log aggregators like Datadog, Logtail, or CloudWatch.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/logger.ts",
                    content: `import winston from 'winston'
import 'winston-daily-rotate-file'

const { combine, timestamp, colorize, printf, json, errors } = winston.format

const devFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) =>
    stack
      ? \`[\${timestamp}] \${level}: \${message}\\n\${stack}\`
      : \`[\${timestamp}] \${level}: \${message}\`
  )
)

const prodFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json()
)

const fileTransport = new winston.transports.DailyRotateFile({
  filename:      'logs/app-%DATE%.log',
  datePattern:   'YYYY-MM-DD',
  maxFiles:      '14d',    // keep 14 days of logs
  maxSize:       '20m',    // rotate at 20 MB
  zippedArchive: true,
  level:         'info',
})

const errorFileTransport = new winston.transports.DailyRotateFile({
  filename:      'logs/error-%DATE%.log',
  datePattern:   'YYYY-MM-DD',
  maxFiles:      '30d',
  maxSize:       '20m',
  zippedArchive: true,
  level:         'error',
})

export const logger = winston.createLogger({
  level:  process.env.LOG_LEVEL || 'info',
  format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [
    new winston.transports.Console(),
    ...(process.env.NODE_ENV === 'production'
      ? [fileTransport, errorFileTransport]
      : []),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
  ],
})`,
                },
            },
            {
                title: "Create the Morgan HTTP Middleware",
                description: "Create `src/middleware/httpLogger.ts`. This pipes Morgan's HTTP request logs through Winston so all logs share the same format and transports — no split log streams.",
                code: {
                    language: "typescript",
                    fileName: "src/middleware/httpLogger.ts",
                    content: `import morgan, { StreamOptions } from 'morgan'
import { logger } from '../lib/logger'

const stream: StreamOptions = {
  // Morgan appends a newline — strip it before handing to Winston
  write: (message) => logger.http(message.trimEnd()),
}

// Skip logging for health-check endpoints to reduce noise
const skip = (req: { url?: string }) => {
  if (process.env.NODE_ENV === 'production') return false
  return req.url === '/health'
}

export const httpLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
)`,
                },
            },
            {
                title: "Create the Global Error Handler",
                description: "Create `src/middleware/errorHandler.ts`. Express identifies error-handling middleware by its 4-argument signature `(err, req, res, next)`. Register it **last** in `app.use()` — after all routes.",
                code: {
                    language: "typescript",
                    fileName: "src/middleware/errorHandler.ts",
                    content: `import { Request, Response, NextFunction } from 'express'
import { logger } from '../lib/logger'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err instanceof AppError ? err.statusCode : 500

  logger.error({
    message: err.message,
    stack:   err.stack,
    url:     req.url,
    method:  req.method,
    statusCode,
  })

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  })
}`,
                },
            },
            {
                title: "Wire Everything into Express",
                description: "Update `src/index.ts` to use the HTTP logger, app logger, and global error handler. Notice that `errorHandler` is registered **after** all routes.",
                code: {
                    language: "typescript",
                    fileName: "src/index.ts",
                    content: `import express from 'express'
import dotenv from 'dotenv'
import { httpLogger }  from './middleware/httpLogger'
import { errorHandler, AppError } from './middleware/errorHandler'
import { logger }      from './lib/logger'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(httpLogger)           // log every HTTP request

// Routes
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/users', (_req, res) => {
  logger.info('Fetching all users')
  res.json([{ id: 1, name: 'Alice' }])
})

app.get('/users/:id', (req, res, next) => {
  const { id } = req.params
  if (isNaN(Number(id))) {
    return next(new AppError(400, \`Invalid user id: \${id}\`))
  }
  logger.debug(\`Fetching user \${id}\`)
  res.json({ id: Number(id), name: 'Alice' })
})

// Must be last — error handler reads errors thrown in routes above
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(\`Server started on port \${PORT} in \${process.env.NODE_ENV} mode\`)
})`,
                },
            },
            {
                title: "Add Logs Directory to .gitignore",
                description: "Exclude generated log files from version control.",
                code: {
                    language: "bash",
                    fileName: ".gitignore",
                    content: `node_modules
dist
logs/`,
                },
                note: "The `logs/` directory is created automatically by `winston-daily-rotate-file` when the first log entry is written.",
            },
            {
                title: "Start the Server and Check Logs",
                description: "Run the server and make a few requests. In development you will see colorized output in the terminal. In production (`NODE_ENV=production`) logs are written as JSON to `logs/app-YYYY-MM-DD.log`.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "Try `curl http://localhost:3000/users/abc` to trigger the AppError — you should see a structured error log with the stack trace.",
            },
        ],
    },
    "nextjs-dodopayments": {
        id: "nextjs-dodopayments",
        title: "Next.js + Dodo Payments",
        description: "Accept one-time payments and subscriptions in a Next.js app using Dodo Payments, with a hosted Checkout page and webhook verification.",
        icon: Package,
        tags: ["Next.js", "Dodo Payments", "Payments", "Webhooks", "TypeScript"],
        prerequisites: ["Node.js 18+", "Dodo Payments account (dashboard.dodopayments.com)", "An existing Next.js 14+ project with App Router"],
        references: [
            { label: "Dodo Payments Docs", url: "https://docs.dodopayments.com" },
            { label: "Next.js Adapter Docs", url: "https://docs.dodopayments.com/developer-resources/nextjs-adaptor" },
            { label: "Dodo Payments Dashboard", url: "https://dashboard.dodopayments.com" },
            { label: "Integration Tutorial", url: "https://docs.dodopayments.com/api-reference/integration-tutorial" },
        ],
        steps: [
            {
                title: "Install the Dodo Payments Next.js Adapter",
                description: "The [`@dodopayments/nextjs`](https://www.npmjs.com/package/@dodopayments/nextjs) package provides ready-made Route Handlers for Checkout, Customer Portal, and Webhooks.",
                command: {
                    npm: "npm install @dodopayments/nextjs",
                    pnpm: "pnpm add @dodopayments/nextjs",
                    yarn: "yarn add @dodopayments/nextjs",
                    bun: "bun add @dodopayments/nextjs",
                },
            },
            {
                title: "Configure Environment Variables",
                description: "Get your API key and webhook secret from the [Dodo Payments dashboard](https://dashboard.dodopayments.com). Set `DODO_PAYMENTS_ENVIRONMENT` to `test_mode` during development.",
                code: {
                    language: "bash",
                    fileName: ".env.local",
                    content: `DODO_PAYMENTS_API_KEY=your_api_key_here
DODO_PAYMENTS_WEBHOOK_KEY=your_webhook_secret_here
DODO_PAYMENTS_ENVIRONMENT=test_mode   # change to live_mode for production
NEXT_PUBLIC_APP_URL=http://localhost:3000`,
                },
            },
            {
                title: "Create a Product in the Dashboard",
                description: "Log in to the [Dodo Payments dashboard](https://dashboard.dodopayments.com), create a product, and copy its **Product ID** (e.g. `prod_xxxx`). You will use this ID when creating checkout links.",
                note: "Dodo Payments supports one-time payments and recurring subscriptions. Create the product as either type depending on your use case.",
            },
            {
                title: "Add the Checkout Route Handler",
                description: "Create a catch-all Route Handler for Dodo Payments Checkout. The adapter handles the redirect to Dodo's hosted checkout page and returns the user to your `success_url` after payment.",
                code: {
                    language: "typescript",
                    fileName: "src/app/api/payments/checkout/route.ts",
                    content: `import { Checkout } from '@dodopayments/nextjs'

export const { GET, POST } = Checkout({
  apiKey:      process.env.DODO_PAYMENTS_API_KEY!,
  environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode') ?? 'test_mode',
})`,
                },
            },
            {
                title: "Add the Webhook Route Handler",
                description: "Create the webhook handler that Dodo Payments will POST to after each payment event. The adapter verifies the signature automatically — your `onPayload` callback only runs for genuine events.",
                code: {
                    language: "typescript",
                    fileName: "src/app/api/payments/webhook/route.ts",
                    content: `import { Webhooks } from '@dodopayments/nextjs'
import type { WebhookPayload } from '@dodopayments/nextjs'

export const { POST } = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,
  onPayload:  async (payload: WebhookPayload) => {
    switch (payload.type) {
      case 'payment.succeeded':
        console.log('Payment succeeded:', payload.data.payment_id)
        // TODO: Fulfill the order in your DB
        break

      case 'subscription.active':
        console.log('Subscription activated:', payload.data.subscription_id)
        // TODO: Grant access to the subscriber
        break

      case 'subscription.cancelled':
        console.log('Subscription cancelled:', payload.data.subscription_id)
        // TODO: Revoke access
        break

      case 'refund.succeeded':
        console.log('Refund processed:', payload.data.payment_id)
        break

      default:
        console.log('Unhandled event:', payload.type)
    }
  },
})`,
                },
            },
            {
                title: "Create a Checkout Button",
                description: "Build a Server Action that generates a checkout URL for a product and redirects the user. Passing `customer_email` pre-fills the checkout form.",
                code: {
                    language: "tsx",
                    fileName: "src/app/pricing/page.tsx",
                    content: `import { redirect } from 'next/navigation'

const PRODUCT_ID = 'prod_xxxx'  // replace with your product ID

async function createCheckout() {
  'use server'

  const res = await fetch(
    \`\${process.env.NEXT_PUBLIC_APP_URL}/api/payments/checkout\`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id:  PRODUCT_ID,
        quantity:    1,
        success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/payment/success\`,
        cancel_url:  \`\${process.env.NEXT_PUBLIC_APP_URL}/pricing\`,
      }),
    }
  )

  const { url } = await res.json()
  redirect(url)
}

export default function PricingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="rounded-2xl border p-8 text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-2">Pro Plan</h1>
        <p className="text-muted-foreground mb-6">
          Everything you need to build and ship.
        </p>
        <p className="text-4xl font-bold mb-8">
          $19<span className="text-lg font-normal text-muted-foreground">/mo</span>
        </p>
        <form action={createCheckout}>
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white py-3 font-medium hover:bg-black/80 transition-colors"
          >
            Get started
          </button>
        </form>
      </div>
    </main>
  )
}`,
                },
            },
            {
                title: "Create the Success Page",
                description: "Build a simple confirmation page the user lands on after a successful payment.",
                code: {
                    language: "tsx",
                    fileName: "src/app/payment/success/page.tsx",
                    content: `export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-5xl">🎉</div>
      <h1 className="text-3xl font-bold">Payment successful!</h1>
      <p className="text-muted-foreground">
        Thank you for your purchase. You will receive a confirmation email shortly.
      </p>
      <a href="/" className="mt-4 underline text-sm">
        Return to home
      </a>
    </main>
  )
}`,
                },
            },
            {
                title: "Test Webhooks Locally with ngrok",
                description: "Dodo Payments needs a publicly accessible URL to send webhook events. Use ngrok to tunnel your local dev server, then register the URL in the dashboard.",
                command: {
                    default: "npx ngrok http 3000",
                },
                note: "Copy the ngrok HTTPS URL (e.g. https://xxxx.ngrok.io), then add /api/payments/webhook as a webhook endpoint in your Dodo Payments dashboard.",
            },
            {
                title: "Start the Development Server",
                description: "Run the app, navigate to `/pricing`, and click the checkout button to test a payment using Dodo's test card numbers.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "In test_mode, use the test card number 4242 4242 4242 4242 with any future expiry and CVC.",
            },
        ],
    },
    "hono-nodejs": {
        id: "hono-nodejs",
        title: "Hono.js + Node.js REST API",
        description: "Build an ultra-fast, type-safe REST API with Hono.js and TypeScript on Node.js — with Zod validation, structured error handling, and organized route files.",
        icon: Server,
        tags: ["Hono", "Node.js", "TypeScript", "REST API", "Zod"],
        prerequisites: ["Node.js 22 LTS", "TypeScript familiarity"],
        references: [
            { label: "Hono Docs", url: "https://hono.dev/docs" },
            { label: "Hono Node.js Adapter", url: "https://hono.dev/docs/getting-started/nodejs" },
            { label: "@hono/zod-validator", url: "https://github.com/honojs/middleware/tree/main/packages/zod-validator" },
            { label: "Hono Middleware", url: "https://hono.dev/docs/middleware/builtin/logger" },
        ],
        steps: [
            {
                title: "Initialize the Project",
                description: "Create a new Node.js project with TypeScript configured for ESM — Hono works best with the native ES Module format.",
                command: {
                    npm: "mkdir my-hono-api && cd my-hono-api && npm init -y && npm install -D typescript tsx @types/node",
                    pnpm: "mkdir my-hono-api && cd my-hono-api && pnpm init && pnpm add -D typescript tsx @types/node",
                    yarn: "mkdir my-hono-api && cd my-hono-api && yarn init -y && yarn add -D typescript tsx @types/node",
                    bun: "mkdir my-hono-api && cd my-hono-api && bun init -y",
                },
            },
            {
                title: "Install Hono and Dependencies",
                description: "Install [Hono](https://hono.dev) core, the `@hono/node-server` adapter (required for Node.js), [Zod](https://zod.dev) for validation, and `@hono/zod-validator` for the typed middleware.",
                command: {
                    npm: "npm install hono @hono/node-server zod @hono/zod-validator",
                    pnpm: "pnpm add hono @hono/node-server zod @hono/zod-validator",
                    yarn: "yarn add hono @hono/node-server zod @hono/zod-validator",
                    bun: "bun add hono @hono/node-server zod @hono/zod-validator",
                },
            },
            {
                title: "Configure tsconfig.json",
                description: "Configure TypeScript to compile to ESNext modules, which is required for Hono on Node.js.",
                code: {
                    language: "json",
                    fileName: "tsconfig.json",
                    content: `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}`,
                },
            },
            {
                title: "Add npm Scripts",
                description: "Add `dev` (runs with `tsx` for hot reload), `build`, and `start` scripts to `package.json`.",
                code: {
                    language: "json",
                    fileName: "package.json (scripts)",
                    content: `"type": "module",
"scripts": {
  "dev":   "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}`,
                },
            },
            {
                title: "Define Zod Schemas",
                description: "Create `src/schemas/user.ts`. Centralizing schemas means the same validation rules are used in route handlers and can be re-used for response types.",
                code: {
                    language: "typescript",
                    fileName: "src/schemas/user.ts",
                    content: `import { z } from 'zod'

export const createUserSchema = z.object({
  name:  z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role:  z.enum(['user', 'admin']).default('user'),
})

export const updateUserSchema = createUserSchema.partial()

export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>`,
                },
            },
            {
                title: "Create the Users Router",
                description: "Create `src/routes/users.ts`. Use `@hono/zod-validator` to validate request bodies — invalid payloads are rejected before your handler runs, and the parsed data is fully typed.",
                code: {
                    language: "typescript",
                    fileName: "src/routes/users.ts",
                    content: `import { Hono }         from 'hono'
import { zValidator }  from '@hono/zod-validator'
import { createUserSchema, updateUserSchema } from '../schemas/user.js'

// In-memory store — swap for a real DB in production
const db = new Map<number, { id: number; name: string; email: string; role: string }>()
let nextId = 1

const users = new Hono()

// GET /users
users.get('/', (c) => {
  return c.json(Array.from(db.values()))
})

// GET /users/:id
users.get('/:id', (c) => {
  const id   = Number(c.req.param('id'))
  const user = db.get(id)
  if (!user) return c.json({ error: 'User not found' }, 404)
  return c.json(user)
})

// POST /users
users.post('/', zValidator('json', createUserSchema), (c) => {
  const body = c.req.valid('json')  // fully typed CreateUser
  const user = { id: nextId++, ...body }
  db.set(user.id, user)
  return c.json(user, 201)
})

// PATCH /users/:id
users.patch('/:id', zValidator('json', updateUserSchema), (c) => {
  const id   = Number(c.req.param('id'))
  const user = db.get(id)
  if (!user) return c.json({ error: 'User not found' }, 404)
  const updated = { ...user, ...c.req.valid('json') }
  db.set(id, updated)
  return c.json(updated)
})

// DELETE /users/:id
users.delete('/:id', (c) => {
  const id = Number(c.req.param('id'))
  if (!db.delete(id)) return c.json({ error: 'User not found' }, 404)
  return c.body(null, 204)
})

export { users }`,
                },
            },
            {
                title: "Create the Main App",
                description: "Create `src/index.ts`. Wire up global middleware (logger, CORS, pretty JSON in dev), mount the users router, and add a catch-all error handler.",
                code: {
                    language: "typescript",
                    fileName: "src/index.ts",
                    content: `import { serve }  from '@hono/node-server'
import { Hono }   from 'hono'
import { logger } from 'hono/logger'
import { cors }   from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { HTTPException } from 'hono/http-exception'
import { users } from './routes/users.js'

const app = new Hono()

// Global middleware
app.use('*', logger())
app.use('*', cors())

if (process.env.NODE_ENV !== 'production') {
  app.use('*', prettyJSON())
}

// Routes
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }))
app.route('/users', users)

// Global error handler
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status)
  }
  console.error(err)
  return c.json({ error: 'Internal Server Error' }, 500)
})

// 404 handler
app.notFound((c) => c.json({ error: \`Route \${c.req.path} not found\` }, 404))

const PORT = Number(process.env.PORT) || 3000

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`)
})`,
                },
            },
            {
                title: "Start the Development Server",
                description: "Run the server. `tsx watch` restarts automatically on file changes — no extra tooling needed.",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "Try `curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\",\"email\":\"alice@example.com\"}'` to create your first user.",
            },
            {
                title: "Test the API Endpoints",
                description: "Make a few requests to confirm everything is working. The Zod validator will return a 400 with detailed errors if the body is malformed.",
                code: {
                    language: "bash",
                    fileName: "test.sh",
                    content: `# Create a user
curl -s -X POST http://localhost:3000/users \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Alice","email":"alice@example.com"}' | jq

# List all users
curl -s http://localhost:3000/users | jq

# Update a user
curl -s -X PATCH http://localhost:3000/users/1 \\
  -H 'Content-Type: application/json' \\
  -d '{"role":"admin"}' | jq

# Trigger a validation error (missing email)
curl -s -X POST http://localhost:3000/users \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Bob"}' | jq`,
                },
            },
        ],
    },
    "go-gin-gorm": {
        id: "go-gin-gorm",
        title: "Go + Gin + GORM REST API",
        description: "Build a production-ready REST API in Go using the Gin web framework, GORM ORM, PostgreSQL, and Air for hot-reload development.",
        icon: Code2,
        tags: ["Go", "Golang", "Gin", "GORM", "PostgreSQL"],
        prerequisites: ["Go 1.22+ installed (go.dev/dl)", "PostgreSQL running locally or a connection string", "Air installed for hot-reload"],
        references: [
            { label: "Gin Docs", url: "https://gin-gonic.com/docs/" },
            { label: "GORM Docs", url: "https://gorm.io/docs/" },
            { label: "Air (hot-reload)", url: "https://github.com/air-verse/air" },
            { label: "godotenv", url: "https://github.com/joho/godotenv" },
        ],
        steps: [
            {
                title: "Initialize Go Module",
                description: "Create a project directory and initialize a Go module. The module path is used as the import prefix throughout the project.",
                command: {
                    default: "mkdir my-go-api && cd my-go-api && go mod init github.com/yourusername/my-go-api",
                },
            },
            {
                title: "Install Dependencies",
                description: "Install [Gin](https://gin-gonic.com) (HTTP framework), [GORM](https://gorm.io) with the PostgreSQL driver, and [godotenv](https://github.com/joho/godotenv) for `.env` support.",
                command: {
                    default: "go get github.com/gin-gonic/gin gorm.io/gorm gorm.io/driver/postgres github.com/joho/godotenv",
                },
            },
            {
                title: "Install Air for Hot Reload",
                description: "[Air](https://github.com/air-verse/air) watches your Go files and recompiles automatically on change — the equivalent of `ts-node-dev` in the Go world.",
                command: {
                    default: "go install github.com/air-verse/air@latest",
                },
                note: "Run `air init` in your project root to generate a default `.air.toml` config file.",
            },
            {
                title: "Create .env File",
                description: "Store your database connection string and server port in `.env`. godotenv will load these at startup.",
                code: {
                    language: "bash",
                    fileName: ".env",
                    content: `PORT=8080
DATABASE_URL=postgres://postgres:password@localhost:5432/myapp?sslmode=disable`,
                },
            },
            {
                title: "Define the Database Model",
                description: "Create `models/user.go`. Embedding `gorm.Model` gives you `ID`, `CreatedAt`, `UpdatedAt`, and `DeletedAt` for free. GORM uses struct tags to map fields to columns.",
                code: {
                    language: "go",
                    fileName: "models/user.go",
                    content: `package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string \`json:"name"  gorm:"not null"\`
	Email string \`json:"email" gorm:"uniqueIndex;not null"\`
}

type CreateUserInput struct {
	Name  string \`json:"name"  binding:"required"\`
	Email string \`json:"email" binding:"required,email"\`
}

type UpdateUserInput struct {
	Name  string \`json:"name"\`
	Email string \`json:"email" binding:"omitempty,email"\`
}`,
                },
            },
            {
                title: "Create Request Handlers",
                description: "Create `handlers/user.go`. Handlers receive a `*gin.Context` which gives access to request data, path params, and response helpers. GORM queries are fully type-safe.",
                code: {
                    language: "go",
                    fileName: "handlers/user.go",
                    content: `package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/yourusername/my-go-api/models"
)

type UserHandler struct {
	DB *gorm.DB
}

func (h *UserHandler) GetUsers(c *gin.Context) {
	var users []models.User
	h.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}

func (h *UserHandler) GetUser(c *gin.Context) {
	var user models.User
	if err := h.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) CreateUser(c *gin.Context) {
	var input models.CreateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	user := models.User{Name: input.Name, Email: input.Email}
	h.DB.Create(&user)
	c.JSON(http.StatusCreated, user)
}

func (h *UserHandler) UpdateUser(c *gin.Context) {
	var user models.User
	if err := h.DB.First(&user, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	var input models.UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	h.DB.Model(&user).Updates(input)
	c.JSON(http.StatusOK, user)
}

func (h *UserHandler) DeleteUser(c *gin.Context) {
	if err := h.DB.Delete(&models.User{}, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	c.Status(http.StatusNoContent)
}`,
                },
            },
            {
                title: "Create the Main Entry Point",
                description: "Create `main.go`. Connect to PostgreSQL, run `AutoMigrate` to create tables, register routes, and start the server.",
                code: {
                    language: "go",
                    fileName: "main.go",
                    content: `package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/yourusername/my-go-api/handlers"
	"github.com/yourusername/my-go-api/models"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading from environment")
	}

	db, err := gorm.Open(postgres.Open(os.Getenv("DATABASE_URL")), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// AutoMigrate creates/updates tables to match your models
	db.AutoMigrate(&models.User{})

	r := gin.Default()

	userHandler := &handlers.UserHandler{DB: db}

	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	users := r.Group("/users")
	{
		users.GET("",      userHandler.GetUsers)
		users.GET("/:id",  userHandler.GetUser)
		users.POST("",     userHandler.CreateUser)
		users.PATCH("/:id", userHandler.UpdateUser)
		users.DELETE("/:id", userHandler.DeleteUser)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}`,
                },
            },
            {
                title: "Run the API",
                description: "Use Air for development (auto-reloads on save) or run directly with `go run`.",
                command: {
                    default: "air",
                },
                note: "The API is available at http://localhost:8080. Test it: `curl -X POST http://localhost:8080/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\",\"email\":\"alice@example.com\"}'`",
            },
        ],
    },
    "nextjs-supabase": {
        id: "nextjs-supabase",
        title: "Next.js + Supabase",
        description: "Build a full-stack Next.js app with Supabase Auth (email + social login), a PostgreSQL database, and proper SSR support using the @supabase/ssr package.",
        icon: Database,
        tags: ["Next.js", "Supabase", "Auth", "PostgreSQL", "TypeScript"],
        prerequisites: ["Node.js 18+", "Supabase account (supabase.com — free tier available)"],
        references: [
            { label: "Supabase Next.js Quickstart", url: "https://supabase.com/docs/guides/getting-started/quickstarts/nextjs" },
            { label: "Supabase SSR Auth Guide", url: "https://supabase.com/docs/guides/auth/server-side/nextjs" },
            { label: "@supabase/ssr Docs", url: "https://supabase.com/docs/guides/auth/server-side/creating-a-client" },
        ],
        steps: [
            {
                title: "Create Next.js Project",
                description: "Scaffold a new Next.js app with TypeScript and the App Router.",
                command: {
                    npm: "npx create-next-app@latest my-app --typescript --tailwind --app --src-dir",
                    pnpm: "pnpm create next-app my-app --typescript --tailwind --app --src-dir",
                    yarn: "yarn create next-app my-app --typescript --tailwind --app --src-dir",
                    bun: "bun create next-app my-app --typescript --tailwind --app --src-dir",
                },
            },
            {
                title: "Install Supabase Packages",
                description: "Install `@supabase/supabase-js` (core client) and `@supabase/ssr` (the SSR helper that handles cookies for Server Components and Route Handlers).",
                command: {
                    npm: "npm install @supabase/supabase-js @supabase/ssr",
                    pnpm: "pnpm add @supabase/supabase-js @supabase/ssr",
                    yarn: "yarn add @supabase/supabase-js @supabase/ssr",
                    bun: "bun add @supabase/supabase-js @supabase/ssr",
                },
            },
            {
                title: "Create a Supabase Project and Get Keys",
                description: "Go to [supabase.com](https://supabase.com), create a project, then open **Project Settings → API**. Copy the Project URL and the `anon` public key.",
                code: {
                    language: "bash",
                    fileName: ".env.local",
                    content: `NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`,
                },
            },
            {
                title: "Create the Browser Client Utility",
                description: "This client is used in **Client Components**. `createBrowserClient` reads cookies automatically to hydrate the auth session in the browser.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/supabase/client.ts",
                    content: `import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}`,
                },
            },
            {
                title: "Create the Server Client Utility",
                description: "This client is used in **Server Components, Route Handlers, and Server Actions**. It uses Next.js `cookies()` to read and write session cookies server-side.",
                code: {
                    language: "typescript",
                    fileName: "src/lib/supabase/server.ts",
                    content: `import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()            { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll is called from a Server Component — cookies can't be
            // mutated there. The middleware handles session refresh instead.
          }
        },
      },
    }
  )
}`,
                },
            },
            {
                title: "Add the Auth Middleware",
                description: "Create `src/middleware.ts`. The middleware refreshes the Supabase session on every request so Server Components always see up-to-date auth state.",
                code: {
                    language: "typescript",
                    fileName: "src/middleware.ts",
                    content: `import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll()             { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — IMPORTANT: do not add logic between createServerClient
  // and getUser() or session refresh may fail
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect unauthenticated users away from protected routes
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}`,
                },
            },
            {
                title: "Create Auth Server Actions",
                description: "Server Actions are the recommended way to trigger auth flows in the App Router — no API route needed.",
                code: {
                    language: "typescript",
                    fileName: "src/app/auth/actions.ts",
                    content: `'use server'

import { revalidatePath } from 'next/cache'
import { redirect }       from 'next/navigation'
import { createClient }   from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email:    formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/login?error=' + encodeURIComponent(error.message))

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email:    formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) redirect('/signup?error=' + encodeURIComponent(error.message))

  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}`,
                },
            },
            {
                title: "Create the Login Page",
                description: "A simple login form that calls the `login` Server Action on submit.",
                code: {
                    language: "tsx",
                    fileName: "src/app/login/page.tsx",
                    content: `import { login, signup } from '@/app/auth/actions'

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <form className="flex flex-col gap-3 w-full max-w-sm p-8 border rounded-xl">
        <h1 className="text-xl font-bold mb-2">Sign in</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border rounded px-3 py-2 text-sm"
        />

        <button formAction={login}
          className="rounded bg-black text-white py-2 text-sm font-medium mt-2">
          Sign in
        </button>
        <button formAction={signup}
          className="rounded border py-2 text-sm">
          Create account
        </button>
      </form>
    </main>
  )
}`,
                },
            },
            {
                title: "Build a Protected Dashboard",
                description: "Use the server client in a Server Component to get the current user. The middleware redirects unauthenticated requests before this runs.",
                code: {
                    language: "tsx",
                    fileName: "src/app/dashboard/page.tsx",
                    content: `import { createClient } from '@/lib/supabase/server'
import { signout }      from '@/app/auth/actions'
import { redirect }     from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
        </div>
        <form action={signout}>
          <button type="submit"
            className="text-sm border rounded px-4 py-2 hover:bg-muted">
            Sign out
          </button>
        </form>
      </div>
      <p className="text-muted-foreground">
        You are signed in as <strong>{user.email}</strong>
      </p>
    </main>
  )
}`,
                },
            },
            {
                title: "Query the Database",
                description: "Supabase's auto-generated client lets you query your PostgreSQL tables directly — no raw SQL needed for common operations.",
                code: {
                    language: "typescript",
                    fileName: "src/app/dashboard/page.tsx (with DB query)",
                    content: `import { createClient } from '@/lib/supabase/server'
import { redirect }     from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Query a "posts" table — filter by the current user's ID
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Posts</h1>
      {posts?.map(post => (
        <div key={post.id} className="border rounded p-4 mb-3">
          <p className="font-medium">{post.title}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </main>
  )
}`,
                },
                note: "Create the 'posts' table in the Supabase Table Editor first. Enable Row Level Security (RLS) and add a policy: `auth.uid() = user_id`.",
            },
            {
                title: "Start the Development Server",
                command: {
                    npm: "npm run dev",
                    pnpm: "pnpm dev",
                    yarn: "yarn dev",
                    bun: "bun dev",
                },
                note: "Visit http://localhost:3000/login to create an account and test the auth flow.",
            },
        ],
    },
    "github-actions-cicd": {
        id: "github-actions-cicd",
        title: "GitHub Actions CI/CD Pipeline",
        description: "Set up a complete CI/CD pipeline that automatically lints, type-checks, tests, and builds your Next.js or Node.js app on every push and pull request — with optional deployment to Vercel.",
        icon: GitBranch,
        tags: ["GitHub Actions", "CI/CD", "DevOps", "Automation", "Next.js"],
        prerequisites: ["GitHub repository", "Node.js 18+ project with a package.json", "Tests configured (optional but recommended)"],
        references: [
            { label: "GitHub Actions Docs", url: "https://docs.github.com/en/actions" },
            { label: "actions/checkout", url: "https://github.com/actions/checkout" },
            { label: "actions/setup-node", url: "https://github.com/actions/setup-node" },
            { label: "Vercel Action", url: "https://github.com/amondnet/vercel-action" },
        ],
        steps: [
            {
                title: "Create the Workflows Directory",
                description: "GitHub Actions reads workflow files from `.github/workflows/`. Create this directory in your project root.",
                command: {
                    default: "mkdir -p .github/workflows",
                },
            },
            {
                title: "Create the CI Workflow",
                description: "This workflow runs on every push and pull request to `main`. It uses a **matrix strategy** to test against multiple Node.js versions. Jobs run in parallel by default — `build` waits for `test` to pass first.",
                code: {
                    language: "yaml",
                    fileName: ".github/workflows/ci.yml",
                    content: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ── Job 1: Lint + Type-Check ─────────────────────────────────────
  lint:
    name: Lint & Type-Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm          # cache node_modules between runs

      - name: Install dependencies
        run: npm ci           # ci is faster + reproducible vs npm install

      - name: Run ESLint
        run: npm run lint

      - name: Type-check
        run: npx tsc --noEmit

  # ── Job 2: Test ──────────────────────────────────────────────────
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: lint               # only run tests if lint passed
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --ci --coverage
        env:
          CI: true

      - name: Upload coverage
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: coverage-report
          path: coverage/

  # ── Job 3: Build ─────────────────────────────────────────────────
  build:
    name: Build
    runs-on: ubuntu-latest
    needs: test               # only build if tests passed
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: .next/          # change to dist/ for non-Next projects
          retention-days: 1`,
                },
            },
            {
                title: "Add a Separate Deploy Workflow",
                description: "Create a separate workflow that only runs on merges to `main`. It downloads the build artifact from CI and deploys to Vercel. Using separate files keeps concerns cleanly separated.",
                code: {
                    language: "yaml",
                    fileName: ".github/workflows/deploy.yml",
                    content: `name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    environment:
      name: production
      url: \${{ steps.deploy.outputs.preview-url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Deploy to Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token:   \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id:  \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`,
                },
                note: "Add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as repository secrets in GitHub → Settings → Secrets and variables → Actions.",
            },
            {
                title: "Add Required npm Scripts",
                description: "Make sure `package.json` has the scripts that the workflows call. `lint` and `test` must exit with a non-zero code on failure for the workflow to fail correctly.",
                code: {
                    language: "json",
                    fileName: "package.json (scripts)",
                    content: `"scripts": {
  "dev":   "next dev",
  "build": "next build",
  "start": "next start",
  "lint":  "next lint",
  "test":  "jest"
}`,
                },
            },
            {
                title: "Cache Dependencies for Faster Runs",
                description: "The `cache: npm` option in `actions/setup-node` caches `~/.npm` automatically. For even faster cache hits, add a `cache-dependency-path` to scope the cache to your exact lockfile.",
                code: {
                    language: "yaml",
                    fileName: ".github/workflows/ci.yml (cache snippet)",
                    content: `- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
    cache-dependency-path: package-lock.json  # invalidates cache if lockfile changes`,
                },
                note: "With caching, subsequent workflow runs typically complete in under 60 seconds instead of 3–4 minutes.",
            },
            {
                title: "Add a Status Badge to README",
                description: "Paste this markdown into your `README.md` to show the CI status at a glance. Replace `owner` and `repo` with your GitHub username and repository name.",
                code: {
                    language: "markdown",
                    fileName: "README.md",
                    content: `![CI](https://github.com/owner/repo/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/owner/repo/actions/workflows/deploy.yml/badge.svg)`,
                },
            },
            {
                title: "Commit and Push to Trigger the Pipeline",
                description: "Once you push these files, GitHub automatically detects the workflows and starts the CI run.",
                command: {
                    default: "git add .github && git commit -m 'ci: add GitHub Actions CI/CD pipeline' && git push",
                },
                note: "Go to the Actions tab on your GitHub repository to watch the jobs run in real time. Failed steps show the exact command output.",
            },
        ],
    },
};
