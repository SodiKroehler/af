"use client"

import Image from "next/image"
import Link from "next/link"
import { Cormorant_Garamond } from "next/font/google"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const STRING_COUNT = 52
const IDLE_FREQ = 1.1
const IDLE_AMP_PX = 0.65
const POINTER_AMP_PX = 6
const POINTER_FALLOFF = 0.011
const SMOOTH = 0.14

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/demo", label: "Listen" },
  { href: "/gallery", label: "Gallery" },
  { href: "/book", label: "Book" },
] as const

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

/**
 * Experimental luxury landing — resonance field, editorial type, existing logo.
 * Self-contained for easy iteration or removal.
 */
export function HomeScreen() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false })
  const offsetsRef = useRef<number[]>(
    Array.from({ length: STRING_COUNT }, () => 0),
  )
  const targetsRef = useRef<number[]>(
    Array.from({ length: STRING_COUNT }, () => 0),
  )
  const phaseRef = useRef(0)
  const rafRef = useRef<number>(0)
  const reducedMotion = usePrefersReducedMotion()
  const [, setFrame] = useState(0)

  const stringXs = useMemo(
    () =>
      Array.from({ length: STRING_COUNT }, (_, i) => {
        const t = (i + 0.5) / STRING_COUNT
        const bow = Math.sin(t * Math.PI) * 0.012
        return t * 100 + bow * 100
      }),
    [],
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    pointerRef.current = {
      x: (e.clientX - r.left) / Math.max(r.width, 1),
      y: (e.clientY - r.top) / Math.max(r.height, 1),
      active: true,
    }
  }, [])

  const onPointerLeave = useCallback(() => {
    pointerRef.current.active = false
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const start = performance.now()
    const loop = (t: number) => {
      const elapsed = (t - start) * 0.001
      phaseRef.current = elapsed

      const { x: px, y: py, active } = pointerRef.current
      const targets = targetsRef.current
      const offsets = offsetsRef.current
      for (let i = 0; i < STRING_COUNT; i++) {
        const sx = stringXs[i]! / 100
        const horiz = sx - px
        const vert = 0.5 - py
        const dist = Math.sqrt(horiz * horiz + vert * vert * 0.38)
        const proximity = active ? Math.exp(-dist * dist / POINTER_FALLOFF) : 0
        const idle =
          Math.sin(elapsed * IDLE_FREQ * 2 + i * 0.31) * IDLE_AMP_PX
        const breath =
          Math.sin(elapsed * 0.85 + i * 0.11) * 0.22 * IDLE_AMP_PX
        const cursorPush =
          proximity *
          POINTER_AMP_PX *
          Math.sin(elapsed * 1.55 + i * 0.19 + py * 2.2)
        targets[i] = idle + breath + cursorPush
      }

      for (let i = 0; i < STRING_COUNT; i++) {
        offsets[i] += (targets[i]! - offsets[i]!) * SMOOTH
      }

      setFrame((n) => (n + 1) % 10_000)
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion, stringXs])

  return (
    <div
      ref={wrapRef}
      onPointerMove={reducedMotion ? undefined : onPointerMove}
      onPointerLeave={reducedMotion ? undefined : onPointerLeave}
      className="relative isolate flex min-h-[calc(100dvh-100px)] w-full flex-col overflow-hidden bg-[oklch(16%_0.035_165)] text-[oklch(96%_0.008_85)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,oklch(22%_0.04_168)_0%,oklch(14%_0.03_170)_55%,oklch(11%_0.02_175)_100%)]"
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="home-string-stroke" x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="0%"
              stopColor="oklch(78% 0.06 82)"
              stopOpacity="0.14"
            />
            <stop
              offset="52%"
              stopColor="oklch(88% 0.04 85)"
              stopOpacity="0.38"
            />
            <stop
              offset="100%"
              stopColor="oklch(72% 0.05 165)"
              stopOpacity="0.08"
            />
          </linearGradient>
        </defs>
        {stringXs.map((xPct, i) => {
          const widthPx = Math.max(wrapRef.current?.clientWidth ?? 1200, 1)
          const wobblePx = reducedMotion ? 0 : offsetsRef.current[i] ?? 0
          const du = (wobblePx / widthPx) * 100
          return (
            <g key={i} transform={`translate(${du} 0)`}>
              <line
                x1={xPct}
                x2={xPct}
                y1={0}
                y2={100}
                stroke="url(#home-string-stroke)"
                strokeWidth={0.045 + (i % 5) * 0.008}
                opacity={0.12 + (i % 7) * 0.018}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[22%] h-px w-[min(18vw,120px)] bg-[oklch(72%_0.14_355)] opacity-[0.22]"
      />

      <div className="relative z-10 flex flex-1 flex-col px-6 pb-10 pt-14 md:px-14 md:pb-14 md:pt-20">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between gap-16 md:gap-20">
          <header className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-xl space-y-6">
              <p
                className="text-[10px] font-normal uppercase tracking-[0.38em] text-[oklch(78%_0.06_82)]/55 md:text-[11px]"
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                }}
              >
                Harp · Hampton Roads
              </p>
              <h1
                className={`${display.className} text-[clamp(2.35rem,6.5vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[oklch(97%_0.01_85)]`}
              >
                Azalea&apos;s
                <br />
                <span className="text-[oklch(80%_0.07_82)]">Frequency</span>
                <span className="text-[oklch(68%_0.16_355)]">.</span>
              </h1>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-[oklch(92%_0.02_85)]/72 md:text-[15px] md:leading-[1.75]">
                A tuned room answering presence — ceremony, gala, and the space
                between notes.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-5 md:items-end">
              <Link
                href="/"
                className="group relative block opacity-[0.92] transition-opacity duration-500 hover:opacity-100"
                aria-label="Azalea's Frequency home"
              >
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute -inset-6 rounded-full bg-[oklch(78%_0.06_82)]/5 blur-2xl transition-opacity duration-700 group-hover:bg-[oklch(78%_0.06_82)]/10"
                  />
                  <Image
                    src="/logo.png"
                    alt=""
                    width={200}
                    height={200}
                    className="relative h-[4.5rem] w-auto object-contain object-left opacity-[0.9] brightness-[1.05] contrast-[0.95] md:h-[5.25rem]"
                    priority
                  />
                </div>
              </Link>
            </div>
          </header>

          <nav
            aria-label="Primary"
            className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[oklch(78%_0.06_82)]/10 pt-8 md:gap-x-10 md:pt-10"
          >
            {NAV.map(({ href, label }) => (
              <Link
                key={href + label}
                href={href}
                className="text-[10px] uppercase tracking-[0.32em] text-[oklch(92%_0.02_85)]/45 transition-colors duration-500 hover:text-[oklch(80%_0.07_82)] md:text-[11px]"
                style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
