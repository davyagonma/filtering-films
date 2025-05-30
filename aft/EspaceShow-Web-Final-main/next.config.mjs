/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname: 'www.pngfind.com',
                pathname: '/*/**',
            },
            {
                protocol: 'https',
                hostname:"espace-show.vercel.app",
                pathname: '/*',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/*',
            },
            {
                protocol: 'https',
                hostname: 'api.army.mil',
                pathname: '/*/**',
            }
        ],
    },
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
};


export default nextConfig;
