"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '../../lib/blogData';

const Blog = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest From Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2A6177] to-[#cf1cff]">
              Health Blog
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert insights, Ayurvedic wisdom, and practical tips for optimal digestive health and wellness
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#2A6177] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                  hoveredPost === post.id ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2A6177] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm md:text-base">
                  {post.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#2A6177] to-[#cf1cff] rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {post.author.split(' ').map(name => name[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-xs md:text-sm">{post.author}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs md:text-sm">{post.date}</div>
                    <div className="text-[#2A6177] font-medium text-xs md:text-sm">{post.readTime}</div>
                  </div>
                </div>

                {/* Read More Button */}
                <Link href={`/blog/${post.slug}`}>
                  <button className="w-full bg-gradient-to-r from-[#2A6177] to-[#cf1cff] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                    Read More
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <button className="bg-white border-2 border-[#2A6177] text-[#2A6177] font-bold py-3 px-8 rounded-lg hover:bg-[#2A6177] hover:text-white transition-all shadow-lg transform hover:scale-105">
              View All Blog Posts
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
