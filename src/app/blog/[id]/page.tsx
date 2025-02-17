/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBlog } from "@/Services";

// Blog Post Interface
interface BlogPost {
  id: any;
  blogTitle: string;
  blogDescription: string;
  blogImage?: { url: string };
  blogContent: string;
}

const BlogPost = () => {
  const [blogList, setBlogList] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (!id) return;

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

    fetchBlogList();
  }, [id]);

  const post = blogList.find((p) => p.id?.toString() === id);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  if (!post)
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Post Not Found</h1>
        <p className="text-gray-600">
          The blog post you are looking for does not exist.
        </p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 py-10">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96">
        <Image
          src={post.blogImage?.url || "/fallback-image.jpg"}
          alt={post.blogTitle}
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Blog Content */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl md:text-4xl font-bold">{post.blogTitle}</h1>
        <p className="text-gray-500 text-sm md:text-md mt-2">
          {post.blogDescription}
        </p>

        {/* Blog Content */}
        <div className="text-gray-700 leading-relaxed mt-4 text-sm md:text-base">
          {post.blogContent ? (
            <div dangerouslySetInnerHTML={{ __html: post.blogContent }} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
