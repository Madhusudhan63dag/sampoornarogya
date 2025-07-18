import Image from 'next/image';
import one from '@/assets/t_one.svg'
import two from '@/assets/t_two.svg'
import three from '@/assets/t_three.svg'
import four from '@/assets/t_four.jpeg'
import five from '@/assets/hala.jpeg'
import six from '@/assets/t_six.jpeg'
import seven from '@/assets/t_seven.jpeg'

export default function AwardsSection() {
  const awards = [
    {
      title: "GMP Certified",
      image: six,
      description: "Good Manufacturing Practice Certified"
    },
    {
      title: "ISO 9001:2015",
      image: three,
      description: "Quality Management System"
    },
    {
      title: "Made in India",
      image: one,
      description: "100% Natural Ingredients and Made in India"
    },
    {
      title: "No Side Effects",
      image: two,
      description: "You can trust us",
    },
    {
      title: "Ayush Certified",
      image: four,
      description: "Premium Quality Products",
      // customSize: true // Add this flag for FSSAI certificate
    },
    {
      title: "Cruelty Free",
      image: seven,
      description: "Not tested on animals"
    }
  ];

  // Double the awards array for seamless infinite scroll
  const slideContent = [...awards, ...awards];

  return (
    <div className="py-16 overflow-hidden">
      <h2 className="text-3xl md:text-5xl text-center mb-16 font-bold text-[#2A6177]">
        Awards & Certifications
      </h2>

      <div className="relative w-full">
        <div className="flex animate-slide">
          {slideContent.map((award, index) => (
            <div
              key={index}
              className="flex-none w-[300px] mx-4 text-center"
              style={{ animation: 'none' }}
            >
              <div className={`mx-auto mb-4 relative ${award.customSize ? 'w-20 h-16 mb-16' : 'w-24 h-24'}`}>
                <Image
                  src={award.image}
                  alt={`${award.title} - ${award.description}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
