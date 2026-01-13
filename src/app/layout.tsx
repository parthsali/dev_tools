import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "@/components/layout/header";
import { ReactLenis } from "lenis/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dev_tools - Developer Utilities",
  description:
    "A collection of essential developer tools. Regex tester, JSON formatter, Base64 encoder, and more.",
  keywords: [
    "developer tools",
    "regex tester",
    "json formatter",
    "base64",
    "url encoder",
    "jwt decoder",
  ],
};

// Configuration: Set this to "sans" or "mono" to change the global font family
// Expected values: "sans" | "mono"
const APP_FONT: "sans" | "mono" = "mono";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${APP_FONT === "mono" ? "font-mono" : "font-sans"} antialiased`}
      >
        <ReactLenis root>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
