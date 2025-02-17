"use client";

import React, { useRef, useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [result, setResult] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "402cbe14-50a8-4a43-9f5e-a743f7d545cd");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("✅ Form Submitted Successfully!");

        // Delay form reset for better UX
        setTimeout(() => {
          formRef.current?.reset();
          setResult(""); // Clear message after reset
        }, 2000);
      } else {
        setResult(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setResult("❌ Error submitting the form.");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-[#fffaf8] min-h-screen py-12 px-6">
      {/* Title */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h1>

      {/* Contact Information */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          {
            icon: (
              <FaPhone className="text-[#8ab8bd] text-4xl mx-auto mb-4 hidden md:block" />
            ),
            title: "Phone",
            detail: "+92 123 456 7890",
          },
          {
            icon: (
              <FaEnvelope className="text-[#8ab8bd] text-4xl mx-auto mb-4 hidden md:block" />
            ),
            title: "Email",
            detail: "wahajqamar125@gmail.com",
          },
          {
            icon: (
              <FaMapMarkerAlt className="text-[#8ab8bd] text-4xl mx-auto mb-4 hidden md:block" />
            ),
            title: "Address",
            detail: "123 Main St, City, Country",
          },
        ].map((info, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-2 bg-white shadow-md rounded-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {info.icon}
            <h2 className="text-sm md:text-lg font-bold text-gray-800 mb-2">
              {info.title}
            </h2>
            <p className="text-xs md:text-sm text-gray-600">{info.detail}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-md p-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Send Us a Message
        </h2>
        <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
          {["Name", "Email", "Message"].map((label, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <label className="block text-gray-700 font-medium mb-1">
                {label}
              </label>
              {label === "Message" ? (
                <textarea
                  name={label.toLowerCase()}
                  placeholder={`Your ${label}`}
                  rows={5}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#8ab8bd]"
                  required
                ></textarea>
              ) : (
                <input
                  name={label.toLowerCase()}
                  type={label.toLowerCase() === "email" ? "email" : "text"}
                  placeholder={`Your ${label}`}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#8ab8bd]"
                  required
                />
              )}
            </motion.div>
          ))}
          <motion.button
            type="submit"
            className="w-full bg-[#8ab8bd] text-white py-2 rounded-md shadow-md hover:bg-[#7aa5a9] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">{result}</p>
      </motion.div>
    </div>
  );
};

export default ContactPage;
