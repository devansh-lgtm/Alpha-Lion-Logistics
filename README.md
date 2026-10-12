# Alpha Lion Logistics – Website

Monorepo with two apps:

| Folder      | Stack                                              | Port |
| ----------- | -------------------------------------------------- | ---- |
| `frontend/` | React 19 · Vite 7 · Tailwind CSS v4 · Framer Motion | 5173 |
| `backend/`  | Node · Express 5 · Nodemailer · Zod                 | 5000 |

## Quick start

```bash
# Terminal 1 – API (emails form submissions to your inbox)
cd backend
cp .env.example .env     # fill in SMTP_* and COMPANY_EMAIL
npm install
npm run dev

# Terminal 2 – website
cd frontend
npm install
npm run dev              # open http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend. In production, set `VITE_API_URL` to the backend's public URL (or host both behind the same domain) and set `CORS_ORIGINS` in the backend `.env` to the website's URL.

## Deploy

- **Frontend**: `npm run build` → upload `frontend/dist` to Vercel, Netlify, Cloudflare Pages, S3, etc. Enable SPA fallback (rewrite all routes to `/index.html`).
- **Backend**: run `node server.js` on Render, Railway, Fly.io, a VPS, etc., with the `.env` values set as environment variables.

See each folder's README for details.
