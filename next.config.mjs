/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sozcwgcoibigujehjxbf.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sozcwgcoibigujehjxbf.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
