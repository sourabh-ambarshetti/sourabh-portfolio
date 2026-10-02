"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Linkedin,
  Mail,
  FileText,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Zap,
  Sparkles,
  Server,
  Database,
  Layers,
  ShieldCheck,
  Building2,
  Terminal,
  Activity,
  UserCheck,
  ExternalLink,
  AlertCircle,
  Menu,
  X,
  ArrowRight,
  Code2,
  Cpu,
  Phone,
  GraduationCap,
  Smartphone
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  category: "Performance" | "Enterprise SaaS" | "Fintech";
  clientContext: string;
  metricBadge: string;
  metricColor: "emerald" | "indigo" | "amber";
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  pipelineSteps?: Array<{
    step: string;
    title: string;
    desc: string;
    stat: string;
  }>;
  deepDiveArchitecture: string[];
  tradeOffs: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "bulk-quote",
    title: "High-Throughput Bulk Quote Engine & Memory Optimization",
    category: "Performance",
    clientContext: "PyxTech · Enterprise Vendor Workflows (Lenovo, HP, Dell)",
    metricBadge: "⚡ 15 min → 3.4 min (-77% Latency)",
    metricColor: "emerald",
    problem:
      "Enterprise vendor spreadsheets with 1,200+ multi-sheet rows routinely triggered Node.js heap out-of-memory crashes and took over 15 minutes to process. Furthermore, corrupted worksheet extent markers generated 3,496 unexpected empty chunks, saturating worker queues.",
    solution:
      "Re-architected ingestion from monolithic in-memory parsing to stream-based chunking with bounded worker concurrency. Implemented defensive spatial bounds checks to detect and discard phantom empty cells before memory allocation, paired with batch transactional upserts.",
    impact:
      "Achieved a 77% latency reduction (dropped from ~15 minutes to 3.4 minutes) and eliminated 100% of out-of-memory crash spikes across thousands of tenant quote jobs.",
    tags: ["Node.js", "TypeScript", "Stream Processing", "Memory Profiling", "ExcelJS", "Worker Pools"],
    pipelineSteps: [
      {
        step: "01",
        title: "Defensive Bounds Check",
        desc: "Sanitizes sheet coordinate extents, pruning 3,496 phantom empty cells created by vendor exports.",
        stat: "Zero phantom allocations"
      },
      {
        step: "02",
        title: "Stream Chunking",
        desc: "Streams rows asynchronously into deterministic 100-row chunks instead of loading complete sheets into RAM.",
        stat: "Memory capped <250MB"
      },
      {
        step: "03",
        title: "Worker Pool Dispatch",
        desc: "Distributes chunks across non-blocking worker threads to prevent Node event-loop starvation.",
        stat: "4x parallel throughput"
      },
      {
        step: "04",
        title: "Batch Transactional Commit",
        desc: "Performs bulk upserts with isolated rollback safeguards to protect database integrity.",
        stat: "ACID compliance guaranteed"
      }
    ],
    deepDiveArchitecture: [
      "Replaced synchronous in-memory workbook parsing with event-driven row streaming, capping V8 memory consumption under 250MB regardless of file size.",
      "Engineered defensive coordinate bounds validation to prune 3,496 phantom rows created by legacy vendor spreadsheet software.",
      "Partitioned row batches into deterministic transactional chunks with automated rollback to safeguard catalog integrity during partial ingest failures."
    ],
    tradeOffs:
      "Chose asynchronous worker-queue chunking over a synchronous blocking API. This added minor job coordination complexity but eliminated event loop blocking and guaranteed sub-second response times for concurrent web users."
  },
  {
    id: "product-upload",
    title: "Multi-Tenant Enterprise Product Ingestion & Dynamic Schema Engine",
    category: "Enterprise SaaS",
    clientContext: "CXTEC & Enterprise Partners · Catalog Engineering",
    metricBadge: "🛡️ Zero Data Ingestion Errors at Scale",
    metricColor: "indigo",
    problem:
      "Onboarding high-volume enterprise hardware catalogs required supporting heterogeneous, tenant-specific dynamic attributes without corrupting core transactional schemas or violating strict QA/UAT delivery SLAs.",
    solution:
      "Designed a dynamic attribute metadata mapping engine with isolated staging tables. Built automated schema verification middleware with validation checkpoints and automated rollback triggers for malformed client payloads.",
    impact:
      "Reduced enterprise vendor catalog onboarding time from multiple days of manual sanitization to under 2 hours, maintaining 100% schema integrity across thousands of product lines.",
    tags: ["Node.js", "Angular", "Dynamic Schemas", "SQL", "QA/UAT Delivery", "ETL Pipelines"],
    deepDiveArchitecture: [
      "Engineered an extensible attribute registry allowing enterprise partners to define custom SKU specifications without requiring database migrations.",
      "Implemented a two-tier validation pipeline: syntactic schema verification at edge, followed by relational foreign-key and business constraint checks in staging.",
      "Established comprehensive automated regression test suites to guarantee backward compatibility across frequent catalog releases."
    ],
    tradeOffs:
      "Selected an isolated staging-table architecture instead of direct-to-production upserts. This incurred a slight storage overhead but prevented corrupt third-party data from ever polluting production inventory."
  },
  {
    id: "loan-origination",
    title: "Bank-Grade Loan Origination & Automated Verification Pipeline",
    category: "Fintech",
    clientContext: "Arthsetu Ventures Pvt. Ltd. · Fintech Loan Origination (LOS)",
    metricBadge: "⏱️ 48 hrs → 15 min Turnaround",
    metricColor: "emerald",
    problem:
      "Manual KYC, multi-party credit checks, and identity validation caused loan approval cycles to take 48-72 hours with high applicant drop-off rates and desynchronization between third-party bureaus and internal ledgers.",
    solution:
      "Architected an asynchronous orchestration pipeline integrating identity verification (Aadhaar/PAN KYC) and credit bureau APIs with resilient exponential backoff, circuit breakers, and webhook reconciliations. Engineered a custom Loan Eligibility Rule Engine and deployed cross-platform mobile apps.",
    impact:
      "Cut loan verification turnaround from 48+ hours to sub-15 minutes while maintaining 99.9% pipeline reliability and full regulatory audit trails. Successfully published to Android Play Store and iOS App Store.",
    tags: ["Angular 14", "Ionic 6", "Node.js", "MySQL", "Aadhaar / KYC APIs", "Credit Bureau APIs", "Play Store & App Store"],
    deepDiveArchitecture: [
      "Engineered fault-tolerant third-party API adapters with circuit breakers to prevent credit bureau outages from cascading into core lending services.",
      "Implemented idempotent webhook consumers with cryptographic payload verification to guarantee zero duplicate loan dispatches.",
      "Built tamper-evident audit logging for every verification checkpoint to comply with financial regulatory standards.",
      "Packaged and deployed cross-platform native-hybrid builds to Google Play Store and Apple App Store."
    ],
    tradeOffs:
      "Employed an asynchronous event-driven workflow with state machine polling rather than synchronous blocking calls, ensuring mobile client responsiveness on low-bandwidth field connections."
  },
  {
    id: "dealer-mgmt",
    title: "Distributed Dealer Management & Real-Time Inventory ERP",
    category: "Enterprise SaaS",
    clientContext: "Hitachi Astemo Pvt. Ltd. · Automotive Dealer ERP & Analytics",
    metricBadge: "📉 92% Inventory Discrepancy Reduction",
    metricColor: "amber",
    problem:
      "Disconnected multi-branch dealerships suffered from stale stock allocations, duplicate order reservations, and delayed sales telemetry across regional franchise hubs.",
    solution:
      "Developed a centralized event-driven inventory tracking system with pessimistic row locking for concurrent order reservations, live performance telemetry, automated multi-channel notification dispatchers, and mobile product catalog applications.",
    impact:
      "Synchronized real-time stock availability across Hitachi Astemo dealerships, cutting inventory allocation discrepancies by 92% and accelerating replenishment turnaround.",
    tags: ["Angular 12", "Node.js", "MS SQL", "Ionic", "Angular Material", "SMS Gateway", "Concurrency Control"],
    deepDiveArchitecture: [
      "Engineered transactional row-level locking for inventory reservations to prevent race conditions during high-volume vehicle allocation cycles.",
      "Constructed indexed materialized views in MS SQL to deliver sub-100ms dashboard analytics for regional dealership managers.",
      "Integrated decoupled message queues for SMS and email order notifications, protecting core transaction throughput from external gateway latency.",
      "Built companion Product Catalogue mobile applications using Ionic and deployed across iOS and Android."
    ],
    tradeOffs:
      "Used pessimistic row locks on active reservation carts rather than optimistic locking to eliminate checkout collisions during peak allocation windows."
  },
  {
    id: "construction-mgmt",
    title: "Enterprise Construction Progress & Budget Tracking ERP",
    category: "Enterprise SaaS",
    clientContext: "SCON Projects Pvt. Ltd. · Infrastructure & Real Estate ERP",
    metricBadge: "🏗️ 100% Digitized Site Progress & Budget Tracking",
    metricColor: "indigo",
    problem:
      "Managing decentralized construction sites, worker KYC, contractor procurement, and budget tracking was siloed across manual records, phone calls, and uncoordinated spreadsheets.",
    solution:
      "Engineered an end-to-end web ERP from scratch with site status telemetry, digital KYC verification, real-time milestone progress tracking, and automated budget variance monitoring.",
    impact:
      "Automated site oversight and contractor budget reconciliation across active infrastructure projects, eliminating manual reporting latency.",
    tags: ["Angular 14", "Node.js", "MS SQL", "KYC Integrations", "Budget Tracking", "Site Progress Telemetry"],
    deepDiveArchitecture: [
      "Constructed granular role-based access control (RBAC) for site engineers, contractors, and project directors.",
      "Engineered milestone-driven budget tracking with automated variance calculation against estimated costs.",
      "Integrated document and KYC verification pipelines for subcontractor on-boarding."
    ],
    tradeOffs:
      "Implemented transactional database constraints to strictly enforce milestone approvals before releasing procurement budget allocations."
  }
];

