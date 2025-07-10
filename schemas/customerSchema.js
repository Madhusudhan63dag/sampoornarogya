/**
 * Customer Schema for Sampoorna Arogya
 * Defines the structure and validation for customer data
 */

export const customerSchema = {
  // Customer identification
  customerId: {
    type: 'string',
    required: true,
    pattern: '^SA-CUST-[0-9]{8}$',
    description: 'Unique customer identifier (e.g., SA-CUST-12345678)'
  },
  
  // Personal information
  personalInfo: {
    type: 'object',
    required: true,
    properties: {
      firstName: {
        type: 'string',
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
      },
      lastName: {
        type: 'string',
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]+$'
      },
      middleName: {
        type: 'string',
        maxLength: 50,
        pattern: '^[a-zA-Z\\s]*$'
      },
      dateOfBirth: {
        type: 'string',
        format: 'date',
        description: 'Customer date of birth (YYYY-MM-DD)'
      },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'other', 'prefer_not_to_say']
      },
      age: {
        type: 'number',
        min: 18,
        max: 120,
        description: 'Customer age (calculated or provided)'
      }
    }
  },
  
  // Contact information
  contactInfo: {
    type: 'object',
    required: true,
    properties: {
      email: {
        type: 'string',
        required: true,
        format: 'email',
        description: 'Primary email address'
      },
      emailVerified: {
        type: 'boolean',
        default: false
      },
      phone: {
        type: 'string',
        required: true,
        pattern: '^[6-9][0-9]{9}$',
        description: 'Indian mobile number'
      },
      phoneVerified: {
        type: 'boolean',
        default: false
      },
      alternatePhone: {
        type: 'string',
        pattern: '^[6-9][0-9]{9}$',
        description: 'Alternative contact number'
      },
      whatsappNumber: {
        type: 'string',
        pattern: '^[6-9][0-9]{9}$',
        description: 'WhatsApp number for notifications'
      }
    }
  },
  
  // Address information
  addresses: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string', required: true },
        type: {
          type: 'string',
          enum: ['home', 'work', 'billing', 'shipping', 'other'],
          required: true
        },
        isDefault: { type: 'boolean', default: false },
        line1: { type: 'string', required: true, maxLength: 100 },
        line2: { type: 'string', maxLength: 100 },
        landmark: { type: 'string', maxLength: 100 },
        city: { type: 'string', required: true, maxLength: 50 },
        state: { type: 'string', required: true, maxLength: 50 },
        postalCode: {
          type: 'string',
          required: true,
          pattern: '^[1-9][0-9]{5}$'
        },
        country: { type: 'string', required: true, default: 'India' },
        coordinates: {
          type: 'object',
          properties: {
            latitude: { type: 'number' },
            longitude: { type: 'number' }
          }
        }
      }
    }
  },
  
  // Health profile (specific to health supplements)
  healthProfile: {
    type: 'object',
    properties: {
      currentMedications: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', required: true },
            dosage: { type: 'string' },
            frequency: { type: 'string' },
            startDate: { type: 'string', format: 'date' },
            prescribedBy: { type: 'string' }
          }
        }
      },
      allergies: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            allergen: { type: 'string', required: true },
            reaction: { type: 'string' },
            severity: {
              type: 'string',
              enum: ['mild', 'moderate', 'severe']
            }
          }
        }
      },
      healthConditions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            condition: { type: 'string', required: true },
            diagnosedDate: { type: 'string', format: 'date' },
            status: {
              type: 'string',
              enum: ['active', 'resolved', 'chronic', 'monitored']
            },
            notes: { type: 'string' }
          }
        }
      },
      supplementHistory: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productName: { type: 'string', required: true },
            startDate: { type: 'string', format: 'date' },
            endDate: { type: 'string', format: 'date' },
            effectiveness: {
              type: 'number',
              min: 1,
              max: 5,
              description: 'Rating from 1-5'
            },
            sideEffects: { type: 'string' }
          }
        }
      },
      dietaryRestrictions: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'sugar-free', 'other']
        }
      },
      pregnancyStatus: {
        type: 'object',
        properties: {
          isPregnant: { type: 'boolean', default: false },
          isBreastfeeding: { type: 'boolean', default: false },
          expectedDueDate: { type: 'string', format: 'date' }
        }
      },
      doctorConsultation: {
        type: 'boolean',
        description: 'Whether customer has consulted doctor before supplement use'
      }
    }
  },
  
  // Purchase history and preferences
  purchaseHistory: {
    type: 'object',
    properties: {
      totalOrders: { type: 'number', min: 0, default: 0 },
      totalSpent: { type: 'number', min: 0, default: 0 },
      averageOrderValue: { type: 'number', min: 0, default: 0 },
      lastOrderDate: { type: 'string', format: 'date-time' },
      favoriteProducts: {
        type: 'array',
        items: { type: 'string' }
      },
      preferredPaymentMethod: {
        type: 'string',
        enum: ['razorpay', 'cod', 'upi', 'netbanking']
      },
      preferredDeliveryTime: {
        type: 'string',
        enum: ['morning', 'afternoon', 'evening', 'anytime']
      }
    }
  },
  
  // Marketing preferences
  preferences: {
    type: 'object',
    properties: {
      emailNotifications: { type: 'boolean', default: true },
      smsNotifications: { type: 'boolean', default: true },
      whatsappNotifications: { type: 'boolean', default: true },
      marketingEmails: { type: 'boolean', default: true },
      newsletter: { type: 'boolean', default: true },
      preferredLanguage: {
        type: 'string',
        enum: ['english', 'hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati'],
        default: 'english'
      },
      communicationFrequency: {
        type: 'string',
        enum: ['daily', 'weekly', 'monthly', 'minimal'],
        default: 'weekly'
      }
    }
  },
  
  // Account information
  account: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['active', 'inactive', 'suspended', 'blocked'],
        default: 'active'
      },
      accountType: {
        type: 'string',
        enum: ['regular', 'premium', 'vip'],
        default: 'regular'
      },
      registrationDate: {
        type: 'string',
        format: 'date-time',
        required: true
      },
      lastLoginDate: {
        type: 'string',
        format: 'date-time'
      },
      loyaltyPoints: {
        type: 'number',
        min: 0,
        default: 0
      },
      referralCode: {
        type: 'string',
        description: 'Customer\'s unique referral code'
      },
      referredBy: {
        type: 'string',
        description: 'Referral code of who referred this customer'
      }
    }
  },
  
  // Analytics and tracking
  analytics: {
    type: 'object',
    properties: {
      acquisitionChannel: {
        type: 'string',
        enum: ['direct', 'google', 'facebook', 'instagram', 'whatsapp', 'referral', 'amazon']
      },
      acquisitionCampaign: { type: 'string' },
      lifetime_value: { type: 'number', min: 0, default: 0 },
      engagement_score: { type: 'number', min: 0, max: 100, default: 0 },
      risk_score: { type: 'number', min: 0, max: 100, default: 0 },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Customer segmentation tags'
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
  
  // GDPR and privacy
  privacy: {
    type: 'object',
    properties: {
      dataProcessingConsent: { type: 'boolean', required: true },
      marketingConsent: { type: 'boolean', default: false },
      dataRetentionConsent: { type: 'boolean', default: true },
      consentDate: { type: 'string', format: 'date-time' },
      gdprRequests: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['access', 'rectification', 'erasure', 'portability', 'restriction']
            },
            requestDate: { type: 'string', format: 'date-time' },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'completed', 'denied']
            },
            completedDate: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  }
};

