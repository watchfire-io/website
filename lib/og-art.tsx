/**
 * Deterministic per-post artwork for the OG image renderer.
 *
 * Every blog post gets a distinct illustration instead of the shared default
 * card. Selection is stable: the same slug always yields the same motif and
 * palette, so a post's social image never changes underneath a shared link.
 *
 * Rendered by Satori (next/og), so this is limited to plain SVG primitives —
 * no CSS filters, no external assets.
 */

const FIRE = "#e07040";
const FIRE_BRIGHT = "#ff6b35";
const EMBER = "#e29020";
const EMBER_LIGHT = "#ffb347";
const FLAME = "#fff5e6";

/** Palette pairs, chosen by hash. Each is [primary, secondary]. */
const PALETTES: [string, string][] = [
  [FIRE_BRIGHT, EMBER],
  [EMBER, FIRE],
  [FIRE, EMBER_LIGHT],
  [EMBER_LIGHT, FIRE_BRIGHT],
];

/**
 * Tag → motif, ordered most-specific first. A post usually carries both a
 * subject tag and a generic one ("release", "deep-dive"), so this is scanned
 * in priority order rather than in the post's own tag order — otherwise
 * "release" would win over "mcp" and every release post would look alike.
 * Anything unmatched falls through to a hash pick.
 */
const TAG_MOTIFS: [string, MotifName][] = [
  ["mcp", "network"],
  ["worktrees", "branch"],
  ["wildfire", "loop"],
  ["sandboxing", "shield"],
  ["security", "shield"],
  ["metrics", "bars"],
  ["insights", "bars"],
  ["prompting", "pipeline"],
  ["tasks", "pipeline"],
  ["collaboration", "grid"],
  ["teams", "grid"],
  ["migration", "arrows"],
  ["adoption", "arrows"],
  ["dogfood", "bars"],
  ["retrospective", "bars"],
  ["git", "branch"],
  ["daemon", "network"],
  ["workflow", "pipeline"],
  ["agents", "loop"],
  ["positioning", "arrows"],
  // Generic last — these only decide when nothing above matched.
  ["architecture", "layers"],
  ["release", "burst"],
];

export type MotifName =
  | "network"
  | "layers"
  | "branch"
  | "loop"
  | "pipeline"
  | "bars"
  | "grid"
  | "shield"
  | "burst"
  | "arrows";

const ALL_MOTIFS: MotifName[] = [
  "network",
  "layers",
  "branch",
  "loop",
  "pipeline",
  "bars",
  "grid",
  "shield",
  "burst",
  "arrows",
];