const appliedAIProjects = [
  {
    title: "Enterprise Knowledge Assistant (Production RAG Architecture)",
    focus: "Hybrid Retrieval & Grounded Q&A",
    status: "Active Engineering / FDE Architecture",
    description:
      "A production-grade Retrieval-Augmented Generation system designed for enterprise documentation. Features semantic chunking, dense vector retrieval with pgvector, BM25 hybrid reranking, and citation provenance.",
    architecturePoints: [
      "Multi-stage ingestion: PDF/Doc parsing, semantic chunking, and metadata tagging for strict tenant isolation.",
      "Hybrid retrieval combining dense embeddings with sparse BM25 scoring for domain-specific terminology.",
      "RAG Triad evaluation metrics (Context Relevance, Groundedness, Answer Relevance) to detect and eliminate hallucinations."
    ],
    tags: ["Python", "FastAPI", "pgvector", "RAG", "Embeddings", "Ragas Eval"]
  },
  {
    title: "Deterministic Autonomous Support Agent",
    focus: "Tool Calling & Safety Guardrails",
    status: "Active Engineering / FDE Architecture",
    description:
      "A controlled agentic workflow with structured tool-dispatch protocols. Incorporates Pydantic schema validation, sandboxed execution, human-in-the-loop approval gates for destructive database actions, and comprehensive audit telemetry.",
    architecturePoints: [
      "Deterministic state-machine execution loop preventing runaway LLM cycles and infinite tool calls.",
      "Strict JSON schema enforcement and prompt injection filtering before dispatching internal API mutations.",
      "Human-in-the-loop escalation paths for sensitive account modifications and financial transactions."
    ],
    tags: ["Python", "Pydantic", "Tool Calling", "AI Security", "LangGraph", "FastAPI"]
  }
];

