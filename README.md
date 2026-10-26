# Gyanvendra Mishra — Portfolio

Animation-first, minimal-text developer portfolio.

```
portfolio/
├── frontend/                 React 18 + Vite (no Tailwind, no animation libraries)
│   ├── public/               favicon, portrait
│   └── src/
│       ├── App/              App.jsx + App.css  (design tokens + page shell)
│       ├── components/       one folder per component: Name.jsx + Name.css
│       │   ├── Loader/ Cursor/ ScrollProgress/ Navbar/
│       │   ├── Hero/ ParticleField/ Marquee/ About/
│       │   ├── Projects/ ProjectVisual/ ProjectOverlay/
│       │   ├── Stack/ Journey/ Contact/ Footer/
│       │   └── SplitText/ Magnetic/      (small reusable animation helpers)
│       ├── hooks/            useInView, useScrollVar
│       ├── services/         api.js (talks to the backend)
│       ├── data/             portfolioData.js  ← edit all content here
│       └── main.jsx
└── backend/                  Node + Express API (can be handed to another team)
    └── src/
        ├── server.js  app.js
        ├── config/env.js
        ├── routes/contact.routes.js
        ├── controllers/contact.controller.js
        ├── middleware/       validateContact.js, errorHandler.js
        └── services/         storage.service.js, mail.service.js
```

## Run it

```bash
# 1) Backend (contact form API) — http://localhost:5000
cd backend
cp .env.example .env
npm install
npm run dev

# 2) Frontend — http://localhost:5173  (proxies /api to the backend)
cd frontend
npm install
npm run dev
```

Production build: `cd frontend && npm run build` → `frontend/dist`.
If the API is on another domain, set `VITE_API_URL` (see `frontend/.env.example`) and `CORS_ORIGIN` in `backend/.env`.

## Backend API

| Method | Route          | Body                          | Notes                                           |
|--------|----------------|-------------------------------|-------------------------------------------------|
| GET    | `/api/health`  | –                             | health check                                    |
| POST   | `/api/contact` | `{ name, email, message }`    | validated, rate-limited (5 / 15 min / IP), saved to `backend/data/messages.json`, emailed if SMTP is set in `.env` |

## Editing content

Everything visible (name, links, projects, stack, timeline) lives in `frontend/src/data/portfolioData.js`.

## CSS approach

There is no global stylesheet. Every component imports its own `.css` file that sits next to it.
`App/App.css` only holds the design tokens (colours, fonts — scoped to `.app`) and a tiny html/body reset.

## Animation inventory

Intro loader with curtain reveal · scroll progress bar · custom magnetic cursor · aurora + moving grid + interactive particle constellation · letter-by-letter title reveals · 3D pointer-tilt portrait with rotating gradient ring and floating chips · rotating role ticker · scroll-skewed marquee bands · scroll-lit statement and count-up stats · sticky stacking project cards with animated product mock-ups · full-screen project overlay (circular reveal) · orbiting tech stack · scroll-drawn timeline · animated form fields with confetti on send · shining footer wordmark.
All animation respects `prefers-reduced-motion` where it matters.
