import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume · Sourabh Ambarshetti",
  description: "Resume of Sourabh Ambarshetti, Senior Full Stack Engineer (Angular, Node.js, TypeScript)."
};

const PDF = "/Sourabh_Ambarshetti_Resume.pdf";

export default function ResumePage() {
  return (
    <main className="wrap" style={{ maxWidth: 960, paddingTop: 24, paddingBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <Link href="/" className="btn">← Back</Link>
        <a href={PDF} download className="btn primary">Download PDF</a>
      </div>
      <iframe
        src={PDF}
        title="Sourabh Ambarshetti resume"
        style={{ width: "100%", height: "85vh", border: "1px solid var(--border)", borderRadius: 12, background: "#fff" }}
      />
    </main>
  );
}
