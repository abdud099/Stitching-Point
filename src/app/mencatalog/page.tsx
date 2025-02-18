/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMen } from "@/Services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Interface for men's catalog items
interface MenListProps {
  mensCatalogTitle: string;
  mensCatalogImage?: { url: string };
  mensCatalogPrice: string;
  mensDiscountPrice: string;
  mensRatingNumber: string;
  id?: string;
}

// Card component for each product
const MenCard = ({ men }: { men: MenListProps }) => {
  return (
    <Link
      href={`/mencatalog/${
        men.id || men.mensCatalogTitle.replace(/\s+/g, "-").toLowerCase()
      }`}
      passHref
    >
      <div className="group cursor-pointer transition-transform duration-300 hover:scale-105 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image Container */}
        <div className="relative h-40 sm:h-52 md:h-60 w-full overflow-hidden">
          {men.mensCatalogImage?.url ? (
            <Image
              src={men.mensCatalogImage.url}
              alt={men.mensCatalogTitle}
              width={400}
              height={600}
              unoptimized={true}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-1 text-center">
          {/* Star Ratings */}
          <div className="flex justify-center">
            {Array(men.mensRatingNumber ? parseInt(men.mensRatingNumber) : 0)
              .fill("")
              .map((_, index) => (
                <span key={index} className="text-orange-500 text-lg">
                  ★
                </span>
              ))}
          </div>

          {/* Product Title */}
          <h2 className="text-md font-semibold text-[#8ab8bd] hover:text-black cursor-pointer transition-colors">
            {men.mensCatalogTitle || "Untitled Item"}
          </h2>

          {/* Product Pricing */}
          <div className="text-xs md:text-sm font-semibold text-gray-600 group-hover:text-black transition-colors">
            <p className="text-gray-500 line-through text-[12px]">
              Rs{" "}
              {men.mensDiscountPrice
                ? `${men.mensDiscountPrice}.00`
                : "Price not available"}
            </p>
            <p className="text-black font-bold text-[17px] underline">
              Rs{" "}
              {men.mensCatalogPrice
                ? `${men.mensCatalogPrice}.00`
                : "Price not available"}
            </p>
          </div>
          <div className="text-black text-sm font-bold hover:underline">
            SHOP NOW
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main component fetching all men's items
const MenList = () => {
  const [menList, setMenList] = useState<MenListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenList();
  }, []);

  const fetchMenList = async () => {
    try {
      const result: any = await getMen();

      if (result?.mensCatalogs) {
        setMenList(result.mensCatalogs);
      } else {
        console.error("Unexpected API structure:", result);
        setMenList([]);
      }
    } catch (error) {
      console.error("Error fetching men's list:", error);
      setMenList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Men&lsquo;s Collection
      </h1>
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : menList.length === 0 ? (
        <p className="text-center text-gray-500">No items available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {menList.map((men) => (
            <MenCard key={men.id || men.mensCatalogTitle} men={men} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenList;
