"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Slides Array
const slides = [
  {
    image: "/assets/stitching1.jpg",
    title: "CUSTOM TAILORING",
    description:
      "Expertly crafted custom stitching services for all occasions. Perfect fit, premium quality.",
  },
  {
    image: "/assets/stitching2.jpg",
    title: "EMBROIDERY DESIGNS",
    description:
      "Beautiful handcrafted embroidery to enhance your outfits with elegance and style.",
  },
  {
    image: "/assets/stitching3.jpg",
    title: "FABRIC SELECTION",
    description:
      "Choose from a wide range of high-quality fabrics for your perfect outfit. Comfort meets style.",
  },
  {
    image: "/assets/stitching4.jpg",
    title: "ALTERATIONS & REPAIRS",
    description:
      "Professional tailoring services for alterations and repairs. Get the perfect fit every time.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to go to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality (pauses when hovered)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section
      className="relative shadow-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="hidden md:block absolute top-1/2 left-4 md:left-6 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-10"
      >
        <FaArrowLeft className="text-gray-700" size={20} />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:block absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full shadow-md hover:bg-gray-400 transition z-10"
      >
        <FaArrowRight className="text-gray-700" size={20} />
      </button>

      {/* Hero Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-12 lg:px-16 py-24">
        {/* Left Section - Dynamic Text with Animation */}
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slides[currentIndex].title}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
              className="text-2xl py-2 sm:text-3xl md:text-5xl font-extrabold text-[#8ab8bd]"
            >
              {slides[currentIndex].title}
            </motion.h1>

            <motion.p
              key={slides[currentIndex].description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-gray-700 text-xs md:text-base leading-relaxed"
            >
              {slides[currentIndex].description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right Section - Image with Animation */}
        <div className="md:w-1/2 flex justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentIndex].image}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-xs sm:max-w-md md:max-w-lg"
            >
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title}
                width={600}
                height={400}
                className="object-cover rounded-md shadow-lg"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Background Gradient for Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cyan-100 to-transparent z-[-1] hidden md:block"></div>

      {/* Dots Navigation (For All Screens) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-[#8ab8bd]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
