/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getShop } from "@/Services";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";

interface ShopListProps {
  shopTitle: string;
  shopDescription: string;
  shopImage?: { url: string };
  shopPrice: string;
  shopDiscountPrice: string;
  shopPercentageNumber: string;
  shopRatingNumber: string;
  inStock: boolean;
  id?: string;
}

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  const id = params?.id ? params.id.toString() : ""; // Ensure `id` is a string
  const [shopList, setShopList] = useState<ShopListProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // User Contact Details
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
        setResult(
          "✅ Delivery within 3-5 days. Express delivery options available for urgent orders."
        );

        // Reset all input fields
        setTimeout(() => {
          setName("");
          setEmail("");
          setPhone("");
          setSize("");
          setAddress("");
          setQuantity(1);
          setResult(""); // Clear message after reset
          formRef.current?.reset();
        }, 2000);
      } else {
        setResult(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setResult("❌ Error submitting the form.");
      console.error("Form submission error:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!shopList) return <p className="text-center mt-10">Product not found.</p>;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

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
            {Array(
              shopList.shopRatingNumber
                ? parseInt(shopList.shopRatingNumber)
                : 0
            )
              .fill("★")
              .map((star, index) => (
                <span key={index} className="text-orange-500 text-lg">
                  {star}
                </span>
              ))}
          </div>

          <div className="mt-2 flex items-center justify-between">
            {/* Pricing Section */}
            <div>
              <p className="text-gray-500 line-through text-sm">
                RS {shopList.shopDiscountPrice ? `${shopList.shopDiscountPrice}.00` : "N/A"}
              </p>
              <p className="text-2xl font-semibold text-gray-700">
                RS{" "}
                {shopList.shopPrice
                  ? `${shopList.shopPrice}.00`
                  : "Price not available"}
              </p>
            </div>

            {/* Stock Status */}
            <p
              className={`text-sm font-semibold ${
                shopList.inStock ? "text-green-500" : "text-red-500"
              }`}
            >
              {shopList.inStock ? "In stock" : "Out of stock"}
            </p>
          </div>

          {/* Afterpay Installment Calculation */}
          <p className="text-sm text-gray-500 mt-2">
            or 4 interest-free payments of RS{" "}
            {shopList.shopDiscountPrice
              ? (parseFloat(shopList.shopDiscountPrice) / 4).toFixed(2)
              : "N/A"}{" "}
            with Afterpay
          </p>

          {/* Product Features */}
          <ul className=" text-gray-700 mt-4">{shopList.shopDescription}</ul>

          <form ref={formRef} onSubmit={onSubmit} className="space-y-4 mt-4">
            {/* Hidden Fields for Product Details */}
            <input type="hidden" name="product_id" value={shopList.id} />
            <input
              type="hidden"
              name="product Title"
              value={shopList.shopTitle}
            />
            <input
              type="hidden"
              name="product Price"
              value={shopList.shopPrice}
            />
            <input
              type="hidden"
              name="product Image"
              value={shopList.shopImage?.url || ""}
            />

            {/* Full Name */}
            <div>
              <label className="block font-semibold">Full Name</label>
              <input
                type="text"
                name="user Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                name="user Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-semibold">Phone Number</label>
              <input
                type="tel"
                name="user Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Size Selection */}
            <div>
              <label className="block font-semibold">Size</label>
              <input
                type="text"
                name="User Clothe Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Size (S, M, L, XL)"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold">Full Address</label>
              <textarea
                name="userAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                className="border p-2 w-full rounded"
                rows={2}
                required
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-2 w-full rounded"
                min="1"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-pink-500 text-white p-3 rounded-md font-bold hover:bg-pink-600"
            >
              SUBMIT ORDER
            </button>
            <p className="text-center text-sm text-gray-600 mt-2">{result}</p>
          </form>

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
                      <li>✅ Premium stitching with expert craftsmanship</li>
                      <li>✅ High-quality fabric for durability and comfort</li>
                      <li>
                        ✅ Customizable fitting for a perfect tailored look
                      </li>
                    </ul>
                  )}
                  {section === "Shipping" && (
                    <p>
                      📦 Free shipping on orders over <strong>500 PKR</strong>.
                      Standard delivery within{" "}
                      <strong>3-5 business days</strong>. Express delivery
                      options available for urgent orders.
                    </p>
                  )}
                  {section === "Size Guide" && (
                    <p>
                      📏 Use our **custom size guide** to ensure a perfect fit.
                      Need help? Contact us for **personalized stitching
                      recommendations**.
                    </p>
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
    </div>
  );
};

export default ProductDetail;
