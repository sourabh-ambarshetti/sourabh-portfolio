import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: 800 }}>404</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", margin: 0 }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="btn primary"
        style={{ marginTop: "1rem", display: "inline-flex", alignItems: "center", gap: "8px" }}
      >
        <ArrowLeft size={16} /> Return to Home
      </Link>
    </div>
  );
}

