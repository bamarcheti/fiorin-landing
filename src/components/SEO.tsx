import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  article?: {
    publishedTime?: string;
    author?: string;
    section?: string;
  };
  jsonLd?: object;
}

export const SEO = ({
  title,
  description,
  canonical,
  type = "website",
  image = "https://fiorinadvocacia.com.br/og-image.jpg",
  article,
  jsonLd,
}: SEOProps) => {
  const siteName = "Fiorin Advocacia";
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic SEO
    updateMeta("description", description);
    updateMeta("author", "Fiorin Advocacia");
    updateMeta("robots", "index, follow");

    // Open Graph
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:site_name", siteName, true);
    updateMeta("og:image", image, true);
    updateMeta("og:locale", "pt_BR", true);

    if (canonical) {
      updateMeta("og:url", canonical, true);
      
      // Update canonical link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute("href", canonical);
    }

    // Twitter Card
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);

    // Article specific
    if (type === "article" && article) {
      if (article.publishedTime) {
        updateMeta("article:published_time", article.publishedTime, true);
      }
      if (article.author) {
        updateMeta("article:author", article.author, true);
      }
      if (article.section) {
        updateMeta("article:section", article.section, true);
      }
    }

    // JSON-LD Structured Data
    const structuredData = jsonLd || {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Fiorin Advocacia",
      description: "Escritório especializado em Direito Trabalhista e Previdenciário em Campo Grande, MS.",
      url: "https://fiorinadvocacia.com.br",
      telephone: "+55 67 9693-8634",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Campo Grande",
        addressRegion: "MS",
        addressCountry: "BR",
      },
      priceRange: "$$",
      areaServed: {
        "@type": "State",
        name: "Mato Grosso do Sul",
      },
      serviceType: ["Direito Trabalhista", "Direito Previdenciário"],
    };

    let scriptTag = document.querySelector('script[data-seo="json-ld"]');
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      scriptTag.setAttribute("data-seo", "json-ld");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      // Cleanup is optional since we're updating the same elements
    };
  }, [fullTitle, description, canonical, type, image, article, jsonLd]);

  return null;
};
