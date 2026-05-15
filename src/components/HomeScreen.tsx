"use client"

import Image from "next/image"
import Link from "next/link"
import { String } from "@components/String"

const letters = [
  "A",
  "Z",
  "A",
  "L",
  "E",
  "A",
  "'",
  "S",
  " ",
  "F",
  "R",
  "E",
  "Q",
  "U",
  "E",
  "N",
  "C",
  "Y",
]

export function HomeScreen() {
  return (
    <div className="flex min-h-[calc(100dvh-100px)] w-full flex-col bg-forest text-cream">
      {/* Upper ~75%: centered logo */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10">
        <Link
          href="/"
          className="relative block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold/40"
          aria-label="Azalea's Frequency home"
        >
          <Image
            src="/logo.png"
            alt="Azalea's Frequency"
            width={320}
            height={320}
            priority
            className="h-auto w-[min(72vw,280px)] max-w-full object-contain md:w-[min(56vw,320px)]"
          />
        </Link>
      </div>

      {/* Bottom 25%: full-width string row */}
      <div
        id="strings_host"
        className="flex h-[25%] min-h-[140px] w-full shrink-0 items-stretch justify-center border-t border-forest-light/25 px-1 sm:px-3"
      >
        {letters.map((letter, i) => (
          <String key={`${letter}-${i}`} letter={letter} />
        ))}
      </div>
    </div>
  )
}
