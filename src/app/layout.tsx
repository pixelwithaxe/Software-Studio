import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Software Studio",
  description: "Build websites and Android apps with AI. Bring your own API key.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-edge py-6 text-center text-xs text-mute">
          Software Studio is open source. API keys stay in your browser session and are never stored.
        </footer>
      </body>
    </html>
  );
}
