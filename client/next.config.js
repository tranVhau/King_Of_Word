/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "lh3.googleusercontent.com",
    ],
  },
  serverRuntimeConfig: {
    socketURL: process.env.BACKEND_SOCKET_URL,
  },
  publicRuntimeConfig: {
    socketURL: process.env.NEXT_PUBLIC_BACKEND_SOCKET_URL,
    googleURL: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
