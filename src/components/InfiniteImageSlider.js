"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function InfiniteImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  
  const images = [
    "/WhatsApp Image 2025-09-18 at 11.44.38 (1).jpeg",
    "/WhatsApp Image 2025-09-18 at 11.44.38.jpeg",
    "/WhatsApp Image 2025-09-18 at 11.44.54 (1).jpeg",
    "/WhatsApp Image 2025-09-18 at 11.44.54.jpeg",
    "/WhatsApp Image 2025-09-18 at 11.45.29 (1).jpeg",
    "/WhatsApp Image 2025-09-18 at 11.45.29 (2).jpeg",
    "/WhatsApp Image 2025-09-18 at 11.45.29.jpeg",
  ];

  // Functions to control slider
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculate which images to show (previous, current, next)
  const getVisibleImageIndexes = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    return { prevIndex, currentIndex, nextIndex };
  };

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const { prevIndex, nextIndex } = getVisibleImageIndexes();

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Facility</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Take a look inside our modern diagnostic center equipped with state-of-the-art medical technology
          </p>
        </div>

        <div 
          className="relative overflow-hidden rounded-xl shadow-xl mx-auto max-w-5xl" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main image carousel */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            {/* Previous image (for animation) */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
        
            >
              <Image
                src={images[prevIndex]}
                alt="Facility image"
                fill
                className=""
                
                priority
              />
            </div>

            {/* Current image */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-in-out transform"
              style={{ zIndex: 10 }}
            >
              <Image
                src={images[currentIndex]}
                alt="Facility image"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
                priority
              />
            </div>

            {/* Next image (for animation) */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: 0.2, zIndex: 0 }}
            >
              <Image
                src={images[nextIndex]}
                alt="Facility image"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
              />
            </div>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20"></div>

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30">
              <div className="text-white max-w-3xl mx-auto text-center">
                <p className="text-sm sm:text-base md:text-lg font-medium">
                  Modern facilities with the latest diagnostic equipment
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/50 focus:outline-none sm:left-4 sm:p-3"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/50 focus:outline-none sm:right-4 sm:p-3"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Progress indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all sm:h-2 ${
                  index === currentIndex
                    ? "w-6 bg-white sm:w-8"
                    : "w-3 bg-white/50 hover:bg-white/80 sm:w-4"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail navigation */}
        <div className="mt-4 flex justify-center gap-2 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all hover:opacity-100 sm:h-16 sm:w-24 md:h-20 md:w-28 ${
                index === currentIndex
                  ? "ring-2 ring-teal-500 ring-offset-2 opacity-100"
                  : "opacity-60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}