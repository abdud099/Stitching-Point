"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const CategoriesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show dropdown immediately on hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Delay closing dropdown by 1 second
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 1000);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className="text-gray-700 text-sm py-1 flex items-center space-x-1 hover:text-black focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        CATALOGS
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <ul className="absolute left-0 mt-2 w-56 bg-white shadow-lg border border-gray-200 rounded-md z-20 text-sm">
          {[
            { href: "/mencatalog", label: "Men's Collection" },
            { href: "/femalecatalog", label: "Women's Collection" },
            { href: "/kidcatalog", label: "Kid's Collection" },
            { href: "/brandsproduction", label: "Brand's Collection" },
            { href: "/reviews", label: "Reviews" },
          ].map(({ href, label }) => (
            <li
              key={href}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <Link href={href} onClick={() => setIsOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesDropdown;
