"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div
      className="bg-blue-50 min-h-screen py-12 px-6 md:px-12 lg:px-24"
      id="about"
    >
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Stitching Store
      </motion.h1>

      {/* Introduction Section */}
      <div className="max-w-5xl mx-auto text-center mb-16 px-4">
        <motion.p
          className="text-sm md:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          At Stitching Store, we bring precision, passion, and perfection to
          every stitch. Our mission is to provide top-quality stitching services
          that cater to all your tailoring needs. Whether you seek custom
          designs, alterations, or embroidery, we ensure that every piece is
          crafted with the highest level of detail and craftsmanship.
        </motion.p>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          {
            name: "Men's Clothe's",
            role: "Catalog design & production",
            image: "/assets/team0.jpg",
          },
          {
            name: "Women's Clothe's",
            role: "Catalog design & production",
            image: "/assets/team1.jpg",
          },
          {
            name: "Kid's Clothe's",
            role: "Catalog design & production",
            image: "/assets/team2.jpg",
          },
        ].map((member, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={300}
              className="object-cover w-full h-64"
            />
            <div className="p-5 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {member.name}
              </h2>
              <p className="text-gray-600">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vision & Mission Section */}
      <div className="max-w-5xl mx-auto mt-20 text-center px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Vision & Mission
        </motion.h2>
        <motion.p
          className="text-sm md:text-xl text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our vision is to redefine tailoring by offering exquisite,
          high-quality stitching services tailored to perfection. We aim to
          provide a seamless experience that brings your dream outfits to life,
          ensuring elegance, comfort, and individuality in every stitch.
        </motion.p>
      </div>
    </div>
  );
};

export default About;
