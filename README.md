# taxidriverhk-nextjs

Personal hobby project portal built with Next.js, hosting several mini-projects:

- **Counter Strike Maps** — map database and browser
- **OMSI / Bus Simulator** — simulation game content
- **HKAdBus2** — Hong Kong advertised bus photo database
- **Personal** — books, passive income info, vehicle inventory lookup

Supports English and Traditional Chinese (via `next-intl`).

## Tech stack

Next.js 13 · React 18 · TypeScript · Bootstrap 5 · React Bootstrap

## Development

```bash
npm install
npm run dev        # starts dev server at http://localhost:3000
```

`predev` automatically runs `scripts/wrap-bootstrap.js` before the dev server starts. The same script runs before `npm run build`.

Other scripts:

```bash
npm run build      # production build
npm run start      # start production server
npm run lint       # run ESLint
```

## Deployment

Pushes to `master` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:

1. Adds the runner's IP to the AWS EC2 security group to allow SSH access.
2. SSHes into the production server and pulls the latest code.
3. Rebuilds and restarts the app via `docker compose build && docker compose up -d`.
4. Revokes the runner's IP from the security group.

Required GitHub secrets: `SSH_PRIVATE_KEY`, `USER`, `REMOTE_IP`, `REPO_DIR`, `DOCKER_DIR`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`.
