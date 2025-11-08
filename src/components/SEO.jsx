import React from "react";

export default function SEO({
  title,
  description,
  name,
  type,
  keywords,
  link,
}) {
  React.useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }
    
    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }
    
    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }
    
    // Update canonical link
    if (link) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = link;
    }
    
    // Update Open Graph tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.content = title;
    }
    
    if (description) {
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.content = description;
    }
    
    if (type) {
      let ogType = document.querySelector('meta[property="og:type"]');
      if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
      }
      ogType.content = type;
    }
    
    // Update Twitter Card tags
    if (title) {
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.name = 'twitter:title';
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.content = title;
    }
    
    if (description) {
      let twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.name = 'twitter:description';
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.content = description;
    }
    
    if (type) {
      let twitterCard = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.name = 'twitter:card';
        document.head.appendChild(twitterCard);
      }
      twitterCard.content = type;
    }
    
    if (name) {
      let twitterCreator = document.querySelector('meta[name="twitter:creator"]');
      if (!twitterCreator) {
        twitterCreator = document.createElement('meta');
        twitterCreator.name = 'twitter:creator';
        document.head.appendChild(twitterCreator);
      }
      twitterCreator.content = name;
    }
  }, [title, description, name, type, keywords, link]);
  
  return (
    null
  );
}
