import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sourabh Ambarshetti | Official ATS-Optimized Resume",
  description:
    "Official Resume & CV of Sourabh Ambarshetti — Senior Full Stack & Backend Engineer (7+ years exp) architecting systems for Lenovo, HP, Dell, and Hitachi Astemo.",
  openGraph: {
    title: "Sourabh Ambarshetti | Official ATS-Optimized Resume",
    description:
      "Senior Full Stack & Backend Engineer — Proven systems for Lenovo, HP, Dell & Hitachi Astemo. 100% ATS-compliant single-column CV.",
    url: "https://sourabh-portfolio-beta.vercel.app/resume",
    siteName: "Sourabh Ambarshetti Portfolio",
    images: [
      {
        url: "/resume-og.png",
        width: 1200,
        height: 630,
        alt: "Sourabh Ambarshetti ATS Resume Preview"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourabh Ambarshetti | Official ATS-Optimized Resume",
    description:
      "Senior Full Stack & Backend Engineer — Proven enterprise systems for Lenovo, HP, Dell & Hitachi Astemo.",
    images: ["/resume-og.png"]
  }
};

export default function ResumePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080c14",
        color: "#f8fafc",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px"
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
          marginBottom: "24px"
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#f8fafc", margin: 0 }}>
            Sourabh Ambarshetti
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: "4px 0 0" }}>
            Official ATS-Optimized Curriculum Vitae (Single-Column Standard)
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              padding: "8px 16px",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              color: "#e2e8f0",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none"
            }}
          >
            ← Back to Portfolio
          </Link>
          <a
            href="/Sourabh_Ambarshetti_Resume.pdf"
            download="Sourabh_Ambarshetti_Resume.pdf"
            style={{
              padding: "8px 18px",
              background: "linear-gradient(135deg, #0284c7, #2563eb)",
              border: "none",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
            }}
          >
            ⬇ Download PDF
          </a>
        </div>
      </header>

      <section
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "82vh",
          background: "#1e293b",
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid rgba(148, 163, 184, 0.15)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)"
        }}
      >
        <iframe
          src="/Sourabh_Ambarshetti_Resume.pdf#toolbar=1&navpanes=0"
          title="Sourabh Ambarshetti Resume PDF"
          style={{
            width: "100%",
            height: "100%",
            border: "none"
          }}
        />
      </section>
    </main>
  );
}
