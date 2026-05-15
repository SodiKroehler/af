"use client"

import Image from "next/image"
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

/** Horizontal inset on the string row — keeps letter columns from spanning full width */
const LETTER_BUFFER = "8rem"

/** Max top inset (% of strings_host width); left columns approach this, right → 0. */
const SWOOP_MAX_OFFSET = 10
/** Log curve severity — higher = shorter left strings, taller right (try ~8–20). */
const SWOOP_LOG_STRENGTH = 60

/** Left short → right tall; log-shaped ramp between them. */
function verticalOffsetForIndex(index: number, total: number): number {
  if (total <= 1) return 0
  const t = 1 - index / (total - 1)
  const logT =
    Math.log1p(t * (SWOOP_LOG_STRENGTH - 1)) / Math.log(SWOOP_LOG_STRENGTH)
  return logT * SWOOP_MAX_OFFSET
}

export function HomeScreen() {
  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col text-cream">
      <div
        id="logo_div"
        className="flex h-[30%] min-h-0 w-full items-center justify-center bg-forest-light px-6"
      >
        <span className="logo-blend-host logo-blend-host--light h-[92%] max-h-full">
          <Image
            src="/logo.jpeg"
            alt="Azalea's Frequency"
            width={746}
            height={658}
            priority
            className="h-full w-auto max-w-[min(72vw,280px)] object-contain md:max-w-[320px]"
          />
        </span>
      </div>

      <div
        id="strings_host"
        className="flex h-[80%] min-h-0 w-full items-stretch justify-center overflow-hidden bg-forest-light px-1 sm:px-3 [&>*]:min-w-[14px]"
      >
        <div
          className="shrink-0 flex-none"
          style={{ width: LETTER_BUFFER }}
          aria-hidden
        />
        {letters.map((letter, i) => (
          <String
            key={`${letter}-${i}`}
            letter={letter}
            vertical_offset={verticalOffsetForIndex(i, letters.length)}
          />
        ))}
        <div
          className="shrink-0 flex-none"
          style={{ width: LETTER_BUFFER }}
          aria-hidden
        />
      </div>
    </div>
  )
}
