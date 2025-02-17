"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Percy Berrospi",
    time: "1 day ago",
    review:
      "Deseamos compartir con ustedes el cuidado de tu salud cardiovascular",
    avatar: "/assets/avatar1.jpg",
  },
  {
    name: "Anshika Thakur",
    time: "1 day ago",
    review: "A must visit place if you are around and don’t miss the show",
    avatar: "/assets/avatar2.jpg",
  },
  {
    name: "Hii Suzumiya",
    time: "2 days ago",
    review: "Rip Sarah Lynn",
    avatar: "/assets/avatar3.jpg",
  },
  {
    name: "Yago",
    time: "2 days ago",
    review:
      "I went on a field trip it was beautiful one of my best experiences.",
    avatar: "/assets/avatar4.jpg",
  },
  {
    name: "Emma Mather",
    time: "3 days ago",
    review: "Beautiful views.",
    avatar: "/assets/avatar5.jpg",
  },
  {
    name: "Carter Curry",
    time: "3 days ago",
    review: "A stunning panoramic view of LA",
    avatar: "/assets/avatar6.jpg",
  },
  {
    name: "Jules Ghislain",
    time: "3 days ago",
    review: "I really like this product I bought it and I'm satisfied",
    avatar: "/assets/avatar7.jpg",
  },
  {
    name: "ERC CAR SERVICE",
    time: "3 days ago",
    review:
      "Griffith Park is a piece of heaven for Los Angeles. Thank you Mr. Griffith J.",
    avatar: "/assets/avatar8.jpg",
  },
  {
    name: "Percy Berrospi",
    time: "1 day ago",
    review:
      "Deseamos compartir con ustedes el cuidado de tu salud cardiovascular",
    avatar: "/assets/avatar1.jpg",
  },
  {
    name: "Anshika Thakur",
    time: "1 day ago",
    review: "A must visit place if you are around and don’t miss the show",
    avatar: "/assets/avatar2.jpg",
  },
  {
    name: "Hii Suzumiya",
    time: "2 days ago",
    review: "Rip Sarah Lynn",
    avatar: "/assets/avatar3.jpg",
  },
  {
    name: "Yago",
    time: "2 days ago",
    review:
      "I went on a field trip it was beautiful one of my best experiences.",
    avatar: "/assets/avatar4.jpg",
  },
];

const ReviewsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <motion.h1
        className="text-3xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Customer Reviews
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 relative flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-3">
              {review.avatar ? (
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {review.name[0]}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-sm text-gray-500">{review.time}</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4">{review.review}</p>

            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-red-500" size={16} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
