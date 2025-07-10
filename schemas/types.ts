/**
 * TypeScript type definitions for Sampoorna Arogya schemas
 * Provides type safety for all schema entities
 */

// Base types
export interface BaseEntity {
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'inactive' | 'draft' | 'archived';
}

// Product Types
export interface ProductIngredient {
  name: string;
  scientificName?: string;
  quantity?: string;
  benefits: string[];
  description?: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  title?: string;
  isPrimary?: boolean;
  order?: number;
}

export interface ProductPricing {
  basePrice: number;
  salePrice?: number;
  currency: string;
  discount?: number;
  priceValidUntil?: Date;
}

export interface ProductInventory {
  sku: string;
  stock: number;
  lowStockThreshold?: number;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder' | 'Discontinued';
  weight: {
    value: number;
    unit: 'g' | 'kg' | 'ml' | 'l';
  };
}

export interface ProductUsage {
  dosage: string;
  frequency: string;
  timing?: string;
  instructions: string;
  precautions: string[];
}

export interface ProductSEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl?: string;
  ogImage?: string;
  schemaMarkup?: object;
}

export interface Product extends BaseEntity {
  id: string;
  name: string;
  alternateName?: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'digestive-health' | 'immunity-booster' | 'detox' | 'general-wellness' | 'ayurvedic-herbs';
  subcategory?: string;
  brand: {
    name: string;
    logo?: string;
    website?: string;
  };
  manufacturer: {
    name: string;
    location?: string;
    license?: string;
  };
  pricing: ProductPricing;
  inventory: ProductInventory;
  images: ProductImage[];
  ingredients: ProductIngredient[];
  benefits: string[];
  features?: string[];
  usage: ProductUsage;
  specifications?: {
    formulation: 'powder' | 'capsule' | 'tablet' | 'liquid' | 'oil';
    shelfLife: string;
    storage: string;
    certifications: string[];
  };
  shipping: {
    freeShipping: boolean;
    shippingCost: number;
    handlingTime: { min: number; max: number; unit: string };
    deliveryTime: { min: number; max: number; unit: string };
  };
  ratings?: {
    average: number;
    count: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  seo: ProductSEO;
  createdBy?: string;
  updatedBy?: string;
}

// Customer Types
export interface CustomerAddress {
  type: 'home' | 'office' | 'other';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CustomerHealthProfile {
  conditions: string[];
  allergies: string[];
  medications: string[];
  dietaryRestrictions: string[];
  healthGoals: string[];
  consultedDoctor: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Customer extends BaseEntity {
  customerId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    age?: number;
  };
  contact: {
    email: string;
    phone: string;
    alternatePhone?: string;
  };
  addresses: CustomerAddress[];
  healthProfile?: CustomerHealthProfile;
  preferences: {
    language: string;
    currency: string;
    newsletter: boolean;
    smsNotifications: boolean;
    emailNotifications: boolean;
  };
  loyalty?: {
    points: number;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    joinDate: Date;
  };
  orderHistory: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    lastOrderDate?: Date;
  };
  type: 'guest' | 'registered' | 'premium' | 'wholesale';
}

// Order Types
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sku: string;
}

export interface OrderPricing {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order extends BaseEntity {
  orderId: string;
  orderNumber: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
  };
  items: OrderItem[];
  pricing: OrderPricing;
  shipping: {
    address: OrderAddress;
    method: 'standard' | 'express' | 'overnight';
    estimatedDelivery?: string;
    trackingNumber?: string;
    carrier?: string;
  };
  billing?: {
    address: OrderAddress;
  };
  payment: {
    method: 'razorpay' | 'cod' | 'bank_transfer' | 'upi';
    status: 'pending' | 'paid' | 'failed' | 'refunded' | 'partial';
    transactionId?: string;
    paymentDate?: Date;
    gatewayResponse?: object;
  };
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  statusHistory: Array<{
    status: string;
    timestamp: Date;
    note?: string;
    updatedBy?: string;
  }>;
  notes?: {
    customer?: string;
    internal?: string;
  };
  source: 'website' | 'mobile_app' | 'phone' | 'whatsapp';
}

