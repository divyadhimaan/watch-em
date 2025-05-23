/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    domains: ['image.tmdb.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',        // Match all /api/* routes
        destination: 'http://localhost:8000/api/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
