# Camilfolio Stijlgids — banking-stijl (licht + goud)

> Fork-keuze, geen upstream-stijl. “EN”-locale draagt in deze fork Nederlandse waarden
> (bewuste vereenvoudiging: geen `nl/`-locale, dus geen Rust- of lint-wijzigingen nodig).
> Donkere modus blijft werken en krijgt hetzelfde goud-accent.

## 1. Herkomst

- De Hermes-pagina (hermes-agent.nousresearch.com) is **ultramarijn blauw (#0000F2)**,
  geen goud. Goud is een eigen Camilfolio-keuze voor een banking-uitstraling.
- Lettertype: **Inter Variable**, al standaard (`globals.css`, gebundeld via fontsource).
  Geen Google Fonts (app is offline-first). Cijfers/titels: Inter, geen serif voor merknaam.

## 2. Kleurenpalet

| Gebruik | Light | Dark | Regel |
|---|---|---|---|
| Achtergrond | `#FFFFFF` | `#1C1B1A` (bestaand base-950) | pagina |
| Kaarten | `#F8F7F2` | `#282726` (bestaand base-900) | widgets |
| Tekst | `#1A1A1A` | `#E8E6DF` (bestaand tx) | altijd |
| Secundaire tekst | `#575653` | `#8A887F` (bestaand tx-2) | bijschriften |
| Goud vulling (knoppen, actieve pil) | `#C9A227` | `#C9A227` | **alleen met donkere tekst/icoon** (`#1A1A1A`, contrast ±7:1) |
| Goud voor tekst op wit (links, randen) | `#8A6D15` | n.v.t. | contrast op wit ±5:1 |
| Goud-tint (subtiele vlakken) | `#F7EFD2` | `#3A2D04` (yellow-900) | hover/selected-wash |
| Goud in dark-modus (tekst/accent) | n.v.t. | `#E3C565` | contrast op donker ±7:1 |
| Succes / fout | bestaande groen/rood-tokens | bestaande dark-varianten | ongewijzigd |

**Verboden:** witte tekst op goud (contrast < 3:1). Wit op `#8A6D15` mag wel (±4,6:1, alleen grote tekst).

## 3. Tokens (enige stijl-ingreep: `globals.css`)

```css
@theme {
  --camil-gold-100: #F7EFD2;
  --camil-gold-300: #E3C565;
  --camil-gold-500: #C9A227;
  --camil-gold-700: #8A6D15;
}
:root {
  --background: #FFFFFF;
  --card: #F8F7F2;
  --foreground: #1A1A1A;
  --primary: var(--camil-gold-500);
  --primary-foreground: #1A1A1A;
  --accent: var(--camil-gold-100);
  --accent-foreground: #1A1A1A;
  --ring: var(--camil-gold-700);
  --sidebar-accent: var(--camil-gold-100);
  --sidebar-accent-foreground: #1A1A1A;
  --chart-1: var(--camil-gold-500);
}
.dark {
  --card: #282726;
  --foreground: #E8E6DF;
  --primary: var(--camil-gold-300);
  --primary-foreground: #1A1A1A;
  --accent: #3A2D04;
  --accent-foreground: var(--camil-gold-300);
  --ring: var(--camil-gold-300);
  --sidebar-accent: #3A2D04;
  --sidebar-accent-foreground: var(--camil-gold-300);
  --chart-1: var(--camil-gold-300);
}
```

Alle componenten (sidebar, topbar, kaarten, toasts, grafieken) volgen via semantische
tokens; geen Tailwind-config-wijziging nodig. Overige Flexoki-tokens blijven staan.

## 4. Layout-regels

- **Sidebar** (`app-sidebar.tsx`, 220px, standaard uitgeklapt): merknaam sans-bold,
  iconen + NL-labels, actief item = goud-pil (`bg-sidebar-accent`) + 3px gouden
  linkerrand. Collapse-toggle blijft.
- **Bovenbalk**: ongewijzigd, erft tokens.
- **Widgets**: bestaande Card-radius (`--radius`), lichte kaart-achtergrond, subtiele
  schaduw (`shadow-sm`), gouden ring **alleen** rond actief/focus-element.
- **Dashboard-volgorde**: Mijn Vermogen (hero) → grafiek → snelle acties →
  Recente transacties → Rekeningen → Grootste posities → Mijn Doelen.
- **Teksten**: kort, geen jargon. Voorbeelden: “Mijn Vermogen”, “Recente transacties”,
  “Transactie toevoegen”, “Doel aanmaken”, “Grootste posities”, “Rekeningen”.

## 5. Bestanden per stap

- Sidebar-labels: `app-navigation.tsx` (structuur ongewijzigd), `en/common.json` (waarden),
  `app-sidebar.tsx` (merk + active-state), `navigation-icons.tsx` (bestaande Icons).
- Dashboard: `dashboard-content.tsx`, `balance.tsx` (hero), `HistoryChart` (lijn via
  `--chart-1`), nieuw: `recent-transactions.tsx`, `quick-actions.tsx`.
- Globaal: alleen `globals.css`.
