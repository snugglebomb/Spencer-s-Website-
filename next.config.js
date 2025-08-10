/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don’t fail the Vercel/CI build on ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Optional while iterating: don’t fail build on TS errors.
    ignoreBuildErrors: true,
  },
};
module.exports = nextConfig;