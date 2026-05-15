"use client"

import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useCallback, useRef } from "react"

type StringProps = {
  letter: string
  /** Optional per-letter art; if omitted, a large type glyph reveals instead */
  imageSrc?: string
}

/**
 * Single vertical “string”: hover runs rising-frequency vibration, then hides the
 * string and fades in the letter layer (image or type) underneath.
 */
export function String({ letter, imageSrc }: StringProps) {
  const lineControls = useAnimation()
  const revealControls = useAnimation()
  const busy = useRef(false)

  const isSpace = letter === " " || letter === "\u00a0"

  const snapReset = useCallback(() => {
    busy.current = false
    lineControls.stop()
    revealControls.stop()
    void lineControls.set({ x: 0, opacity: 1 })
    void revealControls.set({ opacity: 0 })
  }, [lineControls, revealControls])

  const runSequence = useCallback(async () => {
    if (isSpace || busy.current) return
    busy.current = true

    const steps = 110
    const xs: number[] = [0]
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const amp = 0.6 + t * 9
      const wobbles = 0.2 + t * t * 16
      xs.push(Math.sin(i * wobbles) * amp)
    }
    xs.push(0)

    try {
      await lineControls.start({
        x: xs,
        transition: { duration: 1.35, ease: "linear" },
      })
      await lineControls.start({
        opacity: 0,
        x: 0,
        transition: { duration: 0.2, ease: "circOut" },
      })
      await revealControls.start({
        opacity: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      })
    } catch {
      snapReset()
    }
  }, [isSpace, lineControls, revealControls, snapReset])

  const onPointerLeave = useCallback(() => {
    snapReset()
  }, [snapReset])

  if (isSpace) {
    return (
      <div
        className="flex min-w-[0.25rem] flex-1 sm:min-w-[0.4rem]"
        aria-hidden
      />
    )
  }

  return (
    <div
      className="relative flex h-full min-w-0 flex-1 cursor-default flex-col items-center justify-end touch-manipulation"
      onPointerEnter={runSequence}
      onPointerLeave={onPointerLeave}
    >
      {/* Underlay: invisible until sequence reveals it */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[8%] z-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={revealControls}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={letter}
            width={72}
            height={96}
            className="max-h-[min(16vh,120px)] w-auto object-contain"
          />
        ) : (
          <span
            className="select-none font-serif text-[clamp(1.25rem,3.5vh,2.25rem)] font-medium tracking-tight text-cream"
            aria-hidden
          >
            {letter}
          </span>
        )}
      </motion.div>

      {/* Foreground string */}
      <motion.div
        className="relative z-10 h-[88%] w-px max-w-full shrink-0 rounded-full bg-gold/90 shadow-[0_0_12px_rgba(198,161,91,0.15)]"
        initial={{ x: 0, opacity: 1 }}
        animate={lineControls}
      />
    </div>
  )
}
