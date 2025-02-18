/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getKid } from "@/Services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Interface for kids catalog items
interface KidListProps {
  kidsCatalogTitle: string;
  kidsCatalogImage?: { url: string };
  kidsCatalogPrice: string;
  kidsDiscountPrice: string;
  kidsRatingNumber: string;
  id?: string;
}

// Card component for each product
const KidCard = ({ kid }: { kid: KidListProps }) => {
  return (
    <Link
      href={`/kidcatalog/${
        kid.id || kid.kidsCatalogTitle.replace(/\s+/g, "-").toLowerCase()
      }`}
      passHref
    >
      <div className="group cursor-pointer transition-transform duration-300 hover:scale-105 bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image Container */}
        <div className="relative h-40 sm:h-52 md:h-60 w-full overflow-hidden">
          {kid.kidsCatalogImage?.url ? (
            <Image
              src={kid.kidsCatalogImage.url}
              alt={kid.kidsCatalogTitle}
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
            {Array(kid.kidsRatingNumber ? parseInt(kid.kidsRatingNumber) : 0)
              .fill("")
              .map((_, index) => (
                <span key={index} className="text-orange-500 text-lg">
                  ★
                </span>
              ))}
          </div>

          {/* Product Title */}
          <h2 className="text-md font-semibold text-[#8ab8bd] hover:text-black cursor-pointer transition-colors">
            {kid.kidsCatalogTitle || "Untitled Item"}
          </h2>

          {/* Product Pricing */}
          <div className="text-xs md:text-sm font-semibold text-gray-600 group-hover:text-black transition-colors">
            <p className="text-gray-500 line-through text-[12px]">
              Rs{" "}
              {kid.kidsDiscountPrice
                ? `${kid.kidsDiscountPrice}.00`
                : "Price not available"}
            </p>
            <p className="text-black font-bold text-[17px] underline">
              Rs{" "}
              {kid.kidsCatalogPrice
                ? `${kid.kidsCatalogPrice}.00`
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

// Main component fetching all kids' items
const KidList = () => {
  const [kidList, setKidList] = useState<KidListProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKidList();
  }, []);

  const fetchKidList = async () => {
    try {
      const result: any = await getKid();
      if (result?.kidsCatalogs) {
        setKidList(result.kidsCatalogs);
      } else {
        console.error("Unexpected API structure:", result);
        setKidList([]);
      }
    } catch (error) {
      console.error("Error fetching kids' list:", error);
      setKidList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Kid&lsquo;s Collection
      </h1>
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : kidList.length === 0 ? (
        <p className="text-center text-gray-500">No items available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {kidList.map((kid) => (
            <KidCard key={kid.id || kid.kidsCatalogTitle} kid={kid} />
          ))}
        </div>
      )}
    </div>
  );
};

export default KidList;
