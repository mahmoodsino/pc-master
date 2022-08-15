/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
      domains: ["192.168.1.10:8000"],
      formats: ["image/webp"],
  },
};