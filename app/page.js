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
import AmazonSection from '@/components/sections/AmazonSection';
import FloatingAmazonButton from '@/components/elements/FloatingAmazonButton';
import Footer from '@/components/elements/Footer';
import logo from './just_logo.png'
import heroSmall from '../assets/test/1920x1281.jpg';
import Slider from '../components/elements/Slider';
import banner1 from '@/assets/5.jpg';
import banner2 from '@/assets/4.jpg';
import amazon from '../assets/amazon1.webp';

// PR links images
import card1 from '../assets/pr/card1.webp';
import card2 from '../assets/pr/card2.webp';
import card3 from '../assets/pr/card3.webp';
import card4 from '../assets/pr/card4.webp';
import card5 from '../assets/pr/card5.webp';
import card6 from '../assets/pr/card6.webp';
import card7 from '../assets/pr/card7.webp';




// Add this dynamic import
const DigestiveSystem = dynamic(() => import('../components/elements/DigestiveSystem'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-screen rounded-b-[70px] bg-gradient-to-r from-[#988967] via-[#F7E9CC] to-[#AB9C7A] animate-pulse" />
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
      title: "Dailyhunt",
    },
    {
      image: card2,
      title: "Republic NewsIndia",
    },
    {
      image: card3,
      title: "Flipboard",
    },
    {
      image: card4,
      title: "The Indian Bulletin",
    },
    {
      image: card5,
      title: "RD Times.in",
    },
    {
      image: card6,
      title: "Abhyuday Times",
    },
    {
      image: card7,
      title: "Indian Sentinel",
    }
  ];

  // Auto-play PR slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrSlide((prev) => (prev + 1) % prData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [prData.length]);

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

            {/* Video Section - Simplified without effects */}
            <div className='w-full bg-black'>
              <iframe
                // ref={videoRef}
                src="https://www.youtube.com/embed/xSMxe1Igfv4?mute=0&controls=1&rel=0"
                title="Sampoorn Arogya Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='w-full h-[50vh] md:h-[80vh]'
              />
            </div>

            <DigestiveSystem />

            {/* Swiper Section - Updated to fix overlapping */}
            <Slider />
            
            <div className='w-full p-4 md:p-6'>
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center ${fadeInUp}`}
                // style={{
                //   transform: productInView ? 'translateY(0)' : 'translateY(50px)',
                //   opacity: productInView ? 1 : 0,
                //   transitionDelay: '200ms'
                // }}
              >
                <div className='w-full md:w-1/2'>
                  <Image src={banner1} alt="Sampoorn Arogya Syrup" className='w-full rounded-lg' />
                </div>
                <div className='w-full md:w-1/2 space-y-4'>
                  <h1 className='text-2xl md:text-5xl font-bold'>Boost Your Digestion Naturally</h1>
                  <p className='text-sm md:text-lg'>Sampoorn Arogya provides holistic Ayurvedic remedies to support optimal digestion and enhance your overall well-being. Embrace the natural path to health with our specially crafted syrups and tablets.</p>
                  <Button className="bg-[#cf1cff] px-6 py-3 md:px-9 md:py-5 text-base md:text-xl w-full md:w-auto"><a href="/product"> Buy Now</a></Button>
                </div>
              </div>
              <div
                className={`flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center mt-10 ${fadeInUp}`}
              >
                <div className='w-full md:w-1/2'>
                  <h1 className='text-3xl md:text-5xl font-bold'>Ayurvedic Wellness for All</h1>
                  <p className="text-sm md:text-lg">
                    Sampoorn Arogya delivers a comprehensive Ayurvedic approach to promote healthy digestion and support gut wellness. Our carefully crafted syrups and tablets, featuring potent ingredients like Triphala, Jeera, and Ajwain, offer natural relief from digestive discomforts such as bloating, indigestion, and constipation. These formulations not only aid in detoxifying the body and improving metabolism but also boost your immunity, ensuring overall health and vitality. Trust Sampoorn Arogya for a gentle, effective, and holistic solution to your digestive needs.
                  </p>
                  <Button className="bg-[#cf1cff] px-9 py-5 text-xl"><a href="/product"> Buy Now</a></Button>
                </div>
                <div className='w-full md:w-1/2'>
                  <Image src={banner2} alt="Sampoorn Arogya Tablets" className='w-full' />
                </div>
              </div>
            </div>

            {/* Professional PR Images Slider Section */}
            <section className="w-full bg-gradient-to-br from-slate-50 to-blue-50 ">
              <div className="">
                {/* Main PR Slider */}
                <div className="relative mb-4">
                  <div className="overflow-hidden">
                    <div 
                      ref={prSliderRef}
                      className="flex transition-transform duration-700 ease-in-out"
                      style={{ transform: `translateX(-${currentPrSlide * 100}%)` }}
                    >
                      {prData.map((item, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                          <div className="relative bg-white">
                            <div className="flex flex-col md:flex-row h-full">
                              {/* Image Section */}
                              <div className="w-full md:w-3/5 relative">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-contain"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                              </div>
                              
                              {/* Content Section */}
                              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                  {item.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
              </div>
            </section>

            {/* Add this before the FAQ section */}
            <div className="w-full">
              <ReviewSection />
            </div>


            <ComparisonTable />

            {/* Amazon Section */}
            <AmazonSection amazon={amazon} />

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
            <Footer />
          </main>
        </div>

        {/* Floating Amazon Button */}
        <FloatingAmazonButton />
      </div>
    </>
  )
}