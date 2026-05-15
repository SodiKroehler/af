import { Aboreto, Inter } from "next/font/google";

export const aboreto = Aboreto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-aboreto",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
