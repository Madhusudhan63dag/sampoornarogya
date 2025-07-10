/**
 * Product Schema for Sampoorna Arogya
 * Defines the structure and validation for health supplement products
 */

export const productSchema = {
  // Basic product information
  id: {
    type: 'string',
    required: true,
    pattern: '^SA-[A-Z0-9]{6}$',
    description: 'Unique product identifier (e.g., SA-DHS001)'
  },
  
  name: {
    type: 'string',
    required: true,
    minLength: 10,
    maxLength: 200,
    description: 'Product name for display and SEO'
  },
  
  slug: {
    type: 'string',
    required: true,
    pattern: '^[a-z0-9-]+$',
    description: 'URL-friendly product identifier'
  },
  
  // Product details
  description: {
    type: 'string',
    required: true,
    minLength: 100,
    maxLength: 1000,
    description: 'Detailed product description'
  },
  
  shortDescription: {
    type: 'string',
    required: true,
    maxLength: 200,
    description: 'Brief product summary'
  },
  
  // Pricing
  price: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Current selling price in INR'
  },
  
  originalPrice: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Original price before discount in INR'
  },
  
  discount: {
    type: 'number',
    min: 0,
    max: 100,
    description: 'Discount percentage'
  },
  
  // Inventory
  stock: {
    type: 'number',
    required: true,
    min: 0,
    description: 'Available stock quantity'
  },
  
  sku: {
    type: 'string',
    required: true,
    description: 'Stock Keeping Unit identifier'
  },
  
  // Product specifications
  weight: {
    type: 'object',
    required: true,
    properties: {
      value: { type: 'number', min: 0 },
      unit: { type: 'string', enum: ['g', 'kg', 'ml', 'l'] }
    }
  },
  
  servingSize: {
    type: 'string',
    required: true,
    description: 'Recommended serving size'
  },
  
  servingsPerContainer: {
    type: 'number',
    required: true,
    min: 1,
    description: 'Number of servings per container'
  },
  
  // Ingredients and composition
  ingredients: {
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        name: { type: 'string', required: true },
        percentage: { type: 'number', min: 0, max: 100 },
        benefits: { type: 'string' },
        ayurvedicName: { type: 'string' }
      }
    },
    minItems: 1
  },
  
  // Health benefits
  benefits: {
    type: 'array',
    required: true,
    items: { type: 'string' },
    minItems: 3
  },
  
  // Usage instructions
  dosage: {
    type: 'string',
    required: true,
    description: 'Recommended dosage instructions'
  },
  
  usage: {
    type: 'string',
    required: true,
    description: 'How to use the product'
  },
  
  // Safety information
  contraindications: {
    type: 'array',
    items: { type: 'string' },
    description: 'Conditions where product should not be used'
  },
  
  sideEffects: {
    type: 'array',
    items: { type: 'string' },
    description: 'Possible side effects'
  },
  
  warnings: {
    type: 'array',
    items: { type: 'string' },
    description: 'Important warnings and precautions'
  },
  
  // Quality certifications
  certifications: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string', required: true },
        authority: { type: 'string', required: true },
        validUntil: { type: 'string', format: 'date' }
      }
    }
  },
  
  // Media assets
  images: {
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        url: { type: 'string', required: true },
        alt: { type: 'string', required: true },
        type: { type: 'string', enum: ['main', 'gallery', 'ingredient', 'certificate'] }
      }
    },
    minItems: 1
  },
  
  // SEO metadata
  seo: {
    type: 'object',
    required: true,
    properties: {
      title: { type: 'string', required: true, maxLength: 60 },
      description: { type: 'string', required: true, maxLength: 160 },
      keywords: { 
        type: 'array', 
        items: { type: 'string' },
        maxItems: 20
      },
      canonicalUrl: { type: 'string', format: 'uri' }
    }
  },
  
  // Category and tags
  category: {
    type: 'string',
    required: true,
    enum: ['digestive-health', 'immunity', 'detox', 'general-wellness']
  },
  
  tags: {
    type: 'array',
    items: { type: 'string' },
    description: 'Product tags for filtering'
  },
  
  // Regulatory information
  fssaiLicense: {
    type: 'string',
    description: 'FSSAI license number'
  },
  
  manufacturingLicense: {
    type: 'string',
    description: 'Manufacturing license number'
  },
  
  // Status and dates
  status: {
    type: 'string',
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  },
  
  createdAt: {
    type: 'string',
    format: 'date-time',
    description: 'Product creation timestamp'
  },
  
  updatedAt: {
    type: 'string',
    format: 'date-time',
    description: 'Last update timestamp'
  }
};

