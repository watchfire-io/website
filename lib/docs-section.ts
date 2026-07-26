const SECTION_LABELS: Record<string, string> = {
  concepts: "Concepts",
  commands: "Commands reference",
  components: "Components",
  changelog: "Changelog",
  installation: "Getting started",
  quickstart: "Getting started",
};

export function sectionLabel(slug?: string[]): string {
  if (!slug || slug.length === 0) return "Documentation";
  const first = slug[0];
  if (SECTION_LABELS[first]) return SECTION_LABELS[first];
  return first.charAt(0).toUpperCase() + first.slice(1).replace(/-/g, " ");
}
