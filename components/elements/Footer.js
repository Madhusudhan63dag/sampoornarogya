"use client"
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/app/just_logo.png';
import visa from '@/assets/visa.svg';
import mastercard from '@/assets/mastercard.svg';
import paypal from '@/assets/paypal.svg';
import discover from '@/assets/discover.svg';
import { FaFacebook, FaInstagram, FaYoutube, FaCreditCard, FaAmazonPay } from 'react-icons/fa';

export default function Footer() {
    const router = useRouter();

    return (
        <footer className="w-full bg-white px-4 md:px-8 lg:px-20 py-8 ">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap- lg:gap-8">
                    {/* Logo, Description and Social Icons */}
                    <div className="col-span-1 max-w-xs">
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src={logo}
                                alt="Logo"
                                className='w-12 md:w-16'
                                width={64}
                                height={64}
                                priority
                            />
                            <h3 className='text-xs md:text-sm font-semibold'>Sampoorn <br /> Arogya</h3>
                        </div>
                        <p className="text-gray-600 text-xs md:text-sm break-words mb-4">
                            Your trusted partner in natural digestive health solutions.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4 items-center">
                            <a
                                href="https://www.facebook.com/profile.php?id=61571764651288"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/sampoornarogya/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.youtube.com/@SampoornArogya"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="w-full">
                        <h4 className="text-base md:text-lg font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-1.5">
                            {["Home", "About", "Product", "Contact"].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase().replace(' ', '')}`)}
                                        className="text-sm text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full ">
                        <h4 className="text-base md:text-md font-semibold mb-3">Contact</h4>
                        <ul className="space-y-1">
                            <li className="text-xs md:text-xs text-gray-600 break-words">
                                Email: customercareproductcenter@gmail.com

                            </li>
                            <li className="text-xs md:text-sm font-mono text-gray-600">
                                Phone: +91 939 227 7389
                            </li>
                            <li className="text-xs md:text-sm text-gray-600">
                                Location: Begumpet, Hyderabad, Telangana 500016
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full">
                        <h4 className="text-base md:text-lg font-semibold mb-3">Legal</h4>
                        <ul className="space-y-1.5">
                            {[
                                ["Privacy Policy", "private"],
                                ["Terms of Service", "term"],
                                ["Shipping Policy", "shipping"],
                                ["Cancellation Policy", "cancel"],
                                ["Return Policy", "return"]
                            ].map(([label, path]) => (
                                <li key={path}>
                                    <button
                                        onClick={() => router.push(`/${path}`)}
                                        className="text-sm text-gray-600 hover:text-[#43c3ff] transition-colors duration-200"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Payment Methods Section */}
                <div className="border-t mt-6 md:mt-8 pt-4 md:pt-6">
                    <div className="text-center mb-4">
                        <h4 className="text-sm font-semibold text-gray-800 mb-3">We Accept</h4>
                        <div className="flex justify-center items-center gap-4 flex-wrap">
                            {/* Credit Card Icons */}
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <Image src={visa} alt="Visa" width={40} height={24} className="h-6 w-auto" />
                            </div>
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <Image src={mastercard} alt="Mastercard" width={40} height={24} className="h-6 w-auto" />
                            </div>
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <Image src={discover} alt="Discover" width={40} height={24} className="h-6 w-auto" />
                            </div>
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <Image src={paypal} alt="PayPal" width={40} height={24} className="h-6 w-auto" />
                            </div>
                            {/* Amazon Pay */}
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <FaAmazonPay className="w-10 h-6 text-[#FF9900]" />
                            </div>
                            {/* UPI */}
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow-sm border">
                                <span className="text-[#00BAF2] font-bold text-xs px-2">UPI</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t mt-6 md:mt-8 pt-4 md:pt-6">
                    <p className="text-center text-xs md:text-sm text-gray-600">
                        © {new Date().getFullYear()} Sampoorna Arogya. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}