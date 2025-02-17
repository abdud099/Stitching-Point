/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getShop } from "@/Services";

interface ShopListProps {
  shopTitle: string;
  shopDescription: string;
  shopImage?: { url: string };
  shopPrice: string;
  shopDiscountPrice: string;
  shopPercentageNumber: string;
  inStock: boolean;
  id?: string;
}

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params?.id ? params.id.toString() : ""; // Ensure `id` is a string

  const [shopList, setShopList] = useState<ShopListProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchShopList();
  }, [id]);

  const fetchShopList = async () => {
    try {
      const result: any = await getShop();
      if (result?.shops && Array.isArray(result.shops)) {
        const selectedProduct = result.shops.find(
          (item: ShopListProps) =>
            item.id === id ||
            item.shopTitle.replace(/\s+/g, "-").toLowerCase() === id
        );
        setShopList(selectedProduct || null);
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
  if (!shopList) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="bg-white min-h-screen p-10 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image Section */}
        <div className="relative">
          {shopList.shopPercentageNumber && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{shopList.shopPercentageNumber}%
            </span>
          )}
          <span className="absolute top-3 right-3 bg-black text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
            NEW PACKAGING!
          </span>
          <Image
            src={shopList.shopImage?.url || "/placeholder.jpg"}
            alt={shopList.shopTitle}
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>

        {/* Product Details Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {shopList.shopTitle}
          </h2>

          {/* Star Ratings */}
          <div className="flex my-2">
            {Array(5)
              .fill("★")
              .map((star, index) => (
                <span key={index} className="text-orange-500 text-lg">
                  {star}
                </span>
              ))}
          </div>

          {/* Product Features */}
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            {shopList.shopDescription
              ?.split(". ")
              .map((point, index) => point && <li key={index}>{point}.</li>)}
          </ul>

          {/* Size & Color */}
          <div className="mt-4">
            <p className="mt-2">
              <strong>Size:</strong>
              <select className="border p-2 w-full mt-1 rounded">
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </p>
            <p className="mt-2">
              <strong>Color:</strong>
              <input
                type="text"
                placeholder="Enter color..."
                className="border p-2 w-full mt-1 rounded"
              />
            </p>
            <p className="mt-2">
              <strong>Delivery:</strong>
              <input
                type="text"
                placeholder="Enter addries..."
                className="border p-2 w-full mt-1 rounded"
              />
            </p>
            <p className="mt-2">
              <strong>Email:</strong>
              <input
                type="email"
                placeholder="Enter email..."
                className="border p-2 w-full mt-1 rounded"
              />
            </p>
          </div>

          {/* Pricing */}
          <div className="mt-4">
            <p className="text-gray-500 line-through text-lg">
              Rs {shopList.shopPrice}.00
            </p>
            <p className="text-black font-bold text-2xl">
              Rs {shopList.shopDiscountPrice}.00
            </p>
          </div>

          {/* Stock Status */}
          <p
            className={`mt-2 font-semibold ${
              shopList.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {shopList.inStock ? "In stock" : "Out of stock"}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center border p-2 rounded">
              <button
                className="px-3 text-lg"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 text-lg">{quantity}</span>
              <button
                className="px-3 text-lg"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
