/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/homepage',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
