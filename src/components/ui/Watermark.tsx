/* ============================================================
   WATERMARK MOTIFS
   Stylised Chitwan silhouettes (wildlife + flora) used as very
   low-opacity floating background art. They replace the old
   alternating section background colours: every section now sits
   on white, and gets its identity from motif + composition.

   Usage:
     <Watermark motif="elephant" className="w-72 -left-16 top-24 text-gold/5" />

   The caller supplies size, position and colour via className so
   each section can tune its own composition. `fill="currentColor"`
   means the text colour drives the silhouette.
   ============================================================ */

export type Motif =
  | "elephant"
  | "rhino"
  | "deer"
  | "bird"
  | "paw"
  | "tree"
  | "palm"
  | "fern"
  | "leaf"
  | "grass";

/** viewBox per motif — keeps each silhouette's natural proportions. */
const VIEW_BOX: Record<Motif, string> = {
  elephant: "0 0 240 180",
  rhino: "0 0 240 180",
  deer: "0 0 200 200",
  bird: "0 0 200 100",
  paw: "0 0 140 160",
  tree: "0 0 200 220",
  palm: "0 0 200 220",
  fern: "0 0 160 240",
  leaf: "0 0 120 200",
  grass: "0 0 200 160",
};

function Shape({ motif }: { motif: Motif }) {
  switch (motif) {
    /* -------- Wildlife -------- */
    case "elephant":
      return (
        <>
          {/* legs first so the body reads as one mass on top of them */}
          <rect x="56" y="104" width="25" height="56" rx="12" />
          <rect x="88" y="108" width="23" height="52" rx="11" />
          <rect x="132" y="106" width="25" height="54" rx="12" />
          <rect x="160" y="104" width="23" height="56" rx="11" />
          {/* tail */}
          <path d="M47 72c-7 12-13 26-14 40 -1 6 3 10 7 8 4-2 3-7 1-10 -2-6 2-22 11-32Z" />
          {/* body */}
          <ellipse cx="105" cy="88" rx="62" ry="42" />
          {/* head */}
          <ellipse cx="182" cy="84" rx="32" ry="33" />
          {/* ear */}
          <ellipse cx="164" cy="88" rx="25" ry="29" />
          {/* tusk */}
          <path d="M197 116c8 2 15 6 19 11 -6-2-13-4-19-5Z" />
          {/* trunk */}
          <path d="M191 100c2 18 4 34 8 46 2 7 8 11 13 7 4-3 2-9-3-9 -3 0-4-5-5-11 -2-13 1-23 3-34Z" />
        </>
      );

    case "rhino":
      return (
        <>
          <rect x="54" y="110" width="25" height="50" rx="11" />
          <rect x="86" y="112" width="23" height="48" rx="10" />
          <rect x="132" y="110" width="25" height="50" rx="11" />
          <rect x="158" y="112" width="23" height="48" rx="10" />
          <path d="M44 80c-6 10-10 20-10 30 0 5 4 8 7 6 3-2 2-6 1-9 -1-5 2-16 8-24Z" />
          {/* body + arched shoulder hump */}
          <ellipse cx="104" cy="94" rx="62" ry="36" />
          <ellipse cx="92" cy="70" rx="36" ry="17" />
          {/* head, dipped toward the ground */}
          <path d="M148 70c22-2 46 13 64 33 6 7 4 17-5 17 -14 0-38-4-54-14 -11-7-15-27-5-36Z" />
          {/* ear */}
          <path d="M148 64c-2-8 2-14 8-12 5 2 5 10 1 16Z" />
          {/* horns */}
          <path d="M209 99c-2-14 1-27 8-35 2 12 4 27 2 37Z" />
          <path d="M191 89c0-8 2-14 5-18 2 8 2 16 1 21Z" />
        </>
      );

    case "deer":
      return (
        <>
          <rect x="58" y="118" width="15" height="62" rx="7" />
          <rect x="80" y="120" width="14" height="60" rx="7" />
          <rect x="122" y="118" width="15" height="62" rx="7" />
          <rect x="142" y="120" width="14" height="60" rx="7" />
          <ellipse cx="106" cy="106" rx="50" ry="28" />
          {/* neck + head */}
          <path d="M140 96c6-16 14-30 22-40l16 8c-8 12-14 26-16 40Z" />
          <ellipse cx="172" cy="52" rx="17" ry="12" transform="rotate(-38 172 52)" />
          {/* antlers */}
          <path d="M176 40c-3-12-2-22 3-30 1 9 2 16 5 22 3-5 8-8 14-9 -6 5-10 10-12 17Z" />
          <path d="M164 38c-7-9-10-19-9-28 4 8 8 14 13 18 0-6 2-11 6-15 -3 7-4 13-3 20Z" />
          {/* tail */}
          <path d="M58 92c-8 2-13 8-14 15 5-4 10-6 16-6Z" />
        </>
      );

    case "bird":
      return (
        <path d="M10 72C40 22 76 26 100 56 124 26 160 22 190 72 160 42 125 46 100 72 75 46 40 42 10 72Z" />
      );

    case "paw":
      return (
        <>
          <path d="M70 74c26 0 42 18 42 36 0 22-18 34-42 34s-42-12-42-34c0-18 16-36 42-36Z" />
          <ellipse cx="32" cy="58" rx="13" ry="17" transform="rotate(-22 32 58)" />
          <ellipse cx="56" cy="40" rx="13" ry="18" transform="rotate(-8 56 40)" />
          <ellipse cx="86" cy="40" rx="13" ry="18" transform="rotate(8 86 40)" />
          <ellipse cx="110" cy="58" rx="13" ry="17" transform="rotate(22 110 58)" />
        </>
      );

    /* -------- Flora -------- */
    case "tree":
      return (
        <>
          <path d="M92 108c-1 32-5 62-14 94h44c-9-32-13-62-14-94Z" />
          <path d="M100 148c-13-10-26-16-40-18 12 8 25 15 40 24Z" />
          <path d="M104 138c12-11 25-18 39-21 -12 9-24 17-39 27Z" />
          <circle cx="100" cy="74" r="52" />
          <circle cx="56" cy="94" r="34" />
          <circle cx="144" cy="94" r="34" />
          <circle cx="100" cy="114" r="40" />
        </>
      );

    case "palm":
      return (
        <>
          <path d="M94 212c-4-42-2-84 12-118l16 6c-13 33-16 72-12 112Z" />
          <path d="M112 92c28-14 60-12 84 4 -28-8-58-6-84 4Z" />
          <path d="M108 92C80 76 46 78 22 94c28-10 60-8 86 2Z" />
          <path d="M112 90c20-26 52-40 80-42 -30 10-58 26-76 48Z" />
          <path d="M108 90C88 62 58 46 28 44c30 12 58 28 76 50Z" />
          <path d="M110 88c-4-28 2-56 14-78 -8 28-6 54-6 78Z" />
          <path d="M114 96c26 4 52 18 70 36 -26-16-52-24-72-26Z" />
        </>
      );

    case "fern":
      return (
        <>
          <path d="M74 238c-4-56-2-126 12-196l10 4c-14 68-16 136-14 192Z" />
          {Array.from({ length: 9 }).map((_, i) => {
            const t = i / 8;
            const y = 208 - t * 168;
            const x = 80 + t * 5;
            const len = 50 * (1 - t * 0.68);
            return (
              <g key={i}>
                <ellipse
                  cx={x - len / 2}
                  cy={y - 6}
                  rx={len / 2}
                  ry={8}
                  transform={`rotate(-26 ${x - len / 2} ${y - 6})`}
                />
                <ellipse
                  cx={x + len / 2}
                  cy={y - 6}
                  rx={len / 2}
                  ry={8}
                  transform={`rotate(26 ${x + len / 2} ${y - 6})`}
                />
              </g>
            );
          })}
        </>
      );

    case "leaf":
      return (
        <>
          <path d="M60 4c40 40 52 106 0 192C8 110 20 44 60 4Z" />
        </>
      );

    case "grass":
      return (
        <>
          <path d="M28 158c-4-44 6-84 30-116 -12 36-18 76-18 116Z" />
          <path d="M56 158c-6-40-2-78 12-112 -2 38-2 74 0 112Z" />
          <path d="M84 158c-8-46-2-90 18-124 -8 42-8 84-6 124Z" />
          <path d="M112 158c2-44-4-84-22-118 24 30 34 72 34 118Z" />
          <path d="M140 158c4-38 0-74-14-106 20 26 28 64 26 106Z" />
          <path d="M168 158c6-34 4-66-6-94 16 22 20 56 16 94Z" />
        </>
      );
  }
}

export default function Watermark({
  motif,
  className = "",
  flip = false,
  rotate = 0,
  duration = 16,
  delay = 0,
}: {
  motif: Motif;
  /** size + position + colour, e.g. "w-72 top-10 -left-12 text-gold/6" */
  className?: string;
  flip?: boolean;
  /** resting tilt in degrees — the float animation drifts around it */
  rotate?: number;
  /** seconds for one float cycle */
  duration?: number;
  delay?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`watermark pointer-events-none select-none absolute -z-10 ${className}`}
      style={
        {
          "--wm-rot": `${rotate}deg`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties
      }
    >
      <svg
        viewBox={VIEW_BOX[motif]}
        fill="currentColor"
        className={`w-full h-auto ${flip ? "-scale-x-100" : ""}`}
      >
        <Shape motif={motif} />
      </svg>
    </span>
  );
}
