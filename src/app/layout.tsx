import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter as FontSans } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

import { cn } from "../lib/utils";

import { EdgeStoreProvider } from "../lib/edgestore";
import { QueryProvider } from "@/components/QueryProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Echo: A Social Media App",
  description: "A social media app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </EdgeStoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
