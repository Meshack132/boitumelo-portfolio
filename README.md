# Boitumelo Mthimkhulu — Portfolio Site

A static HTML/CSS/JS portfolio site. No build step, no framework. Just open `index.html`.

## File structure

```
/
├── index.html          ← main page
├── style.css           ← styles
├── script.js           ← lightbox + reveal animation
├── favicon.svg         ← site favicon (+ favicon-32.png, apple-touch-icon.png)
├── og-image.jpg        ← 1200×630 link-preview image (LinkedIn, WhatsApp, etc.)
├── portfolio.pdf       ← downloadable full portfolio (referenced by "Download portfolio" button)
├── vercel.json         ← Vercel routing + cache config
└── images/             ← project images (.jpg originals + .webp copies)
```

## Preview it locally

Any static file server works. From this folder:

```bash
# Python (already installed on macOS/Linux)
python3 -m http.server 8000
# open http://localhost:8000
```

Or drag `index.html` into a browser directly.

## Adding or replacing images

Every image is served as WebP with a JPG fallback, inside a `<picture>` tag with
explicit `width`/`height` (this stops the page jumping while images load):

```html
<picture>
  <source srcset="images/NAME.webp" type="image/webp" />
  <img src="images/NAME.jpg" width="1200" height="800" alt="Describe the image" loading="lazy" decoding="async" />
</picture>
```

Create the WebP copy with any converter, e.g. `cwebp -q 80 NAME.jpg -o NAME.webp`.

## If the site address changes

The canonical URL, `og:url`, `og:image` and the JSON-LD block in `<head>` use the
full site address. Search `index.html` for `vercel.app` and replace it with the new
domain so link previews and search engines point to the right place.

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

**Replace an image:** drop the new `.jpg` and `.webp` into `/images/` and update both paths and the `width`/`height` in `index.html`.

**Years of experience / footer year:** calculated automatically from 2010 in `script.js` — no yearly edits needed.

**Change colours:** all colours are CSS variables at the top of `style.css` — edit `--bg`, `--ink`, `--accent`, etc.

**Change fonts:** the fonts are loaded from Google Fonts in the `<link>` tag inside `<head>`. Swap them and update `--font-display`, `--font-body`, `--font-mono` in `style.css`.

## Notes

- The site is fully static; no server-side code, no database, no build step required.
- Images are served as WebP (~3 MB for everything on the page, down from ~5.5 MB of JPG), which is fine for a portfolio. Vercel serves them with a year-long cache header (set in `vercel.json`).
- Fonts are loaded from Google Fonts CDN — no self-hosting needed.
- Reduced-motion preference is respected: scroll reveal and hover transitions disable automatically for users who ask for it.
