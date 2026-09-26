# G-TEC Education UK · landing site

Next.js 16 (App Router, TypeScript) frontend + FastAPI backend for enquiries. Deploys as one Vercel project.

## Run locally

```bash
npm install
uv venv .venv && uv pip install -r requirements.txt --python .venv/bin/python   # or: python -m venv .venv && .venv/bin/pip install -r requirements.txt

# terminal 1 – API on :8000
.venv/bin/uvicorn api.index:app --reload --port 8000
# terminal 2 – site on :3000 (proxies /api/* to :8000 in dev)
npm run dev
```

Checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `.venv/bin/python api/test_index.py`.

## Layout

| Path | What |
|---|---|
| `src/app/` | layout (fonts, metadata, JSON-LD), page, `globals.css`, `sitemap.ts`, `robots.ts` |
| `src/components/` | one component per section; `Reveal` is the shared scroll-in wrapper |
| `src/lib/content.ts` | all copy, courses, countries, testimonials, contact details |
| `src/lib/motion.ts` | reduced-motion hook, magnet buttons, rAF scroll helper |
| `api/index.py` | FastAPI: `POST /api/enquire`, `GET /api/health` |
| `public/` | logo + image slots (`students`, `ai`, `fullstack`, `futurex`, `cyber`, `data`, `campus`) |

## Environment

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` – canonical URL for OG tags and the sitemap.
- `ENQUIRY_WEBHOOK_URL` – FastAPI POSTs each enquiry here as JSON (CRM, Slack, Zapier, Make). Unset = logged only.

## Deploy

`vercel` from this folder. `vercel.json` routes `/api/*` to the Python function; set the env vars above in the Vercel project.

## To do before launch

- Replace the gradient placeholders in `public/*.png` with real photos (same file names).
- Point `ENQUIRY_WEBHOOK_URL` at the real destination.
- Swap the sample testimonials in `src/lib/content.ts`.

# uk
