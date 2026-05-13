export interface OrganizationRef {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: { "@type": "ImageObject"; url: string };
}

export interface BreadcrumbListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface BreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbListItem[];
}

export interface TechArticle {
  "@context": "https://schema.org";
  "@type": "TechArticle";
  headline: string;
  description?: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: OrganizationRef;
  publisher: OrganizationRef;
  inLanguage: "en";
}

export interface HowToStep {
  "@type": "HowToStep";
  position: number;
  name: string;
  text: string;
  url?: string;
}

export interface HowTo {
  "@context": "https://schema.org";
  "@type": "HowTo";
  name: string;
  totalTime?: string;
  step: HowToStep[];
}

export interface ArticleEntry {
  "@context": "https://schema.org";
  "@type": "Article";
  "@id": string;
  headline: string;
  url: string;
  datePublished: string;
  author: OrganizationRef;
  publisher: OrganizationRef;
  articleBody: string;
  inLanguage: "en";
}

export interface HowToFrontmatterStep {
  name: string;
  text: string;
  url?: string;
}

export interface HowToFrontmatter {
  name: string;
  totalTime?: string;
  steps: HowToFrontmatterStep[];
}
