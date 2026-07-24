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
  };
  
  export default nextConfig;