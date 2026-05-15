"use client"

import { motion, useAnimation } from "framer-motion"
import { useCallback, useRef, useState, type ReactNode } from "react"

const LINE_OPACITY = 0.4
const LETTER_OPACITY_REST = 0.1
const LETTER_OPACITY_REVEAL = 1

type StringProps = {
  letter: string
  /** Top inset as % of strings_host width (0 = full height, ~25 = shortest). Bottom-aligned. */
  vertical_offset: number
}

function StringColumn({
  vertical_offset,
  children,
  className = "",
  onPointerEnter,
}: {
  vertical_offset: number
  children: ReactNode
  className?: string
  onPointerEnter?: () => void
}) {
  return (
    <div
      className={`box-border flex h-full min-h-0 flex-col items-center justify-end ${className}`}
      style={
        vertical_offset > 0
          ? { paddingTop: `${vertical_offset}%` }
          : undefined
      }
      onPointerEnter={onPointerEnter}
    >
      {children}
    </div>
  )
}

/**
 * Single vertical “string”: hover runs rising-frequency vibration, then hides the
 * string and fades in the letter underneath.
 */
export function String({ letter, vertical_offset }: StringProps) {
  const lineControls = useAnimation()
  const revealControls = useAnimation()
  const busy = useRef(false)
  const [letterIsVisible, setLetterIsVisible] = useState(false)

  const isSpace = letter === " " || letter === "\u00a0"

  const snapReset = useCallback(() => {
    busy.current = false
    setLetterIsVisible(false)
    lineControls.stop()
    revealControls.stop()
    void lineControls.set({ x: 0, opacity: LINE_OPACITY })
    void revealControls.set({ opacity: LETTER_OPACITY_REST })
  }, [lineControls, revealControls])

  const runSequence = useCallback(async () => {
    if (isSpace || busy.current || letterIsVisible) return
    busy.current = true

    const steps = 110
    const xs: number[] = [0]
    for (let i = 1; i <= steps; i++) {
      const t = i / steps
      const amp = 0.4 + t * 19
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
        opacity: LETTER_OPACITY_REVEAL,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      })
      setLetterIsVisible(true)
    } catch {
      snapReset()
    } finally {
      busy.current = false
    }
  }, [isSpace, letterIsVisible, lineControls, revealControls, snapReset])

  if (isSpace) {
    return (
      <StringColumn
        vertical_offset={vertical_offset}
        className="min-w-[0.25rem] flex-1 sm:min-w-[0.4rem]"
      >
        <div className="min-h-0 flex-1" aria-hidden />
      </StringColumn>
    )
  }

  return (
    <StringColumn
      vertical_offset={vertical_offset}
      className="relative min-w-0 flex-1 cursor-default touch-manipulation"
      onPointerEnter={runSequence}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-center justify-center"
        initial={{ opacity: LETTER_OPACITY_REST }}
        animate={revealControls}
      >
        <span
          className="select-none font-serif text-[5.25rem] font-medium tracking-tight text-cream"
          aria-hidden
        >
          {letter}
        </span>
      </motion.div>

      <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center justify-end">
        <motion.div
          className="h-full w-[5px] shrink-0 rounded-[0px_12px_12px_0px] bg-gold shadow-[0_0_10px_rgba(198,161,91,0.2)]"
          initial={{ x: 0, opacity: LINE_OPACITY }}
          animate={lineControls}
        />
      </div>
    </StringColumn>
  )
}
