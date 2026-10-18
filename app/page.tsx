import { ArrowUpRight, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";

const EMAIL = "sourabhambarshetti@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/sourabh-ambarshetti";
const GITHUB = "https://github.com/sourabh-ambarshetti";
const MERIDIAN_REPO = "https://github.com/sourabh-ambarshetti/meridian-pulse";
const RESUME = "/Sourabh_Ambarshetti_Resume.pdf";

const stats = [
  { value: "7+ yrs", label: "Building production web and mobile apps" },
  { value: "10+", label: "Enterprise clients on one multi-tenant platform" },
  { value: "−77%", label: "Bulk quote processing time" },
  { value: "48h → 15m", label: "Loan verification turnaround" }
];

type Compare = { before: string; after: string; afterWidth: number; unit: string };

const caseStudies: Array<{
  title: string;
  context: string;
  problem: string;
  work: string;
  outcome: string;
  stack: string[];
  compare?: Compare;
  flowTitle: string;
  flow: string[];
}> = [
  {
    title: "Bulk Quote Engine",
    context: "PyxTech · Vendor pricing for Lenovo, HP, Dell",
    problem:
      "Vendors upload spreadsheets with 1,200+ rows to get price quotes. Processing took around 15 minutes and large files crashed the Node.js server with out-of-memory errors.",
    work:
      "Replaced whole-file parsing with stream-based chunking and a worker pool. While debugging, found that a bad sheet extent was producing 3,496 empty chunks that flooded the queue, and added bounds checks to drop them.",
    outcome:
      "Processing time down 77%, memory stays under 250 MB regardless of file size, and the out-of-memory crashes stopped.",
    stack: ["Node.js", "TypeScript", "Streams", "Worker pools", "MySQL"],
    compare: { before: "~15 min", after: "3.4 min", afterWidth: 23, unit: "Processing time, 1,200-row file" },
    flowTitle: "How it works now",
    flow: ["Vendor file", "Bounds check", "Stream into chunks", "Worker pool", "Bulk write"]
  },
  {
    title: "Multi-tenant pricing platform",
    context: "PyxTech · PyxFMV, PyxTrade, PyxQuote",
    problem:
      "Several enterprise clients needed to use the same pricing, trading and bidding platform without ever seeing each other's data or pricing logic.",
    work:
      "Designed the multi-tenant architecture with tenant-level data isolation, and built pricing, bidding, shipping and MRB dispute workflows across 3+ user roles. Added Redis caching for frequently read data.",
    outcome:
      "One platform serving 10+ enterprise clients including Lenovo, HP and Dell, with proprietary pricing logic kept protected.",
    stack: ["Angular 18", "Node.js", "MySQL", "Redis", "Microservices"],
    flowTitle: "Request path",
    flow: ["Client user", "Tenant resolved", "Shared services", "Tenant-scoped data"]
  },
  {
    title: "Loan Origination System",
    context: "Primus Techsystems · Client: Arthsetu Ventures",
    problem:
      "Loan applications were verified by hand: identity, KYC and credit checks took two days or more per applicant.",
    work:
      "Built a web and mobile loan app with Aadhaar, KYC and credit bureau integrations and a configurable eligibility rule engine, so business teams could change rules without code changes.",
    outcome:
      "Verification turnaround dropped from 48+ hours to under 15 minutes. The app is published on the Play Store and App Store.",
    stack: ["Angular 14", "Ionic 6", "Node.js", "MySQL", "KYC APIs"],
    compare: { before: "48+ hrs", after: "< 15 min", afterWidth: 3, unit: "Verification turnaround" },
    flowTitle: "Application flow",
    flow: ["Applicant", "Aadhaar + KYC", "Credit bureau", "Rule engine", "Decision"]
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
  { label: "Frontend", items: ["Angular 12–18", "TypeScript", "RxJS", "Ionic", "Angular Material"] },
  { label: "Backend", items: ["Node.js", "NestJS", "Express.js", "REST APIs", "Microservices"] },
  { label: "Data", items: ["MySQL", "MS SQL Server", "MongoDB", "Redis"] },
  { label: "AI integration", items: ["LLM APIs", "RAG", "Qdrant", "Function calling"] },
  { label: "Tooling", items: ["Docker", "AWS", "CI/CD", "Git"] }
];

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flow">
      {steps.map((s) => <li key={s}>{s}</li>)}
    </ol>
  );
}

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-name"><span className="mono">SA</span> Sourabh Ambarshetti</a>
          <nav className="nav-links">
            <a href="#work">Work</a>
            <a href="#project">Project</a>
            <a href="#experience">Experience</a>
            <a href={RESUME} target="_blank" rel="noopener noreferrer" className="nav-resume">Resume</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="status"><span className="dot" /> Open to senior full stack roles</p>
              <h1>
                Sourabh Ambarshetti
                <span>Senior Full Stack Engineer</span>
              </h1>
              <p className="lead">
                I&apos;ve spent 7+ years building Angular and Node.js products in enterprise SaaS and
                fintech. I like the hard parts: making slow systems fast, keeping client data separate,
                and getting large files through without crashing the server. Lately I&apos;ve been
                adding LLM features to full-stack apps.
              </p>
              <p className="meta"><MapPin size={15} /> Pune, India</p>
              <div className="links">
                <a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={16} /> Email me</a>
                <a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Resume</a>
                <a className="btn icon" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                <a className="btn icon" href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
              </div>
            </div>
            <div className="portrait">
              <img src="/sourabh.jpg" alt="Sourabh Ambarshetti" width={320} height={320} />
            </div>
          </div>

          <div className="wrap">
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
            <p className="clients">
              Delivered for <strong>Lenovo</strong> · <strong>HP</strong> · <strong>Dell</strong> ·{" "}
              <strong>Hitachi Astemo</strong> · <strong>Arthsetu Ventures</strong>
            </p>
          </div>
        </section>

        <section id="work" className="section wrap">
          <p className="kicker">Selected work</p>
          <h2>Problems I&apos;ve solved in production</h2>
          <div className="cases">
            {caseStudies.map((c, i) => (
              <article className="case" key={c.title}>
                <div className="case-text">
                  <span className="case-num">0{i + 1}</span>
                  <h3>{c.title}</h3>
                  <p className="context">{c.context}</p>
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
                </div>
                <div className="case-visual">
                  {c.compare ? (
                    <div className="compare">
                      <p className="visual-label">{c.compare.unit}</p>
                      <div className="bar-row">
                        <span>Before</span>
                        <div className="bar"><i className="before" style={{ width: "100%" }} /></div>
                        <b>{c.compare.before}</b>
                      </div>
                      <div className="bar-row">
                        <span>After</span>
                        <div className="bar"><i className="after" style={{ width: `${c.compare.afterWidth}%` }} /></div>
                        <b className="good">{c.compare.after}</b>
                      </div>
                    </div>
                  ) : (
                    <div className="tenants">
                      <p className="visual-label">Tenant isolation</p>
                      <div className="tenant-row">
                        {["Lenovo", "HP", "Dell", "+ more"].map((t) => <span key={t}>{t}</span>)}
                      </div>
                      <div className="tenant-core">One shared platform</div>
                      <div className="tenant-row data">
                        {["Data A", "Data B", "Data C", "…"].map((t) => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                  )}
                  <p className="visual-label">{c.flowTitle}</p>
                  <Flow steps={c.flow} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="project" className="section wrap">
          <p className="kicker">Side project · Open source</p>
          <h2>MeridianPulse: an AI assistant for employees</h2>
          <div className="project">
            <div>
              <p className="body">
                Employees ask HR and IT questions in plain language. The assistant answers policy
                questions from company documents using RAG, and can take actions such as checking
                leave balance, looking up an expense claim or raising a helpdesk ticket by calling
                backend functions. I built it on my day-to-day stack, NestJS and Angular, to learn
                how LLM features fit into a normal production app.
              </p>
              <ul className="points">
                <li>Document chunking, embeddings and vector search in Qdrant, with source citations in the answer.</li>
                <li>LLM function calling into NestJS services backed by MySQL and TypeORM.</li>
                <li>
                  Access control the model can&apos;t bypass: the model picks which tool to run, but the server
                  decides whose data, from the signed-in user&apos;s token. Asking about another employee returns nothing.
                </li>
                <li>Input guardrails for PII and prompt injection, model fallback on rate limits, and per-request token and cost tracking.</li>
                <li>An evaluation script that signs in as different employees and checks answers, tool calls and cross-employee data leaks.</li>
              </ul>
              <ul className="tags">
                {["NestJS", "Angular", "MySQL", "Qdrant", "Gemini API", "Docker"].map((s) => <li key={s}>{s}</li>)}
              </ul>
              <a className="text-link" href={MERIDIAN_REPO} target="_blank" rel="noopener noreferrer">
                View on GitHub <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="arch" aria-label="MeridianPulse architecture">
              <div className="arch-node">Angular chat UI</div>
              <div className="arch-arrow" />
              <div className="arch-group">
                <p className="visual-label">NestJS API</p>
                <div className="arch-node">Auth guard → guardrails: PII + injection</div>
                <div className="arch-split">
                  <div className="arch-node">RAG retrieval</div>
                  <div className="arch-node">Tool calls</div>
                </div>
              </div>
              <div className="arch-arrow" />
              <div className="arch-split three">
                <div className="arch-node store">Qdrant</div>
                <div className="arch-node store">Gemini</div>
                <div className="arch-node store">MySQL</div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section wrap">
          <p className="kicker">Experience</p>
          <h2>Where I&apos;ve worked</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.company}>
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
              </li>
            ))}
          </ol>
          <p className="edu">Education: MCA (2020), BCA (2017)</p>
        </section>

        <section className="section wrap">
          <p className="kicker">Skills</p>
          <h2>What I work with</h2>
          <div className="skills">
            {skills.map((s) => (
              <div className="skill-card" key={s.label}>
                <h3>{s.label}</h3>
                <ul className="tags">
                  {s.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="section wrap">
          <div className="contact">
            <h2>Let&apos;s talk</h2>
            <p className="body">
              I&apos;m looking for a senior full stack role. Email is the fastest way to reach me;
              I usually reply within a day.
            </p>
            <div className="links">
              <a className="btn primary" href={`mailto:${EMAIL}`}><Mail size={16} /> {EMAIL}</a>
              <a className="btn" href="tel:+918087434976">+91 80874 34976</a>
              <a className="btn" href={LINKEDIN} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap footer">© {new Date().getFullYear()} Sourabh Ambarshetti</footer>
    </>
  );
}