// Validation function
export const validateCustomer = (customer) => {
  const errors = [];
  
  // Required fields validation
  if (!customer.customerId) errors.push('Customer ID is required');
  if (!customer.personalInfo) errors.push('Personal information is required');
  if (!customer.contactInfo) errors.push('Contact information is required');
  
  // Personal info validation
  if (customer.personalInfo) {
    if (!customer.personalInfo.firstName) errors.push('First name is required');
    if (!customer.personalInfo.lastName) errors.push('Last name is required');
    
    // Name validation (only letters and spaces)
    if (customer.personalInfo.firstName && !/^[a-zA-Z\s]+$/.test(customer.personalInfo.firstName)) {
      errors.push('First name should contain only letters and spaces');
    }
    if (customer.personalInfo.lastName && !/^[a-zA-Z\s]+$/.test(customer.personalInfo.lastName)) {
      errors.push('Last name should contain only letters and spaces');
    }
    
    // Age validation
    if (customer.personalInfo.age && (customer.personalInfo.age < 18 || customer.personalInfo.age > 120)) {
      errors.push('Age must be between 18 and 120');
    }
  }
  
  // Contact info validation
  if (customer.contactInfo) {
    if (!customer.contactInfo.email) errors.push('Email is required');
    if (!customer.contactInfo.phone) errors.push('Phone is required');
    
    // Email validation
    if (customer.contactInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.contactInfo.email)) {
      errors.push('Invalid email format');
    }
    
    // Phone validation (Indian mobile number)
    if (customer.contactInfo.phone && !/^[6-9][0-9]{9}$/.test(customer.contactInfo.phone)) {
      errors.push('Invalid phone number format (should be 10 digits starting with 6-9)');
    }
    
    // Alternate phone validation
    if (customer.contactInfo.alternatePhone && !/^[6-9][0-9]{9}$/.test(customer.contactInfo.alternatePhone)) {
      errors.push('Invalid alternate phone number format');
    }
  }
  
  // Address validation
  if (customer.addresses && customer.addresses.length > 0) {
    customer.addresses.forEach((address, index) => {
      if (!address.line1) errors.push(`Address ${index + 1}: Street address is required`);
      if (!address.city) errors.push(`Address ${index + 1}: City is required`);
      if (!address.state) errors.push(`Address ${index + 1}: State is required`);
      if (!address.postalCode) errors.push(`Address ${index + 1}: Postal code is required`);
      
      // Postal code validation (Indian PIN code)
      if (address.postalCode && !/^[1-9][0-9]{5}$/.test(address.postalCode)) {
        errors.push(`Address ${index + 1}: Invalid postal code format`);
      }
    });
    
    // Check for multiple default addresses
    const defaultAddresses = customer.addresses.filter(addr => addr.isDefault);
    if (defaultAddresses.length > 1) {
      errors.push('Only one address can be set as default');
    }
  }
  
  // Privacy consent validation
  if (customer.privacy && !customer.privacy.dataProcessingConsent) {
    errors.push('Data processing consent is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateCustomerId = () => {
  const timestamp = Date.now().toString().slice(-8);
  return `SA-CUST-${timestamp}`;
};

export const generateReferralCode = (firstName, lastName) => {
  const name = (firstName.substring(0, 3) + lastName.substring(0, 3)).toUpperCase();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${name}${random}`;
};

export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const getCustomerSegment = (customer) => {
  if (!customer.purchaseHistory) return 'new';
  
  const { totalOrders, totalSpent, lastOrderDate } = customer.purchaseHistory;
  const daysSinceLastOrder = lastOrderDate ? 
    Math.floor((new Date() - new Date(lastOrderDate)) / (1000 * 60 * 60 * 24)) : Infinity;
  
  if (totalOrders === 0) return 'new';
  if (totalOrders >= 10 && totalSpent >= 25000) return 'vip';
  if (totalOrders >= 5 && totalSpent >= 10000) return 'loyal';
  if (daysSinceLastOrder > 180) return 'inactive';
  if (totalOrders >= 2) return 'returning';
  return 'new';
};

export const formatCustomerName = (customer) => {
  if (!customer.personalInfo) return 'Unknown Customer';
  
  const { firstName, lastName, middleName } = customer.personalInfo;
  return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
};

// Sample customer data
export const sampleCustomer = {
  customerId: 'SA-CUST-12345678',
  personalInfo: {
    firstName: 'Rajesh',
    lastName: 'Kumar',
    dateOfBirth: '1985-06-15',
    gender: 'male',
    age: 39
  },
  contactInfo: {
    email: 'rajesh.kumar@email.com',
    emailVerified: true,
    phone: '9876543210',
    phoneVerified: true,
    whatsappNumber: '9876543210'
  },
  addresses: [
    {
      id: 'addr_001',
      type: 'home',
      isDefault: true,
      line1: '123 MG Road',
      line2: 'Near City Mall',
      landmark: 'Opposite Bank',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India'
    }
  ],
  healthProfile: {
    currentMedications: [],
    allergies: [],
    healthConditions: [
      {
        condition: 'Mild acidity',
        status: 'active',
        notes: 'Occasional heartburn after meals'
      }
    ],
    supplementHistory: [],
    dietaryRestrictions: ['vegetarian'],
    pregnancyStatus: {
      isPregnant: false,
      isBreastfeeding: false
    },
    doctorConsultation: false
  },
  purchaseHistory: {
    totalOrders: 3,
    totalSpent: 11970,
    averageOrderValue: 3990,
    lastOrderDate: '2024-12-10T10:00:00Z',
    favoriteProducts: ['SA-DHS001'],
    preferredPaymentMethod: 'razorpay',
    preferredDeliveryTime: 'evening'
  },
  preferences: {
    emailNotifications: true,
    smsNotifications: true,
    whatsappNotifications: true,
    marketingEmails: true,
    newsletter: true,
    preferredLanguage: 'english',
    communicationFrequency: 'weekly'
  },
  account: {
    status: 'active',
    accountType: 'regular',
    registrationDate: '2024-01-15T08:00:00Z',
    lastLoginDate: '2024-12-10T09:30:00Z',
    loyaltyPoints: 1197,
    referralCode: 'RAJKUM123'
  },
  analytics: {
    acquisitionChannel: 'google',
    acquisitionCampaign: 'digestive-health-2024',
    lifetime_value: 11970,
    engagement_score: 75,
    risk_score: 15,
    tags: ['returning-customer', 'high-engagement', 'health-conscious']
  },
  createdAt: '2024-01-15T08:00:00Z',
  updatedAt: '2024-12-10T10:00:00Z',
  privacy: {
    dataProcessingConsent: true,
    marketingConsent: true,
    dataRetentionConsent: true,
    consentDate: '2024-01-15T08:00:00Z',
    gdprRequests: []
  }
};

export default {
  customerSchema,
  validateCustomer,
  generateCustomerId,
  generateReferralCode,
  calculateAge,
  getCustomerSegment,
  formatCustomerName,
  sampleCustomer
};
