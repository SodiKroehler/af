
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "azaleas frequency",
  description: "the official website of azaleas frequency",
};
import Image from "next/image"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
      {/* Top nav */}
      <header className="z-50 w-full h-[100px] border-b border-gold px-8 py-4 flex items-center justify-between">
        <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
        <nav className="space-x-8 text-sm text-forest tracking-wider uppercase">
          <a href="/" className="hover:text-gold">Home</a>
          <a href="/about" className="hover:text-gold">About</a>
          <a href="/gallery" className="hover:text-gold">Gallery</a>
          <a href="/book" className="hover:text-gold">Book</a>
        </nav>
      </header>
      <section className="flex-1 w-full bg-forest text-cream relative">
        {children}
      </section>
      </body>
    </html>
  );
}
