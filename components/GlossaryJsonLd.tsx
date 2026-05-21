import { glossary } from "@/lib/glossary";
import { siteUrl } from "@/lib/site";

const GLOSSARY_URL = `${siteUrl}/glossary`;

function stripMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export default function GlossaryJsonLd() {
  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": GLOSSARY_URL,
    name: "Watchfire Glossary",
    description:
      "Plain-English definitions of every Watchfire term, mode, and concept.",
    url: GLOSSARY_URL,
    hasDefinedTerm: glossary.map((entry) => ({
      "@type": "DefinedTerm",
      "@id": `${GLOSSARY_URL}#${entry.slug}`,
      name: entry.term,
      termCode: entry.slug,
      description: stripMarkdown(entry.definition),
      url: `${GLOSSARY_URL}#${entry.slug}`,
      inDefinedTermSet: GLOSSARY_URL,
    })),
  };

  return (
    <script
      id="ld-glossary"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
    />
  );
}
