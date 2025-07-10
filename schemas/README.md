# Sampoorna Arogya Schema System

A comprehensive schema system for the Sampoorna Arogya e-commerce platform, designed for health supplement products with validation, utilities, and structured data support.

## Overview

This schema system provides:
- **Data validation** for all entities (products, orders, customers, reviews)
- **Utility functions** for common operations
- **SEO and structured data** support
- **Sample data** for testing and development
- **Type safety** and consistent data structures

## Schema Files

### 📦 Product Schema (`productSchema.js`)
Comprehensive schema for health supplement products including:
- Basic product information (name, description, pricing)
- Inventory management (stock, SKU, availability)
- Ingredient details with scientific names and benefits
- SEO metadata and structured data
- Image management with alt text and titles
- Usage instructions and precautions

### 🛒 Order Schema (`orderSchema.js`)
Complete order management schema featuring:
- Order identification and tracking
- Customer information
- Order items with pricing breakdown
- Shipping and billing addresses
- Payment information and status
- Order status tracking and history

### 👤 Customer Schema (`customerSchema.js`)
Customer data management schema including:
- Personal information with validation
- Contact details (email, phone, addresses)
- Health profile for supplement recommendations
- Preferences and communication settings
- Order history and loyalty program data

### ⭐ Review Schema (`reviewSchema.js`)
Product review and rating system schema:
- Review content with rating (1-5 stars)
- Verification status (verified purchase)
- Review moderation and approval
- Helpful votes and interaction tracking
- Review analytics and aggregation

### 🔍 SEO Schema (`seoSchema.js`)
SEO and structured data schema for:
- Page-level SEO metadata
- Product structured data (JSON-LD)
- Open Graph and Twitter Card data
- Breadcrumb navigation
- FAQ and article markup

## Installation & Usage

### Basic Import
```javascript
// Import individual schemas
import { productSchema, orderSchema } from './schemas';

// Import all schemas
import schemas from './schemas';

// Import utilities
import { utils, validateAll } from './schemas';
```

### Product Validation
```javascript
import { validateAll } from './schemas';

const product = {
  id: 'SA-DHS001',
  name: 'Digestive Health Supplement',
  price: 2990,
  // ... other product data
};

const validation = validateAll.product(product);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}
```

### Utility Functions
```javascript
import { utils } from './schemas';

// Generate product ID
const productId = utils.product.generateId('digestive-health', 'Amla Supplement');

// Format price
const formattedPrice = utils.product.formatPrice(2990); // ₹2,990

// Generate SEO structured data
const structuredData = utils.seo.generateStructuredData('product', productData);
```

## Schema Structure

### Common Fields
All schemas include these standard fields:
- `id`: Unique identifier
- `createdAt`: Creation timestamp
- `updatedAt`: Last modification timestamp
- `status`: Entity status (active, inactive, etc.)

### Validation Rules
- **Required fields**: Marked as `required: true`
- **Type validation**: String, number, object, array types
- **Format validation**: Email, phone, URL patterns
- **Range validation**: Min/max values for numbers
- **Enum validation**: Predefined valid values

## Sample Data

Each schema includes comprehensive sample data for testing:

```javascript
import { sampleData } from './schemas';

console.log(sampleData.product); // Complete product sample
console.log(sampleData.order);   // Complete order sample
console.log(sampleData.customer); // Complete customer sample
console.log(sampleData.review);  // Complete review sample
```

## SEO & Structured Data

### Product Structured Data
Automatically generates JSON-LD markup for:
- Product information
- Pricing and availability
- Ratings and reviews
- Brand and manufacturer details
- Shipping information

### Meta Tags Generation
```javascript
import { utils } from './schemas';

const metaTags = utils.seo.generateMetaTags({
  title: 'Sampoorna Arogya - Natural Health Supplements',
  description: 'Premium Ayurvedic supplements for digestive health...',
  keywords: ['ayurvedic', 'supplements', 'digestive health'],
  ogImage: '/images/product-image.jpg'
});
```

## Constants & Enums

The system provides predefined constants for consistency:

```javascript
import { SCHEMA_CONSTANTS } from './schemas';

console.log(SCHEMA_CONSTANTS.PRODUCT_CATEGORIES);
// ['digestive-health', 'immunity-booster', 'detox', 'general-wellness', 'ayurvedic-herbs']

console.log(SCHEMA_CONSTANTS.ORDER_STATUSES);
// ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned']
```

## Best Practices

### 1. Data Validation
Always validate data before saving:
```javascript
const validation = validateAll.product(productData);
if (!validation.isValid) {
  throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
}
```

### 2. Use Utility Functions
Leverage provided utilities for consistency:
```javascript
// Good
const slug = utils.product.generateSlug(productName);

// Avoid manual slug generation
const slug = productName.toLowerCase().replace(/\s+/g, '-');
```

### 3. SEO Integration
Always include SEO metadata:
```javascript
const seoData = {
  metaTitle: `${product.name} | Sampoorna Arogya`,
  metaDescription: product.shortDescription,
  keywords: product.seo.keywords,
  structuredData: utils.seo.generateStructuredData('product', product)
};
```

### 4. Type Safety
Use TypeScript definitions (if applicable):
```typescript
import type { Product, Order, Customer } from './schemas/types';
```

## API Integration Examples

### Creating a Product
```javascript
import { utils, validateAll } from './schemas';

async function createProduct(productData) {
  // Generate ID and slug
  productData.id = utils.product.generateId(productData.category, productData.name);
  productData.slug = utils.product.generateSlug(productData.name);
  
  // Validate
  const validation = validateAll.product(productData);
  if (!validation.isValid) {
    throw new Error(`Invalid product data: ${validation.errors.join(', ')}`);
  }
  
  // Save to database
  return await database.products.create(productData);
}
```

### Processing an Order
```javascript
import { utils, validateAll } from './schemas';

async function processOrder(orderData) {
  // Generate order ID
  orderData.orderId = utils.order.generateId();
  
  // Calculate totals
  orderData.pricing.total = utils.order.calculateTotal(orderData.items, orderData.pricing);
  
  // Validate
  const validation = validateAll.order(orderData);
  if (!validation.isValid) {
    throw new Error(`Invalid order data: ${validation.errors.join(', ')}`);
  }
  
  // Process order
  return await database.orders.create(orderData);
}
```

## Testing

Use sample data for unit tests:
```javascript
import { sampleData, validateAll } from './schemas';

describe('Product Schema', () => {
  test('sample product should be valid', () => {
    const validation = validateAll.product(sampleData.product);
    expect(validation.isValid).toBe(true);
  });
});
```

## Contributing

When extending schemas:
1. Maintain backward compatibility
2. Add comprehensive validation rules
3. Include sample data for new fields
4. Update utility functions as needed
5. Add JSDoc comments for documentation

## Schema Versions

- **v1.0**: Initial schema system
- Current schemas support the complete Sampoorna Arogya e-commerce functionality

---

For questions or suggestions, please refer to the development team or create an issue in the project repository.
