/**
 * SEO Schema for Sampoorna Arogya
 * Defines structured data and SEO metadata for different page types
 */

export const seoSchema = {
  // Basic page SEO
  page: {
    type: 'object',
    required: true,
    properties: {
      title: {
        type: 'string',
        required: true,
        minLength: 30,
        maxLength: 60,
        description: 'Page title for search engines'
      },
      description: {
        type: 'string',
        required: true,
        minLength: 120,
        maxLength: 160,
        description: 'Meta description for search results'
      },
      keywords: {
        type: 'array',
        items: { type: 'string' },
        maxItems: 20,
        description: 'Target keywords for the page'
      },
      canonicalUrl: {
        type: 'string',
        format: 'uri',
        description: 'Canonical URL for the page'
      },
      alternateUrls: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            url: { type: 'string', format: 'uri' },
            hreflang: { type: 'string' }
          }
        }
      },
      robotsMeta: {
        type: 'string',
        enum: ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow'],
        default: 'index,follow'
      }
    }
  },
  
  // Open Graph metadata
  openGraph: {
    type: 'object',
    properties: {
      title: { type: 'string', required: true, maxLength: 60 },
      description: { type: 'string', required: true, maxLength: 160 },
      image: { type: 'string', format: 'uri', required: true },
      imageAlt: { type: 'string', required: true },
      url: { type: 'string', format: 'uri', required: true },
      type: {
        type: 'string',
        enum: ['website', 'product', 'article', 'profile'],
        default: 'website'
      },
      siteName: { type: 'string', default: 'Sampoorna Arogya' },
      locale: { type: 'string', default: 'en_IN' }
    }
  },
  
  // Twitter Card metadata
  twitterCard: {
    type: 'object',
    properties: {
      card: {
        type: 'string',
        enum: ['summary', 'summary_large_image', 'app', 'player'],
        default: 'summary_large_image'
      },
      title: { type: 'string', required: true, maxLength: 70 },
      description: { type: 'string', required: true, maxLength: 200 },
      image: { type: 'string', format: 'uri', required: true },
      imageAlt: { type: 'string', required: true },
      site: { type: 'string', default: '@sampoornarogya' },
      creator: { type: 'string', default: '@sampoornarogya' }
    }
  },
  
  // JSON-LD structured data
  structuredData: {
    type: 'object',
    properties: {
      '@context': { type: 'string', default: 'https://schema.org' },
      '@type': {
        type: 'string',
        enum: ['Product', 'Organization', 'WebSite', 'Article', 'Review', 'FAQ', 'BreadcrumbList'],
        required: true
      },
      // Additional properties will be type-specific
    }
  }
};

// Product page structured data
export const productStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'string',
  alternateName: 'string',
  description: 'string',
  sku: 'string',
  mpn: 'string',
  gtin: 'string',
  category: 'string',
  brand: {
    '@type': 'Brand',
    name: 'string'
  },
  manufacturer: {
    '@type': 'Organization',
    name: 'string'
  },
  image: 'array',
  offers: {
    '@type': 'Offer',
    price: 'number',
    priceCurrency: 'string',
    availability: 'string',
    url: 'string',
    priceValidUntil: 'string',
    seller: {
      '@type': 'Organization',
      name: 'string'
    }
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 'number',
    reviewCount: 'number',
    bestRating: 'number',
    worstRating: 'number'
  },
  review: 'array'
};

// Organization structured data
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sampoorna Arogya',
  alternateName: 'Sampoorna Arogya Health Solutions',
  url: 'https://sampoornarogya.com',
  logo: 'https://sampoornarogya.com/logo.png',
  description: 'Leading provider of natural Ayurvedic health supplements for digestive wellness and overall health',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi']
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'State',
    addressLocality: 'City'
  },
  sameAs: [
    'https://www.facebook.com/sampoornarogya',
    'https://www.instagram.com/sampoornarogya',
    'https://twitter.com/sampoornarogya'
  ]
};

