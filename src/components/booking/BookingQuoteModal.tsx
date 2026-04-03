"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingRequestSchema, type BookingRequestData } from "@lib/booking/bookingSchema"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { cn } from "@lib/utils"
import {
  BASE_FEE,
  DEFAULT_QUOTE_SELECTIONS,
  type QuoteSelections,
  computeQuote,
  formatQuoteForNotes,
  occasionFromEventType,
  EVENT_TYPE_ORDER,
  EVENT_LABELS,
  EVENT_ADD,
  DURATION_ORDER,
  DURATION_CHOICE_LABELS,
  SET_STRUCTURE_ORDER,
  SET_STRUCTURE_LABELS,
  TRAVEL_ORDER,
  TRAVEL_LABELS,
  LOADIN_ORDER,
  LOADIN_LABELS,
  AMP_ORDER,
  AMP_LABELS,
  AESTHETIC_ORDER,
  AESTHETIC_LABELS,
  SONGS_ORDER,
  SONGS_LABELS,
  MULTI_LOC_ORDER,
  MULTI_LOC_LABELS,
} from "@lib/booking/quoteEstimate"
import { BookingSuccessActions } from "@components/booking/BookingSuccessActions"

export type BookingFormData = BookingRequestData

type Props = {
  open: boolean
  onClose: () => void
  onSubmitRequest: (data: BookingFormData) => Promise<boolean>
}

