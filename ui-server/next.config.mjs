/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'http',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',        // Match all /api/* routes
        destination: `${process.env.NEXT_PUBLIC_API_BASE}/api/:path*`, // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
