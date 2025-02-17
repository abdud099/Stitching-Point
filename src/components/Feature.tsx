"use client";

import React from "react";
import { FaBaby, FaThumbsUp } from "react-icons/fa";
import { GrRestroomMen, GrRestroomWomen } from "react-icons/gr";
import Link from "next/link"; // Importing Link from Next.js

const features = [
  {
    icon: <GrRestroomMen size={35} className="text-[#8ab8bd]" />,
    title: "Men's Collection",
    link: "/mencatalog",
    description: "Explore expertly crafted men's designs for every occasion.",
  },
  {
    icon: <GrRestroomWomen size={35} className="text-[#8ab8bd]" />,
    title: "Women's Collection",
    link: "/femalecatalog",
    description:
      "Discover elegant and trendy women's fashion, tailored to perfection.",
  },
  {
    icon: <FaBaby size={35} className="text-[#8ab8bd]" />,
    title: "Kid's Collection",
    link: "/kidcatalog",
    description:
      "Adorable and comfortable clothing designed for the little ones.",
  },
  {
    icon: <FaThumbsUp size={30} className="text-[#8ab8bd]" />,
    title: "Reviews",
    link: "/reviews",
    description:
      "Customer insights on quality, fabric, and stitching excellence.",
  },
];

const Feature = () => {
  return (
    <section className="relative bg-amber-50 py-12 shadow-md border-t-4 border-dashed border-gray-200">
      {/* Section Header */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Stitching Store?
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-xl">
          Elevate your wardrobe with precision tailoring and unmatched
          craftsmanship.
        </p>
      </div>

      {/* Feature Content */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            {feature.icon}

            {/* Title Wrapped in Link for Navigation */}
            <Link href={feature.link} passHref>
              <h3 className="mt-4 text-lg font-semibold text-gray-800 hover:text-[#8ab8bd] transition-colors duration-300 cursor-pointer">
                {feature.title}
              </h3>
            </Link>

            {/* Feature Description */}
            <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;
