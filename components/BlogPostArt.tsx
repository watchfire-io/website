import { hashString, pickMotif, pickPalette, renderMotif } from "@/lib/og-art";

/**
 * The on-site twin of the generated OG card art.
 *
 * Both call the same pickMotif/pickPalette helpers, so the illustration on a
 * post page matches the image that shows up when the post is shared. Rendered
 * as inline SVG rather than the /api/og PNG — crisper, scales to any width,
 * and costs no extra request per card.
 */
export default function BlogPostArt({
  slug,
  tags = [],
  className = "",
  priority = false,
}: {
  slug: string;
  tags?: string[];
  className?: string;
  /** Hero placement gets a larger motif; cards stay compact. */
  priority?: boolean;
}) {
  const motif = pickMotif(slug, tags);
  const [primary, secondary] = pickPalette(slug);
  const seed = hashString(slug);

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#16181d] ${className}`}
      aria-hidden="true"
    >
      {/* Fire glow — top right, mirrors the OG card composition */}
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/2 h-[150%] w-[80%]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(224,112,64,0.42) 0%, rgba(226,144,32,0.22) 32%, rgba(22,24,29,0) 70%)",
        }}
      />
      {/* Ember glow — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-1/2 -left-1/4 h-[140%] w-[70%]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,107,53,0.30) 0%, rgba(224,112,64,0.14) 32%, rgba(22,24,29,0) 70%)",
        }}
      />

      <div
        className={`relative ${priority ? "h-[62%] w-[62%]" : "h-[70%] w-[70%]"}`}
      >
        {renderMotif(motif, primary, secondary, seed, "100%")}
      </div>
    </div>
  );
}
