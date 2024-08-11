/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s3-bucket-sm.s3.us-east-2.amazonaws.com', 'th.bing.com'], // Agrega aquí los dominios permitidos
    },
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
