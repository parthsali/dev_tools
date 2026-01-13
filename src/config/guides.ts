import { FileCode, Server, Database, Shield, Globe, Smartphone, type LucideIcon } from "lucide-react";

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
        description: "Modern React framework with beautiful UI components",
        icon: FileCode,
        category: "frontend",
        tags: ["Next.js", "React", "shadcn", "Tailwind"],
    },
    {
        id: "express-typescript-mongo",
        title: "Express.js + TypeScript + MongoDB",
        description: "Backend API with TypeScript and MongoDB",
        icon: Server,
        category: "backend",
        tags: ["Express", "TypeScript", "MongoDB", "Node.js"],
    },
    // {
    //     id: "nextjs-better-auth-prisma",
    //     title: "Next.js + Better Auth + Prisma",
    //     description: "Full-stack auth with Prisma and PostgreSQL",
    //     icon: Shield,
    //     category: "fullstack",
    //     tags: ["Next.js", "Better Auth", "Prisma", "PostgreSQL"],
    // },
    // {
    //     id: "nextjs-drizzle-turso",
    //     title: "Next.js + Drizzle + Turso",
    //     description: "Edge-ready database with Drizzle ORM",
    //     icon: Database,
    //     category: "fullstack",
    //     tags: ["Next.js", "Drizzle", "Turso", "SQLite"],
    // },
    // {
    //     id: "react-native-expo",
    //     title: "React Native + Expo",
    //     description: "Cross-platform mobile app development",
    //     icon: Smartphone,
    //     category: "mobile",
    //     tags: ["React Native", "Expo", "Mobile"],
    // },
    // {
    //     id: "nextjs-internationalization",
    //     title: "Next.js i18n Setup",
    //     description: "Add multi-language support to Next.js",
    //     icon: Globe,
    //     category: "frontend",
    //     tags: ["Next.js", "i18n", "Localization"],
    // },
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
};
