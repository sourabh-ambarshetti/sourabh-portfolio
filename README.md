# Sourabh Ambarshetti — Senior Engineering Portfolio

A high-performance, responsive portfolio engineered for a **Senior Full Stack Engineer & Forward Deployed AI Engineer**.

Designed to demonstrate architectural maturity, deep problem-solving skills, and quantifiable impact for enterprise roles (e.g. supporting clients like Lenovo, HP, and Dell) and high-leverage Applied AI positions.

---

## 🚀 Key Features

1. **Problem-Solving Case Studies (STAR Format)**
   - Categorized by **Performance & Distributed Systems**, **Enterprise SaaS**, and **Fintech**.
   - Includes real architectural breakdowns: bottlenecks, technical root cause, system design solutions, and quantifiable metrics (e.g., `-77% Latency`, `Zero Data Corruption`, `Sub-15m KYC`).
   - Interactive category filtering + expandable **"System Design & Trade-Offs"** deep dive accordions for technical interview prep.

2. **Applied AI & Forward Deployed Engineering (FDE) Spotlight**
   - Details production-grade AI architectures: **Enterprise RAG** (Hybrid retrieval, semantic chunking, pgvector, Ragas evaluation) and **Autonomous Support Agent** (Pydantic schema validation, sandboxed tool calling, human-in-the-loop gates).

3. **Executive Hero & Profile Card**
   - High-impact metrics ribbon (`7+ Years`, `-77% Latency`, `3,496 Phantom Rows Fixed`, `99.9% Uptime`).
   - Profile avatar with automatic photo detection (`public/sourabh.jpg`) and a sleek developer monogram fallback (`SA`).
   - One-click **"Copy Email"** button with real-time clipboard feedback.

4. **Career Trajectory & Engineering Principles**
   - Detailed timeline covering PyxTech, CodeNgine Technologies, and Primus Techsystems.
   - Core competencies highlighting defensive architecture, data integrity, and cross-functional enterprise stakeholder alignment.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI & Components**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Variables & Glassmorphism Design System
- **Icons**: Lucide React

---

## 💻 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📸 Adding Your Photo (Optional & Seamless)

To add your professional photo:
1. Save your headshot as `sourabh.jpg` (or `profile.jpg`).
2. Place it in the `public/` directory:
   ```text
   public/sourabh.jpg
   ```
3. Refresh the page! The portfolio will automatically detect the image and display it with a glowing border and live status indicator. If no image is present, it cleanly renders your stylized `SA` monogram.

---

## 📄 Before Final Deployment

1. **Resume**: Place your updated resume PDF at `public/Sourabh_Ambarshetti_Resume.pdf`.
2. **LinkedIn**: Ensure your LinkedIn URL in `app/page.tsx` matches your active profile.
3. **Domain**: In `app/layout.tsx`, verify the `metadataBase` matches your target custom domain (e.g. `https://sourabhambarshetti.dev`).

---

## 🌐 Suggested Deployment

Deploy with one click to [Vercel](https://vercel.com/) by connecting this Git repository.
