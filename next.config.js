// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  output: "export",
});

module.exports = withPWA({
  //next.js config
  reactStrictMode: true,
});
