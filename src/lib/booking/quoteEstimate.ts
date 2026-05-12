/**
 * Azalea's Frequency — additive pricing calculator (base + selections).
 * "Custom quote" tiers flag manual follow-up instead of adding dollars.
 */

export const BASE_FEE = 350

export type EventType =
  | "wedding_ceremony"
  | "cocktail"
  | "reception"
  | "funeral"
  | "church_service"
  | "gala"
  | "private_dinner"
  | "proposal"
  | "brunch_shower"

export type DurationBeyondBase =
  | "h1"
  | "h2"
  | "h3"

export type SetStructure = "continuous" | "multiple"

export type TravelBand = "0-15" | "16-30" | "31-60" | "61-90" | "90plus"

export type Amplification = "no" | "yes"

export type Aesthetic = "no" | "yes"

export type CustomSongs = "existing" | "new_1_2" | "new_3_5" | "new_5plus"

export type QuoteSelections = {
  eventType: EventType
  duration: DurationBeyondBase
  setStructure: SetStructure
  travel: TravelBand
  amp: Amplification
  aesthetic: Aesthetic
  songs: CustomSongs
}

export const DEFAULT_QUOTE_SELECTIONS: QuoteSelections = {
  eventType: "wedding_ceremony",
  duration: "h1",
  setStructure: "multiple",
  travel: "0-15",
  amp: "no",
  aesthetic: "no",
  songs: "existing",
}

export const EVENT_ADD: Record<EventType, number | "custom"> = {
  wedding_ceremony: 500,
  cocktail: 275,
  reception: 375,
  funeral: 275,
  church_service: "custom",
  gala: 500,
  private_dinner: 300,
  proposal: 250,
  brunch_shower: 300,
}

const DURATION_ADD: Record<DurationBeyondBase, number> = {
  h1: 0,
  h2: 150,
  h3: 300,
}

const SET_ADD: Record<SetStructure, number> = {
  continuous: 150,
  multiple: 100,
}

const TRAVEL_ADD: Record<TravelBand, number | "custom"> = {
  "0-15": 0,
  "16-30": 40,
  "31-60": 75,
  "61-90": 150,
  "90plus": "custom",
}

const AMP_ADD: Record<Amplification, number> = {
  no: 0,
  yes: 100,
}

const AESTHETIC_ADD: Record<Aesthetic, number> = {
  no: 0,
  yes: 50,
}

const SONGS_ADD: Record<CustomSongs, number | "custom"> = {
  existing: 0,
  new_1_2: 100,
  new_3_5: 300,
  new_5plus: "custom",
}

export type QuoteLineItem = {
  label: string
  detail: string
  amount: number | null
  isCustom?: boolean
}

export type QuoteResult = {
  lineItems: QuoteLineItem[]
  /** Sum of items with a fixed dollar amount (excludes custom-priced lines). */
  subtotalNumeric: number
  needsCustomFollowUp: boolean
  customReasons: string[]
}

export const EVENT_LABELS: Record<EventType, string> = {
  wedding_ceremony: "Wedding ceremony",
  cocktail: "Cocktail hour",
  reception: "Reception",
  funeral: "Funeral / memorial",
  church_service: "Church service",
  gala: "Gala or luxury event",
  private_dinner: "Private dinner",
  proposal: "Proposal",
  brunch_shower: "Brunch or shower",
}

/** UI order — matches client-facing calculator. */
export const EVENT_TYPE_ORDER: EventType[] = [
  "wedding_ceremony",
  "cocktail",
  "reception",
  "funeral",
  "church_service",
  "gala",
  "private_dinner",
  "proposal",
  "brunch_shower",
]

export const DURATION_ORDER: DurationBeyondBase[] = [
  "h1",
  "h2",
  "h3",
]

export const DURATION_CHOICE_LABELS: Record<DurationBeyondBase, string> = {
  h1: "Up to 1 hour total (included — $0 add-on)",
  h2: "Up to 2 hours total (+$150)",
  h3: "Up to 3 hours total (+$300)",
}

export const SET_STRUCTURE_ORDER: SetStructure[] = ["continuous", "multiple"]
export const SET_STRUCTURE_LABELS: Record<SetStructure, string> = {
  continuous: "Continuous play (+$150)",
  multiple: "Multiple sets (+$100)",
}

export const TRAVEL_ORDER: TravelBand[] = [
  "0-15",
  "16-30",
  "31-60",
  "61-90",
  "90plus",
]

export const TRAVEL_LABELS: Record<TravelBand, string> = {
  "0-15": "0–15 mi (free)",
  "16-30": "16–30 mi (+$40)",
  "31-60": "31–60 mi (+$75)",
  "61-90": "61–90 mi (+$150)",
  "90plus": "90+ mi (custom quote)",
}