const experiences = [
  {
    date: "Oct 2024 — Present",
    title: "Senior Full Stack Developer",
    company: "PyxTech Pvt. Ltd.",
    location: "Pune, India",
    summary:
      "Architecting enterprise SaaS platforms powering FMV-driven pricing (PyxFMV), trading (PyxTrade), and vendor bidding (PyxQuote) for the US refurbished electronics market, serving Fortune 500 partners including Lenovo, HP, and Dell.",
    highlights: [
      "Built and scaled multi-tenant SaaS architecture for enterprise partners (Lenovo, HP, Dell) with isolated tenant data segregation and secure role-based access.",
      "Engineered Bulk Quote Engine to automate high-volume pricing workflows, introducing stream chunking and worker parallelization to cut latency from ~15 minutes down to 3.4 minutes (-77%).",
      "Diagnosed and patched an unconstrained Excel extent issue that produced 3,496 unexpected phantom chunks, safeguarding server heap memory.",
      "Delivered end-to-end pricing, vendor bidding, shipping logistics, and MRB dispute resolution workflows while collaborating with enterprise stakeholders and QA/UAT teams."
    ]
  },
  {
    date: "Sep 2023 — Oct 2024",
    title: "Senior Full Stack Developer (MEAN Stack)",
    company: "CodeNgine Technologies Pvt. Ltd.",
    location: "Pune, India",
    summary:
      "Led MEAN-stack application architecture and backend REST services using Angular, Node.js, Express.js, LoopBack 3, MongoDB, and MySQL.",
    highlights: [
      "Designed scalable, modular microservices and backend services, significantly improving API throughput, system maintainability, and response times.",
      "Established comprehensive engineering documentation standards to accelerate developer onboarding and cross-pod knowledge transfer.",
      "Applied clean architecture principles and design patterns to streamline feature releases, conducting thorough code reviews and mentoring junior developers."
    ]
  },
  {
    date: "Oct 2019 — Sep 2023 · 4.4 Yrs",
    title: "Senior Software Engineer (Promoted from Intern)",
    company: "Primus Techsystems Pvt. Ltd.",
    location: "Pune, India",
    summary:
      "Built and deployed mission-critical web and mobile applications across Fintech (Arthsetu Ventures LOS), Automotive Dealerships (Hitachi Astemo), and Construction (SCON Projects).",
    highlights: [
      "Engineered the Arthsetu Ventures Loan Origination System (LOS) from scratch with Aadhaar KYC, Credit Bureau scoring, and Loan Eligibility Rule Engine; deployed cross-platform mobile apps to Android Play Store & iOS App Store.",
      "Architected the Hitachi Astemo Dealer Management System and companion Product Catalogue mobile apps, synchronizing multi-branch inventory and sales analytics.",
      "Developed an end-to-end Construction Management ERP for SCON Projects with milestone progress tracking, contractor KYC, and budget variance monitoring.",
      "Progressed from Intern Software Developer (Jun 2019 – Aug 2019) to Senior Software Engineer, leading peer reviews, implementing security standards, and resolving critical production escalations."
    ]
  }
];

