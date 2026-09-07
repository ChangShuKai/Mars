import type { Metadata } from "next";
import { Space_Mono, Rajdhani } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mars Explorer — NASA Live Data",
  description:
    "Explore Mars with real NASA data: 360° surface panoramas, InSight weather station final readings, live rover photo feeds from Perseverance and Curiosity, and more.",
  keywords: ["Mars", "NASA", "InSight", "Perseverance", "Curiosity", "Space", "Planet"],
  authors: [{ name: "Mars Explorer" }],
  openGraph: {
    title: "Mars Explorer — NASA Live Data",
    description: "Explore the Red Planet with real NASA mission data",
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mars Explorer",
    description: "Explore Mars with real NASA data",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="dark">
      <body className={`${spaceMono.variable} ${rajdhani.variable} font-display bg-space-950 text-[var(--text-primary)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
