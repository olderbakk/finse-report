export default function StyleGuide() {
  return (
    <div className="min-h-screen p-12" style={{ background: "var(--color-bg)" }}>
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
        Style Guide
      </h1>
      <p className="text-sm mb-12" style={{ color: "var(--color-muted)" }}>
        Visual language for finse-report
      </p>

      {/* ── Colors ─────────────────────────────────────────────────────── */}
      <Section title="Colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Swatch name="Background" token="--color-bg" hex="#eeecea" />
          <Swatch name="Surface" token="--color-surface" hex="#ffffff" border />
          <Swatch name="Border" token="--color-border" hex="#e2dfd9" border />
          <Swatch name="Text" token="--color-text" hex="#1a1a1a" />
          <Swatch name="Muted" token="--color-muted" hex="#888580" />
          <Swatch name="Label" token="--color-label" hex="#aaa49d" />
          <Swatch name="Body (red)" token="--color-body" hex="#d14f40" />
          <Swatch name="Mind (blue)" token="--color-mind" hex="#4a7fc1" />
          <Swatch name="Soul (green)" token="--color-soul" hex="#4e9a52" />
          <Swatch name="Soul badge (amber)" token="--color-soul-bg" hex="#b87333" />
        </div>
      </Section>

      {/* ── Typography ─────────────────────────────────────────────────── */}
      <Section title="Typography">
        <div className="space-y-4">
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              PAGE TITLE — 24px bold
            </p>
            <p className="text-2xl font-bold">BMS</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              SUBTITLE — 13px regular muted
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Ukentlige BMS-registreringer for teamet
            </p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              SECTION LABEL — 11px uppercase tracked
            </p>
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-label)" }}
            >
              Alle møter
            </p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              CARD HEADING — 15px semibold
            </p>
            <p className="text-base font-semibold">2. mars 2026 kl. 09:29</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              SCORE BIG — 28px bold
            </p>
            <p className="text-3xl font-bold">6.9</p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              SCORE LABEL — 10px uppercase tracked muted
            </p>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-muted)" }}
            >
              Snitt
            </p>
          </div>
          <div>
            <p className="text-xs mb-1" style={{ color: "var(--color-label)" }}>
              NAV LINK — 14px regular
            </p>
            <p className="text-sm">BMS · Ansatte · Programmer</p>
          </div>
        </div>
      </Section>

      {/* ── Buttons ────────────────────────────────────────────────────── */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Primary */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer"
            style={{
              background: "var(--color-btn-primary)",
              color: "var(--color-btn-primary-fg)",
              borderRadius: "var(--radius-md)",
            }}
          >
            + Nytt møte
          </button>

          {/* Ghost */}
          <button
            className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer bg-white"
            style={{
              border: "1px solid var(--color-btn-ghost-border)",
              color: "var(--color-text)",
              borderRadius: "var(--radius-md)",
            }}
          >
            + Ny ansatt
          </button>
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--color-muted)" }}>
          Primary: black fill · Ghost: white fill, subtle border
        </p>
      </Section>

      {/* ── Tabs / Pills ───────────────────────────────────────────────── */}
      <Section title="Tabs & Filter Pills">
        {/* Segment tabs */}
        <div className="mb-4">
          <p className="text-xs mb-2" style={{ color: "var(--color-label)" }}>
            SEGMENT TABS (person/group selector)
          </p>
          <div className="flex gap-1 flex-wrap">
            {["Team-snitt", "Elias", "Erlend", "Håkon", "Sigrid"].map((label, i) => (
              <button
                key={label}
                className="px-3 py-1 text-sm cursor-pointer"
                style={{
                  borderRadius: "var(--radius-pill)",
                  ...(i === 0
                    ? {
                        background: "var(--color-btn-primary)",
                        color: "var(--color-btn-primary-fg)",
                      }
                    : {
                        border: "1px solid var(--color-border)",
                        background: "transparent",
                        color: "var(--color-text)",
                      }),
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Metric filter pills */}
        <div className="mb-4">
          <p className="text-xs mb-2" style={{ color: "var(--color-label)" }}>
            METRIC FILTER PILLS (always filled)
          </p>
          <div className="flex gap-2">
            {[
              { label: "Body", color: "var(--color-body-bg)" },
              { label: "Mind", color: "var(--color-mind-bg)" },
              { label: "Soul", color: "var(--color-soul-bg)" },
            ].map(({ label, color }) => (
              <button
                key={label}
                className="px-3 py-1 text-sm text-white font-medium cursor-pointer"
                style={{ background: color, borderRadius: "var(--radius-pill)" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* View mode tabs */}
        <div>
          <p className="text-xs mb-2" style={{ color: "var(--color-label)" }}>
            VIEW MODE TABS (right-aligned, ghost style)
          </p>
          <div
            className="inline-flex rounded-md overflow-hidden"
            style={{ border: "1px solid var(--color-border)" }}
          >
            {["Rå", "Glattet", "Trend"].map((label, i) => (
              <button
                key={label}
                className="px-3 py-1 text-sm cursor-pointer"
                style={{
                  background: i === 0 ? "var(--color-surface)" : "transparent",
                  color: i === 0 ? "var(--color-text)" : "var(--color-muted)",
                  borderRight:
                    i < 2 ? "1px solid var(--color-border)" : "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Cards ──────────────────────────────────────────────────────── */}
      <Section title="Cards">
        {/* Standard card */}
        <div
          className="p-5 mb-4 max-w-md"
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-label)" }}>
            Team-snitt — 2. mars 2026 kl. 09:29
          </p>
          {[
            { label: "BODY", color: "var(--color-body)", value: "6.8", pct: 68 },
            { label: "MIND", color: "var(--color-mind)", value: "7.0", pct: 70 },
            { label: "SOUL", color: "var(--color-soul)", value: "7.0", pct: 70 },
          ].map(({ label, color, value, pct }) => (
            <div key={label} className="flex items-center gap-3 mb-2 last:mb-0">
              <span className="text-xs font-semibold w-10" style={{ color }}>
                {label}
              </span>
              <div className="flex-1 h-2 rounded-full" style={{ background: "var(--color-border)" }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
              <span className="text-sm font-semibold w-6 text-right" style={{ color }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Meeting row card */}
        <div
          className="px-5 py-4 max-w-2xl"
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-card)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "var(--color-muted)" }}>
                2026-03-02
              </p>
              <p className="text-base font-semibold">2. mars 2026 kl. 09:29</p>
              <p className="text-sm mt-0.5" style={{ color: "var(--color-muted)" }}>
                4 scores registrert
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-3 text-sm font-semibold">
                <span style={{ color: "var(--color-body)" }}>B 6.8</span>
                <span style={{ color: "var(--color-mind)" }}>M 7.0</span>
                <span style={{ color: "var(--color-soul)" }}>S 7.0</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold leading-none">6.9</p>
                <p
                  className="text-xs uppercase tracking-widest mt-0.5"
                  style={{ color: "var(--color-muted)" }}
                >
                  Snitt
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Avatar / Person chip ───────────────────────────────────────── */}
      <Section title="Person Chips">
        <div className="flex flex-wrap gap-3">
          {[
            { initial: "E", name: "Elias", b: "6.9", m: "7.1", s: "7.1" },
            { initial: "E", name: "Erlend", b: "6.8", m: "6.9", s: "7.2" },
            { initial: "H", name: "Håkon", b: "7.2", m: "6.7", s: "7.5" },
            { initial: "S", name: "Sigrid", b: "7.1", m: "7.4", s: "7.5" },
          ].map(({ initial, name, b, m, s }) => (
            <div
              key={name}
              className="flex items-center gap-3 px-3 py-2"
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
                minWidth: 160,
              }}
            >
              <div
                className="w-8 h-8 flex items-center justify-center text-sm font-semibold rounded"
                style={{
                  background: "var(--color-bg)",
                  color: "var(--color-muted)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {initial}
              </div>
              <div>
                <p className="text-sm font-semibold leading-none mb-1">{name}</p>
                <p className="text-xs leading-none">
                  <span style={{ color: "var(--color-body)" }}>B {b}</span>{" "}
                  <span style={{ color: "var(--color-mind)" }}>M {m}</span>{" "}
                  <span style={{ color: "var(--color-soul)" }}>S {s}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Spacing & Radius ───────────────────────────────────────────── */}
      <Section title="Spacing & Radius">
        <div className="flex gap-4 items-end flex-wrap">
          {[
            { label: "sm — 4px", size: 4 },
            { label: "md — 8px", size: 8 },
            { label: "lg — 12px", size: 12 },
            { label: "pill — 999px", size: 999 },
          ].map(({ label, size }) => (
            <div key={label} className="text-center">
              <div
                className="w-16 h-16 mb-2"
                style={{
                  background: "var(--color-border)",
                  border: "2px solid var(--color-muted)",
                  borderRadius: Math.min(size, 32),
                }}
              />
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <h2
        className="text-xs font-semibold tracking-widest uppercase mb-5 pb-2"
        style={{
          color: "var(--color-label)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({
  name,
  token,
  hex,
  border,
}: {
  name: string;
  token: string;
  hex: string;
  border?: boolean;
}) {
  return (
    <div>
      <div
        className="w-full h-14 rounded-md mb-1"
        style={{
          background: `var(${token})`,
          borderRadius: "var(--radius-md)",
          border: border ? "1px solid var(--color-border)" : undefined,
        }}
      />
      <p className="text-xs font-medium" style={{ color: "var(--color-text)" }}>
        {name}
      </p>
      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
        {hex}
      </p>
      <p className="text-xs font-mono" style={{ color: "var(--color-label)" }}>
        {token}
      </p>
    </div>
  );
}
