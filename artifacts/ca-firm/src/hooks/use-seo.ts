import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

function setOrCreateMeta(selector: string, attrName: string, attrValue: string, contentValue: string) {
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attrName, attrValue);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', contentValue);
}

export function useSEO({ title, description, image, url }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Mehta & Associates — Chartered Accountants`;
    document.title = fullTitle;

    const pageUrl = url || window.location.href;
    const pageImage = image || '';

    setOrCreateMeta('meta[name="description"]', 'name', 'description', description);

    setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl);
    if (pageImage) {
      setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', pageImage);
    }
    setOrCreateMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Mehta & Associates');

    setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    if (pageImage) {
      setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', pageImage);
    }
  }, [title, description, image, url]);
}
