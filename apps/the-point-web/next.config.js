/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'experimental-edge',
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // @todo change to false
    ignoreBuildErrors: true,
  },
  output: 'standalone',
}
module.exports = nextConfig
