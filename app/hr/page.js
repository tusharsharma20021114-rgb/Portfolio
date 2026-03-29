// app/hr/page.js
'use client';
import { useState, useEffect } from 'react';

export default function HRDashboard() {
  const [token, setToken] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/hr/stats', {
        headers: { 'x-hr-token': token },
      });
      if (res.status === 401) {
        setError('Invalid access token.');
        setLoading(false);
        return;
      }
      const d = await res.json();
      setData(d);
      setAuthed(true);
    } catch {
      setError('Failed to connect. Please try again.');
    }
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    const res = await fetch('/api/hr/stats', { headers: { 'x-hr-token': token } });
    const d = await res.json();
    setData(d);
    setLoading(false);
  };

  if (!authed) {
    return (
      <div style={styles.loginWrap}>
        <div style={styles.loginCard}>
          <div style={styles.eyebrow}>// HR PORTAL</div>
          <h1 style={styles.loginTitle}>Portfolio Analytics</h1>
          <p style={styles.loginSub}>Enter the access token provided by Tushar to view engagement stats.</p>
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              type="password"
              placeholder="Access token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={styles.tokenInput}
              autoFocus
            />
            {error && <div style={styles.errorMsg}>{error}</div>}
            <button type="submit" disabled={!token || loading} style={styles.loginBtn}>
              {loading ? 'Verifying...' : 'Access Dashboard →'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const { downloads, contacts } = data;

  return (
    <div style={styles.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #030712; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
        .hr-stat-card:hover { border-color: rgba(0,245,196,0.35) !important; transform: translateY(-3px); }
        .hr-contact-row:hover { background: rgba(0,245,196,0.04) !important; }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>// HR ANALYTICS PORTAL</div>
          <h1 style={styles.pageTitle}>Tushar Sharma — Portfolio Stats</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={refresh} disabled={loading} style={styles.refreshBtn}>
            {loading ? '...' : '↻ Refresh'}
          </button>
          <a href="/" style={styles.backBtn}>← Portfolio</a>
        </div>
      </div>

      {/* KPI Row */}
      <div style={styles.kpiRow}>
        {[
          { num: downloads.total, lbl: 'Resume Downloads', sub: `+${downloads.last7d} this week`, color: '#00f5c4' },
          { num: downloads.last30d, lbl: 'Downloads (30d)', sub: 'last 30 days', color: '#00f5c4' },
          { num: contacts.total, lbl: 'Contact Messages', sub: `+${contacts.last7d} this week`, color: '#a78bfa' },
          { num: contacts.last7d, lbl: 'Messages (7d)', sub: 'last 7 days', color: '#a78bfa' },
        ].map((k) => (
          <div key={k.lbl} className="hr-stat-card" style={styles.kpiCard}>
            <div style={{ ...styles.kpiNum, color: k.color }}>{k.num}</div>
            <div style={styles.kpiLbl}>{k.lbl}</div>
            <div style={styles.kpiSub}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Timeline Charts (simple bar) */}
      <div style={styles.chartRow}>
        <MiniBarChart
          title="Resume Downloads — Last 14 Days"
          rows={downloads.timeline}
          color="#00f5c4"
        />
        <MiniBarChart
          title="Contact Messages — Last 14 Days"
          rows={contacts.timeline}
          color="#a78bfa"
        />
      </div>

      {/* Recent Contacts Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableTitle}>Recent Contact Messages</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Name', 'Email', 'Subject', 'Date'].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.recent.map((c, i) => (
              <tr key={i} className="hr-contact-row" style={styles.tr}>
                <td style={styles.td}>{c.name}</td>
                <td style={{ ...styles.td, color: '#00f5c4' }}>
                  <a href={`mailto:${c.email}`} style={{ color: '#00f5c4', textDecoration: 'none' }}>{c.email}</a>
                </td>
                <td style={{ ...styles.td, color: '#7d8590' }}>{c.subject || '—'}</td>
                <td style={{ ...styles.td, color: '#7d8590', fontFamily: 'Space Mono, monospace', fontSize: '0.72rem' }}>
                  {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
            {contacts.recent.length === 0 && (
              <tr><td colSpan={4} style={{ ...styles.td, textAlign: 'center', color: '#7d8590' }}>No messages yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={styles.footer}>Portfolio Analytics · Tushar Sharma · {new Date().getFullYear()}</div>
    </div>
  );
}

function MiniBarChart({ title, rows, color }) {
  if (!rows || rows.length === 0) {
    return (
      <div style={chartStyles.card}>
        <div style={chartStyles.title}>{title}</div>
        <div style={{ color: '#7d8590', fontSize: '0.8rem', fontFamily: 'Space Mono, monospace' }}>// no data yet</div>
      </div>
    );
  }
  const max = Math.max(...rows.map((r) => parseInt(r.count, 10)), 1);
  return (
    <div style={chartStyles.card}>
      <div style={chartStyles.title}>{title}</div>
      <div style={chartStyles.bars}>
        {rows.map((r, i) => {
          const h = Math.max(4, (parseInt(r.count, 10) / max) * 80);
          const date = new Date(r.day);
          const label = `${date.getDate()}/${date.getMonth() + 1}`;
          return (
            <div key={i} style={chartStyles.barWrap} title={`${label}: ${r.count}`}>
              <div style={{ ...chartStyles.bar, height: `${h}px`, background: color, opacity: 0.75 }} />
              <div style={chartStyles.barLabel}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const C = {
  bg: '#030712', surface: '#0d1117', surface2: '#161b22',
  accent: '#00f5c4', text: '#e6edf3', muted: '#7d8590',
  border: 'rgba(0,245,196,0.12)',
};

const styles = {
  loginWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.bg, fontFamily: 'Syne, sans-serif' },
  loginCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: '40px 36px', maxWidth: 400, width: '100%' },
  eyebrow: { fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: C.accent, letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 10 },
  loginTitle: { fontSize: '2rem', fontWeight: 800, color: C.text, marginBottom: 10 },
  loginSub: { color: C.muted, fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 24 },
  tokenInput: { background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', color: C.text, fontFamily: 'Space Mono, monospace', fontSize: '0.85rem', outline: 'none', width: '100%' },
  loginBtn: { padding: '12px 20px', background: C.accent, color: '#030712', border: 'none', borderRadius: 8, fontFamily: 'Space Mono, monospace', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', cursor: 'pointer' },
  errorMsg: { color: '#f87171', fontFamily: 'Space Mono, monospace', fontSize: '0.72rem', letterSpacing: '1px' },
  wrap: { background: C.bg, minHeight: '100vh', fontFamily: 'Syne, sans-serif', color: C.text, padding: '40px 6vw' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36, flexWrap: 'wrap', gap: 16 },
  pageTitle: { fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: C.text },
  refreshBtn: { padding: '9px 18px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 7, color: C.muted, fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '1px' },
  backBtn: { padding: '9px 18px', background: 'transparent', border: `1px solid rgba(0,245,196,0.2)`, borderRadius: 7, color: C.accent, fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', textDecoration: 'none', letterSpacing: '1px' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 },
  kpiCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '22px 20px', transition: 'border-color 0.3s, transform 0.3s' },
  kpiNum: { fontFamily: 'Space Mono, monospace', fontSize: '2.4rem', fontWeight: 700, lineHeight: 1 },
  kpiLbl: { fontSize: '0.85rem', color: C.text, marginTop: 8, fontWeight: 600 },
  kpiSub: { fontSize: '0.72rem', color: C.muted, marginTop: 4, fontFamily: 'Space Mono, monospace', letterSpacing: '0.5px' },
  chartRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 },
  tableCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '24px', marginBottom: 28 },
  tableTitle: { fontFamily: 'Space Mono, monospace', fontSize: '0.7rem', color: C.accent, letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 18 },
  th: { fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', color: C.muted, letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 12px', borderBottom: `1px solid ${C.border}`, textAlign: 'left' },
  tr: { borderBottom: `1px solid rgba(255,255,255,0.03)`, transition: 'background 0.2s' },
  td: { padding: '12px 12px', fontSize: '0.88rem', color: C.text },
  footer: { fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: C.muted, textAlign: 'center', letterSpacing: '1.5px', paddingTop: 20 },
};

const chartStyles = {
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: '22px 20px' },
  title: { fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', color: C.accent, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 18 },
  bars: { display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 },
  barWrap: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, justifyContent: 'flex-end', cursor: 'default' },
  bar: { width: '100%', borderRadius: '3px 3px 0 0', transition: 'opacity 0.2s', minWidth: 4 },
  barLabel: { fontFamily: 'Space Mono, monospace', fontSize: '0.52rem', color: C.muted, textAlign: 'center', whiteSpace: 'nowrap' },
};
