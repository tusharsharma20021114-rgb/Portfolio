# Portfolio Backend Integration — Setup Guide

## What was added

| Feature | Files |
|---|---|
| Animated Skills (no %) | `components/SkillsSection.jsx` |
| Project Filter + Search | `components/ProjectsSection.jsx` |
| AI "Ask me anything" chat | `components/AskMeWidget.jsx` + `app/api/chat/route.js` |
| Resume download tracking | `components/ResumeButton.jsx` + `app/api/resume/route.js` |
| Contact form + Email | `components/ContactForm.jsx` + `app/api/contact/route.js` |
| HR Analytics Dashboard | `app/hr/page.js` + `app/api/hr/stats/route.js` |
| DB Schema | `schema.sql` |

---

## Step 1 — Install dependencies

```bash
npm install @vercel/postgres resend
```

---

## Step 2 — Set up Vercel Postgres

1. Go to your Vercel project → **Storage** → **Create Database** → choose **Postgres**
2. Copy the connection string env vars (they'll auto-populate in Vercel)
3. Run `schema.sql` in the Vercel Postgres query editor:
   - Dashboard → Storage → your DB → **Query** tab → paste and run `schema.sql`

---

## Step 3 — Environment variables

Add these to your Vercel project (Settings → Environment Variables) **and** your local `.env.local`:

```env
# Vercel Postgres (auto-added if you connect via Vercel dashboard)
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Resend — for email notifications on contact form
# Get free API key at https://resend.com (100 emails/day free)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Anthropic — for AI "Ask me anything" widget
# Get at https://console.anthropic.com
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx

# HR Dashboard — set any strong password/token
HR_DASHBOARD_TOKEN=your_strong_secret_token_here
```

---

## Step 4 — Add your resume PDF

Place your resume at:
```
public/resume.pdf
```
The `ResumeButton` component will serve it as `Tushar_Sharma_Resume.pdf` on download.

---

## Step 5 — Copy files into your project

```
portfolionextjs/
├── app/
│   ├── page.js                     ← replace existing
│   ├── hr/
│   │   └── page.js                 ← new
│   └── api/
│       ├── contact/
│       │   └── route.js            ← replace existing
│       ├── resume/
│       │   └── route.js            ← new
│       ├── chat/
│       │   └── route.js            ← new
│       └── hr/
│           └── stats/
│               └── route.js        ← new
└── components/
    ├── CanvasBackground.jsx        ← unchanged
    ├── ContactForm.jsx             ← unchanged
    ├── SkillsSection.jsx           ← new
    ├── ProjectsSection.jsx         ← new
    ├── AskMeWidget.jsx             ← new
    └── ResumeButton.jsx            ← new
```

---

## Step 6 — Share the HR Dashboard

The HR portal is at: `https://yoursite.com/hr`

Share the `HR_DASHBOARD_TOKEN` value privately with HR contacts.
It shows:
- Resume download counts (total, 7d, 30d)
- Contact message counts
- 14-day timeline bar charts for both
- A table of the 10 most recent contact messages

---

## Local development

```bash
npm run dev
```

Make sure your `.env.local` has all the env vars above.
For Vercel Postgres locally, use `@vercel/postgres` with `POSTGRES_URL` set.

---

## Troubleshooting

**AI chat not responding?**
Check `ANTHROPIC_API_KEY` is set. The widget uses `claude-haiku-4-5-20251001` (cheapest/fastest).

**Email not sending?**
Check `RESEND_API_KEY`. Free tier = 100 emails/day. Contact messages still save to DB even if email fails.

**HR dashboard showing 401?**
Double-check `HR_DASHBOARD_TOKEN` matches in env vars and what you enter in the login screen.

**Resume download shows error?**
Make sure `public/resume.pdf` exists.
