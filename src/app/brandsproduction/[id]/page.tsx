/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getBrand } from "@/Services"; // Fetch API (Mock or Real)
import { FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";

interface BrandsListProps {
  brandsTitle: string;
  brandsImage?: { url: string };
  brandsPrice: string;
  id?: string;
}

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState<BrandsListProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("Navy/White Trim");
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchBrandList();
  }, [id]);

  const fetchBrandList = async () => {
    try {
      const result: any = await getBrand();
      if (
        result?.forBrandsProductions &&
        Array.isArray(result.forBrandsProductions)
      ) {
        const selectedProduct = result.forBrandsProductions.find(
          (item: BrandsListProps) =>
            item.id === id ||
            item.brandsTitle.replace(/\s+/g, "-").toLowerCase() === id
        );
        setProduct(selectedProduct || null);
      } else {
        console.error("Unexpected API structure:", result);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="relative w-full h-[500px] overflow-hidden group">
        <Image
          src={product.brandsImage?.url || "/placeholder.jpg"}
          alt={product.brandsTitle}
          width={500}
          height={700}
          unoptimized={true}
          className="w-full h-full rounded-lg shadow-md transform transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:origin-center"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-mono text-gray-600">
          {product.brandsTitle}
        </h1>
        <div className="flex items-center mt-2">
          <span className="text-yellow-500">⭐⭐⭐⭐✩</span>
          <p className="ml-2 text-gray-500">(reviews)</p>
        </div>
        <p className="text-2xl font-mono text-gray-700 mt-2">
          ${product.brandsPrice}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          or 4 interest-free payments of $
          {product.brandsPrice
            ? (parseFloat(product.brandsPrice) / 4).toFixed(2)
            : "N/A"}{" "}
          with Afterpay
        </p>

        {/* Size & Color Selection */}
        <div className="mt-6">
          <label className="block font-semibold">Size</label>
          <select className="border p-2 w-full mt-1 rounded">
            <option>Select Size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block font-semibold">Color</label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="border p-2 w-full mt-1 rounded"
          >
            <option>Navy/White Trim</option>
            <option>Red/White Trim</option>
            <option>Black</option>
          </select>
        </div>

        {/* Quantity Selector */}
        <div className="mt-4">
          <label className="block font-semibold">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 w-full mt-1 rounded"
            min="1"
          />
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 bg-pink-500 text-white w-full p-3 rounded-md font-bold hover:bg-pink-600">
          ADD TO CART
        </button>

        {/* Expandable Sections */}
        {["Details", "Shipping", "Size Guide"].map((section) => (
          <div key={section} className="mt-6 border-t border-gray-300">
            <button
              className="w-full flex justify-between items-center py-3 font-semibold text-gray-700"
              onClick={() => toggleSection(section)}
            >
              {section} <span>{expandedSection === section ? "−" : "+"}</span>
            </button>
            {expandedSection === section && (
              <div className="p-3 text-gray-600">
                {section === "Details" && (
                  <ul>
                    <li>✅ Shirred back with zipper</li>
                    <li>✅ Tiered Midi Length</li>
                    <li>✅ Adjustable fit with inner buttons</li>
                  </ul>
                )}
                {section === "Shipping" && (
                  <p>
                    📦 Free shipping on orders over $50. Standard delivery: 3-5
                    business days.
                  </p>
                )}
                {section === "Size Guide" && (
                  <p>📏 Use our size guide to find the perfect fit.</p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Social Media Share Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <FaFacebookF /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500">
            <FaTwitter /> Tweet
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            <FaPinterestP /> Pin It
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
