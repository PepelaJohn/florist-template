'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

const images = [
  {
    image: '/images/1.jpeg',
    alt: 'Shop with next day delivery',
    description: 'Shop with next day delivery',
    tagline: 'Delivered by tomorrow'
  },
  {
    image: '/images/8.jpeg',
    alt: 'Perfect for any occasion',
    description: 'Perfect for any occasion',
    tagline: 'Elevate your style'
  }
  ,
  {
    image: '/images/6.jpeg',
    alt: 'Discover our collection',
    description: 'Discover our collection',
    tagline: 'Luxury flowers for every moment'
  }
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="w-full h-[60vh] md:h-[75vh] relative bg-gray-700">
        {/* Animated Slideshow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full relative"
        >
          <Image
            src={images[currentImageIndex].image}
            alt={images[currentImageIndex].alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-center"
        >
          <div className="max-w-2xl px-6  backdrop-blur-sm py-10 rounded-sm">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white text-4xl md:text-6xl font-light uppercase tracking-widest mb-6 drop-shadow-lg"
            >
              {images[currentImageIndex].description}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-white text-xl mb-8 italic font-light tracking-wide"
            >
              {images[currentImageIndex].tagline}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link href="/products" passHref>
                <Button size="lg" className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 rounded-full shadow-lg">
                  Explore Collection
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Slideshow Navigation Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  setCurrentImageIndex(index);
                  setIsVisible(true);
                }, 500);
              }}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      
    </div>
  );
}