// Website structured data
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sampoorna Arogya',
  alternateName: 'Sampoorna Arogya Health Supplements',
  url: 'https://sampoornarogya.com',
  description: 'Natural Ayurvedic health supplements for digestive wellness, immunity, and overall health',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://sampoornarogya.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sampoorna Arogya',
    logo: {
      '@type': 'ImageObject',
      url: 'https://sampoornarogya.com/logo.png'
    }
  }
};

// Article structured data (for blog posts)
export const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'string',
  description: 'string',
  image: 'array',
  author: {
    '@type': 'Person',
    name: 'string'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Sampoorna Arogya',
    logo: {
      '@type': 'ImageObject',
      url: 'https://sampoornarogya.com/logo.png'
    }
  },
  datePublished: 'string',
  dateModified: 'string',
  mainEntityOfPage: 'string'
};

// FAQ structured data
export const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'string',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'string'
      }
    }
  ]
};

// Breadcrumb structured data
export const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 'number',
      name: 'string',
      item: 'string'
    }
  ]
};

// Validation functions
export const validateSEO = (seoData) => {
  const errors = [];
  
  // Basic page validation
  if (seoData.page) {
    if (!seoData.page.title) errors.push('Page title is required');
    if (!seoData.page.description) errors.push('Page description is required');
    
    if (seoData.page.title) {
      if (seoData.page.title.length < 30) errors.push('Page title should be at least 30 characters');
      if (seoData.page.title.length > 60) errors.push('Page title should be less than 60 characters');
    }
    
    if (seoData.page.description) {
      if (seoData.page.description.length < 120) errors.push('Page description should be at least 120 characters');
      if (seoData.page.description.length > 160) errors.push('Page description should be less than 160 characters');
    }
  }
  
  // Open Graph validation
  if (seoData.openGraph) {
    if (!seoData.openGraph.title) errors.push('Open Graph title is required');
    if (!seoData.openGraph.description) errors.push('Open Graph description is required');
    if (!seoData.openGraph.image) errors.push('Open Graph image is required');
    if (!seoData.openGraph.url) errors.push('Open Graph URL is required');
  }
  
  // Twitter Card validation
  if (seoData.twitterCard) {
    if (!seoData.twitterCard.title) errors.push('Twitter Card title is required');
    if (!seoData.twitterCard.description) errors.push('Twitter Card description is required');
    if (!seoData.twitterCard.image) errors.push('Twitter Card image is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateProductSEO = (product) => {
  const baseUrl = 'https://sampoornarogya.com';
  const productUrl = `${baseUrl}/product/${product.slug || 'sampoorna-arogya'}`;
  
  return {
    page: {
      title: `${product.name} - Natural Ayurvedic Health Supplement | Sampoorna Arogya`,
      description: `${product.shortDescription || product.description.substring(0, 160)}. ✓ 100% Natural ✓ No Side Effects ✓ Free Shipping ✓ COD Available`,
      keywords: [
        'ayurvedic supplement',
        'digestive health',
        'natural health',
        'sampoorna arogya',
        ...(product.seo?.keywords || [])
      ],
      canonicalUrl: productUrl,
      robotsMeta: 'index,follow'
    },
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description.substring(0, 160),
      image: product.images?.[0]?.url || `${baseUrl}/default-product.jpg`,
      imageAlt: `${product.name} - Natural Ayurvedic Supplement`,
      url: productUrl,
      type: 'product',
      siteName: 'Sampoorna Arogya',
      locale: 'en_IN'
    },
    twitterCard: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription || product.description.substring(0, 200),
      image: product.images?.[0]?.url || `${baseUrl}/default-product.jpg`,
      imageAlt: `${product.name} - Natural Ayurvedic Supplement`,
      site: '@sampoornarogya',
      creator: '@sampoornarogya'
    }
  };
};

