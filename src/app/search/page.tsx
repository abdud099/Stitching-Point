/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getMen, getFemale, getKid, getBrand } from "@/Services"; // Import API services
import Image from "next/image";
import Link from "next/link";

// Define the API Response Interface
interface APIResponse<T> {
  mensCatalogs?: T[];
  femalesCatalogs?: T[];
  kidsCatalogs?: T[];
  brandsCatalogs?: T[];
}

// Define the Product Interface
interface Product {
  id: string;
  title: string;
  image?: { url: string };
  price: string;
  category: string;
}

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Search Input State
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from All APIs
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // ✅ Fix: Explicitly cast each API response
        const men = (await getMen()) as APIResponse<any>;
        const women = (await getFemale()) as APIResponse<any>;
        const kids = (await getKid()) as APIResponse<any>;
        const brands = (await getBrand()) as APIResponse<any>;

        // Normalize Data Structure
        const formatProducts = (data: any[], category: string) =>
          data?.map((item) => ({
            id:
              item.id ||
              item.title?.replace(/\s+/g, "-").toLowerCase() ||
              "unknown-id",
            title: item.title || item.name || "No Title",
            image: item.image || { url: "/placeholder.jpg" }, // Default Image
            price: item.price || "N/A",
            category,
          })) ?? [];

        const products = [
          ...formatProducts(men?.mensCatalogs ?? [], "Men"),
          ...formatProducts(women?.femalesCatalogs ?? [], "Women"),
          ...formatProducts(kids?.kidsCatalogs ?? [], "Kids"),
          ...formatProducts(brands?.brandsCatalogs ?? [], "Brands"),
        ];

        setAllProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle Search Query Updates
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.id.toLowerCase().includes(lowerCaseQuery) ||
        product.title.toLowerCase().includes(lowerCaseQuery)
    );

    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Search Products
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by ID or Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#8ab8bd]"
      />

      {/* Loading State */}
      {loading && <p className="text-center mt-4 text-gray-600">Loading...</p>}

      {/* Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/mencatalog/${product.id}`}
                passHref
              >
                <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition">
                  <Image
                    src={product.image?.url || "/placeholder.jpg"}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-500">Rs {product.price}</p>
                  <span className="text-sm text-white bg-[#8ab8bd] px-2 py-1 rounded-md mt-1 inline-block">
                    {product.category}
                  </span>
                </div>
              </Link>
            ))
          : !loading && (
              <p className="text-center text-gray-500 col-span-full">
                No products found.
              </p>
            )}
      </div>
    </div>
  );
};

export default SearchComponent;
