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
  | "wellness"
  | "gala"
  | "private_dinner"
  | "brunch_shower"

export type DurationBeyondBase =
  | "base30"
  | "m45"
  | "h1"
  | "h2"
  | "h3"

export type SetStructure = "continuous" | "multiple"

export type TravelBand = "0-15" | "16-30" | "31-60" | "61-90" | "90plus"

export type LoadIn = "easy" | "stairs" | "outdoor" | "no_parking"

export type Amplification = "no" | "yes"

export type Aesthetic = "no" | "yes" | "up_to_you"

export type CustomSongs = "existing" | "new_1_2" | "new_3_5" | "new_5plus"

export type MultiLocation = "no" | "yes"

export type QuoteSelections = {
  eventType: EventType
  duration: DurationBeyondBase
  setStructure: SetStructure
  travel: TravelBand
  loadIn: LoadIn
  amp: Amplification
  aesthetic: Aesthetic
  songs: CustomSongs
  multiLoc: MultiLocation
}

export const DEFAULT_QUOTE_SELECTIONS: QuoteSelections = {
  eventType: "wedding_ceremony",
  duration: "base30",
  setStructure: "multiple",
  travel: "0-15",
  loadIn: "easy",
  amp: "no",
  aesthetic: "no",
  songs: "existing",
  multiLoc: "no",
}

export const EVENT_ADD: Record<EventType, number> = {
  wedding_ceremony: 250,
  cocktail: 150,
  reception: 200,
  funeral: 100,
  wellness: 150,
  gala: 300,
  private_dinner: 300,
  brunch_shower: 150,
}

const DURATION_ADD: Record<DurationBeyondBase, number> = {
  base30: 0,
  m45: 75,
  h1: 150,
  h2: 300,
  h3: 450,
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

const LOADIN_ADD: Record<LoadIn, number> = {
  easy: 0,
  stairs: 50,
  outdoor: 50,
  no_parking: 75,
}

const AMP_ADD: Record<Amplification, number> = {
  no: 0,
  yes: 100,
}

const AESTHETIC_ADD: Record<Aesthetic, number> = {
  no: 0,
  yes: 50,
  up_to_you: 30,
}

const SONGS_ADD: Record<CustomSongs, number | "custom"> = {
  existing: 0,
  new_1_2: 100,
  new_3_5: 300,
  new_5plus: "custom",
}

const MULTI_ADD: Record<MultiLocation, number> = {
  no: 0,
  yes: 75,
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
  wellness: "Wellness session",
  gala: "Gala or luxury event",
  private_dinner: "Private dinner",
  brunch_shower: "Brunch or shower",
}

/** UI order — matches client-facing calculator. */
export const EVENT_TYPE_ORDER: EventType[] = [
  "wedding_ceremony",
  "cocktail",
  "reception",
  "funeral",
  "wellness",
  "gala",
  "private_dinner",
  "brunch_shower",
]

export const DURATION_ORDER: DurationBeyondBase[] = [
  "base30",
  "m45",
  "h1",
  "h2",
  "h3",
]

export const DURATION_CHOICE_LABELS: Record<DurationBeyondBase, string> = {
  base30: "Up to 30 min total (included in base — $0 add-on)",
  m45: "Up to 45 min total (+$75)",
  h1: "Up to 1 hour total (+$150)",
  h2: "Up to 2 hours total (+$300)",
  h3: "Up to 3 hours total (+$450)",
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

export const LOADIN_ORDER: LoadIn[] = ["easy", "stairs", "outdoor", "no_parking"]
export const LOADIN_LABELS: Record<LoadIn, string> = {
  easy: "Easy access (free)",
  stairs: "Stairs or long walk (+$50)",
  outdoor: "Outdoor grass / uneven (+$50)",
  no_parking: "No parking near venue (+$75)",
}

export const AMP_ORDER: Amplification[] = ["no", "yes"]
export const AMP_LABELS: Record<Amplification, string> = {
  no: "No (free)",
  yes: "Yes (+$100)",
}

export const AESTHETIC_ORDER: Aesthetic[] = ["no", "yes", "up_to_you"]
export const AESTHETIC_LABELS: Record<Aesthetic, string> = {
  no: "No (free)",
  yes: "Yes (+$50)",
  up_to_you: `"Up to you" (+$30)`,
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

export const MULTI_LOC_ORDER: MultiLocation[] = ["no", "yes"]
export const MULTI_LOC_LABELS: Record<MultiLocation, string> = {
  no: "No (free)",
  yes: "Yes (+$75)",
}

const DURATION_LABELS: Record<DurationBeyondBase, string> = {
  base30: "Up to 30 min total (included in base)",
  m45: "Up to 45 min total",
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
    detail: "Transport, setup, tuning, first 30 min",
    amount: BASE_FEE,
  })

  lineItems.push({
    label: "Event type",
    detail: EVENT_LABELS[s.eventType],
    amount: EVENT_ADD[s.eventType],
  })

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
    label: "Load-in",
    detail:
      s.loadIn === "easy"
        ? "Easy access"
        : s.loadIn === "stairs"
          ? "Stairs or long walk"
          : s.loadIn === "outdoor"
            ? "Outdoor grass or uneven ground"
            : "No parking near venue",
    amount: LOADIN_ADD[s.loadIn],
  })

  lineItems.push({
    label: "Amplification",
    detail: s.amp === "yes" ? "Yes" : "No",
    amount: AMP_ADD[s.amp],
  })

  lineItems.push({
    label: "Aesthetic / wardrobe",
    detail:
      s.aesthetic === "no"
        ? "No"
        : s.aesthetic === "yes"
          ? "Yes, match event"
          : `"Up to you"`,
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

  lineItems.push({
    label: "Multiple locations (same event)",
    detail: s.multiLoc === "yes" ? "Yes" : "No",
    amount: MULTI_ADD[s.multiLoc],
  })

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
