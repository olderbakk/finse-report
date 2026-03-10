# Style Guide — finse-report

Derived from the Travers OS design language.

---

## Colors

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#eeecea` | Page background (warm off-white) |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-border` | `#e2dfd9` | Borders, dividers, progress track |
| `--color-text` | `#1a1a1a` | Primary text |
| `--color-muted` | `#888580` | Secondary text, captions |
| `--color-label` | `#aaa49d` | All-caps section labels |
| `--color-body` | `#d14f40` | Body metric — warm red |
| `--color-mind` | `#4a7fc1` | Mind metric — medium blue |
| `--color-soul` | `#4e9a52` | Soul metric — medium green |
| `--color-soul-bg` | `#b87333` | Soul filter pill — amber/brown |

---

## Typography

Font: **Geist Sans** (system-ui fallback)

| Role | Size | Weight | Notes |
|---|---|---|---|
| Page title | 24px | 700 | `text-2xl font-bold` |
| Subtitle | 13px | 400 | `text-sm`, `--color-muted` |
| Section label | 11px | 600 | Uppercase, `tracking-widest`, `--color-label` |
| Card heading | 15px | 600 | `text-base font-semibold` |
| Body text | 14px | 400 | `text-sm` |
| Score big | 28px | 700 | `text-3xl font-bold` |
| Score label | 10px | 400 | Uppercase `tracking-widest`, `--color-muted` |
| Nav link | 14px | 400 | `text-sm` |
| Metric label | 11px | 600 | Uppercase, colored per metric |

---

## Buttons

### Primary
Black fill, white text.
```
px-4 py-2, text-sm font-medium, border-radius: 8px
background: --color-btn-primary (#1a1a1a)
color: white
```

### Ghost
White fill, subtle border.
```
px-4 py-2, text-sm font-medium, border-radius: 8px
background: white
border: 1px solid --color-btn-ghost-border (#d4d0ca)
color: --color-text
```

---

## Tabs & Pills

### Segment tabs (person/group selector)
Pill-shaped. Active = black fill. Inactive = transparent + border.
```
px-3 py-1, text-sm, border-radius: 999px
Active:   background: #1a1a1a, color: white
Inactive: border: 1px solid --color-border, color: --color-text
```

### Metric filter pills
Always filled with metric color. White text.
```
Body → --color-body-bg (#d14f40)
Mind → --color-mind-bg (#4a7fc1)
Soul → --color-soul-bg (#b87333)
px-3 py-1, text-sm font-medium, border-radius: 999px
```

### View mode tabs (Rå / Glattet / Trend)
Segmented control, inline border. Active = white bg. Inactive = transparent.
```
Grouped with outer border: 1px solid --color-border
Each segment: px-3 py-1, text-sm
Active: background: white, color: --color-text
Inactive: background: transparent, color: --color-muted
```

---

## Cards

```
background: --color-surface (#ffffff)
border: 1px solid --color-border
border-radius: 12px (--radius-lg)
box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
padding: 20px (p-5)
```

---

## Progress Bars (BMS scores)

```
Track: background --color-border, height 8px, border-radius: 999px
Fill:  background matching metric color, same height/radius
```

---

## Person Chips

Small card with initial avatar + name + B/M/S scores.
```
Avatar: 32x32px, border-radius: 4px, bg --color-bg, text --color-muted
Name: text-sm font-semibold
Scores: text-xs, colored per metric
Card: surface + border + shadow + border-radius-lg
```

---

## Spacing & Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Avatar chips, small elements |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-pill` | 999px | Tabs, pills |

Base spacing unit: **4px**. Use multiples: 4, 8, 12, 16, 20, 24, 32, 48.

---

## Layout

- Max content width: ~960px, centered
- Page padding: 48px horizontal on desktop
- Card gap: 16–24px
- Section gap: 32–48px

---

## Iconography

- Use simple line icons (Lucide or similar)
- Size: 16px inline, 20px standalone
- Color: `--color-muted` by default, metric color when semantic

---

## Live style guide

Run the app and visit `/styleguide` to see all tokens rendered.
