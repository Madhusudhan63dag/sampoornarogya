/**
 * Order Schema for Sampoorna Arogya
 * Defines the structure and validation for customer orders
 */

export const orderSchema = {
  // Order identification
  orderId: {
    type: 'string',
    required: true,
    pattern: '^SA-ORD-[0-9]{10}$',
    description: 'Unique order identifier (e.g., SA-ORD-1234567890)'
  },
  
  orderNumber: {
    type: 'string',
    required: true,
    description: 'Human-readable order number'
  },
  
  // Customer information
  customer: {
    type: 'object',
    required: true,
    properties: {
      id: { type: 'string' },
      firstName: { type: 'string', required: true, minLength: 2 },
      lastName: { type: 'string', required: true, minLength: 2 },
      email: { type: 'string', required: true, format: 'email' },
      phone: { type: 'string', required: true, pattern: '^[6-9][0-9]{9}$' },
      dateOfBirth: { type: 'string', format: 'date' },
      gender: { type: 'string', enum: ['male', 'female', 'other'] }
    }
  },
  
  // Order items
  items: {
    type: 'array',
    required: true,
    items: {
      type: 'object',
      properties: {
        productId: { type: 'string', required: true },
        productName: { type: 'string', required: true },
        quantity: { type: 'number', required: true, min: 1 },
        unitPrice: { type: 'number', required: true, min: 0 },
        totalPrice: { type: 'number', required: true, min: 0 },
        sku: { type: 'string', required: true }
      }
    },
    minItems: 1
  },
  
  // Pricing breakdown
  pricing: {
    type: 'object',
    required: true,
    properties: {
      subtotal: { type: 'number', required: true, min: 0 },
      discount: { type: 'number', min: 0, default: 0 },
      shipping: { type: 'number', min: 0, default: 0 },
      tax: { type: 'number', min: 0, default: 0 },
      total: { type: 'number', required: true, min: 0 }
    }
  },
  
  // Shipping information
  shipping: {
    type: 'object',
    required: true,
    properties: {
      address: {
        type: 'object',
        required: true,
        properties: {
          line1: { type: 'string', required: true },
          line2: { type: 'string' },
          city: { type: 'string', required: true },
          state: { type: 'string', required: true },
          postalCode: { type: 'string', required: true, pattern: '^[1-9][0-9]{5}$' },
          country: { type: 'string', required: true, default: 'India' }
        }
      },
      method: {
        type: 'string',
        enum: ['standard', 'express', 'overnight'],
        default: 'standard'
      },
      estimatedDelivery: { type: 'string', format: 'date' },
      trackingNumber: { type: 'string' },
      carrier: { type: 'string' }
    }
  },
  
  // Billing information
  billing: {
    type: 'object',
    properties: {
      address: {
        type: 'object',
        properties: {
          line1: { type: 'string', required: true },
          line2: { type: 'string' },
          city: { type: 'string', required: true },
          state: { type: 'string', required: true },
          postalCode: { type: 'string', required: true },
          country: { type: 'string', required: true }
        }
      },
      sameAsShipping: { type: 'boolean', default: true }
    }
  },
  
  // Payment information
  payment: {
    type: 'object',
    required: true,
    properties: {
      method: {
        type: 'string',
        required: true,
        enum: ['razorpay', 'cod', 'advance', 'quickbuy']
      },
      status: {
        type: 'string',
        required: true,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_paid']
      },
      transactionId: { type: 'string' },
      razorpayOrderId: { type: 'string' },
      razorpayPaymentId: { type: 'string' },
      amount: { type: 'number', required: true, min: 0 },
      currency: { type: 'string', default: 'INR' },
      paidAt: { type: 'string', format: 'date-time' },
      
      // For advance payments
      advanceAmount: { type: 'number', min: 0 },
      balanceAmount: { type: 'number', min: 0 },
      advancePaymentId: { type: 'string' },
      
      // Payment gateway response
      gatewayResponse: {
        type: 'object',
        properties: {
          signature: { type: 'string' },
          status: { type: 'string' },
          errorCode: { type: 'string' },
          errorDescription: { type: 'string' }
        }
      }
    }
  },
  
  // Order status and timeline
  status: {
    type: 'string',
    required: true,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending'
  },
  
  timeline: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        status: { type: 'string', required: true },
        timestamp: { type: 'string', required: true, format: 'date-time' },
        note: { type: 'string' },
        updatedBy: { type: 'string' }
      }
    }
  },
  
  // Special instructions and notes
  specialInstructions: {
    type: 'string',
    maxLength: 500,
    description: 'Customer delivery instructions'
  },
  
  notes: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        note: { type: 'string', required: true },
        timestamp: { type: 'string', required: true, format: 'date-time' },
        author: { type: 'string', required: true },
        type: { type: 'string', enum: ['customer', 'admin', 'system'] }
      }
    }
  },
  
  // Health questionnaire (specific to health supplements)
  healthInfo: {
    type: 'object',
    properties: {
      currentMedications: { type: 'string' },
      allergies: { type: 'string' },
      healthConditions: { type: 'string' },
      previousSupplementUse: { type: 'boolean' },
      doctorConsultation: { type: 'boolean' },
      pregnancyStatus: { type: 'boolean' },
      age: { type: 'number', min: 18, max: 120 }
    }
  },
  
  // Marketing and analytics
  source: {
    type: 'object',
    properties: {
      channel: {
        type: 'string',
        enum: ['direct', 'google', 'facebook', 'instagram', 'whatsapp', 'referral', 'amazon']
      },
      campaign: { type: 'string' },
      medium: { type: 'string' },
      referrer: { type: 'string' },
      utmParams: {
        type: 'object',
        properties: {
          source: { type: 'string' },
          medium: { type: 'string' },
          campaign: { type: 'string' },
          term: { type: 'string' },
          content: { type: 'string' }
        }
      }
    }
  },
  
  // Timestamps
  createdAt: {
    type: 'string',
    required: true,
    format: 'date-time'
  },
  
  updatedAt: {
    type: 'string',
    format: 'date-time'
  },
  
  // Additional metadata
  metadata: {
    type: 'object',
    properties: {
      userAgent: { type: 'string' },
      ipAddress: { type: 'string' },
      deviceType: { type: 'string', enum: ['mobile', 'tablet', 'desktop'] },
      browser: { type: 'string' }
    }
  }
};

