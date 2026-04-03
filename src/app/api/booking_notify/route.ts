import { NextResponse, NextRequest } from 'next/server'
import { EmailTemplate } from '@components/notify_emailTemplate';
import { Resend } from 'resend';
import { bookingFail, bookingVerbose } from '@lib/booking/diagnostics';

export async function POST(req: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    bookingFail('booking_notify: RESEND_API_KEY is not set');
    return NextResponse.json({ error: 'Email service not configured', code: 'RESEND_MISSING' }, { status: 503 });
  }
  const resend = new Resend(key);

  const { name, email, phone, date, time, occasion, notes } = await req.json();

  bookingVerbose('booking_notify: received', { name, email, phone, date, time, occasion, hasNotes: Boolean(notes) });

  // Parse time to proper ICS format (assume time is ISO string)
  const startDate = new Date(date + 'T' + time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  function formatICSDate(date: Date) {
    return date
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}Z$/, 'Z');
  }

  const ics = `
    BEGIN:VCALENDAR
    VERSION:2.0
    CALSCALE:GREGORIAN
    BEGIN:VEVENT
    SUMMARY:Booking - ${occasion}
    DTSTART:${formatICSDate(startDate)}
    DTEND:${formatICSDate(endDate)}
    DESCRIPTION:Occasion: ${occasion}\\nBooked by: ${name}\\nEmail: ${email}\\nPhone: ${phone}${notes ? `\\nNotes: ${String(notes).replace(/\n/g, '\\n')}` : ''}
    LOCATION:Chesapeake, VA
    STATUS:CONFIRMED
    END:VEVENT
    END:VCALENDAR
    `;


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
          content: btoa(ics), // base64 encoded string
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