/** FNV-1a. Small, stable, and dependency-free. */
export function hashString(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function pickMotif(slug: string, tags: string[] = []): MotifName {
  const lower = new Set(tags.map((t) => t.toLowerCase()));
  for (const [tag, motif] of TAG_MOTIFS) {
    if (lower.has(tag)) return motif;
  }
  return ALL_MOTIFS[hashString(slug) % ALL_MOTIFS.length];
}

export function pickPalette(slug: string): [string, string] {
  // Offset the hash so palette and motif don't move in lockstep.
  return PALETTES[hashString(`${slug}:palette`) % PALETTES.length];
}

/**
 * Render the motif as an SVG panel. Sized for the right-hand column of the
 * 1200×630 card.
 */
export function renderMotif(
  motif: MotifName,
  primary: string,
  secondary: string,
  seed: number,
  /**
   * Satori needs concrete pixel dimensions for the OG card; the on-site
   * components pass "100%" so the same motif scales to its container.
   */
  size: number | string = 360
): React.ReactElement {
  const common = { width: size, height: size, viewBox: "0 0 360 360" };

  switch (motif) {
    case "network":
      return (
        <svg {...common} fill="none">
          <line x1="180" y1="60" x2="80" y2="180" stroke={secondary} strokeWidth="3" opacity="0.5" />
          <line x1="180" y1="60" x2="280" y2="180" stroke={secondary} strokeWidth="3" opacity="0.5" />
          <line x1="80" y1="180" x2="180" y2="300" stroke={secondary} strokeWidth="3" opacity="0.5" />
          <line x1="280" y1="180" x2="180" y2="300" stroke={secondary} strokeWidth="3" opacity="0.5" />
          <line x1="80" y1="180" x2="280" y2="180" stroke={primary} strokeWidth="4" />
          <circle cx="180" cy="60" r="26" fill={primary} />
          <circle cx="80" cy="180" r="20" fill={secondary} />
          <circle cx="280" cy="180" r="20" fill={secondary} />
          <circle cx="180" cy="300" r="26" fill={FLAME} opacity="0.9" />
        </svg>
      );

    case "layers":
      return (
        <svg {...common} fill="none">
          <rect x="50" y="222" width="260" height="56" rx="12" fill={primary} opacity="0.35" />
          <rect x="72" y="152" width="216" height="56" rx="12" fill={primary} opacity="0.6" />
          <rect x="94" y="82" width="172" height="56" rx="12" fill={secondary} opacity="0.9" />
          <rect x="116" y="24" width="128" height="44" rx="10" fill={FLAME} opacity="0.85" />
        </svg>
      );

    case "branch":
      return (
        <svg {...common} fill="none">
          <path d="M110 320 L110 120" stroke={primary} strokeWidth="6" strokeLinecap="round" />
          <path d="M110 200 C110 150 180 150 180 100" stroke={secondary} strokeWidth="5" strokeLinecap="round" />
          <path d="M110 250 C110 210 250 210 250 160" stroke={secondary} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <circle cx="110" cy="320" r="18" fill={primary} />
          <circle cx="110" cy="120" r="16" fill={primary} />
          <circle cx="180" cy="100" r="20" fill={FLAME} opacity="0.9" />
          <circle cx="250" cy="160" r="16" fill={secondary} />
        </svg>
      );

    case "loop":
      return (
        <svg {...common} fill="none">
          <circle cx="180" cy="180" r="120" stroke={primary} strokeWidth="8" opacity="0.35" />
          <path d="M180 60 A120 120 0 0 1 300 180" stroke={primary} strokeWidth="10" strokeLinecap="round" />
          <path d="M300 180 A120 120 0 0 1 180 300" stroke={secondary} strokeWidth="10" strokeLinecap="round" />
          <circle cx="180" cy="180" r="46" fill={FLAME} opacity="0.9" />
          <circle cx="180" cy="60" r="16" fill={primary} />
        </svg>
      );

    case "pipeline":
      return (
        <svg {...common} fill="none">
          <rect x="40" y="120" width="80" height="120" rx="14" fill={primary} opacity="0.85" />
          <rect x="140" y="120" width="80" height="120" rx="14" fill={secondary} opacity="0.7" />
          <rect x="240" y="120" width="80" height="120" rx="14" fill={FLAME} opacity="0.55" />
          <path d="M126 180 L134 180" stroke={FLAME} strokeWidth="6" strokeLinecap="round" />
          <path d="M226 180 L234 180" stroke={FLAME} strokeWidth="6" strokeLinecap="round" />
          <circle cx="80" cy="90" r="12" fill={primary} />
          <circle cx="180" cy="90" r="12" fill={secondary} />
          <circle cx="280" cy="90" r="12" fill={FLAME} opacity="0.8" />
        </svg>
      );

    case "bars":
      return (
        <svg {...common} fill="none">
          <rect x="50" y="220" width="46" height="90" rx="10" fill={secondary} opacity="0.6" />
          <rect x="116" y="160" width="46" height="150" rx="10" fill={primary} opacity="0.8" />
          <rect x="182" y="100" width="46" height="210" rx="10" fill={primary} />
          <rect x="248" y="52" width="46" height="258" rx="10" fill={FLAME} opacity="0.85" />
          <line x1="40" y1="322" x2="320" y2="322" stroke={secondary} strokeWidth="4" opacity="0.5" />
        </svg>
      );

    case "grid":
      return (
        <svg {...common} fill="none">
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => {
              const on = (seed >> (row * 3 + col)) & 1;
              return (
                <rect
                  key={`${row}-${col}`}
                  x={56 + col * 92}
                  y={56 + row * 92}
                  width="72"
                  height="72"
                  rx="14"
                  fill={on ? primary : secondary}
                  opacity={on ? 0.9 : 0.35}
                />
              );
            })
          )}
        </svg>
      );

    case "shield":
      return (
        <svg {...common} fill="none">
          <path
            d="M180 40 L300 92 L300 186 C300 258 244 302 180 322 C116 302 60 258 60 186 L60 92 Z"
            fill={primary}
            opacity="0.28"
          />
          <path
            d="M180 76 L268 114 L268 186 C268 240 226 274 180 290 C134 274 92 240 92 186 L92 114 Z"
            fill={secondary}
            opacity="0.55"
          />
          <path d="M144 186 L172 214 L224 156" stroke={FLAME} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case "burst":
      return (
        <svg {...common} fill="none">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const inner = 62;
            const outer = i % 2 === 0 ? 150 : 116;
            return (
              <line
                key={i}
                x1={180 + Math.cos(a) * inner}
                y1={180 + Math.sin(a) * inner}
                x2={180 + Math.cos(a) * outer}
                y2={180 + Math.sin(a) * outer}
                stroke={i % 2 === 0 ? primary : secondary}
                strokeWidth="10"
                strokeLinecap="round"
                opacity={i % 2 === 0 ? 0.95 : 0.6}
              />
            );
          })}
          <circle cx="180" cy="180" r="48" fill={FLAME} opacity="0.9" />
        </svg>
      );

    case "arrows":
    default:
      return (
        <svg {...common} fill="none">
          <path d="M56 118 L246 118" stroke={secondary} strokeWidth="10" strokeLinecap="round" opacity="0.55" />
          <path d="M212 84 L250 118 L212 152" stroke={secondary} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
          <path d="M56 242 L286 242" stroke={primary} strokeWidth="12" strokeLinecap="round" />
          <path d="M248 204 L292 242 L248 280" stroke={primary} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="70" cy="180" r="14" fill={FLAME} opacity="0.8" />
        </svg>
      );
  }
}
