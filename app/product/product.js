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
    const router = useRouter();

    // Product details with multiple images
    const product = {
        name: "Sampoorna Digestive Health Supplement",
        price: 3990.00,
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
        // Store the selected quantity in localStorage so the checkout form can use it
        localStorage.setItem('selectedQuantity', quantity.toString());
        
        const formSection = document.getElementById('submit');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
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


    return (
        <div className="flex relative bg-white min-h-screen">
            {/* Main Content */}
            <div className="flex-1">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {/* Product Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Product Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden">
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={`${product.name} - View ${selectedImage + 1}`}
                                    className=""
                                />
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-[#43c3ff]' : ''
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
                            <div>
                                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="ml-2 text-gray-600">(125 reviews)</span>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <span className="text-3xl font-bold">₹{product.price}</span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6">
                                    {product.description}
                                </p>

                                {/* Quantity Selector */}
                                <div className="flex items-center mb-6">
                                    <span className="mr-4">Quantity:</span>
                                    <Button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 border rounded-l"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="px-4 py-2 border-t border-b">
                                        {quantity}
                                    </span>
                                    <Button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 border rounded-r"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Payment Options */}
                                <div className="space-y-3 mb-6">
                                    {/* Regular Add to Cart */}
                                    <Button
                                        onClick={handleAddToCart} className="w-full bg-[#FACC15] hover:bg-white text-[#42C056] py-10 rounded-lg text-lg flex items-center justify-center gap-2">
                                        <Image src={buy} alt="Buy Now" className="w-10 h-10" />
                                        Buy Now
                                    </Button>

                                    {/* Buy on Amazon Button */}
                                    <Button id="amazon" onClick={handleBuyOnAmazon} className="amazon w-full py-8 bg-white hover:bg-white text-black rounded-lg text-lg flex items-center justify-center gap-2 transform transition-all duration-300">
                                        <Image src={amazon} alt="Buy on Amazon" className="w-12" />
                                        Amazon
                                    </Button>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3">Key Features:</h3>
                                <ul className="grid grid-cols-2 gap-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="w-2 h-2 bg-[#43c3ff] rounded-full mr-2"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
