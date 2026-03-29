// app/api/contact/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Save to DB
    await sql`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (${name}, ${email}, ${subject || ''}, ${message});
    `;

    // 2. Send email notification via Resend
    //    Install: npm install resend
    //    Set env var: RESEND_API_KEY=re_xxxxxxxxxxxx
    if (process.env.RESEND_API_KEY) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['tusharsharma20021114@gmail.com'],
            subject: `[Portfolio] New message from ${name}: ${subject || '(no subject)'}`,
            html: `
              <div style="font-family:monospace;background:#030712;color:#e6edf3;padding:28px;border-radius:12px;max-width:560px">
                <div style="color:#00f5c4;font-size:11px;letter-spacing:3px;margin-bottom:18px">// NEW PORTFOLIO CONTACT</div>
                <table style="width:100%;border-collapse:collapse">
                  <tr><td style="color:#7d8590;font-size:11px;padding:6px 0;width:90px">FROM</td><td style="color:#e6edf3">${name}</td></tr>
                  <tr><td style="color:#7d8590;font-size:11px;padding:6px 0">EMAIL</td><td><a href="mailto:${email}" style="color:#00f5c4">${email}</a></td></tr>
                  ${subject ? `<tr><td style="color:#7d8590;font-size:11px;padding:6px 0">SUBJECT</td><td style="color:#e6edf3">${subject}</td></tr>` : ''}
                </table>
                <div style="margin-top:20px;padding:16px;background:#0d1117;border-radius:8px;border-left:3px solid #00f5c4;color:#e6edf3;line-height:1.7">
                  ${message.replace(/\n/g, '<br/>')}
                </div>
                <div style="margin-top:18px;color:#7d8590;font-size:10px">
                  Sent via tusharsharma.dev portfolio contact form
                </div>
              </div>
            `,
          }),
        });
        if (!emailRes.ok) {
          console.error('Resend error:', await emailRes.text());
        }
      } catch (emailErr) {
        // Don't fail the request if email fails — message is already in DB
        console.error('Email send error:', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Message saved securely.' }, { status: 200 });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
