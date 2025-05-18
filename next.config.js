/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.eduardochiaro.com',
      },
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: '**.google.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.githubassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.staticflickr.com',
      }, 
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com'
      }
    ],
  }
};

module.exports = nextConfig