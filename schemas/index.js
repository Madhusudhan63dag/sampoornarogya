/**
 * Central export file for all Sampoorna Arogya schemas
 * Import all schemas from a single location
 */

// Import all schemas
import productSchema from './productSchema.js';
import orderSchema from './orderSchema.js';
import customerSchema from './customerSchema.js';
import reviewSchema from './reviewSchema.js';
import seoSchema from './seoSchema.js';

// Export individual schemas
export {
  productSchema,
  orderSchema,
  customerSchema,
  reviewSchema,
  seoSchema
};

// Export combined schemas object
export const schemas = {
  product: productSchema,
  order: orderSchema,
  customer: customerSchema,
  review: reviewSchema,
  seo: seoSchema
};

// Export validation functions
export const validateAll = {
  product: productSchema.validateProduct,
  order: orderSchema.validateOrder,
  customer: customerSchema.validateCustomer,
  review: reviewSchema.validateReview,
  seo: seoSchema.validateSeoData
};

// Export utility functions
export const utils = {
  product: {
    generateId: productSchema.generateProductId,
    generateSlug: productSchema.generateSlug,
    calculateDiscount: productSchema.calculateDiscount,
    formatPrice: productSchema.formatPrice
  },
  order: {
    generateId: orderSchema.generateOrderId,
    calculateTotal: orderSchema.calculateOrderTotal,
    formatOrderNumber: orderSchema.formatOrderNumber,
    getOrderStatus: orderSchema.getOrderStatus
  },
  customer: {
    generateId: customerSchema.generateCustomerId,
    validateEmail: customerSchema.validateEmail,
    validatePhone: customerSchema.validatePhone,
    calculateAge: customerSchema.calculateAge
  },
  review: {
    generateId: reviewSchema.generateReviewId,
    calculateAverageRating: reviewSchema.calculateAverageRating,
    getReviewSummary: reviewSchema.getReviewSummary
  },
  seo: {
    generateStructuredData: seoSchema.generateStructuredData,
    generateMetaTags: seoSchema.generateMetaTags,
    generateBreadcrumbs: seoSchema.generateBreadcrumbs
  }
};

// Export sample data for testing
export const sampleData = {
  product: productSchema.sampleProduct,
  order: orderSchema.sampleOrder,
  customer: customerSchema.sampleCustomer,
  review: reviewSchema.sampleReview
};

// Export schema constants
export const SCHEMA_CONSTANTS = {
  PRODUCT_CATEGORIES: ['digestive-health', 'immunity-booster', 'detox', 'general-wellness', 'ayurvedic-herbs'],
  ORDER_STATUSES: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
  PAYMENT_STATUSES: ['pending', 'paid', 'failed', 'refunded', 'partial'],
  SHIPPING_METHODS: ['standard', 'express', 'overnight'],
  REVIEW_STATUSES: ['pending', 'approved', 'rejected', 'spam'],
  CUSTOMER_TYPES: ['guest', 'registered', 'premium', 'wholesale'],
  GENDER_OPTIONS: ['male', 'female', 'other', 'prefer_not_to_say'],
  CURRENCIES: ['INR', 'USD', 'EUR'],
  LANGUAGES: ['en', 'hi', 'ta', 'te', 'kn', 'ml', 'bn', 'gu', 'mr', 'or'],
  COUNTRIES: ['India', 'USA', 'UK', 'Canada', 'Australia']
};

// Default export
export default schemas;
