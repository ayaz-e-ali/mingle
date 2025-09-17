/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["mingle.portmap.io:54442"]
        }
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
            },
            {
                protocol: 'https',
                hostname: 'mingle.portmap.io',
                port: '54442',
                pathname: '/uploads/**',
            },
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
