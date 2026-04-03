"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookingRequestSchema, type BookingRequestData } from "@lib/booking/bookingSchema"
import { Input } from "@components/ui/input"
import { Textarea } from "@components/ui/textarea"
import { Button } from "@components/ui/button"
import { Card, CardContent } from "@components/ui/card"
import { supabase } from "@lib/supabaseClient"
import {
  BookingQuoteModal,
  type BookingFormData,
} from "@components/booking/BookingQuoteModal"
import { BookingSuccessActions } from "@components/booking/BookingSuccessActions"
import { bookingFail, bookingVerbose } from "@lib/booking/diagnostics"

type BookingData = BookingRequestData

export default function BookingPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [inlineSuccess, setInlineSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingData>({ resolver: zodResolver(bookingRequestSchema) })

  async function submitBooking(formdata: BookingFormData): Promise<boolean> {
    bookingVerbose("submitBooking: start", {
      occasion: formdata.occasion,
      hasNotes: Boolean(formdata.notes?.trim()),
    })
    try {
      const rateRes = await fetch("/api/todays_bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      let todays_reqs: Record<string, unknown> = {}
      try {
        todays_reqs = (await rateRes.json()) as Record<string, unknown>
      } catch (parseErr) {
        bookingFail("submitBooking: todays_bookings response is not JSON", {
          status: rateRes.status,
          parseErr,
        })
        alert(
          "We could not reach the booking service. Check the console for [booking] logs or try again later.",
        )
        return false
      }

      bookingVerbose("submitBooking: todays_bookings", {
        httpStatus: rateRes.status,
        httpOk: rateRes.ok,
        body: todays_reqs,
      })

      const count = todays_reqs.count
      const countOk = typeof count === "number"
      if (!rateRes.ok || !countOk || count >= 30) {
        bookingFail("submitBooking: blocked by rate / config check", {
          httpStatus: rateRes.status,
          body: todays_reqs,
          countOk,
          count,
        })
        const code = todays_reqs.code
        if (code === "ENV_MISSING") {
          alert(
            "Booking is blocked: the site is missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY). Check Vercel → Settings → Environment Variables. See browser console for [booking] logs.",
          )
        } else if (code === "SUPABASE_ERROR") {
          alert(
            `Booking check failed (database): ${String(todays_reqs.supabase ?? todays_reqs.error ?? "unknown error")}. See console [booking] logs.`,
          )
        } else if (countOk && count >= 30) {
          alert(
            "Sorry, the daily request limit was reached. Please try again tomorrow or email us.",
          )
        } else {
          alert(
            "Sorry, we could not complete that request right now. See browser console for [booking] logs or reach out by email.",
          )
        }
        return false
      }

      bookingVerbose("submitBooking: Supabase insert…")
      const { data, error } = await supabase.from("bookings").insert([formdata])

      if (error) {
        bookingFail("submitBooking: Supabase insert failed", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        })
        alert(
          `Could not save your booking: ${error.message}. See console [booking] for details.`,
        )
        return false
      }

      bookingVerbose("submitBooking: insert ok", { rowHint: data })

      const notifyRes = await fetch("/api/booking_notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      })
      let notifyBody: unknown
      try {
        notifyBody = await notifyRes.json()
      } catch {
        notifyBody = { parseError: true }
      }
      bookingVerbose("submitBooking: booking_notify", {
        httpStatus: notifyRes.status,
        httpOk: notifyRes.ok,
        body: notifyBody,
      })
      if (!notifyRes.ok) {
        bookingFail(
          "submitBooking: confirmation email failed — row may still be saved",
          notifyBody,
        )
      }

      return true
    } catch (error) {
      bookingFail("submitBooking: uncaught exception", error)
      alert(
        "Something went wrong submitting your booking. See browser console for [booking] logs.",
      )
      return false
    }
  }

  async function onInlineSubmit(formdata: BookingData) {
    const ok = await submitBooking(formdata)
    if (ok) {
      setInlineSuccess(true)
      reset()
    }
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <h1 className="text-center text-3xl font-semibold text-forest">Book a performance</h1>

        <BookingQuoteModal
          open={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          onSubmitRequest={submitBooking}
        />

        <Card className="rounded-2xl border-forest/10 shadow-lg">
          <CardContent className="space-y-6 px-6 py-10 text-center sm:px-10 sm:py-12 md:px-12 md:py-14">
            <div className="w-full">
              <Button
                type="button"
                className="h-14 w-full min-h-[3.5rem] bg-forest px-6 text-base font-medium text-white hover:bg-forest/90 sm:h-16 sm:text-lg"
                onClick={() => setQuoteOpen(true)}
              >
                Open pricing calculator
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-forest/10 shadow-lg">
          <CardContent className="space-y-4 p-6 sm:p-8">
            <h2 className="text-lg font-semibold leading-snug text-forest sm:text-xl">
              Or, fill out contact details and set up a phone interview
            </h2>
            <p className="text-sm text-ink/75">
              Your details go to our booking log and we get an email. After you send it, you can
              choose a call or calendar next steps.
            </p>

            {inlineSuccess ? (
              <div className="space-y-4 rounded-xl border border-gold/30 bg-white/80 p-4 text-center">
                <p className="text-sm font-medium text-forest">Request received—thank you!</p>
                <p className="text-sm text-ink/75">
                  Next step: a short call to align on details, or jump to scheduling your full
                  session.
                </p>
                <BookingSuccessActions />
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setInlineSuccess(false)}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onInlineSubmit)} className="space-y-4">
                <div>
                  <Input placeholder="Your Name" {...register("name")} />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <Input type="email" placeholder="Email Address" {...register("email")} />
                  {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                  <Input type="tel" placeholder="Phone Number" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                </div>
                <div>
                  <Input
                    type="date"
                    className="booking-datetime-field border-forest/20 bg-white text-ink"
                    {...register("date")}
                  />
                  {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
                </div>
                <div>
                  <Input
                    type="time"
                    className="booking-datetime-field border-forest/20 bg-white text-ink"
                    {...register("time")}
                  />
                  {errors.time && <p className="text-sm text-red-600">{errors.time.message}</p>}
                </div>
                <div>
                  <Input placeholder="Occasion (e.g., Wedding, Birthday)" {...register("occasion")} />
                  {errors.occasion && (
                    <p className="text-sm text-red-600">{errors.occasion.message}</p>
                  )}
                </div>
                <div>
                  <Textarea placeholder="Additional Notes" rows={4} {...register("notes")} />
                </div>
                <Button type="submit" className="w-full bg-forest text-white hover:bg-forest/90">
                  Submit booking request
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
