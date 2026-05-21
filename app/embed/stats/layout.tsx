import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function EmbedStatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="embed-stats-root flex min-h-screen items-center justify-center bg-transparent p-3"
      style={{ fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        html, body { background: transparent !important; }
      `}</style>
      {children}
    </div>
  );
}
