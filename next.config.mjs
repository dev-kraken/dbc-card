/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '54321',
                pathname: '/storage/**',
            },
        ],
    }
};

export default nextConfig;
