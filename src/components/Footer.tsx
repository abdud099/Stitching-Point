"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-50 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:space-x-36">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            About Stitching Shore
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            At Stitching Store, we are dedicated to delivering premium-quality
            sewing tutorials, expert tips, and in-depth resources for all skill
            levels. Whether you&lsquo;re perfecting the art of hand stitching,
            designing custom apparel, or exploring intricate embroidery, our
            curated guides and professional insights will help you master the
            craft with precision and creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Quick Links</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {[
              { name: "Men's Collection", link: "/mencatalog" },
              { name: "Women's Collection", link: "/femalecatalog" },
              { name: "Kid's Collection", link: "/kidcatalog" },
              { name: "Brand's Collection", link: "/brandsproduction" },
              { name: "Reviews", link: "/reviews" },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="hover:text-orange-600 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">Follow Us</h2>
          <div className="flex space-x-4 mb-6">
            {[
              {
                icon: <FaFacebookF />,
                link: "https://facebook.com",
                color: "hover:text-blue-600",
              },
              {
                icon: <FaTwitter />,
                link: "https://twitter.com",
                color: "hover:text-blue-400",
              },
              {
                icon: <FaInstagram />,
                link: "https://instagram.com",
                color: "hover:text-pink-500",
              },
              {
                icon: <FaLinkedinIn />,
                link: "https://linkedin.com",
                color: "hover:text-blue-700",
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                target="_blank"
                aria-label="Social Media"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full transition ${item.color}`}
                >
                  {item.icon}
                </div>
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <h2 className="text-xl font-bold mb-4 text-gray-800">Contact</h2>
          <p className="text-sm text-gray-700">
            Email:
            <a
              href="mailto:wahajqamar125@gmail.com"
              className="hover:text-[#8ab8bd] transition"
            >
              wahajqamar125@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-700">
            Phone:
            <a
              href="tel:+92 123 456 7890"
              className="hover:text-[#8ab8bd] transition"
            >
              +92 123 456 7890
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm border-t border-gray-300 pt-4 text-gray-600">
        <p>
          &copy; {new Date().getFullYear()}
          <span> Stitching Store . All rights reserved.</span>
        </p>
        <p>
          <Link
            href="/privacypolicy"
            className="hover:text-[#8ab8bd] transition"
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            href="/termsofservice"
            className="hover:text-[#8ab8bd] transition"
          >
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
