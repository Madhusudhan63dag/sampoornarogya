"use client";
import { Plus, Minus } from "lucide-react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Navbar from '../components/elements/Navbar'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../components/elements/LoadingScreen';
import ReviewSection from '../components/elements/ReviewSection';
import AwardsSection from '@/components/sections/AwardsSection';
import ComparisonTable from '@/components/sections/ComparisonTable';
import BlogSection from '@/components/sections/BlogSection';
import AmazonSection from '@/components/sections/AmazonSection';
import FloatingAmazonButton from '@/components/elements/FloatingAmazonButton';
import Footer from '@/components/elements/Footer';
import heroSmall from '../assets/test/1920x1281.webp';
import banner1 from '@/assets/5.jpg';
import banner2 from '@/assets/4.jpg';
import amazon from '../assets/amazon1.webp';

// PR links images
import card1 from '../assets/pr/1.webp';
import card2 from '../assets/pr/2.webp';
import card3 from '../assets/pr/3.webp';
import card4 from '../assets/pr/4.webp';
import card5 from '../assets/pr/5.webp';
import card6 from '../assets/pr/6.webp';
import card7 from '../assets/pr/7.webp';
import card8 from '../assets/pr/8.webp';
import card9 from '../assets/pr/9.webp';
import card10 from '../assets/pr/10.webp';
import card11 from '../assets/pr/11.webp';
import card12 from '../assets/pr/12.webp';
import card13 from '../assets/pr/13.webp';

import img1 from '@/assets/ing/download.jpeg';
import img2 from '@/assets/ing/download1.jpeg';
import img3 from '@/assets/ing/download2.jpeg';
import img5 from '@/assets/ing/download4.jpeg';
import img6 from '@/assets/ing/download5.jpeg';
import img7 from '@/assets/ing/download6.jpeg';
import img8 from '@/assets/ing/download7.jpeg';
import img9 from '@/assets/ing/download8.jpeg';




// Add this dynamic import
const DigestiveSystem = dynamic(() => import('../components/elements/DigestiveSystem'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen animate-pulse" />
  )
});

