# Software Studio

Open-source AI app builder. Bring your own API key, describe an app, get a website or Android project.

**Status: Phase 1 (UI only).** Homepage, builder form, API tutorials, help center. Key testing, generation, preview, publishing and APK builds are not implemented yet; the buttons say so.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Deploy
Import the repo in Vercel and set the variables from `.env.example`.

## Environment variables
| Name | Purpose |
|---|---|
| NEXT_PUBLIC_APP_NAME | Display name |
| NEXT_PUBLIC_APP_URL | Deployed site URL |
| NEXT_PUBLIC_GITHUB_URL | Repo link in the navigation |

Never commit `.env.local`, API keys, or service-account files.
