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
import { paypalPaymentUrl } from "@lib/booking/contactLinks"

type BookingData = BookingRequestData

export default function BookingPage() {
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [inlineSuccess, setInlineSuccess] = useState(false)
  const payPalUrl = paypalPaymentUrl()

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
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-forest">Book a performance</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            Open the pricing calculator to add up your selections in real time—then we&apos;ll{" "}
            <strong className="font-medium text-forest">confirm everything on a call</strong>. Some
            options trigger a custom quote instead of a single total; either way, nothing is final
            until you hear from us.
          </p>
          <Button
            type="button"
            className="mt-6 bg-forest px-8 text-white hover:bg-forest/90"
            size="lg"
            onClick={() => setQuoteOpen(true)}
          >
            Open pricing calculator
          </Button>
        </div>

        <BookingQuoteModal
          open={quoteOpen}
          onClose={() => setQuoteOpen(false)}
          onSubmitRequest={submitBooking}
        />

        <Card className="rounded-2xl border-forest/10 shadow-lg">
          <CardContent className="space-y-4 p-6 text-left text-sm leading-relaxed text-ink/85">
            <h2 className="text-lg font-semibold text-forest">How Your Quote Is Calculated:</h2>
            <p>
              Azalea&apos;s Frequency provides personalized pricing based on the details of your
              event. Your quote is generated automatically using the information you provide in the
              booking survey.
            </p>
            <p className="font-medium text-forest">Your price is based on:</p>
            <ul className="list-disc space-y-1 pl-5 text-ink/85">
              <li>Event type</li>
              <li>Length of performance</li>
              <li>Number of set times</li>
              <li>Location &amp; travel distance</li>
              <li>Load‑in difficulty</li>
              <li>Amplification needs</li>
              <li>Aesthetic/wardrobe alignment</li>
              <li>Song requests</li>
              <li>Multi‑location movement</li>
              <li>Special accommodations</li>
            </ul>
            <p>
              This ensures your quote is accurate, fair, and tailored to your event&apos;s needs.
            </p>
            <p className="border-t border-forest/10 pt-4 text-ink/80">
              Sunshine welcomes both paths: you can walk through pricing together on a call, or use
              the online calculator and booking survey on this page—whichever feels easier. When
              you&apos;re ready to pay, we typically handle payment through PayPal.{" "}
              {payPalUrl ? (
                <>
                  You can{" "}
                  <a
                    href={payPalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-forest underline underline-offset-2 hover:text-forest/80"
                  >
                    pay online here
                  </a>{" "}
                  when you like, or{" "}
                </>
              ) : null}
              we&apos;ll send you the PayPal link by email after we&apos;ve connected about your
              event.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl border-forest/10">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-lg font-semibold text-forest">Request without the estimate</h2>
            <p className="text-sm text-ink/75">
              Same flow as before: your details go to our booking log and we get an email. After you
              send it, choose whether to hop on a call or move straight to calendar scheduling.
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
