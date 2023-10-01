/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                hostname: 'utfs.io',
                protocol: 'https',
            },
            {
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https',
            }
        ]
    }
};

module.exports = nextConfig;
