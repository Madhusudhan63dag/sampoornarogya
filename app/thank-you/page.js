"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/elements/Navbar';
import { CheckCircle, Package, Truck, Mail, Phone } from 'lucide-react';

function ThankYouContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        // Get order details from URL parameters
        const orderNumber = searchParams.get('orderNumber');
        const customerName = searchParams.get('customerName');
        const email = searchParams.get('email');
        const amount = searchParams.get('amount');
        const paymentMethod = searchParams.get('paymentMethod');
        const emailStatus = searchParams.get('emailStatus');

        if (orderNumber) {
            setOrderDetails({
                orderNumber,
                customerName,
                email,
                amount,
                paymentMethod,
                emailStatus
            });
        }
    }, [searchParams]);

    const handleContinueShopping = () => {
        router.push('/');
    };

    const handleTrackOrder = () => {
        // You can implement order tracking functionality here
        alert('Order tracking feature will be available soon!');
    };

    return (
        <div className="flex relative bg-white min-h-screen">
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>
            <div className="flex-1 ml-[0%] md:ml-[20%] flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    {/* Success Header */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 shadow-lg mb-8">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-20 h-20 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-green-600 mb-4">
                            Order Placed Successfully!
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Thank you for choosing Sampoorna Arogya. Your order has been received and is being processed.
                        </p>
                        
                        {orderDetails && (
                            <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                    <div>
                                        <p className="text-sm text-gray-500">Order Number</p>
                                        <p className="font-semibold text-gray-800">{orderDetails.orderNumber}</p>
                                    </div>
                                    {orderDetails.customerName && (
                                        <div>
                                            <p className="text-sm text-gray-500">Customer Name</p>
                                            <p className="font-semibold text-gray-800">{orderDetails.customerName}</p>
                                        </div>
                                    )}
                                    {orderDetails.email && (
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold text-gray-800">{orderDetails.email}</p>
                                        </div>
                                    )}
                                    {orderDetails.amount && (
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="font-semibold text-gray-800">{orderDetails.amount}</p>
                                        </div>
                                    )}
                                    {orderDetails.paymentMethod && (
                                        <div>
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-semibold text-gray-800">{orderDetails.paymentMethod}</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500">Order Date</p>
                                        <p className="font-semibold text-gray-800">{new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Email Status Notification */}
                        {orderDetails && orderDetails.emailStatus && (
                            <div className={`p-4 rounded-lg border ${
                                orderDetails.emailStatus === 'failed' 
                                    ? 'bg-yellow-50 border-yellow-200' 
                                    : 'bg-blue-50 border-blue-200'
                            } mb-6`}>
                                <p className={`text-sm ${
                                    orderDetails.emailStatus === 'failed' 
                                        ? 'text-yellow-700' 
                                        : 'text-blue-700'
                                }`}>
                                    {orderDetails.emailStatus === 'failed' 
                                        ? '⚠️ Email confirmation may be delayed. Please save your order number for reference.'
                                        : 'ℹ️ Email confirmation is being processed and will be sent shortly.'
                                    }
                                </p>
                            </div>
                        )}
                    </div>

                    {/* What's Next Section */}
                    <div className="bg-gray-50 rounded-xl p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">What Happens Next?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Package className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Order Processing</h3>
                                <p className="text-sm text-gray-600">
                                    We're preparing your order for shipment. You'll receive a confirmation email shortly.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Truck className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Shipping</h3>
                                <p className="text-sm text-gray-600">
                                    Your order will be shipped within 2-3 business days. Tracking details will be provided.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Delivery</h3>
                                <p className="text-sm text-gray-600">
                                    Enjoy your Sampoorna Arogya products and experience natural wellness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-blue-50 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h2>
                        <p className="text-gray-600 mb-4">
                            If you have any questions about your order, please don't hesitate to contact us:
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <span className="text-gray-700">israelitesshopping171@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-blue-600" />
                                <span className="text-gray-700">Contact Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={handleContinueShopping}
                            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                        >
                            Continue Shopping
                        </Button>
                        <Button
                            onClick={handleTrackOrder}
                            variant="outline"
                            className="border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold"
                        >
                            Track Your Order
                        </Button>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
                        <p className="mb-6">
                            Get the latest updates on health tips, new products, and exclusive offers from Sampoorna Arogya.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <Button className="bg-white text-green-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="flex relative bg-white min-h-screen">
            <div className='fixed left-0 top-0 w-1/5 h-screen bg-transparent z-[999]'>
                <Navbar />
            </div>
            <div className="flex-1 ml-[0%] md:ml-[20%] flex items-center justify-center">
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border border-green-200 shadow-lg">
                        <div className="flex justify-center mb-6">
                            <CheckCircle className="w-20 h-20 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-bold text-green-600 mb-4">
                            Loading Order Details...
                        </h1>
                        <p className="text-lg text-gray-600">
                            Please wait while we retrieve your order information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ThankYouContent />
        </Suspense>
    );
}
