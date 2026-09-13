# Camilfolio Stijlgids — trading-hermes-stijl (licht + blauw)

> Fork-keuze, geen upstream-stijl. “EN”-locale draagt in deze fork Nederlandse waarden
> (bewuste vereenvoudiging: geen `nl/`-locale, dus geen Rust- of lint-wijzigingen nodig).
> Donkere modus blijft werken en krijgt hetzelfde blauwe accent.
>
> Historie: eerst banking-stijl met goud; sinds de trading-hermes-richting is goud
> volledig vervangen door blauw (geen goud-tokens meer in `globals.css`).

## 1. Herkomst

- Hermes-blauw **`#0000F2`** is overgenomen van de Hermes-pagina
  (hermes-agent.nousresearch.com), geverifieerd in de live bron. Die pagina zelf is
  donkerblauw; “licht + blauw accent” is een eigen Camilfolio-interpretatie.
- Lettertype: **Inter Variable**, al standaard (`globals.css`, gebundeld via fontsource).
  Geen Google Fonts (app is offline-first). Bedragen altijd `tabular-nums`, datums numeriek.

## 2. Kleurenpalet

| Gebruik | Light | Dark | Regel |
|---|---|---|---|
| Achtergrond | `#FFFFFF` | `#0B0D12` | pagina |
| Oppervlak | `#F4F6FB` | `#141824` | sidebar, muted-vlakken |
| Kaarten | `#FFFFFF` (rand `#E3E8F2`) | `#141824` | widgets |
| Tekst | `#0B0D12` | `#F2F4FA` | altijd |
| Secundaire tekst | `#4A5162` | bestaand tx-2 | bijschriften |
| Blauw vulling (knoppen, actieve pil) | `#0000F2` | `#0000F2` | met witte tekst/icoon (contrast ±8:1) |
| Blauw voor tekst op wit (links, randen) | `#0000F2` | n.v.t. | contrast op wit ±8:1 |
| Blauw-tint (subtiele vlakken) | `#E5E7FF` | `#232A55` | hover/selected-wash |
| Blauw in dark-modus (tekst/accent) | n.v.t. | `#8F9BFF` (afgeleid) | contrast op donker ±7:1 |
| Succes / fout | bestaande groen/rood-tokens | bestaande dark-varianten | ongewijzigd |

**Toegestaan:** witte tekst op blauw (contrast ±8:1, beide modi met eigen blauwtint).

## 3. Tokens (enige stijl-ingreep: `globals.css`)

```css
@theme {
  --camil-blue-100: #E5E7FF;
  --camil-blue-300: #8F9BFF;
  --camil-blue-500: #0000F2;
  --camil-blue-700: #0000C8;
}
:root {
  --background: #FFFFFF;
  --card: #FFFFFF;
  --foreground: #0B0D12;
  --primary: var(--camil-blue-500);
  --primary-foreground: #FFFFFF;
  --accent: var(--camil-blue-100);
  --accent-foreground: #0B0D12;
  --ring: var(--camil-blue-700);
  --sidebar: #F4F6FB;
  --sidebar-accent: var(--camil-blue-100);
  --sidebar-accent-foreground: #0B0D12;
  --chart-1: var(--camil-blue-500);
}
.dark {
  --background: #0B0D12;
  --card: #141824;
  --foreground: #F2F4FA;
  --primary: var(--camil-blue-300);
  --primary-foreground: #0B0D12;
  --accent: #232A55;
  --accent-foreground: var(--camil-blue-300);
  --ring: var(--camil-blue-300);
  --sidebar: #141824;
  --sidebar-accent: #232A55;
  --sidebar-accent-foreground: var(--camil-blue-300);
  --chart-1: var(--camil-blue-300);
}
```

Alle componenten (sidebar, topbar, kaarten, toasts, grafieken) volgen via semantische
tokens; geen Tailwind-config-wijziging nodig. Overige Flexoki-tokens blijven staan.

## 4. Layout-regels

- **Sidebar** (`app-sidebar.tsx`, 220px, standaard uitgeklapt): merknaam sans-bold,
  iconen + NL-labels, actief item = blauwe pil (`bg-sidebar-accent`) + 3px blauwe
  linkerrand. Structuur: 4 primair (Overzicht, Geld, Beleggen, Doelen) + 3 secundair
  (Inzichten, Assistent, Instellingen). Collapse-toggle blijft.
- **Bovenbalk**: ongewijzigd, erft tokens.
- **Widgets**: bestaande Card-radius (`--radius`), witte kaart met rand (`--border`),
  subtiele schaduw, blauwe ring **alleen** rond actief/focus-element. Kaarten alleen
  bij inhoudelijke groepering; grafieken en tabellen staan direct op het oppervlak.
- **Dashboard-volgorde**: Mijn Vermogen (hero) → grafiek → snelle acties →
  Recente transacties → Rekeningen → Grootste posities → Mijn Doelen.
- **Teksten**: kort, geen jargon (jargon alleen met directe uitleg). Voorbeelden:
  “Mijn Vermogen”, “Recente transacties”, “Transactie toevoegen”, “Doel aanmaken”,
  “Grootste posities”, “Rekeningen”, “Portefeuille / Vermogen / Uitgaven” (tabs).

## 5. Bestanden per stap

- Sidebar-labels: `app-navigation.tsx` (structuur ongewijzigd), `en/common.json` (waarden),
  `app-sidebar.tsx` (merk + active-state), `navigation-icons.tsx` (bestaande Icons).
- Dashboard: `dashboard-content.tsx`, `balance.tsx` (hero), `HistoryChart` (lijn via
  `--chart-1`), nieuw: `recent-transactions.tsx`, `quick-actions.tsx`.
- Globaal: alleen `globals.css`.
