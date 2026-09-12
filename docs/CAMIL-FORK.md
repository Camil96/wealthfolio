# Camilfolio — technisch overzicht (fork van Wealthfolio v3.9.0)

> Forked from Wealthfolio (https://wealthfolio.app/). Wealthfolio is a trademark of Teymz Inc.
> Deze fork heet **Camilfolio** en gebruikt eigen naam/logo (eis uit `TRADEMARKS.md`).
> Licentie: AGPL-3.0 (zie `LICENSE`). Fork: `Camil96/wealthfolio`, branch `main`, upstream `wealthfolio/wealthfolio`.

## 1. Stack

- **Frontend:** React 19 + TypeScript + Vite 7, Tailwind CSS v4, Radix/Shadcn (`packages/ui`), Recharts, React Query, Zustand, React Router 7, i18next (en/fr/es), Zod.
- **Desktop:** Tauri 2 (`apps/tauri`, Rust IPC-commando's). Productiebuild via `pnpm build:tauri` / `pnpm tauri build`.
- **Web/server:** Axum REST-server (`apps/server`) + SQLite (Diesel ORM, `crates/storage-sqlite`). Dev via `pnpm run dev:web` (Vite :1420 + server 127.0.0.1:8088).
- **Gedeelde Rust-logica:** `crates/core` (businesslogica), `market-data` (koersen), `connect` (broker-sync, externe dienst), `device-sync`, `spending`, `ai`, `agent-tools`, `wealthfolio-mcp`.
- **Packages:** `packages/addon-sdk`, `packages/addon-dev-tools`, `packages/ui`. Eerst `pnpm run build:types` draaien, anders faalt `type-check` met TS6305.
- **Tooling:** Node 24 (`.node-version`), pnpm 10.33.4 (`packageManager`), Rust 1.95.0 (`rust-toolchain.toml`, via brew-`rustup` op `/opt/homebrew/opt/rustup/bin`), Turborepo. Node 24 loopt via `fnm` (Hermes-Node op v22 blijft onaangeroerd).

## 2. Structuur

```
apps/frontend/src/
  adapters/{tauri,web,shared}  # omgevingslaag: zelfde UI, andere backend-aanroep
  features/{goals,spending,ai-assistant,devices-sync,wealthfolio-connect}
  pages/{dashboard,holdings,activity,performance,net-worth,income,asset,account,
         allocation-targets,insights,ai-assistant,auth,onboarding,settings,health}
  components/  # gedeelde UI
  addons/      # addon-runtime (sandbox)
  i18n/locales/{en,fr,es}/
  lib/ hooks/ context/ routes.tsx App.tsx main.tsx
apps/server/   # Axum-server (web-modus, Docker)
apps/tauri/    # desktop-shell, tauri.conf.json, icons/
crates/        # core, storage-sqlite, market-data, connect, ...
packages/      # ui, addon-sdk, addon-dev-tools
dist/          # frontend-buildoutput (repo-root, niet apps/frontend/dist)
db/            # lokale SQLite (gitignored, bv. web-dev.db)
```

## 3. Configuratie

- `.env` (Tauri/desktop), `.env.web` (web-modus, geladen door `scripts/dev-web.mjs`). Niet committen.
- Belangrijkste `WF_*`-vars: `WF_LISTEN_ADDR`, `WF_DB_PATH`, `WF_CORS_ALLOW_ORIGINS`,
  `WF_SECRET_KEY` (**verplicht**, `openssl rand -base64 32`), `WF_AUTH_PASSWORD_HASH` (Argon2id),
  `WF_STATIC_DIR`, `WF_MCP_ENABLED`. Volledige lijst in README “Web Mode”.
- `VITE_API_TARGET=http://127.0.0.1:8088` (Vite-proxy naar backend).

## 4. Branding-plekken (Camilfolio)

| Plek | Bestand |
|---|---|
| Browsertab-titel | `apps/frontend/index.html` (`<title>`) |
| PWA-naam | `apps/frontend/public/manifest.json` |
| Sidebar-naam | `apps/frontend/src/pages/layouts/navigation/app-sidebar.tsx:74` |
| Sidebar-logo | `apps/frontend/public/logo.png` (TODO: eigen logo) |
| Grote logo | `apps/frontend/public/logo-gold.png` (`app-layout.tsx:79`) (TODO) |
| App-icons | `apps/frontend/public/app-icon-*.png`, `apple-touch-icon.png` (TODO) |
| Login-titel | `apps/frontend/src/pages/auth/login-page.tsx:84` |
| i18n (en) | `common.json:app_name`, `auth.json:title`, `dashboard.json:welcome_message`, `settings.json:about_app_name/about_logo_alt` |
| Desktop-naam/titel | `apps/tauri/tauri.conf.json` (`productName`, `mainBinaryName`, `app.windows[0].title`) |
| Tauri-icons | `apps/tauri/icons/` (TODO) |

Bewust **niet** hernoemd: `Wealthfolio Connect` (externe betaaldienst, eigen endpoints/identifiers),
code-identifiers (`useWealthfolioConnect` e.d.), `identifier com.teymz.wealthfolio`, updater-endpoints en
deep-link-schemes (later aanpassen vereist Apple-signing; zie §6).

## 5. Waar later aanpassen

- **Dashboards/grafieken:** `pages/dashboard`, `pages/performance`, `pages/net-worth`, Recharts-componenten.
- **Data-import/activiteiten:** `pages/activity`, `docs/activities/activity-types.md`, `crates/core`.
- **Koersen:** `crates/market-data`.
- **Valuta/i18n:** `src/i18n`, `src/lib` (financial-formatting).
- **Eigen functionaliteit:** bij voorkeur als **addon** (`packages/addon-dev-tools`, `docs/addons/`) — blijft
  mergebaar met upstream; core-wijzigingen maken upstream-merges zwaarder.

## 6. Nog open (bewust uitgesteld)

- Eigen logo/icon-set (sidebar, PWA, Tauri, `assets/brand` blijft onaangeroerd).
- Tauri `identifier`/signing/updater/deep-links voor eigen releases.
- FR/ES-vertalingen van de nieuwe naam (EN eerst).
- `Wealthfolio Connect`-integratie aan/uit voor Camilfolio-builds.

## 7. Commando's

```bash
eval "$(fnm env)"; export PATH="/opt/homebrew/opt/rustup/bin:$PATH"
pnpm install
pnpm run build:types            # verplicht na verse clone
pnpm --filter frontend type-check
pnpm --filter frontend build    # output in ./dist
pnpm run dev:web                # Vite :1420 + API 127.0.0.1:8088
cargo check --manifest-path apps/server/Cargo.toml
```

## 8. Self-hosted zonder Docker (native binary, aanbevolen route)

Docker Desktop is te zwaar voor deze laptop en niet nodig: de release is één
binary + `dist/`.

```bash
pnpm --filter frontend build
cargo build --release --manifest-path apps/server/Cargo.toml
# binary: ./target/release/wealthfolio-server (59 MB)
WF_LISTEN_ADDR=127.0.0.1:8088 WF_DB_PATH=./db/app.db WF_STATIC_DIR=dist \
  ./target/release/wealthfolio-server
# check: /api/v1/healthz -> 200, / serveert <title>Camilfolio</title>
```

Benodigde env: `WF_SECRET_KEY` (verplicht), `WF_DB_PATH`, `WF_STATIC_DIR=dist`,
`WF_CORS_ALLOW_ORIGINS`, voor lokale demo `WF_AUTH_REQUIRED=false`; productie met
wachtwoord via `WF_AUTH_PASSWORD_HASH` (Argon2id). Bewezen op 2026-09-12:
healthz 200 + Camilfolio-titel, SQLite netjes aangemaakt.
Docker blijft alleen als VPS-optie achter de hand (`compose.camilfolio.yml` +
`.env.docker`, nooit als dagelijkse route op deze laptop).
