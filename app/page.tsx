import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";

const EMAIL = "sourabhambarshetti@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/sourabh-ambarshetti";
const GITHUB = "https://github.com/sourabh-ambarshetti";
const MERIDIAN_REPO = GITHUB; // TODO: point to the MeridianPulse repo once it is public
const RESUME = "/Sourabh_Ambarshetti_Resume.pdf";

const caseStudies = [
  {
    title: "Bulk Quote Engine",
    context: "PyxTech · Vendor pricing for Lenovo, HP, Dell",
    result: "~15 min → 3.4 min",
    problem:
      "Vendors upload spreadsheets with 1,200+ rows to get price quotes. Processing took around 15 minutes and large files crashed the Node.js server with out-of-memory errors.",
    work:
      "Replaced whole-file parsing with stream-based chunking and a worker pool. While debugging, found that a bad sheet extent was producing 3,496 empty chunks that flooded the queue, and added bounds checks to drop them.",
    outcome:
      "Processing time down 77%, memory stays under 250 MB regardless of file size, and the out-of-memory crashes stopped.",
    stack: ["Node.js", "TypeScript", "Streams", "Worker pools", "MySQL"]
  },
  {
    title: "Multi-tenant pricing platform",
    context: "PyxTech · PyxFMV, PyxTrade, PyxQuote",
    result: "10+ enterprise clients",
    problem:
      "Several enterprise clients needed to use the same pricing, trading and bidding platform without ever seeing each other's data or pricing logic.",
    work:
      "Designed the multi-tenant architecture with tenant-level data isolation, and built pricing, bidding, shipping and MRB dispute workflows across 3+ user roles. Added Redis caching for frequently read data.",
    outcome:
      "One platform serving 10+ enterprise clients including Lenovo, HP and Dell, with proprietary pricing logic kept protected.",
    stack: ["Angular 18", "Node.js", "MySQL", "Redis", "Microservices"]
  },
  {
    title: "Loan Origination System",
    context: "Primus Techsystems · Client: Arthsetu Ventures",
    result: "48 hrs → under 15 min",
    problem:
      "Loan applications were verified by hand: identity, KYC and credit checks took two days or more per applicant.",
    work:
      "Built a web and mobile loan app with Aadhaar, KYC and credit bureau integrations and a configurable eligibility rule engine, so business teams could change rules without code changes.",
    outcome:
      "Verification turnaround dropped from 48+ hours to under 15 minutes. The app is published on the Play Store and App Store.",
    stack: ["Angular 14", "Ionic 6", "Node.js", "MySQL", "KYC APIs"]
  }
];

const experience = [
  {
    role: "Senior Full Stack Developer",
    company: "PyxTech Pvt. Ltd.",
    dates: "Oct 2024 – Present",
    points: [
      "Build pricing, trading and vendor bidding platforms for the US refurbished electronics market.",
      "Own the multi-tenant architecture and the Bulk Quote Engine; mentor 3+ developers."
    ]
  },
  {
    role: "Senior Full Stack Developer",
    company: "CodeNgine Technologies Pvt. Ltd.",
    dates: "Sep 2023 – Oct 2024",
    points: [
      "Built Angular and Node.js applications (Express.js, LoopBack 3, MongoDB, MySQL); improved key page load and API response times by 20%+.",
      "Led code reviews for a team of 5+ developers."
    ]
  },
  {
    role: "Senior Software Engineer",
    company: "Primus Techsystems Pvt. Ltd.",
    dates: "Jun 2019 – Sep 2023",
    points: [
      "Joined as an intern and grew to Senior Software Engineer, delivering 8+ client projects in fintech, manufacturing and construction.",
      "Hitachi Astemo dealer management system used by 200+ dealers (92% fewer inventory allocation errors), its Ionic catalogue app, and a construction management system for SCON Projects."
    ]
  }
];