// Validation function
export const validateOrder = (order) => {
  const errors = [];
  
  // Required fields validation
  if (!order.orderId) errors.push('Order ID is required');
  if (!order.customer) errors.push('Customer information is required');
  if (!order.items || order.items.length === 0) errors.push('Order items are required');
  if (!order.pricing) errors.push('Pricing information is required');
  if (!order.shipping) errors.push('Shipping information is required');
  if (!order.payment) errors.push('Payment information is required');
  
  // Customer validation
  if (order.customer) {
    if (!order.customer.firstName) errors.push('Customer first name is required');
    if (!order.customer.lastName) errors.push('Customer last name is required');
    if (!order.customer.email) errors.push('Customer email is required');
    if (!order.customer.phone) errors.push('Customer phone is required');
    
    // Phone validation (Indian mobile number)
    if (order.customer.phone && !/^[6-9][0-9]{9}$/.test(order.customer.phone)) {
      errors.push('Invalid phone number format');
    }
    
    // Email validation
    if (order.customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.customer.email)) {
      errors.push('Invalid email format');
    }
  }
  
  // Items validation
  if (order.items) {
    order.items.forEach((item, index) => {
      if (!item.productId) errors.push(`Item ${index + 1}: Product ID is required`);
      if (!item.quantity || item.quantity < 1) errors.push(`Item ${index + 1}: Valid quantity is required`);
      if (!item.unitPrice || item.unitPrice < 0) errors.push(`Item ${index + 1}: Valid unit price is required`);
      
      // Check if total price matches calculation
      if (item.quantity && item.unitPrice && item.totalPrice) {
        const calculatedTotal = item.quantity * item.unitPrice;
        if (Math.abs(item.totalPrice - calculatedTotal) > 0.01) {
          errors.push(`Item ${index + 1}: Total price doesn't match quantity × unit price`);
        }
      }
    });
  }
  
  // Pricing validation
  if (order.pricing) {
    if (order.pricing.total < 0) errors.push('Total amount cannot be negative');
    
    // Check if total matches calculation
    const calculatedTotal = (order.pricing.subtotal || 0) + 
                           (order.pricing.shipping || 0) + 
                           (order.pricing.tax || 0) - 
                           (order.pricing.discount || 0);
    
    if (order.pricing.total && Math.abs(order.pricing.total - calculatedTotal) > 0.01) {
      errors.push('Total amount doesn\'t match pricing breakdown');
    }
  }
  
  // Shipping address validation
  if (order.shipping && order.shipping.address) {
    const addr = order.shipping.address;
    if (!addr.line1) errors.push('Shipping address line 1 is required');
    if (!addr.city) errors.push('Shipping city is required');
    if (!addr.state) errors.push('Shipping state is required');
    if (!addr.postalCode) errors.push('Shipping postal code is required');
    
    // Postal code validation (Indian PIN code)
    if (addr.postalCode && !/^[1-9][0-9]{5}$/.test(addr.postalCode)) {
      errors.push('Invalid postal code format');
    }
  }
  
  // Payment validation
  if (order.payment) {
    if (!order.payment.method) errors.push('Payment method is required');
    if (!order.payment.status) errors.push('Payment status is required');
    if (!order.payment.amount || order.payment.amount < 0) errors.push('Valid payment amount is required');
    
    // For advance payments, validate advance and balance amounts
    if (order.payment.method === 'advance') {
      if (!order.payment.advanceAmount) errors.push('Advance amount is required for advance payments');
      if (!order.payment.balanceAmount) errors.push('Balance amount is required for advance payments');
      
      if (order.payment.advanceAmount && order.payment.balanceAmount && order.payment.amount) {
        const totalPayment = order.payment.advanceAmount + order.payment.balanceAmount;
        if (Math.abs(totalPayment - order.payment.amount) > 0.01) {
          errors.push('Advance + balance amount should equal total payment amount');
        }
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SA-ORD-${timestamp}${random}`;
};

export const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SA${year}${month}${day}${random}`;
};

export const calculateOrderTotal = (items, shipping = 0, tax = 0, discount = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  return {
    subtotal,
    shipping,
    tax,
    discount,
    total: subtotal + shipping + tax - discount
  };
};

export const getOrderStatusColor = (status) => {
  const statusColors = {
    pending: '#fbbf24',
    confirmed: '#60a5fa',
    processing: '#a78bfa',
    shipped: '#34d399',
    delivered: '#10b981',
    cancelled: '#f87171',
    returned: '#fb7185'
  };
  return statusColors[status] || '#6b7280';
};

export const formatOrderTimeline = (timeline) => {
  return timeline.map(entry => ({
    ...entry,
    formattedDate: new Date(entry.timestamp).toLocaleDateString('en-IN'),
    formattedTime: new Date(entry.timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }));
};

// Sample order data
export const sampleOrder = {
  orderId: 'SA-ORD-1703936400001',
  orderNumber: 'SA24123001',
  customer: {
    id: 'CUST001',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '9876543210',
    dateOfBirth: '1985-06-15',
    gender: 'male'
  },
  items: [
    {
      productId: 'SA-DHS001',
      productName: 'Sampoorna Arogya Digestive Health Supplement',
      quantity: 2,
      unitPrice: 3990,
      totalPrice: 7980,
      sku: 'SA-DHS-100G'
    }
  ],
  pricing: {
    subtotal: 7980,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 7980
  },
  shipping: {
    address: {
      line1: '123 MG Road',
      line2: 'Near City Mall',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    },
    method: 'standard',
    estimatedDelivery: '2024-12-15',
    trackingNumber: null,
    carrier: 'India Post'
  },
  billing: {
    sameAsShipping: true
  },
  payment: {
    method: 'razorpay',
    status: 'completed',
    transactionId: 'pay_test123456789',
    razorpayOrderId: 'order_test123456789',
    razorpayPaymentId: 'pay_test123456789',
    amount: 7980,
    currency: 'INR',
    paidAt: '2024-12-10T10:30:00Z'
  },
  status: 'confirmed',
  timeline: [
    {
      status: 'pending',
      timestamp: '2024-12-10T10:00:00Z',
      note: 'Order placed by customer',
      updatedBy: 'system'
    },
    {
      status: 'confirmed',
      timestamp: '2024-12-10T10:30:00Z',
      note: 'Payment confirmed',
      updatedBy: 'system'
    }
  ],
  specialInstructions: 'Please deliver between 10 AM - 6 PM',
  healthInfo: {
    currentMedications: 'None',
    allergies: 'None known',
    healthConditions: 'Mild acidity',
    previousSupplementUse: false,
    doctorConsultation: false,
    pregnancyStatus: false,
    age: 39
  },
  source: {
    channel: 'direct',
    campaign: 'organic'
  },
  createdAt: '2024-12-10T10:00:00Z',
  updatedAt: '2024-12-10T10:30:00Z',
  metadata: {
    userAgent: 'Mozilla/5.0...',
    ipAddress: '192.168.1.1',
    deviceType: 'mobile',
    browser: 'Chrome'
  }
};

export default {
  orderSchema,
  validateOrder,
  generateOrderId,
  generateOrderNumber,
  calculateOrderTotal,
  getOrderStatusColor,
  formatOrderTimeline,
  sampleOrder
};
