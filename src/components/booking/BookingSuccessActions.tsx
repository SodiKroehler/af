"use client"

import { Button } from "@components/ui/button"
import {
  bookingPhoneHref,
  mailtoFinalizeHref,
  mailtoFullSessionHref,
  schedulingUrl,
} from "@lib/booking/contactLinks"

export function BookingSuccessActions() {
  const callHref = bookingPhoneHref() ?? mailtoFinalizeHref()
  const calUrl = schedulingUrl()
  const fullSessionHref = calUrl || mailtoFullSessionHref()

  return (
    <div className="flex flex-col gap-3">
      <Button type="button" className="w-full bg-forest text-white hover:bg-forest/90" asChild>
        <a href={callHref}>Talk through details on a call</a>
      </Button>
      <Button type="button" variant="outline" className="w-full border-forest/30" asChild>
        <a
          href={fullSessionHref}
          target={calUrl ? "_blank" : undefined}
          rel={calUrl ? "noopener noreferrer" : undefined}
        >
          {calUrl ? "Book your full session (calendar)" : "Request your full session (email)"}
        </a>
      </Button>
    </div>
  )
}
