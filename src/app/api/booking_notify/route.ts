import { NextResponse, NextRequest } from 'next/server'
import { EmailTemplate } from '@components/notify_emailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, date, time, occasion } = await req.json();

  console.log('Received booking data:', { name, email, phone, date, time, occasion });

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
    DESCRIPTION:Occasion: ${occasion}\\nBooked by: ${name}\\nEmail: ${email}\\nPhone: ${phone}
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
      }),
      attachments: [
        {
          filename: "booking.ics",
          content: btoa(ics), // base64 encoded string
        },
      ],
    });

    if (error) {
      console.log('Email error:', error);
      return NextResponse.json({ error }, { status: 403 });

    }

    return NextResponse.json(data);
  } catch (error) {
    console.log('Other error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}