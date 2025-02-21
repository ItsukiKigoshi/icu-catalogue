const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});
const { i18n } = require('./next-i18next.config')

const nextConfig = withPWA({
  reactStrictMode: true,
  i18n
});

module.exports = nextConfig;
