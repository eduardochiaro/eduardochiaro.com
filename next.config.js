module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'www.google.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'repository-images.githubusercontent.com',
      'images.unsplash.com',
      'live.staticflickr.com'
    ]
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  }
};
