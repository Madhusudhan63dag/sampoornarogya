import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/elements/Navbar';
import Footer from '@/components/elements/Footer';

export default function Sitemap() {
  const pages = [
    {
      title: 'Main Pages',
      links: [
        { url: '/', title: 'Home', description: 'Homepage featuring Ayurvedic digestive health solutions' },
        { url: '/about', title: 'About Us', description: 'Learn about Sampoorna Arogya and our mission' },
        { url: '/product', title: 'Products', description: 'Our complete range of Ayurvedic digestive health products' },
        { url: '/sampurna', title: 'Sampurna', description: 'Information about our flagship product' },
        { url: '/contact', title: 'Contact', description: 'Get in touch with our team' }
      ]
    },
    {
      title: 'Blog & Resources',
      links: [
        { url: '/blog', title: 'Health Blog', description: 'Articles on Ayurvedic wisdom and digestive health' },
        { url: '/blog/Ayurvedic-Herbs-Digestion-Immunity', title: 'Top Ayurvedic Herbs for Digestion and Immunity', description: 'Comprehensive guide to Ayurvedic herbs for digestive and immune health' },
        { url: '/blog/Digestive-health-detoxification', title: 'Ayurvedic Guide to Better Digestive Health & Detoxification', description: 'Learn about Ayurvedic approaches to digestive wellness and detox' }
      ]
    },
    {
      title: 'Legal & Policies',
      links: [
        { url: '/private', title: 'Privacy Policy', description: 'How we handle and protect your personal information' },
        { url: '/term', title: 'Terms of Service', description: 'Terms and conditions for using our website and services' },
        { url: '/shipping', title: 'Shipping Policy', description: 'Information about shipping methods and delivery' },
        { url: '/cancel', title: 'Cancellation Policy', description: 'Guidelines for order cancellations' },
        { url: '/return', title: 'Return Policy', description: 'Return and refund policy information' }
      ]
    },
    {
      title: 'Support Pages',
      links: [
        { url: '/thank-you', title: 'Thank You', description: 'Order confirmation and thank you page' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Site Map
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate through all pages and sections of Sampoorna Arogya website
            </p>
          </div>

          {/* Page Sections */}
          <div className="space-y-12">
            {pages.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#2A6177] mb-6">
                  {section.title}
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.links.map((page, pageIndex) => (
                    <div 
                      key={pageIndex} 
                      className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex flex-col h-full">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#2A6177] transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">
                          {page.description}
                        </p>
                        <Link href={page.url}>
                          <Button 
                            variant="outline" 
                            className="w-full border-[#2A6177] text-[#2A6177] hover:bg-[#2A6177] hover:text-white"
                          >
                            Visit Page
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-12 bg-[#8de8f825] rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-[#2A6177] mb-4">
              Need Help Finding Something?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our team is here to help you navigate our website and find the information you need.
            </p>
            <Link href="/contact">
              <Button className="bg-[#43c3ff] hover:bg-[#43c3ff]/90 text-white px-8 py-3">
                Contact Support
              </Button>
            </Link>
          </div>

          {/* SEO Information */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Last updated: January 8, 2025 | 
              <Link href="/sitemap.xml" className="text-[#2A6177] hover:underline ml-2">
                XML Sitemap
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