function RadioSection<K extends string>({
  title,
  name,
  value,
  onChange,
  options,
}: {
  title: string
  name: string
  value: K
  onChange: (v: K) => void
  options: { value: K; label: string }[]
}) {
  return (
    <fieldset className="space-y-2 rounded-xl border border-forest/15 bg-white/90 p-4">
      <legend className="px-1 text-sm font-semibold text-forest">{title}</legend>
      <div className="mt-2 flex flex-col gap-2">
        {options.map((o) => (
          <label
            key={String(o.value)}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition",
              value === o.value
                ? "border-forest bg-forest/10 ring-1 ring-forest/30"
                : "border-forest/15 hover:border-forest/40",
            )}
          >
            <input
              type="radio"
              name={name}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="mt-0.5 size-4 shrink-0 accent-forest"
            />
            <span className="text-pretty text-ink">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function BookingQuoteModal({ open, onClose, onSubmitRequest }: Props) {
  const [step, setStep] = useState(0)
  const [selections, setSelections] = useState<QuoteSelections>(DEFAULT_QUOTE_SELECTIONS)
  const [submitting, setSubmitting] = useState(false)

  const quoteResult = useMemo(() => computeQuote(selections), [selections])

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({ resolver: zodResolver(bookingRequestSchema) })

  useEffect(() => {
    if (!open) return
    setStep(0)
    setSelections({ ...DEFAULT_QUOTE_SELECTIONS })
    reset()
  }, [open, reset])

  useEffect(() => {
    setValue("occasion", occasionFromEventType(selections.eventType))
  }, [selections.eventType, setValue])

  if (!open) return null

  async function submitForm(data: BookingFormData) {
    const quoteBlock = formatQuoteForNotes(selections, quoteResult)
    const mergedNotes = [data.notes?.trim(), quoteBlock].filter(Boolean).join("\n\n")
    setSubmitting(true)
    const ok = await onSubmitRequest({ ...data, notes: mergedNotes || undefined })
    setSubmitting(false)
    if (ok) setStep(3)
  }

  function patchSelections<K extends keyof QuoteSelections>(key: K, value: QuoteSelections[K]) {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const eventOptions = EVENT_TYPE_ORDER.map((value) => ({
    value,
    label: `${EVENT_LABELS[value]} (+$${EVENT_ADD[value]})`,
  }))

  const durationOptions = DURATION_ORDER.map((value) => ({
    value,
    label: DURATION_CHOICE_LABELS[value],
  }))

  const setOptions = SET_STRUCTURE_ORDER.map((value) => ({
    value,
    label: SET_STRUCTURE_LABELS[value],
  }))

  const travelOptions = TRAVEL_ORDER.map((value) => ({
    value,
    label: TRAVEL_LABELS[value],
  }))

  const loadInOptions = LOADIN_ORDER.map((value) => ({
    value,
    label: LOADIN_LABELS[value],
  }))

  const ampOptions = AMP_ORDER.map((value) => ({
    value,
    label: AMP_LABELS[value],
  }))

  const aestheticOptions = AESTHETIC_ORDER.map((value) => ({
    value,
    label: AESTHETIC_LABELS[value],
  }))

  const songsOptions = SONGS_ORDER.map((value) => ({
    value,
    label: SONGS_LABELS[value],
  }))

  const multiOptions = MULTI_LOC_ORDER.map((value) => ({
    value,
    label: MULTI_LOC_LABELS[value],
  }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal
        aria-label="Pricing calculator and booking request"
        className="relative flex max-h-[min(92vh,840px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-xl"
      >
        <button
          type="button"
          className="absolute right-3 top-3 z-10 rounded-md p-1.5 text-ink/60 hover:bg-forest/10 hover:text-ink"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5 py-6 pr-11 sm:px-6 sm:pr-12",
            step === 1 && "pb-2",
          )}
        >
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-forest">Pricing calculator</h2>
              <p className="text-sm leading-relaxed text-ink/85">
                Use the next screen to build an estimate from our standard add-ons. Everything you
                pick is <strong className="font-medium text-forest">additive</strong>—you&apos;ll
                see a running total.{" "}
                <strong className="font-medium text-forest">
                  Final pricing is always confirmed on a call.
                </strong>
              </p>
              <p className="text-xs text-ink/65">
                Travel is measured from Virginia Beach, VA. If you need 90+ miles or 5+ custom
                songs, we&apos;ll flag your request for a custom quote instead of a single total.
              </p>
              <Button
                type="button"
                className="w-full bg-forest text-white hover:bg-forest/90"
                onClick={() => setStep(1)}
              >
                Build your quote
              </Button>
              <button
                type="button"
                className="w-full text-center text-sm text-forest underline-offset-2 hover:underline"
                onClick={() => setStep(2)}
              >
                Skip calculator — go straight to the request form
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-forest">Your selections</h2>
              <p className="text-xs text-ink/70">
                Base fee ${BASE_FEE} includes transport, setup, tuning, and the first 30 minutes.
              </p>

              <RadioSection
                title="Event type (pick one)"
                name="eventType"
                value={selections.eventType}
                onChange={(v) => patchSelections("eventType", v)}
                options={eventOptions}
              />
              <RadioSection
                title="Performance duration (first 30 min included in base)"
                name="duration"
                value={selections.duration}
                onChange={(v) => patchSelections("duration", v)}
                options={durationOptions}
              />
              <RadioSection
                title="Set structure"
                name="setStructure"
                value={selections.setStructure}
                onChange={(v) => patchSelections("setStructure", v)}
                options={setOptions}
              />
              <RadioSection
                title="Travel (from Virginia Beach, VA)"
                name="travel"
                value={selections.travel}
                onChange={(v) => patchSelections("travel", v)}
                options={travelOptions}
              />
              <RadioSection
                title="Load-in difficulty"
                name="loadIn"
                value={selections.loadIn}
                onChange={(v) => patchSelections("loadIn", v)}
                options={loadInOptions}
              />
              <RadioSection
                title="Amplification"
                name="amp"
                value={selections.amp}
                onChange={(v) => patchSelections("amp", v)}
                options={ampOptions}
              />
              <RadioSection
                title="Aesthetic / wardrobe matching"
                name="aesthetic"
                value={selections.aesthetic}
                onChange={(v) => patchSelections("aesthetic", v)}
                options={aestheticOptions}
              />
              <RadioSection
                title="Custom song requests"
                name="songs"
                value={selections.songs}
                onChange={(v) => patchSelections("songs", v)}
                options={songsOptions}
              />
              <RadioSection
                title="Multiple locations (same event)"
                name="multiLoc"
                value={selections.multiLoc}
                onChange={(v) => patchSelections("multiLoc", v)}
                options={multiOptions}
              />

              {/* Line-by-line breakdown (compact, for transparency) */}
              <div className="rounded-xl border border-forest/10 bg-white/60 p-3 text-xs text-ink/80">
                <p className="mb-2 font-semibold text-forest">Line items</p>
                <ul className="space-y-1">
                  {quoteResult.lineItems.map((row) => (
                    <li key={row.label} className="flex justify-between gap-3 border-b border-forest/5 py-1 last:border-0">
                      <span>
                        {row.label}
                        <span className="text-ink/55"> — {row.detail}</span>
                      </span>
                      <span className="shrink-0 font-medium tabular-nums text-forest">
                        {row.isCustom || row.amount == null ? "Custom" : `$${row.amount}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 pr-2">
              <h2 className="text-xl font-semibold text-forest">Your request</h2>
              <p className="text-sm text-ink/75">
                Details go to our booking log and email. Add anything else in notes.
              </p>
              <form onSubmit={handleSubmit(submitForm)} className="space-y-3">
                <div>
                  <Input placeholder="Your name" {...register("name")} />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <Input type="email" placeholder="Email" {...register("email")} />
                  {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <Input type="tel" placeholder="Phone" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input type="date" {...register("date")} />
                  {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
                </div>
                <div>
                  <Input type="time" {...register("time")} />
                  {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
                </div>
                <div>
                  <Input placeholder="Occasion" {...register("occasion")} />
                  {errors.occasion && (
                    <p className="text-sm text-red-600">{errors.occasion.message}</p>
                  )}
                </div>
                <div>
                  <Textarea placeholder="Notes (optional)" rows={3} {...register("notes")} />
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-forest text-white hover:bg-forest/90"
                >
                  {submitting ? "Sending…" : "Submit request"}
                </Button>
              </form>
              <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                Back to calculator
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 pr-2 text-center">
              <h2 className="text-xl font-semibold text-forest">Thank you!</h2>
              <p className="text-sm leading-relaxed text-ink/80">
                We received your request. Next step: pick what works best for you—most people like a
                quick call to align on details, then we lock the full session on the calendar.
              </p>
              <div className="pt-2">
                <BookingSuccessActions />
              </div>
              <Button type="button" variant="ghost" className="w-full" onClick={onClose}>
                Close
              </Button>
            </div>
          )}
        </div>

        {step === 1 && (
          <div className="shrink-0 space-y-3 border-t border-forest/15 bg-cream px-5 py-4 sm:px-6">
            {quoteResult.needsCustomFollowUp ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                <p className="font-semibold">Custom quote needed</p>
                <ul className="mt-1 list-inside list-disc text-xs leading-relaxed">
                  {quoteResult.customReasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs">
                  Subtotal for fixed-price items:{" "}
                  <strong className="tabular-nums">${quoteResult.subtotalNumeric}</strong>
                  . We&apos;ll follow up with a full quote after you submit.
                </p>
              </div>
            ) : (
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-forest">Estimated total</span>
                <span className="text-2xl font-semibold tabular-nums text-forest">
                  ${quoteResult.subtotalNumeric}
                </span>
              </div>
            )}
            <p className="text-[11px] leading-snug text-ink/55">
              Estimate only—not a contract. We confirm details, travel, and repertoire on a call.
            </p>
            <Button
              type="button"
              className="w-full bg-forest text-white hover:bg-forest/90"
              onClick={() => setStep(2)}
            >
              Continue to booking request
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => setStep(0)}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
