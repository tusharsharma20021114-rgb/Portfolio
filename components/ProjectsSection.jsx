'use client';
import { useState, useMemo } from 'react';

const PROJECTS = [
  {
    id: 1,
    num: 'PROJECT — 01',
    title: 'NILM Energy Disaggregation',
    meta: 'Jan 2026 — Present · Klimashift',
    desc: 'Non-Intrusive Load Monitoring ML model for energy disaggregation with ETL pipelines processing large-scale time-series datasets on AWS. Identifies appliance-level consumption from aggregate meter readings.',
    tags: ['Python', 'AWS', 'PostgreSQL', 'ETL', 'Time-Series'],
    tagColors: { 'Time-Series': 'purple' },
    domain: 'ML / AI',
  },
  {
    id: 2,
    num: 'PROJECT — 02',
    title: 'Equipment Identification Pipeline',
    meta: 'Jan 2026 — Present · Klimashift',
    desc: 'Automated computer vision pipeline using YOLO, Grounding DINO, and Grounded-SAM to detect, segment, and catalogue commercial assets from raw image frames — eliminating manual inventory effort entirely.',
    tags: ['YOLO', 'Grounding DINO', 'SAM', 'Computer Vision'],
    tagColors: { 'Computer Vision': 'purple' },
    domain: 'ML / AI',
  },
  {
    id: 3,
    num: 'PROJECT — 03',
    title: 'ML Model Monitoring Pipeline',
    meta: '',
    desc: 'MLflow-tracked pipeline with automated performance dashboards, data drift detection, and CI/CD via GitHub Actions — surfaces model degradation before it impacts production.',
    tags: ['MLflow', 'GitHub Actions', 'CI/CD', 'MLOps'],
    tagColors: { 'CI/CD': 'amber', 'MLOps': 'purple' },
    domain: 'MLOps',
  },
  {
    id: 4,
    num: 'PROJECT — 04',
    title: 'Smart Attendance System',
    meta: 'Aug – Nov 2022',
    desc: 'Flask-based facial recognition web app achieving 92% accuracy with OpenCV deep learning. REST API integration for real-time data storage, user authentication, and audit-trail-ready PostgreSQL backend.',
    tags: ['Flask', 'OpenCV', 'PostgreSQL', 'Deep Learning'],
    tagColors: { 'Deep Learning': 'purple' },
    domain: 'Full Stack',
  },
  {
    id: 5,
    num: 'PROJECT — 05',
    title: 'Credit Card Application Approval',
    meta: 'Mar – Jun 2022',
    desc: 'End-to-end ML pipeline comparing SVM, Logistic Regression, and Decision Tree classifiers on financial data with feature engineering. Achieved 94% classification accuracy with ROC-AUC and F1 metrics.',
    tags: ['Scikit-learn', 'Pandas', 'SVM', '94% Accuracy'],
    tagColors: { 'SVM': 'purple', '94% Accuracy': 'amber' },
    domain: 'ML / AI',
  },
  {
    id: 6,
    num: 'PROJECT — 06',
    title: 'Supply Chain Process Analytics',
    meta: 'Jul – Sept 2023 · Celonis Capstone',
    desc: 'Analyzed end-to-end supply chain data in Celonis EMS with trend deduction and pattern recognition via ETL and REST APIs. Reduced business decision cycles from 4–5 days to 2 days.',
    tags: ['Celonis EMS', 'SQL', 'ETL', 'Process Mining'],
    tagColors: { 'Process Mining': 'amber' },
    domain: 'Data Engineering',
  },
  {
    id: 7,
    num: 'PROJECT — 07',
    title: 'WSN Attack Detection',
    meta: '',
    desc: 'ML system to detect and classify DoS attacks in Wireless Sensor Networks using anomaly detection and supervised classification on network telemetry features.',
    tags: ['Python', 'ML', 'Security', 'Anomaly Detection'],
    tagColors: { 'ML': 'purple', 'Security': 'amber' },
    domain: 'ML / AI',
  },
  {
    id: 8,
    num: 'PROJECT — 08',
    title: 'Medical Store Management System',
    meta: 'Sept – Dec 2021',
    desc: 'Java GUI application integrated with MySQL with optimised database queries reducing end-to-end transaction time by 50%. Includes inventory management, billing, and reporting modules.',
    tags: ['Java Swing', 'MySQL', 'GUI App'],
    tagColors: { 'GUI App': 'amber' },
    domain: 'Full Stack',
  },
];