const competencies = [
  {
    icon: Server,
    title: "Defensive Backend Architecture",
    description:
      "Designing fault-tolerant Node.js & TypeScript microservices, worker thread pools, and stream processors that gracefully survive malformed inputs and traffic surges."
  },
  {
    icon: Database,
    title: "Data Integrity & Performance",
    description:
      "Advanced relational data modeling (PostgreSQL, MySQL, MS SQL), transaction isolation, indexing strategies, and stream-based ETL pipelines that eliminate memory leaks."
  },
  {
    icon: Sparkles,
    title: "Applied AI & Agent Systems",
    description:
      "Building production-ready RAG architectures, hybrid vector retrieval, structured Pydantic tool-calling pipelines, and hallucination evaluation frameworks."
  },
  {
    icon: UserCheck,
    title: "Forward Deployed Mindset",
    description:
      "Translating ambiguous enterprise client requirements (Lenovo, Dell, HP) into robust technical specifications, production code, and zero-defect QA/UAT rollouts."
  },
  {
    icon: Layers,
    title: "Enterprise SaaS & APIs",
    description:
      "End-to-end delivery of pricing engines, vendor bidding portals, and fintech verification workflows with secure webhook reconciliation and circuit breakers."
  },
  {
    icon: ShieldCheck,
    title: "Resilience & Security",
    description:
      "Defensive validation boundaries, sanitization of untrusted spreadsheet/JSON payloads, tamper-evident audit logging, and zero-trust API security."
  }
];

interface SkillGroup {
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colorClass: string;
  dotColor: string;
  skills: Array<{ name: string; primary?: boolean }>;
}

