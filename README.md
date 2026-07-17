# Boitumelo Mthimkhulu — Portfolio Site

A static HTML/CSS/JS portfolio site. No build step, no framework. Just open `index.html`.

## File structure

```
/
├── index.html          ← main page
├── style.css           ← styles
├── script.js           ← lightbox + reveal animation
├── favicon.svg         ← site favicon
├── portfolio.pdf       ← downloadable full portfolio (referenced by "Download portfolio" button)
├── vercel.json         ← Vercel routing + cache config
└── images/             ← project images (44 files)
```

## Preview it locally

Any static file server works. From this folder:

```bash
# Python (already installed on macOS/Linux)
python3 -m http.server 8000
# open http://localhost:8000
```

Or drag `index.html` into a browser directly.

## Before you deploy — add your contact details

Open `index.html` and look for the **CONTACT** section near the bottom. Add your email, LinkedIn, and phone number where indicated. The current note says: *"Add your preferred email and LinkedIn URL below by editing index.html."*

Suggested addition (paste inside the `.contact-actions` div):

```html
<a class="btn btn-ghost" href="mailto:you@example.com">
  <span>you@example.com</span>
  <span class="btn-ico">↗</span>
</a>
<a class="btn btn-ghost" href="https://linkedin.com/in/YOUR-HANDLE" target="_blank" rel="noopener">
  <span>LinkedIn</span>
  <span class="btn-ico">↗</span>
</a>
```

Then delete the `.contact-note` block above the footer.

## Deploy to Vercel — three ways

### Option A — the easiest way (drag & drop, no CLI, no Git)

1. Go to https://vercel.com and sign up / log in (GitHub, GitLab, email — all fine).
2. Zip this whole folder (right-click → Compress on macOS, or Send To → Zip on Windows).
3. On Vercel dashboard: **Add New → Project → Import Third-Party Git Repository → Deploy without Git**. If you don't see that, use the "Deploy" button and drag the zip in.
4. Vercel gives you a URL like `boitumelo-portfolio.vercel.app`. You can add a custom domain later in Project Settings → Domains.

### Option B — via GitHub (recommended if you plan to update it)

1. Create a new GitHub repo (e.g. `boitumelo-portfolio`) and push these files into it:
   ```bash
   cd path/to/this/folder
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USER/boitumelo-portfolio.git
   git push -u origin main
   ```
2. On Vercel: **Add New → Project → Import Git Repository**. Pick the repo.
3. Framework preset: **Other** (or leave it — Vercel will auto-detect a static site).
4. Root directory: `/` (leave default).
5. Click **Deploy**. Every future `git push` will redeploy automatically.

### Option C — via Vercel CLI

```bash
npm install -g vercel
cd path/to/this/folder
vercel
# Answer the prompts (link to your account, pick a project name).
# When it asks about project settings, accept defaults — it's static.
vercel --prod   # promotes preview to production
```

## Custom domain

In Vercel dashboard → your project → **Settings → Domains** → add e.g. `boitumelomthimkhulu.com`. Vercel will show DNS records to set at your registrar (usually a CNAME to `cname.vercel-dns.com`). Certificates are free and automatic.

## Editing content later

**Add a project:** copy any `<article class="project">…</article>` block in `index.html`, bump the number, edit the title-block cells and copy, and update the image paths.

**Replace an image:** drop the new file into `/images/` and update the `src` in `index.html`.

**Change colours:** all colours are CSS variables at the top of `style.css` — edit `--bg`, `--ink`, `--accent`, etc.

**Change fonts:** the fonts are loaded from Google Fonts in the `<link>` tag inside `<head>`. Swap them and update `--font-display`, `--font-body`, `--font-mono` in `style.css`.

## Notes

- The site is fully static; no server-side code, no database, no build step required.
- Images total ~6 MB across 44 files, which is fine for a portfolio. Vercel serves them with a year-long cache header (set in `vercel.json`).
- Fonts are loaded from Google Fonts CDN — no self-hosting needed.
- Reduced-motion preference is respected: scroll reveal and hover transitions disable automatically for users who ask for it.