const ALL_DOMAINS = ['All', 'ML / AI', 'MLOps', 'Data Engineering', 'Full Stack'];

function getTagClass(tag, tagColors) {
  const c = tagColors[tag];
  if (c === 'purple') return 'tag purple';
  if (c === 'amber') return 'tag amber';
  return 'tag';
}

export default function ProjectsSection() {
  const [activeDomain, setActiveDomain] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const domainMatch = activeDomain === 'All' || p.domain === activeDomain;
      const q = search.toLowerCase();
      const textMatch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return domainMatch && textMatch;
    });
  }, [activeDomain, search]);

  return (
    <section id="projects">
      <style>{`
        .proj-controls {
          display: flex; gap: 12px; flex-wrap: wrap;
          align-items: center; margin-bottom: 36px;
        }
        .proj-filter-btn {
          font-family: 'Space Mono', monospace; font-size: 0.65rem;
          letter-spacing: 1.5px; text-transform: uppercase;
          padding: 7px 14px; border-radius: 5px; cursor: pointer;
          border: 1px solid var(--border); background: transparent;
          color: var(--muted); transition: all 0.22s;
        }
        .proj-filter-btn:hover { border-color: rgba(0,245,196,0.3); color: var(--text); }
        .proj-filter-btn.active {
          border-color: var(--accent); color: var(--accent);
          background: rgba(0,245,196,0.06);
        }
        .proj-search {
          margin-left: auto; position: relative;
        }
        .proj-search input {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 6px; padding: 8px 14px 8px 34px;
          color: var(--text); font-family: 'Space Mono', monospace;
          font-size: 0.68rem; outline: none; transition: border-color 0.3s;
          width: 200px;
        }
        .proj-search input:focus { border-color: var(--accent); }
        .proj-search input::placeholder { color: var(--muted); }
        .proj-search-icon {
          position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
          color: var(--muted); font-size: 0.75rem; pointer-events: none;
        }
        .proj-count {
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          color: var(--muted); letter-spacing: 1px; margin-left: 4px;
        }
        .proj-empty {
          grid-column: 1/-1; text-align: center; padding: 60px 0;
          font-family: 'Space Mono', monospace; font-size: 0.75rem;
          color: var(--muted); letter-spacing: 1px;
        }
        .project-card.filtered-out { display: none; }
        @media (max-width: 600px) {
          .proj-search { margin-left: 0; width: 100%; }
          .proj-search input { width: 100%; }
        }
      `}</style>

      <div className="section-eyebrow">// 03 — Projects</div>
      <h2 className="section-title">Things I've<br />Built.</h2>
      <div className="section-rule"></div>

      {/* Filter Controls */}
      <div className="proj-controls">
        {ALL_DOMAINS.map((d) => (
          <button
            key={d}
            className={`proj-filter-btn${activeDomain === d ? ' active' : ''}`}
            onClick={() => setActiveDomain(d)}
          >
            {d}
          </button>
        ))}
        <span className="proj-count">
          {filtered.length} / {PROJECTS.length} projects
        </span>
        <div className="proj-search">
          <span className="proj-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filtered.length === 0 ? (
          <div className="proj-empty">// no matching projects found</div>
        ) : (
          filtered.map((p) => (
            <div className="project-card reveal" key={p.id}>
              <div className="project-num">{p.num}</div>
              <h3>{p.title}</h3>
              {p.meta && <div className="project-meta">{p.meta}</div>}
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={getTagClass(t, p.tagColors)}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSearch(t)}
                    title={`Filter by ${t}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
