/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlog } from "@/Services";

// Blog Post Interface
interface BlogPost {
  blogTitle: string;
  blogDescription: string;
  blogImage?: { url: string };
  blogUploadDate: string;
  id?: string;
}

const postsPerPage = 6;

const BlogPage = () => {
  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBlogList();
  }, []);

  const fetchBlogList = async () => {
    try {
      const result: any = await getBlog();

      if (result?.blogs && Array.isArray(result.blogs)) {
        setBlogList(result.blogs);
      } else {
        console.error("Unexpected API structure:", result);
        setBlogList([]);
      }
    } catch (error) {
      console.error("Error fetching blog list:", error);
      setBlogList([]);
    } finally {
      setLoading(false);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Blog</h1>

      {/* Show Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogList.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts available.</p>
      ) : (
        <>
          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full">
                  {blog.blogImage?.url ? (
                    <Image
                      src={blog.blogImage.url}
                      alt={blog.blogTitle}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500 text-sm">
                        No Image Available
                      </p>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-white p-2 rounded-md shadow-md text-center">
                    <p className="text-sm font-semibold">
                      {blog.blogUploadDate}
                    </p>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {blog.blogTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {blog.blogDescription}
                  </p>
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-blue-600 font-semibold mt-2 inline-block hover:text-blue-800 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from(
              { length: Math.ceil(blogList.length / postsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded-full ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300 transition-colors"
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
