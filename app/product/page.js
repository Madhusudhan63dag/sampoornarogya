"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Changed from 'next/router'
import { Button } from "@/components/ui/button"
import Navbar from '@/components/elements/Navbar';
import product1 from '../../assets/1.jpg';
import { FiMinus, FiPlus } from 'react-icons/fi';
import visa from '../../assets/visa.svg';  // You'll need to add these images
import mastercard from '../../assets/mastercard.svg';
import rupay from '../../assets/upi-id.jpeg';
import razorpay from '../../assets/paypal.svg';
import logo from '../just_logo.png'
import Product from './product';
import AwardsSection from '@/components/sections/AwardsSection';


const PAYMENT_IMAGES = {
    visa: "../assets/visa.svg",
    mastercard: "../assets/mastercard.svg",
    rupay: "../assets/amex.svg",
    razorpay: "https://razorpay.com/assets/razorpay-glyph.svg",
    secure: "https://cdn-icons-png.flaticon.com/512/6195/6195702.png",
    pci: "https://cdn-icons-png.flaticon.com/512/6107/6107137.png",
    ssl: "https://cdn-icons-png.flaticon.com/512/7947/7947657.png"
};

const COUNTRY_CURRENCY_MAP = {
    'India': { currency: 'INR', symbol: '₹', rate: 1 },
    'United States': { currency: 'USD', symbol: '$', rate: 0.012 },
    'United Kingdom': { currency: 'GBP', symbol: '£', rate: 0.0097 },
    // ...add more countries as needed
};

const BACKEND_URL = 'https://razorpaybackend-wgbh.onrender.com'; // Your backend URL

