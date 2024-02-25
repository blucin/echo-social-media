/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            }
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'files.edgestore.dev',
                port: '',
                pathname: '/**'
            },
        ],
    },
    output: 'standalone',
}

module.exports = nextConfig
