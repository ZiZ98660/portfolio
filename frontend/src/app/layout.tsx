import type { Metadata } from "next";
import { Space_Grotesk, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import CacheBuster from '@/components/CacheBuster';

config.autoAddCss = false;

// Web3-style fonts - Space Grotesk for headings (popular in Web3/blockchain)
// Preload this one as it's used immediately in the hero section
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Inter for body text - clean and modern
// Don't preload as it's loaded on demand
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

// Outfit for accents and special text
// Don't preload as it's used for buttons and accents
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Sadiq Abdulazeez Adesina - Frontend Developer · Health-tech & SaaS",
  description: "Frontend Developer with 2+ years building fast, scalable, user-focused web applications using React, Next.js, TypeScript. Licensed Pharmacist. Digital health, patient-centric interfaces, clinical usability.",
  other: {
    'cache-control': 'no-cache, no-store, must-revalidate',
    'pragma': 'no-cache',
    'expires': '0',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <html lang="en">
        <body
          className={`${spaceGrotesk.variable} ${inter.variable} ${outfit.variable} antialiased`}
          suppressHydrationWarning
        >
          <CacheBuster />
          {children}
        </body>
      </html>
    );
}
