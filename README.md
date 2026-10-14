# Sourabh Ambarshetti — Portfolio

Single-page portfolio built with Next.js. Live at https://sourabh-portfolio-beta.vercel.app

## Run locally

```bash
npm install
npm run dev
```

## Editing content

- **Portfolio text:** everything is in `app/page.tsx` (case studies, experience, skills at the top of the file).
- **Resume:** edit `resume/resume.html`, then run `npm run resume` to regenerate
  `public/Sourabh_Ambarshetti_Resume.pdf`. Keep it to one page.
- **Link preview image:** `node scratch/generate_og.mjs` regenerates `public/og-image.png`.

Both scripts use Playwright and fall back to the installed Edge/Chrome if Playwright's own browser isn't downloaded.
