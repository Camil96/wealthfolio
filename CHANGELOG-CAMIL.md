# CHANGELOG-CAMIL (Camilfolio-fork)

## Werkwijze

- Werk altijd op een feature-branch (`feat/...`, `fix/...`), nooit direct op `main`.
- `main` van deze fork = Camilfolio (met branding). Upstream = `wealthfolio/wealthfolio`.
- Push naar `origin` (eigen fork). Nooit naar `upstream` pushen.

```bash
git checkout -b feat/mijn-wijziging
# ... wijzig, test: pnpm --filter frontend type-check && pnpm --filter frontend build
git add <bestanden>; git commit -m "..."; git push origin feat/mijn-wijziging
```

Upstream-updates mergen:

```bash
git checkout main && git pull origin main
git fetch upstream
git merge upstream/main   # of: git rebase upstream/main
# conflicten oplossen, daarna:
pnpm install && pnpm run build:types
pnpm --filter frontend type-check && pnpm --filter frontend build
cargo check --manifest-path apps/server/Cargo.toml
git push origin main
```

Let op bij merges: eigen branding-bestanden (`index.html`, `manifest.json`, `tauri.conf.json`,
`en/*.json`-strings, sidebar/login) aanklikken als “ours” bij conflict met upstream-rebrands.

## 2026-09-12 — Native self-hosted zonder Docker (stap C/D/E)

- Docker-route gestopt: te zwaar voor deze laptop. Sporen opgeruimd, Desktop blijft
  geïnstalleerd maar uit (nodig voor andere projecten). `compose.camilfolio.yml` bewaard
  als VPS-optie voor later.
- Dagelijkse route = `pnpm run dev:web` (Vite :1420 + API :8088). Gemeten: <300 MB RAM,
  geen VM, uren stabiel.
- Native release: `cargo build --release` (7 min) -> `target/release/wealthfolio-server`
  (59 MB). Getest op poort 8099 met verse SQLite: healthz 200, titel Camilfolio.
- Demo zonder Docker: frontend builden, binary starten met `WF_STATIC_DIR=dist`,
  openen op `http://127.0.0.1:8088`.

## 2026-09-12 — Initiële fork

- Fork `Camil96/wealthfolio` aangemaakt van `wealthfolio/wealthfolio` (v3.9.0, commit `2a2d13c97`).
- Lokale clone `wealthfolio-camil`, remotes `origin` + `upstream`.
- Toolchain: Node 24.21.0 (fnm), pnpm 10.33.4, Rust 1.95.0, Xcode CLT aanwezig.
- `docs/CAMIL-FORK.md`: technisch overzicht (stack, structuur, config, branding-plekken).
- Rebrand naar Camilfolio: browsertitel, PWA-manifest, sidebar, login, onboarding,
  laadscherm, EN-locale (`app_name`, about, welkom), Tauri `productName`/`mainBinaryName`/titel.
  Bewust ongewijzigd: `Wealthfolio Connect`-dienstnaam, code-identifiers, Tauri-identifier,
  updater/deep-links, logo-bestanden (TODO), FR/ES-vertalingen (TODO).
- Verificatie: `type-check` OK, `frontend build` OK (titel + naam in `dist`),
  `cargo check` server OK, `dev:web` live (Vite :1420 + API healthz 200).
- Docker: `compose.camilfolio.yml` (lokale build) + `.env.docker` (lokaal, gitignored).
- README: fork-notitie + Camilfolio-snelstart.
