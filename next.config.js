/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate({
    webpack: (config, { isServer, webpack }) => {
      return config;
    }
  })
};

module.exports = nextConfig;
