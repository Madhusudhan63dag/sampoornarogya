import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';
import logo from '@/app/just_logo.png';
import LoadingScreen from './LoadingScreen';
import icon1 from '../../assets/icon1.png';
import icon2 from '../../assets/icon2.png';
import icon3 from '../../assets/icon3.png';
import icon4 from '../../assets/icon4.png';
import icon5 from '../../assets/icon5.webp'; 


const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            {isLoading && <LoadingScreen />}
            
            {/* Traditional Horizontal Navbar */}
            <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <a href="/" className="flex items-center">
                                <Image
                                    src={logo}
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="h-10 w-auto"
                                    priority
                                />
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-8">
                                <a
                                    href="/"
                                    className={`px-3 flex flex-col items-center py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                                >
                                    <Image src={icon1} alt="Home" className="w-8 inline-block mr-2" />
                                    Home
                                </a>
                                <a
                                    href="/product"
                                    className={`px-3 flex flex-col items-center py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                                >
                                    <Image src={icon4} alt="Products" className="w-8 inline-block mr-2" />
                                    Products
                                </a>
                                <a
                                    href="/about"
                                    className={`px-3 flex flex-col items-center py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                                >
                                    <Image src={icon3} alt="About" className="w-8 inline-block mr-2" />
                                    About
                                </a>
                                <a
                                    href="/blog"
                                    className={`px-3 flex flex-col items-center py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                                >
                                    <Image src={icon5} alt="Blog" className="w-8 inline-block mr-2" />
                                    Blog
                                </a>
                                <a
                                    href="/contact"
                                    className={`px-3 flex flex-col items-center py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                                >
                                    <Image src={icon2} alt="Contact" className="w-8 inline-block mr-2" />
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                            >
                                {isMobileMenuOpen ? (
                                    <HiX className="h-6 w-6" />
                                ) : (
                                    <HiMenu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                            <a
                                href="/"
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 `}
                            >
                                <Image src={icon1} alt="Home" className="w-8 inline-block mr-2" />
                                Home
                            </a>
                            <a
                                href="/product"
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 `}
                            >
                                <Image src={icon4} alt="Products" className="w-8 inline-block mr-2" />
                                Products
                            </a>
                            <a
                                href="/about"
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 `}
                            >
                                <Image src={icon3} alt="About" className="w-8 inline-block mr-2" />
                                About
                            </a>
                            <a
                                href="/blog"
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 `}
                            >
                                <Image src={icon5} alt="Blog" className="w-8 inline-block mr-2" />
                                Blog
                            </a>
                            <a
                                href="/contact"
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 `}
                            >
                                <Image src={icon2} alt="Contact" className="w-8 inline-block mr-2" />
                                Contact Us
                            </a>
                        </div>
                    </div>
                )}
            </nav>
            
            {/* Spacer to push content below fixed navbar */}
            <div className="h-16"></div>
        </>
    );
};

export default Navbar;