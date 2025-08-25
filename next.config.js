/** @type {import('next').NextConfig} */
const nextConfig = {
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
    },
    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: "/uploads/:path*", // Adjust this path based on your project structure
            },
        ];
    },
};

module.exports = nextConfig;
