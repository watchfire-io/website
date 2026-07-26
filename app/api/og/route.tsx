import { ImageResponse } from "next/og";
import { sectionLabel } from "@/lib/docs-section";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  const sliced = value.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? sliced.slice(0, lastSpace) : sliced;
  return `${cut.replace(/[\s,;:.\-—]+$/, "")}…`;
}

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer> {
  const familyParam = family.replace(/ /g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      // Pre-woff2 Chrome UA so Google Fonts returns a woff Satori can decode
      // (modern UAs get woff2, which is not supported).
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.0.0 Safari/537.36",
    },
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\((https?:[^)]+)\)/);
  if (!match) throw new Error(`Could not parse font src for ${family} ${weight}`);
  const fontRes = await fetch(match[1]);
  return await fontRes.arrayBuffer();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slugParam = url.searchParams.get("slug");
  const slug = slugParam ? slugParam.split("/").filter(Boolean) : undefined;

  const title = url.searchParams.get("title") || "Documentation";
  const description =
    url.searchParams.get("description") ||
    "Better context. Better code. Watchfire turns clear specs into scoped tasks for AI coding agents.";
  const section = url.searchParams.get("section") || sectionLabel(slug);

  const truncatedTitle = truncate(title, 80);
  const truncatedDescription = truncate(description, 140);

  const characterSet = `${section}${truncatedTitle}${truncatedDescription}WatchfireDocumentationwatchfire.io`;

  const [outfitRegular, outfitSemibold, outfitBold, monoRegular] =
    await Promise.all([
      loadGoogleFont("Outfit", 400, characterSet),
      loadGoogleFont("Outfit", 600, characterSet),
      loadGoogleFont("Outfit", 700, characterSet),
      loadGoogleFont("JetBrains Mono", 400, "watchfire.io"),
    ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#16181d",
          padding: "72px 80px",
          fontFamily: "Outfit",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        {/* Fire/ember radial gradient — top-right */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 800,
            height: 800,
            background:
              "radial-gradient(circle at center, rgba(224, 112, 64, 0.45) 0%, rgba(226, 144, 32, 0.25) 30%, rgba(22, 24, 29, 0) 70%)",
            display: "flex",
          }}
        />
        {/* Ember accent — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -180,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle at center, rgba(255, 107, 53, 0.32) 0%, rgba(224, 112, 64, 0.16) 30%, rgba(22, 24, 29, 0) 70%)",
            display: "flex",
          }}
        />

        {/* Header — flame logo + wordmark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 1 C32 1 10 24 10 42 C10 56 20 63 32 63 C44 63 54 56 54 42 C54 24 32 1 32 1Z"
              fill="#ff6b35"
            />
            <path
              d="M32 12 C32 12 16 32 16 44 C16 54 23 60 32 60 C41 60 48 54 48 44 C48 32 32 12 32 12Z"
              fill="#ffb347"
            />
            <path
              d="M32 23 C32 23 22 38 22 47 C22 54 26 58 32 58 C38 58 42 54 42 47 C42 38 32 23 32 23Z"
              fill="#fff5e6"
            />
          </svg>
          <span
            style={{
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: "#fff5e6",
            }}
          >
            Watchfire
          </span>
        </div>

        {/* Main content — title block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background:
                  "linear-gradient(90deg, #ff6b35 0%, #e07040 50%, #e29020 100%)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#e88050",
              }}
            >
              {section}
            </span>
          </div>
          <div
            style={{
              fontSize: truncatedTitle.length > 40 ? 76 : 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#fff5e6",
              display: "flex",
            }}
          >
            {truncatedTitle}
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.35,
              color: "rgba(244, 244, 245, 0.72)",
              display: "flex",
            }}
          >
            {truncatedDescription}
          </div>
        </div>

        {/* Footer — divider + URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(224, 112, 64, 0.25)",
            paddingTop: 24,
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(244, 244, 245, 0.6)",
            }}
          >
            Documentation
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 24,
              fontWeight: 400,
              color: "#e29020",
            }}
          >
            watchfire.io
          </span>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "Outfit", data: outfitRegular, weight: 400, style: "normal" },
        { name: "Outfit", data: outfitSemibold, weight: 600, style: "normal" },
        { name: "Outfit", data: outfitBold, weight: 700, style: "normal" },
        {
          name: "JetBrains Mono",
          data: monoRegular,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