export const generateArticleSEO = (article) => {
  const baseUrl = 'https://sampoornarogya.com';
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  
  return {
    page: {
      title: `${article.title} | Sampoorna Arogya Health Blog`,
      description: article.excerpt,
      keywords: article.keywords || ['health', 'ayurveda', 'wellness', 'natural health'],
      canonicalUrl: articleUrl,
      robotsMeta: 'index,follow'
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      image: article.featuredImage || `${baseUrl}/default-article.jpg`,
      imageAlt: article.title,
      url: articleUrl,
      type: 'article',
      siteName: 'Sampoorna Arogya',
      locale: 'en_IN'
    },
    twitterCard: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      image: article.featuredImage || `${baseUrl}/default-article.jpg`,
      imageAlt: article.title,
      site: '@sampoornarogya',
      creator: '@sampoornarogya'
    }
  };
};

export const generateFAQStructuredData = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

export const generateBreadcrumbData = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
};

// SEO page templates
export const seoTemplates = {
  product: {
    titleTemplate: '{productName} - Natural Ayurvedic Health Supplement | Sampoorna Arogya',
    descriptionTemplate: '{productDescription} ✓ 100% Natural ✓ No Side Effects ✓ Free Shipping ✓ COD Available',
    keywordTemplate: ['ayurvedic supplement', 'natural health', 'sampoorna arogya']
  },
  
  category: {
    titleTemplate: '{categoryName} - Natural Ayurvedic Supplements | Sampoorna Arogya',
    descriptionTemplate: 'Shop {categoryName} supplements from Sampoorna Arogya. 100% natural Ayurvedic products for better health and wellness.',
    keywordTemplate: ['ayurvedic {categoryName}', 'natural {categoryName}', 'sampoorna arogya']
  },
  
  blog: {
    titleTemplate: '{articleTitle} | Sampoorna Arogya Health Blog',
    descriptionTemplate: '{articleExcerpt}',
    keywordTemplate: ['health tips', 'ayurveda', 'wellness', 'natural health']
  },
  
  page: {
    titleTemplate: '{pageTitle} | Sampoorna Arogya',
    descriptionTemplate: '{pageDescription}',
    keywordTemplate: ['sampoorna arogya', 'ayurvedic supplements', 'natural health']
  }
};

// Sample SEO data
export const sampleSEOData = {
  page: {
    title: 'Sampoorna Arogya Digestive Health Supplement - Natural Ayurvedic',
    description: 'Transform your digestive health naturally with Sampoorna Arogya. Premium Ayurvedic supplement with proven ingredients for better digestion & immunity.',
    keywords: ['digestive health supplement', 'ayurvedic medicine', 'natural gut health', 'immunity booster', 'sampoorna arogya'],
    canonicalUrl: 'https://sampoornarogya.com/product',
    robotsMeta: 'index,follow'
  },
  openGraph: {
    title: 'Sampoorna Arogya Digestive Health Supplement',
    description: 'Transform your digestive health naturally with our premium Ayurvedic supplement. 100% natural ingredients, no side effects.',
    image: 'https://sampoornarogya.com/assets/product-main.jpg',
    imageAlt: 'Sampoorna Arogya Digestive Health Supplement',
    url: 'https://sampoornarogya.com/product',
    type: 'product',
    siteName: 'Sampoorna Arogya',
    locale: 'en_IN'
  },
  twitterCard: {
    card: 'summary_large_image',
    title: 'Sampoorna Arogya Digestive Health Supplement',
    description: 'Transform your digestive health naturally with our premium Ayurvedic supplement. 100% natural ingredients, no side effects.',
    image: 'https://sampoornarogya.com/assets/product-main.jpg',
    imageAlt: 'Sampoorna Arogya Digestive Health Supplement',
    site: '@sampoornarogya',
    creator: '@sampoornarogya'
  }
};

export default {
  seoSchema,
  productStructuredData,
  organizationStructuredData,
  websiteStructuredData,
  articleStructuredData,
  faqStructuredData,
  breadcrumbStructuredData,
  validateSEO,
  generateProductSEO,
  generateArticleSEO,
  generateFAQStructuredData,
  generateBreadcrumbData,
  seoTemplates,
  sampleSEOData
};
