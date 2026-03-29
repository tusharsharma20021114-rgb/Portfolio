// app/api/hr/stats/route.js
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

function checkAuth(request) {
  const token = request.headers.get('x-hr-token');
  return token === process.env.HR_DASHBOARD_TOKEN;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Total & recent resume downloads
    const { rows: dlRows } = await sql`
      SELECT
        COUNT(*) AS total_downloads,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS downloads_last_7d,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS downloads_last_30d
      FROM resume_downloads;
    `;

    // Total & recent contact messages
    const { rows: msgRows } = await sql`
      SELECT
        COUNT(*) AS total_messages,
        COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS messages_last_7d
      FROM contact_messages;
    `;

    // Last 10 contacts
    const { rows: recentContacts } = await sql`
      SELECT name, email, subject, created_at
      FROM contact_messages
      ORDER BY created_at DESC
      LIMIT 10;
    `;

    // Downloads per day (last 14 days)
    const { rows: dlTimeline } = await sql`
      SELECT
        DATE(created_at) AS day,
        COUNT(*) AS count
      FROM resume_downloads
      WHERE created_at >= NOW() - INTERVAL '14 days'
      GROUP BY DATE(created_at)
      ORDER BY day;
    `;

    // Contact messages per day (last 14 days)
    const { rows: msgTimeline } = await sql`
      SELECT
        DATE(created_at) AS day,
        COUNT(*) AS count
      FROM contact_messages
      WHERE created_at >= NOW() - INTERVAL '14 days'
      GROUP BY DATE(created_at)
      ORDER BY day;
    `;

    return NextResponse.json({
      downloads: {
        total: parseInt(dlRows[0].total_downloads, 10),
        last7d: parseInt(dlRows[0].downloads_last_7d, 10),
        last30d: parseInt(dlRows[0].downloads_last_30d, 10),
        timeline: dlTimeline,
      },
      contacts: {
        total: parseInt(msgRows[0].total_messages, 10),
        last7d: parseInt(msgRows[0].messages_last_7d, 10),
        recent: recentContacts,
        timeline: msgTimeline,
      },
    });
  } catch (error) {
    console.error('HR stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
