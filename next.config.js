/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  images: {
    dangerouslyAllowSVG: true,
  formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.flickr.com',
      },
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
      },
      {
        protocol: 'https',
        hostname: '**.openlibrary.org'
      },
      {
        protocol: 'https',
        hostname: 'pxscdn.com'
      }
    ]
  },
	experimental: {
    viewTransition: true,
		serverActions: {
			allowedOrigins: ['*.eduardochiaro.com', '127.0.0.1:3001']
		},
	},
  productionBrowserSourceMaps: false,
};

module.exports = withBundleAnalyzer(nextConfig);