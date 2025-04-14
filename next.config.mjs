/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable image optimization
  },
  experimental: {
    webpackBuildWorker: true,
    // Removed unnecessary experimental features
  },
}

export default nextConfig
