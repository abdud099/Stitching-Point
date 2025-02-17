"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Men's Collection",
    description: "Explore Now »",
    image: "/assets/team0.jpg",
    link: "/mencatalog",
  },
  {
    title: "Women's Collection",
    description: "Explore Now »",
    image: "/assets/team1.jpg",
    link: "/femalecatalog",
  },
  {
    title: "Kid's Collection",
    description: "Explore Now »",
    image: "/assets/team2.jpg",
    link: "/kidcatalog",
  },
  {
    title: "Brand's Collection",
    description: "Discover More »",
    image: "/assets/team3.jpg",
    link: "/brandsproduction",
  },
];

const Categories = () => {
  return (
    <div className="bg-[#fffaf8] min-h-screen py-12 px-6">
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Stitching Store Collections
      </motion.h1>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
        <motion.p
          className="text-sm md:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Experience the art of fine craftsmanship. Our collections blend
          premium fabrics with exceptional tailoring to bring you the best in
          style and comfort.
        </motion.p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Image
              src={article.image}
              alt={article.title}
              width={400}
              height={250}
              className="object-cover w-full h-52"
            />
            <div className="p-5 text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <Link href={article.link} passHref>
                <span className="text-sm text-[#8ab8bd] font-medium cursor-pointer hover:underline">
                  {article.description}
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
