/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'store.hermanmiller.com',
      'cdn.shopify.com',
      'resource.logitech.com',
      'www.pfu-us.ricoh.com',
      'www.dacasso.com',
      'assets.benq.com',
      'm.media-amazon.com',
    ],
    unoptimized: true, // Disable image optimization for local images
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
