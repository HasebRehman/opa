import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Opa Bar + Mezze | Brisbane's Best Greek Restaurant",
  description:
    "Join us for Brisbane's best Greek cuisine. Overlooking the Brisbane River and Story Bridge, Opa Bar + Mezze offers stunning fare in a beautiful riverside setting. Situated just off Eagle Street with parking specials available.",
  keywords: [
    "Opa Bar Brisbane",
    "Greek Restaurant Brisbane",
    "Riverside Dining Brisbane",
    "Eagle Street Restaurant",
    "Mezze Bar Brisbane",
  ],
  openGraph: {
    title: "Opa Bar + Mezze | Brisbane's Best Greek Restaurant",
    description:
      "Authentic Greek cuisine overlooking the Brisbane River and Story Bridge.",
    url: "https://www.opabar.com.au",
    siteName: "Opa Bar + Mezze",
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
