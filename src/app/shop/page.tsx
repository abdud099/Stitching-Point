/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getShop } from "@/Services";
import Link from "next/link";

interface ShopListProps {
  shopTitle: string;
  shopImage?: { url: string };
  shopPrice: string;
  shopDiscountPrice: string;
  shopPercentageNumber: string;
  id?: string;
}

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [shopList, setShopList] = useState<ShopListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopList();
  }, []);

  const fetchShopList = async () => {
    try {
      const result: any = await getShop();
      console.log("result", result);
      if (result?.shops && Array.isArray(result.shops)) {
        setShopList(result.shops);
      } else {
        console.error("Unexpected API response:", result);
        setShopList([]);
      }
    } catch (error) {
      console.error("Error fetching shop list:", error);
      setShopList([]);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(shopList.length / itemsPerPage)); // Ensure at least 1 page
  const displayedProducts = shopList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white min-h-screen p-10">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center col-span-4">Loading...</p>
        ) : displayedProducts.length > 0 ? (
          displayedProducts.map((shop) => (
            <div key={shop.id} className="text-center p-4">
              <div className="relative">
                {/* Discount Badge */}
                {shop.shopPercentageNumber && (
                  <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{shop.shopPercentageNumber}%
                  </span>
                )}

                {/* Product Image */}
                <Image
                  src={shop.shopImage?.url || "/placeholder.jpg"}
                  alt={shop.shopTitle}
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>

              {/* Product Name & Details */}
              <Link
                href={`/shop/${
                  shop.id || shop.shopTitle.replace(/\s+/g, "-").toLowerCase()
                }`}
              >
                <h2 className="text-md font-semibold text-[#8ab8bd] hover:text-black mt-4 cursor-pointer">
                  {shop.shopTitle}
                </h2>
              </Link>

              {/* Star Ratings */}
              <div className="flex justify-center my-2">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <span key={index} className="text-orange-500 text-lg">
                      ★
                    </span>
                  ))}
              </div>

              {/* Price Section */}
              <p className="text-gray-500 line-through text-sm">
                Rs {shop.shopPrice}.00
              </p>
              <p className="text-black font-bold text-lg">
                Rs {shop.shopDiscountPrice}.00
              </p>

              {/* Shop Now Button */}
              <Link
                href={`/shop/${
                  shop.id || shop.shopTitle.replace(/\s+/g, "-").toLowerCase()
                }`}
                className="text-black text-sm font-bold hover:underline"
              >
                SHOP NOW
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">No products available.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "bg-gray-200 text-black hover:bg-gray-300 transition-colors"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
