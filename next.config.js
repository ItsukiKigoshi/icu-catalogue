// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/icu-catalogue',
    assetPrefix: '/icu-catalogue',
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig