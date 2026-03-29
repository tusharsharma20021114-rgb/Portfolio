'use client';
import { useEffect, useRef, useState } from 'react';

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    label: 'Core Languages',
    icon: '{ }',
    color: 'green',
    skills: ['Python', 'SQL / PL-SQL', 'Java', 'JavaScript', 'R'],
  },
  {
    id: 'ml',
    label: 'ML & AI',
    icon: '⬡',
    color: 'purple',
    skills: [
      'Scikit-learn', 'TensorFlow', 'PyTorch', 'Hugging Face',
      'YOLO', 'Grounding DINO', 'LLMs', 'GANs', 'NLP',
      'MLflow', 'OpenCV', 'Prompt Engineering',
    ],
  },
  {
    id: 'data',
    label: 'Data & Cloud',
    icon: '◈',
    color: 'amber',
    skills: [
      'AWS (EC2, S3, VPC)', 'Azure', 'PostgreSQL / MySQL',
      'MongoDB', 'Apache Spark / Hadoop', 'Snowflake', 'Databricks',
    ],
  },
  {
    id: 'tools',
    label: 'Frameworks & Tools',
    icon: '⊞',
    color: 'green',
    skills: [
      'Flask', 'Django', 'FastAPI', 'Docker', 'Git',
      'Power BI', 'Alteryx', 'Celonis', 'UiPath', 'Pandas / NumPy',
    ],
  },
];

function SkillChip({ name, color, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      className={`skill-chip-new skill-chip-${color}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.92)',
        transition: `opacity 0.35s ease, transform 0.35s ease`,
      }}
    >
      {name}
    </span>
  );
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('languages');
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const switchTab = (id) => {
    if (id === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setAnimating(false);
    }, 180);
  };

  const active = SKILL_CATEGORIES.find((c) => c.id === activeTab);

  return (
    <section id="skills" ref={sectionRef}>
      <style>{`
        .skills-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
        .skill-tab {
          font-family: 'Space Mono', monospace; font-size: 0.68rem;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 9px 16px; border-radius: 6px; cursor: pointer;
          border: 1px solid var(--border); background: transparent;
          color: var(--muted); transition: all 0.25s; display: flex;
          align-items: center; gap: 7px;
        }
        .skill-tab:hover { border-color: rgba(0,245,196,0.3); color: var(--text); }
        .skill-tab.active-green { border-color: var(--accent); color: var(--accent); background: rgba(0,245,196,0.06); }
        .skill-tab.active-purple { border-color: #a78bfa; color: #a78bfa; background: rgba(124,58,237,0.07); }
        .skill-tab.active-amber  { border-color: var(--accent3); color: var(--accent3); background: rgba(245,158,11,0.07); }
        .skill-tab-icon { font-size: 0.9rem; }

        .skills-panel {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 30px 28px; min-height: 210px;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .skills-panel.fading { opacity: 0; transform: translateY(6px); }
        .skills-panel-header {
          font-family: 'Space Mono', monospace; font-size: 0.7rem;
          letter-spacing: 3px; text-transform: uppercase;
          margin-bottom: 22px; padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; gap: 10px;
        }
        .skills-panel-header.green { color: var(--accent); border-bottom-color: rgba(0,245,196,0.15); }
        .skills-panel-header.purple { color: #a78bfa; border-bottom-color: rgba(124,58,237,0.2); }
        .skills-panel-header.amber  { color: var(--accent3); border-bottom-color: rgba(245,158,11,0.2); }

        .skills-chips-wrap { display: flex; flex-wrap: wrap; gap: 9px; }

        .skill-chip-new {
          font-family: 'Space Mono', monospace; font-size: 0.67rem;
          padding: 7px 13px; border-radius: 6px;
          border: 1px solid; cursor: default;
          letter-spacing: 0.5px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .skill-chip-new:hover { transform: translateY(-2px); }
        .skill-chip-green {
          background: rgba(0,245,196,0.06); color: var(--accent);
          border-color: rgba(0,245,196,0.22);
        }
        .skill-chip-green:hover { box-shadow: 0 4px 14px rgba(0,245,196,0.15); }
        .skill-chip-purple {
          background: rgba(124,58,237,0.07); color: #a78bfa;
          border-color: rgba(124,58,237,0.25);
        }
        .skill-chip-purple:hover { box-shadow: 0 4px 14px rgba(124,58,237,0.18); }
        .skill-chip-amber {
          background: rgba(245,158,11,0.07); color: var(--accent3);
          border-color: rgba(245,158,11,0.25);
        }
        .skill-chip-amber:hover { box-shadow: 0 4px 14px rgba(245,158,11,0.15); }

        .skills-meta-row {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 14px; margin-top: 30px;
        }
        .skills-meta-card {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 10px; padding: 18px 16px; text-align: center;
          transition: border-color 0.3s, transform 0.3s;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s;
        }
        .skills-meta-card.in-view { opacity: 1; transform: none; }
        .skills-meta-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .skills-meta-num { font-family: 'Space Mono', monospace; font-size: 1.8rem; font-weight: 700; color: var(--accent); }
        .skills-meta-lbl { font-size: 0.68rem; color: var(--muted); margin-top: 4px; letter-spacing: 1px; font-family: 'Space Mono', monospace; }
        @media (max-width: 600px) {
          .skills-meta-row { grid-template-columns: 1fr; }
          .skill-tab span:last-child { display: none; }
        }
      `}</style>

      <div className="section-eyebrow">// 04 — Skills</div>
      <h2 className="section-title">My Toolkit.</h2>
      <div className="section-rule"></div>

      {/* Category Tabs */}
      <div className="skills-tabs">
        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`skill-tab${activeTab === cat.id ? ` active-${cat.color}` : ''}`}
            onClick={() => switchTab(cat.id)}
          >
            <span className="skill-tab-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Skills Panel */}
      <div className={`skills-panel${animating ? ' fading' : ''}`}>
        <div className={`skills-panel-header ${active.color}`}>
          <span>{active.icon}</span>
          <span>{active.label}</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.62rem', opacity: 0.5 }}>
            {active.skills.length} skills
          </span>
        </div>
        <div className="skills-chips-wrap">
          {!animating && active.skills.map((skill, i) => (
            <SkillChip
              key={skill}
              name={skill}
              color={active.color}
              delay={inView ? i * 45 : 9999}
            />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="skills-meta-row">
        {[
          { num: '30+', lbl: 'Technologies' },
          { num: '4', lbl: 'Skill Domains' },
          { num: '6+', lbl: 'Years Coding' },
        ].map((m, i) => (
          <div
            key={m.lbl}
            className={`skills-meta-card${inView ? ' in-view' : ''}`}
            style={{ transitionDelay: inView ? `${0.2 + i * 0.12}s` : '0s' }}
          >
            <div className="skills-meta-num">{m.num}</div>
            <div className="skills-meta-lbl">{m.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
