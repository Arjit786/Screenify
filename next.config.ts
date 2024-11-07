/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  // Remove swcMinify as it's no longer needed in Next.js 13+
}

module.exports = nextConfig