/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["us-west-2.graphassets.com"], // ✅ Allow external images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.graphassets.com",
      },
    ],
    minimumCacheTTL: 600, // ⏳ Increase cache time to reduce reloads
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
