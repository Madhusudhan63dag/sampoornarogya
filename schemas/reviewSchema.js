/**
 * Review Schema for Sampoorna Arogya
 * Defines the structure and validation for customer product reviews
 */

export const reviewSchema = {
  // Review identification
  reviewId: {
    type: 'string',
    required: true,
    pattern: '^SA-REV-[0-9]{10}$',
    description: 'Unique review identifier (e.g., SA-REV-1234567890)'
  },
  
  // Product and customer references
  productId: {
    type: 'string',
    required: true,
    description: 'ID of the reviewed product'
  },
  
  customerId: {
    type: 'string',
    required: true,
    description: 'ID of the customer who wrote the review'
  },
  
  orderId: {
    type: 'string',
    description: 'Order ID associated with this review (for verified purchases)'
  },
  
  // Review content
  rating: {
    type: 'number',
    required: true,
    min: 1,
    max: 5,
    description: 'Overall rating (1-5 stars)'
  },
  
  title: {
    type: 'string',
    required: true,
    minLength: 5,
    maxLength: 100,
    description: 'Review title/headline'
  },
  
  content: {
    type: 'string',
    required: true,
    minLength: 20,
    maxLength: 2000,
    description: 'Detailed review content'
  },
  
  // Detailed ratings
  detailedRatings: {
    type: 'object',
    properties: {
      effectiveness: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'How effective was the product'
      },
      quality: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Product quality rating'
      },
      packaging: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Packaging quality rating'
      },
      delivery: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Delivery experience rating'
      },
      value: {
        type: 'number',
        min: 1,
        max: 5,
        description: 'Value for money rating'
      }
    }
  },
  
  // Health-specific feedback
  healthFeedback: {
    type: 'object',
    properties: {
      conditionImproved: {
        type: 'boolean',
        description: 'Did the health condition improve'
      },
      
      timeToSeeResults: {
        type: 'string',
        enum: ['within_1_week', '1_2_weeks', '2_4_weeks', '1_2_months', 'more_than_2_months', 'no_results'],
        description: 'Time taken to see results'
      },
      
      sideEffects: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            effect: { type: 'string', required: true },
            severity: {
              type: 'string',
              enum: ['mild', 'moderate', 'severe']
            },
            duration: { type: 'string' }
          }
        }
      },
      
      dosageFollowed: {
        type: 'boolean',
        description: 'Whether customer followed recommended dosage'
      },
      
      usageDuration: {
        type: 'string',
        enum: ['less_than_1_month', '1_2_months', '2_3_months', 'more_than_3_months'],
        description: 'How long the product was used'
      },
      
      wouldRecommend: {
        type: 'boolean',
        description: 'Would recommend to others'
      },
      
      repurchaseIntent: {
        type: 'string',
        enum: ['definitely', 'probably', 'maybe', 'probably_not', 'definitely_not'],
        description: 'Likelihood to repurchase'
      }
    }
  },
  
  // Review metadata
  isVerifiedPurchase: {
    type: 'boolean',
    default: false,
    description: 'Whether this is from a verified purchase'
  },
  
  helpful: {
    type: 'number',
    min: 0,
    default: 0,
    description: 'Number of helpful votes'
  },
  
  notHelpful: {
    type: 'number',
    min: 0,
    default: 0,
    description: 'Number of not helpful votes'
  },
  
  // Media attachments
  images: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: { type: 'string', required: true },
        caption: { type: 'string' },
        type: {
          type: 'string',
          enum: ['before', 'after', 'product', 'packaging', 'usage']
        }
      }
    },
    maxItems: 5
  },
  
  videos: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        url: { type: 'string', required: true },
        thumbnail: { type: 'string' },
        duration: { type: 'number' },
        caption: { type: 'string' }
      }
    },
    maxItems: 2
  },
  
  // Review status and moderation
  status: {
    type: 'string',
    enum: ['pending', 'approved', 'rejected', 'flagged', 'hidden'],
    default: 'pending'
  },
  
  moderationNotes: {
    type: 'string',
    description: 'Internal moderation notes'
  },
  
  flaggedReasons: {
    type: 'array',
    items: {
      type: 'string',
      enum: ['inappropriate_content', 'spam', 'fake_review', 'personal_information', 'off_topic']
    }
  },
  
  // Customer information (for display)
  reviewerInfo: {
    type: 'object',
    properties: {
      displayName: {
        type: 'string',
        required: true,
        description: 'Name to display with review'
      },
      location: {
        type: 'string',
        description: 'Customer location (city, state)'
      },
      age: {
        type: 'number',
        min: 18,
        max: 120
      },
      customerType: {
        type: 'string',
        enum: ['first_time', 'returning', 'loyal', 'vip']
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
  
  // Response from company
  response: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        maxLength: 1000,
        description: 'Company response to review'
      },
      respondedBy: {
        type: 'string',
        description: 'Name/role of person responding'
      },
      responseDate: {
        type: 'string',
        format: 'date-time'
      }
    }
  },
  
  // Analytics
  analytics: {
    type: 'object',
    properties: {
      views: {
        type: 'number',
        min: 0,
        default: 0
      },
      shares: {
        type: 'number',
        min: 0,
        default: 0
      },
      sentiment: {
        type: 'string',
        enum: ['positive', 'neutral', 'negative']
      },
      keywords: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  }
};

