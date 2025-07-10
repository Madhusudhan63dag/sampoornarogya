"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/elements/Navbar';
import { Button } from "@/components/ui/button"
import logo from '../just_logo.png'

import aboutBanner1 from '../../assets/test/1400x400.jpg';
import aboutBanner2 from '../../assets/test/1400x400_1.jpg';
import img1 from '../../assets/3.jpg';
import img2 from '../../assets/7.jpg';
import img3 from '../../assets/7.jpg';
import img4 from '../../assets/8.jpg';
import Footer from '@/components/elements/Footer';

export default function About() {
    const router = useRouter();
    const pathname = usePathname();
    const videoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [gradientPosition, setGradientPosition] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            setGradientPosition((prev) => (prev + 1) % 360);
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="w-full relative">
                {/* Hero Section */}
                <section className='relative w-full'>
                    {/* Banner Image */}
                    <div className="w-full h-full">
                        <Image
                            src={aboutBanner1}
                            alt="About Us Hero"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </section>

                {/* Product Information Section */}
                <div className="py-16 md:py-24 px-4 md:px-8 bg-[#f8f9fa]">
                    {/* Product 1 */}
                    <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                            <div className="w-full md:w-1/2">
                                <div className="relative h-[600px] md:h-[600px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={img1}
                                        alt="Sampoorn Arogya Syrup - Natural Digestive Health Solution"
                                        fill
                                        className=""
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-2xl md:text-4xl font-bold text-[#2A6177]">Sampoorn Arogya Syrup</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Our syrup is meticulously crafted to enhance digestion and promote overall gut health using ancient Ayurvedic formulas.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]">
                                        <a href="/product" className="w-full h-full inline-block">  Buy Now
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="max-w-7xl mx-auto mb-16 md:mb-24">
                        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
                            <div className="w-full md:w-1/2 space-y-4">
                                <h3 className="text-2xl md:text-4xl font-bold text-[#2A6177]">Sampoorn Arogya Tablets</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Convenient and powerful, our tablets provide a holistic solution for digestive balance, combining potent herbal ingredients.
                                </p>
                                <div className="flex gap-4 pt-4">
                                    <Button className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]">
                                        <a href="/product" className="w-full h-full inline-block"> Buy Now
                                        </a>
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="relative h-[600px] md:h-[600px] rounded-2xl overflow-hidden">
                                    <Image
                                        src={img2}
                                        alt="Sampoorn Arogya Tablets - Herbal Digestive Supplement"
                                        fill
                                        className="object"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Banner Section 2 */}
                <div className="relative w-full">
                    <div className="aspect-[16/9] md:aspect-[21/9] relative">
                        <Image
                            src={aboutBanner2}
                            alt="Partner with Us"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 z-10 flex items-center justify-end">
                            <div className="p-4 md:p-10 w-full md:w-1/2 text-white flex flex-col items-end justify-end text-end">
                                <h2 className="text-2xl md:text-4xl font-bold mb-4">Join Us on the Path to Wellness</h2>
                                <p className="text-sm md:text-lg mb-6">
                                    Let us guide you to holistic health through nature's wisdom.
                                </p>
                                <Button
                                    onClick={() => router.push('/contact')}
                                    className="bg-[rgb(76,238,84)] hover:bg-[#43c3ff]"
                                >
                                    Get in Touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>

    );
}
