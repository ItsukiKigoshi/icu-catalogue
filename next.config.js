const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/classic-2024',
                permanent: false,
            },
        ]
    },
});

module.exports = nextConfig;