const skillGroups: SkillGroup[] = [
  {
    category: "Backend & Systems",
    icon: Server,
    colorClass: "text-indigo-400",
    dotColor: "#6366f1",
    skills: [
      { name: "Node.js (v18/v20)", primary: true },
      { name: "TypeScript", primary: true },
      { name: "Express.js", primary: true },
      { name: "NestJS" },
      { name: "REST APIs & Webhooks", primary: true },
      { name: "Worker Threads & Concurrency", primary: true },
      { name: "Stream Processing & Chunking", primary: true },
      { name: "Microservices Architecture" }
    ]
  },
  {
    category: "Data & Persistence",
    icon: Database,
    colorClass: "text-emerald-400",
    dotColor: "#10b981",
    skills: [
      { name: "PostgreSQL", primary: true },
      { name: "MS SQL Server", primary: true },
      { name: "MySQL", primary: true },
      { name: "MongoDB" },
      { name: "Query Tuning & Index Optimization", primary: true },
      { name: "ACID Transactions & Row Locking", primary: true },
      { name: "ExcelJS / Bulk Data ETL", primary: true },
      { name: "Relational Data Modeling" }
    ]
  },
  {
    category: "Applied AI & LLM Systems",
    icon: Sparkles,
    colorClass: "text-indigo-400",
    dotColor: "#818cf8",
    skills: [
      { name: "Python", primary: true },
      { name: "FastAPI", primary: true },
      { name: "RAG Architectures", primary: true },
      { name: "pgvector & Embeddings", primary: true },
      { name: "Deterministic Tool Calling", primary: true },
      { name: "Pydantic Schema Validation", primary: true },
      { name: "Semantic Chunking & BM25" },
      { name: "Ragas Hallucination Eval" }
    ]
  },
  {
    category: "Frontend Engineering",
    icon: Layers,
    colorClass: "text-teal-400",
    dotColor: "#14b8a6",
    skills: [
      { name: "Angular (v12, v14, v18)", primary: true },
      { name: "RxJS & Reactive Streams", primary: true },
      { name: "Ionic (Mobile Hybrid)", primary: true },
      { name: "Angular Material" },
      { name: "React & Next.js" },
      { name: "Tailwind CSS" },
      { name: "State Management" }
    ]
  },
  {
    category: "Architecture & Resilience",
    icon: ShieldCheck,
    colorClass: "text-amber-400",
    dotColor: "#f59e0b",
    skills: [
      { name: "Defensive Programming", primary: true },
      { name: "Circuit Breakers", primary: true },
      { name: "Exponential Backoff & Retries" },
      { name: "Idempotent API Design", primary: true },
      { name: "V8 Heap Memory Profiling", primary: true },
      { name: "Zero Data Corruption Guarantees" }
    ]
  },
  {
    category: "Enterprise Delivery & DevOps",
    icon: UserCheck,
    colorClass: "text-blue-400",
    dotColor: "#38bdf8",
    skills: [
      { name: "Lenovo, HP, Dell Alignment", primary: true },
      { name: "AWS (EC2, S3, RDS)" },
      { name: "Docker & Containerization", primary: true },
      { name: "CI/CD Pipelines" },
      { name: "Git & Version Control" },
      { name: "QA / UAT Staging Verification", primary: true },
      { name: "Technical Documentation" }
    ]
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("bulk-quote");
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCaseStudies =
    activeCategory === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.category === activeCategory);

  const filteredSkillGroups =
    skillCategoryFilter === "All"
      ? skillGroups
      : skillGroups.filter((g) => g.category === skillCategoryFilter);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sourabhambarshetti@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+918087434976");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2400);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navigation */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#" className="logo">
            <span className="logo-symbol">SA</span>
            Sourabh Ambarshetti
            <span className="logo-badge">Senior Full Stack · FDE</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="navlinks">
            <a href="#case-studies">Case Studies</a>
            <a href="#ai">Applied AI</a>
            <a href="#experience">Experience</a>
            <a href="#architecture">Architecture</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>

          {/* Nav Actions */}
          <div className="nav-actions">
            <a
              className="btn"
              style={{ padding: "8px 14px", fontSize: "0.84rem", minHeight: 38 }}
              href="/Sourabh_Ambarshetti_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText size={15} /> Resume
            </a>
            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#case-studies" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Problem-Solving Case Studies</span>
            <ArrowRight size={16} />
          </a>
          <a href="#ai" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Applied AI & Agent Systems</span>
            <ArrowRight size={16} />
          </a>
          <a href="#experience" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Career Experience</span>
            <ArrowRight size={16} />
          </a>
          <a href="#architecture" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Architecture & Competencies</span>
            <ArrowRight size={16} />
          </a>
          <a href="#skills" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Technical Stack</span>
            <ArrowRight size={16} />
          </a>
          <a href="#education" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Education & Credentials</span>
            <ArrowRight size={16} />
          </a>
          <a href="#contact" className="mobile-nav-link" onClick={closeMobileMenu}>
            <span>Contact & Availability</span>
            <ArrowRight size={16} />
          </a>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px", flexDirection: "column" }}>
            <button className="btn primary" onClick={handleCopyEmail} style={{ width: "100%" }}>
              {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
              {copiedEmail ? "Copied sourabhambarshetti@gmail.com" : "Copy Email"}
            </button>
            <a
              className="btn"
              href="/Sourabh_Ambarshetti_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <FileText size={16} /> Download Resume (PDF)
            </a>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              {/* Left Column: Core Positioning */}
              <div>
                <div className="status-pill">
                  <span className="status-dot"></span>
                  Open to Senior Full Stack & Forward Deployed Engineering Roles
                </div>
                <h1>Architecting Reliable Enterprise Systems & Applied AI.</h1>
                <p className="hero-lead">
                  <strong>7+ years of production experience</strong> engineering high-throughput
                  backends, asynchronous streaming pipelines, and mission-critical SaaS platforms for clients
                  like <strong>Lenovo, HP, and Dell</strong>. Combining deep backend reliability with
                  production Applied AI agent architectures.
                </p>

                <div className="ctas">
                  <a className="btn primary" href="#case-studies">
                    Explore Problem-Solving Case Studies <ArrowUpRight size={16} />
                  </a>
                  <a className="btn" href="/Sourabh_Ambarshetti_Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <FileText size={16} /> View Resume
                  </a>
                  <button className="btn" onClick={handleCopyEmail}>
                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    {copiedEmail ? "Email Copied!" : "Copy Email"}
                  </button>
                  <a className="btn" href="https://www.linkedin.com/in/sourabh-a-b5b64b150" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Right Column: Profile & Credibility Card */}
              <div className="profile-card">
                <div className="profile-header">
                  <div className="avatar-wrapper">
                    <div className="avatar-inner">
                      {/* Displays public/sourabh.jpg with seamless fallback to monogram */}
                      <img
                        src="/sourabh.jpg"
                        alt="Sourabh Ambarshetti"
                        className="avatar-img"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                          const fallback = (e.target as HTMLElement).parentElement?.querySelector(
                            ".avatar-fallback"
                          ) as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="avatar-fallback" style={{ display: "none" }}>
                        SA
                      </div>
                    </div>
                    <span className="avatar-status-badge" title="Active & Available" />
                  </div>
                  <div className="profile-info">
                    <h3>Sourabh Ambarshetti</h3>
                    <p>Senior Full Stack Engineer · Pune, India</p>
                  </div>
                </div>

                <div className="profile-meta-list">
                  <div className="profile-meta-item">
                    <span className="profile-meta-label">Experience</span>
                    <span className="profile-meta-val">7+ Years Enterprise</span>
                  </div>
                  <div className="profile-meta-item">
                    <span className="profile-meta-label">Current Role</span>
                    <span className="profile-meta-val">Sr. Full Stack @ PyxTech</span>
                  </div>
                  <div className="profile-meta-item">
                    <span className="profile-meta-label">Enterprise Clients</span>
                    <span className="profile-meta-val">Lenovo · HP · Dell · Hitachi Astemo</span>
                  </div>
                  <div className="profile-meta-item">
                    <span className="profile-meta-label">Education</span>
                    <span className="profile-meta-val">MCA (2020) · BCA (2017)</span>
                  </div>
                  <div className="profile-meta-item">
                    <span className="profile-meta-label">Target Role</span>
                    <span className="profile-meta-val text-indigo-400 font-semibold">
                      Forward Deployed Engineer / Staff Backend
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--text-dim)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      fontWeight: 700
                    }}
                  >
                    Core Architecture Strengths
                  </div>
                  <div className="profile-focus-tags">
                    <span className="profile-focus-tag">Distributed Backends</span>
                    <span className="profile-focus-tag">Stream Chunking</span>
                    <span className="profile-focus-tag">PostgreSQL / SQL</span>
                    <span className="profile-focus-tag">Applied AI & RAG</span>
                    <span className="profile-focus-tag">FastAPI & Python</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Impact Metrics Banner */}
            <div className="stats-banner">
              <div className="stat-item">
                <span className="stat-number">7+ Years</span>
                <span className="stat-label">Enterprise software & system delivery</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">-77%</span>
                <span className="stat-label">Latency cut on 1,200-row quote pipelines</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3,496</span>
                <span className="stat-label">Phantom chunk faults diagnosed & isolated</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Production uptime across mission-critical APIs</span>
              </div>
            </div>

            {/* Quick Skills At-A-Glance Bar */}
            <div className="quick-stack-bar">
              <div className="quick-stack-label">
                <Code2 size={15} className="text-indigo-400" />
                <span>Primary Stack at a Glance:</span>
              </div>
              <div className="quick-stack-chips">
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#6366f1" }} />
                  Node.js & TypeScript
                </span>
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#10b981" }} />
                  PostgreSQL & MS SQL
                </span>
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#818cf8" }} />
                  Python & FastAPI
                </span>
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#06b6d4" }} />
                  RAG & Vector Search
                </span>
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#f59e0b" }} />
                  Angular (12-18) & RxJS
                </span>
                <span className="skill-chip primary">
                  <span className="skill-chip-dot" style={{ background: "#38bdf8" }} />
                  AWS & Docker
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Problem Solving Case Studies */}
        <section id="case-studies" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <Terminal size={14} /> Problem-Solving Case Studies
                </div>
                <h2>Engineering challenges I have solved.</h2>
              </div>
              <p className="section-subtitle">
                Real production problems presented with architectural context, root cause diagnosis,
                trade-offs, and measurable outcomes.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="filter-bar">
              {["All", "Performance", "Enterprise SaaS", "Fintech"].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Case Studies Grid */}
            <div className="case-study-grid">
              {filteredCaseStudies.map((study) => (
                <article className="case-study-card" key={study.id}>
                  <div className="case-study-header">
                    <div className="case-study-title-group">
                      <div className="case-study-client">{study.clientContext}</div>
                      <h3>{study.title}</h3>
                    </div>
                    <div
                      className={`metric-pill ${
                        study.metricColor === "emerald"
                          ? ""
                          : study.metricColor === "indigo"
                          ? "indigo"
                          : "amber"
                      }`}
                    >
                      {study.metricBadge}
                    </div>
                  </div>

                  {/* Problem vs Architectural Solution Grid */}
                  <div className="problem-solution-box">
                    <div className="ps-column">
                      <span className="ps-heading problem">
                        <AlertCircle size={14} /> The Problem & Bottleneck
                      </span>
                      <p className="ps-text">{study.problem}</p>
                    </div>
                    <div className="ps-column">
                      <span className="ps-heading solution">
                        <Zap size={14} /> Architectural Solution
                      </span>
                      <p className="ps-text">{study.solution}</p>
                    </div>
                  </div>

                  {/* Interactive Pipeline Steps (if available) */}
                  {study.pipelineSteps && (
                    <div className="pipeline-box">
                      <div className="pipeline-header">
                        <span className="kicker" style={{ margin: 0 }}>
                          <Cpu size={14} /> Architectural Ingestion Pipeline (Click steps to inspect)
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          Throughput: 1,200 rows in 3.4 mins
                        </span>
                      </div>
                      <div className="pipeline-steps">
                        {study.pipelineSteps.map((step, idx) => (
                          <div
                            key={step.step}
                            className={`pipeline-step ${activePipelineStep === idx ? "active" : ""}`}
                            onClick={() => setActivePipelineStep(idx)}
                          >
                            <div className="pipeline-step-badge">Stage {step.step}</div>
                            <div className="pipeline-step-title">{step.title}</div>
                            <div className="pipeline-step-desc">{step.desc}</div>
                            <div style={{ marginTop: 8, fontSize: "0.72rem", color: "var(--emerald-light)", fontWeight: 600 }}>
                              ✓ {step.stat}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Measurable Impact Banner */}
                  <div className="impact-row">
                    <Activity size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Business & Technical Impact: </strong>
                      {study.impact}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="tags">
                    {study.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Deep Dive Accordion */}
                  <button
                    className="deep-dive-btn"
                    onClick={() => toggleExpand(study.id)}
                    aria-expanded={expandedId === study.id}
                  >
                    {expandedId === study.id ? (
                      <>
                        Hide Architectural Deep Dive <ChevronUp size={15} />
                      </>
                    ) : (
                      <>
                        View System Design & Trade-Offs <ChevronDown size={15} />
                      </>
                    )}
                  </button>

                  {expandedId === study.id && (
                    <div className="deep-dive-content">
                      <strong style={{ color: "#ffffff" }}>Key Implementation Details:</strong>
                      <ul className="deep-dive-list">
                        {study.deepDiveArchitecture.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                      <div style={{ marginTop: 12 }}>
                        <strong style={{ color: "#ffffff" }}>Engineering Trade-Off Rationale: </strong>
                        {study.tradeOffs}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Applied AI & Forward Deployed Engineering */}
        <section id="ai" className="section">
          <div className="container">
            <div className="ai-spotlight">
              <div className="kicker">
                <Sparkles size={14} /> Applied AI & Forward Deployed Engineering
              </div>
              <h2>From Enterprise Backend Rigor to Applied AI.</h2>
              <p style={{ color: "var(--text-muted)", maxWidth: 760, lineHeight: 1.7, marginTop: 12 }}>
                High-leverage AI systems require more than prompt engineering—they require battle-tested
                backend plumbing, deterministic data schemas, vector indexing, and rigorous evaluation
                frameworks. These architectures leverage 7+ years of distributed systems experience to
                deliver production-grade agentic workflows.
              </p>

              <div className="ai-grid">
                {appliedAIProjects.map((ai) => (
                  <div className="ai-card" key={ai.title}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="kicker" style={{ margin: 0 }}>
                        {ai.focus}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          padding: "2px 8px",
                          borderRadius: 9999,
                          background: "rgba(99,102,241,0.15)",
                          color: "#a5b4fc",
                          border: "1px solid rgba(99,102,241,0.3)"
                        }}
                      >
                        {ai.status}
                      </span>
                    </div>
                    <h4>{ai.title}</h4>
                    <p>{ai.description}</p>
                    <div style={{ marginBottom: 16 }}>
                      <strong style={{ fontSize: "0.8rem", color: "#e2e8f0", display: "block", marginBottom: 6 }}>
                        Architectural Highlights:
                      </strong>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
                        {ai.architecturePoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="tags">
                      {ai.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <Building2 size={14} /> Career Trajectory
                </div>
                <h2>Enterprise experience.</h2>
              </div>
              <p className="section-subtitle">
                Proven track record delivering scalable backends, multi-tenant SaaS platforms, and
                data-intensive workflows across high-growth tech companies.
              </p>
            </div>

            <div className="timeline">
              {experiences.map((exp) => (
                <article className="role-card" key={exp.company}>
                  <div className="role-top">
                    <div>
                      <h3 className="role-title">{exp.title}</h3>
                      <div className="role-company">
                        {exp.company} · {exp.location}
                      </div>
                    </div>
                    <span className="role-duration">{exp.date}</span>
                  </div>

                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: 16, lineHeight: 1.6 }}>
                    {exp.summary}
                  </p>

                  <ul className="role-bullets">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* System Design & Engineering Principles */}
        <section id="architecture" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <ShieldCheck size={14} /> Core Competencies
                </div>
                <h2>How I approach software engineering.</h2>
              </div>
              <p className="section-subtitle">
                Core technical principles cultivated across 7+ years of solving production bugs, scaling
                services, and collaborating with cross-functional teams.
              </p>
            </div>

            <div className="principles-grid">
              {competencies.map((comp) => {
                const IconComponent = comp.icon;
                return (
                  <div className="principle-card" key={comp.title}>
                    <div className="principle-icon">
                      <IconComponent size={22} />
                    </div>
                    <h3>{comp.title}</h3>
                    <p>{comp.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Technical Toolkit / Skills */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <Terminal size={14} /> Technical Stack & Skills Matrix
                </div>
                <h2>Production toolkit at a glance.</h2>
              </div>
              <p className="section-subtitle">
                Core technologies, languages, databases, and architectural frameworks actively used in production.
              </p>
            </div>

            {/* Skill Category Filter Pills */}
            <div className="filter-bar">
              {["All", "Backend & Systems", "Data & Persistence", "Applied AI & LLM Systems", "Frontend Engineering", "Enterprise Delivery & DevOps"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSkillCategoryFilter(category)}
                  className={`filter-btn ${skillCategoryFilter === category ? "active" : ""}`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="skills-grid">
              {filteredSkillGroups.map((group) => {
                const IconComp = group.icon;
                return (
                  <div className="skill-category-card" key={group.category}>
                    <div className="skill-category-header">
                      <div className="skill-category-title">
                        <IconComp size={18} className={group.colorClass} />
                        <span>{group.category}</span>
                      </div>
                      <span className="skill-category-count">{group.skills.length} skills</span>
                    </div>

                    <div className="skill-chips">
                      {group.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className={`skill-chip ${skill.primary ? "primary" : ""}`}
                          title={skill.primary ? "Primary Daily Production Stack" : undefined}
                        >
                          <span className="skill-chip-dot" style={{ background: group.dotColor }} />
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Education & Academic Credentials */}
        <section id="education" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="kicker">
                  <GraduationCap size={14} /> Education & Credentials
                </div>
                <h2>Academic foundation.</h2>
              </div>
              <p className="section-subtitle">
                Rigorous computer applications degrees underpinning 7+ years of enterprise software engineering and distributed systems delivery.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
              <div className="role-card">
                <div className="role-top">
                  <div>
                    <h3 className="role-title" style={{ fontSize: "1.2rem" }}>
                      Master of Computer Application (MCA)
                    </h3>
                    <div className="role-company">Pune, India</div>
                  </div>
                  <span className="role-duration">Graduated 2020</span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
                  Advanced computing specialization covering distributed software architectures, relational database management systems, advanced algorithms, and enterprise web engineering.
                </p>
              </div>

              <div className="role-card">
                <div className="role-top">
                  <div>
                    <h3 className="role-title" style={{ fontSize: "1.2rem" }}>
                      Bachelor of Computer Application (BCA)
                    </h3>
                    <div className="role-company">Solapur, India</div>
                  </div>
                  <span className="role-duration">Graduated 2017</span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
                  Core computer science foundations in object-oriented programming, data structures, software engineering life cycles, operating systems, and web technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <div className="contact-card">
              <div className="kicker" style={{ justifyContent: "center", marginBottom: 12 }}>
                <Mail size={14} /> Get In Touch
              </div>
              <h2>Let's build reliable software together.</h2>
              <p>
                Whether you're looking for a Senior Full Stack Engineer, a Forward Deployed Engineer to
                tackle customer-facing enterprise challenges, or an engineer to lead applied AI
                initiatives, I'd welcome the conversation.
              </p>

              <div className="ctas" style={{ justifyContent: "center" }}>
                <a className="btn primary" href="mailto:sourabhambarshetti@gmail.com">
                  <Mail size={16} /> sourabhambarshetti@gmail.com
                </a>
                <button className="btn" onClick={handleCopyEmail}>
                  {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copiedEmail ? "Copied Email!" : "Copy Email"}
                </button>
                <a className="btn" href="tel:+918087434976">
                  <Phone size={16} /> +91 80874 34976
                </a>
                <button className="btn" onClick={handleCopyPhone}>
                  {copiedPhone ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  {copiedPhone ? "Copied Phone!" : "Copy Phone"}
                </button>
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/sourabh-a-b5b64b150"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} /> LinkedIn Profile
                </a>
                <a className="btn" href="/Sourabh_Ambarshetti_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText size={16} /> View Resume
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} Sourabh Ambarshetti. All rights reserved.</span>
          <span>Senior Full Stack Engineer · Distributed Systems · Applied AI</span>
        </div>
      </footer>
    </>
  );
}