export const AMP_ORDER: Amplification[] = ["no", "yes"]
export const AMP_LABELS: Record<Amplification, string> = {
  no: "No (free)",
  yes: "Yes (+$100)",
}

export const AESTHETIC_ORDER: Aesthetic[] = ["no", "yes"]
export const AESTHETIC_LABELS: Record<Aesthetic, string> = {
  no: "No (free)",
  yes: "Yes (+$50)",
}

export const SONGS_ORDER: CustomSongs[] = [
  "existing",
  "new_1_2",
  "new_3_5",
  "new_5plus",
]

export const SONGS_LABELS: Record<CustomSongs, string> = {
  existing: "Existing repertoire (free)",
  new_1_2: "1–2 new songs (+$100)",
  new_3_5: "3–5 new songs (+$300)",
  new_5plus: "5+ songs (custom quote)",
}

const DURATION_LABELS: Record<DurationBeyondBase, string> = {
  h1: "Up to 1 hour total",
  h2: "Up to 2 hours total",
  h3: "Up to 3 hours total",
}

export function occasionFromEventType(t: EventType): string {
  return EVENT_LABELS[t]
}

export function computeQuote(selections: QuoteSelections): QuoteResult {
  const s = selections
  const customReasons: string[] = []
  const lineItems: QuoteLineItem[] = []

  lineItems.push({
    label: "Base fee",
    detail: "Transport, setup, tuning, first hour",
    amount: BASE_FEE,
  })

  const eventAmt = EVENT_ADD[s.eventType]
  lineItems.push({
    label: "Event type",
    detail: EVENT_LABELS[s.eventType],
    amount: eventAmt === "custom" ? null : eventAmt,
    isCustom: eventAmt === "custom",
  })
  if (eventAmt === "custom") {
    customReasons.push("Church service event type (custom quote)")
  }

  lineItems.push({
    label: "Performance duration",
    detail: DURATION_LABELS[s.duration],
    amount: DURATION_ADD[s.duration],
  })

  lineItems.push({
    label: "Set structure",
    detail: s.setStructure === "continuous" ? "Continuous play" : "Multiple sets",
    amount: SET_ADD[s.setStructure],
  })

  const travelAmt = TRAVEL_ADD[s.travel]
  lineItems.push({
    label: "Travel (from Virginia Beach)",
    detail:
      s.travel === "0-15"
        ? "0–15 mi"
        : s.travel === "16-30"
          ? "16–30 mi"
          : s.travel === "31-60"
            ? "31–60 mi"
            : s.travel === "61-90"
              ? "61–90 mi"
              : "90+ mi",
    amount: travelAmt === "custom" ? null : travelAmt,
    isCustom: travelAmt === "custom",
  })
  if (travelAmt === "custom") {
    customReasons.push("Travel beyond 90 miles (custom quote)")
  }

  lineItems.push({
    label: "Amplification",
    detail: s.amp === "yes" ? "Yes" : "No",
    amount: AMP_ADD[s.amp],
  })

  lineItems.push({
    label: "Aesthetic / wardrobe",
    detail: s.aesthetic === "yes" ? "Yes, match event" : "No",
    amount: AESTHETIC_ADD[s.aesthetic],
  })

  const songAmt = SONGS_ADD[s.songs]
  lineItems.push({
    label: "Custom song requests",
    detail:
      s.songs === "existing"
        ? "Existing repertoire only"
        : s.songs === "new_1_2"
          ? "1–2 new songs"
          : s.songs === "new_3_5"
            ? "3–5 new songs"
            : "5+ new songs",
    amount: songAmt === "custom" ? null : songAmt,
    isCustom: songAmt === "custom",
  })
  if (songAmt === "custom") {
    customReasons.push("5+ custom songs (custom quote)")
  }

  let subtotalNumeric = 0
  for (const row of lineItems) {
    if (row.amount != null) subtotalNumeric += row.amount
  }

  return {
    lineItems,
    subtotalNumeric,
    needsCustomFollowUp: customReasons.length > 0,
    customReasons,
  }
}

export function formatQuoteForNotes(
  selections: QuoteSelections,
  result: QuoteResult,
): string {
  const lines = result.lineItems.map((row) => {
    const amt =
      row.isCustom || row.amount == null
        ? "Custom quote"
        : `+$${row.amount}`
    return `• ${row.label}: ${row.detail} — ${amt}`
  })
  const tail = [
    "",
    `Calculator subtotal (fixed items): $${result.subtotalNumeric}`,
    result.needsCustomFollowUp
      ? `Custom follow-up needed: ${result.customReasons.join("; ")}`
      : "All selections priced on calculator (estimate; confirmed on call).",
  ]
  return ["[Pricing calculator — website]", ...lines, ...tail].join("\n")
}
