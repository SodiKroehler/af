/**
 * Booking flow diagnostics (browser + server). Set to `false` to silence every `[booking]` log.
 * Filter DevTools / Vercel logs by `[booking]`.
 */
export const BOOKING_LOGS_ENABLED = true

function ts() {
  return new Date().toISOString()
}

export function bookingVerbose(...args: unknown[]) {
  if (!BOOKING_LOGS_ENABLED) return
  console.log("[booking]", ts(), ...args)
}

export function bookingVerboseWarn(...args: unknown[]) {
  if (!BOOKING_LOGS_ENABLED) return
  console.warn("[booking]", ts(), ...args)
}

export function bookingFail(...args: unknown[]) {
  if (!BOOKING_LOGS_ENABLED) return
  console.error("[booking]", ts(), ...args)
}
