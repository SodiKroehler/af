/** Public URLs / contacts for post-booking CTAs — override via env on Vercel. */

export const BOOKING_EMAIL = "squirrel252@icloud.com"

export function schedulingUrl(): string {
  return process.env.NEXT_PUBLIC_SCHEDULING_URL?.trim() || ""
}

/** E.164 or local format; e.g. +17575551234 — used as href for "call" CTA when set. */
export function bookingPhoneHref(): string | null {
  const raw = process.env.NEXT_PUBLIC_BOOKING_PHONE?.trim()
  if (!raw) return null
  const cleaned = raw.replace(/\s/g, "")
  return cleaned.startsWith("tel:") ? cleaned : `tel:${cleaned}`
}

export function mailtoFinalizeHref(): string {
  const subject = encodeURIComponent("Call to finalize my Azalea's Frequency booking")
  return `mailto:${BOOKING_EMAIL}?subject=${subject}`
}

export function mailtoFullSessionHref(): string {
  const subject = encodeURIComponent("Schedule my full Azalea's Frequency session")
  return `mailto:${BOOKING_EMAIL}?subject=${subject}`
}

/** Optional — set on Vercel e.g. NEXT_PUBLIC_PAYPAL_URL */
export function paypalPaymentUrl(): string | null {
  const u = process.env.NEXT_PUBLIC_PAYPAL_URL?.trim()
  return u || null
}