// Review Types
export interface Review extends BaseEntity {
  reviewId: string;
  productId: string;
  customerId: string;
  orderId?: string;
  rating: number; // 1-5
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  isVerifiedPurchase: boolean;
  isRecommended?: boolean;
  helpfulVotes: number;
  totalVotes: number;
  images?: Array<{
    url: string;
    caption?: string;
  }>;
  reviewStatus: 'pending' | 'approved' | 'rejected' | 'spam';
  moderationNotes?: string;
  response?: {
    content: string;
    respondedBy: string;
    respondedAt: Date;
  };
}

// SEO Types
export interface SEOPage {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  alternateUrls?: Array<{
    url: string;
    hreflang: string;
  }>;
  robotsMeta: 'index,follow' | 'noindex,follow' | 'index,nofollow' | 'noindex,nofollow';
}

export interface OpenGraphData {
  title: string;
  description: string;
  type: 'website' | 'product' | 'article';
  url: string;
  image: string;
  siteName: string;
  locale: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site: string;
  title: string;
  description: string;
  image: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SEOData {
  page: SEOPage;
  openGraph: OpenGraphData;
  twitterCard: TwitterCardData;
  structuredData: StructuredData[];
}

// Validation Result Types
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Utility Function Types
export interface ProductUtils {
  generateId: (category: string, name: string) => string;
  generateSlug: (name: string) => string;
  calculateDiscount: (basePrice: number, discount: number) => number;
  formatPrice: (price: number, currency?: string) => string;
  isProductInStock: (product: Product) => boolean;
  isLowStock: (product: Product) => boolean;
  getProductStatus: (product: Product) => string;
}

export interface OrderUtils {
  generateId: () => string;
  calculateTotal: (items: OrderItem[], pricing: Partial<OrderPricing>) => number;
  formatOrderNumber: (orderId: string) => string;
  getOrderStatus: (order: Order) => string;
}

export interface CustomerUtils {
  generateId: () => string;
  validateEmail: (email: string) => boolean;
  validatePhone: (phone: string) => boolean;
  calculateAge: (dateOfBirth: string) => number;
}

export interface ReviewUtils {
  generateId: () => string;
  calculateAverageRating: (reviews: Review[]) => number;
  getReviewSummary: (reviews: Review[]) => object;
}

export interface SEOUtils {
  generateStructuredData: (type: string, data: any) => StructuredData;
  generateMetaTags: (seoData: Partial<SEOData>) => object;
  generateBreadcrumbs: (path: string[]) => StructuredData;
}

// Constants Types
export interface SchemaConstants {
  PRODUCT_CATEGORIES: string[];
  ORDER_STATUSES: string[];
  PAYMENT_STATUSES: string[];
  SHIPPING_METHODS: string[];
  REVIEW_STATUSES: string[];
  CUSTOMER_TYPES: string[];
  GENDER_OPTIONS: string[];
  CURRENCIES: string[];
  LANGUAGES: string[];
  COUNTRIES: string[];
}

// Main Schema Exports
export interface Schemas {
  product: {
    schema: object;
    validate: (data: any) => ValidationResult;
    utils: ProductUtils;
    sample: Product;
  };
  order: {
    schema: object;
    validate: (data: any) => ValidationResult;
    utils: OrderUtils;
    sample: Order;
  };
  customer: {
    schema: object;
    validate: (data: any) => ValidationResult;
    utils: CustomerUtils;
    sample: Customer;
  };
  review: {
    schema: object;
    validate: (data: any) => ValidationResult;
    utils: ReviewUtils;
    sample: Review;
  };
  seo: {
    schema: object;
    validate: (data: any) => ValidationResult;
    utils: SEOUtils;
    sample: SEOData;
  };
}

// Default export type
export default Schemas;
