// InfiniteImageSlider.tsx - Replace the existing component with this one

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function WhychoseUS() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentSlide((prevSlide) => (prevSlide + 1) % 3),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentSlide]);

  const slides = [
    {
      id: 1,
      image: "https://www.fugro.com/_next/image?url=https%3A%2F%2Fd3rwfsce0vn25a.cloudfront.net%2Fimage%2F665520746864%2Fimage_lprfhmbjf57ubai0ctipeq483o%2F-Ro%3A5%2Cw%3A1440%2Ch%3A620%2Cn%3Adefault-B1440-FWEBP&w=3840&q=75",
      title: "Advanced Laboratory Testing",
      description: "Our state-of-the-art laboratory equipment ensures precise and reliable test results, helping you make informed health decisions."
    },
    {
      id: 2,
      image: "https://luciddiagnostics.com/wp-content/uploads/2023/07/banner-1.jpg",
      title: "Home Collection Services",
      description: "Convenience is key - our professional phlebotomists can collect samples right from your home or office at your preferred time."
    },
    {
      id: 3,
      image: "https://luciddiagnostics.com/wp-content/uploads/2023/07/banner-1.jpg",
      title: "Expert Medical Consultation",
      description: "Our healthcare professionals provide comprehensive guidance to help you understand your test results and next steps."
    }
  ];

  const benefits = [
    "Affordable, transparent prices",
    "We supply the Doctor's order",
    "Convenient, right in your community",
    "We come to your homes and offices",
    "No wait, walk in & out in 15 minutes",
    "Walk in for same day testing",
    "No appointment necessary",
    "Work-friendly hours including Saturdays",
    "Confidential and anonymous testing",
    "Most test results in only 24-48 hours",
    "The new hub of diagnostic excellence"
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose OneVertexx Laboratory
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Superior diagnostic services with a focus on your comfort, convenience and accuracy
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mx-auto max-w-4xl">

          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <CheckCircleIcon className="h-6 w-6 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
          
          
        </div>
      </div>
    </section>
  );
}