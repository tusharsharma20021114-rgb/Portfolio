// app/page.js
import CanvasBackground from '../components/CanvasBackground';
import ContactForm from '../components/ContactForm';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import AskMeWidget from '../components/AskMeWidget';
import ResumeButton from '../components/ResumeButton';

export default function Home() {
  return (
    <>
      <CanvasBackground />
      <div className="glow-cursor" id="glowCursor"></div>

      {/* ── NAV ───────────────────────────────────────────────────── */}
      <nav>
        <div className="nav-logo">TS_DEV</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="nav-cta">Hire Me</a>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section id="hero">
        <div className="hero-tag">// M.Tech @ IIIT Gwalior &nbsp;·&nbsp; ML Engineer &nbsp;·&nbsp; Data Scientist</div>
        <div className="hero-name">Tushar<br />Sharma</div>
        <div className="hero-subtitle" id="typingEl"><span className="cursor-blink"></span></div>
        <p className="hero-desc">
          Building intelligent systems at the intersection of{' '}
          <strong style={{ color: 'var(--text)' }}>machine learning</strong>,{' '}
          <strong style={{ color: 'var(--text)' }}>data engineering</strong>, and{' '}
          <strong style={{ color: 'var(--text)' }}>backend development</strong>.
          Currently working at Klimashift and pursuing M.Tech at IIIT Gwalior.
        </p>
        <div className="hero-badges">
          <span className="badge green">GATE CS 2024 Qualified</span>
          <span className="badge purple">400+ LeetCode</span>
          <span className="badge amber">CGPA 8.21</span>
          <span className="badge">Gwalior, India</span>
        </div>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View My Work</a>
          {/* Resume download button with tracking */}
          <ResumeButton variant="ghost" label="Download Resume" />
          <a href="#contact" className="btn-ghost">Get In Touch</a>
        </div>
        <div className="scroll-hint"><div className="scroll-line"></div><span>Scroll</span></div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section id="about">
        <div className="section-eyebrow">// 01 — About</div>
        <h2 className="section-title">Who I Am.</h2>
        <div className="section-rule"></div>
        <div className="about-grid reveal">
          <div>
            <div className="about-text">
              <p>I'm a <strong>ML Engineer & Data Scientist</strong> with a B.Tech in CSE (Data Science & ML) from ITM University and currently pursuing <span className="hl">M.Tech at IIIT Gwalior</span> with a CGPA of 8.21.</p>
              <p>I specialize in building <strong>end-to-end ML pipelines</strong>, <strong>computer vision systems</strong>, and <strong>LLM applications</strong>. At Klimashift, I engineer energy disaggregation models and automated asset identification pipelines that run in production on AWS.</p>
              <p>Beyond ML, I work across the full stack — from <strong>Flask/Django/FastAPI backends</strong> and <strong>PostgreSQL databases</strong> to cloud infrastructure on <strong>AWS and Azure</strong>. Good engineering means solving the right problem, cleanly.</p>
            </div>
            <div className="stats-row">
              <div className="stat-box"><div className="stat-num" data-count="6">0</div><div className="stat-lbl">Internships</div></div>
              <div className="stat-box"><div className="stat-num" data-count="8">0</div><div className="stat-lbl">Projects</div></div>
              <div className="stat-box"><div className="stat-num" data-count="400">0</div><div className="stat-lbl">LeetCode</div></div>
            </div>
          </div>
          <div className="about-quick">
            <div className="quick-item"><div className="quick-icon">🎓</div><div><div className="quick-label">Education</div><div className="quick-val">M.Tech IT — IIIT Gwalior</div></div></div>
            <div className="quick-item"><div className="quick-icon">💼</div><div><div className="quick-label">Currently</div><div className="quick-val">Data Analyst Intern @ Klimashift</div></div></div>
            <div className="quick-item"><div className="quick-icon">📍</div><div><div className="quick-label">Location</div><div className="quick-val">Dabra, Madhya Pradesh</div></div></div>
            <div className="quick-item"><div className="quick-icon">🔬</div><div><div className="quick-label">Research</div><div className="quick-val">WSN Security · NILM · NLP</div></div></div>
            <div className="quick-item"><div className="quick-icon">📱</div><div><div className="quick-label">Phone</div><div className="quick-val">+91 96693 66748</div></div></div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ────────────────────────────────────────────── */}
      <section id="experience">
        <div className="section-eyebrow">// 02 — Experience</div>
        <h2 className="section-title">Where I've<br />Worked.</h2>
        <div className="section-rule"></div>
        <div className="exp-timeline">
          <div className="exp-item reveal">
            <div className="exp-date">JAN 2026 — PRESENT</div>
            <div className="exp-role">Data Analyst / Data Engineer Intern</div>
            <div className="exp-company">Klimashift, Gurugram (On-site) <span className="exp-type">CURRENT</span></div>
            <ul className="exp-bullets">
              <li>Engineered a data-driven sanctioned load calculator using <strong style={{ color: 'var(--text)' }}>Python + PostgreSQL</strong> processing minute-level power telemetry, optimising commercial client load recommendations by up to <strong style={{ color: 'var(--accent)' }}>40%</strong>.</li>
              <li>Designed and deployed a <strong style={{ color: 'var(--text)' }}>NILM ML model</strong> for energy disaggregation with robust ETL pipelines on large-scale time-series datasets hosted on AWS.</li>
              <li>Built an automated equipment identification pipeline using <strong style={{ color: 'var(--text)' }}>YOLO, Grounding DINO, and Grounded-SAM</strong> to detect, segment, and catalogue commercial assets — eliminating manual inventory effort.</li>
              <li>Delivered comprehensive technical reports translating complex energy datasets into actionable, cost-saving electrical load strategies for clients.</li>
            </ul>
          </div>
          <div className="exp-item reveal">
            <div className="exp-date">AUG 2024 — JAN 2026</div>
            <div className="exp-role">Teaching Assistant</div>
            <div className="exp-company">ABV-IIITM, Gwalior</div>
            <ul className="exp-bullets">
              <li>Conducted lab sessions and tutorials for <strong style={{ color: 'var(--accent)' }}>100+ students</strong> across data structures and algorithms courses.</li>
              <li>Authored structured technical documentation and evaluation frameworks for academic assessments.</li>
            </ul>
          </div>
          <div className="exp-item reveal">
            <div className="exp-date">SEPT 2023 — NOV 2023</div>
            <div className="exp-role">RPA Developer Intern</div>
            <div className="exp-company">UiPath (Remote)</div>
            <ul className="exp-bullets">
              <li>Designed automated RPA workflows using UiPath with REST API integrations, increasing processing throughput by <strong style={{ color: 'var(--accent)' }}>80%</strong> and reducing manual intervention.</li>
            </ul>
          </div>
          <div className="exp-item reveal">
            <div className="exp-date">MAY 2023 — JUL 2023</div>
            <div className="exp-role">Cloud Architect Intern</div>
            <div className="exp-company">AWS Academy (Remote)</div>
            <ul className="exp-bullets">
              <li>Architected AWS cloud solutions (EC2, S3, VPC) and optimised storage retrieval, reducing infrastructure costs by <strong style={{ color: 'var(--accent)' }}>15%</strong>.</li>
            </ul>
          </div>
          <div className="exp-item reveal">
            <div className="exp-date">DEC 2022 — FEB 2023</div>
            <div className="exp-role">Data Analytics Intern</div>
            <div className="exp-company">Alteryx Sparked (Remote)</div>
            <ul className="exp-bullets">
              <li>Automated end-to-end data pipelines with Alteryx and built Power BI dashboards, cutting processing time from multiple days to <strong style={{ color: 'var(--accent)' }}>under 1 hour</strong>.</li>
            </ul>
          </div>
          <div className="exp-item reveal">
            <div className="exp-date">SEPT 2021 — JAN 2022</div>
            <div className="exp-role">Java Developer Intern</div>
            <div className="exp-company">Affy Informatics, Gwalior</div>
            <ul className="exp-bullets">
              <li>Developed <strong style={{ color: 'var(--accent)' }}>10+ custom GUI components</strong> in Java Swing, streamlining data input workflows and improving average user productivity by <strong style={{ color: 'var(--accent)' }}>50%</strong>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── PROJECTS (with filter) ────────────────────────────────── */}
      <ProjectsSection />

      {/* ── SKILLS (no %, animated tabs) ─────────────────────────── */}
      <SkillsSection />

      {/* ── EDUCATION ─────────────────────────────────────────────── */}
      <section id="education">
        <div className="section-eyebrow">// 05 — Education</div>
        <h2 className="section-title">Academic<br />Background.</h2>
        <div className="section-rule"></div>
        <div className="edu-grid reveal">
          <div className="edu-card">
            <div className="edu-deg">M.TECH — INFORMATION TECHNOLOGY</div>
            <div className="edu-school">ABV-IIITM Gwalior</div>
            <div className="edu-field">Wireless Network and Computing</div>
            <div className="edu-meta"><span className="edu-badge cgpa">CGPA: 8.21</span><span className="edu-badge year">Aug 2024 – Present</span></div>
          </div>
          <div className="edu-card">
            <div className="edu-deg">B.TECH — COMPUTER SCIENCE</div>
            <div className="edu-school">ITM University Gwalior</div>
            <div className="edu-field">Data Science & Machine Learning</div>
            <div className="edu-meta"><span className="edu-badge cgpa">CGPA: 7.19</span><span className="edu-badge year">Aug 2020 – Jun 2024</span></div>
          </div>
        </div>
        <div className="section-eyebrow" style={{ marginTop: '48px', marginBottom: '8px' }}>// Achievements</div>
        <div className="achieve-grid reveal">
          <div className="achieve-card"><div className="achieve-icon">🏆</div><div><div className="achieve-title">GATE CS 2024 Qualified</div><div className="achieve-desc">Graduate Aptitude Test in Engineering — one of India's most competitive CS exams.</div></div></div>
          <div className="achieve-card"><div className="achieve-icon">⚡</div><div><div className="achieve-title">LeetCode 400+</div><div className="achieve-desc">Solved 400+ problems across DSA, algorithms, and dynamic programming.</div></div></div>
          <div className="achieve-card"><div className="achieve-icon">📊</div><div><div className="achieve-title">M.Tech CGPA 8.21</div><div className="achieve-desc">Strong academic performance at IIIT Gwalior in Wireless Network & Computing.</div></div></div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────── */}
      <section id="contact">
        <div className="section-eyebrow">// 06 — Contact</div>
        <h2 className="section-title">Let's Work<br />Together.</h2>
        <div className="section-rule"></div>
        <div className="contact-layout reveal">
          <div className="contact-intro">
            <p>I'm open to <strong style={{ color: 'var(--text)' }}>full-time roles, research collaborations, and freelance ML/data engineering work</strong>. Whether you have a project in mind or just want to talk tech — reach out anytime.</p>
            <p style={{ marginBottom: '28px' }}>I typically respond within 24 hours.</p>
            <div className="contact-links">
              <a href="mailto:tusharsharma20021114@gmail.com" className="contact-link">
                <span className="c-icon">📧</span>
                <div><div className="c-label">Email</div><span>tusharsharma20021114@gmail.com</span></div>
              </a>
              <a href="https://www.linkedin.com/in/tushar-sharma-4355051b5" target="_blank" rel="noreferrer" className="contact-link">
                <span className="c-icon">💼</span><div><div className="c-label">LinkedIn</div>TUSHAR</div>
              </a>
              <a href="https://github.com/tusharsharma20021114-rgb" target="_blank" rel="noreferrer" className="contact-link">
                <span className="c-icon">🐙</span><div><div className="c-label">GitHub</div>TUSHAR</div>
              </a>
              <a href="tel:+919669366748" className="contact-link">
                <span className="c-icon">📱</span><div><div className="c-label">Phone</div>+91 96693 66748</div>
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer>
        <span>© 2026 Tushar Sharma — ML Engineer & Data Scientist</span>
        <div className="f-links">
          <a href="https://github.com/tusharsharma20021114-rgb" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/tushar-sharma-4355051b5/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:tusharsharma20021114@gmail.com">Email</a>
          <a href="/hr" style={{ color: 'var(--muted)', opacity: 0.4, fontSize: '0.65rem' }}>HR Portal</a>
        </div>
      </footer>

      {/* ── AI CHAT WIDGET (floating) ─────────────────────────────── */}
      <AskMeWidget />
    </>
  );
}
