import type { Metadata } from "next";
import "./globals.css";

const description =
  "Senior Full Stack Engineer in Pune with 7+ years building Angular and Node.js products in enterprise SaaS and fintech.";

export const metadata: Metadata = {
  title: "Sourabh Ambarshetti · Senior Full Stack Engineer",
  description,
  metadataBase: new URL("https://sourabh-portfolio-beta.vercel.app"),
  authors: [{ name: "Sourabh Ambarshetti" }],
  openGraph: {
    title: "Sourabh Ambarshetti · Senior Full Stack Engineer",
    description,
    url: "https://sourabh-portfolio-beta.vercel.app",
    siteName: "Sourabh Ambarshetti",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Sourabh Ambarshetti" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sourabh Ambarshetti · Senior Full Stack Engineer",
    description,
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
