import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
      
      if (!apiBase) {
        console.warn('NEXT_PUBLIC_API_BASE is not defined, skipping API rewrites');
        return [];
      }
      
      return [
        {
          source: '/api/movies/:path*',
          destination: `${apiBase}/movies/:path*`,
        },
        {
          source: '/api/series/:path*',
          destination: `${apiBase}/series/:path*`,
        },
      ];
    },
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
        '@once-ui': path.resolve(__dirname, 'packages/once-ui'),
        '@app-types': path.resolve(__dirname, 'packages/types'),
        '@store': path.resolve(__dirname, 'packages/store'),
      };
      return config;
    },
  };
  
  export default nextConfig;