export default function Home() {
  const router = useRouter();
  const videoRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);
  const initialScrollPosition = useRef(null);
  const videoSectionReached = useRef(false);
  const fadeInUp = "transition-all duration-700 ease-out";
  const fadeInUpVisible = "translate-y-0 opacity-100";
  const fadeInUpHidden = "translate-y-10 opacity-0";
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gradientPosition, setGradientPosition] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const locomotiveScrollRef = useRef(null);

  const faqData = [
    {
      question: "What are the main benefits of Sampoorna Arogya?",
      answer: "Sampoorn Arogya provides comprehensive digestive health support through a blend of Ayurvedic herbs. It helps alleviate bloating, indigestion, and supports a healthy gut microbiome."
    },
    {
      question: "How should I take Sampoorna Arogya products?",
      answer: "Our syrup and tablets are best consumed before meals with lukewarm water. Detailed instructions are provided with each product, or you can consult your healthcare provider."
    },
    {
      question: "Are there any side effects?",
      answer: "Sampoorn Arogya is made from 100% natural ingredients and is generally safe for consumption."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most users notice initial improvements within the first week. Consistent use over 2-3 weeks enhances results, with significant benefits evident after one month."
    },
    {
      question: "Can Sampoorn Arogya be used for chronic digestive issues?",
      answer: "While our products support overall gut health, individuals with chronic conditions should consult a healthcare provider before use. Our supplements work best as part of a holistic health regimen."
    },
    {
      question: "What makes Sampoorn Arogya different from other digestive supplements?",
      answer: "Our products are rooted in Ayurvedic traditions, using time-tested herbs and natural ingredients. Unlike synthetic supplements, Sampoorn Arogya offers a gentle yet effective approach to digestive wellness."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition((prev) => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Function to check if all images are loaded
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll('img');
      const totalImages = images.length;
      let loadedImages = 0;

      function imageLoaded() {
        loadedImages++;
        if (loadedImages === totalImages) {
          setTimeout(() => setIsLoading(false), 1000); // Add a small delay for smoother transition
        }
      }

      images.forEach(img => {
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener('load', imageLoaded);
          img.addEventListener('error', imageLoaded); // Handle error cases
        }
      });
    };

    // Check images after the component mounts
    checkImagesLoaded();

    // Additional check after a timeout in case some resources are slow
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds maximum loading time

    return () => clearTimeout(timeoutId);
  }, []);

  // Add PR slider state
  const [currentPrSlide, setCurrentPrSlide] = useState(0);
  const prSliderRef = useRef(null);

  // PR data with professional links
  const prData = [
    {
      image: card1,
    },
    {
      image: card2,
    },
    {
      image: card3,
    },
    {
      image: card4,
    },
    {
      image: card5,
    },
    {
      image: card6,
    },
    {
      image: card7,
    },
    {
      image: card8,
    },
    {
      image: card9,
    },
    {
      image: card10,
    },
    {
      image: card11,
    },
    {
      image: card12,
    },
    {
      image: card13,
    }
  ];

  const ingredients = [
    {
        image: { src: img1 },
        title: "Amla",
        description: "A rich source of Vitamin C, known for boosting immunity, improving skin health, and reducing stress.",
        alt: "Amla fruit illustration"
    },
    {
        image: { src: img2 },
        title: "Chitrak",
        description: "An Ayurvedic herb that supports digestive health, aids detoxification, and boosts metabolism.",
        alt: "Chitrak root illustration"
    },
    {
        image: { src: img3 },
        title: "Nagarmotha",
        description: "An aromatic herb that enhances digestion, balances metabolism, and supports overall well-being.",
        alt: "Nagarmotha plant illustration"
    },
    {
        image: { src: img5 },
        title: "Harad",
        description: "A traditional digestive aid that cleanses the body, rejuvenates cells, and promotes longevity.",
        alt: "Harad fruit illustration"
    },
    {
        image: { src: img6 },
        title: "Giloy",
        description: "A versatile herb known for its anti-inflammatory, immunity-boosting, and detoxifying properties.",
        alt: "Giloy stem illustration"
    },
    {
        image: { src: img7 },
        title: "Nisoth",
        description: "A potent herb that supports digestive cleansing, reduces bloating, and promotes healthy metabolism.",
        alt: "Nisoth root illustration"
    },
    {
        image: { src: img8 },
        title: "Adrak",
        description: "A powerful spice with anti-inflammatory properties, known for aiding digestion and relieving nausea.",
        alt: "Ginger root illustration"
    },
    {
        image: { src: img9 },
        title: "Jeera",
        description: "A fragrant spice that aids in digestion, reduces acidity, and promotes overall gut health.",
        alt: "Cumin seed illustration"
    },
  ];

  const slideContent = [...prData, ...prData]

  // Auto-play PR slider
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentPrSlide((prev) => (prev + 1) % prData.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [prData.length]);

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <div className="relative overflow-x-hidden min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="w-full relative" data-scroll-container>
          <main className="w-full flex flex-col">

            {/* Hero Section */}
            <section className='relative w-full h-[50vh] md:h-screen pt-16'>
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-full">
                <picture className="w-full h-full block">
                  {/* Desktop image */}
                  <source
                    media="(min-width: 768px)"
                    srcSet={heroSmall.src}
                  />
                  {/* Mobile image */}
                  <source
                    media="(max-width: 767px)"
                    srcSet={heroSmall.src}
                  />
                  <Image
                    src={heroSmall}
                    alt="Sampoorna Arogya Hero Background"
                    fill
                    priority
                    sizes="(max-width: 767px) 480px, 1920px"
                    quality={85}
                    className="object-cover"
                  />
                </picture>
              </div>
            </section>

            {/* Awards Section - Make it responsive */}
            <div className="px-4 md:px-0">
              <AwardsSection />
            </div>

            <DigestiveSystem />

            {/* <div className='w-full p-4 md:p-6'>
              <div className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center ${fadeInUp}`}>
                <div className='w-full md:w-1/2'>
                  <Image src={banner1} alt="Sampoorn Arogya Syrup" className='w-full rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 space-y-4'>
                  <h1 className='text-2xl md:text-5xl font-bold'>Boost Your Digestion Naturally</h1>
                  <p className='text-sm md:text-lg'>Sampoorn Arogya provides holistic Ayurvedic remedies to support optimal digestion and enhance your overall well-being. Embrace the natural path to health with our specially crafted syrups and tablets.</p>
                  <Button className="bg-[#cf1cff] px-6 py-3 md:px-9 md:py-5 text-base md:text-xl w-full md:w-auto"><a href="/product"> Buy Now</a></Button>
                </div>
              </div>
            </div> */}

            <div className='w-full p-4 md:p-6'>
              <div className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center ${fadeInUp}`}>
                <div className='w-full md:w-1/2'>
                  <Image src={banner1} alt="Sampoorn Arogya Syrup" className='w-full rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 space-y-4'>
                  <h1 className='text-2xl md:text-5xl font-bold'>Boost Your Digestion Naturally</h1>
                  <p className='text-sm md:text-lg'>
                    Sampoorn Arogya provides holistic Ayurvedic remedies to support optimal digestion and enhance your overall well-being.
                    Embrace the natural path to health with our specially crafted syrups and tablets.
                  </p>
                  <Button className="bg-[#cf1cff] px-6 py-3 md:px-9 md:py-5 text-base md:text-xl w-full md:w-auto">
                    <a href="/product">Buy Now</a>
                  </Button>
              {/* Ingredients List */}
              <h1 className='text-xl md:text-2xl font-bold mt-10'>Key Ingredients</h1>
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {ingredients.slice(0, 8).map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <Image
                      src={item.image.src}
                      alt={item.alt}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2"
                    />
                    <span className="text-sm md:text-base font-medium">{item.title}</span>
                  </div>
                ))}
              </div>
                </div>
              </div>

            </div>


            {/* Professional PR Images Slider Section */}
            <section className="w-full">
              <div className="">
                <div className="relative w-full">
                  <div className="flex animate-slide">
                    {slideContent.map((award, index) => (
                      <div key={index} className="flex-none w-[300px] mx-4 text-center" style={{ animation: 'none' }}>
                        <div className={`mx-auto mb-4 relative ${award.customSize ? 'w-24 h-16 mb-16' : 'w-28 h-28'}`}>
                          <Image src={award.image} alt={`${award.title} - ${award.description}`} fill className="object-contain" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Add this before the FAQ section */}
            <div className="w-full">
              <ReviewSection />
            </div>

            {/* Blog Section */}
            <div>
              <BlogSection />
            </div>

            {/* Amazon Section */}
            <div>
              <AmazonSection amazon={amazon} />
            </div>

            {/* FAQ Section - Updated for mobile */}
            <div className="w-full bg-[#8de8f825] px-4 md:px-20 py-8 md:py-16 flex-none">
              <h1 className="text-3xl md:text-5xl text-center mb-8 md:mb-12">Frequently Asked Questions</h1>
              <div className="max-w-3xl mx-auto space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                    style={{
                      transform: `translateY(${openFaq === index ? '0' : '20px'})`,
                      opacity: openFaq === index ? 1 : 0.7,
                      transition: 'all 0.5s ease',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <button
                      className="w-full px-6 py-4 text-left flex items-center justify-between"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="text-lg font-medium text-[#2A6177]">{faq.question}</span>
                      {openFaq === index ? (
                        <Minus className="h-5 w-5 text-[#2A6177]" />
                      ) : (
                        <Plus className="h-5 w-5 text-[#2A6177]" />
                      )}
                    </button>
                    <div
                      className={`px-6 transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-40 py-4" : "max-h-0"
                        } overflow-hidden`}
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div>
              <Footer />
            </div>
          </main>
        </div>

        {/* Floating Amazon Button */}
        {/* <FloatingAmazonButton /> */}
      </div>
    </>
  )
}