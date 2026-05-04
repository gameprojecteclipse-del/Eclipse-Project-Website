import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SITE_URL } from "@/lib/constants";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

export const useSEO = ({ title, description, path }: SEOProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", description);

    // Update lang attribute for SEO
    document.documentElement.lang = i18n.language;

    // Update canonical URL
    const canonicalUrl = path ? `${SITE_URL}${path}` : SITE_URL;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = canonicalUrl;
    } else {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = canonicalUrl;
      document.head.appendChild(canonical);
    }

  }, [title, description, i18n.language, path]);
};