// Validation function
export const validateReview = (review) => {
  const errors = [];
  
  // Required fields validation
  if (!review.reviewId) errors.push('Review ID is required');
  if (!review.productId) errors.push('Product ID is required');
  if (!review.customerId) errors.push('Customer ID is required');
  if (!review.rating) errors.push('Rating is required');
  if (!review.title) errors.push('Review title is required');
  if (!review.content) errors.push('Review content is required');
  
  // Rating validation
  if (review.rating && (review.rating < 1 || review.rating > 5)) {
    errors.push('Rating must be between 1 and 5');
  }
  
  // Title validation
  if (review.title) {
    if (review.title.length < 5) errors.push('Title must be at least 5 characters');
    if (review.title.length > 100) errors.push('Title must be less than 100 characters');
  }
  
  // Content validation
  if (review.content) {
    if (review.content.length < 20) errors.push('Review content must be at least 20 characters');
    if (review.content.length > 2000) errors.push('Review content must be less than 2000 characters');
  }
  
  // Detailed ratings validation
  if (review.detailedRatings) {
    Object.entries(review.detailedRatings).forEach(([key, value]) => {
      if (value && (value < 1 || value > 5)) {
        errors.push(`${key} rating must be between 1 and 5`);
      }
    });
  }
  
  // Images validation
  if (review.images && review.images.length > 5) {
    errors.push('Maximum 5 images allowed per review');
  }
  
  // Videos validation
  if (review.videos && review.videos.length > 2) {
    errors.push('Maximum 2 videos allowed per review');
  }
  
  // Reviewer info validation
  if (review.reviewerInfo) {
    if (!review.reviewerInfo.displayName) {
      errors.push('Reviewer display name is required');
    }
    if (review.reviewerInfo.age && (review.reviewerInfo.age < 18 || review.reviewerInfo.age > 120)) {
      errors.push('Reviewer age must be between 18 and 120');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions
export const generateReviewId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `SA-REV-${timestamp}${random}`;
};

export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / reviews.length) * 10) / 10;
};

export const getRatingDistribution = (reviews) => {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      distribution[Math.floor(review.rating)]++;
    }
  });
  
  return distribution;
};

export const getReviewSentiment = (content) => {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'love', 'fantastic', 'wonderful', 'effective', 'helpful', 'recommend'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'useless', 'waste', 'disappointed', 'ineffective'];
  
  const words = content.toLowerCase().split(/\s+/);
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

export const maskReviewerName = (name) => {
  if (!name || name.length < 2) return name;
  
  const parts = name.split(' ');
  return parts.map(part => {
    if (part.length <= 2) return part;
    return part.charAt(0) + '*'.repeat(part.length - 2) + part.charAt(part.length - 1);
  }).join(' ');
};

export const getHelpfulnessRatio = (helpful, notHelpful) => {
  const total = helpful + notHelpful;
  if (total === 0) return 0;
  return Math.round((helpful / total) * 100);
};

// Sample review data
export const sampleReview = {
  reviewId: 'SA-REV-1703936400001',
  productId: 'SA-DHS001',
  customerId: 'SA-CUST-12345678',
  orderId: 'SA-ORD-1703936400001',
  rating: 5,
  title: 'Excellent digestive supplement - highly recommended!',
  content: 'I have been using Sampoorna Arogya for the past 2 months and I am amazed by the results. My digestion has improved significantly, and I no longer experience bloating after meals. The natural ingredients give me confidence that I am taking something safe and effective. The packaging is also very good and the product arrived fresh. I would definitely recommend this to anyone struggling with digestive issues.',
  detailedRatings: {
    effectiveness: 5,
    quality: 5,
    packaging: 4,
    delivery: 5,
    value: 4
  },
  healthFeedback: {
    conditionImproved: true,
    timeToSeeResults: '2_4_weeks',
    sideEffects: [],
    dosageFollowed: true,
    usageDuration: '2_3_months',
    wouldRecommend: true,
    repurchaseIntent: 'definitely'
  },
  isVerifiedPurchase: true,
  helpful: 15,
  notHelpful: 1,
  images: [
    {
      url: '/reviews/product-photo-1.jpg',
      caption: 'Product packaging received',
      type: 'product'
    }
  ],
  videos: [],
  status: 'approved',
  reviewerInfo: {
    displayName: 'Priya S.',
    location: 'Mumbai, Maharashtra',
    age: 34,
    customerType: 'returning'
  },
  createdAt: '2024-12-01T14:30:00Z',
  updatedAt: '2024-12-01T14:30:00Z',
  response: {
    content: 'Thank you for your wonderful review, Priya! We are delighted to hear that Sampoorna Arogya has helped improve your digestive health. Your feedback motivates us to continue providing quality Ayurvedic supplements.',
    respondedBy: 'Sampoorna Arogya Team',
    responseDate: '2024-12-02T10:00:00Z'
  },
  analytics: {
    views: 127,
    shares: 3,
    sentiment: 'positive',
    keywords: ['digestive', 'bloating', 'natural', 'effective', 'recommend']
  }
};

export default {
  reviewSchema,
  validateReview,
  generateReviewId,
  calculateAverageRating,
  getRatingDistribution,
  getReviewSentiment,
  maskReviewerName,
  getHelpfulnessRatio,
  sampleReview
};
