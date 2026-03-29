// app/api/resume/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// POST /api/resume — record a download event
export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    await sql`
      INSERT INTO resume_downloads (ip, user_agent, referrer)
      VALUES (${ip}, ${userAgent}, ${referrer});
    `;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Resume tracking error:', error);
    // Return 200 anyway — tracking failure should never block UX
    return NextResponse.json({ success: false }, { status: 200 });
  }
}

// GET /api/resume — return download count (used by HR dashboard)
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT COUNT(*) AS total FROM resume_downloads;
    `;
    return NextResponse.json({ total: parseInt(rows[0].total, 10) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch count' }, { status: 500 });
  }
}
