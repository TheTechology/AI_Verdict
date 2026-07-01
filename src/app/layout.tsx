import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const serif = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "VERITAS AI — Analiză contextuală anti-dezinformare";
const description =
  "Nu îți spunem ce să crezi. Îți arătăm ce să observi. Un proiect al Asociației Grupul Verde, Adjud.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "VERITAS AI",
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
