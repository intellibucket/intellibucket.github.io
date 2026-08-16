# IntelliBucket

The product and policy website for IntelliBucket applications. The site includes
individual paths for Always Awake, YMessage, MyDocThings, BucketSecure, and
ReadWorks, plus product-level privacy and terms pages.

## Prerequisites

- Node.js `>=22.13.0`

## Local development

```bash
npm install
npm run dev
npm run build
```

Open the local URL printed by the development server.

## Builds

- `npm run build` creates the Cloudflare/Vinext deployment.
- `npm run build:pages` creates a static GitHub Pages export in `out/`.
- `npm test` verifies the server-rendered site and key product/legal routes.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` deploys every push to
`main`. It reads the real Pages base URL and path from GitHub, so it supports
both repository sites such as `username.github.io/repository` and a configured
custom domain.

After pushing this project to GitHub:

1. Open the repository’s **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Run the **Deploy IntelliBucket to GitHub Pages** workflow or push to `main`.
4. To use `intellibucket.com`, add it under **Custom domain** and apply the DNS
   records GitHub shows for the domain.

## Useful commands

- `npm run dev`: start local development
- `npm run build`: create the Vinext production build
- `npm run build:pages`: create the GitHub Pages export
- `npm test`: build and verify rendered routes
- `npm run db:generate`: generate Drizzle migrations after schema changes