export default function Checkout() {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'India',
        streetAddress: '',
        apartment: '',
        townCity: '',
        paymentMode: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState(COUNTRY_CURRENCY_MAP['India']);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [orderNumber, setOrderNumber] = useState(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    const product = {
        name: "Sampoorna Digestive Health Supplement",
        price: 3990.00,
        description: "A natural supplement for digestive health"
    };

    // Generate order number on component mount
    useEffect(() => {
        const generateOrderNumber = () => {
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 1000);
            return `ORD${timestamp}${random}`;
        };
        setOrderNumber(generateOrderNumber());
    }, []);

    useEffect(() => {
        // Calculate initial converted amount
        const baseAmount = product.price * quantity;
        const converted = (baseAmount * currentCurrency.rate).toFixed(2);
        setConvertedAmount(converted);
    }, [quantity, currentCurrency, product.price]);

    useEffect(() => {
        const loadRazorpay = async () => {
            try {
                if (window.Razorpay) {
                    setRazorpayLoaded(true);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;

                script.onload = () => {
                    setRazorpayLoaded(true);
                };

                script.onerror = () => {
                    console.error('Failed to load Razorpay');
                    setFormErrors(prev => ({
                        ...prev,
                        payment: 'Failed to load payment system. Please try again.'
                    }));
                };

                document.body.appendChild(script);
            } catch (error) {
                console.error('Razorpay loading error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    payment: 'Payment system initialization failed.'
                }));
            }
        };

        loadRazorpay();
    }, []);

    // Add this useEffect after the existing useEffects to initialize quantity from product selection
    useEffect(() => {
        // Check if quantity was selected from the product component
        const selectedQuantity = localStorage.getItem('selectedQuantity');
        if (selectedQuantity) {
            const parsedQuantity = parseInt(selectedQuantity, 10);
            if (parsedQuantity > 0) {
                setQuantity(parsedQuantity);
            }
            // Clear the stored quantity after using it
            localStorage.removeItem('selectedQuantity');
        }
    }, []);

    const handleQuantityChange = (action) => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for phone number
        if (name === 'phone') {
            // Remove any non-digit characters for validation
            const digitsOnly = value.replace(/\D/g, '');
            
            if (digitsOnly.length > 10) {
                setPhoneError('Phone number cannot exceed 10 digits');
                // Navigate to phone field
                setTimeout(() => {
                    const phoneField = document.querySelector('input[name="phone"]');
                    if (phoneField) {
                        phoneField.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        phoneField.focus();
                    }
                }, 100);
            } else {
                setPhoneError('');
            }
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'country') {
            setCurrentCurrency(COUNTRY_CURRENCY_MAP[value]);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.phone) {
            errors.phone = 'Phone is required';
        } else {
            const digitsOnly = formData.phone.replace(/\D/g, '');
            if (digitsOnly.length > 10) {
                errors.phone = 'Phone number cannot exceed 10 digits';
                setPhoneError('Phone number cannot exceed 10 digits');
                // Navigate to phone field
                setTimeout(() => {
                    const phoneField = document.querySelector('input[name="phone"]');
                    if (phoneField) {
                        phoneField.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                        phoneField.focus();
                    }
                }, 100);
            } else if (digitsOnly.length < 10) {
                errors.phone = 'Phone number must be 10 digits';
            }
        }
        if (!formData.streetAddress) errors.streetAddress = 'Address is required';
        if (!formData.townCity) errors.townCity = 'City is required';
        if (!formData.paymentMode) errors.paymentMode = 'Please select a payment method';
        return errors;
    };

    const handleRazorpayPayment = async () => {
        if (!razorpayLoaded) {
            setFormErrors(prev => ({
                ...prev,
                payment: 'Payment system is still loading. Please try again.'
            }));
            setIsSubmitting(false);
            return;
        }

        if (!orderNumber) {
            setFormErrors(prev => ({
                ...prev,
                payment: 'Order number generation failed. Please refresh and try again.'
            }));
            setIsSubmitting(false);
            return;
        }

        try {
            // Step 1: Create Razorpay order via backend
            const orderResponse = await fetch(`${BACKEND_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: convertedAmount,
                    currency: currentCurrency.currency,
                    receipt: orderNumber,
                    notes: {
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        productName: product.name,
                        quantity: quantity
                    }
                })
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const orderData = await orderResponse.json();
            
            const options = {
                key: orderData.key,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                name: 'Sampoorna Arogya',
                description: `Order for ${product.name}`,
                order_id: orderData.order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone
                },
                handler: async function (response) {
                    console.log('Razorpay payment successful:', response);
                    
                    try {
                        // Step 2: Verify payment via backend
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
                            // Step 3: Send order confirmation email
                            const orderDetails = {
                                orderNumber: orderNumber,
                                productName: product.name,
                                quantity: quantity,
                                totalAmount: convertedAmount,
                                currency: currentCurrency.symbol,
                                paymentMethod: "Online Payment (Razorpay)",
                                paymentId: response.razorpay_payment_id
                            };

                            const customerDetails = {
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: formData.email,
                                phone: formData.phone,
                                address: formData.streetAddress,
                                apartment: formData.apartment,
                                city: formData.townCity,
                                country: formData.country
                            };

                            // Send confirmation email
                            await fetch(`${BACKEND_URL}/send-order-confirmation`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    customerEmail: formData.email,
                                    orderDetails: orderDetails,
                                    customerDetails: customerDetails
                                })
                            });

                            // Navigate to thank you page
                            const params = new URLSearchParams({
                                orderNumber: orderNumber,
                                customerName: `${formData.firstName} ${formData.lastName}`,
                                email: formData.email,
                                amount: `${currentCurrency.symbol} ${convertedAmount}`,
                                paymentMethod: "Online Payment (Razorpay)",
                                paymentId: response.razorpay_payment_id
                            });
                            console.log('Navigating to thank you page with params:', params.toString());
                            router.push(`/thank-you?${params.toString()}`);
                        } else {
                            throw new Error('Payment verification failed');
                        }
                        
                    } catch (error) {
                        console.error("Order processing error:", error);
                        setFormErrors(prev => ({
                            ...prev,
                            payment: 'Payment successful but order processing failed. Please contact support.'
                        }));
                        setIsSubmitting(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        console.log('Razorpay modal dismissed');
                        setIsSubmitting(false);
                    }
                },
                theme: {
                    color: '#43c3ff'
                }
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
            
        } catch (error) {
            console.error('Payment initialization error:', error);
            setFormErrors(prev => ({
                ...prev,
                payment: 'Failed to initialize payment. Please try again.'
            }));
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            setFormErrors({});

            if (!orderNumber) {
                setFormErrors(prev => ({
                    ...prev,
                    submit: 'Order number generation failed. Please refresh and try again.'
                }));
                setIsSubmitting(false);
                return;
            }

            try {
                if (formData.paymentMode === 'online') {
                    await handleRazorpayPayment();
                } else if (formData.paymentMode === 'cod') {
                    // Handle COD order
                    const orderDetails = {
                        orderNumber: orderNumber,
                        productName: product.name,
                        quantity: quantity,
                        totalAmount: convertedAmount,
                        currency: currentCurrency.symbol,
                        paymentMethod: "Cash on Delivery"
                    };

                    const customerDetails = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        address: formData.streetAddress,
                        apartment: formData.apartment,
                        city: formData.townCity,
                        country: formData.country
                    };

                    try {
                        // Send COD order confirmation email
                        const emailResponse = await fetch(`${BACKEND_URL}/send-order-confirmation`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                customerEmail: formData.email,
                                orderDetails: orderDetails,
                                customerDetails: customerDetails
                            })
                        });

                        const emailResult = await emailResponse.json();
                        console.log('COD email result:', emailResult);

                    } catch (emailError) {
                        console.error('Email sending failed:', emailError);
                        // Continue with navigation even if email fails
                    }
                    
                    // Navigate to thank you page for COD
                    const params = new URLSearchParams({
                        orderNumber: orderNumber,
                        customerName: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        amount: `${currentCurrency.symbol} ${convertedAmount}`,
                        paymentMethod: "Cash on Delivery"
                    });
                    console.log('Navigating to thank you page with COD params:', params.toString());
                    router.push(`/thank-you?${params.toString()}`);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setFormErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Failed to process order. Please try again.'
                }));
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="relative bg-white min-h-screen overflow-hidden">
            <Navbar />
            <div className="w-full overflow-auto">

                <div className=" px-4">
                    <div className=" w-full">
                        {/* Product Summary */}
                        <Product />
                        <AwardsSection />
                        {/* Checkout Form */}
                        <form id="submit" onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.lastName && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {formErrors.email && (
                                        <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone * (10 digits only)
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter 10-digit phone number"
                                        className={`w-full px-3 py-2 border rounded-lg transition-all duration-300 ${
                                            formErrors.phone || phoneError 
                                                ? 'border-red-500 bg-red-50 text-red-700' 
                                                : formData.phone && formData.phone.replace(/\D/g, '').length > 10
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-300'
                                        }`}
                                        style={{
                                            boxShadow: (formErrors.phone || phoneError || (formData.phone && formData.phone.replace(/\D/g, '').length > 10))
                                                ? '0 0 0 3px rgba(239, 68, 68, 0.1)' 
                                                : 'none'
                                        }}
                                    />
                                    {(formErrors.phone || phoneError) && (
                                        <div className="mt-1">
                                            <p className="text-red-500 text-xs font-medium animate-pulse">
                                                {formErrors.phone || phoneError}
                                            </p>
                                            {(phoneError || (formErrors.phone && formErrors.phone.includes('exceed'))) && (
                                                <p className="text-red-400 text-xs mt-1">
                                                    Current length: {formData.phone.replace(/\D/g, '').length} digits
                                                </p>
                                            )}
                                        </div>
                                    )}
                                    {formData.phone && !formErrors.phone && !phoneError && formData.phone.replace(/\D/g, '').length === 10 && (
                                        <p className="text-green-500 text-xs mt-1">✓ Valid phone number</p>
                                    )}
                                </div>
                            </div>

                            {/* Address Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Country *
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    {Object.keys(COUNTRY_CURRENCY_MAP).map(country => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg ${formErrors.streetAddress ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.streetAddress && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.streetAddress}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Apartment, suite, etc. (optional)
                                </label>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Town/City *
                                </label>
                                <input
                                    type="text"
                                    name="townCity"
                                    value={formData.townCity}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg ${formErrors.townCity ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {formErrors.townCity && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.townCity}</p>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Payment Method *
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                                            ${formData.paymentMode === 'cod'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-green-200'}`}
                                        onClick={() => handleInputChange({ target: { name: 'paymentMode', value: 'cod' } })}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="cod"
                                            checked={formData.paymentMode === 'cod'}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                                        />
                                        <label className="ml-3 flex flex-col cursor-pointer">
                                            <span className="text-sm font-medium text-gray-900">Cash on Delivery</span>
                                            <span className="text-xs text-gray-500">Pay when you receive</span>
                                        </label>
                                    </div>

                                    <div
                                        className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer
                                            ${formData.paymentMode === 'online'
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-green-200'}`}
                                        onClick={() => handleInputChange({ target: { name: 'paymentMode', value: 'online' } })}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMode"
                                            value="online"
                                            checked={formData.paymentMode === 'online'}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-green-500 border-gray-300 focus:ring-green-500"
                                        />
                                        <label className="ml-3 flex flex-col cursor-pointer">
                                            <span className="text-sm font-medium text-gray-900">Online Payment</span>
                                            <span className="text-xs text-gray-500">Credit/Debit Card, UPI, etc.</span>
                                        </label>
                                    </div>
                                </div>
                                {formErrors.paymentMode && (
                                    <p className="text-red-500 text-xs mt-1">{formErrors.paymentMode}</p>
                                )}
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="border-t pt-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Secure Payment Partners</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <Image
                                            src={visa}
                                            alt="Visa"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = { visa };
                                            }}
                                        />
                                        <Image
                                            src={mastercard}
                                            alt="Mastercard"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=Mastercard";
                                            }}
                                        />
                                        <Image
                                            src={rupay}
                                            alt="RuPay"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=RuPay";
                                            }}
                                        />
                                        <Image
                                            src={razorpay}
                                            alt="Razorpay"
                                            className="h-8 object-contain"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://via.placeholder.com/80x32?text=Razorpay";
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-center space-x-2 bg-gray-50 p-3 rounded-lg">
                                            <img src={PAYMENT_IMAGES.secure} alt="Secure" className="h-5 w-5" />
                                            <span className="text-sm text-gray-600">100% Secure Payments</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                                <img src={PAYMENT_IMAGES.ssl} alt="SSL" className="h-4 w-4" />
                                                <span className="text-xs text-gray-500">SSL Encrypted</span>
                                            </div>
                                            <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                                <img src={PAYMENT_IMAGES.pci} alt="PCI" className="h-4 w-4" />
                                                <span className="text-xs text-gray-500">PCI DSS Compliant</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Total and Submit Button */}
                            <div className="pt-4 border-t border-gray-200">
                                {/* Add Quantity Selector before total */}
                                <div className="mb-4 p-4 bg-white rounded-lg border">
                                    <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-medium">{product.name}</span>
                                        <span className="font-medium">₹{product.price}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Quantity:</span>
                                        <div className="flex items-center">
                                            <Button
                                                type="button"
                                                onClick={() => handleQuantityChange('decrease')}
                                                className="p-2 border rounded-l hover:bg-gray-100"
                                                disabled={quantity <= 1}
                                            >
                                                <FiMinus className="w-4 h-4" />
                                            </Button>
                                            <span className="px-4 py-2 border-t border-b bg-gray-50 min-w-[60px] text-center font-medium">
                                                {quantity}
                                            </span>
                                            <Button
                                                type="button"
                                                onClick={() => handleQuantityChange('increase')}
                                                className="p-2 border rounded-r hover:bg-gray-100"
                                            >
                                                <FiPlus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Display submission errors */}
                                {formErrors.submit && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{formErrors.submit}</p>
                                    </div>
                                )}
                                
                                {/* Display payment errors */}
                                {formErrors.payment && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-red-600 text-sm">{formErrors.payment}</p>
                                    </div>
                                )}

                                {/* Display phone validation warning */}
                                {phoneError && (
                                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-center">
                                            <span className="text-red-500 mr-2">⚠️</span>
                                            <p className="text-red-600 text-sm font-medium">{phoneError}</p>
                                        </div>
                                        <p className="text-red-500 text-xs mt-1">Please correct your phone number to continue</p>
                                    </div>
                                )}

                                <div className="flex justify-between mb-4 text-lg font-bold border-t pt-4">
                                    <span>Total ({quantity} item{quantity > 1 ? 's' : ''}):</span>
                                    <span>
                                        {currentCurrency.symbol}{(product.price * quantity * currentCurrency.rate).toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    className={`w-full py-3 rounded-lg transition-all duration-300 ${
                                        isSubmitting || phoneError
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-[#43c3ff] hover:bg-[#43c3ff]/90'
                                    } text-white`}
                                    disabled={isSubmitting || phoneError || (formData.phone && formData.phone.replace(/\D/g, '').length > 10)}
                                >
                                    {isSubmitting ? 'Processing...' : 
                                     phoneError ? 'Fix Phone Number to Continue' : 
                                     `Place Order - ${currentCurrency.symbol}${(product.price * quantity * currentCurrency.rate).toFixed(2)}`}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

