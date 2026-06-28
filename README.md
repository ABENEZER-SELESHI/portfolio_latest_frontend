# Portfolio Frontend

Next.js 15 portfolio for **Abenezer Seleshi** with public site and admin CMS.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base (`http://localhost:5000/api/v1`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run clean` | Delete `.next` cache (fixes corrupt build errors) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |

## Features

- Responsive portfolio sections with dark/light mode
- Admin dashboard with JWT authentication
- Contact form with validation
- TanStack Query + Zustand state management

## Admin Access

Use the floating **+** button on the portfolio or navigate to `/admin/login`.

## Troubleshooting

If you see `ENOENT: routes-manifest.json` or every page returns **500**:

1. Stop the dev server (`Ctrl+C`)
2. Run `npm run clean`
3. Start again with `npm run dev`

Do not run `npm run build` while `npm run dev` is already running.
