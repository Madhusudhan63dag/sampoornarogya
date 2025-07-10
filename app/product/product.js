"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';
import product1 from '../../assets/1.jpg';
import product2 from '../../assets/2.jpg'; // Add more product images
import product3 from '../../assets/10.jpg'; // Add more product images
import product4 from '../../assets/8.jpg'; // Add more product images
import { Star, Minus, Plus, ShoppingCart, ExternalLink } from 'lucide-react';
import { FaAmazon } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import amazon from '../../assets/amazon.webp';
import buy from '../../assets/buy.png';

const BACKEND_URL = 'https://razorpaybackend-wgbh.onrender.com'; // Your backend URL


export default function Product() {
    const [quantity, setQuantity] = useState(1);
    const [gradientPosition, setGradientPosition] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showAdvancePayment, setShowAdvancePayment] = useState(false);
    const [advanceAmount, setAdvanceAmount] = useState(1000); // Default advance amount
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0); // Will be calculated from localStorage
    const [stockCount, setStockCount] = useState(23); // Simulated stock count
    const [recentPurchases, setRecentPurchases] = useState([
        "Rajesh from Mumbai just bought 2 Packs",
        "Priya from Delhi just bought 1 Packs", 
        "Amit from Bangalore just bought 3 Packs"
    ]);
    const [currentPurchaseIndex, setCurrentPurchaseIndex] = useState(0);
    
    const router = useRouter();

    // SEO and Structured Data
    useEffect(() => {
        // Set document title and meta tags
        document.title = "Sampoorna Arogya - Natural Digestive Health Supplement | Ayurvedic Herbs";
        
        // Set meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', 'Transform your digestive health naturally with Sampoorna Arogya. Premium Ayurvedic supplement with Triphala, Amla, Ginger for better digestion, immunity & detoxification. 100% natural ingredients.');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'Transform your digestive health naturally with Sampoorna Arogya. Premium Ayurvedic supplement with Triphala, Amla, Ginger for better digestion, immunity & detoxification. 100% natural ingredients.';
            document.head.appendChild(meta);
        }

        // Set meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', 'digestive health supplement, ayurvedic herbs, natural digestion aid, triphala supplement, gut health, immunity booster, detox supplement, sampoorna arogya');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = 'digestive health supplement, ayurvedic herbs, natural digestion aid, triphala supplement, gut health, immunity booster, detox supplement, sampoorna arogya';
            document.head.appendChild(meta);
        }

        // Add structured data JSON-LD
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Sampoorna Arogya Digestive Health Supplement",
            "alternateName": "Natural Digestive Health Supplement",
            "image": [
                "https://sampoornarogya.com/assets/1.jpg",
                "https://sampoornarogya.com/assets/2.jpg",
                "https://sampoornarogya.com/assets/10.jpg",
                "https://sampoornarogya.com/assets/8.jpg"
            ],
            "description": "Natural Ayurvedic supplement for digestive health and overall wellness. Helps improve digestion, boost immunity, and support natural detoxification with premium ingredients like Triphala, Amla, Ginger, Chitrak, Nagarmotha, Harad, Giloy, Nisoth, and Adrak. 100% Natural ingredients with no side effects.",
            "brand": {
                "@type": "Brand",
                "name": "Sampoorna Arogya"
            },
            "manufacturer": {
                "@type": "Organization",
                "name": "Sampoorna Arogya"
            },
            "category": "Health & Personal Care > Digestive Health",
            "gtin": "8901234567891",
            "mpn": "SA-DHS-100G",
            "sku": "SA001",
            "weight": {
                "@type": "QuantitativeValue",
                "value": "100",
                "unitCode": "GRM"
            },
            "offers": {
                "@type": "Offer",
                "url": "https://sampoornarogya.com/product",
                "priceCurrency": "INR",
                "price": "3990",
                "priceValidUntil": "2025-12-31",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock",
                "shippingDetails": {
                    "@type": "OfferShippingDetails",
                    "shippingRate": {
                        "@type": "MonetaryAmount",
                        "value": "0",
                        "currency": "INR"
                    },
                    "deliveryTime": {
                        "@type": "ShippingDeliveryTime",
                        "handlingTime": {
                            "@type": "QuantitativeValue",
                            "minValue": "1",
                            "maxValue": "2",
                            "unitCode": "DAY"
                        },
                        "transitTime": {
                            "@type": "QuantitativeValue",
                            "minValue": "3",
                            "maxValue": "7",
                            "unitCode": "DAY"
                        }
                    }
                },
                "seller": {
                    "@type": "Organization",
                    "name": "Sampoorna Arogya",
                    "url": "https://sampoornarogya.com"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "125",
                "bestRating": "5",
                "worstRating": "1"
            },
            "keywords": [
                "digestive health supplement",
                "ayurvedic herbs for digestion",
                "natural gut health",
                "triphala benefits",
                "immunity booster supplement",
                "detox supplement",
                "sampoorna arogya",
                "natural digestive aid",
                "ayurvedic medicine for digestion",
                "herbal supplement for gut health",
                "digestive fire booster",
                "agni enhancer",
                "natural detoxification",
                "digestive health and immunity",
                "ayurvedic digestive medicine",
                "natural digestive enzymes",
                "gut health supplement",
                "digestive wellness",
                "ayurvedic detox supplement",
                "natural immunity booster"
            ],
            "gtin13": "8901234567891",
            "productID": "SA-DHS-100G",
            "additionalProperty": [
                {
                    "@type": "PropertyValue",
                    "name": "Amla",
                    "value": "Natural Vitamin C source"
                },
                {
                    "@type": "PropertyValue", 
                    "name": "Chitrak",
                    "value": "Digestive stimulant"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Nagarmotha", 
                    "value": "Digestive aid"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Harad (Terminalia chebula)",
                    "value": "Digestive tonic"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Giloy",
                    "value": "Immunity booster"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Nisoth",
                    "value": "Natural laxative"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Adrak (Ginger)",
                    "value": "Digestive fire enhancer"
                },
                {
                    "@type": "PropertyValue",
                    "name": "Triphala",
                    "value": "Three-fruit digestive tonic"
                }
            ],
            "audience": {
                "@type": "PeopleAudience",
                "suggestedMinAge": "18"
            },
            "potentialAction": {
                "@type": "BuyAction",
                "target": "https://sampoornarogya.com/product#submit"
            },
            "isRelatedTo": [
                {
                    "@type": "MedicalCondition",
                    "name": "Digestive Issues",
                    "url": "https://schema.org/DigestiveSystemDisease"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Poor Digestion",
                    "url": "https://schema.org/Indigestion"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Bloating",
                    "url": "https://schema.org/Bloating"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Gas",
                    "url": "https://schema.org/Flatulence"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Acidity",
                    "url": "https://schema.org/Acidity"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Constipation",
                    "url": "https://schema.org/Constipation"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Weak Immunity",
                    "url": "https://schema.org/ImmuneSystemDisorder"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Toxin Buildup",
                    "url": "https://schema.org/Toxicity"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Poor Gut Health",
                    "url": "https://schema.org/GastrointestinalDisease"
                },
                {
                    "@type": "MedicalCondition",
                    "name": "Weak Agni",
                    "url": "https://schema.org/DigestiveSystemDisease"
                }
            ]
        };

        // Remove existing structured data script if any
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Add new structured data script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);

        console.log('SEO structured data added for Sampoorna Arogya product page');

        // Cleanup function
        return () => {
            const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, []);

    // Product details with multiple images
    const product = {
        name: "Sampoorna Digestive Health Supplement",
        price: 3990.00,
        originalPrice: 5990.00, // Added original price for discount display
        images: [product1, product2, product3, product4],
        description: "A natural supplement that promotes digestive health and overall wellness. Made with premium Ayurvedic ingredients.",
        features: [
            "100% Natural Ingredients",
            "Clinically Tested",
            "No Side Effects",
            "GMP Certified"
        ],
        ingredients: [
            "Amla",
            "Chitrak",
            "Nagarmotha",
            "Harad",
            "Giloy",
            "Nisoth",
            "Adrak"
        ]
    };

    const handleAddToCart = () => {
        console.log('handleAddToCart called with quantity:', quantity);
        
        // Only run on client side
        if (typeof window === 'undefined') {
            console.warn('handleAddToCart called on server side, skipping');
            return;
        }
        
        try {
            // Store the selected quantity in localStorage so the checkout form can use it
            localStorage.setItem('selectedQuantity', quantity.toString());
            console.log('Successfully stored quantity in localStorage:', quantity);
            
            // Scroll to the checkout form instead of showing modal
            const checkoutForm = document.getElementById('submit');
            if (checkoutForm) {
                checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            
        } catch (error) {
            console.error('Error storing quantity:', error);
        }
    };

    const handleBuyOnAmazon = () => {
        // Replace with your actual Amazon product URL
        const amazonUrl = "https://www.amazon.in/dp/B0DXV5TZ1P"; // Update with your Amazon product link
        window.open(amazonUrl, '_blank');
    };

    // Load Razorpay script
    useEffect(() => {
        const loadRazorpay = async () => {
            if (window.Razorpay) {
                setRazorpayLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setRazorpayLoaded(true);
            script.onerror = () => console.error('Failed to load Razorpay');
            document.body.appendChild(script);
        };

        loadRazorpay();
    }, []);

    const handleAdvancePayment = async () => {
        if (!razorpayLoaded) {
            alert('Payment system is loading. Please try again in a moment.');
            return;
        }

        try {
            const orderNumber = `ADV${Date.now()}${Math.floor(Math.random() * 1000)}`;
            
            // Create order for advance payment
            const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: advanceAmount,
                    currency: 'INR',
                    receipt: orderNumber,
                    notes: {
                        paymentType: 'advance',
                        productName: product.name,
                        quantity: quantity,
                        totalAmount: product.price * quantity,
                        advanceAmount: advanceAmount,
                        balanceAmount: (product.price * quantity) - advanceAmount
                    }
                })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create advance payment order');
            }

            const orderData = await orderResponse.json();
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'Sampoorna Arogya',
                description: `Advance Payment for ${product.name}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    try {
                        // Verify advance payment
                        const verifyResponse = await fetch(`${BACKEND_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyResult = await verifyResponse.json();
                        
                        if (verifyResult.success) {
                            // Show success message and redirect to form
                            alert(`Advance payment of ₹${advanceAmount} successful! Please fill your details to complete the order.`);
                            
                            // Store advance payment details in localStorage for the checkout form
                            localStorage.setItem('advancePaymentDetails', JSON.stringify({
                                orderNumber: orderNumber,
                                paymentId: response.razorpay_payment_id,
                                advanceAmount: advanceAmount,
                                totalAmount: product.price * quantity,
                                balanceAmount: (product.price * quantity) - advanceAmount,
                                productName: product.name,
                                quantity: quantity
                            }));
                            
                            // Navigate to checkout form
                            router.push('/product?advance=true');
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Advance payment verification error:', error);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Advance payment modal dismissed');
                    }
                },
                theme: {
                    color: '#43c3ff'
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            
        } catch (error) {
            console.error('Advance payment error:', error);
            alert('Failed to initialize advance payment. Please try again.');
        }
    };

    const handleQuickBuy = async () => {
        if (!razorpayLoaded) {
            alert('Payment system is loading. Please try again in a moment.');
            return;
        }

        try {
            const orderNumber = `QBY${Date.now()}${Math.floor(Math.random() * 1000)}`;
            const totalAmount = product.price * quantity;
            
            // Create order for quick buy
            const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: 'INR',
                    receipt: orderNumber,
                    notes: {
                        paymentType: 'full',
                        productName: product.name,
                        quantity: quantity
                    }
                })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create quick buy order');
            }

            const orderData = await orderResponse.json();
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'Sampoorna Arogya',
                description: `Quick Buy - ${product.name}`,
                order_id: orderData.order.id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch(`${BACKEND_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyResult = await verifyResponse.json();
                        
                        if (verifyResult.success) {
                            alert('Payment successful! Please fill your shipping details.');
                            
                            // Store payment details for the form
                            localStorage.setItem('quickBuyDetails', JSON.stringify({
                                orderNumber: orderNumber,
                                paymentId: response.razorpay_payment_id,
                                totalAmount: totalAmount,
                                productName: product.name,
                                quantity: quantity
                            }));
                            
                            // Navigate to checkout form
                            router.push('/product?quickbuy=true');
                        } else {
                            throw new Error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Quick buy verification error:', error);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Quick buy modal dismissed');
                    }
                },
                theme: {
                    color: '#43c3ff'
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            
        } catch (error) {
            console.error('Quick buy error:', error);
            alert('Failed to initialize quick buy. Please try again.');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPosition((prev) => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Initialize countdown timer from localStorage
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        const initializeCountdown = () => {
            const savedEndTime = localStorage.getItem('offerEndTime');
            const now = new Date().getTime();
            
            if (savedEndTime) {
                const endTime = parseInt(savedEndTime, 10);
                const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000));
                
                if (remainingTime > 0) {
                    console.log('Found existing countdown, remaining time:', remainingTime);
                    setTimeLeft(remainingTime);
                } else {
                    // Offer expired, create new one
                    console.log('Previous offer expired, creating new one');
                    createNewOffer();
                }
            } else {
                // No existing offer, create new one
                console.log('No existing offer found, creating new one');
                createNewOffer();
            }
        };

        const createNewOffer = () => {
            const now = new Date().getTime();
            const oneHourFromNow = now + (60 * 60 * 1000); // 1 hour in milliseconds
            
            localStorage.setItem('offerEndTime', oneHourFromNow.toString());
            setTimeLeft(3600); // 1 hour in seconds
            
            console.log('New offer created, ends at:', new Date(oneHourFromNow).toLocaleString());
        };

        initializeCountdown();
    }, []);

    // Countdown timer effect
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return;
        if (timeLeft === 0) return; // Don't start timer if timeLeft is 0
        
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const newTimeLeft = prev - 1;
                
                if (newTimeLeft <= 0) {
                    // Offer expired, create new one
                    console.log('Offer expired, creating new offer');
                    const now = new Date().getTime();
                    const oneHourFromNow = now + (60 * 60 * 1000);
                    localStorage.setItem('offerEndTime', oneHourFromNow.toString());
                    return 3600; // Reset to 1 hour
                }
                
                return newTimeLeft;
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Recent purchases rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPurchaseIndex((prev) => (prev + 1) % recentPurchases.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [recentPurchases.length]);

    // Stock decrease simulation
    useEffect(() => {
        const interval = setInterval(() => {
            setStockCount((prev) => {
                const newStock = prev - Math.floor(Math.random() * 2);
                return newStock < 5 ? 25 : newStock; // Reset stock if too low
            });
        }, 30000); // Decrease every 30 seconds
        return () => clearInterval(interval);
    }, []);

    // Format time for countdown
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Get formatted end time for display
    const getOfferEndTime = () => {
        // Only run on client side
        if (typeof window === 'undefined') {
            return '00:00 AM'; // Default fallback for SSR
        }
        
        const savedEndTime = localStorage.getItem('offerEndTime');
        if (savedEndTime) {
            const endTime = new Date(parseInt(savedEndTime, 10));
            return endTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
        return '';
    };


    return (
        <div className="flex relative bg-white min-h-screen">
            {/* Main Content */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="py-4 sm:py-8">
                    {/* Product Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
                        {/* Product Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={`${product.name} - View ${selectedImage + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-[#43c3ff]' : ''
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="flex flex-col justify-between">
                            {/* Urgency Banner */}
                            {/* <div className="mb-4 p-2 sm:p-3 bg-red-100 border-l-4 border-red-500 rounded-lg">
                                <div className="flex items-center">
                                    <span className="animate-pulse text-red-600 font-bold text-xs sm:text-sm">⚡ LIMITED TIME OFFER</span>
                                </div>
                                <div className="text-red-700 text-xs mt-1 break-words">
                                    Get 33% OFF + FREE Shipping - Ends in {formatTime(timeLeft)}
                                </div>
                                <div className="text-red-600 text-xs font-medium mt-1 break-words">
                                    ⏰ Offer expires today at {getOfferEndTime()}
                                </div>
                            </div> */}

                            {/* Stock Alert */}
                            {/* <div className="mb-4 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center text-orange-700 text-xs sm:text-sm">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
                                    Only {stockCount} left in stock - Order now!
                                </div>
                            </div> */}

                            {/* Social Proof Alert */}
                            <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
                                <div className="text-green-700 text-xs sm:text-sm animate-pulse break-words">
                                    🔥 {recentPurchases[currentPurchaseIndex]}
                                </div>
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 break-words">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="ml-2 text-gray-600 text-sm sm:text-base">(125 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                        <span className="text-2xl sm:text-3xl font-bold text-green-600">₹{product.price}</span>
                                        <span className="text-lg sm:text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                                            SAVE ₹{product.originalPrice - product.price}
                                        </span>
                                    </div>
                                    <div className="text-green-600 text-xs sm:text-sm font-medium mt-1">
                                        ✅ You save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% today!
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    {product.description}
                                </p>

                                {/* Quantity Selector */}
                                <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 items-center'>
                                    <div className="flex items-center">
                                        <span className="mr-2 sm:mr-4 text-sm sm:text-base">Quantity:</span>
                                        <Button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 border rounded-l text-sm sm:text-base"
                                        >
                                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </Button>
                                        <span className="px-3 sm:px-4 py-2 border-t border-b text-sm sm:text-base">
                                            {quantity}
                                        </span>
                                        <Button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 border rounded-r text-sm sm:text-base"
                                        >
                                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </Button>
                                    </div>
                                    <Button 
                                        id="amazon" 
                                        onClick={handleBuyOnAmazon} 
                                        className="amazon w-full sm:w-auto py-8 sm:py-8 lg:py-8 bg-white hover:bg-gray-50 text-black rounded-lg text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 transform transition-all duration-300 border-2 border-gray-300"
                                    >
                                        <Image src={amazon} alt="Buy on Amazon" className="w-10 sm:w-14 lg:w-12" />
                                        <span className="text-base font-bold lg:text-base">AVAILABLE ON AMAZON</span>
                                    </Button>
                                </div>

                                {/* Payment Options */}
                                <div className="space-y-3 mb-6">


                                    {/* Regular Add to Cart */}
                                    <Button onClick={handleAddToCart} className="w-full bg-white hover:bg-gray-100 text-black py-6 sm:py-8 lg:py-10 rounded-lg text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-gray-300">
                                        <Image src={buy} alt="Buy Now" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                                        <div className="text-center">
                                            <div className="font-bold text-xs sm:text-sm lg:text-base">BUY NOW - SAVE ₹2000!</div>
                                            <div className="text-xs sm:text-sm">FREE Shipping</div>
                                        </div>
                                    </Button>


                                    {/* Urgency message above buttons */}
                                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 sm:p-3 mb-3">
                                        <div className="text-center">
                                            <div className="text-yellow-800 font-bold text-xs sm:text-sm break-words">
                                                ⏰ HURRY! Price increases in {formatTime(timeLeft)}
                                            </div>
                                            <div className="text-yellow-700 text-xs mt-1 break-words">
                                                Don't miss this exclusive discount - Ends at {getOfferEndTime()} today!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3 text-sm sm:text-base">Why Choose Sampoorna Today:</h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-sm sm:text-base">
                                            <span className="w-2 h-2 bg-[#43c3ff] rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Final urgency push */}
                                <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg">
                                    <div className="text-center">
                                        <div className="text-red-600 font-bold text-sm sm:text-base lg:text-lg mb-2 break-words">
                                            ⚠️ WARNING: Price Increases at {getOfferEndTime()}!
                                        </div>
                                        <div className="text-red-700 text-xs sm:text-sm mb-1 break-words">
                                            Current price: ₹{product.price} | After {getOfferEndTime()}: ₹{product.originalPrice}
                                        </div>
                                        <div className="text-red-600 font-bold text-xs sm:text-sm mb-3 break-words">
                                            Only {formatTime(timeLeft)} left to save ₹2000!
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                                            <div className="bg-green-100 px-3 py-1 rounded-full text-green-700">
                                                ✅ 1000+ Happy Customers
                                            </div>
                                            <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-700">
                                                ⭐ 4.8/5 Rating
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
