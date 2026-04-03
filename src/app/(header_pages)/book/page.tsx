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
    try {
      const rateRes = await fetch("/api/todays_bookings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      const todays_reqs = await rateRes.json()

      if (
        !rateRes.ok ||
        typeof todays_reqs.count !== "number" ||
        todays_reqs.count >= 30
      ) {
        console.error("Error fetching todays bookings:", todays_reqs)
        alert(
          "Sorry, we could not complete that request right now. Please try again tomorrow or reach out by email.",
        )
        return false
      }

      const { data, error } = await supabase.from("bookings").insert([formdata])

      await fetch("/api/booking_notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      })

      if (error) {
        console.error("Booking error:", error)
        console.log("Data:", data)
        alert("There was an error submitting your booking.")
        return false
      }

      return true
    } catch (error) {
      console.error("Booking error:", error)
      alert("There was an error submitting your booking.")
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
            <h2 className="text-xl font-semibold text-forest sm:text-2xl">Get an estimate</h2>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-ink/80">
              Open the pricing calculator to add up your selections in real time.
            </p>
            <Button
              type="button"
              className="bg-forest px-10 text-white hover:bg-forest/90"
              size="lg"
              onClick={() => setQuoteOpen(true)}
            >
              Open pricing calculator
            </Button>
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
                  <Input type="date" {...register("date")} />
                  {errors.date && <p className="text-sm text-red-600">{errors.date.message}</p>}
                </div>
                <div>
                  <Input type="time" {...register("time")} />
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
