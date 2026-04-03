import { randomUUID } from "crypto"

/** Escape TEXT values in iCalendar (RFC 5545). */
function icsEscape(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n")
}

/** `HH:mm` from <input type="time"> → `HH:mm:ss` for Date parsing. */
function normalizeTime(t: string): string {
  if (!t?.trim()) return "00:00:00"
  const parts = t.trim().split(":")
  if (parts.length === 2) return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}:00`
  return t.trim()
}

/** UTC instant → `YYYYMMDDTHHmmssZ`. */
function formatIcsUtc(d: Date): string {
  return d
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z")
}

export type BookingIcsInput = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  occasion: string
  notes?: string
}

/**
 * Minimal valid VCALENDAR for Google Calendar / Apple Calendar import.
 * CRLF line endings, no leading whitespace, UID + DTSTAMP + PRODID + METHOD.
 */
export function buildBookingIcs(input: BookingIcsInput): string {
  const start = new Date(`${input.date}T${normalizeTime(input.time)}`)
  const end = new Date(start.getTime() + 60 * 60 * 1000)

  const descParts = [
    `Occasion: ${input.occasion}`,
    `Booked by: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
  ]
  if (input.notes?.trim()) descParts.push(`Notes: ${input.notes.trim()}`)

  const uid = `${randomUUID()}@azaleasfrequency.com`
  const dtstamp = formatIcsUtc(new Date())

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Azaleas Frequency//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${formatIcsUtc(start)}`,
    `DTEND:${formatIcsUtc(end)}`,
    `SUMMARY:${icsEscape(`Booking - ${input.occasion}`)}`,
    `DESCRIPTION:${icsEscape(descParts.join("\n"))}`,
    `LOCATION:${icsEscape("Chesapeake, VA")}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]

  return lines.join("\r\n")
}
