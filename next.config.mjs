/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export', // Add this for static export
    trailingSlash: true, // Optional: adds trailing slashes to URLs
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sampoornarogya.com',
            }
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;