// Validation function
export const validateProduct = (product) => {
  const errors = [];
  
  // Required fields validation
  const requiredFields = ['id', 'name', 'slug', 'description', 'price', 'originalPrice', 'stock', 'sku'];
  requiredFields.forEach(field => {
    if (!product[field]) {
      errors.push(`${field} is required`);
    }
  });
  
  // Price validation
  if (product.price && product.originalPrice && product.price > product.originalPrice) {
    errors.push('Price cannot be higher than original price');
  }
  
  // Discount calculation validation
  if (product.price && product.originalPrice) {
    const calculatedDiscount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    if (product.discount && Math.abs(product.discount - calculatedDiscount) > 1) {
      errors.push('Discount percentage does not match price difference');
    }
  }
  
  // SEO validation
  if (product.seo) {
    if (product.seo.title && product.seo.title.length > 60) {
      errors.push('SEO title should be 60 characters or less');
    }
    if (product.seo.description && product.seo.description.length > 160) {
      errors.push('SEO description should be 160 characters or less');
    }
  }
  
  // Images validation
  if (!product.images || product.images.length === 0) {
    errors.push('At least one product image is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateProductId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SA-${timestamp}${random}`;
};

export const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Sample product data
export const sampleProduct = {
  id: 'SA-DHS001',
  name: 'Sampoorna Arogya Digestive Health Supplement',
  slug: 'sampoorna-arogya-digestive-health-supplement',
  description: 'A natural supplement that promotes digestive health and overall wellness. Made with premium Ayurvedic ingredients including Triphala, Amla, Ginger, and other traditional herbs.',
  shortDescription: 'Natural Ayurvedic supplement for digestive health and immunity',
  price: 3990,
  originalPrice: 5990,
  discount: 33,
  stock: 50,
  sku: 'SA-DHS-100G',
  weight: {
    value: 100,
    unit: 'g'
  },
  servingSize: '1 teaspoon (5g)',
  servingsPerContainer: 20,
  ingredients: [
    {
      name: 'Amla',
      percentage: 20,
      benefits: 'Rich in Vitamin C, boosts immunity',
      ayurvedicName: 'Amalaki'
    },
    {
      name: 'Chitrak',
      percentage: 15,
      benefits: 'Digestive stimulant, improves metabolism',
      ayurvedicName: 'Chitraka'
    },
    {
      name: 'Nagarmotha',
      percentage: 15,
      benefits: 'Digestive aid, reduces bloating',
      ayurvedicName: 'Musta'
    },
    {
      name: 'Harad',
      percentage: 15,
      benefits: 'Digestive tonic, natural detoxifier',
      ayurvedicName: 'Haritaki'
    },
    {
      name: 'Giloy',
      percentage: 15,
      benefits: 'Immunity booster, fever reducer',
      ayurvedicName: 'Guduchi'
    },
    {
      name: 'Nisoth',
      percentage: 10,
      benefits: 'Natural laxative, cleanses intestines',
      ayurvedicName: 'Trivrit'
    },
    {
      name: 'Adrak',
      percentage: 10,
      benefits: 'Digestive fire enhancer, anti-inflammatory',
      ayurvedicName: 'Shunthi'
    }
  ],
  benefits: [
    'Improves digestion and nutrient absorption',
    'Boosts natural immunity',
    'Supports healthy detoxification',
    'Reduces bloating and gas',
    'Enhances metabolism',
    'Promotes gut health'
  ],
  dosage: 'Take 1 teaspoon (5g) twice daily with warm water, preferably before meals',
  usage: 'Mix with warm water or consume directly. For best results, take consistently for 3 months',
  contraindications: [
    'Pregnancy and breastfeeding',
    'Children under 12 years',
    'Severe kidney or liver disease'
  ],
  sideEffects: [
    'Mild stomach upset initially',
    'Loose stools in first few days'
  ],
  warnings: [
    'Consult physician before use if on medication',
    'Discontinue if allergic reaction occurs',
    'Store in cool, dry place'
  ],
  certifications: [
    {
      name: 'FSSAI Certified',
      authority: 'Food Safety and Standards Authority of India',
      validUntil: '2026-12-31'
    },
    {
      name: 'GMP Certified',
      authority: 'Good Manufacturing Practices',
      validUntil: '2025-12-31'
    }
  ],
  images: [
    {
      url: '/assets/1.jpg',
      alt: 'Sampoorna Arogya main product image',
      type: 'main'
    },
    {
      url: '/assets/2.jpg',
      alt: 'Sampoorna Arogya ingredients view',
      type: 'gallery'
    },
    {
      url: '/assets/10.jpg',
      alt: 'Sampoorna Arogya packaging',
      type: 'gallery'
    },
    {
      url: '/assets/8.jpg',
      alt: 'Sampoorna Arogya benefits infographic',
      type: 'gallery'
    }
  ],
  seo: {
    title: 'Sampoorna Arogya - Natural Digestive Health Supplement',
    description: 'Transform your digestive health naturally with Sampoorna Arogya. Premium Ayurvedic supplement with proven ingredients for better digestion & immunity.',
    keywords: [
      'digestive health supplement',
      'ayurvedic medicine',
      'natural gut health',
      'immunity booster',
      'triphala supplement',
      'sampoorna arogya'
    ],
    canonicalUrl: 'https://sampoornarogya.com/product'
  },
  category: 'digestive-health',
  tags: ['ayurvedic', 'natural', 'digestive', 'immunity', 'detox'],
  fssaiLicense: '12345678901234',
  manufacturingLicense: 'MFG-2023-001',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-10T10:00:00Z'
};

export default {
  productSchema,
  validateProduct,
  generateProductId,
  generateSlug,
  calculateDiscount,
  formatPrice,
  sampleProduct
};
