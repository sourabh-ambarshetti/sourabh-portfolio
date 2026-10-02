import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sourabh Ambarshetti | Senior Full Stack Engineer & Forward Deployed AI",
  description:
    "Portfolio of Sourabh Ambarshetti — Senior Full Stack Engineer with 7+ years architecting high-throughput backend systems, enterprise SaaS (Lenovo, HP, Dell), and Applied AI architectures.",
  metadataBase: new URL("https://sourabh-portfolio-beta.vercel.app"),
  keywords: [
    "Sourabh Ambarshetti",
    "Senior Full Stack Engineer",
    "Forward Deployed Engineer",
    "Backend Engineer",
    "Node.js",
    "TypeScript",
    "Applied AI",
    "RAG",
    "FastAPI",
    "Enterprise SaaS",
    "Pune"
  ],
  authors: [{ name: "Sourabh Ambarshetti" }],
  openGraph: {
    title: "Sourabh Ambarshetti | Senior Full Stack Engineer & Applied AI",
    description:
      "7+ years architecting high-scale enterprise backends and Applied AI pipelines for global enterprise clients.",
    url: "https://sourabh-portfolio-beta.vercel.app",
    siteName: "Sourabh Ambarshetti Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sourabh Ambarshetti - Senior Full Stack & Backend Engineer"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourabh Ambarshetti | Senior Full Stack Engineer & Applied AI",
    description:
      "7+ years architecting high-scale enterprise backends and Applied AI pipelines for global enterprise clients.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}