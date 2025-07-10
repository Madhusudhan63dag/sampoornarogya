"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../../components/elements/Navbar';
import Footer from '../../../components/elements/Footer';
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPostBySlug, getBlogPostById, relatedPosts } from '../../../lib/blogData';

export default function BlogPostClient({ params }) {
  const [isSharing, setIsSharing] = useState(false);

  // Get the specific blog post by slug or fallback to ID for compatibility
  const blogPost = getBlogPostBySlug(params.slug) || getBlogPostById(params.slug) || getBlogPostById(1);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back to Blog Button */}
      <div className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-[#2A6177] hover:text-[#cf1cff] transition-colors font-semibold">
              <ArrowLeft size={20} />
              Back to Blog
            </button>
          </Link>
        </div>
      </div>

      {/* Hero Section - Title Only */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {blogPost.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-white/90 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{blogPost.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{blogPost.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Image */}
          <div className="flex justify-center mb-8">
            <div className="relative" style={{ width: '500px', height: '500px' }}>
              <Image
                src={blogPost.image}
                alt={blogPost.title}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
          </div>
        </div>
      </article>

      {/* Social Share */}
      <div className="border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Share this article:</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook size={20} />
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <Twitter size={20} />
                Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Linkedin size={20} />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts
              .filter(post => post.id !== blogPost.id)
              .slice(0, 3)
              .map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-[#2A6177]/10 text-[#2A6177] text-sm font-medium rounded-full mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[#2A6177] hover:text-[#cf1cff] font-semibold transition-colors"
                    >
                      Read More
                      <ArrowLeft className="ml-2 rotate-180" size={16} />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