const skills = [
  { label: "Frontend", items: "Angular (12–18), TypeScript, RxJS, Ionic, Angular Material" },
  { label: "Backend", items: "Node.js, NestJS, Express.js, REST APIs, microservices" },
  { label: "Data", items: "MySQL, MS SQL Server, MongoDB, Redis" },
  { label: "AI", items: "LLM APIs, RAG, vector search (Qdrant), function calling" },
  { label: "Tooling", items: "Jest, Jasmine/Karma, Docker, AWS, CI/CD, Git" }
];

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-name">Sourabh Ambarshetti</a>
          <nav className="nav-links">
            <a href="#work">Work</a>
            <a href="#project">Project</a>
            <a href="#experience">Experience</a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="nav-resume">Resume</a>
          </nav>
        </div>
      </header>

      <main id="top" className="wrap">
        <section className="hero">
          <img src="/sourabh.jpg" alt="Sourabh Ambarshetti" className="avatar" width={88} height={88} />
          <h1>Sourabh Ambarshetti</h1>
          <p className="title">Senior Full Stack Engineer · Angular, Node.js, TypeScript</p>
          <p className="lead">
            I&apos;ve spent 7+ years building web and mobile products in enterprise SaaS and fintech.
            I like the hard parts: making slow systems fast, keeping client data separate, and
            getting large files through without crashing the server. Lately I&apos;ve been adding
            LLM features to full-stack apps.
          </p>
          <p className="meta">Pune, India · Open to senior full stack roles</p>
          <div className="links">
            <a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={16} /> Email me</a>
            <a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Resume</a>
            <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
            <a className="btn" href={GITHUB} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>
          </div>
        </section>

        <section id="work" className="section">
          <h2>Selected work</h2>
          <div className="cases">
            {caseStudies.map((c) => (
              <article className="card" key={c.title}>
                <div className="card-head">
                  <div>
                    <h3>{c.title}</h3>
                    <p className="context">{c.context}</p>
                  </div>
                  <span className="result">{c.result}</span>
                </div>
                <dl className="story">
                  <dt>Problem</dt>
                  <dd>{c.problem}</dd>
                  <dt>What I did</dt>
                  <dd>{c.work}</dd>
                  <dt>Result</dt>
                  <dd>{c.outcome}</dd>
                </dl>
                <ul className="tags">
                  {c.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="project" className="section">
          <h2>Side project</h2>
          <article className="card">
            <div className="card-head">
              <div>
                <h3>MeridianPulse</h3>
                <p className="context">AI assistant for employee HR and IT questions · In progress</p>
              </div>
            </div>
            <p className="body">
              Employees ask questions in plain language. The assistant answers policy questions
              from company documents using RAG, and can take actions such as checking leave
              balance, looking up an expense claim or raising a helpdesk ticket by calling backend
              functions. I built it on my day-to-day stack, NestJS and Angular, to learn how LLM
              features fit into a normal production app.
            </p>
            <ul className="points">
              <li>Document chunking, embeddings and vector search in Qdrant, with source citations in the answer.</li>
              <li>LLM function calling into NestJS services backed by MySQL and TypeORM.</li>
              <li>Input guardrails for PII and prompt injection, model fallback on rate limits, and per-request token and cost tracking.</li>
            </ul>
            <ul className="tags">
              {["NestJS", "Angular", "MySQL", "Qdrant", "Gemini API", "Docker"].map((s) => <li key={s}>{s}</li>)}
            </ul>
            <a className="text-link" href={MERIDIAN_REPO} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowUpRight size={14} />
            </a>
          </article>
        </section>

        <section id="experience" className="section">
          <h2>Experience</h2>
          <div className="timeline">
            {experience.map((e) => (
              <div className="job" key={e.company}>
                <div className="job-head">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="context">{e.company}</p>
                  </div>
                  <span className="dates">{e.dates}</span>
                </div>
                <ul className="points">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="edu">Education: MCA (2020), BCA (2017)</p>
        </section>

        <section className="section">
          <h2>Skills</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section contact">
          <h2>Get in touch</h2>
          <p className="body">
            The fastest way to reach me is email. I usually reply within a day.
          </p>
          <div className="links">
            <a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a>
            <a className="btn" href="tel:+918087434976">+91 80874 34976</a>
          </div>
        </section>
      </main>

      <footer className="wrap footer">© {new Date().getFullYear()} Sourabh Ambarshetti</footer>
    </>
  );
}
