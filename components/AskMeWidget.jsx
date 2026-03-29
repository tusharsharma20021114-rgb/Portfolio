'use client';
import { useState, useRef, useEffect } from 'react';

const SUGGESTIONS = [
  'What ML projects has Tushar worked on?',
  'What is his current role and tech stack?',
  'Does he have experience with LLMs?',
  'What cloud platforms has he used?',
  'Is he available for full-time roles?',
];

export default function AskMeWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            "Hi! I'm an AI assistant trained on Tushar's portfolio. Ask me anything about his skills, experience, projects, or availability. 👋",
        },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const newMessages = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, I had trouble answering that.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <style>{`
        .ask-fab {
          position: fixed; bottom: 28px; right: 28px; z-index: 500;
          width: 54px; height: 54px; border-radius: 50%;
          background: var(--accent); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; box-shadow: 0 4px 24px rgba(0,245,196,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ask-fab:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(0,245,196,0.5); }
        .ask-fab-label {
          position: absolute; right: 62px; top: 50%; transform: translateY(-50%);
          background: var(--surface2); border: 1px solid var(--border);
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 1px; color: var(--accent); padding: 5px 10px;
          border-radius: 4px; white-space: nowrap; pointer-events: none;
          opacity: 0; transition: opacity 0.2s;
        }
        .ask-fab:hover .ask-fab-label { opacity: 1; }

        .ask-panel {
          position: fixed; bottom: 96px; right: 28px; z-index: 500;
          width: 370px; max-height: 540px;
          background: var(--surface); border: 1px solid rgba(0,245,196,0.2);
          border-radius: 16px; display: flex; flex-direction: column;
          box-shadow: 0 12px 48px rgba(0,0,0,0.5);
          transform: translateY(12px) scale(0.97);
          opacity: 0; pointer-events: none;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .ask-panel.open {
          transform: translateY(0) scale(1); opacity: 1; pointer-events: all;
        }
        .ask-panel-header {
          display: flex; align-items: center; gap: 10px; justify-content: space-between;
          padding: 16px 18px; border-bottom: 1px solid var(--border);
        }
        .ask-panel-title {
          font-family: 'Space Mono', monospace; font-size: 0.7rem;
          letter-spacing: 2px; color: var(--accent); text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
        }
        .ask-status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--accent);
          animation: pulse-dot 1.5s infinite;
        }
        @keyframes pulse-dot {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .ask-close {
          background: none; border: none; color: var(--muted); cursor: pointer;
          font-size: 1rem; transition: color 0.2s; line-height: 1;
        }
        .ask-close:hover { color: var(--text); }

        .ask-messages {
          flex: 1; overflow-y: auto; padding: 16px 16px 8px;
          display: flex; flex-direction: column; gap: 12px;
          scrollbar-width: thin; scrollbar-color: var(--accent2) transparent;
        }
        .ask-bubble {
          max-width: 88%; padding: 10px 14px; border-radius: 10px;
          font-size: 0.85rem; line-height: 1.65;
        }
        .ask-bubble.user {
          align-self: flex-end; background: rgba(0,245,196,0.1);
          border: 1px solid rgba(0,245,196,0.18); color: var(--text);
          border-bottom-right-radius: 3px;
        }
        .ask-bubble.assistant {
          align-self: flex-start; background: var(--surface2);
          border: 1px solid var(--border); color: var(--text);
          border-bottom-left-radius: 3px;
        }
        .ask-typing {
          align-self: flex-start; padding: 10px 16px;
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 10px; border-bottom-left-radius: 3px;
          display: flex; gap: 5px; align-items: center;
        }
        .ask-dot {
          width: 5px; height: 5px; border-radius: 50%; background: var(--muted);
          animation: ask-bounce 1.2s infinite;
        }
        .ask-dot:nth-child(2) { animation-delay: 0.18s; }
        .ask-dot:nth-child(3) { animation-delay: 0.36s; }
        @keyframes ask-bounce { 0%,80%,100% { transform: scale(0.7); opacity: 0.5; } 40% { transform: scale(1.1); opacity: 1; } }

        .ask-suggestions {
          padding: 0 14px 10px;
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .ask-suggestion {
          font-family: 'Space Mono', monospace; font-size: 0.58rem;
          letter-spacing: 0.5px; padding: 4px 9px; border-radius: 4px;
          background: rgba(0,245,196,0.04); border: 1px solid rgba(0,245,196,0.12);
          color: var(--muted); cursor: pointer; transition: all 0.2s;
        }
        .ask-suggestion:hover {
          border-color: var(--accent); color: var(--accent);
          background: rgba(0,245,196,0.07);
        }

        .ask-input-row {
          display: flex; gap: 8px; padding: 12px 14px;
          border-top: 1px solid var(--border);
        }
        .ask-input {
          flex: 1; background: var(--surface2); border: 1px solid var(--border);
          border-radius: 7px; padding: 9px 12px; color: var(--text);
          font-family: 'Syne', sans-serif; font-size: 0.85rem;
          outline: none; transition: border-color 0.25s; resize: none;
          height: 38px; overflow: hidden;
        }
        .ask-input:focus { border-color: var(--accent); }
        .ask-input::placeholder { color: var(--muted); }
        .ask-send {
          background: var(--accent); border: none; border-radius: 7px;
          width: 38px; height: 38px; cursor: pointer; color: #030712;
          font-size: 0.9rem; transition: opacity 0.2s, transform 0.2s;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ask-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .ask-send:not(:disabled):hover { transform: translateX(2px); }

        @media (max-width: 480px) {
          .ask-panel { width: calc(100vw - 40px); right: 20px; bottom: 88px; }
        }
      `}</style>

      {/* FAB Button */}
      <button className="ask-fab" onClick={() => setOpen((o) => !o)} aria-label="Ask me anything">
        <span className="ask-fab-label">Ask me anything</span>
        {open ? '✕' : '💬'}
      </button>

      {/* Chat Panel */}
      <div className={`ask-panel${open ? ' open' : ''}`}>
        <div className="ask-panel-header">
          <div className="ask-panel-title">
            <div className="ask-status-dot" />
            Ask About Tushar
          </div>
          <button className="ask-close" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="ask-messages">
          {messages.map((m, i) => (
            <div key={i} className={`ask-bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="ask-typing">
              <div className="ask-dot" />
              <div className="ask-dot" />
              <div className="ask-dot" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips — only when no conversation yet */}
        {messages.length <= 1 && (
          <div className="ask-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="ask-suggestion" onClick={() => sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="ask-input-row">
          <input
            ref={inputRef}
            className="ask-input"
            placeholder="Ask anything about Tushar..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button
            className="ask-send"
            disabled={!input.trim() || loading}
            onClick={() => sendMessage()}
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
