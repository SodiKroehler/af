import { NextResponse, NextRequest } from 'next/server'
import { EmailTemplate } from '@components/notify_emailTemplate'
import { Resend } from 'resend'
import { buildBookingIcs } from '@lib/booking/buildBookingIcs'
import { bookingFail, bookingVerbose } from '@lib/booking/diagnostics'

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    bookingFail('booking_notify: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service not configured', code: 'RESEND_MISSING' }, { status: 503 });
  }
  const resend = new Resend(key);

  const { name, email, phone, date, time, occasion, notes } = await req.json();

  bookingVerbose('booking_notify: received', { name, email, phone, date, time, occasion, hasNotes: Boolean(notes) })

  const ics = buildBookingIcs({
    name,
    email,
    phone,
    date,
    time,
    occasion,
    notes: notes ? String(notes) : undefined,
  })

  try {
    const { data, error } = await resend.emails.send({
      from: 'Azalea’s Frequency <noreply@updates.azaleasfrequency.com>', // must be verified in Resend
      to: ['sodikroehler@gmail.com', 'hugginssunshine@gmail.com'],
      subject: `New booking request from ${name}`,
      react: EmailTemplate({
        name,
        email,
        phone,
        date,
        time,
        occasion,
        notes: notes ? String(notes) : undefined,
      }),
      attachments: [
        {
          filename: "booking.ics",
          content: Buffer.from(ics, "utf-8"),
          contentType: "text/calendar; charset=utf-8; method=PUBLISH",
        },
      ],
    });

    if (error) {
      bookingFail('booking_notify: Resend API error', error);
      return NextResponse.json({ error, code: 'RESEND_SEND_FAILED' }, { status: 403 });
    }

    bookingVerbose('booking_notify: email sent ok', { id: data?.id });
    return NextResponse.json(data);
  } catch (error) {
    bookingFail('booking_notify: exception', error);
    return NextResponse.json({ error: String(error), code: 'NOTIFY_EXCEPTION' }, { status: 500 });
  }
}