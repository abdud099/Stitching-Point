"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import CategoriesDropdown from "./CategoriesDropdown";
import SearchBar from "./SearchBar";

// Sample Data
const products = [
  { name: "Men's Collection", link: "/mencatalog" },
  { name: "Women's Collection", link: "/femalecatalog" },
  { name: "Kid's Collection", link: "/kidcatalog" },
  { name: "Brand's Collection", link: "/brandsproduction" },
];

const Navbar = () => {
  const [searchResults, setSearchResults] = useState<
    { name: string; link: string }[]
  >([]);
  const [, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Ensure search filters on product name
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  // Hide search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Black Bar */}
      <div className="bg-black text-white text-[10px] flex flex-col md:flex-row justify-center md:justify-between items-center px-4 py-2">
        <span className="md:self-start text-center md:text-left uppercase">
          WELCOME TO THE STITCHING STORE
        </span>
        <span className="hidden md:flex items-center uppercase">
          We provide premium stitching services with top-quality fabrics at the
          best prices in Pakistan 🇵🇰.
          <FaFacebook
            className="inline mx-2 cursor-pointer hover:text-blue-500"
            size={15}
          />
        </span>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* Logo */}
        <div className="hidden md:flex items-center cursor-pointer">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="titching store Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </Link>
          <p className="text-lg font-bold italic text-[#8ab8bd]">
            Stitching store
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center text-sm text-gray-700">
          <Link href="/" className="hover:text-black transition">
            HOME
          </Link>
          <CategoriesDropdown />
          <a href="#about" className="hover:text-black transition">
            ABOUT
          </a>
          {/* <Link href="/about" className="hover:text-black transition">
            ABOUT
          </Link> */}
          <Link href="/shop" className="hover:text-black transition">
            SHOP
          </Link>
          <Link href="/blog" className="hover:text-black transition">
            BLOG
          </Link>
          <Link href="/contact" className="hover:text-black transition">
            CONTACT
          </Link>
        </div>

        {/* Search & Icons */}
        <div className="flex items-center space-x-10" ref={searchRef}>
          <button onClick={() => setIsOpen(true)} className="md:hidden">
            <FiMenu size={25} />
          </button>
          <SearchBar onSearch={handleSearch} />
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              color="blue"
              size={20}
              className="cursor-pointer hover:text-blue-600"
            />
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden">
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-lg flex flex-col py-6 px-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              <FiX size={23} />
            </button>
            <div className="flex flex-col space-y-7 text-sm text-gray-800">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Protein Factory Logo"
                  width={40}
                  height={20}
                  className="object-contain"
                />{" "}
                <p className="text-sm font-bold text-[#8ab8bd]">SewingStore</p>
              </Link>
              <Link href="/" onClick={() => setIsOpen(false)}>
                HOME
              </Link>
              <CategoriesDropdown />
              <Link href="/about" onClick={() => setIsOpen(false)}>
                ABOUT
              </Link>
              <Link href="/shop" onClick={() => setIsOpen(false)}>
                SHOP
              </Link>
              <Link href="/blog" onClick={() => setIsOpen(false)}>
                BLOG
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                CONTACT
              </Link>

              <div>
                <a
                  href="mailto:wahajqamar125@gmail.com"
                  className="hover:text-orange-600 transition"
                >
                  wahajqamar125@gmail.com
                </a>

                <p className="text-sm text-gray-700">
                  Phone:{" "}
                  <a
                    href="tel:+92 123 456 7890"
                    className="hover:text-orange-600 transition"
                  >
                    ++92 123 456 7890
                  </a>
                </p>
                <div className="flex space-x-4 mb-6 text-gray-600 pt-16">
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
              </div>

              <span className="py-5 text-xs items-center">
                WE SELL UK IMPORTED SUPPLEMENTS AT THE BEST PRICES IN PAKISTAN
                🇵🇰
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-gray-100 px-6 py-4 relative">
          <h2 className="font-medium text-gray-700 mb-2">Search Results:</h2>
          <ul className="space-y-2">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="text-sm text-gray-600 hover:text-black cursor-pointer"
              >
                <Link href={result.link}>{result.name}</Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSearchResults([])}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
