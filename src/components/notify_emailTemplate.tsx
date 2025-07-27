import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  occasion: string;
}

export function EmailTemplate({ name, email, phone, date, time, occasion }: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Georgia, serif',
        backgroundColor: '#f5f3ee',
        padding: '24px',
        borderRadius: '8px',
        color: '#1a1a1a',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ddd',
      }}
    >
      <h2 style={{ color: '#1e3d34', fontSize: '24px', marginBottom: '16px' }}>
        New Booking Request
      </h2>

      <table style={{ width: '100%', fontSize: '16px', lineHeight: '1.6' }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 'bold', width: '120px' }}>Name:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Phone:</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Occasion:</td>
            <td>{occasion}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Date:</td>
            <td>{date}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Time:</td>
            <td>{time}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: '24px', fontSize: '14px', color: '#555' }}>
        You received this booking from the Azalea’s Frequency website.
      </p>
    </div>
  );
}
