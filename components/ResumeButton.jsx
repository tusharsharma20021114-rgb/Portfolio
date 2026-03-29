'use client';
import { useState } from 'react';

export default function ResumeButton({ variant = 'primary', label = 'Download Resume' }) {
  const [status, setStatus] = useState('idle'); // idle | downloading | done

  const handleDownload = async () => {
    if (status !== 'idle') return;
    setStatus('downloading');

    // Track the download
    try {
      await fetch('/api/resume', { method: 'POST' });
    } catch {
      // silent — don't block download if tracking fails
    }

    // Trigger the actual file download
    const a = document.createElement('a');
    a.href = '/resume.pdf'; // Place your resume PDF at /public/resume.pdf
    a.download = 'Tushar_Sharma_Resume.pdf';
    a.click();

    setStatus('done');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const labels = {
    idle: label,
    downloading: 'Preparing...',
    done: '✓ Downloaded!',
  };

  if (variant === 'ghost') {
    return (
      <button
        className="btn-ghost"
        onClick={handleDownload}
        disabled={status === 'downloading'}
        style={{ cursor: status !== 'idle' ? 'default' : 'pointer', border: 'none', background: 'transparent' }}
      >
        {labels[status]}
      </button>
    );
  }

  return (
    <button
      className="btn-primary"
      onClick={handleDownload}
      disabled={status === 'downloading'}
      style={{
        cursor: status !== 'idle' ? 'default' : 'pointer',
        opacity: status === 'downloading' ? 0.7 : 1,
        border: 'none',
        transition: 'all 0.25s',
      }}
    >
      {status === 'done' ? '✓ Downloaded!' : `⬇ ${labels[status]}`}
    </button>
  );
}
